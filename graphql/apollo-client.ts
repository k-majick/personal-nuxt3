import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

export const createApolloClient = (ssr: boolean) => {
  const link = createHttpLink({
    uri: process.env.API_URL,
  });

  return new ApolloClient({
    ssrMode: ssr,
    cache: new InMemoryCache(),
    link: link,
    connectToDevTools: false,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
}