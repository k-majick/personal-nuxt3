import { useNuxtApp } from "#app";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

const nuxtApp = typeof window === "undefined" ? null : useNuxtApp();

export const createApolloClient = (ssr: boolean) => {
  const link = createHttpLink({
    uri: nuxtApp ? nuxtApp.$config.public.apiUrl : process.env.API_URL,
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