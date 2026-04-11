import {
  BarChart3,
  FileText,
  LayoutPanelTop,
  LineChart,
  Search,
  Settings,
  Target,
  Zap,
} from "lucide-react";

type AccentKey = "blue" | "green" | "orange" | "purple";
type IconKey =
  | "settings"
  | "file-text"
  | "line-chart"
  | "search"
  | "target"
  | "bar-chart"
  | "layout"
  | "zap";

type FeatureCardItem = {
  title: string;
  description: string;
  bullets?: string[];
  accent?: AccentKey;
  icon?: IconKey;
};

type FeatureCardsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FeatureCardItem[];
};

const accentMap: Record<AccentKey, { iconBg: string; iconText: string; bullet: string }> = {
  blue: {
    iconBg: "from-sky-500 to-blue-600",
    iconText: "text-sky-600",
    bullet: "bg-sky-500",
  },
  green: {
    iconBg: "from-emerald-500 to-green-600",
    iconText: "text-emerald-600",
    bullet: "bg-emerald-500",
  },
  orange: {
    iconBg: "from-orange-500 to-rose-500",
    iconText: "text-orange-600",
    bullet: "bg-orange-500",
  },
  purple: {
    iconBg: "from-violet-500 to-fuchsia-500",
    iconText: "text-violet-600",
    bullet: "bg-violet-500",
  },
};

const iconMap = {
  settings: Settings,
  "file-text": FileText,
  "line-chart": LineChart,
  search: Search,
  target: Target,
  "bar-chart": BarChart3,
  layout: LayoutPanelTop,
  zap: Zap,
} satisfies Record<IconKey, typeof Settings>;

export default function FeatureCards({
  eyebrow,
  title,
  description,
  items,
}: FeatureCardsProps) {
  return (
    <section className="my-12">
      {eyebrow || title || description ? (
        <div className="mb-8">
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

      <div className="grid gap-6 xl:grid-cols-3">
        {items.map((item) => {
          const accent = accentMap[item.accent || "blue"];
          const Icon = iconMap[item.icon || "layout"];

          return (
            <article
              key={item.title}
              className="rounded-[28px] bg-white p-8 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.28)] ring-1 ring-slate-200"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.iconBg} text-white shadow-lg`}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-bold leading-tight text-slate-950">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.description}
              </p>
              {item.bullets?.length ? (
                <div className="mt-6 space-y-3">
                  {item.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3">
                      <span className={`mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full ${accent.bullet}`} />
                      <span className="text-base leading-7 text-slate-700">{bullet}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
