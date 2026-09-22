import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Hash, Check, MapPin } from 'lucide-react';
import { ShortsBlueprint } from '../types';

interface ShortsNavigatorModalProps {
  isOpen?: boolean;
  onClose: () => void;
  blueprints: ShortsBlueprint[];
  selectedId?: number;
  currentId?: number;
  onSelectBlueprint?: (blueprint: ShortsBlueprint) => void;
  onSelectShort?: (blueprint: ShortsBlueprint) => void;
}

export const ShortsNavigatorModal: React.FC<ShortsNavigatorModalProps> = ({
  onClose,
  blueprints,
  selectedId,
  currentId,
  onSelectBlueprint,
  onSelectShort
}) => {
  const [query, setQuery] = useState('');
  const [jumpInput, setJumpInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const effectiveId = selectedId || currentId || 1;
  const selectHandler = onSelectBlueprint || onSelectShort || (() => {});

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredBlueprints = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blueprints;
    return blueprints.filter(b => (
      b.id.toString() === q ||
      (b.title && b.title.toLowerCase().includes(q)) ||
      (b.factText && b.factText.toLowerCase().includes(q)) ||
      (b.location && b.location.toLowerCase().includes(q)) ||
      (b.city && b.city.toLowerCase().includes(q)) ||
      (b.comicalElement && b.comicalElement.toLowerCase().includes(q))
    ));
  }, [blueprints, query]);

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(jumpInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= blueprints.length) {
      const target = blueprints.find(b => b.id === parsed);
      if (target) {
        selectHandler(target);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-stone-100 font-serif">
              Quick Prompt Finder (1 to {blueprints.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Jump */}
        <div className="p-4 bg-stone-950/50 border-b border-stone-800 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search prompts (Wellington cone, subway, castle)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <form onSubmit={handleJump} className="flex items-center gap-1.5">
            <input
              type="number"
              min="1"
              max={blueprints.length}
              placeholder="# (1-50)"
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              className="w-20 bg-stone-900 border border-stone-700/80 rounded-xl px-2 py-2 text-xs text-stone-200 text-center font-mono focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors"
            >
              Go
            </button>
          </form>
        </div>

        {/* Prompt List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredBlueprints.map(b => {
            const isCurrent = b.id === effectiveId;
            return (
              <div
                key={b.id}
                onClick={() => {
                  selectHandler(b);
                  onClose();
                }}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isCurrent 
                    ? 'bg-amber-950/40 border-amber-500 text-stone-100 ring-1 ring-amber-500/50' 
                    : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-400 font-bold shrink-0">
                    #{b.id}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs text-stone-100 truncate">{b.title}</p>
                    <p className="text-[10px] font-mono text-stone-400 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 text-amber-400" />
                      <span>{b.location} • {b.city}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-900 text-stone-300 border border-stone-800">
                    {b.city}
                  </span>
                  {isCurrent && (
                    <Check className="w-4 h-4 text-amber-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
