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

export function MascotFigure({
  mood,
  size = "md",
  className = "",
}: {
  mood: "happy" | "sad";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const isHappy = mood === "happy";
  const sizeMap = {
    sm: "size-20",
    md: "size-36 sm:size-44",
    lg: "size-48 sm:size-60",
  };
  const dims = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${dims} ${className}`}>
      {/* Background Aura / Glow */}
      <div
        className={`pointer-events-none absolute inset-2 rounded-full blur-2xl transition-all duration-700 ${
          isHappy
            ? "bg-hero-mint/30 shadow-[0_0_80px_var(--hero-mint)]"
            : "bg-destructive/25 shadow-[0_0_70px_var(--destructive)]"
        }`}
      />

      <svg
        viewBox="0 0 200 200"
        className={`relative z-10 size-full ${isHappy ? "mascot-happy" : "mascot-sad"}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={isHappy ? "Happy Mascot: Level Crossed" : "Sad Mascot: Level Not Crossed"}
      >
        <defs>
          <linearGradient id="bodyGradHappy" x1="100" y1="30" x2="100" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0d1b2a" />
          </linearGradient>
          <linearGradient id="bodyGradSad" x1="100" y1="30" x2="100" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c2834" />
            <stop offset="100%" stopColor="#14141d" />
          </linearGradient>
          <linearGradient id="visorGrad" x1="100" y1="65" x2="100" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#07131e" />
            <stop offset="100%" stopColor="#0a0e14" />
          </linearGradient>
          <radialGradient id="ringGlowHappy" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#54d4c5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#54d4c5" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ringGlowSad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
          </radialGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Hover thruster shadow at base */}
        <ellipse
          cx="100"
          cy="182"
          rx="44"
          ry="9"
          fill={isHappy ? "url(#ringGlowHappy)" : "url(#ringGlowSad)"}
          className="opacity-70"
        />

        {/* Happy Sparkles floating around */}
        {isHappy && (
          <g className="sparkle-twinkle">
            <path
              d="M 32 36 Q 32 46 22 46 Q 32 46 32 56 Q 32 46 42 46 Q 32 46 32 36 Z"
              fill="#f2c14e"
            />
            <path
              d="M 168 32 Q 168 40 160 40 Q 168 40 168 48 Q 168 40 176 40 Q 168 40 168 32 Z"
              fill="#54d4c5"
            />
            <circle cx="178" cy="95" r="3.5" fill="#f2c14e" />
            <circle cx="24" cy="98" r="3" fill="#54d4c5" />
          </g>
        )}

        {/* Sad Droplets / Sparks */}
        {!isHappy && (
          <g className="opacity-60">
            <circle cx="28" cy="48" r="2.5" fill="#f87171" className="opacity-50" />
            <circle cx="172" cy="52" r="2" fill="#94a3b8" className="opacity-40" />
          </g>
        )}

        {/* Left Antenna */}
        {isHappy ? (
          <g>
            <path d="M 68 54 L 46 26" stroke="#54d4c5" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="44" cy="24" r="8" fill="#f2c14e" filter="url(#glowEffect)" />
            <circle cx="44" cy="24" r="4" fill="#ffffff" />
            <circle cx="44" cy="24" r="13" stroke="#54d4c5" strokeWidth="1.5" strokeDasharray="3 3" className="signal-pulse" />
          </g>
        ) : (
          <g>
            <path d="M 66 58 Q 50 64 36 68" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
            <circle cx="34" cy="69" r="6" fill="#f87171" className="opacity-80" />
            <circle cx="34" cy="69" r="2.5" fill="#ffffff" />
          </g>
        )}

        {/* Right Antenna */}
        {isHappy ? (
          <g>
            <path d="M 132 54 L 154 26" stroke="#54d4c5" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="156" cy="24" r="8" fill="#f2c14e" filter="url(#glowEffect)" />
            <circle cx="156" cy="24" r="4" fill="#ffffff" />
            <circle cx="156" cy="24" r="13" stroke="#54d4c5" strokeWidth="1.5" strokeDasharray="3 3" className="signal-pulse" />
          </g>
        ) : (
          <g>
            <path d="M 134 58 Q 150 64 164 68" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
            <circle cx="166" cy="69" r="6" fill="#f87171" className="opacity-80" />
            <circle cx="166" cy="69" r="2.5" fill="#ffffff" />
          </g>
        )}

        {/* Floating Side Hands / Pods */}
        {isHappy ? (
          <g>
            <g transform="translate(24, 96)">
              <rect x="0" y="0" width="16" height="24" rx="8" fill="#1e3a5f" stroke="#54d4c5" strokeWidth="2.5" />
              <path d="M 8 2 L 8 -6" stroke="#54d4c5" strokeWidth="4" strokeLinecap="round" />
              <circle cx="8" cy="-7" r="3" fill="#f2c14e" />
            </g>
            <g transform="translate(160, 96)">
              <rect x="0" y="0" width="16" height="24" rx="8" fill="#1e3a5f" stroke="#54d4c5" strokeWidth="2.5" />
              <path d="M 8 2 L 8 -6" stroke="#54d4c5" strokeWidth="4" strokeLinecap="round" />
              <circle cx="8" cy="-7" r="3" fill="#f2c14e" />
            </g>
          </g>
        ) : (
          <g className="opacity-75">
            <rect x="26" y="118" width="14" height="22" rx="7" fill="#2c2834" stroke="#64748b" strokeWidth="2" />
            <rect x="160" y="118" width="14" height="22" rx="7" fill="#2c2834" stroke="#64748b" strokeWidth="2" />
          </g>
        )}

        {/* Mascot Main Chassis / Head */}
        <rect
          x="44"
          y="44"
          width="112"
          height="106"
          rx="36"
          fill={isHappy ? "url(#bodyGradHappy)" : "url(#bodyGradSad)"}
          stroke={isHappy ? "#54d4c5" : "#e05260"}
          strokeWidth="3.5"
        />

        {/* Visor Bezel & Screen */}
        <rect
          x="54"
          y="58"
          width="92"
          height="76"
          rx="24"
          fill="url(#visorGrad)"
          stroke={isHappy ? "#72e2d5" : "#475569"}
          strokeWidth="2"
        />

        {/* Visor Scanline details */}
        <line x1="58" y1="72" x2="142" y2="72" stroke={isHappy ? "#54d4c5" : "#475569"} strokeWidth="1" strokeOpacity="0.18" />
        <line x1="58" y1="86" x2="142" y2="86" stroke={isHappy ? "#54d4c5" : "#475569"} strokeWidth="1" strokeOpacity="0.18" />
        <line x1="58" y1="100" x2="142" y2="100" stroke={isHappy ? "#54d4c5" : "#475569"} strokeWidth="1" strokeOpacity="0.18" />
        <line x1="58" y1="114" x2="142" y2="114" stroke={isHappy ? "#54d4c5" : "#475569"} strokeWidth="1" strokeOpacity="0.18" />

        {/* FACIAL EXPRESSIONS */}
        {isHappy ? (
          <g>
            {/* Happy Eyes - Sparkling Upward Arcs */}
            <path
              d="M 68 90 C 68 76, 88 76, 88 90"
              stroke="#54d4c5"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
              filter="url(#glowEffect)"
            />
            <path
              d="M 112 90 C 112 76, 132 76, 132 90"
              stroke="#54d4c5"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
              filter="url(#glowEffect)"
            />
            {/* Eye sparkle highlights */}
            <circle cx="78" cy="80" r="2.5" fill="#ffffff" />
            <circle cx="122" cy="80" r="2.5" fill="#ffffff" />

            {/* Glowing Cheeks */}
            <ellipse cx="68" cy="99" rx="6" ry="3.5" fill="#ff79c6" fillOpacity="0.55" />
            <ellipse cx="132" cy="99" rx="6" ry="3.5" fill="#ff79c6" fillOpacity="0.55" />

            {/* Beaming Happy Smile */}
            <path
              d="M 88 102 Q 100 118 112 102"
              stroke="#f2c14e"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="#f2c14e"
              fillOpacity="0.25"
            />
          </g>
        ) : (
          <g>
            {/* Sad Eyes - Drooping Inward/Downward Arcs */}
            <path
              d="M 68 84 C 70 96, 86 96, 88 84"
              stroke="#f87171"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 112 84 C 114 96, 130 96, 132 84"
              stroke="#f87171"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Subtle worry brows */}
            <path d="M 68 76 L 84 80" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
            <path d="M 132 76 L 116 80" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />

            {/* Sad Frowning Mouth */}
            <path
              d="M 89 114 Q 100 103 111 114"
              stroke="#f87171"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Cyan Digital Teardrop dripping from left eye */}
            <g className="tear-drip">
              <path
                d="M 72 96 C 72 96 68 106 68 110 C 68 113.5 70.5 116 73.5 116 C 76.5 116 79 113.5 79 110 C 79 106 75 96 75 96 Z"
                fill="#54d4c5"
                filter="url(#glowEffect)"
              />
              <circle cx="72.5" cy="111" r="1.5" fill="#ffffff" />
            </g>
          </g>
        )}

        {/* Chassis Chest Indicator / Core */}
        <rect
          x="88"
          y="138"
          width="24"
          height="6"
          rx="3"
          fill={isHappy ? "#54d4c5" : "#e05260"}
          className={isHappy ? "animate-pulse" : ""}
        />
      </svg>
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
