import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  // Your backend's GraphQL endpoint
  uri: "http://localhost:4000/graphql",
});

// This middleware will add the token to the headers of each request
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("authToken");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  // Use `from` to chain the authLink and httpLink
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
