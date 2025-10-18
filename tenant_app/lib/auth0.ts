import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";

let client: Auth0Client | undefined;


export const getAuth0Client = async () => {
  if (client) {
    return client;
  }
  client = await createAuth0Client({
    domain: 'dev-ywc4ezu2upingb1g.us.auth0.com',
    clientId: 'dj3FUi6uJWdxk81pgrVlmqXd5ZPMQ4vs'
  })
  return client;
}