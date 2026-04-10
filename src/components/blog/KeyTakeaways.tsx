type KeyTakeawaysProps = {
  title?: string;
  items: string[];
};

export default function KeyTakeaways({
  title = "Kilit Noktalar",
  items,
}: KeyTakeawaysProps) {
  return (
    <section className="my-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.35)] sm:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
        {title}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#17385f] to-[#9062ae] text-sm font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="pt-1 text-sm font-medium leading-7 text-slate-700">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
