import React, { useState } from 'react';
import { ShortsBlueprint } from '../types';
import { Sparkles, ArrowRight, BookOpen, Search, Video, Hash, Copy, Check, MapPin, ShieldCheck, Volume2 } from 'lucide-react';
import { 
  formatVideoGenerationOnlyText, 
  formatAudioOnlyText
} from '../utils/blueprintFormatter';

interface FullDirectoryViewProps {
  verifiedBlueprints: ShortsBlueprint[];
  onSelectBlueprint: (blueprint: ShortsBlueprint) => void;
}

export const FullDirectoryView: React.FC<FullDirectoryViewProps> = ({
  verifiedBlueprints,
  onSelectBlueprint,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyItemText = (e: React.MouseEvent, text: string, key: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredItems = verifiedBlueprints.filter(item => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.id.toString() === q ||
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.factText && item.factText.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.character && item.character.toLowerCase().includes(q)) ||
      (item.comicalElement && item.comicalElement.toLowerCase().includes(q)) ||
      (item.city && item.city.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-lg border border-amber-500/40">
            🏴󠁧󠁢󠁳󠁣󠁴󠁿
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-100 font-serif">
              Scotland Facts Prompts Directory ({filteredItems.length} Prompts)
            </h2>
            <p className="text-xs text-stone-400 font-mono">
              Direct access to all 50 verified video generation prompts & British female voice scripts
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search prompts (cone, subway, castle)..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-stone-950/90 border border-stone-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectBlueprint(item)}
            className="bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 rounded-xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-3"
          >
            <div className="space-y-2.5">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                  Prompt #{item.id} • {item.city}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-bold">
                  Verified Fact
                </span>
              </div>

              {/* Title & Location */}
              <div>
                <h3 className="font-serif font-bold text-stone-100 text-sm group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-amber-400/90 font-mono flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </p>
              </div>

              {/* Video Prompt Snippet */}
              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[9px] font-mono text-amber-400 uppercase font-bold tracking-wider block">
                  AI Video Prompt (9:16):
                </span>
                <p className="text-stone-300 text-xs font-mono line-clamp-2 leading-relaxed">
                  {item.videoPrompt}
                </p>
              </div>

              {/* Spoken Voice Script */}
              <div className="p-2 rounded-lg bg-stone-950/60 border border-emerald-500/20 text-[11px] text-stone-300 line-clamp-2 italic font-serif">
                "{item.audioScript}"
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="border-t border-stone-800/80 pt-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => copyItemText(e, item.videoPrompt || '', `video-${item.id}`)}
                  className="px-2 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 text-[11px] font-semibold transition-colors flex items-center gap-1"
                  title="Copy Video Generation Prompt"
                >
                  {copiedKey === `video-${item.id}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-3 h-3 text-amber-400" />
                      <span>Copy Video</span>
                    </>
                  )}
                </button>

                <button
                  onClick={(e) => copyItemText(e, item.audioScript || '', `audio-${item.id}`)}
                  className="px-2 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-emerald-300 text-[11px] font-semibold transition-colors flex items-center gap-1"
                  title="Copy British Female Voice Script"
                >
                  {copiedKey === `audio-${item.id}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3 h-3 text-emerald-400" />
                      <span>Copy Audio</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold group-hover:translate-x-1 transition-transform">
                <span>View Full Prompt</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
