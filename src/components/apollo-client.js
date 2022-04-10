import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";

const cache = new InMemoryCache();
//
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, location, path }) => {
      console.log(`message:${message} location:${location}`);
    });
  }

  if (networkError) {
    console.log(`networkerror: ${networkError}`);
  }
});

const authLink = setContext(async (_, { headers, ...rest }) => {
  // read from cookies
  // ut
  // Bearer Token

  const userToken = null;

  return {
    ...rest,
    headers: {
      ...headers,
      authorization: userToken ? `Bearer ${userToken}` : null,
    },
  };
});

const httpLink = createUploadLink({ uri: `http://localhost:80/graphql` });

const link = ApolloLink.from([errorLink, authLink, httpLink]);

const client = new ApolloClient({
  cache,
  link,
});

export default client;
