type PullQuoteProps = {
  quote: string;
  eyebrow?: string;
};

export default function PullQuote({ quote, eyebrow }: PullQuoteProps) {
  return (
    <section className="my-12 rounded-[28px] border border-slate-200 bg-slate-50 px-8 py-10 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.18)]">
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {eyebrow}
        </div>
      ) : null}
      <blockquote className="mt-3 border-l-4 border-emerald-500 pl-6 text-3xl font-semibold italic leading-tight text-slate-900 md:text-4xl">
        "{quote}"
      </blockquote>
    </section>
  );
}
