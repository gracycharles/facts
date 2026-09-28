import { ShortsBlueprint } from '../types';

/**
 * Builds a clean, focused YouTube video and Shorts description
 * containing only the opening hook teaser and the full factual story.
 */
export function buildFullYouTubeDescription(
  b: ShortsBlueprint,
  rawTeaser?: string
): string {
  const id = b.id;
  const title = b.title || `Scotland Fact #${id}`;
  const city = b.city || 'Scotland';
  
  // Teaser hook (e.g., "Did you know...")
  const hook = (rawTeaser || b.seo?.description || '')
    .trim()
    .replace(/^#+/, '')
    .trim();

  // Full factual story
  const factStory = (b.factText || '').trim();

  const sections: string[] = [];

  // 1. Hook Header / Teaser
  if (hook) {
    sections.push(`🏴󠁧󠁢󠁳󠁣󠁴󠁿 ${hook}`);
  } else {
    sections.push(`🏴󠁧󠁢󠁳󠁣󠁴󠁿 Fact #${id}: ${title} (${city}, Scotland)`);
  }

  // 2. Full Verified Story
  if (factStory && factStory !== hook) {
    sections.push(`📖 THE FULL STORY:\n${factStory}`);
  } else if (!hook && factStory) {
    sections.push(`📖 THE FULL STORY:\n${factStory}`);
  }

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


