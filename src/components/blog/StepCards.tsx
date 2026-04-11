type StepItem = {
  title: string;
  description: string;
};

type StepCardsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps: StepItem[];
};

const badgeGradients = [
  "from-emerald-500 to-teal-500",
  "from-blue-500 to-indigo-500",
  "from-violet-500 to-fuchsia-500",
  "from-orange-500 to-rose-500",
];

export default function StepCards({
  eyebrow,
  title,
  description,
  steps,
}: StepCardsProps) {
  return (
    <section className="my-12">
      {eyebrow || title || description ? (
        <div className="mb-10">
          {eyebrow ? (
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              {eyebrow}
            </div>
          ) : null}
          {title ? (
            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-3">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="relative rounded-[28px] bg-white px-8 pb-8 pt-12 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.28)] ring-1 ring-slate-200"
          >
            <div
              className={`absolute left-8 top-0 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br ${
                badgeGradients[index % badgeGradients.length]
              } text-xl font-bold text-white shadow-lg`}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="text-2xl font-bold text-slate-950">{step.title}</h3>
            <p className="mt-4 text-base leading-8 text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
