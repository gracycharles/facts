import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Video, Film, Volume2 } from 'lucide-react';
import { ShortsBlueprint } from '../types';
import { 
  formatBlueprintAsText, 
  formatVideoGenerationOnlyText, 
  formatYouTubeOnlyText,
  getScriptureVerificationText,
  formatTenMinuteCompilationPrompt
} from '../utils/blueprintFormatter';

interface BatchExportModalProps {
  isOpen?: boolean;
  onClose: () => void;
  blueprints: ShortsBlueprint[];
}

export const BatchExportModal: React.FC<BatchExportModalProps> = ({
  onClose,
  blueprints
}) => {
  const [exportMode, setExportMode] = useState<'10min-master' | 'video-only' | 'all' | 'audio-scripts' | 'json'>('10min-master');
  const [copied, setCopied] = useState(false);

  const generateExportText = (): string => {
    if (exportMode === '10min-master') {
      return formatTenMinuteCompilationPrompt(blueprints);
    }

    if (exportMode === 'json') {
      return JSON.stringify(blueprints, null, 2);
    }

    if (exportMode === 'audio-scripts') {
      return blueprints.map(b => (
        `SCENE #${b.id}: ${b.title} (${b.city})\nVOICE: British Young Female (Age 20-25, RP / Scottish lilt)\nSCRIPT:\n"${b.audioScript}"\nBACKGROUND SOUNDSCAPE: ${b.backgroundAudio}`
      )).join("\n\n" + "-".repeat(60) + "\n\n");
    }

    const separator = "\n\n" + "=".repeat(80) + "\n\n";

    return blueprints.map(b => {
      switch (exportMode) {
        case 'video-only':
          return formatVideoGenerationOnlyText(b);
        case 'all':
        default:
          return formatBlueprintAsText(b);
      }
    }).join(separator);
  };

  const exportText = generateExportText();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const extension = exportMode === 'json' ? 'json' : 'txt';
    const blob = new Blob([exportText], { type: exportMode === 'json' ? 'application/json' : 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Scotland_Facts_Prompts_${exportMode}.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-100 font-serif">
                Batch Export All 50 Prompts
              </h2>
              <p className="text-xs text-stone-400 font-mono">
                Export 50 video prompts, British female voice scripts, or the continuous 10-minute master prompt
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

        {/* Export Mode Tabs */}
        <div className="p-4 bg-stone-950/50 border-b border-stone-800 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setExportMode('10min-master')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                exportMode === '10min-master'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>10-Minute Master Video Prompt</span>
            </button>

            <button
              onClick={() => setExportMode('video-only')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                exportMode === 'video-only'
                  ? 'bg-amber-600 text-stone-950 shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>50 Video Prompts Only</span>
            </button>

            <button
              onClick={() => setExportMode('audio-scripts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                exportMode === 'audio-scripts'
                  ? 'bg-emerald-600 text-stone-950 shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>50 Spoken Audio Scripts</span>
            </button>

            <button
              onClick={() => setExportMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                exportMode === 'all'
                  ? 'bg-stone-700 text-stone-100 shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Complete Blueprints (All Data)</span>
            </button>

            <button
              onClick={() => setExportMode('json')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                exportMode === 'json'
                  ? 'bg-cyan-600 text-stone-950 shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <span>JSON Dataset</span>
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-stone-950 font-mono text-xs text-stone-300 select-all">
          <pre className="whitespace-pre-wrap font-mono leading-relaxed">
            {exportText}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-stone-800 flex items-center justify-between bg-stone-950/80">
          <span className="text-xs text-stone-400 font-mono">
            {blueprints.length} Prompts Prepared for External Video Generator
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
