import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Sparkles,
  Share2,
  Bookmark,
  Play,
  Pause,
  Maximize2
} from 'lucide-react';
import { SherItem } from '../types';
import { AmbientAudioPlayer } from './AmbientAudioPlayer';
import { reciteVerse } from '../utils/speechReciter';

interface SanctuaryReaderModalProps {
  shers: SherItem[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenCardModal: (sher: SherItem) => void;
  onToggleSave: (sherId: string) => void;
  savedSherIds: string[];
}

export const SanctuaryReaderModal: React.FC<SanctuaryReaderModalProps> = ({
  shers,
  initialIndex = 0,
  isOpen,
  onClose,
  onOpenCardModal,
  onToggleSave,
  savedSherIds,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [activeScript, setActiveScript] = useState<'urdu' | 'hindi' | 'roman'>('urdu');
  const [autoPace, setAutoPace] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [isReciting, setIsReciting] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, shers.length]);

  // Auto-pace timer (advance every 16 seconds for meditative immersion)
  useEffect(() => {
    if (!autoPace || !isOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shers.length);
    }, 16000);
    return () => clearInterval(interval);
  }, [autoPace, isOpen, shers.length]);

  if (!isOpen || shers.length === 0) return null;

  const currentSher = shers[currentIndex];
  const isSaved = savedSherIds.includes(currentSher.id);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + shers.length) % shers.length);
  };

  const handleRecite = () => {
    if (isReciting) return;
    setIsReciting(true);
    reciteVerse(
      currentSher.roman + '. ' + currentSher.englishTranslation,
      () => setIsReciting(true),
      () => setIsReciting(false)
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0807] text-[#f5efe6] overflow-hidden select-none animate-in fade-in duration-300">
      {/* Top Sanctuary Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-stone-800/80 bg-stone-950/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-sm font-cinzel tracking-widest text-amber-400">
            SANCTUARY OF THE MUSE
          </span>
          <span className="text-stone-600">·</span>
          <span className="text-xs text-stone-400 font-sans">
            Verse {currentIndex + 1} of {shers.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Ambient Soundscape Controller */}
          <AmbientAudioPlayer />

          {/* Auto-Pacing Mode */}
          <button
            onClick={() => setAutoPace(!autoPace)}
            title="Auto-advance verses every 16s for meditative reading"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors border ${
              autoPace
                ? 'bg-amber-950 border-amber-700 text-amber-200'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            {autoPace ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Pacing Mode</span>
          </button>

          <button
            onClick={onClose}
            aria-label="Exit Sanctuary"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Contemplation Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-4xl mx-auto w-full relative">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous couplet"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 text-stone-500 hover:text-amber-300 hover:bg-stone-900/60 rounded-full transition-all"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next couplet"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 text-stone-500 hover:text-amber-300 hover:bg-stone-900/60 rounded-full transition-all"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Center Illuminated Archival Plaque */}
        <div className="w-full text-center space-y-8 max-w-2xl px-4 animate-in fade-in zoom-in-95 duration-500 key={currentIndex}">
          {/* Gallery Kicker */}
          <div className="text-xs uppercase tracking-widest font-cinzel text-amber-500/80">
            {currentSher.wingTitle}
          </div>

          {/* Script Switcher */}
          <div className="inline-flex items-center gap-1 p-1 bg-stone-900/80 border border-stone-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveScript('urdu')}
              className={`px-3 py-1 rounded transition-colors ${
                activeScript === 'urdu'
                  ? 'bg-amber-950 text-amber-200 border border-amber-800/80 font-urdu'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setActiveScript('hindi')}
              className={`px-3 py-1 rounded transition-colors ${
                activeScript === 'hindi'
                  ? 'bg-amber-950 text-amber-200 border border-amber-800/80'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setActiveScript('roman')}
              className={`px-3 py-1 rounded transition-colors ${
                activeScript === 'roman'
                  ? 'bg-amber-950 text-amber-200 border border-amber-800/80'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Roman
            </button>
          </div>

          {/* Primary Verse Rendering */}
          <div className="min-h-[160px] flex items-center justify-center">
            {activeScript === 'urdu' && (
              <p className="font-urdu text-3xl sm:text-4xl lg:text-5xl text-amber-100 text-center leading-[2.2] tracking-wide whitespace-pre-line drop-shadow-md">
                {currentSher.urdu}
              </p>
            )}

            {activeScript === 'hindi' && (
              <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-amber-50 leading-relaxed whitespace-pre-line">
                {currentSher.hindi}
              </p>
            )}

            {activeScript === 'roman' && (
              <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-amber-100/90 leading-relaxed whitespace-pre-line">
                "{currentSher.roman}"
              </p>
            )}
          </div>

          {/* Translation */}
          <p className="font-serif italic text-lg sm:text-xl text-stone-300 max-w-xl mx-auto leading-relaxed">
            "{currentSher.englishTranslation}"
          </p>

          {/* Poet Attribute */}
          <div className="pt-2">
            <h3 className="text-xl font-cinzel text-amber-300 font-medium">
              — {currentSher.poet}
            </h3>
            <p className="text-xs text-stone-500 font-sans mt-1">
              {currentSher.poetEra} · {currentSher.yearOrSource}
            </p>
          </div>

          {/* Meaning / Word Nuances Drawer */}
          {showVocab && (
            <div className="p-4 rounded-xl bg-stone-900/90 border border-amber-900/40 text-left text-xs space-y-2 animate-in fade-in">
              <div className="text-amber-400 font-cinzel uppercase tracking-wider text-[11px]">
                Curator Insight & Philosophical Roots
              </div>
              <p className="text-stone-300 leading-relaxed">
                {currentSher.contextMeaning}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {currentSher.vocabBreakdown?.map((v) => (
                  <span
                    key={v.word}
                    className="text-stone-300 bg-stone-800/80 px-2 py-1 rounded border border-stone-700"
                  >
                    <strong className="text-amber-300">{v.word}:</strong> {v.meaning}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sanctuary Footer Toolbar */}
      <footer className="px-6 py-4 border-t border-stone-800/80 bg-stone-950/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowVocab(!showVocab)}
            className="text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{showVocab ? 'Hide Curator Insight' : 'Curator Insight'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRecite}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-200 border border-stone-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isReciting ? 'text-amber-400 animate-pulse' : ''}`} />
            <span>Recite</span>
          </button>

          <button
            onClick={() => onToggleSave(currentSher.id)}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-200 border border-stone-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-amber-400 fill-amber-400/30' : ''}`} />
            <span>{isSaved ? 'Saved in Diwan' : 'Save to Diwan'}</span>
          </button>

          <button
            onClick={() => onOpenCardModal(currentSher)}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-amber-950/50"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Export Story</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
