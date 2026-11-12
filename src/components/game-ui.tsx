import { ArrowUpRight, Check, LockKeyhole, Sparkles } from "lucide-react";
import { artwork, levels, type GameLevel } from "@/data/game-content";
import type { LevelStatus } from "@/data/game-progress";

export const hueStyles = {
  cyan: { text: "text-hero-cyan", border: "border-hero-cyan/50", bg: "bg-hero-cyan", ring: "ring-hero-cyan/60", glow: "var(--hero-cyan)" },
  coral: { text: "text-hero-coral", border: "border-hero-coral/50", bg: "bg-hero-coral", ring: "ring-hero-coral/60", glow: "var(--hero-coral)" },
  gold: { text: "text-hero-gold", border: "border-hero-gold/50", bg: "bg-hero-gold", ring: "ring-hero-gold/60", glow: "var(--hero-gold)" },
  mint: { text: "text-hero-mint", border: "border-hero-mint/50", bg: "bg-hero-mint", ring: "ring-hero-mint/60", glow: "var(--hero-mint)" },
};

/** Full-bleed painted background with a dark scrim so UI text stays readable. */
export function SceneBackdrop({ src, className = "", scrim = "from-background/20 via-background/55 to-background" }: { src: string; className?: string; scrim?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <img src={src} alt="" className="size-full scale-105 object-cover" loading="eager" decoding="async" />
      <div className={`absolute inset-0 bg-gradient-to-b ${scrim}`} />
    </div>
  );
}

export function HeroFigure({ level, size = "lg" }: { level: GameLevel; size?: "sm" | "md" | "lg" }) {
  const hue = hueStyles[level.hue];
  const dims = size === "sm" ? "h-20 w-16" : size === "md" ? "h-40 w-32 sm:h-44 sm:w-36" : "h-72 w-56 sm:h-96 sm:w-72";
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl border-2 ${hue.border} ${dims}`}
      style={{ boxShadow: `0 0 40px -8px ${hue.glow}` }}
    >
      <img src={level.portrait} alt={`${level.hero}, hero of Sector ${level.number}`} className="size-full object-cover object-top" loading="eager" decoding="async" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent" />
      {size !== "sm" && <span className={`display-font absolute bottom-2 left-3 text-[10px] font-bold uppercase tracking-[.18em] ${hue.text}`}>{level.hero}</span>}
    </div>
  );
}

function StatusMark({ status }: { status: LevelStatus }) {
  if (status === "locked") return <LockKeyhole className="size-4" aria-hidden="true" />;
  if (status === "complete") return <Check className="size-4" aria-hidden="true" />;
  if (status === "in_progress") return <Sparkles className="size-4" aria-hidden="true" />;
  return <ArrowUpRight className="size-4" aria-hidden="true" />;
}

const statusLabel = (status: LevelStatus) => status.replace("_", " ");

export function GridMap({
  statuses,
  badges,
  onSelect,
  arenaUnlocked,
}: {
  statuses: LevelStatus[];
  badges: number[];
  onSelect: (index: number) => void;
  arenaUnlocked: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/70" aria-label="Valuation Grid map">
      <SceneBackdrop src={artwork.worldMap} scrim="from-background/45 via-background/35 to-background/80" />
      <div className="relative grid grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-6">
        {levels.map((level, index) => {
          const status = statuses[index] ?? "locked";
          const hue = hueStyles[level.hue];
          const locked = status === "locked";
          return (
            <button
              key={level.number}
              type="button"
              disabled={locked}
              aria-label={`Mission ${level.number}: ${level.hero}, ${statusLabel(status)}`}
              onClick={() => onSelect(index)}
              className={`group relative flex min-h-44 flex-col justify-end overflow-hidden rounded-lg border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 sm:min-h-56 ${hue.border} ${hue.ring} ${locked ? "cursor-not-allowed saturate-0" : "hover:-translate-y-1"}`}
              style={locked ? undefined : { boxShadow: `0 10px 36px -14px ${hue.glow}` }}
            >
              <img src={level.portrait} alt="" className={`absolute inset-0 size-full object-cover object-top transition-transform duration-500 ${locked ? "opacity-40" : "group-hover:scale-105"}`} loading="eager" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <span className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-sm bg-background/80 px-2 py-1 text-[10px] font-bold uppercase tracking-[.16em] backdrop-blur ${hue.text}`}>
                <StatusMark status={status} />Sector 0{level.number}
              </span>
              <span className="relative p-3 sm:p-4">
                <span className="display-font block text-base font-bold text-foreground sm:text-lg">{level.hero}</span>
                <span className="mt-0.5 block text-[11px] text-foreground/70">{level.shortTitle}</span>
                <span className={`mt-2 inline-block text-[10px] font-semibold uppercase tracking-[.14em] ${locked ? "text-muted-foreground" : hue.text}`}>{locked ? "Locked · clear previous sector" : statusLabel(status)}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="relative flex flex-col items-center justify-between gap-3 border-t border-border/60 bg-background/75 px-4 py-4 backdrop-blur sm:flex-row sm:px-6">
        <div className="flex items-center gap-2" role="group" aria-label="Badges">
          {levels.map((level, index) => {
            const earned = badges.includes(index + 1);
            return (
              <span key={level.number} className={`flex size-9 items-center justify-center rounded-full border-2 text-sm ${earned ? `${hueStyles[level.hue].border} ${hueStyles[level.hue].text} bg-background` : "border-border/60 text-muted-foreground/40"}`} aria-label={earned ? `${level.hero} badge earned` : `${level.hero} badge not earned`}>
                {earned ? level.emblem : <LockKeyhole className="size-3.5" />}
              </span>
            );
          })}
          <span className="ml-2 text-xs text-muted-foreground">{badges.length}/4 badges</span>
        </div>
        <button
          type="button"
          onClick={() => arenaUnlocked && onSelect(4)}
          disabled={!arenaUnlocked}
          className={`rounded-md border-2 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] transition-colors ${arenaUnlocked ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : "cursor-not-allowed border-border text-muted-foreground"}`}
          aria-label={`Final Assessment Arena, ${arenaUnlocked ? "available" : "locked"}`}
        >
          {arenaUnlocked ? "Enter final arena" : "Final arena · locked"}
        </button>
      </div>
    </div>
  );
}
