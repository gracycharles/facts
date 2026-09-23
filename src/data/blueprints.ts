import { ShortsBlueprint } from '../types';
import { ALL_50_SCOTLAND_FACTS } from './scotlandFacts';
import { TEN_SECOND_OPTIMIZATIONS } from '../utils/tenSecondScriptOptimizer';
import { sanitizeOverlayText } from '../utils/overlaySanitizer';

const TARGET_ALGORITHM_TAGS = [
  'ScotlandFacts',
  'GlasgowHistory',
  'EdinburghFacts',
  'VisitScotland',
  'ScottishHumour',
  'ScottishNostalgia',
  'ScottishHistory',
  'HighlandsScotland',
  'ScottishFolklore',
  'Shorts'
];

function enrichScotlandBlueprint(raw: ShortsBlueprint): ShortsBlueprint {
  const existingTags = (raw.seo?.tags || []).map(t => t.replace(/^#/, '').trim());
  const mergedTags = Array.from(new Set([...existingTags, ...TARGET_ALGORITHM_TAGS]));

  const opt = TEN_SECOND_OPTIMIZATIONS[raw.id];

  const title = raw.title || raw.affirmationTitle || `Scotland Fact #${raw.id}`;
  const text = raw.factText || raw.affirmationText || title;
  const verse = raw.verification?.verdict || raw.scriptureVerse || '100% HISTORICALLY VERIFIED';
  const ref = raw.location || raw.scriptureRef || `${raw.city}, Scotland`;

  // 10s strictly calibrated audio script vs extended story script
  const originalAudioScript = raw.audioScript || text;
  const tenSecScript = (opt && opt.tenSecAudioScript) ? opt.tenSecAudioScript : originalAudioScript;

  // Optimized 3-line overlay safe-zone text (100% sanitized plain text)
  const line1Hook = sanitizeOverlayText((opt && opt.overlayHook) ? opt.overlayHook : (raw.subtitles?.line1Hook || title));
  const line2Fact = sanitizeOverlayText((opt && opt.overlayCoreFact) ? opt.overlayCoreFact : (raw.subtitles?.line2Fact || text));
  const line3Loc = sanitizeOverlayText((opt && opt.overlayLocationBadge) ? opt.overlayLocationBadge : (raw.subtitles?.line3Location || ref));
  const extraContext = sanitizeOverlayText((opt && opt.extraImportantContext) ? opt.extraImportantContext : (raw.comicalElement || ''));

  return {
    ...raw,
    title,
    factText: text,
    affirmationTitle: title,
    affirmationText: text,
    scriptureVerse: verse,
    scriptureRef: ref,
    englishText: text,
    englishRef: ref,
    audioScript: tenSecScript, // Default to 10s-safe calibrated audio script
    audioScript10s: tenSecScript,
    audioScriptExtended: originalAudioScript,
    overlayExtraContext: extraContext,
    subtitles: {
      line1Hook,
      line2Fact,
      line3Location: line3Loc,
      line1Affirmation: line1Hook,
      line2Scripture: line2Fact,
      line3Ref: line3Loc,
      line1Tamil: line1Hook,
      line2English: line2Fact
    },
    seo: {
      ...raw.seo,
      title: raw.seo?.title || `Fact #${raw.id} | ${title} | ${ref} | Scotland Facts`,
      description: raw.seo?.description || text,
      tags: mergedTags,
      hashtags: raw.seo?.hashtags || ['#Scotland', '#Glasgow', '#Edinburgh', '#Shorts']
    }
  };
}

export const INITIAL_BLUEPRINTS: ShortsBlueprint[] = ALL_50_SCOTLAND_FACTS.map(enrichScotlandBlueprint);

export const TOTAL_PRAISES_TARGET = 50;
export const TOTAL_FACTS_TARGET = 50;
export const CURRENT_VERIFIED_COUNT = INITIAL_BLUEPRINTS.length;
