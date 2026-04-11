import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
  children,
}: SectionIntroProps) {
  return (
    <section className="my-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.22)]">
      <div className="border-b border-slate-200 bg-[linear-gradient(135deg,rgba(23,56,95,0.07),rgba(144,98,174,0.06))] px-6 py-6 sm:px-8">
        {eyebrow ? (
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="px-6 py-6 sm:px-8">{children}</div> : null}
    </section>
  );
}
