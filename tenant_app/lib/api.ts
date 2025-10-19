import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./api.d";
import { getAuth0Client } from "./auth0";

export class ApiError extends Error {

  public body: string;
  public statusCode: number;

  constructor(body: string, message: string, statusCode: number) {
    super(message);
    this.body = body;
    this.statusCode = statusCode;
  }

  getJSON() {
    try {
      return JSON.parse(this.body);
    } catch {
      return undefined;
    }
  }

}

const apiClient = createClient<paths>({});

const apiMiddleware: Middleware = {

  async onRequest({ request }) {
    const auth0 = await getAuth0Client();
    try {
      const token = await auth0.getTokenSilently();
      request.headers.set('Authorization', `Bearer ${token}`);
    }
    catch (error: any) {
      if (error.error !== 'login_required') {
        await auth0.loginWithRedirect({
          authorizationParams: {
            redirect_uri: `${window.origin}/auth/redirect`,
            audience: 'https://localhost:7179/',
            grant_type: "client_credentials"
          }
        });
      }
    }
    return request;
  },

  async onResponse({ response }) {
    if (response.status === 401) {
      const auth0 = await getAuth0Client();
      await auth0.loginWithRedirect({
        authorizationParams: {
          redirect_uri: `${window.origin}/auth/redirect`,
          audience: 'https://localhost:7179/',
          grant_type: "client_credentials"
        }
      });
    }
    if (response.status >= 500) {
      const body = await response.text();
      throw new ApiError(body, "Response failed with 500 error", response.status);
    }
  }

}

apiClient.use(apiMiddleware);

export default apiClient;