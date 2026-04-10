type QuoteHighlightProps = {
  quote: string;
  author?: string;
};

export default function QuoteHighlight({
  quote,
  author,
}: QuoteHighlightProps) {
  return (
    <blockquote className="my-10 overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-950 via-[#17385f] to-[#9062ae] px-6 py-8 text-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.6)] sm:px-8">
      <div className="max-w-3xl text-2xl font-bold leading-tight sm:text-3xl">
        “{quote}”
      </div>
      {author ? (
        <div className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/65">
          {author}
        </div>
      ) : null}
    </blockquote>
  );
}
