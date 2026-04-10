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
    <section className="my-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.35)]">
      <div className="bg-gradient-to-r from-[#17385f] via-[#2f4f8f] to-[#9062ae] px-6 py-6 text-white sm:px-8">
        {eyebrow ? (
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="px-6 py-6 sm:px-8">{children}</div> : null}
    </section>
  );
}
