import React, { useState, useMemo, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  Video, 
  Mic, 
  Subtitles, 
  Hash, 
  UserCheck, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Download,
  Volume2,
  Play,
  Square,
  Users,
  Film,
  Calendar,
  Smile,
  ShieldCheck,
  Radio,
  Layers,
  Eye,
  EyeOff
} from 'lucide-react';
import { ShortsBlueprint } from '../types';
import { 
  formatBlueprintAsText, 
  formatVideoGenerationOnlyText, 
  formatYouTubeOnlyText,
  getEnglishTitleOnly,
  getScriptureVerificationText,
  formatSubtitlesOnlyText,
  formatVideoPromptOnlyText,
  formatAudioOnlyText,
  formatMidjourneyPrompt
} from '../utils/blueprintFormatter';
import { downloadAlphaOverlayPng } from '../utils/alphaOverlayGenerator';
import { 
  buildCharacterVoiceDirection, 
  getRecommendedVoiceForFact, 
  playAdaptiveVoice, 
  stopSpeech, 
  VOICE_ARCHETYPES, 
  VoiceArchetypeId 
} from '../utils/narrationEngine';

interface BlueprintCardProps {
  blueprint: ShortsBlueprint;
  totalCount?: number;
  prevId?: number | null;
  nextId?: number | null;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  onOpenNavigator?: () => void;
}

const BlueprintCardComponent: React.FC<BlueprintCardProps> = ({ 
  blueprint,
  totalCount = 50,
  prevId,
  nextId,
  onNavigatePrev,
  onNavigateNext,
  onOpenNavigator
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  
  // Master Collapse state: Default to false (collapsed) per user request
  const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);
  
  // Individual section accordion states
  const [isFactOpen, setIsFactOpen] = useState<boolean>(true);
  const [isVerificationOpen, setIsVerificationOpen] = useState<boolean>(false);
  const [isCastingOpen, setIsCastingOpen] = useState<boolean>(false);
  const [isVideoPromptOpen, setIsVideoPromptOpen] = useState<boolean>(true);
  const [isAudioOpen, setIsAudioOpen] = useState<boolean>(true);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(true);
  const [isTenMinOpen, setIsTenMinOpen] = useState<boolean>(false);
  const [isSeoOpen, setIsSeoOpen] = useState<boolean>(false);
  
  const [isGeneratingPng, setIsGeneratingPng] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState<VoiceArchetypeId>('auto');

  // Stop audio playback when switching blueprint
  useEffect(() => {
    stopSpeech();
    setIsPlayingAudio(false);
  }, [blueprint.id]);

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleDownloadAlphaPng = async () => {
    try {
      setIsGeneratingPng(true);
      await downloadAlphaOverlayPng(blueprint);
    } catch (err) {
      console.error('Failed to download alpha overlay PNG:', err);
    } finally {
      setIsGeneratingPng(false);
    }
  };

  const activeArchetype = useMemo(() => {
    if (selectedVoiceId === 'auto') {
      return getRecommendedVoiceForFact(blueprint);
    }
    return VOICE_ARCHETYPES[selectedVoiceId] || VOICE_ARCHETYPES.british_young_female;
  }, [selectedVoiceId, blueprint]);

  const handleToggleVoicePlayback = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      const script = blueprint.audioScript10s || blueprint.audioScript || blueprint.factText || '';
      setIsPlayingAudio(true);
      playAdaptiveVoice(
        script,
        activeArchetype,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const fullBlueprintText = useMemo(() => formatBlueprintAsText(blueprint, selectedVoiceId), [blueprint, selectedVoiceId]);
  const factTitle = useMemo(() => getEnglishTitleOnly(blueprint), [blueprint]);
  const verificationText = useMemo(() => getScriptureVerificationText(blueprint), [blueprint]);
  const voiceDir = useMemo(() => buildCharacterVoiceDirection(blueprint, selectedVoiceId), [blueprint, selectedVoiceId]);
  const audioScript = blueprint.audioScript10s || blueprint.audioScript || voiceDir.audioNarrationScript;

  const line1Hook = blueprint.subtitles?.line1Hook || blueprint.title || '';
  const line2Fact = blueprint.subtitles?.line2Fact || blueprint.factText || '';
  const line3Location = blueprint.subtitles?.line3Location || blueprint.location || '';

  const cityColor = useMemo(() => {
    switch (blueprint.city) {
      case 'Glasgow':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/40';
      case 'Edinburgh':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      default:
        return 'bg-sky-950/80 text-sky-300 border-sky-500/40';
    }
  }, [blueprint.city]);

  return (
    <article 
      id={`prompt-card-${blueprint.id}`}
      className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl hover:border-amber-500/40 transition-all duration-300"
    >
      {/* 🌟 TOP BUTTON SECTION & QUICK ACTION SUITE (ALWAYS VISIBLE & PROMINENT) */}
      <div className="bg-stone-950 border-b border-stone-800/90 px-4 sm:px-6 py-4 space-y-3.5">
        
        {/* Row 1: Badges & Title */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-sm rounded-lg shadow-sm">
              Prompt #{blueprint.id}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full border font-mono text-xs font-bold ${cityColor}`}>
              🏴󠁧󠁢󠁳󠁣󠁴󠁿 {blueprint.city}
            </span>
            {blueprint.category && (
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800/80 border border-stone-700 text-stone-300 font-mono text-xs font-semibold">
                🏷 {blueprint.category}
              </span>
            )}
            {blueprint.historicalEra && (
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800/80 border border-stone-700 text-amber-400 font-mono text-xs font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                {blueprint.historicalEra}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Verified
            </span>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-stone-900 border border-stone-700 text-amber-300 font-bold">
              ⏱️ {voiceDir.timing.estimatedDurationSec}s ({voiceDir.timing.wordCount} words)
            </span>
          </div>
        </div>

        {/* Row 2: Prompt Title & Location */}
        <div>
          <h2 className="text-lg sm:text-xl font-black text-stone-100 font-serif tracking-tight flex items-center gap-2">
            <span>{blueprint.title}</span>
          </h2>
          <div className="flex items-center gap-2 text-xs text-amber-400/90 font-mono mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{blueprint.location}</span>
          </div>
        </div>

        {/* Row 3: COMPLETE TOP ACTION BUTTONS SUITE */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-850">
          
          {/* 1. Master Video Prompt Only (Primary Amber Action) */}
          <button
            onClick={() => copyToClipboard(formatVideoGenerationOnlyText(blueprint, selectedVoiceId), 'top-video-only')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-bold shadow-md transition-all group"
            title="Copy 9:16 vertical video prompt with burned-in text overlay and verbatim audio mandates"
          >
            {copiedSection === 'top-video-only' ? (
              <>
                <Check className="w-4 h-4 text-amber-400 animate-bounce" />
                <span className="text-amber-400">Copied Video Prompt!</span>
              </>
            ) : (
              <>
                <Video className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Copy Video Prompt</span>
              </>
            )}
          </button>

          {/* 2. Audio Script (10s Verbatim) */}
          <button
            onClick={() => copyToClipboard(formatAudioOnlyText(blueprint, selectedVoiceId), 'top-audio')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-sm transition-all"
            title="Copy exact 10s audio script with British/Scottish voice profile & verbatim mandate"
          >
            {copiedSection === 'top-audio' ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied Audio!</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 text-emerald-400" />
                <span>Copy Audio Script ({voiceDir.timing.wordCount}w)</span>
              </>
            )}
          </button>

          {/* 3. Text Overlay Specs */}
          <button
            onClick={() => copyToClipboard(formatSubtitlesOnlyText(blueprint), 'top-subs')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-teal-300 text-xs font-bold shadow-sm transition-all"
            title="Copy 3-line burned-in overlay specs (No black box)"
          >
            {copiedSection === 'top-subs' ? (
              <>
                <Check className="w-4 h-4 text-teal-400" />
                <span className="text-teal-400">Copied Overlay!</span>
              </>
            ) : (
              <>
                <Subtitles className="w-4 h-4 text-teal-400" />
                <span>Copy Overlay Specs</span>
              </>
            )}
          </button>

          {/* 4. Download Alpha PNG */}
          <button
            onClick={handleDownloadAlphaPng}
            disabled={isGeneratingPng}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-850 hover:bg-stone-800 border border-amber-500/30 text-amber-200 text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
            title="Download 1080x1920 clean transparent alpha overlay PNG (No black box)"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{isGeneratingPng ? 'Generating...' : 'Alpha PNG'}</span>
          </button>

          {/* 5. In-Browser Interactive Voice Player */}
          <button
            onClick={handleToggleVoicePlayback}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold shadow-sm transition-all ${
              isPlayingAudio 
                ? 'bg-rose-600 hover:bg-rose-500 text-white border-rose-500 animate-pulse'
                : 'bg-stone-800 hover:bg-stone-700 text-emerald-300 border-emerald-500/40'
            }`}
            title={`Listen to spoken narration using ${activeArchetype.name}`}
          >
            {isPlayingAudio ? (
              <>
                <Square className="w-4 h-4" />
                <span>Stop Audio</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Listen ({activeArchetype.shortLabel})</span>
              </>
            )}
          </button>

          {/* 6. Copy Title */}
          <button
            onClick={() => copyToClipboard(factTitle, 'top-title')}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-700 text-stone-300 text-xs font-medium transition-all"
            title={`Copy Title: "${factTitle}"`}
          >
            {copiedSection === 'top-title' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-400" />
                <span>Title</span>
              </>
            )}
          </button>

          {/* 7. Copy All */}
          <button
            onClick={() => copyToClipboard(fullBlueprintText, 'top-all')}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-700 text-stone-300 text-xs font-medium transition-all"
            title="Copy complete production blueprint package"
          >
            {copiedSection === 'top-all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied All!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-400" />
                <span>Copy All</span>
              </>
            )}
          </button>

          {/* 8. Master Expand/Collapse Toggle Button */}
          <button
            onClick={() => setIsContentExpanded(!isContentExpanded)}
            className={`ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-bold transition-all shadow-sm ${
              isContentExpanded
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-stone-900 hover:bg-stone-800 border-stone-700 text-stone-300 hover:text-white'
            }`}
            title={isContentExpanded ? 'Collapse all prompt details' : 'Expand all prompt details'}
          >
            {isContentExpanded ? (
              <>
                <EyeOff className="w-4 h-4 text-amber-400" />
                <span>Collapse Details</span>
                <ChevronUp className="w-4 h-4 text-amber-400 ml-0.5" />
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-stone-400" />
                <span>Expand Details (7 Modules)</span>
                <ChevronDown className="w-4 h-4 text-stone-400 ml-0.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* QUICK COLLAPSED SUMMARY TEASER (SHOWN WHEN COLLAPSED) */}
      {!isContentExpanded && (
        <div className="p-4 sm:p-5 bg-stone-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border-b border-stone-850">
          <div className="space-y-1">
            <p className="text-stone-200 line-clamp-2 text-xs sm:text-sm font-serif">
              "{blueprint.factText}"
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400 font-mono pt-0.5">
              <span>🎤 Script: <strong className="text-emerald-300 font-normal italic">"{audioScript}"</strong></span>
            </div>
          </div>
          <button
            onClick={() => setIsContentExpanded(true)}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-amber-300 font-mono text-xs flex items-center gap-1.5 transition-all"
          >
            <span>View Full Studio Breakdown</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      )}

      {/* EXPANDED CONTENT DETAILS (ALL MODULAR SECTIONS) */}
      {isContentExpanded && (
        <div className="p-5 sm:p-6 space-y-6 animate-in fade-in duration-200">

          {/* 100% Verified Scottish Fact & Local Banter */}
          <div className="space-y-4">
            <div className="bg-stone-950/80 p-4 sm:p-5 rounded-xl border border-amber-500/30 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  100% Verified Scottish Fact
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  {blueprint.verification?.verdict || 'VERIFIED'}
                </span>
              </div>

              <p className="text-stone-100 text-sm sm:text-base leading-relaxed font-sans font-medium">
                {blueprint.factText}
              </p>

              {/* Local Banter / Comical Element */}
              {blueprint.comicalElement && (
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-lg p-3 text-xs flex items-start gap-2.5">
                  <Smile className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 font-mono uppercase text-[10px] tracking-wider block">
                      Local Comical Banter & Nostalgic Memory:
                    </span>
                    <p className="text-stone-200 text-xs mt-0.5 leading-relaxed">
                      {blueprint.comicalElement}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Historical Verification Audit Accordion */}
            <div className="bg-stone-950/70 rounded-xl border border-teal-500/30 shadow-sm overflow-hidden transition-all">
              <div className="flex items-center justify-between p-3.5 hover:bg-stone-900/40 transition-colors">
                <button
                  onClick={() => setIsVerificationOpen(!isVerificationOpen)}
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <div className="p-1 rounded-md bg-teal-500/10 text-teal-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300 font-mono flex items-center gap-2">
                    <span>Historical Archive Verification</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300">
                      {isVerificationOpen ? 'Hide' : 'View Source Archives'}
                    </span>
                  </h3>
                  {isVerificationOpen ? (
                    <ChevronUp className="w-4 h-4 text-teal-400 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-teal-400 ml-1" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(verificationText, 'verification-box')}
                  className="text-xs font-semibold px-2 py-1 rounded bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 border border-teal-500/30 transition-all"
                  title="Copy verification source citations"
                >
                  {copiedSection === 'verification-box' ? 'Copied!' : 'Copy Citations'}
                </button>
              </div>

              {isVerificationOpen && (
                <div className="p-4 pt-0 space-y-2.5 border-t border-stone-800/80 text-xs text-stone-300">
                  <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
                      Verified Historical Sources:
                    </span>
                    <p className="text-stone-200 text-xs leading-relaxed font-mono">
                      {blueprint.verification?.verifiedSource}
                    </p>
                  </div>
                  <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block font-mono">
                      Archive Context:
                    </span>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      {blueprint.verification?.historicalDetails}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hollywood Character Casting & Comical Acting */}
          <section className="bg-stone-950/90 rounded-xl border border-stone-800 p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-amber-500/15 text-amber-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono">
                  Hollywood Range Character & Scene Setup
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
                {blueprint.characterStyle || 'Cinematic 35mm Hollywood Comical Live Action'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-900/90 p-3.5 rounded-lg border border-stone-800 space-y-1.5">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Primary Historical / Comical Character:
                </span>
                <p className="text-stone-100 font-semibold text-sm">
                  {blueprint.characterName || blueprint.character}
                </p>
                <p className="text-stone-300 text-xs leading-relaxed">
                  {blueprint.character}
                </p>
              </div>

              <div className="bg-stone-900/90 p-3.5 rounded-lg border border-stone-800 space-y-1.5">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Objects & Scene Setting:
                </span>
                <p className="text-stone-300 text-xs leading-relaxed">
                  {blueprint.objectsScenes}
                </p>
              </div>
            </div>

            {/* Supporting Characters Cast */}
            {blueprint.supportingCharacters && blueprint.supportingCharacters.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-300 tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  Supporting Characters & Sidekicks ({blueprint.supportingCharacters.length} Cast Members):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {blueprint.supportingCharacters.map((char, idx) => (
                    <div key={idx} className="bg-stone-900/70 border border-cyan-500/20 rounded-lg p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-200 text-xs">{char.name}</span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                          {char.role}
                        </span>
                      </div>
                      <p className="text-stone-300 text-[11px] leading-relaxed">
                        <strong className="text-stone-400 font-normal">Look:</strong> {char.appearance}
                      </p>
                      <p className="text-stone-300 text-[11px] leading-relaxed">
                        <strong className="text-cyan-400 font-normal">Action:</strong> {char.comedicInteraction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 🎥 Master AI Video Generator Prompt Studio */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono">
                  🎥 Master External AI Video Generator Prompt (9:16 Vertical)
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => copyToClipboard(formatVideoPromptOnlyText(blueprint), 'video')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition-all flex items-center gap-1.5 shadow-sm"
                  title="Copy Prompt for Runway Gen-3 / Kling / Sora / Luma / Hailuo"
                >
                  {copiedSection === 'video' ? 'Copied Video Prompt!' : 'Copy Master Video Prompt'}
                </button>
              </div>
            </div>

            <div className="bg-stone-950 p-4 sm:p-5 rounded-xl border border-stone-800 space-y-3">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>9:16 Video Generation Prompt (Hollywood 35mm Live Action / Cinematic Comical):</span>
                <span className="text-amber-400 font-semibold font-mono text-[10px]">Runway Gen-3 • Kling • Sora • Luma • Hailuo</span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-stone-200 select-all leading-relaxed bg-stone-900/90 p-3.5 rounded-lg border border-stone-800">
                {blueprint.videoPrompt}
              </p>
            </div>
          </section>

          {/* 🎙 Audio Narration Engine - CONTENT-ADAPTIVE VOICE SELECTION & 10s DURATION ENFORCEMENT */}
          <section className="bg-stone-950/80 rounded-xl border border-emerald-500/30 overflow-hidden transition-all shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 sm:p-4 hover:bg-stone-900/40 transition-colors">
              <button
                onClick={() => setIsAudioOpen(!isAudioOpen)}
                className="flex items-center gap-2 flex-1 text-left"
              >
                <div className="p-1.5 rounded-md bg-emerald-500/15 text-emerald-400">
                  <Mic className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xs sm:text-sm font-bold text-stone-100 tracking-wide uppercase font-mono">
                    🎙 Audio Narration Studio
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
                    {activeArchetype.name}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${voiceDir.timing.statusColor}`}>
                    ⏱️ {voiceDir.timing.statusLabel}
                  </span>
                </div>
                {isAudioOpen ? (
                  <ChevronUp className="w-4 h-4 text-emerald-400 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-emerald-400 ml-1" />
                )}
              </button>

              <button
                onClick={() => copyToClipboard(formatAudioOnlyText(blueprint, selectedVoiceId), 'audio')}
                className="text-xs font-semibold px-2.5 py-1.5 rounded bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 transition-colors flex items-center gap-1"
                title="Copy Audio & Voiceover prompt"
              >
                {copiedSection === 'audio' ? 'Copied!' : 'Copy Audio Prompt'}
              </button>
            </div>

            {isAudioOpen && (
              <div className="p-4 pt-0 border-t border-stone-800/80 space-y-4 text-xs text-stone-300">
                
                {/* 10-Second Timing & Verbatim Guarantee Banner */}
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-3 text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-[11px] font-mono text-emerald-300 font-semibold">
                      10-Second Video Timing: {voiceDir.timing.wordCount} words (~{voiceDir.timing.estimatedDurationSec}s duration), leaving a 1.5s visual outro buffer before cutoff.
                    </span>
                  </div>
                  <div className="text-[10px] text-amber-300 font-mono pl-4">
                    ⚠️ STRICT MANDATE ENFORCED: Voice generator must read every single word verbatim from start to finish without skipping or dropping words.
                  </div>
                </div>

                {/* Interactive Voice Archetype Switcher */}
                <div className="pt-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                      <Radio className="w-3 h-3 text-emerald-400" />
                      Select Voice Profile (Tailored According to Content):
                    </span>
                    {selectedVoiceId === 'auto' && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                        Auto-Matched: {activeArchetype.shortLabel}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {(Object.keys(VOICE_ARCHETYPES) as VoiceArchetypeId[]).map((vKey) => {
                      const arch = VOICE_ARCHETYPES[vKey];
                      const isSelected = selectedVoiceId === vKey;
                      return (
                        <button
                          key={vKey}
                          onClick={() => {
                            stopSpeech();
                            setIsPlayingAudio(false);
                            setSelectedVoiceId(vKey);
                          }}
                          className={`p-2 rounded-lg border text-left text-[11px] transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-emerald-950/70 border-emerald-500 text-stone-100 ring-1 ring-emerald-500/50'
                              : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between">
                            <span className={isSelected ? 'text-emerald-300' : 'text-stone-200'}>
                              {arch.shortLabel}
                            </span>
                            {isSelected && <Check className="w-3 h-3 text-emerald-400 shrink-0" />}
                          </div>
                          <span className="text-[9px] text-stone-400 line-clamp-1 mt-0.5">
                            {arch.tagline}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Voice Info Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-stone-900/90 p-3 rounded-lg border border-stone-800 space-y-1">
                    <span className="text-stone-400 font-mono uppercase text-[10px] block font-bold">
                      Voice Profile & Acting Nuance:
                    </span>
                    <p className="text-emerald-300 font-medium text-xs leading-relaxed">
                      {voiceDir.voiceProfile}
                    </p>
                  </div>

                  <div className="bg-stone-900/90 p-3 rounded-lg border border-stone-800 space-y-1">
                    <span className="text-amber-400 font-mono uppercase text-[10px] block font-bold">
                      Scottish Local Phonetics:
                    </span>
                    <p className="text-stone-200 font-mono text-xs leading-relaxed">
                      {blueprint.audioPhonetics || 'Native Scottish & British place names'}
                    </p>
                  </div>
                </div>

                {/* Spoken Script Box */}
                <div className="p-3.5 rounded-xl bg-stone-900/90 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-mono uppercase text-[10px] block font-bold">
                      Exact Spoken Script (Mandate: Read Every Word Verbatim):
                    </span>
                    <button
                      onClick={() => copyToClipboard(audioScript, 'spoken-script')}
                      className="text-[10px] font-mono text-stone-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      {copiedSection === 'spoken-script' ? 'Copied!' : 'Copy 10s Script'}
                    </button>
                  </div>
                  <p className="font-serif text-sm sm:text-base text-stone-100 italic bg-stone-950/60 p-3 rounded border border-stone-800 leading-relaxed">
                    "{audioScript}"
                  </p>
                  <div className="text-[11px] text-stone-400 font-mono">
                    <strong className="text-stone-300">Atmospheric Soundscape:</strong> {blueprint.backgroundAudio}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 📝 Mandatory Burned-In Text Overlay Subtitle Safe Zone Preview */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="p-1.5 rounded-md bg-teal-500/10 text-teal-400">
                  <Subtitles className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono flex items-center gap-2">
                  <span>📝 Mandatory Burned-In Text Overlay (1080x1920)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 font-mono font-semibold">
                    Zero Edge Clipping
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono font-semibold">
                    No Black Background Box
                  </span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(formatSubtitlesOnlyText(blueprint), 'subs')}
                  className="text-xs font-semibold px-2.5 py-1 rounded bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25 transition-all flex items-center gap-1.5"
                  title="Copy 3-line overlay specs"
                >
                  {copiedSection === 'subs' ? 'Copied Specs!' : 'Copy Overlay Specs'}
                </button>
              </div>
            </div>

            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3.5 text-xs">
              {/* Visual 9:16 Center Safe Zone Preview - Transparent Floating Text (No Black Box) */}
              <div className="relative p-6 rounded-lg bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/60 border border-stone-800 text-center space-y-3 shadow-inner overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <div className="relative z-10 flex items-center justify-between border-b border-stone-800/80 pb-1.5 text-[10px] font-mono text-stone-400">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse"></span>
                    Floating Text in Safe Band (Y: 450-850px • No Black Box)
                  </span>
                  <span className="text-cyan-400 font-mono text-[10px]">
                    1080 x 1920 Full Bleed True Alpha
                  </span>
                </div>

                <div className="relative z-10 space-y-2 py-2">
                  <div className="text-amber-400 tracking-wider font-extrabold text-sm sm:text-base uppercase font-sans drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                    {line1Hook}
                  </div>
                  <div className="text-white font-medium text-xs sm:text-sm leading-relaxed drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)] max-w-xl mx-auto">
                    "{line2Fact}"
                  </div>
                  <div className="text-cyan-300 font-mono text-[11px] font-bold tracking-wide drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                    {line3Location}
                  </div>
                </div>
              </div>

              {blueprint.overlayExtraContext && (
                <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 flex items-start gap-2 text-xs">
                  <span className="text-amber-400 font-bold uppercase text-[10px] font-mono tracking-wider shrink-0 mt-0.5">
                    Extra Context Overlay:
                  </span>
                  <span className="text-stone-300 leading-relaxed">
                    {blueprint.overlayExtraContext}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* 🎬 10-Minute Video Segment Prompt (Collapsible) */}
          {blueprint.tenMinuteSegmentPrompt && (
            <section className="bg-stone-950/70 rounded-xl border border-purple-500/30 overflow-hidden transition-all shadow-md">
              <div className="flex items-center justify-between p-3.5 hover:bg-stone-900/40 transition-colors">
                <button
                  onClick={() => setIsTenMinOpen(!isTenMinOpen)}
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <div className="p-1 rounded-md bg-purple-500/15 text-purple-400">
                    <Film className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-purple-300 tracking-wide uppercase font-mono flex items-center gap-2">
                    <span>🎬 10-Minute Video Segment Scene #{blueprint.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300">
                      {isTenMinOpen ? 'Hide' : 'Show 10-Min Video Segment'}
                    </span>
                  </h3>
                  {isTenMinOpen ? (
                    <ChevronUp className="w-4 h-4 text-purple-400 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-purple-400 ml-1" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(blueprint.tenMinuteSegmentPrompt || '', '10min-seg')}
                  className="text-xs font-semibold px-2.5 py-1 rounded bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/30 transition-all"
                >
                  {copiedSection === '10min-seg' ? 'Copied!' : 'Copy Segment'}
                </button>
              </div>

              {isTenMinOpen && (
                <div className="p-4 pt-0 border-t border-stone-800/80 text-xs text-stone-300 space-y-2">
                  <p className="bg-stone-900/90 p-3 rounded-lg border border-stone-800 font-mono text-xs text-stone-200 leading-relaxed">
                    {blueprint.tenMinuteSegmentPrompt}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* 🏷 YouTube SEO & Tags (Collapsible) */}
          <section className="bg-stone-950/60 rounded-xl border border-stone-800 overflow-hidden transition-all">
            <div className="flex items-center justify-between p-3.5 hover:bg-stone-900/40 transition-colors">
              <button
                onClick={() => setIsSeoOpen(!isSeoOpen)}
                className="flex items-center gap-2 flex-1 text-left"
              >
                <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-400">
                  <Hash className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono flex items-center gap-2">
                  <span>🏷 YouTube & Social SEO, Title & Tags</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 font-normal">
                    {isSeoOpen ? 'Hide' : 'Show Details'}
                  </span>
                </h3>
                {isSeoOpen ? (
                  <ChevronUp className="w-4 h-4 text-stone-400 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400 ml-1" />
                )}
              </button>
              <button
                onClick={() => copyToClipboard(formatYouTubeOnlyText(blueprint), 'seo')}
                className="text-xs font-medium flex items-center gap-1 text-stone-400 hover:text-purple-400 transition-colors px-2 py-1 rounded hover:bg-stone-900"
              >
                {copiedSection === 'seo' ? 'Copied SEO!' : 'Copy SEO Details'}
              </button>
            </div>

            {isSeoOpen && (
              <div className="p-4 pt-0 border-t border-stone-800/80 space-y-3.5 text-xs text-stone-300">
                <div className="pt-3"></div>
                {/* Title */}
                <div className="p-3 rounded-lg bg-stone-900/50 border border-stone-800/80 space-y-1">
                  <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider block">
                    YouTube Video Title:
                  </span>
                  <p className="font-semibold text-stone-100 text-sm font-serif">{blueprint.seo?.title || blueprint.title}</p>
                </div>

                {/* Description */}
                <div className="p-3 rounded-lg bg-stone-900/50 border border-stone-800/80 space-y-1.5">
                  <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider block">
                    YouTube Description:
                  </span>
                  <p className="text-stone-300 leading-relaxed whitespace-pre-line text-xs font-sans bg-stone-950 p-2.5 rounded border border-stone-800/60">
                    {blueprint.seo?.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                      Tags (Comma-Separated for YouTube Studio):
                    </span>
                    <button
                      onClick={() => copyToClipboard(blueprint.seo?.tags?.join(', ') || '', 'tags-csv')}
                      className="text-[11px] font-medium text-amber-400 hover:text-amber-300"
                    >
                      {copiedSection === 'tags-csv' ? 'Copied CSV!' : 'Copy Tags (CSV)'}
                    </button>
                  </div>
                  <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-amber-300 select-all border border-stone-800/60">
                    {blueprint.seo?.tags?.join(', ')}
                  </div>
                </div>
              </div>
            )}
          </section>

        </div>
      )}

      {/* Card Navigation Footer */}
      {(onNavigatePrev || onNavigateNext || onOpenNavigator) && (
        <div className="bg-stone-950 px-4 sm:px-6 py-3.5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={onNavigatePrev}
            disabled={!prevId}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border font-semibold transition-all ${
              prevId
                ? 'bg-stone-900 hover:bg-stone-850 text-stone-200 border-stone-700 hover:text-amber-300 hover:border-amber-500/40 shadow-sm'
                : 'bg-stone-950 text-stone-600 border-stone-850 cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{prevId ? `← Previous (#${prevId})` : 'First Prompt'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-mono text-xs">
              Prompt <strong className="text-amber-300 font-bold">#{blueprint.id}</strong> of {totalCount}
            </span>
            {onOpenNavigator && (
              <button
                onClick={onOpenNavigator}
                className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold transition-all text-xs"
              >
                Browse All 50...
              </button>
            )}
          </div>

          <button
            onClick={onNavigateNext}
            disabled={!nextId}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border font-semibold transition-all ${
              nextId
                ? 'bg-stone-900 hover:bg-stone-850 text-stone-200 border-stone-700 hover:text-amber-300 hover:border-amber-500/40 shadow-sm'
                : 'bg-stone-950 text-stone-600 border-stone-850 cursor-not-allowed opacity-50'
            }`}
          >
            <span>{nextId ? `Next (#${nextId}) →` : 'Last Prompt'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </article>
  );
};

export const BlueprintCard = React.memo(BlueprintCardComponent);
