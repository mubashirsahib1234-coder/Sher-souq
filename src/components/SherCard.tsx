import React, { useState } from 'react';
import {
  Volume2,
  Bookmark,
  Share2,
  Copy,
  Check,
  Info,
  Sparkles,
  ArrowUpRight,
  BookMarked
} from 'lucide-react';
import { SherItem, ScriptMode } from '../types';
import { reciteVerse } from '../utils/speechReciter';

interface SherCardProps {
  sher: SherItem;
  isSaved: boolean;
  onToggleSave: (sherId: string) => void;
  onOpenCardModal: (sher: SherItem) => void;
  onSelectProduct?: (productId: string) => void;
  scriptPreference: ScriptMode;
}

export const SherCard: React.FC<SherCardProps> = ({
  sher,
  isSaved,
  onToggleSave,
  onOpenCardModal,
  onSelectProduct,
  scriptPreference,
}) => {
  const [activeScript, setActiveScript] = useState<'urdu' | 'hindi' | 'roman'>(
    scriptPreference === 'hindi' ? 'hindi' : scriptPreference === 'roman' ? 'roman' : 'urdu'
  );
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isReciting, setIsReciting] = useState(false);

  const handleRecite = () => {
    if (isReciting) return;
    setIsReciting(true);
    reciteVerse(
      sher.roman + '. ' + sher.englishTranslation,
      () => setIsReciting(true),
      () => setIsReciting(false)
    );
  };

  const handleCopyCaption = () => {
    const captionText = `"${sher.urdu}"\n\n"${sher.roman}"\n\n${sher.englishTranslation}\n\n— ${sher.poet} (${sher.yearOrSource})\n\nVia @shayari.museum · Dastaan Archive\n#shayari #urdupoetry #ghalib #jaunelia #hindipoetry #poetrylove #rekhta #dastaan`;
    navigator.clipboard.writeText(captionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <article className="group relative rounded-2xl bg-[#141210] border border-stone-800/90 hover:border-amber-900/60 p-6 sm:p-7 transition-all duration-300 shadow-md flex flex-col justify-between">
      {/* Card Header: Exhibition Wing & Era */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-stone-800/60 text-xs font-sans text-stone-400 mb-5">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500 font-cinzel uppercase tracking-wider text-[11px]">
              {sher.wingTitle}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-stone-500">
            <span>{sher.yearOrSource}</span>
            <span aria-hidden="true">·</span>
            <span>{sher.readTime}</span>
          </div>
        </div>

        {/* Script Selector Controls */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1 p-0.5 bg-stone-900 border border-stone-800 rounded-md text-[11px]">
            <button
              onClick={() => setActiveScript('urdu')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeScript === 'urdu'
                  ? 'bg-amber-950/80 text-amber-200 border border-amber-800/50 font-urdu'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setActiveScript('hindi')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeScript === 'hindi'
                  ? 'bg-amber-950/80 text-amber-200 border border-amber-800/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setActiveScript('roman')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeScript === 'roman'
                  ? 'bg-amber-950/80 text-amber-200 border border-amber-800/50'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Roman
            </button>
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <button
              onClick={handleRecite}
              title="Voice Recitation"
              aria-label="Recite sher out loud"
              className="p-1.5 hover:text-amber-300 hover:bg-stone-900 rounded-md transition-colors"
            >
              <Volume2 className={`w-4 h-4 ${isReciting ? 'text-amber-400 animate-pulse' : ''}`} />
            </button>
            <button
              onClick={() => onToggleSave(sher.id)}
              title={isSaved ? 'Remove from My Diwan' : 'Save to My Diwan'}
              aria-label="Save sher"
              className="p-1.5 hover:text-amber-300 hover:bg-stone-900 rounded-md transition-colors"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isSaved ? 'text-amber-400 fill-amber-400/30' : 'text-stone-400'
                }`}
              />
            </button>
          </div>
        </div>

        {/* The Poetic Verse Container */}
        <div className="py-3 min-h-[110px] flex flex-col justify-center">
          {activeScript === 'urdu' && (
            <p className="font-urdu text-2xl sm:text-3xl text-amber-100 text-right leading-[2.1] whitespace-pre-line tracking-wide">
              {sher.urdu}
            </p>
          )}

          {activeScript === 'hindi' && (
            <p className="font-serif text-lg sm:text-xl text-stone-100 leading-relaxed whitespace-pre-line">
              {sher.hindi}
            </p>
          )}

          {activeScript === 'roman' && (
            <p className="font-serif italic text-base sm:text-lg text-amber-100/90 leading-relaxed whitespace-pre-line">
              "{sher.roman}"
            </p>
          )}
        </div>

        {/* English Translation & Poet Signature */}
        <div className="pt-3 pb-2 border-t border-stone-800/60 mt-2 space-y-2">
          <p className="text-stone-300 font-serif text-sm italic leading-relaxed">
            "{sher.englishTranslation}"
          </p>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="font-cinzel text-amber-200/90 font-medium">
              — {sher.poet}
            </div>
            <div className="text-[11px] text-stone-500 font-sans">
              {sher.poetEra.split('·')[0]}
            </div>
          </div>
        </div>

        {/* Lafz-o-Maani: Interactive Vocabulary Explanations */}
        {sher.vocabBreakdown && sher.vocabBreakdown.length > 0 && (
          <div className="mt-3 pt-3 border-t border-stone-800/40">
            <div className="text-[11px] uppercase tracking-wider font-cinzel text-stone-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Lafz-o-Maani (Word Nuances)</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {sher.vocabBreakdown.map((item) => (
                <button
                  key={item.word}
                  onClick={() =>
                    setSelectedWord(selectedWord === item.word ? null : item.word)
                  }
                  className={`px-2 py-0.5 rounded text-xs transition-colors ${
                    selectedWord === item.word
                      ? 'bg-amber-900/50 text-amber-200 border border-amber-700/60'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>

            {selectedWord && (
              <div className="mt-2.5 p-2.5 rounded-lg bg-stone-900/90 border border-amber-900/30 text-xs text-stone-300 animate-in fade-in duration-200">
                {(() => {
                  const found = sher.vocabBreakdown.find((v) => v.word === selectedWord);
                  if (!found) return null;
                  return (
                    <div>
                      <div className="font-semibold text-amber-300">{found.word}</div>
                      <div className="mt-0.5 text-stone-300">{found.meaning}</div>
                      {found.culturalNote && (
                        <div className="mt-1 text-[11px] text-stone-400 italic">
                          "{found.culturalNote}"
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Curatorial Deep Context Accordion */}
        {showAnalysis && (
          <div className="mt-4 p-3 rounded-lg bg-stone-900/80 border border-stone-800 text-xs text-stone-300 space-y-2 animate-in fade-in">
            <div>
              <span className="text-amber-400 font-medium">Curator’s Note: </span>
              {sher.curatorNote}
            </div>
            <div>
              <span className="text-amber-400 font-medium">Subtext & Philosophy: </span>
              {sher.contextMeaning}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Action Bar */}
      <div className="mt-5 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="text-stone-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showAnalysis ? 'Hide Analysis' : 'Curator Analysis'}</span>
        </button>

        <div className="flex items-center gap-2">
          {sher.matchingBoutiqueItemId && onSelectProduct && (
            <button
              onClick={() => onSelectProduct(sher.matchingBoutiqueItemId!)}
              title="View matching artisan boutique item"
              className="text-amber-400/80 hover:text-amber-300 flex items-center gap-1 text-[11px] hover:underline"
            >
              <BookMarked className="w-3 h-3" />
              <span>Artifact</span>
            </button>
          )}

          <button
            onClick={handleCopyCaption}
            title="Copy formatted verse for Instagram caption"
            className="p-1.5 text-stone-400 hover:text-amber-300 hover:bg-stone-900 rounded-md transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Caption</span>
              </>
            )}
          </button>

          <button
            onClick={() => onOpenCardModal(sher)}
            className="px-2.5 py-1 bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 border border-amber-800/40 rounded-md transition-colors flex items-center gap-1 text-xs"
          >
            <Share2 className="w-3 h-3 text-amber-400" />
            <span>Story Card</span>
          </button>
        </div>
      </div>
    </article>
  );
};
