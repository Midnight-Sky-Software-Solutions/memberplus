import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./api.d";
import { getAuth0Client } from "./auth0";

const apiClient = createClient<paths>({
  baseUrl: '/api',
});

const apiMiddleware: Middleware = {

  async onRequest({ request }) {
    const auth0 = await getAuth0Client();
    if (await auth0.isAuthenticated()) {
      const token = await auth0.getTokenSilently();
      request.headers.set('Authorization', `Bearer ${token}`);
    } else {
      const query = window.location.search;
      if (query.includes("code=") && query.includes("state=")) {
        await auth0.handleRedirectCallback();
      } else {
        await auth0.loginWithRedirect({
          authorizationParams: {
            redirect_uri: window.origin,
            audience: 'https://localhost:7179/',
            grant_type: "client_credentials"
          }
        });
      }
      const token = await auth0.getTokenSilently({
        authorizationParams: {
          audience: 'https://localhost:7179/'
        }
      });
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    return request;
  }

}

apiClient.use(apiMiddleware);

export default apiClient;