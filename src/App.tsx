import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { BlueprintCard } from './components/BlueprintCard';
import { BatchExportModal } from './components/BatchExportModal';
import { FullDirectoryView } from './components/FullDirectoryView';
import { ChannelProfileModal } from './components/ChannelProfileModal';
import { ShortsNavigatorModal } from './components/ShortsNavigatorModal';
import { TenMinuteCompilationView } from './components/TenMinuteCompilationView';
import { INITIAL_BLUEPRINTS, TOTAL_PRAISES_TARGET } from './data/blueprints';
import { ShortsBlueprint, ViewTab } from './types';
import { requestScreenWakeLock } from './utils/wakeLock';
import { formatVideoGenerationOnlyText, formatAudioOnlyText } from './utils/blueprintFormatter';
import { 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Hash,
  Search,
  Sparkles,
  ArrowRight,
  ArrowUp,
  Video,
  Mic,
  Check,
  Compass,
  Layers,
  ListFilter
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('studio');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlueprint, setSelectedBlueprint] = useState<ShortsBlueprint>(INITIAL_BLUEPRINTS[0]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [jumpInputVal, setJumpInputVal] = useState('');
  const [cityFilter, setCityFilter] = useState<'All' | 'Glasgow' | 'Edinburgh' | 'Other'>('All');
  const [floatingCopied, setFloatingCopied] = useState<string | null>(null);

  const numberStripRef = useRef<HTMLDivElement>(null);

  // Always on / no screen lock feature enabled on mount
  useEffect(() => {
    let sentinel: WakeLockSentinel | null = null;
    requestScreenWakeLock().then(s => {
      sentinel = s;
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestScreenWakeLock().then(s => {
          sentinel = s;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (sentinel) {
        sentinel.release().catch(() => {});
      }
    };
  }, []);

  const handleSelectShort = (blueprint: ShortsBlueprint) => {
    setSelectedBlueprint(blueprint);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-scroll the active number in the horizontal strip into view
  useEffect(() => {
    if (numberStripRef.current) {
      const activeEl = numberStripRef.current.querySelector(`[data-id="${selectedBlueprint.id}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedBlueprint.id]);

  const handleDirectNumberJump = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInputVal.trim(), 10);
    if (!isNaN(num)) {
      const found = INITIAL_BLUEPRINTS.find(b => b.id === num);
      if (found) {
        handleSelectShort(found);
        setJumpInputVal('');
      }
    }
  };

  // Keyboard navigation: Left/Right arrow keys flip prompts, J / Cmd+K opens navigator
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        const prev = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id - 1);
        if (prev) handleSelectShort(prev);
      } else if (e.key === 'ArrowRight') {
        const next = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id + 1);
        if (next) handleSelectShort(next);
      } else if (e.key === 'j' || e.key === 'J' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsNavigatorOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBlueprint.id]);

  const prevBlueprint = useMemo(() => {
    return INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id - 1) || null;
  }, [selectedBlueprint.id]);

  const nextBlueprint = useMemo(() => {
    return INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id + 1) || null;
  }, [selectedBlueprint.id]);

  const filteredStripBlueprints = useMemo(() => {
    if (cityFilter === 'All') return INITIAL_BLUEPRINTS;
    if (cityFilter === 'Glasgow') return INITIAL_BLUEPRINTS.filter(b => b.city === 'Glasgow');
    if (cityFilter === 'Edinburgh') return INITIAL_BLUEPRINTS.filter(b => b.city === 'Edinburgh');
    return INITIAL_BLUEPRINTS.filter(b => b.city !== 'Glasgow' && b.city !== 'Edinburgh');
  }, [cityFilter]);

  const copyFloating = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setFloatingCopied(type);
    setTimeout(() => setFloatingCopied(null), 2000);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 pb-20">
      
      {/* Primary Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        verifiedCount={INITIAL_BLUEPRINTS.length}
        totalTarget={TOTAL_PRAISES_TARGET}
        selectedId={selectedBlueprint.id}
        onSelectId={(id) => {
          const found = INITIAL_BLUEPRINTS.find(b => b.id === id);
          if (found) handleSelectShort(found);
        }}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenChannelProfile={() => setIsChannelModalOpen(true)}
        onOpenNavigator={() => setIsNavigatorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
        
        {/* TAB 1: STUDIO (Single Prompt Engine) */}
        {activeTab === 'studio' && (
          <div className="space-y-4 sm:space-y-5">
            
            {/* 🚀 QUICK PROMPT FAST-NAVIGATOR CAROUSEL STRIP (#1 - #50) */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-3 sm:p-4 shadow-lg space-y-3">
              
              {/* Top Strip Bar: City Filter & Direct Jump */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
                {/* City Filter Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono text-stone-400 font-bold uppercase flex items-center gap-1 mr-1">
                    <ListFilter className="w-3.5 h-3.5 text-amber-400" />
                    City Filter:
                  </span>
                  {(['All', 'Glasgow', 'Edinburgh', 'Other'] as const).map((city) => (
                    <button
                      key={city}
                      onClick={() => setCityFilter(city)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition-all ${
                        cityFilter === city
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                          : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800 hover:bg-stone-850'
                      }`}
                    >
                      {city === 'All' ? 'All (50)' : city === 'Other' ? 'Highlands/Coast (10)' : `${city} (20)`}
                    </button>
                  ))}
                </div>

                {/* Direct Number Jump & Finder */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsNavigatorOpen(true)}
                    className="px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-700 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1.5 transition-all"
                    title="Open Searchable Prompt Finder (Shortcut: J or Cmd+K)"
                  >
                    <Search className="w-3.5 h-3.5 text-amber-400" />
                    <span>Search (J)</span>
                  </button>

                  <form onSubmit={handleDirectNumberJump} className="flex items-center gap-1">
                    <div className="relative w-16">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-500">#</span>
                      <input
                        type="number"
                        min="1"
                        max={INITIAL_BLUEPRINTS.length}
                        value={jumpInputVal}
                        onChange={(e) => setJumpInputVal(e.target.value)}
                        placeholder="1-50"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-5 pr-1 py-1 text-xs font-mono text-amber-300 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-2 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-sm transition-all"
                    >
                      Go
                    </button>
                  </form>
                </div>
              </div>

              {/* Horizontal Scrollable Prompt Number Strip (#1 to #50) */}
              <div 
                ref={numberStripRef}
                className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-900 scroll-smooth"
              >
                {filteredStripBlueprints.map((b) => {
                  const isSelected = b.id === selectedBlueprint.id;
                  const isGlasgow = b.city === 'Glasgow';
                  const isEdinburgh = b.city === 'Edinburgh';
                  return (
                    <button
                      key={b.id}
                      data-id={b.id}
                      onClick={() => handleSelectShort(b)}
                      className={`shrink-0 px-2.5 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-md ring-2 ring-amber-400 scale-105'
                          : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:border-amber-500/40'
                      }`}
                      title={`#${b.id}: ${b.title} (${b.city})`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isSelected 
                          ? 'bg-stone-950' 
                          : isGlasgow ? 'bg-rose-400' : isEdinburgh ? 'bg-amber-400' : 'bg-sky-400'
                      }`}></span>
                      <span className="font-bold">#{b.id}</span>
                      <span className="max-w-[100px] truncate text-[11px] opacity-85 hidden md:inline">
                        {b.title.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Stepper Navigation Bar: Previous Prompt | Current | Next Prompt */}
              <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => {
                    if (prevBlueprint) handleSelectShort(prevBlueprint);
                  }}
                  disabled={!prevBlueprint}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    prevBlueprint
                      ? 'bg-stone-950 hover:bg-stone-850 text-stone-200 border-stone-700 hover:text-amber-300 hover:border-amber-500/40 shadow-sm'
                      : 'bg-stone-950/40 border-stone-850 text-stone-600 cursor-not-allowed opacity-50'
                  }`}
                  title="Previous Prompt (Keyboard: ← Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-mono">
                    {prevBlueprint ? `← #${prevBlueprint.id}: ${prevBlueprint.title.substring(0, 22)}...` : 'First Prompt'}
                  </span>
                  <span className="sm:hidden">Prev</span>
                </button>

                <div className="text-xs font-mono text-stone-300 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-stone-950 border border-stone-800 font-bold text-amber-300">
                    Prompt #{selectedBlueprint.id} of {INITIAL_BLUEPRINTS.length}
                  </span>
                  <span className="text-stone-400 hidden sm:inline">({selectedBlueprint.city})</span>
                </div>

                <button
                  onClick={() => {
                    if (nextBlueprint) handleSelectShort(nextBlueprint);
                  }}
                  disabled={!nextBlueprint}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    nextBlueprint
                      ? 'bg-stone-950 hover:bg-stone-850 text-stone-200 border-stone-700 hover:text-amber-300 hover:border-amber-500/40 shadow-sm'
                      : 'bg-stone-950/40 border-stone-850 text-stone-600 cursor-not-allowed opacity-50'
                  }`}
                  title="Next Prompt (Keyboard: → Right Arrow)"
                >
                  <span className="hidden sm:inline font-mono">
                    {nextBlueprint ? `#${nextBlueprint.id}: ${nextBlueprint.title.substring(0, 22)}... →` : 'Last Prompt'}
                  </span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Prompt Studio Card (Collapsed by default per user request) */}
            <BlueprintCard
              key={selectedBlueprint.id}
              blueprint={selectedBlueprint}
              totalCount={INITIAL_BLUEPRINTS.length}
              prevId={selectedBlueprint.id > 1 ? selectedBlueprint.id - 1 : null}
              nextId={selectedBlueprint.id < INITIAL_BLUEPRINTS.length ? selectedBlueprint.id + 1 : null}
              onNavigatePrev={() => {
                const prev = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id - 1);
                if (prev) handleSelectShort(prev);
              }}
              onNavigateNext={() => {
                const next = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id + 1);
                if (next) handleSelectShort(next);
              }}
              onOpenNavigator={() => setIsNavigatorOpen(true)}
            />
          </div>
        )}

        {/* TAB 2: 10-MINUTE COMPILATION MASTER PROMPT ENGINE */}
        {activeTab === 'compilation10min' && (
          <TenMinuteCompilationView
            blueprints={INITIAL_BLUEPRINTS}
            onSelectBlueprint={(b) => handleSelectShort(b)}
          />
        )}

        {/* TAB 3: ALL 50 PROMPTS DIRECTORY */}
        {activeTab === 'directory' && (
          <FullDirectoryView
            verifiedBlueprints={INITIAL_BLUEPRINTS}
            onSelectBlueprint={(b) => handleSelectShort(b)}
          />
        )}

      </main>

      {/* 🚀 FLOATING QUICK-NAVIGATION BAR AT BOTTOM (PERPETUAL 1-CLICK PROMPT SWITCHING & COPYING) */}
      {activeTab === 'studio' && (
        <aside 
          aria-label="Quick Prompt Navigation"
          className="fixed bottom-3 inset-x-0 mx-auto max-w-xl px-3 z-40 pointer-events-none"
        >
          <div className="bg-stone-950/95 border border-amber-500/40 rounded-full px-3 py-2 shadow-2xl backdrop-blur-md flex items-center justify-between gap-2 pointer-events-auto">
            
            {/* Prev Button */}
            <button
              onClick={() => {
                if (prevBlueprint) handleSelectShort(prevBlueprint);
              }}
              disabled={!prevBlueprint}
              className={`p-1.5 rounded-full transition-all ${
                prevBlueprint
                  ? 'bg-stone-850 hover:bg-stone-750 text-amber-300'
                  : 'text-stone-600 opacity-40 cursor-not-allowed'
              }`}
              title="Previous Prompt (← Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Current Prompt Indicator & Quick Finder */}
            <button
              onClick={() => setIsNavigatorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-200 text-xs font-mono font-bold transition-all"
              title="Click to browse all 50 prompts"
            >
              <span className="text-amber-400">#{selectedBlueprint.id}</span>
              <span className="max-w-[130px] truncate text-[11px] font-normal text-stone-300">
                {selectedBlueprint.title}
              </span>
              <span className="text-[10px] text-stone-500">/ 50</span>
            </button>

            {/* Quick 1-Click Copy Video Prompt */}
            <button
              onClick={() => copyFloating(formatVideoGenerationOnlyText(selectedBlueprint), 'float-vid')}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow transition-all"
              title="Quick copy 9:16 master video generation prompt"
            >
              {floatingCopied === 'float-vid' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Video className="w-3.5 h-3.5" />
                  <span>Copy Video</span>
                </>
              )}
            </button>

            {/* Quick 1-Click Copy Audio Script */}
            <button
              onClick={() => copyFloating(formatAudioOnlyText(selectedBlueprint), 'float-aud')}
              className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 text-xs font-bold shadow transition-all"
              title="Quick copy 10s audio narration script"
            >
              {floatingCopied === 'float-aud' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5" />
                  <span>Audio (10s)</span>
                </>
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={() => {
                if (nextBlueprint) handleSelectShort(nextBlueprint);
              }}
              disabled={!nextBlueprint}
              className={`p-1.5 rounded-full transition-all ${
                nextBlueprint
                  ? 'bg-stone-850 hover:bg-stone-750 text-amber-300'
                  : 'text-stone-600 opacity-40 cursor-not-allowed'
              }`}
              title="Next Prompt (→ Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Scroll to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-1.5 rounded-full bg-stone-850 hover:bg-stone-750 text-amber-400 transition-all ml-1"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

          </div>
        </aside>
      )}

      {/* Modals */}
      {isExportModalOpen && (
        <BatchExportModal
          blueprints={INITIAL_BLUEPRINTS}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}

      {isChannelModalOpen && (
        <ChannelProfileModal
          onClose={() => setIsChannelModalOpen(false)}
        />
      )}

      {isNavigatorOpen && (
        <ShortsNavigatorModal
          blueprints={INITIAL_BLUEPRINTS}
          selectedId={selectedBlueprint.id}
          onSelectBlueprint={(b) => {
            handleSelectShort(b);
            setIsNavigatorOpen(false);
          }}
          onClose={() => setIsNavigatorOpen(false)}
        />
      )}

    </div>
  );
}
