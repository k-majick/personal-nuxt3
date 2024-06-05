export const getSlug = (routePath: string): string => {
  const slug = routePath.split("/").pop();

  return slug ? slug : "";
};
