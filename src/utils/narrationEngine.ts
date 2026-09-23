import { ShortsBlueprint } from '../types';
import { calculateAudioTiming, AudioTimingMetric, getOptimized10sScript } from './tenSecondScriptOptimizer';

export type VoiceArchetypeId = 
  | 'auto' 
  | 'british_young_female' 
  | 'highland_bard' 
  | 'glasgow_raconteur' 
  | 'edinburgh_scholar' 
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
    name: 'Adaptive Voice (According to Content)',
    shortLabel: 'Auto (Content-Matched)',
    tagline: 'Dynamically selects the authentic Scottish voice best suited to each topic',
    accent: 'Context-Adaptive Scottish / British Accent',
    gender: 'adaptive',
    ageRange: 'Matched to Scene',
    cadence: 'Variable based on comedy vs historical gravitas',
    pitch: 1.0,
    rate: 1.0,
    description: 'Intelligently switches voice tone based on the fact context (Glaswegian comedian for street banter, Highland bard for legends, Edinburgh historian for old town secrets).'
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
    description: 'Bright, charismatic, and punchy. Perfect for modern urban facts, quirky traditions, and viral social media pacing.'
  },
  highland_bard: {
    id: 'highland_bard',
    name: 'Highland Bard & Gaelic Lore Master',
    shortLabel: 'Highland Bard',
    tagline: 'Deep, resonant, atmospheric Scottish brogue with epic storytelling gravitas',
    accent: 'Authentic Scottish Highland / West Coast Brogue',
    gender: 'male',
    ageRange: '45-60 years old',
    cadence: '120-130 WPM, rolling r\'s, resonant breath pauses, cinematic weight',
    pitch: 0.82,
    rate: 0.92,
    description: 'Rich, gravelly, and epic. Ideal for ancient castles, William Wallace, Loch Ness, misty glens, and medieval clans.'
  },
  glasgow_raconteur: {
    id: 'glasgow_raconteur',
    name: 'Glasgow Street Raconteur (Stand-up Comic)',
    shortLabel: 'Glasgow Comic',
    tagline: 'Sharp Glaswegian working-class banter, quick laughs, and local pride',
    accent: 'Authentic West Coast Glaswegian dialect',
    gender: 'male',
    ageRange: '30-45 years old',
    cadence: '145-155 WPM, lively colloquial swagger, warm knowing chuckles',
    pitch: 0.94,
    rate: 1.06,
    description: 'Unfiltered, hilarious, and authentic. Best suited for the Wellington cone, Clockwork Orange subway, Barras market, and chip shop lore.'
  },
  edinburgh_scholar: {
    id: 'edinburgh_scholar',
    name: 'Old Town Edinburgh Scholar & Historian',
    shortLabel: 'Edinburgh Scholar',
    tagline: 'Refined Scottish Enlightenment diction, intellectual curiosity, and intrigue',
    accent: 'Refined Edinburgh Lothian / Scottish Academic RP',
    gender: 'female',
    ageRange: '35-50 years old',
    cadence: '130-140 WPM, crisp sibilants, articulate, enigmatic curiosity',
    pitch: 1.05,
    rate: 0.98,
    description: 'Eloquent and dignified with a hint of Gothic mystery. Excellent for underground vaults, medical anatomy history, and literary secrets.'
  },
  myth_investigator: {
    id: 'myth_investigator',
    name: 'Scottish Myth & Mystery Investigator',
    shortLabel: 'Mystery Investigator',
    tagline: 'Dramatic, suspenseful cinematic cadence with eerie local lore',
    accent: 'Intense Scottish Dramatic Lilt',
    gender: 'adaptive',
    ageRange: '28-40 years old',
    cadence: '125-135 WPM, whispering emphasis, dramatic comedic relief',
    pitch: 0.98,
    rate: 0.95,
    description: 'Suspenseful and engaging. Designed for Kelpie legends, haunted bridges, cryptozoology, and Scottish highland folklore.'
  }
};

/**
 * Determines the best content-matched voice archetype for a given fact
 */
export function getRecommendedVoiceForFact(b: ShortsBlueprint): VoiceArchetype {
  const text = `${b.title} ${b.factText} ${b.location} ${b.character} ${b.comicalElement} ${b.category}`.toLowerCase();

  // Glasgow banter & street culture
  if (
    text.includes('cone') ||
    text.includes('wellington') ||
    text.includes('barras') ||
    text.includes('subway') ||
    text.includes('clockwork orange') ||
    text.includes('mars bar') ||
    text.includes('shipbuild') ||
    text.includes('clyde') ||
    text.includes('glasgow') && (text.includes('funny') || text.includes('banter') || text.includes('pub'))
  ) {
    return VOICE_ARCHETYPES.glasgow_raconteur;
  }

  // Ancient Highland battles, castles, Loch Ness, clans
  if (
    text.includes('wallace') ||
    text.includes('bruce') ||
    text.includes('stirling') ||
    text.includes('highland') ||
    text.includes('castle') ||
    text.includes('eilean') ||
    text.includes('loch ness') ||
    text.includes('clans') ||
    text.includes('kilt') ||
    text.includes('bagpipe')
  ) {
    return VOICE_ARCHETYPES.highland_bard;
  }

  // Myths, cryptids, folklore, ghosts
  if (
    text.includes('kelpie') ||
    text.includes('monster') ||
    text.includes('fairy') ||
    text.includes('ghost') ||
    text.includes('haunt') ||
    text.includes('vault') ||
    text.includes('curse') ||
    text.includes('mystery')
  ) {
    return VOICE_ARCHETYPES.myth_investigator;
  }

  // Edinburgh history, scholars, literature, enlightenment
  if (
    text.includes('edinburgh') ||
    text.includes('bobby') ||
    text.includes('walter scott') ||
    text.includes('conan doyle') ||
    text.includes('enlightenment') ||
    text.includes('university') ||
    text.includes('anatom') ||
    text.includes('royal mile')
  ) {
    return VOICE_ARCHETYPES.edinburgh_scholar;
  }

  // Default to vibrant British Young Female
  return VOICE_ARCHETYPES.british_young_female;
}

export interface CharacterVoiceDirection {
  archetypeId: VoiceArchetypeId;
  archetypeName: string;
  characterName: string;
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
}

/**
 * Builds voice direction for Scotland Facts based on selected or content-adaptive voice
 */
export function buildCharacterVoiceDirection(
  b: ShortsBlueprint,
  selectedVoiceId: VoiceArchetypeId = 'auto'
): CharacterVoiceDirection {
  const activeArchetype = selectedVoiceId === 'auto' 
    ? getRecommendedVoiceForFact(b) 
    : VOICE_ARCHETYPES[selectedVoiceId] || VOICE_ARCHETYPES.british_young_female;

  const charName = b.characterName || b.character || 'The Scottish Narrator';
  const comical = b.comicalElement || 'Authentic Scottish wit with local nostalgic banter';
  const phonetics = b.audioPhonetics || '';
  const location = b.location || `${b.city}, Scotland`;

  const voiceProfile = `${activeArchetype.name} (${activeArchetype.accent}, ${activeArchetype.ageRange}) - ${activeArchetype.tagline}`;
  const vocalTone = `${activeArchetype.cadence}; ${activeArchetype.description}`;
  const narrationStyle = `Engaging delivery tailored to context; authentic comedic timing and nostalgic resonance for Scottish locals and international viewers alike.`;
  const wittyComedicNuance = `Local comedic nuance: ${comical}`;

  const audioNarrationScript = b.audioScript10s || b.audioScript || `${b.title}! Did you know: ${b.factText}`;
  const timing = calculateAudioTiming(audioNarrationScript);

  const voiceProfileDirective = `[VOICE SELECTION - ${activeArchetype.name.toUpperCase()}]: Narrated in ${activeArchetype.accent} (${activeArchetype.ageRange}). Delivery: ${activeArchetype.cadence}. Strict 10s Timing: ${timing.wordCount} words (~${timing.estimatedDurationSec}s duration). MANDATE: Read every single word verbatim with zero word omissions.`;

  const elevenLabsPrompt = `[VOICE PROFILE & NARRATION MANDATE: ${activeArchetype.name.toUpperCase()}]
• Voice Persona: ${activeArchetype.name} (${activeArchetype.accent})
• Age Range: ${activeArchetype.ageRange} | Gender: ${activeArchetype.gender}
• 10-Second Timing Constraint: ${timing.wordCount} words / ~${timing.estimatedDurationSec}s spoken duration (Leaves 1.5s visual outro buffer)
• STRICT NARRATION MANDATE: Read EVERY SINGLE WORD verbatim from first to last word. ZERO omissions, ZERO dropped words, ZERO truncations.
• Delivery Pace & Tone: ${activeArchetype.cadence}
• Acting Style: ${activeArchetype.description}
• Local Phonetics Guide: ${phonetics || 'Standard Scottish and British local place names'}
• Ambience / Soundscape: ${location} • ${b.backgroundAudio || 'Authentic ambient soundscape'}
• EXACT SPOKEN SCRIPT (Read Every Word Verbatim in 7.5 - 8.5 seconds):
"${audioNarrationScript}"`;

  return {
    archetypeId: activeArchetype.id,
    archetypeName: activeArchetype.name,
    characterName: charName,
    voiceProfile,
    vocalTone,
    narrationStyle,
    wittyComedicNuance,
    voiceProfileDirective,
    audioNarrationScript,
    audioPhonetics: phonetics,
    backgroundAudio: b.backgroundAudio || '',
    elevenLabsPrompt,
    timing
  };
}

/**
 * In-browser Web Speech API audio player supporting all content-adaptive Scottish voice archetypes
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

  const utterance = new SpeechSynthesisUtterance(script);
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
      || voices.find(v => v.name.toLowerCase().includes('uk english'))
      || voices.find(v => v.lang.toLowerCase().startsWith('en'));
  } else if (voiceArchetype.gender === 'male') {
    matchedVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith('en-gb') && 
      (v.name.toLowerCase().includes('male') || 
       v.name.toLowerCase().includes('george') || 
       v.name.toLowerCase().includes('oliver') || 
       v.name.toLowerCase().includes('daniel') ||
       v.name.toLowerCase().includes('arthur'))
    ) || voices.find(v => v.lang.toLowerCase().startsWith('en-gb'))
      || voices.find(v => v.name.toLowerCase().includes('uk english'))
      || voices.find(v => v.lang.toLowerCase().startsWith('en'));
  } else {
    // Adaptive / Scottish
    matchedVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith('en-gb') || 
      v.name.toLowerCase().includes('scottish') ||
      v.name.toLowerCase().includes('uk')
    ) || voices.find(v => v.lang.toLowerCase().startsWith('en'));
  }

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  // Calibrate speech rate to guarantee completion within 8.5 seconds
  const words = script.trim().split(/\s+/).filter(Boolean);
  let calibratedRate = voiceArchetype.rate;
  if (words.length > 20) {
    // Accelerate slightly for longer scripts to fit 10s boundary
    calibratedRate = Math.min(1.25, voiceArchetype.rate * 1.15);
  } else {
    calibratedRate = Math.max(1.02, voiceArchetype.rate);
  }

  utterance.pitch = voiceArchetype.pitch;
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

// Backward-compatible alias for existing imports
export const playBritishVoice = (
  script: string, 
  onStart?: () => void, 
  onEnd?: () => void, 
  onError?: () => void
) => playAdaptiveVoice(script, VOICE_ARCHETYPES.british_young_female, onStart, onEnd, onError);

export const stopBritishVoice = stopSpeech;

export function isSpeechPlaying(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}
