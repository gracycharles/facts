import React, { useState, useMemo } from 'react';
import { ShortsBlueprint } from '../types';
import { 
  Film, 
  Copy, 
  Check, 
  Clock, 
  Download, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { formatTenMinuteCompilationPrompt } from '../utils/blueprintFormatter';

interface TenMinuteCompilationViewProps {
  blueprints: ShortsBlueprint[];
  onSelectBlueprint: (blueprint: ShortsBlueprint) => void;
}

export const TenMinuteCompilationView: React.FC<TenMinuteCompilationViewProps> = ({
  blueprints,
  onSelectBlueprint
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<number>(1);

  const full10MinPrompt = useMemo(() => formatTenMinuteCompilationPrompt(blueprints), [blueprints]);

  const activeBlueprint = useMemo(() => {
    return blueprints.find(b => b.id === activeSceneId) || blueprints[0];
  }, [blueprints, activeSceneId]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([full10MinPrompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '10_Minute_Scotland_Facts_Video_Compilation_Master_Prompt.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-purple-950/40 to-stone-900 border border-purple-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Film className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-stone-100 font-serif tracking-wide">
                10-Minute Hollywood Scottish Odyssey Prompt Engine
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 font-sans max-w-3xl leading-relaxed">
              50 distinct Hollywood-range comical and historical scenes concatenated into one seamless, fast-paced 10-minute master video prompt. Voiced continuously by a British young female narrator with witty Scottish lilt and authentic background soundscapes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => copyToClipboard(full10MinPrompt, 'full-10min')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all"
              title="Copy the complete 10-minute video generator prompt"
            >
              {copiedType === 'full-10min' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Copied 10-Min Master Prompt!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy 10-Min Master Prompt</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition-all"
              title="Download text file with all 50 scenes and 10-minute timeline breakdown"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download .TXT</span>
            </button>
          </div>
        </div>

        {/* Quick Specs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono border-t border-stone-800/80">
          <div className="bg-black/40 p-2.5 rounded-lg border border-stone-800">
            <span className="text-[10px] text-stone-400 block">TOTAL DURATION</span>
            <span className="text-amber-300 font-bold text-sm">10:00 (600s)</span>
          </div>
          <div className="bg-black/40 p-2.5 rounded-lg border border-stone-800">
            <span className="text-[10px] text-stone-400 block">TOTAL SCENES</span>
            <span className="text-emerald-300 font-bold text-sm">50 Distinct Chapters</span>
          </div>
          <div className="bg-black/40 p-2.5 rounded-lg border border-stone-800">
            <span className="text-[10px] text-stone-400 block">NARRATION VOICE</span>
            <span className="text-cyan-300 font-bold text-xs truncate">British Young Female</span>
          </div>
          <div className="bg-black/40 p-2.5 rounded-lg border border-stone-800">
            <span className="text-[10px] text-stone-400 block">PACE PER SCENE</span>
            <span className="text-purple-300 font-bold text-sm">~12.0 Seconds</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Timeline Navigator (Left) & Active Scene Deep Dive (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 50 Scene Chapters Timeline List (5 cols) */}
        <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-3 max-h-[750px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <span className="text-xs font-mono uppercase font-bold text-stone-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              50 Scene Timeline (12s per scene)
            </span>
          </div>

          <div className="space-y-1.5">
            {blueprints.map((b) => {
              const startSec = (b.id - 1) * 12;
              const endSec = b.id * 12;
              const startMin = Math.floor(startSec / 60).toString().padStart(2, '0');
              const startRemSec = (startSec % 60).toString().padStart(2, '0');
              const endMin = Math.floor(endSec / 60).toString().padStart(2, '0');
              const endRemSec = (endSec % 60).toString().padStart(2, '0');
              const timestamp = `${startMin}:${startRemSec} - ${endMin}:${endRemSec}`;
              const isActive = b.id === activeSceneId;

              return (
                <div
                  key={b.id}
                  onClick={() => setActiveSceneId(b.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                    isActive 
                      ? 'bg-purple-950/60 border-purple-500 text-stone-100 shadow-md ring-1 ring-purple-500/50' 
                      : 'bg-stone-950/60 border-stone-800/80 text-stone-300 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-400 font-bold shrink-0">
                      #{b.id}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs truncate">{b.title}</p>
                      <p className="text-[10px] font-mono text-stone-400 truncate">
                        {timestamp} • {b.city}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-purple-400 translate-x-0.5' : 'text-stone-600'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Scene Preview & Prompt (7 cols) */}
        <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/40">
                  Scene #{activeBlueprint.id} of 50
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {Math.floor(((activeBlueprint.id - 1) * 12) / 60).toString().padStart(2, '0')}:{(((activeBlueprint.id - 1) * 12) % 60).toString().padStart(2, '0')} - {Math.floor((activeBlueprint.id * 12) / 60).toString().padStart(2, '0')}:{((activeBlueprint.id * 12) % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100 font-serif mt-1">
                {activeBlueprint.title}
              </h3>
            </div>

            <button
              onClick={() => onSelectBlueprint(activeBlueprint)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-all shadow"
            >
              <span>Open Studio Prompt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scene Transition Segment Prompt */}
          <div className="bg-stone-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
            <span className="text-[10px] font-mono text-purple-300 uppercase font-bold tracking-wider block">
              Continuous 10-Minute Segment Direction:
            </span>
            <p className="text-stone-200 text-xs font-mono leading-relaxed bg-stone-900/90 p-3 rounded-lg border border-stone-800">
              {activeBlueprint.tenMinuteSegmentPrompt || `Scene ${activeBlueprint.id}: Seamless cinematic transition into ${activeBlueprint.location}.`}
            </p>
          </div>

          {/* Hollywood Video Making Prompt */}
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider block">
                Scene Video Prompt (Runway Gen-3 / Kling / Sora):
              </span>
              <button
                onClick={() => copyToClipboard(activeBlueprint.videoPrompt || '', `scene-${activeBlueprint.id}`)}
                className="text-[10px] font-mono text-stone-400 hover:text-amber-300 flex items-center gap-1"
              >
                {copiedType === `scene-${activeBlueprint.id}` ? 'Copied!' : 'Copy Scene Prompt'}
              </button>
            </div>
            <p className="text-stone-300 text-xs font-mono leading-relaxed bg-stone-900/90 p-3 rounded-lg border border-stone-800">
              {activeBlueprint.videoPrompt}
            </p>
          </div>

          {/* Narration Script */}
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">
              British Young Female Voice Script (Exact Spoken Text):
            </span>
            <p className="text-stone-100 text-sm font-serif italic bg-stone-900/90 p-3 rounded-lg border border-stone-800">
              "{activeBlueprint.audioScript}"
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
