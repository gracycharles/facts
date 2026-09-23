import { ShortsBlueprint } from '../types';
import { computeOverlayTypography, cleanScriptureRef, isDuplicateOrOverlappingScripture } from './overlayTypographyEngine';
import { getOptimizedOverlayData } from './tenSecondScriptOptimizer';

/**
 * Generates a true 1080x1920 alpha text overlay PNG with exact typography,
 * golden-amber styling, drop shadow, and centered safe-zone layout for Scotland Facts Shorts.
 */
export async function generateAlphaOverlayBlob(blueprint: ShortsBlueprint): Promise<Blob> {
  // Ensure fonts like Cinzel & Plus Jakarta Sans are fully loaded before rendering
  try {
    if (typeof document !== 'undefined' && document.fonts) {
      await document.fonts.ready;
    }
  } catch {
    // Fallback if fonts.ready API is unsupported
  }

  const optData = getOptimizedOverlayData(blueprint);
  const line1Hook = (optData.hook || blueprint.subtitles?.line1Hook || blueprint.title || '').trim();
  const rawLine2 = (optData.coreFact || blueprint.subtitles?.line2Fact || blueprint.factText || '').replace(/^["']|["']$/g, '').trim();
  const rawLine3 = (optData.locationBadge || blueprint.subtitles?.line3Location || blueprint.location || `${blueprint.city}, Scotland`).trim();
  const cleanRef = cleanScriptureRef(rawLine3);

  // Check duplicate/overlapping line 2 vs line 1
  const hasDistinctLine2 = !isDuplicateOrOverlappingScripture(line1Hook, rawLine2);
  const line2Fact = hasDistinctLine2 ? rawLine2 : '';

  const typo = computeOverlayTypography(
    line1Hook,
    line2Fact,
    cleanRef
  );

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  // Transparent background (true alpha)
  ctx.clearRect(0, 0, 1080, 1920);

  // Setup text rendering
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Helper to wrap text into lines fitting max width
  const wrapText = (text: string, maxW: number): string[] => {
    if (!text) return [];
    const words = text.split(' ');
    if (words.length <= 1) return [text];
    
    // Check if whole text fits
    if (ctx.measureText(text).width <= maxW) return [text];

    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + ' ' + word;
      if (ctx.measureText(testLine).width > maxW) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const maxWidth = 760; // Strict YouTube Shorts safe width (160px padding on left & right to prevent UI overlay/edge clipping)
  const centerY = 650;  // Center-Upper Safe Band (y=450 to y=850, y=650 center) safe from bottom 600px Shorts UI occlusion

  // 2px shadow for high legibility over video
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 3;

  const hookFontStack = `"Plus Jakarta Sans", "Cinzel", "Arial", sans-serif`;
  const factFontStack = `"Plus Jakarta Sans", "Georgia", "Arial", sans-serif`;
  const refFontStack = `"Plus Jakarta Sans", "Courier New", monospace, sans-serif`;

  // Measure fonts
  ctx.font = `bold ${typo.affirmationPx}px ${hookFontStack}`;
  const hookLines = wrapText(line1Hook, maxWidth);

  ctx.font = `600 ${typo.scripturePx}px ${factFontStack}`;
  const factLines = hasDistinctLine2 ? wrapText(line2Fact, maxWidth) : [];

  // Calculate vertical layout & spacing
  const hookLineHeight = typo.affirmationPx * 1.32;
  const factLineHeight = typo.scripturePx * 1.35;
  const gap1 = hasDistinctLine2 ? 28 : 24;
  const gap2 = 22;

  const totalHookH = hookLines.length * hookLineHeight;
  const totalFactH = factLines.length * factLineHeight;
  const totalRefH = typo.refPx;

  const totalBlockH = hasDistinctLine2
    ? totalHookH + gap1 + totalFactH + gap2 + totalRefH
    : totalHookH + gap1 + totalRefH;

  let startY = centerY - (totalBlockH / 2);

  // 1. Render Hook lines (Golden-Amber)
  ctx.fillStyle = '#FFC107';
  ctx.font = `bold ${typo.affirmationPx}px ${hookFontStack}`;
  for (const line of hookLines) {
    ctx.fillText(line, 540, startY + (hookLineHeight / 2));
    startY += hookLineHeight;
  }

  startY += gap1;

  // 2. Render Fact lines (Off-White) if distinct
  if (hasDistinctLine2) {
    ctx.fillStyle = '#F8F9FA';
    ctx.font = `600 ${typo.scripturePx}px ${factFontStack}`;
    for (const line of factLines) {
      ctx.fillText(line, 540, startY + (factLineHeight / 2));
      startY += factLineHeight;
    }
    startY += gap2;
  }

  // 3. Render Location Badge (Muted Cyan / Stone)
  ctx.fillStyle = '#67E8F9';
  ctx.font = `bold ${typo.refPx}px ${refFontStack}`;
  ctx.fillText(cleanRef, 540, startY + (totalRefH / 2));

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to generate Alpha PNG Blob'));
    }, 'image/png');
  });
}

/**
 * Initiates browser download of the generated 1080x1920 Alpha PNG
 */
export async function downloadAlphaOverlayPng(blueprint: ShortsBlueprint): Promise<void> {
  const blob = await generateAlphaOverlayBlob(blueprint);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `scotland_fact_${blueprint.id}_alpha_overlay_1080x1920.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
