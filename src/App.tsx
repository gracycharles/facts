import React, { useState, useMemo, useEffect } from 'react';
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
import { 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Hash,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('studio');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlueprint, setSelectedBlueprint] = useState<ShortsBlueprint>(INITIAL_BLUEPRINTS[0]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [jumpInputVal, setJumpInputVal] = useState('');

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

  // Keyboard navigation: Left/Right arrow keys flip prompts, Cmd+K / J opens navigator
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

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: STUDIO (Single Prompt Engine) */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            
            {/* Direct Prompt Stepper & Jump Bar (No sorts or clutter) */}
            <div className="bg-stone-900/95 border border-stone-800 rounded-xl px-3 py-2.5 sm:px-4 shadow-lg sticky top-14 z-30 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Stepper (Prev, Current #, Next) */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const prev = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id - 1);
                      if (prev) handleSelectShort(prev);
                    }}
                    disabled={selectedBlueprint.id <= 1}
                    className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 font-semibold transition-all ${
                      selectedBlueprint.id > 1
                        ? 'bg-stone-950 border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500/40'
                        : 'bg-stone-950/40 border-stone-850 text-stone-600 cursor-not-allowed opacity-50'
                    }`}
                    title="Previous Prompt (← Left Arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <button
                    onClick={() => setIsNavigatorOpen(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm group"
                    title="Click to browse all 50 prompts (Shortcut: J or Cmd+K)"
                  >
                    <Hash className="w-3.5 h-3.5 text-amber-400" />
                    <span>Prompt #{selectedBlueprint.id} of 50</span>
                    <span className="text-[10px] text-amber-400/80 font-normal ml-1">({selectedBlueprint.city})</span>
                    <ChevronDown className="w-3.5 h-3.5 text-amber-400/70 group-hover:text-amber-300 transition-colors" />
                  </button>

                  <button
                    onClick={() => {
                      const next = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id + 1);
                      if (next) handleSelectShort(next);
                    }}
                    disabled={selectedBlueprint.id >= INITIAL_BLUEPRINTS.length}
                    className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 font-semibold transition-all ${
                      selectedBlueprint.id < INITIAL_BLUEPRINTS.length
                        ? 'bg-stone-950 border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500/40'
                        : 'bg-stone-950/40 border-stone-850 text-stone-600 cursor-not-allowed opacity-50'
                    }`}
                    title="Next Prompt (→ Right Arrow)"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct Number Jump Form */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400 font-mono hidden sm:inline">Jump to #</span>
                  <form onSubmit={handleDirectNumberJump} className="flex items-center gap-1">
                    <div className="relative w-16 sm:w-20">
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
                      className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-sm transition-all"
                    >
                      Go
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Prompt Studio Card */}
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
