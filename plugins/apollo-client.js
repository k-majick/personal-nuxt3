import { defineNuxtPlugin } from '#app'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

export default defineNuxtPlugin(nuxtApp => {
  const cache = new InMemoryCache({
    dataIdFromObject: (object) => {
      switch (object.__typename) {
        case 'Page': return `${object.__typename}:${object.slug}`; // use `slug` as unique identifier
        default: return object.id ? `${object.__typename}:${object.id}` : null; // fall back to default handling
      }
    },
  });

  const link = createHttpLink({ uri: nuxtApp.$config.public.apiUrl, fetch: window.fetch });

  const apolloClient = new ApolloClient({
    cache,
    link,
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
    },
  });

  nuxtApp.provide('apolloClient', apolloClient);
});