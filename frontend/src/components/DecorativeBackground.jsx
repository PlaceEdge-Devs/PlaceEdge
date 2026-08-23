import React from 'react';

/* ═══════════════════════════════════════════════════════
   GRID PATTERNS
═══════════════════════════════════════════════════════ */

/** Fine dot-grid pattern — full page background texture */
export function DotGrid({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" className="fill-zinc-400/30 dark:fill-zinc-600/35" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>
  );
}

/** Canvas panel checkered background — signals "live preview" */
export function CanvasGrid({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="canvas-checker" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" className="fill-zinc-200/70 dark:fill-white/[0.035]" />
          <rect x="10" y="10" width="10" height="10" className="fill-zinc-200/70 dark:fill-white/[0.035]" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#canvas-checker)" />
    </svg>
  );
}

/** Diagonal crosshatch lines — subtle angled texture */
export function CrosshatchPattern({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="crosshatch" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <line x1="0" y1="16" x2="16" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400/20 dark:text-zinc-600/20" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#crosshatch)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   AMBIENT ORBS
═══════════════════════════════════════════════════════ */

/** Blurred colour orbs for ambient depth */
export function GradientOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-[20%] -left-[12%] h-[580px] w-[580px] rounded-full bg-rose-500/10 dark:bg-rose-600/[0.08] blur-[140px]" />
      <div className="absolute -bottom-[18%] -right-[12%] h-[650px] w-[650px] rounded-full bg-emerald-500/10 dark:bg-emerald-600/[0.07] blur-[160px]" />
      <div className="absolute top-[35%] left-[52%] h-[420px] w-[420px] rounded-full bg-indigo-500/8 dark:bg-indigo-600/[0.06] blur-[120px]" />
      {/* Extra orb — top right */}
      <div className="absolute -top-[5%] right-[10%] h-[300px] w-[300px] rounded-full bg-amber-400/6 dark:bg-amber-500/[0.04] blur-[100px]" />
      {/* Extra orb — bottom left */}
      <div className="absolute bottom-[15%] -left-[5%] h-[260px] w-[260px] rounded-full bg-violet-500/7 dark:bg-violet-600/[0.05] blur-[90px]" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE FLOATING SHAPES
═══════════════════════════════════════════════════════ */

/** Large full-page decorative geometry — top-left corner cluster */
export function FloatingShapesTopLeft({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute ${className}`}
      preserveAspectRatio="xMinYMin slice"
    >
      {/* Sweeping arc */}
      <path d="M -40 180 Q 160 -60 420 160" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-rose-400/25 dark:text-rose-500/18" />
      <path d="M -20 220 Q 180 -20 440 200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-rose-400/15 dark:text-rose-500/10" />

      {/* Nested squares — top left corner */}
      <rect x="18" y="18" width="48" height="48" rx="6" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-rose-400/30 dark:text-rose-500/20" />
      <rect x="30" y="30" width="24" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-rose-400/20 dark:text-rose-500/15" />

      {/* Small diamond */}
      <polygon points="90,52 102,64 90,76 78,64" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-400/30 dark:text-indigo-500/20" />

      {/* Dotted arc */}
      <path d="M 0 320 Q 100 200 240 280" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" className="text-zinc-400/30 dark:text-zinc-500/20" />

      {/* Triangle wireframe */}
      <polygon points="40,380 80,320 120,380" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400/25 dark:text-emerald-500/15" />

      {/* Plus / crosshair accent */}
      <line x1="180" y1="420" x2="204" y2="420" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/30" />
      <line x1="192" y1="408" x2="192" y2="432" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/30" />
      <circle cx="192" cy="420" r="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-400/40 dark:text-zinc-500/30" />

      {/* Concentric arcs — bottom left */}
      <path d="M 0 480 Q 40 440 80 480" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-400/20 dark:text-indigo-500/15" />
      <path d="M 0 500 Q 60 440 120 500" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-indigo-400/12 dark:text-indigo-500/10" />
    </svg>
  );
}

/** Large full-page decorative geometry — bottom-right corner cluster */
export function FloatingShapesBottomRight({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute ${className}`}
      preserveAspectRatio="xMaxYMax slice"
    >
      {/* Sweeping arc from bottom right */}
      <path d="M 560 320 Q 360 560 100 340" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-emerald-400/22 dark:text-emerald-500/16" />
      <path d="M 580 360 Q 380 600 120 380" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400/14 dark:text-emerald-500/10" />

      {/* Hexagon — bottom right */}
      <polygon points="430,408 454,394 478,408 478,436 454,450 430,436" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-indigo-400/30 dark:text-indigo-500/20" />
      <polygon points="440,416 454,408 468,416 468,432 454,440 440,432" fill="none" stroke="currentColor" strokeWidth="0.7" className="text-indigo-400/18 dark:text-indigo-500/12" />

      {/* Diagonal ruled lines */}
      <line x1="360" y1="300" x2="500" y2="200" stroke="currentColor" strokeWidth="1" className="text-rose-400/22 dark:text-rose-500/16" />
      <line x1="380" y1="320" x2="520" y2="220" stroke="currentColor" strokeWidth="0.5" className="text-rose-400/14 dark:text-rose-500/10" />
      <line x1="340" y1="280" x2="480" y2="180" stroke="currentColor" strokeWidth="0.4" className="text-rose-400/10 dark:text-rose-500/08" />

      {/* Circle ring */}
      <circle cx="460" cy="80" r="56" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400/20 dark:text-emerald-500/14" />
      <circle cx="460" cy="80" r="38" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-emerald-400/14 dark:text-emerald-500/10" />
      <circle cx="460" cy="80" r="18" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-emerald-400/22 dark:text-emerald-500/16" />
      <circle cx="460" cy="80" r="4" fill="currentColor" className="text-emerald-400/30 dark:text-emerald-500/20" />

      {/* Cross accent */}
      <line x1="60" y1="400" x2="84" y2="400" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/30" />
      <line x1="72" y1="388" x2="72" y2="412" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/30" />

      {/* Small square + rotated square (star-of-david-ish) */}
      <rect x="140" y="440" width="36" height="36" rx="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-rose-400/25 dark:text-rose-500/18" transform="rotate(15 158 458)" />
      <rect x="148" y="448" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="0.7" className="text-rose-400/16 dark:text-rose-500/12" />

      {/* Dotted long line */}
      <line x1="200" y1="30" x2="480" y2="30" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 8" className="text-zinc-400/30 dark:text-zinc-500/22" />
    </svg>
  );
}

/** Mid-page right edge — fills the gap between sidebar and canvas edges */
export function FloatingShapesMidRight({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 600"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute ${className}`}
    >
      {/* Vertical rhythm lines */}
      <line x1="100" y1="0" x2="100" y2="600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 12" className="text-zinc-400/20 dark:text-zinc-500/18" />
      <line x1="120" y1="80" x2="120" y2="520" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 16" className="text-zinc-400/14 dark:text-zinc-500/12" />

      {/* Orbit rings */}
      <circle cx="100" cy="200" r="40" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-indigo-400/20 dark:text-indigo-500/15" />
      <circle cx="100" cy="200" r="24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-indigo-400/14 dark:text-indigo-500/10" />
      <circle cx="100" cy="200" r="8" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-400/25 dark:text-indigo-500/18" />

      {/* Arrow pointing right */}
      <polyline points="60,350 90,350 80,340" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-rose-400/25 dark:text-rose-500/18" />
      <polyline points="90,350 80,360" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-rose-400/25 dark:text-rose-500/18" />

      {/* Small hex */}
      <polygon points="100,430 114,422 114,406 100,398 86,406 86,422" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400/22 dark:text-emerald-500/16" />
    </svg>
  );
}

/** Header area right-side decoration */
export function HeaderDecoration({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 120"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute ${className}`}
      preserveAspectRatio="xMaxYMid meet"
    >
      {/* Sweep line from right */}
      <path d="M 500 10 Q 320 60 200 20" fill="none" stroke="currentColor" strokeWidth="1" className="text-rose-400/20 dark:text-rose-500/14" />
      <path d="M 500 30 Q 340 80 220 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-rose-400/12 dark:text-rose-500/10" />

      {/* Small constellation dots */}
      <circle cx="300" cy="30" r="2" fill="currentColor" className="text-zinc-400/40 dark:text-zinc-500/30" />
      <circle cx="340" cy="55" r="1.5" fill="currentColor" className="text-zinc-400/35 dark:text-zinc-500/25" />
      <circle cx="320" cy="80" r="1.5" fill="currentColor" className="text-zinc-400/30 dark:text-zinc-500/22" />
      <circle cx="370" cy="40" r="1" fill="currentColor" className="text-zinc-400/30 dark:text-zinc-500/20" />
      <line x1="300" y1="30" x2="340" y2="55" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400/20 dark:text-zinc-500/15" />
      <line x1="340" y1="55" x2="320" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400/20 dark:text-zinc-500/15" />
      <line x1="340" y1="55" x2="370" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400/20 dark:text-zinc-500/15" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   PANEL CORNER ORNAMENTS
═══════════════════════════════════════════════════════ */

/** Decorative corner ornament for cards / panels — top-right */
export function CornerOrnamentTR({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute top-0 right-0 ${className}`}
    >
      <path d="M 80 0 L 80 60 Q 80 20 40 0 Z" fill="currentColor" className="text-rose-500/5 dark:text-rose-400/[0.06]" />
      <path d="M 80 0 Q 60 0 80 20" fill="none" stroke="currentColor" strokeWidth="1" className="text-rose-400/25 dark:text-rose-500/18" />
      <circle cx="72" cy="8" r="2" fill="currentColor" className="text-rose-400/30 dark:text-rose-500/22" />
    </svg>
  );
}

/** Decorative corner ornament for cards / panels — bottom-left */
export function CornerOrnamentBL({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute bottom-0 left-0 ${className}`}
    >
      <path d="M 0 80 L 60 80 Q 20 80 0 40 Z" fill="currentColor" className="text-emerald-500/5 dark:text-emerald-400/[0.06]" />
      <path d="M 0 80 Q 0 60 20 80" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400/25 dark:text-emerald-500/18" />
      <circle cx="8" cy="72" r="2" fill="currentColor" className="text-emerald-400/30 dark:text-emerald-500/22" />
    </svg>
  );
}

/** Small tick-mark / ruler accent — for sidebar top edge */
export function RulerAccent({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 12"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((x, i) => (
        <line
          key={x}
          x1={x} y1="12"
          x2={x} y2={i % 5 === 0 ? 4 : 8}
          stroke="currentColor"
          strokeWidth={i % 5 === 0 ? 1.2 : 0.7}
          className="text-zinc-400/35 dark:text-zinc-500/28"
        />
      ))}
      <line x1="0" y1="12" x2="200" y2="12" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400/25 dark:text-zinc-500/20" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED FLOATING ELEMENTS (CSS animation via style)
═══════════════════════════════════════════════════════ */

/** A single floating geometric shape with CSS float animation */
function FloatShape({ style, children, delay = '0s', duration = '7s' }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        animation: `floatY ${duration} ease-in-out infinite`,
        animationDelay: delay,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Animated floating geometry scattered across the page.
 * Uses pure CSS keyframes (defined in index.css).
 */
export function AnimatedFloatingShapes() {
  return (
    <>
      {/* ── Floating ring — top left area ── */}
      <FloatShape style={{ top: '12%', left: '3%' }} delay="0s" duration="8s">
        <svg viewBox="0 0 60 60" width={60} height={60} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-rose-400/22 dark:text-rose-500/16" />
          <circle cx="30" cy="30" r="16" fill="none" stroke="currentColor" strokeWidth="0.7" className="text-rose-400/15 dark:text-rose-500/10" />
          <circle cx="30" cy="30" r="4" fill="currentColor" className="text-rose-400/25 dark:text-rose-500/18" />
        </svg>
      </FloatShape>

      {/* ── Floating triangle — top right ── */}
      <FloatShape style={{ top: '8%', right: '5%' }} delay="1.5s" duration="9s">
        <svg viewBox="0 0 64 64" width={56} height={56} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <polygon points="32,6 60,54 4,54" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-indigo-400/28 dark:text-indigo-500/20" />
          <polygon points="32,16 50,48 14,48" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-indigo-400/16 dark:text-indigo-500/12" />
        </svg>
      </FloatShape>

      {/* ── Floating hexagon — mid left ── */}
      <FloatShape style={{ top: '38%', left: '1.5%' }} delay="0.8s" duration="10s">
        <svg viewBox="0 0 70 70" width={64} height={64} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <polygon points="35,4 63,19 63,51 35,66 7,51 7,19" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-emerald-400/24 dark:text-emerald-500/17" />
          <polygon points="35,14 55,25 55,45 35,56 15,45 15,25" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-emerald-400/14 dark:text-emerald-500/10" />
        </svg>
      </FloatShape>

      {/* ── Floating diamond — right mid ── */}
      <FloatShape style={{ top: '45%', right: '2%' }} delay="2.2s" duration="7.5s">
        <svg viewBox="0 0 56 56" width={52} height={52} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <polygon points="28,4 52,28 28,52 4,28" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-amber-400/25 dark:text-amber-500/18" />
          <polygon points="28,14 42,28 28,42 14,28" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-amber-400/16 dark:text-amber-500/11" />
        </svg>
      </FloatShape>

      {/* ── Floating square — bottom left ── */}
      <FloatShape style={{ bottom: '18%', left: '2%' }} delay="3s" duration="11s">
        <svg viewBox="0 0 52 52" width={48} height={48} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="6" y="6" width="40" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-rose-400/22 dark:text-rose-500/16" transform="rotate(12 26 26)" />
          <rect x="14" y="14" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-rose-400/14 dark:text-rose-500/10" transform="rotate(12 26 26)" />
        </svg>
      </FloatShape>

      {/* ── Floating star / asterisk — bottom right ── */}
      <FloatShape style={{ bottom: '12%', right: '3.5%' }} delay="1s" duration="8.5s">
        <svg viewBox="0 0 60 60" width={54} height={54} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="30" y1="6" x2="30" y2="54" stroke="currentColor" strokeWidth="1.2" className="text-indigo-400/28 dark:text-indigo-500/20" />
          <line x1="6" y1="30" x2="54" y2="30" stroke="currentColor" strokeWidth="1.2" className="text-indigo-400/28 dark:text-indigo-500/20" />
          <line x1="12" y1="12" x2="48" y2="48" stroke="currentColor" strokeWidth="1.2" className="text-indigo-400/22 dark:text-indigo-500/16" />
          <line x1="48" y1="12" x2="12" y2="48" stroke="currentColor" strokeWidth="1.2" className="text-indigo-400/22 dark:text-indigo-500/16" />
          <circle cx="30" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-400/30 dark:text-indigo-500/22" />
        </svg>
      </FloatShape>

      {/* ── Floating bracket pair — upper centre ── */}
      <FloatShape style={{ top: '22%', left: '46%' }} delay="4s" duration="12s">
        <svg viewBox="0 0 60 40" width={54} height={36} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M 18 4 L 8 4 Q 4 4 4 8 L 4 32 Q 4 36 8 36 L 18 36" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-zinc-400/30 dark:text-zinc-500/22" />
          <path d="M 42 4 L 52 4 Q 56 4 56 8 L 56 32 Q 56 36 52 36 L 42 36" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-zinc-400/30 dark:text-zinc-500/22" />
        </svg>
      </FloatShape>

      {/* ── Floating orbit — left below mid ── */}
      <FloatShape style={{ top: '62%', left: '3%' }} delay="2.5s" duration="9.5s">
        <svg viewBox="0 0 56 56" width={52} height={52} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse cx="28" cy="28" rx="24" ry="12" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400/22 dark:text-emerald-500/16" />
          <ellipse cx="28" cy="28" rx="12" ry="24" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400/22 dark:text-emerald-500/16" />
          <circle cx="28" cy="28" r="3" fill="currentColor" className="text-emerald-400/30 dark:text-emerald-500/22" />
        </svg>
      </FloatShape>

      {/* ── Floating arc arrow — right upper ── */}
      <FloatShape style={{ top: '28%', right: '1.5%' }} delay="0.5s" duration="8s">
        <svg viewBox="0 0 60 60" width={50} height={50} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M 10 50 Q 10 10 50 10" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-rose-400/24 dark:text-rose-500/17" />
          <polyline points="42,6 50,10 46,18" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-rose-400/24 dark:text-rose-500/17" />
        </svg>
      </FloatShape>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   BETWEEN-COLUMNS DIVIDER DECORATION
═══════════════════════════════════════════════════════ */

/** Vertical decorative strip between sidebar and canvas */
export function ColumnDivider({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 600"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Centre dashed line */}
      <line x1="12" y1="0" x2="12" y2="600" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 10" className="text-zinc-300/50 dark:text-zinc-600/35" />

      {/* Tick marks every 60px */}
      {[60, 120, 180, 240, 300, 360, 420, 480, 540].map(y => (
        <line key={y} x1="6" y1={y} x2="18" y2={y} stroke="currentColor" strokeWidth="0.8" className="text-zinc-300/50 dark:text-zinc-600/35" />
      ))}

      {/* Centre diamond */}
      <polygon points="12,290 18,300 12,310 6,300" fill="currentColor" className="text-zinc-300/60 dark:text-zinc-600/45" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   CANVAS PANEL DECORATIONS
═══════════════════════════════════════════════════════ */

/** Corner tick marks for canvas panel — like a design frame */
export function CanvasCornerTicks({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      preserveAspectRatio="none"
    >
      {/* Top-left */}
      <line x1="0" y1="0" x2="16" y2="0" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/35" vectorEffect="non-scaling-stroke" />
      <line x1="0" y1="0" x2="0" y2="16" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/35" vectorEffect="non-scaling-stroke" />
      {/* Top-right */}
      <line x1="100" y1="0" x2="84" y2="0" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/35" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="0" x2="100" y2="16" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/35" vectorEffect="non-scaling-stroke" />
      {/* Bottom-left */}
      <line x1="0" y1="100" x2="16" y2="100" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/35" vectorEffect="non-scaling-stroke" />
      <line x1="0" y1="100" x2="0" y2="84" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/35" vectorEffect="non-scaling-stroke" />
      {/* Bottom-right */}
      <line x1="100" y1="100" x2="84" y2="100" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/35" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="100" x2="100" y2="84" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400/40 dark:text-zinc-500/35" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   THEME TOGGLE ICONS
═══════════════════════════════════════════════════════ */

export function SunIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function MoonIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
