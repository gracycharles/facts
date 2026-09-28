import { ShortsBlueprint } from '../types';
import { calculateAudioTiming, AudioTimingMetric } from './tenSecondScriptOptimizer';
import { expandNumbersToWords } from './numberToWords';

export type VoiceArchetypeId = 
  | 'auto' 
  | 'glasgow_raconteur' 
  | 'highland_bard' 
  | 'edinburgh_scholar' 
  | 'scottish_female_raconteur'
  | 'british_young_female'
  | 'myth_investigator';

export interface VoiceArchetype {
  id: VoiceArchetypeId;
  name: string;
  shortLabel: string;
  tagline: string;
  accent: string;
  gender: 'female' | 'male' | 'adaptive';
  ageRange: string;
  cadence: string;
  pitch: number;
  rate: number;
  description: string;
}

export const VOICE_ARCHETYPES: Record<VoiceArchetypeId, VoiceArchetype> = {
  auto: {
    id: 'auto',
    name: 'Native Character Voice (Spoken by On-Screen Character)',
    shortLabel: 'Character Voice (Native)',
    tagline: 'Speaks directly in the authentic voice, gender, and era of the on-screen character',
    accent: 'Character-Matched Authentic Scottish / British Dialect',
    gender: 'adaptive',
    ageRange: 'Matched to Character',
    cadence: '140-150 WPM, character-acting cadence',
    pitch: 1.0,
    rate: 1.02,
    description: 'Speaks in the authentic voice of the character involved in the video (male voice for male characters, female voice for female characters).'
  },
  glasgow_raconteur: {
    id: 'glasgow_raconteur',
    name: 'Glasgow Working-Class Male (Tradesman / Raconteur)',
    shortLabel: 'Glasgow Male',
    tagline: 'Hearty, earthy Glaswegian working-class banter, quick laughs, and local pride',
    accent: 'Authentic West Coast Glaswegian dialect',
    gender: 'male',
    ageRange: '35-50 years old',
    cadence: '145-155 WPM, lively colloquial swagger, hearty knowing cadence',
    pitch: 0.90,
    rate: 1.04,
    description: 'Earthy, hearty, and authentic. Best suited for shipyard workers, quarrymen, motormen, foundrymen, and street wits.'
  },
  highland_bard: {
    id: 'highland_bard',
    name: 'Highland Scottish Male (Clan Warrior & Lore Master)',
    shortLabel: 'Highland Male',
    tagline: 'Deep, resonant, atmospheric Scottish brogue with epic storytelling gravitas',
    accent: 'Authentic Scottish Highland / West Coast Brogue',
    gender: 'male',
    ageRange: '45-60 years old',
    cadence: '120-130 WPM, rolling r\'s, resonant breath pauses, cinematic weight',
    pitch: 0.82,
    rate: 0.94,
    description: 'Rich, gravelly, and epic. Ideal for ancient castles, William Wallace, Robert the Bruce, Highland clans, and warriors.'
  },
  edinburgh_scholar: {
    id: 'edinburgh_scholar',
    name: 'Edinburgh Gentleman & Scholar (Academic / Regency)',
    shortLabel: 'Edinburgh Male',
    tagline: 'Dignified Scottish Enlightenment diction, authority, and historical intrigue',
    accent: 'Refined Edinburgh Lothian / Scottish Academic RP',
    gender: 'male',
    ageRange: '40-55 years old',
    cadence: '135-145 WPM, articulate, crisp, dignified delivery',
    pitch: 0.94,
    rate: 1.0,
    description: 'Eloquent and dignified gentleman voice. Excellent for Duke of Wellington, Deacon Brodie, doctors, inventors, and councillors.'
  },
  scottish_female_raconteur: {
    id: 'scottish_female_raconteur',
    name: 'Scottish Female Character (Matriarch / Fishwife / Heroine)',
    shortLabel: 'Scottish Female',
    tagline: 'Sharp-witted, feisty, and warm authentic Scottish female cadence',
    accent: 'Authentic Scots Dialect / Edinburgh Lothian / Glaswegian Female',
    gender: 'female',
    ageRange: '30-45 years old',
    cadence: '140-150 WPM, spirited comedic timing, lively and rich',
    pitch: 1.14,
    rate: 1.04,
    description: 'Vibrant, sharp, and charismatic. Perfect for Maggie McIver, Old Town fishwives, steamie matriarchs, and Scottish heroines.'
  },
  british_young_female: {
    id: 'british_young_female',
    name: 'British Young Female Narrator',
    shortLabel: 'British Young Female',
    tagline: 'Vibrant, witty, and fast-paced delivery with charming Scottish/RP lilt',
    accent: 'Contemporary British / Edinburgh-RP blend',
    gender: 'female',
    ageRange: '20-25 years old',
    cadence: '140-150 WPM, energetic comedic pauses, warm playful inflection',
    pitch: 1.18,
    rate: 1.04,
    description: 'Bright, charismatic, and punchy modern British female narration.'
  },
  myth_investigator: {
    id: 'myth_investigator',
    name: 'Scottish Myth & Mystery Lore Voice',
    shortLabel: 'Mystery Lore',
    tagline: 'Dramatic, suspenseful cinematic cadence with eerie local lore',
    accent: 'Intense Scottish Dramatic Lilt',
    gender: 'male',
    ageRange: '35-50 years old',
    cadence: '125-135 WPM, whispering emphasis, dramatic comedic relief',
    pitch: 0.92,
    rate: 0.96,
    description: 'Suspenseful and engaging. Designed for Kelpie legends, cryptids, and Scottish highland folklore.'
  }
};

/**
 * Accurately detects character gender and casting traits from the blueprint
 */
export function detectCharacterGender(b: ShortsBlueprint): 'female' | 'male' {
  const text = ((b.characterName || '') + ' ' + (b.character || '')).toLowerCase();
  
  // Specific female character triggers
  const femaleKeywords = [
    'maggie mciver', 'maggie', 'kirsty', 'maisie', 'mistress', 'fishwife', 
    'queen elizabeth', 'mary queen', 'flora macdonald', 'elsie inglis', 
    'mary slessor', 'isobel the herbalist', 'barras queen', 'steamie queen', 
    'matriarch in headscarf', 'feisty 18th-century edinburgh fishwife', 
    'housewife in floral apron', 'heroine', 'duchess'
  ];

  for (const fk of femaleKeywords) {
    if (text.includes(fk)) {
      // Exclude male characters who merely reference a queen in their description
      if (text.startsWith('sir ') || text.startsWith('mr ') || text.includes('shipyard joiner') || text.includes('the clydebank shipbuilder')) {
        return 'male';
      }
      return 'female';
    }
  }

  return 'male';
}

/**
 * Determines the best content-matched voice archetype for a given fact
 */
export function getRecommendedVoiceForFact(b: ShortsBlueprint): VoiceArchetype {
  const gender = detectCharacterGender(b);
  const text = `${b.title} ${b.factText} ${b.location} ${b.character} ${b.characterName} ${b.comicalElement} ${b.category}`.toLowerCase();

  // Female characters
  if (gender === 'female') {
    return VOICE_ARCHETYPES.scottish_female_raconteur;
  }

  // Male characters - Clan warriors, Highland lore, William Wallace, Robert the Bruce
  if (
    text.includes('wallace') ||
    text.includes('bruce') ||
    text.includes('highland') ||
    text.includes('clan') ||
    text.includes('kilt') ||
    text.includes('loch ness') ||
    text.includes('bagpipe') ||
    text.includes('piper')
  ) {
    return VOICE_ARCHETYPES.highland_bard;
  }

  // Male characters - Edinburgh gentlemen, scholars, councillors, doctors, inventors
  if (
    text.includes('duke') ||
    text.includes('wellington') ||
    text.includes('brodie') ||
    text.includes('scholar') ||
    text.includes('doctor') ||
    text.includes('dr ') ||
    text.includes('professor') ||
    text.includes('sir ') ||
    text.includes('enlightenment') ||
    text.includes('gunner') ||
    text.includes('sergeant') ||
    text.includes('surveyor') ||
    text.includes('pilot') ||
    text.includes('aviator')
  ) {
    return VOICE_ARCHETYPES.edinburgh_scholar;
  }

  // Male characters - Glasgow tradesmen, quarrymen, motormen, riveters, foundrymen, chefs, fryers
  return VOICE_ARCHETYPES.glasgow_raconteur;
}

export interface CharacterVoiceSyncInfo {
  characterName: string;
  characterRole: string;
  gender: 'male' | 'female';
  matchedArchetype: VoiceArchetype;
  lipSyncDirective: string;
  actingInflection: string;
  emotionalTone: string;
  pacingNote: string;
}

/**
 * Generates rich character-to-audio synchronization directives for video generation and narration
 */
export function getCharacterVoiceSyncInfo(
  b: ShortsBlueprint,
  selectedVoiceId: VoiceArchetypeId = 'auto'
): CharacterVoiceSyncInfo {
  const gender = detectCharacterGender(b);
  const matchedArchetype = selectedVoiceId === 'auto'
    ? getRecommendedVoiceForFact(b)
    : (VOICE_ARCHETYPES[selectedVoiceId] || getRecommendedVoiceForFact(b));

  const charName = b.characterName || b.character || 'The Scottish Narrator';
  const comical = b.comicalElement || 'Authentic Scottish wit';

  let actingInflection = 'Spoken directly in the authentic voice and accent of the on-screen character';
  let emotionalTone = 'Charismatic, lively, and character-authentic';

  if (gender === 'female') {
    actingInflection = `Authentic Scottish female voice (${matchedArchetype.ageRange}) with spirited Scots colloquial inflection and warm theatrical timing`;
    emotionalTone = 'Vibrant, sharp-witted, matriarchal Scottish warmth';
  } else if (matchedArchetype.id === 'glasgow_raconteur') {
    actingInflection = `Authentic working-class Glaswegian male voice (${matchedArchetype.ageRange}) with hearty earthy delivery and natural comedic wonder`;
    emotionalTone = 'Hearty, proud, earthy working-class Scottish male cadence';
  } else if (matchedArchetype.id === 'highland_bard') {
    actingInflection = `Deep resonant Highland Scottish male brogue (${matchedArchetype.ageRange}), rolling r\'s, epic storytelling gravitas`;
    emotionalTone = 'Majestic, solemn, ancient Scottish folklore power';
  } else if (matchedArchetype.id === 'edinburgh_scholar') {
    actingInflection = `Dignified Scottish/British gentleman voice (${matchedArchetype.ageRange}), crisp articulate diction and natural historical authority`;
    emotionalTone = 'Cultured, authoritative, dignified Scottish intrigue';
  } else {
    actingInflection = `Character-authentic ${gender} voice (${matchedArchetype.ageRange}) matching on-screen physical presence and era`;
    emotionalTone = 'Authentic and engaging';
  }

  const lipSyncDirective = `Visual Lip-Sync & Facial Acting: The on-screen character (${charName} - ${gender.toUpperCase()}) speaks the script aloud. Mouth movements, facial expressions, and comedic hand gestures are synchronized directly to spoken phonetics at ~145 WPM. Spoken audio completes cleanly with a 0.5s acoustic tail before the 10.0s scene cutoff.`;

  return {
    characterName: charName,
    characterRole: b.character || 'Primary Story Character',
    gender,
    matchedArchetype,
    lipSyncDirective,
    actingInflection,
    emotionalTone,
    pacingNote: `${matchedArchetype.cadence} (Strictly ≤10.0s Limit)`
  };
}

export interface CharacterVoiceDirection {
  archetypeId: VoiceArchetypeId;
  archetypeName: string;
  characterName: string;
  gender: 'male' | 'female';
  voiceProfile: string;
  vocalTone: string;
  narrationStyle: string;
  wittyComedicNuance: string;
  voiceProfileDirective: string;
  audioNarrationScript: string;
  audioPhonetics: string;
  backgroundAudio: string;
  elevenLabsPrompt: string;
  timing: AudioTimingMetric;
  characterSync: CharacterVoiceSyncInfo;
}

/**
 * Builds voice direction for Scotland Facts based on selected or content-adaptive voice
 */
export function buildCharacterVoiceDirection(
  b: ShortsBlueprint,
  selectedVoiceId: VoiceArchetypeId = 'auto'
): CharacterVoiceDirection {
  const syncInfo = getCharacterVoiceSyncInfo(b, selectedVoiceId);
  const activeArchetype = syncInfo.matchedArchetype;
  const gender = syncInfo.gender;
  const charName = syncInfo.characterName;
  const comical = b.comicalElement || 'Authentic Scottish wit with local nostalgic banter';
  const phonetics = b.audioPhonetics || '';
  const location = b.location || `${b.city}, Scotland`;

  const voiceProfile = `Spoken directly by on-screen character: ${charName} (${gender.toUpperCase()} — ${activeArchetype.accent}, ${activeArchetype.ageRange}) - ${syncInfo.actingInflection}`;
  const vocalTone = `${syncInfo.actingInflection}; ${activeArchetype.description}`;
  const narrationStyle = `Voice spoken directly by the on-screen ${gender} character; ${syncInfo.emotionalTone}.`;
  const wittyComedicNuance = `Local comedic nuance: ${comical}`;

  const rawScript = b.audioScript10s || b.audioScript || `${b.title}! Did you know: ${b.factText}`;
  const audioNarrationScript = expandNumbersToWords(rawScript);
  const timing = calculateAudioTiming(audioNarrationScript);

  const voiceProfileDirective = `[CHARACTER-NATIVE ${gender.toUpperCase()} AUDIO DIRECTIVE (EXACT 10.0s CONFINED)]: Spoken in the authentic voice of the on-screen character (${charName} - ${gender.toUpperCase()}, ${activeArchetype.accent}). Spoken Timing: ${timing.wordCount} words (~${timing.estimatedDurationSec}s). Lip-sync matches spoken audio verbatim.`;

  const elevenLabsPrompt = `[CHARACTER-NATIVE ${gender.toUpperCase()} AUDIO & VOICE DIRECTIVE (EXACT 10.0s CONFINED)]
• Character Speaker: ${charName} (${gender.toUpperCase()} - Spoken directly by the primary on-screen character)
• Gender & Persona Mandate: ${gender.toUpperCase()} voice strictly matching the on-screen character appearance. NO mismatched voice genders.
• Accent & Dialect: ${activeArchetype.accent} | Age: ${activeArchetype.ageRange}
• Acting Inflection: ${syncInfo.actingInflection}
• Lip-Sync & Motion Sync: ${syncInfo.lipSyncDirective}
• Exact Duration Limit: STRICT ≤10.0 SECONDS CONFINED (${timing.wordCount} words / ~${timing.estimatedDurationSec}s spoken audio)
• Delivery Pace & Tone: ${activeArchetype.cadence}
• Local Phonetics Guide: ${phonetics || 'Standard Scottish and British local place names'}
• Ambience / Soundscape: ${location} • ${b.backgroundAudio || 'Authentic ambient soundscape'}
• EXACT SPOKEN SCRIPT (Read Every Word Verbatim):
"${audioNarrationScript}"`;

  return {
    archetypeId: activeArchetype.id,
    archetypeName: activeArchetype.name,
    characterName: charName,
    gender,
    voiceProfile,
    vocalTone,
    narrationStyle,
    wittyComedicNuance,
    voiceProfileDirective,
    audioNarrationScript,
    audioPhonetics: phonetics,
    backgroundAudio: b.backgroundAudio || '',
    elevenLabsPrompt,
    timing,
    characterSync: syncInfo
  };
}

/**
 * In-browser Web Speech API audio player supporting character-matched voices
 */
let currentUtterance: SpeechSynthesisUtterance | null = null;

export function playAdaptiveVoice(
  script: string,
  voiceArchetype: VoiceArchetype,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  stopSpeech();

  const expandedScript = expandNumbersToWords(script);
  const utterance = new SpeechSynthesisUtterance(expandedScript);
  currentUtterance = utterance;

  const voices = window.speechSynthesis.getVoices();

  // Find best matching voice based on archetype gender & accent
  let matchedVoice: SpeechSynthesisVoice | undefined;

  if (voiceArchetype.gender === 'female') {
    matchedVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith('en-gb') && 
      (v.name.toLowerCase().includes('female') || 
       v.name.toLowerCase().includes('hazel') || 
       v.name.toLowerCase().includes('libby') || 
       v.name.toLowerCase().includes('victoria') || 
       v.name.toLowerCase().includes('sonia') || 
       v.name.toLowerCase().includes('fiona') ||
       v.name.toLowerCase().includes('stephanie') ||
       v.name.toLowerCase().includes('kate'))
    ) || voices.find(v => v.lang.toLowerCase().startsWith('en-gb'))
      || voices.find(v => v.name.toLowerCase().includes('uk english') && v.name.toLowerCase().includes('female'))
      || voices.find(v => v.lang.toLowerCase().startsWith('en'));
  } else {
    // Male or default
    matchedVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith('en-gb') && 
      (v.name.toLowerCase().includes('male') || 
       v.name.toLowerCase().includes('george') || 
       v.name.toLowerCase().includes('oliver') || 
       v.name.toLowerCase().includes('daniel') ||
       v.name.toLowerCase().includes('arthur'))
    ) || voices.find(v => v.lang.toLowerCase().startsWith('en-gb') && !v.name.toLowerCase().includes('female'))
      || voices.find(v => v.name.toLowerCase().includes('uk english'))
      || voices.find(v => v.lang.toLowerCase().startsWith('en'));
  }

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  // Calibrate speech rate to guarantee clear pronunciation and finish cleanly under 10.0s
  const words = script.trim().split(/\s+/).filter(Boolean);
  let calibratedRate = voiceArchetype.rate;
  if (words.length > 21) {
    calibratedRate = Math.min(1.12, voiceArchetype.rate * 1.08);
  } else if (words.length <= 18) {
    calibratedRate = Math.max(0.98, voiceArchetype.rate);
  } else {
    calibratedRate = Math.max(1.0, voiceArchetype.rate);
  }

  utterance.pitch = voiceArchetype.gender === 'male' ? 0.90 : 1.14;
  utterance.rate = calibratedRate;

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    currentUtterance = null;
    if (onError) onError();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export const playBritishVoice = (
  script: string, 
  onStart?: () => void, 
  onEnd?: () => void, 
  onError?: () => void
) => playAdaptiveVoice(script, VOICE_ARCHETYPES.auto, onStart, onEnd, onError);

export const stopBritishVoice = stopSpeech;

export function isSpeechPlaying(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}
