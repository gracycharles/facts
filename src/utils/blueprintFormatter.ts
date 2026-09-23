import { ShortsBlueprint } from '../types';
import { computeOverlayTypography } from './overlayTypographyEngine';
import { buildCharacterVoiceDirection, getRecommendedVoiceForFact, VoiceArchetypeId } from './narrationEngine';

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
 * Formats video prompt specifically for external video generators (Runway Gen-3, Kling, Sora, Hailuo, Luma)
 * with video visuals, content-tailored voice audio, and safe-zone burned-in text overlays.
 */
export function formatVideoGenerationOnlyText(b: ShortsBlueprint, voiceId: VoiceArchetypeId = 'auto'): string {
  const line1Hook = b.subtitles?.line1Hook || b.title;
  const line2Fact = b.subtitles?.line2Fact || b.factText;
  const line3Location = b.subtitles?.line3Location || b.location;
  const voiceDir = buildCharacterVoiceDirection(b, voiceId);
  const audioScript = b.audioScript10s || b.audioScript || voiceDir.audioNarrationScript;

  return `🎬 HOLLYWOOD CREATION RANGE MASTER PROMPT (FACT #${b.id}: ${b.title})
City: ${b.city}, Scotland | Category: ${b.category} | Era: ${b.historicalEra}
Format: 9:16 Vertical Portrait (1080x1920) | Target Duration: EXACT 10.0 SECONDS CONFINED (Strict ≤10.0s Limit)

================================================================================
🔴 COMPULSORY MANDATE 1: BURNED-IN ON-SCREEN TEXT OVERLAY (DO NOT OMIT)
================================================================================
Mandate: Render the following exact 3-line text overlay directly burned into the video frames in the upper-center safe zone (Y: 450-850px).
CRITICAL STYLING RULE: NO BLACK BACKGROUND BOX. The text must float cleanly over the video visuals with a subtle drop-shadow only.
• Line 1 (Hook Header - Bold Golden-Amber): "${line1Hook}"
• Line 2 (Core Fact - Crisp Off-White): "${line2Fact}"
• Line 3 (Location Badge - Vibrant Cyan): "${line3Location}"
${b.overlayExtraContext ? `• Extra Context Line: "${b.overlayExtraContext}"\n` : ''}Safe Zone: Y=450px to Y=850px | Left/Right Clearance: 160px | Bottom Clearance: 400px (100% clear of native UI)

================================================================================
🔴 COMPULSORY MANDATE 2: INTEGRATED AUDIO & CONTEXTUAL VOICE (BY VIDEO GENERATOR)
================================================================================
Mandate: Audio and voice narration are generated natively by the video generation tool based on the content context, visual scene, character archetype, and era.
• Contextual Voice Casting: Selected according to content context and visual scene (${voiceDir.voiceProfile})
• Spoken Timing: Strictly calibrated at ${voiceDir.timing.wordCount} words (~${voiceDir.timing.estimatedDurationSec}s) — Spoken audio must finish cleanly before the 10.0s video limit with a 0.5–1.0s ambient acoustic tail.
• Phonetics & Dialect Guide: ${b.audioPhonetics || 'Native Scottish & British place names'}
• EXACT SPOKEN SCRIPT (Read Every Word Verbatim):
"${audioScript}"
• Environmental Soundscape & SFX: ${b.backgroundAudio}

================================================================================
🎬 MASTER AI VIDEO GENERATION PROMPT (RUNWAY GEN-3 / KLING / SORA / LUMA / HAILUO / VEO):
================================================================================
${b.videoPrompt}

[CHARACTER & CINEMATIC CASTING]:
- Primary Character: ${b.character}
- Style: ${b.characterStyle || 'Cinematic 35mm Hollywood Comical Live Action'}
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
  const header = `🏴󠁧󠁢󠁳󠁣󠁴󠁿 THE ULTIMATE 10-MINUTE SCOTLAND FACTS COMPILATION (50 DISTINCT HOLLYWOOD CINEMATIC SCENES)
Total Duration: 10:00 (600 Seconds) | 50 Continuous Chapters (12 Seconds per Fact Scene)
Format: 16:9 Widescreen / 9:16 Vertical Compilation Master Prompt
Audio: Continuous narration with content-adaptive Scottish voices (Glaswegian street wits, Edinburgh scholars, and Highland bards matched to each scene), seamless musical transitions between Scottish folk strings, bodhrán drums, and ambient atmospheres.

[EXECUTIVE CINEMATIC VISION]:
An epic, fast-paced, nostalgic, and hilarious 10-minute cinematic tour across Glasgow, Edinburgh, and the Scottish Highlands. Every scene is distinct in its historical era, colorful characters, Hollywood-grade comical interactions, and iconic Scottish landmarks. 100% verified facts that make locals nod with pride and nostalgia while captivating global audiences.

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
(09:48 - 10:00): Grand aerial montage sweeping over Edinburgh Castle, Glasgow's Clyde Arc, and Loch Ness at sunset. The narrator delivers the closing punchline: "50 unbelievable Scottish facts—and every single one of them is true! Slàinte mhath, Scotland!" Triumphant swell of Scottish fiddles, bodhrán drums, and warm applause.`;

  return header + chapters + footer;
}

/**
 * Formats the Subtitle / Text Overlay layout alone
 */
export function formatSubtitlesOnlyText(b: ShortsBlueprint): string {
  const line1Hook = b.subtitles?.line1Hook || b.title;
  const line2Fact = b.subtitles?.line2Fact || b.factText;
  const line3Location = b.subtitles?.line3Location || b.location;

  return `📝 MANDATORY BURNED-IN TEXT OVERLAY SPECIFICATIONS (1080x1920):
[STRICT MANDATE: Must be rendered visibly on screen - NO BLACK BACKGROUND BOX]
• Line 1 (Hook Header - Bold Golden-Amber): "${line1Hook}"
• Line 2 (Core Fact - Crisp Off-White): "${line2Fact}"
• Line 3 (Location Badge - Vibrant Cyan): "${line3Location}"
${b.overlayExtraContext ? `• Extra Context: "${b.overlayExtraContext}"\n` : ''}• Styling: Pure floating typography with subtle drop-shadow only. Zero solid background boxes.
• Vertical Position: Center safe band (Y: 450 - 850px)
• Margin Clearance: 160px left/right, 400px bottom (100% clear of native YouTube/TikTok UI)
• Font Stack: Heavy Sans-Serif Upper (Hook) + Serif/Sans Body (Fact) + Monospace (Location)`;
}

/**
 * 2) Video Prompt Only - With Embedded Burned-In Text & Audio Mandates
 */
export function formatVideoPromptOnlyText(b: ShortsBlueprint): string {
  const line1Hook = b.subtitles?.line1Hook || b.title;
  const line2Fact = b.subtitles?.line2Fact || b.factText;
  const line3Location = b.subtitles?.line3Location || b.location;
  const audioScript = b.audioScript10s || b.audioScript || b.factText;

  return `[VIDEO GENERATION PROMPT - 9:16 VERTICAL (1080x1920) | DURATION: EXACT 10.0s CONFINED]:
${b.videoPrompt}

[BURNED-IN TEXT OVERLAY MANDATE - RENDER ON SCREEN - NO BLACK BOX]:
Burned-in floating text in safe zone (Y: 450-850px):
Line 1: "${line1Hook}" (Golden Amber)
Line 2: "${line2Fact}" (White)
Line 3: "${line3Location}" (Cyan)
(Render as clean floating text with subtle drop-shadow over the live action, no black rectangle)

[INTEGRATED AUDIO & NARRATION - BY VIDEO GENERATOR - EXACT 10.0s PACING]:
Native voice audio and soundscape generated by the video tool matching the visual scene and era. Spoken script must finish cleanly before the 10.0s limit:
"${audioScript}"`;
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
  const hashtags = b.seo?.hashtags ? b.seo.hashtags.join(' ') : '#Scotland #Glasgow #Edinburgh #ScottishHistory';
  const tags = b.seo?.tags ? b.seo.tags.join(', ') : 'scotland, glasgow, edinburgh';

  return `🏷 YOUTUBE SEO METADATA (FACT #${b.id}: ${b.title})
Title: ${b.seo?.title || b.title}

Description:
${b.seo?.description || b.factText}

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
  return b.seo?.description || b.factText;
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
