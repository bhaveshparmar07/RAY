/**
 * Design tokens — the single source of truth for the Null Terminus palette,
 * easing curves, timing, and thresholds.
 */

/* ── Colour palette ────────────────────────────────────────────────────── */

export const COLORS = {
  /** Near-black base. */
  void: '#0A0B0D',
  /** Bone-white text. */
  bone: '#EDECE6',
  /** UV violet — reveal light, global accent. */
  violet: '#8A5CF6',
  /** Radar blue — atlas / sonar. */
  radar: '#38BDF8',
  /** Brass gold — mechanism / clockwork. */
  brass: '#C8A24B',
  /** Bio-green — confirmed / patched. */
  green: '#4ADE80',
  /** Signal red — critical / flatline. */
  red: '#FF3B30',
  /** Archive beige — atlas parchment / declassified paper. */
  beige: '#D9CBB0',
} as const;

/* ── Easing ─────────────────────────────────────────────────────────────── */

/** Mechanical expo-out — nothing bouncy. */
export const EASING = {
  expoOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  expoInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',
} as const;

/** GSAP-compatible easing string. */
export const GSAP_EASE = 'expo.out' as const;

/* ── Timing (ms) ────────────────────────────────────────────────────────── */

export const TIMING = {
  /** Character scramble resolve duration. */
  scrambleDuration: 600,
  /** Redaction bar slide-away duration. */
  redactionSlide: 500,
  /** Preloader minimum display time. */
  preloaderMin: 2800,
  /** Layer transition duration. */
  layerTransition: 800,
  /** Staggered reveal delay per line. */
  staggerDelay: 80,
} as const;

/* ── Cursor / reveal light ──────────────────────────────────────────────── */

export const REVEAL = {
  /** Default reveal radius (px). */
  radius: 120,
  /** Expanded radius on magnetic targets (px). */
  radiusExpanded: 180,
  /** Feather edge width (px). */
  feather: 60,
} as const;

/* ── Device capability thresholds ───────────────────────────────────────── */

export const DEVICE = {
  /** Below this core count → low-end mode (no WebGL, static fallbacks). */
  lowEndCores: 4,
  /** Max particle count on high-end. */
  particlesHigh: 800,
  /** Max particle count on mid-range. */
  particlesMid: 400,
} as const;

/* ── Severity → colour mapping ──────────────────────────────────────────── */

export const SEVERITY_COLOR: Record<string, string> = {
  critical: COLORS.red,
  high: '#FF9500',
  medium: COLORS.brass,
  low: COLORS.green,
} as const;
