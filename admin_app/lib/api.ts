import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "@/lib/api.d";
import { auth0 } from "./auth0";
import { redirect } from "next/navigation";
import { cfg } from "./cfg";
import { middleware } from "@/middleware";

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

const apiMiddleware: Middleware = {

  async onRequest({ request }) {
    const session = await auth0.getSession();
    request.headers.set('Authorization', `Bearer ${session?.tokenSet.accessToken}`);
    return request;
  },

  async onResponse({ response }) {
    if (!response.ok) {
      if (response.status === 401) {
        redirect('/auth/login');
      }
      const errorMessage = `API Client got a response with status code ${response.status}`;
      console.error(errorMessage);
      if (response.status >= 500) {
        const responseText = await response.text();
        console.error(`API error with status code ${response.status}`);
        console.error(responseText);
        throw new ApiError(responseText, errorMessage, response.status);
      }
    }
  }

}

const apiClient = createClient<paths>({
  baseUrl: cfg.apiBaseUrl
});

apiClient.use(apiMiddleware);

export default apiClient;