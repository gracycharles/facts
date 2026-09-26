import { ShortsBlueprint } from '../types';
import { sanitizeOverlayText } from './overlaySanitizer';
import { TenSecondScriptOptimization } from './tenSecondOptimizations/types';
import { PART_1_TO_50 } from './tenSecondOptimizations/part1to50';
import { PART_51_TO_100 } from './tenSecondOptimizations/part51to100';
import { PART_101_TO_150 } from './tenSecondOptimizations/part101to150';

export type { TenSecondScriptOptimization };

export const TEN_SECOND_OPTIMIZATIONS: Record<number, TenSecondScriptOptimization> = {
  ...PART_1_TO_50,
  ...PART_51_TO_100,
  ...PART_101_TO_150
};

export function getOptimized10sScript(factId: number): TenSecondScriptOptimization | undefined {
  return TEN_SECOND_OPTIMIZATIONS[factId];
}

export function getOptimizedOverlayData(blueprint: ShortsBlueprint): {
  hook: string;
  coreFact: string;
  locationBadge: string;
  extraContext: string;
} {
  const opt = TEN_SECOND_OPTIMIZATIONS[blueprint.id];
  const rawHook = opt?.overlayHook || blueprint.subtitles?.line1Hook || blueprint.title || '';
  const rawCoreFact = opt?.overlayCoreFact || blueprint.subtitles?.line2Fact || blueprint.factText || '';
  const rawLocation = opt?.overlayLocationBadge || blueprint.subtitles?.line3Location || blueprint.location || '';
  const rawExtra = opt?.extraImportantContext || blueprint.overlayExtraContext || '';

  return {
    hook: sanitizeOverlayText(rawHook),
    coreFact: sanitizeOverlayText(rawCoreFact),
    locationBadge: sanitizeOverlayText(rawLocation),
    extraContext: sanitizeOverlayText(rawExtra)
  };
}

export interface AudioTimingMetric {
  wordCount: number;
  estimatedDurationSec: number;
  paceRating: 'PERFECT (8.0-9.8s)' | 'SLIGHTLY FAST (<8.0s)' | 'TOO LONG (>10.0s)';
  statusLabel: string;
  statusColor: string;
  wpm: number;
  recommendedSpeechRate: number;
  targetMaxDurationSec: number;
}

/**
 * Calculates audio timing metrics and the precise speech synthesis rate multiplier
 * so the spoken audio finishes strictly within the 10-second video duration
 * without any text clipping or loss of clear Scottish / UK pronunciation.
 */
export function calculateAudioTiming(text: string, baseWpm: number = 145): AudioTimingMetric {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  // Natural duration at base conversational speaking rate (145 WPM)
  const estimatedDurationSec = Number(((wordCount / baseWpm) * 60).toFixed(1));

  // Target maximum duration is 9.5s to provide a 0.5s safety buffer inside the 10s video window
  const targetMaxDurationSec = 9.5;

  // Adaptive rate adjustment: if words take > 9.5s at base 145 WPM, subtly speed up (e.g. 1.05 - 1.12x)
  // while keeping pronunciation pristine and natural
  let recommendedSpeechRate = 1.0;
  if (estimatedDurationSec > targetMaxDurationSec) {
    recommendedSpeechRate = Number((estimatedDurationSec / targetMaxDurationSec).toFixed(2));
    // Clamp to 1.15x maximum to preserve crystal-clear phonetics
    recommendedSpeechRate = Math.min(1.15, Math.max(1.0, recommendedSpeechRate));
  } else if (estimatedDurationSec < 7.0 && wordCount > 0) {
    // If very short, gently slow to 0.95x for gravitas
    recommendedSpeechRate = 0.95;
  }

  let paceRating: AudioTimingMetric['paceRating'] = 'PERFECT (8.0-9.8s)';
  let statusColor = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
  let statusLabel = `${estimatedDurationSec}s • Fits 10s Window`;

  if (estimatedDurationSec > 10.0) {
    paceRating = 'TOO LONG (>10.0s)';
    statusColor = 'bg-rose-950/80 text-rose-300 border-rose-500/40';
    statusLabel = `${estimatedDurationSec}s • Over 10s`;
  } else if (estimatedDurationSec < 8.0) {
    paceRating = 'SLIGHTLY FAST (<8.0s)';
    statusColor = 'bg-sky-950/80 text-sky-300 border-sky-500/40';
    statusLabel = `${estimatedDurationSec}s • Punchy Fast`;
  }

  return {
    wordCount,
    estimatedDurationSec,
    paceRating,
    statusLabel,
    statusColor,
    wpm: baseWpm,
    recommendedSpeechRate,
    targetMaxDurationSec
  };
}
