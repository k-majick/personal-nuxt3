import redirects from "../assets/data/redirects.json";

export default defineNuxtRouteMiddleware(to => {
  const redirect = redirects.find(
    r => r.from === to.path || `${r.from}/` === to.path,
  );

  if (redirect) {
    return navigateTo(redirect.to);
  }
});
