import createClient from "openapi-fetch";
import type { paths } from "./api.d";

const apiClient = createClient<paths>({
  baseUrl: '/api',
});

export default apiClient;