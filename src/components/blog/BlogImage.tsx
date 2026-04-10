type BlogImageProps = {
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
};

export default function BlogImage({
  src,
  alt,
  caption,
  className = "",
}: BlogImageProps) {
  if (!src) {
    return null;
  }

  return (
    <figure className={`my-8 overflow-hidden ${className}`.trim()}>
      <img
        src={src}
        alt={alt || ""}
        className="w-full rounded-2xl border border-slate-200 shadow-sm"
      />
      {caption ? (
        <figcaption className="mt-3 text-sm text-slate-500 text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
