import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getAbsoluteUrl, SITE_NAME } from "../lib/seo";

type JsonLd = Record<string, unknown>;

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  type?: "website" | "article";
  schema?: JsonLd | JsonLd[];
  noindex?: boolean;
};

export default function Seo({
  title,
  description,
  path,
  image,
  type = "website",
  schema,
  noindex = false,
}: SeoProps) {
  const location = useLocation();
  const canonicalUrl = getAbsoluteUrl(path || location.pathname);
  const imageUrl = image ? getAbsoluteUrl(image) : null;
  const schemaItems = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta
        name="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}

      {schemaItems.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
