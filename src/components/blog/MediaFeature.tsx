import { CheckCircle2 } from "lucide-react";

type MediaFeatureProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  imageCaption?: string;
  reverse?: boolean;
  bullets?: string[];
};

export default function MediaFeature({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  imageCaption,
  reverse = false,
  bullets = [],
}: MediaFeatureProps) {
  return (
    <section className="my-12">
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          {eyebrow ? (
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              {eyebrow}
            </div>
          ) : null}
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
          ) : null}
          {bullets.length > 0 ? (
            <div className="mt-8 space-y-4">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <p className="text-base leading-7 text-slate-700">{bullet}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <figure className="overflow-hidden rounded-[28px] bg-slate-100 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.35)] ring-1 ring-slate-200">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
          {imageCaption ? (
            <figcaption className="border-t border-slate-200 bg-white px-5 py-4 text-sm leading-6 text-slate-500">
              {imageCaption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
