export const SITE_NAME = "Katman Labs";
export const SITE_URL = "https://www.katmanlabs.com";

export const getAbsoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};
