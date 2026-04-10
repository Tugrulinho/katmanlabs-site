import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

type CalloutTone = "note" | "success" | "warning";

type CalloutProps = {
  title?: string;
  tone?: CalloutTone;
  children: ReactNode;
};

const toneMap: Record<
  CalloutTone,
  { wrapper: string; icon: JSX.Element; title: string }
> = {
  note: {
    wrapper: "border-blue-200 bg-blue-50 text-blue-950",
    icon: <Info className="w-5 h-5 text-blue-600" />,
    title: "Not",
  },
  success: {
    wrapper: "border-emerald-200 bg-emerald-50 text-emerald-950",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    title: "Onemli",
  },
  warning: {
    wrapper: "border-amber-200 bg-amber-50 text-amber-950",
    icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
    title: "Dikkat",
  },
};

export default function Callout({
  title,
  tone = "note",
  children,
}: CalloutProps) {
  const selectedTone = toneMap[tone];

  return (
    <div
      className={`my-8 rounded-2xl border p-5 shadow-sm ${selectedTone.wrapper}`}
    >
      <div className="mb-3 flex items-center gap-2 font-semibold">
        {selectedTone.icon}
        <span>{title || selectedTone.title}</span>
      </div>
      <div className="text-sm leading-7 [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
