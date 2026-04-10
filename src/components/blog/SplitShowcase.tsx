import type { ReactNode } from "react";

type SplitShowcaseProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  imageCaption?: string;
  reverse?: boolean;
  children?: ReactNode;
};

export default function SplitShowcase({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  imageCaption,
  reverse = false,
  children,
}: SplitShowcaseProps) {
  return (
    <section className="my-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.35)]">
      <div
        className={`grid gap-0 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
      >
        <div className="flex flex-col justify-center px-6 py-8 sm:px-8">
          {eyebrow ? (
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              {eyebrow}
            </div>
          ) : null}
          <h3 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
            {title}
          </h3>
          {description ? (
            <p className="mt-4 text-base leading-8 text-slate-600">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-5 text-slate-700">{children}</div> : null}
        </div>
        <figure className="relative min-h-[260px] bg-slate-100">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
          {imageCaption ? (
            <figcaption className="absolute inset-x-4 bottom-4 rounded-full bg-slate-950/75 px-4 py-2 text-xs font-medium text-white backdrop-blur">
              {imageCaption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
