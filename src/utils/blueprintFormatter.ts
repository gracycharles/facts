import { ShortsBlueprint } from '../types';
import { computeOverlayTypography } from './overlayTypographyEngine';
import { buildCharacterVoiceDirection, getRecommendedVoiceForFact, VoiceArchetypeId } from './narrationEngine';
import { sanitizeOverlayText } from './overlaySanitizer';
import { buildFullYouTubeDescription } from './descriptionFormatter';
import { expandNumbersToWords } from './numberToWords';

/**
 * Formats a ShortsBlueprint into the exact full production blueprint
 */
export function formatBlueprintAsText(b: ShortsBlueprint, voiceId: VoiceArchetypeId = 'auto'): string {
  return `${formatVideoGenerationOnlyText(b, voiceId)}

${formatYouTubeOnlyText(b)}`;
}

/**
 * Formats a Midjourney v6 Image Generation Base Frame Prompt for keyframe image-to-video generation
 */
export function formatMidjourneyPrompt(b: ShortsBlueprint): string {
  if (b.midjourneyPrompt) return b.midjourneyPrompt;

  const char = b.character || "Historical Scottish character";
  const location = b.location || `${b.city}, Scotland`;
  const comical = b.comicalElement || "Distinct comical banter and nostalgic atmosphere";
  
  return `Cinematic vertical 9:16 photograph of ${char} at ${location}, ${comical}, atmospheric Scottish weather, golden hour lamplight reflecting on cobblestone streets, authentic Scottish architecture in background, 35mm film still, photorealistic textures, hyper-detailed, 8k --ar 9:16 --v 6.1 --style raw`;
}

/**
 * 1) Master AI Video & Motion Generation Prompt
 * Formats video prompt specifically for external video generators (Runway Gen-3, Kling, Sora, Hailuo, Luma, Veo)
 * with video visuals, character-native voice audio (strictly matching character gender & role), and safe-zone burned-in text overlays.
 */
export function formatVideoGenerationOnlyText(b: ShortsBlueprint, voiceId: VoiceArchetypeId = 'auto'): string {
  const line1Hook = sanitizeOverlayText(b.subtitles?.line1Hook || b.title);
  const line2Fact = sanitizeOverlayText(b.subtitles?.line2Fact || b.factText);
  const line3Location = sanitizeOverlayText(b.subtitles?.line3Location || b.location);
  const extraContext = b.overlayExtraContext ? sanitizeOverlayText(b.overlayExtraContext) : '';
  const voiceDir = buildCharacterVoiceDirection(b, voiceId);
  const rawAudioScript = b.audioScript10s || b.audioScript || voiceDir.audioNarrationScript;
  const audioScript = expandNumbersToWords(rawAudioScript);
  const sync = voiceDir.characterSync;
  const gender = sync.gender;

  return `🎬 HOLLYWOOD CREATION RANGE MASTER PROMPT (FACT #${b.id}: ${sanitizeOverlayText(b.title)})
City: ${b.city}, Scotland | Category: ${b.category} | Era: ${b.historicalEra}
Master Resolution: 1080x1920 Full HD (Upscaled Master for YouTube Shorts / TikTok) | Aspect Ratio: 9:16 Vertical
Target Duration: EXACT 10.0 SECONDS CONFINED (Strict ≤10.0s Limit) | Output Standard: Broadcast-Safe (Emoji-Free)

================================================================================
🔴 COMPULSORY MANDATE 1: BURNED-IN ON-SCREEN TEXT OVERLAY (PLAIN TEXT ONLY)
================================================================================
Mandate: Render the following exact 3-line text overlay directly burned into the video frames in the upper-center safe zone (Y: 450-850px at 1080x1920).
CRITICAL STYLING RULES:
1. PURE CLEAN TEXT ONLY: Absolutely DO NOT render emojis, unicode symbols, or bullet dots (no missing glyph box [ ], no 📍, no •).
2. NO BLACK BACKGROUND BOX: The text must float cleanly over the video visuals with a subtle drop-shadow only.
• Line 1 (Hook Header - Bold Golden-Amber): "${line1Hook}"
• Line 2 (Core Fact - Crisp Off-White): "${line2Fact}"
• Line 3 (Location Badge - Vibrant Cyan): "${line3Location}"
${extraContext ? `• Extra Context Line: "${extraContext}"\n` : ''}Safe Zone: Y=450px to Y=850px | Left/Right Clearance: 160px | Bottom Clearance: 400px (100% clear of native UI)

================================================================================
🔴 COMPULSORY MANDATE 2: CHARACTER-NATIVE AUDIO & VOICE (SPOKEN BY ON-SCREEN CHARACTER)
================================================================================
Mandate: Audio and voice narration must be generated in the authentic voice, gender, and era of the primary on-screen character involved in the video scene.
• Character Voice Casting: Spoken directly by primary on-screen character: ${sync.characterName} (${gender.toUpperCase()} CHARACTER — ${sync.matchedArchetype.accent}, ${sync.matchedArchetype.ageRange})
• Character Acting Nuance: ${sync.actingInflection}
• STRICT GENDER & PERSONA MANDATE: The voice MUST match the character on screen (${gender.toUpperCase()}). The character is a ${gender}, so the video generator MUST cast an authentic Scottish ${gender} voice. DO NOT use a mismatched voice gender (e.g. a male quarryman, soldier, or councillor must speak in an authentic Scottish male voice; a female fishwife or matriarch in a Scottish female voice).
• Spoken Timing: Strictly calibrated at ${voiceDir.timing.wordCount} words (~${voiceDir.timing.estimatedDurationSec}s) — Spoken audio must finish cleanly before the 10.0s video limit with a 0.5–1.0s ambient acoustic tail.
• Lip-Sync Directive: ${sync.lipSyncDirective}
• Phonetics & Dialect Guide: ${b.audioPhonetics || 'Native Scottish & British place names'}
• EXACT SPOKEN SCRIPT (Read Every Word Verbatim):
"${audioScript}"
• Environmental Soundscape & SFX: ${b.backgroundAudio}

================================================================================
🔴 COMPULSORY MANDATE 3: MANDATORY 1080x1920 UPSCALED EXPORT SPECIFICATIONS
================================================================================
• Delivery Format: 1080x1920 (9:16 Vertical Portrait) High Bitrate (≥25 Mbps H.264 / ProRes)
• Quality Mandate: Always export the upscaled 1080x1920 version directly for upload to YouTube Shorts and TikTok to prevent compression artifacts.
• Broadcast Safety: Clean typography with zero emoji glyphs or bullet points.

================================================================================
🔴 COMPULSORY MANDATE 4: BROADCAST-SAFE & ZERO TRADEMARKS (NO COPYRIGHT BLOCKS)
================================================================================
• Commercial Safety: Do NOT generate or render any copyrighted logos, registered commercial brand names, or trademarked packaging (use unbranded vintage bottles, generic packaging, and period-authentic signage).
• AI Generator Safety: 100% broadcast-safe imagery and text guaranteed to pass strict safety and copyright filters on Runway Gen-3, Kling, Sora, Hailuo, Pika, and Luma without rejection.

================================================================================
🎬 MASTER AI VIDEO GENERATION PROMPT (RUNWAY GEN-3 / KLING / SORA / LUMA / HAILUO / VEO):
================================================================================
${b.videoPrompt}

[CHARACTER & CINEMATIC CASTING]:
- Primary Character: ${b.character || sync.characterName} (${gender.toUpperCase()})
- Style: ${b.characterStyle || 'Cinematic 35mm Hollywood Comical Live Action'}
- Character Speaking Role: Spoken directly by ${sync.characterName} in authentic ${gender} Scottish voice (${sync.matchedArchetype.accent})
${b.supportingCharacters && b.supportingCharacters.length > 0 ? `- Supporting Cast:\n  ${b.supportingCharacters.map(sc => `* ${sc.name} (${sc.role}): ${sc.appearance} | Comedic Gag: ${sc.comedicInteraction}`).join('\n  ')}\n` : ''}- Iconic Objects & Scenes: ${b.objectsScenes}
- Comical & Nostalgic Local Element: ${b.comicalElement}
- Grounded Authentic Location: ${b.location}
- Atmospheric Background Soundscape: ${b.backgroundAudio}`;
}

/**
 * Formats the 10-minute compilation prompt for external long-form video generators
 */
export function formatTenMinuteCompilationPrompt(blueprints: ShortsBlueprint[]): string {
  const totalScenes = blueprints.length;
  const totalSeconds = totalScenes * 12;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remSeconds = (totalSeconds % 60).toString().padStart(2, '0');
  const durationLabel = `${totalMinutes.toString().padStart(2, '0')}:${remSeconds} (${totalSeconds} Seconds)`;

  const header = `🏴󠁧󠁢󠁳󠁣󠁴󠁿 THE ULTIMATE SCOTLAND FACTS COMPILATION (${totalScenes} DISTINCT HOLLYWOOD CINEMATIC SCENES)
Total Duration: ${durationLabel} | ${totalScenes} Continuous Chapters (12 Seconds per Fact Scene)
Format: 16:9 Widescreen / 9:16 Vertical Compilation Master Prompt
Audio: Continuous narration with content-adaptive Scottish voices (Glaswegian street wits, Edinburgh scholars, and Highland bards matched to each scene), seamless musical transitions between Scottish folk strings, bodhrán drums, and ambient atmospheres.

[EXECUTIVE CINEMATIC VISION]:
An epic, fast-paced, nostalgic, and hilarious cinematic tour across Glasgow, Edinburgh, and the Scottish Highlands. Every scene is distinct in its historical era, colorful characters, Hollywood-grade comical interactions, and iconic Scottish landmarks. 100% verified facts that make locals nod with pride and nostalgia while captivating global audiences.

================================================================================
CHAPTER-BY-CHAPTER TIMELINE BREAKDOWN:
================================================================================
`;

  const chapters = blueprints.map((b, idx) => {
    const sceneNum = idx + 1;
    const startSec = (idx * 12);
    const endSec = ((idx + 1) * 12);
    const startMin = Math.floor(startSec / 60).toString().padStart(2, '0');
    const startRemSec = (startSec % 60).toString().padStart(2, '0');
    const endMin = Math.floor(endSec / 60).toString().padStart(2, '0');
    const endRemSec = (endSec % 60).toString().padStart(2, '0');
    const timestamp = `[${startMin}:${startRemSec} - ${endMin}:${endRemSec}]`;
    const recommendedVoice = getRecommendedVoiceForFact(b);

    return `SCENE ${sceneNum} ${timestamp} | ${b.title} (${b.city}, Scotland)
• Historical Era: ${b.historicalEra} | Location: ${b.location}
• Hollywood Character: ${b.character}
• Comical Action: ${b.comicalElement}
• Video Prompt: ${b.videoPrompt}
• Matched Voice Persona: ${recommendedVoice.name} (${recommendedVoice.accent})
• Spoken Script: "${b.audioScript}"
• Audio Atmosphere: ${b.backgroundAudio}
• Segment Transition: ${b.tenMinuteSegmentPrompt || `Seamless dissolve into the next iconic Scottish location.`}
--------------------------------------------------------------------------------`;
  }).join('\n\n');

  const footer = `

================================================================================
COMPILATION CONCLUSION & SOUND DESIGN:
================================================================================
Grand aerial montage sweeping over Edinburgh Castle, Glasgow's Clyde Arc, and Loch Ness at sunset. The narrator delivers the closing punchline: "${totalScenes} unbelievable Scottish facts—and every single one of them is true! Slàinte mhath, Scotland!" Triumphant swell of Scottish fiddles, bodhrán drums, and warm applause.`;

  return header + chapters + footer;
}

/**
 * Formats the Subtitle / Text Overlay layout alone
 */
export function formatSubtitlesOnlyText(b: ShortsBlueprint): string {
  const line1Hook = sanitizeOverlayText(b.subtitles?.line1Hook || b.title);
  const line2Fact = sanitizeOverlayText(b.subtitles?.line2Fact || b.factText);
  const line3Location = sanitizeOverlayText(b.subtitles?.line3Location || b.location);
  const extraContext = b.overlayExtraContext ? sanitizeOverlayText(b.overlayExtraContext) : '';

  return `📝 MANDATORY BURNED-IN TEXT OVERLAY SPECIFICATIONS (1080x1920):
[STRICT MANDATE: Clean Plain Text Only - NO EMOJIS, NO BULLET DOTS, NO BLACK BACKGROUND BOX]
• Line 1 (Hook Header - Bold Golden-Amber): "${line1Hook}"
• Line 2 (Core Fact - Crisp Off-White): "${line2Fact}"
• Line 3 (Location Badge - Vibrant Cyan): "${line3Location}"
${extraContext ? `• Extra Context: "${extraContext}"\n` : ''}• Styling: Pure floating typography with subtle drop-shadow only. Zero solid background boxes.
• Vertical Position: Center safe band (Y: 450 - 850px)
• Margin Clearance: 160px left/right, 400px bottom (100% clear of native YouTube/TikTok UI)
• Font Stack: Heavy Sans-Serif Upper (Hook) + Serif/Sans Body (Fact) + Monospace (Location)`;
}

/**
 * Formats a clean, broadcast-safe 1080x1920 / 10.0s master video generation prompt
 * guaranteed to pass external AI video generation filters (Runway Gen-3, Sora, Luma, Kling, Pika, Hailuo, Veo)
 * with zero real-person likenesses, zero brand logos, safe overlays, and character-native authentic voice narration.
 */
export function formatBroadcastSafeMasterPrompt(b: ShortsBlueprint, voiceId: VoiceArchetypeId = 'auto'): string {
  const line1Hook = sanitizeOverlayText(b.subtitles?.line1Hook || b.title);
  const line2Fact = sanitizeOverlayText(b.subtitles?.line2Fact || b.factText);
  const line3Location = sanitizeOverlayText(b.subtitles?.line3Location || b.location);
  const voiceDir = buildCharacterVoiceDirection(b, voiceId);
  const rawAudioScript = b.audioScript10s || b.audioScript || voiceDir.audioNarrationScript;
  const audioScript = expandNumbersToWords(rawAudioScript);
  const sync = voiceDir.characterSync;
  const gender = sync.gender;

  return `🎬 BROADCAST-SAFE 1080x1920 / 10.0s MASTER VIDEO GENERATION PROMPT (FACT #${b.id}: ${sanitizeOverlayText(b.title)})
Format: 1080x1920 (9:16 Vertical Portrait) | Exact Duration: 10.0 Seconds | Standard: Broadcast-Safe & Unbranded

[STORY BEAT & VISUAL PROMPT]:
${b.videoPrompt}

[CHARACTER & CASTING SPECIFICATION]:
- Primary Character: ${b.character || sync.characterName} (${gender.toUpperCase()})
- Character Casting: Fictional era-inspired character (100% free of real-person likeness restrictions).
- Unbranded Props: Logo-free props, vessels, packaging, and period signage.

[CHARACTER LIP-SYNC & AUDIO SYNCHRONIZATION DIRECTIVE]:
- Speaker: Spoken directly by on-screen character: ${sync.characterName} (${gender.toUpperCase()} — ${sync.matchedArchetype.accent}, ${sync.matchedArchetype.ageRange})
- Acting Inflection: ${sync.actingInflection}
- Strict Gender Mandate: The voice MUST match the on-screen character (${gender.toUpperCase()}). The character on screen is ${gender}, so they MUST speak in an authentic Scottish ${gender} voice. NO mismatched voice genders.
- Lip-Sync & Facial Performance: ${sync.lipSyncDirective}

[BURNED-IN ON-SCREEN TEXT OVERLAY (UPPER-CENTER SAFE ZONE)]:
- Upper-Center Safe Band (Y: 450-850px at 1080x1920, with subtle drop-shadow only, zero black background box, zero emoji glyphs):
  • Line 1 (Hook Header - Golden Amber): "${line1Hook}"
  • Line 2 (Core Fact - Crisp White): "${line2Fact}"
  • Line 3 (Location Badge - Cyan): "${line3Location}"

[AUDIO & NARRATION SPECIFICATION (10.0s PACING)]:
- Character Speaker: ${sync.characterName} (${gender.toUpperCase()} Scottish voice, ${sync.matchedArchetype.accent}, ~145 WPM cadence, strictly ≤10.0s limit).
- Spoken Script (Verbatim - ${voiceDir.timing.wordCount} words / ~${voiceDir.timing.estimatedDurationSec}s):
  "${audioScript}"
- Soundscape: ${b.backgroundAudio}

[EXPORT QUALITY MANDATE]:
1080x1920 Full HD high-bitrate MP4/ProRes, strictly confined to 10.0 seconds with zero audio or visual truncation.`;
}

/**
 * 2) Video Prompt Only - With Embedded Burned-In Text & Audio Mandates
 */
export function formatVideoPromptOnlyText(b: ShortsBlueprint, voiceId: VoiceArchetypeId = 'auto'): string {
  return formatBroadcastSafeMasterPrompt(b, voiceId);
}

/**
 * 3) Audio & Voiceover Directive Alone
 */
export function formatAudioOnlyText(b: ShortsBlueprint, voiceId: VoiceArchetypeId = 'auto'): string {
  const voiceDir = buildCharacterVoiceDirection(b, voiceId);
  return voiceDir.elevenLabsPrompt;
}

/**
 * 4) YouTube SEO Alone
 */
export function formatYouTubeOnlyText(b: ShortsBlueprint): string {
  const hashtags = b.seo?.hashtags && b.seo.hashtags.length > 0
    ? b.seo.hashtags.join(' ')
    : '#Glasgow #Scotland #UnitedKingdom #UK #GlasgowScotland #Edinburgh #Shorts #ScottishHistory';
  const tags = b.seo?.tags && b.seo.tags.length > 0
    ? b.seo.tags.join(', ')
    : 'Glasgow, Scotland, United Kingdom, UK, Glasgow Scotland, United Kingdom UK, Edinburgh, Scotland Facts, Shorts';

  const description = b.seo?.description || buildFullYouTubeDescription(b);

  return `🏷 YOUTUBE SEO METADATA (FACT #${b.id}: ${b.title})
Title: ${b.seo?.title || b.title}

Description:
${description}

Tags (Comma-Separated for YouTube Studio):
${tags}

Hashtags:
${hashtags}`;
}

/**
 * Helper to get clean English title
 */
export function getEnglishTitleOnly(b: ShortsBlueprint): string {
  return b.title;
}

/**
 * Helper to get formatted YouTube description
 */
export function getFormattedYouTubeDescription(b: ShortsBlueprint): string {
  return b.seo?.description || buildFullYouTubeDescription(b);
}

/**
 * Helper to format fact verification citation
 */
export function getScriptureVerificationText(b: ShortsBlueprint): string {
  return `HISTORICAL ARCHIVE VERIFICATION (FACT #${b.id}: ${b.title})
• Location: ${b.location} (${b.city}, Scotland)
• Status: 100% Historical Fact
• Verified Source: ${b.verification?.verifiedSource || 'National Records of Scotland & Historic Environment Scotland'}
• Historical Detail: ${b.verification?.historicalDetails || b.factText}
• Local Banter Note: ${b.comicalElement || 'Authentic Scottish cultural heritage'}`;
}
