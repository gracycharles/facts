export interface SupportingCharacter {
  name: string;
  role: string;
  appearance: string;
  comedicInteraction: string;
}

export interface CharacterExpression {
  expression: string;
  gesturePosture: string;
  theologicalMood?: string;
  mood?: string;
  sceneAtmosphere: string;
  inculcatedPromptAddition: string;
}

export interface FactVerification {
  verifiedSource?: string;
  verdict?: string;
  historicalDetails?: string;
  archiveReference?: string;
  citedVerseAnalysis?: string;
  theologicalContext?: string;
  exactTitleMatch?: boolean | string;
  scriptureVerseNKJV?: string;
  canonicalReference?: string;
  [key: string]: any;
}

export interface GroundedHDImage {
  url: string;
  caption: string;
  credit: string;
  historicalContext: string;
  [key: string]: any;
}

export interface ShortsBlueprint {
  id: number;
  title?: string;
  factText?: string;
  city?: 'Glasgow' | 'Edinburgh' | 'Scotland';
  category?: string;
  historicalEra?: string;
  character?: string;
  characterName?: string;
  characterStyle?: string;
  supportingCharacters?: SupportingCharacter[];
  objectsScenes?: string;
  comicalElement?: string;
  location?: string;
  hdImage?: GroundedHDImage;
  videoPrompt?: string;
  midjourneyPrompt?: string;
  voiceProfile?: string;
  audioScript?: string;
  audioScript10s?: string;
  audioScriptExtended?: string;
  audioPhonetics?: string;
  backgroundAudio?: string;
  overlayExtraContext?: string;
  subtitles?: {
    line1Hook?: string;
    line2Fact?: string;
    line3Location?: string;
    line1Affirmation?: string;
    line2Scripture?: string;
    line3Ref?: string;
    line1Tamil?: string;
    line2English?: string;
    [key: string]: any;
  };
  tenMinuteSegmentPrompt?: string;
  seo?: {
    title?: string;
    description?: string;
    tags?: string[];
    hashtags?: string[];
    [key: string]: any;
  };
  verification?: FactVerification;
  characterExpression?: CharacterExpression;

  // Backward compatibility aliases for existing components and legacy scripts
  affirmationTitle?: string;
  affirmationText?: string;
  scriptureVerse?: string;
  scriptureRef?: string;
  englishText?: string;
  englishRef?: string;
  nkjvText?: string;
  targetAudience?: string;
  tamilTitle?: string;
  tamilText?: string;
  tamilRef?: string;
  page?: number;
  [key: string]: any;
}

export type ViewTab = 'studio' | 'directory' | 'compilation10min';

// Legacy type exports for compatibility with existing files
export type ScriptureVerification = FactVerification;
export interface PraiseItem {
  id: number;
  text?: string;
  reference?: string;
  page?: number;
  tamilTitle?: string;
  tamilText?: string;
  tamilRef?: string;
  englishTitle?: string;
  englishText?: string;
  englishRef?: string;
  category?: string;
  [key: string]: any;
}
export interface PageData {
  pageNumber?: number;
  page?: number;
  title?: string;
  rawText?: string;
  praises?: PraiseItem[];
  items?: PraiseItem[];
  [key: string]: any;
}
export interface BookMetadata {
  title: string;
  totalPages?: number;
  totalItems?: number;
  subtitle?: string;
  [key: string]: any;
}
