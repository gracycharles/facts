import React, { useState } from 'react';
import { X, Copy, Check, Youtube, Sparkles, Clock, BookOpen, Heart, Radio, Smile, Volume2, Video, Film, MapPin } from 'lucide-react';

interface ChannelProfileModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const CHANNEL_NAME = "Facts Scotland";
export const YOUTUBE_HANDLE = "@FactsScotlandOfficial";
export const HOST_NAME = "British Young Female Narrator (with Scottish Banter)";

export const OFFICIAL_CHANNEL_ABOUT = `Welcome to Facts Scotland (@FactsScotlandOfficial)!

🏴󠁧󠁢󠁳󠁣󠁴󠁿 100% Interesting & Verified True Facts about Glasgow, Edinburgh, and Scotland!

✨ What Makes Our Videos Distinct & Unmissable:
• Hollywood-Range Scene Creation: Distinct comical and historical characters (The Duke of Wellington, Greyfriars Bobby, Robert Burns, Sir Walter Scott, shipbuilding legends) brought to life with 35mm Hollywood live action cinema visual prompts.
• 100% Historical Fact Verification: Every single fact is verified with the National Records of Scotland, Historic Environment Scotland, Mitchell Library, and City of Edinburgh Archives. Zero false lore or AI hallucinations!
• Authentic Local Nostalgia: Crafted specifically to give locals that warm, proud nod and chuckling banter about orange traffic cones, the Barras market, deep-fried treats, and historic Scottish innovations!
• British Young Female Narration: Articulate British young female voice (age 20-25) with a witty Scottish / RP lilt, authentic comedic timing, and razor-sharp local phonetics.
• 10-Minute Video Master Prompt: Full continuous 600-second 50-chapter compilation prompt engineered for external AI video generators (Runway Gen-3, Sora, Kling, Hailuo, Luma) with burned-in subtitle safe zones.

Slàinte mhath! Subscribe and discover the magical, hilarious, and true stories of Scotland! 🏴󠁧󠁢󠁳󠁣󠁴󠁿✨`;

export const CHANNEL_TAGS = [
  "Facts Scotland",
  "Glasgow Facts",
  "Edinburgh Facts",
  "Scottish History",
  "Duke of Wellington Cone Glasgow",
  "Greyfriars Bobby Edinburgh",
  "Edinburgh Castle Mons Meg",
  "Glasgow Subway Clockwork Orange",
  "Unicorn National Animal Scotland",
  "Scottish Heritage",
  "Runway Gen 3 Prompts",
  "Sora Video Prompts",
  "Kling AI Prompts",
  "Scottish Banter",
  "Scotland Shorts",
  "Nostalgic Glasgow",
  "Historic Edinburgh",
  "Scottish Highlands"
];

export const YOUTUBE_BANNER_PROMPT = `Cinematic ultra-wide 16:9 panoramic banner of Scotland blending historic Edinburgh Castle perched high upon its volcanic crag and Glasgow's glowing neon Clyde Arc Bridge at dusk. In the foreground, an atmospheric 35mm Hollywood cinematic shot of an authentic Glaswegian and Edinburgh character in historic tartan and 1920s tweed jacket sharing a laughing toast with tea and Irn-Bru under classic wrought-iron gas streetlamps on wet cobblestones. Photorealistic lighting, mist, golden hour reflections, 8k --ar 16:9 --v 6.1 --style raw`;

export const ChannelProfileModal: React.FC<ChannelProfileModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-base border border-amber-500/30">
              🏴󠁧󠁢󠁳󠁣󠁴󠁿
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-100 font-serif">
                {CHANNEL_NAME} Channel Blueprint
              </h2>
              <p className="text-xs text-stone-400 font-mono">
                {YOUTUBE_HANDLE} • YouTube & Video Generator Profile
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-stone-300">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
              <span className="text-[10px] font-mono text-stone-400 uppercase block">Host / Narrator</span>
              <span className="font-bold text-emerald-300 text-xs flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" />
                British Young Female Voice
              </span>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
              <span className="text-[10px] font-mono text-stone-400 uppercase block">Fact Verification</span>
              <span className="font-bold text-amber-300 text-xs flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                100% Verified Archives
              </span>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
              <span className="text-[10px] font-mono text-stone-400 uppercase block">Video Format</span>
              <span className="font-bold text-purple-300 text-xs flex items-center gap-1">
                <Film className="w-3.5 h-3.5" />
                9:16 Shorts & 10-Min Video
              </span>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400 uppercase">
                Channel "About" Description
              </span>
              <button
                onClick={() => copyText(OFFICIAL_CHANNEL_ABOUT, 'about')}
                className="text-xs text-stone-400 hover:text-amber-300 flex items-center gap-1"
              >
                {copiedSection === 'about' ? 'Copied!' : 'Copy About'}
              </button>
            </div>
            <pre className="font-sans text-xs text-stone-300 whitespace-pre-wrap leading-relaxed bg-stone-900/60 p-3 rounded-lg border border-stone-800">
              {OFFICIAL_CHANNEL_ABOUT}
            </pre>
          </div>

          {/* Banner Prompt */}
          <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-purple-400 uppercase">
                Midjourney YouTube Banner Prompt (16:9)
              </span>
              <button
                onClick={() => copyText(YOUTUBE_BANNER_PROMPT, 'banner')}
                className="text-xs text-stone-400 hover:text-purple-300 flex items-center gap-1"
              >
                {copiedSection === 'banner' ? 'Copied!' : 'Copy Banner Prompt'}
              </button>
            </div>
            <p className="font-mono text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded-lg border border-stone-800">
              {YOUTUBE_BANNER_PROMPT}
            </p>
          </div>

          {/* Tags */}
          <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase">
                Channel Keywords & Tags
              </span>
              <button
                onClick={() => copyText(CHANNEL_TAGS.join(', '), 'tags')}
                className="text-xs text-stone-400 hover:text-cyan-300 flex items-center gap-1"
              >
                {copiedSection === 'tags' ? 'Copied!' : 'Copy Tags (CSV)'}
              </button>
            </div>
            <p className="font-mono text-xs text-cyan-300 leading-relaxed bg-stone-900/60 p-3 rounded-lg border border-stone-800">
              {CHANNEL_TAGS.join(', ')}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
