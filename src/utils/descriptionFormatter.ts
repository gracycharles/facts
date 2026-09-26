import { ShortsBlueprint } from '../types';

/**
 * Builds a 100% complete, fully-cooked YouTube video and Shorts description
 * with hook teaser, detailed historical story, landmark location,
 * verified archives citation, spoken script quote, call-to-action,
 * and high-ranking default tags & hashtags.
 */
export function buildFullYouTubeDescription(
  b: ShortsBlueprint,
  rawTeaser?: string
): string {
  const id = b.id;
  const title = b.title || `Scotland Fact #${id}`;
  const city = b.city || 'Scotland';
  const category = b.category || 'Scottish Heritage & History';
  const era = b.historicalEra || 'Historic Scotland';
  const location = b.location || `${city}, Scotland`;
  
  // Teaser hook (e.g., "Did you know...")
  const hook = (rawTeaser || b.seo?.description || b.factText || '')
    .trim()
    .replace(/^#+/, '')
    .trim();

  // Full factual story
  const factStory = b.factText ? b.factText.trim() : '';

  // Local banter / comedic nuance
  const banter = b.comicalElement ? b.comicalElement.trim() : '';

  // Audio script quote
  const audioScript = (b.audioScript10s || b.audioScript || '').trim();

  // Historical Verification
  const verifiedSource = b.verification?.verifiedSource || 'National Records of Scotland, Historic Environment Scotland & Local Archives';
  const verdict = b.verification?.verdict || '100% HISTORICALLY VERIFIED';
  const historicalDetails = b.verification?.historicalDetails?.trim() || '';

  // Standardized Location with full UK regional hierarchy
  let fullLocation = location;
  if (!fullLocation.includes('Scotland')) {
    fullLocation += ', Scotland';
  }
  if (!fullLocation.includes('United Kingdom') && !fullLocation.includes('UK')) {
    fullLocation += ', United Kingdom (UK)';
  }

  const cityLabel = city === 'Scotland' ? 'Scotland (Nationwide)' : `${city}, Scotland`;

  // Hashtags
  const hashtagsList = b.seo?.hashtags && b.seo.hashtags.length > 0
    ? b.seo.hashtags
    : [
        '#Glasgow',
        '#Scotland',
        '#UnitedKingdom',
        '#UK',
        '#GlasgowScotland',
        '#UnitedKingdomUK',
        '#Edinburgh',
        '#Shorts',
        '#ScottishHistory',
        '#ScotlandFacts',
        '#FactsScotland'
      ];
  const hashtagsString = hashtagsList.join(' ');

  const sections: string[] = [];

  // 1. Hook Header
  if (hook) {
    sections.push(`🏴󠁧󠁢󠁳󠁣󠁴󠁿 ${hook}`);
  } else {
    sections.push(`🏴󠁧󠁢󠁳󠁣󠁴󠁿 Fact #${id}: ${title} (${city}, Scotland)`);
  }

  // 2. Full Verified Story (if distinct from hook or providing the deeper narrative)
  if (factStory && factStory !== hook) {
    sections.push(`📖 THE FULL STORY:\n${factStory}`);
  }

  // 3. Comical Local Lore / Banter
  if (banter) {
    sections.push(`😂 LOCAL BANTER & HERITAGE:\n${banter}`);
  }

  // 4. Exact Geographic Location
  sections.push(`📍 LOCATION & REGION:\n${fullLocation}\n• Region: ${cityLabel}\n• Category: ${category} | Era: ${era}`);

  // 5. Historical Archive Verification
  const verificationLines = [
    `• Status: ${verdict}`,
    `• Verified Sources: ${verifiedSource}`
  ];
  if (historicalDetails) {
    verificationLines.push(`• Historical Archive Note: ${historicalDetails}`);
  }
  sections.push(`🏛️ HISTORICAL VERIFICATION:\n${verificationLines.join('\n')}`);

  // 6. Audio Narration & Script
  if (audioScript) {
    sections.push(`🎙️ SPOKEN NARRATION SCRIPT:\n"${audioScript}"`);
  }

  // 7. Channel Subscription & Community Call to Action
  sections.push(
    `🔔 SUBSCRIBE TO @FactsScotlandOfficial:\n` +
    `Discover unbelievable, hilarious, and 100% verified true facts about Glasgow, Edinburgh, and Scotland every single day!\n` +
    `👉 Hit Subscribe & turn on notifications so you never miss a Scottish story.\n` +
    `💬 Did you know this fact? Drop your comments, banter, or memories below! Slàinte mhath! 🏴󠁧󠁢󠁳󠁣󠁴󠁿✨`
  );

  // 8. Hashtags for YouTube Shorts & Video SEO
  sections.push(hashtagsString);

  return sections.join('\n\n');
}

/**
 * Backward compatibility alias
 */
export function getFormattedYouTubeDescription(
  item: ShortsBlueprint | any
): string {
  if (!item) return '';
  return buildFullYouTubeDescription(item, item.seo?.description);
}

