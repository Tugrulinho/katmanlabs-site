export const generateSlug = (title: string): string => {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
