import { ArrowRight } from "lucide-react";

type BulletPanelProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: string[];
};

export default function BulletPanel({
  eyebrow,
  title,
  description,
  items,
}: BulletPanelProps) {
  return (
    <section className="my-12 rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.28)]">
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      ) : null}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-4 rounded-2xl bg-slate-50 px-5 py-5 ring-1 ring-slate-200"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
              <ArrowRight className="h-4 w-4" />
            </div>
            <p className="pt-1 text-base leading-7 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
