import React, { useState } from 'react';
import { Volume2, Share2, Sparkles, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { SherItem } from '../types';
import { reciteVerse } from '../utils/speechReciter';

interface HeroExhibitionProps {
  featuredSher: SherItem;
  onOpenSanctuary: () => void;
  onOpenCardModal: (sher: SherItem) => void;
  onSelectCategory: (cat: string) => void;
  onViewBoutique: () => void;
}

export const HeroExhibition: React.FC<HeroExhibitionProps> = ({
  featuredSher,
  onOpenSanctuary,
  onOpenCardModal,
  onSelectCategory,
  onViewBoutique,
}) => {
  const [isReciting, setIsReciting] = useState(false);
  const [activeScript, setActiveScript] = useState<'urdu' | 'hindi' | 'roman'>('urdu');

  const handleRecite = () => {
    if (isReciting) return;
    setIsReciting(true);
    reciteVerse(
      featuredSher.roman + '. ' + featuredSher.englishTranslation,
      () => setIsReciting(true),
      () => setIsReciting(false)
    );
  };

  return (
    <section className="relative border-b border-stone-800 bg-[#0c0a09] overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <img
          src="/src/assets/images/museum_hero_sanctuary_1790938634419.jpg"
          alt="Atmospheric poetry sanctuary museum gallery"
          className="w-full h-full object-cover filter brightness-75 contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
        {/* Curatorial Header Decker */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4 mb-10">
          <div className="flex items-center gap-2 text-xs font-cinzel tracking-widest text-amber-500/90">
            <span>DASTAAN</span>
            <span aria-hidden="true">·</span>
            <span>DIGITAL SANCTUARY OF SHAYARI</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-400">CURATION NO. 14</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-400 font-sans">
            <span>Born from 100K+ Instagram Readers</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400/90 font-medium">Free Public Archive</span>
          </div>
        </div>

        {/* Hero Central Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Brand & Curatorial Thesis */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-stone-100 text-balance leading-[1.15]">
              Where timeless verses breathe in quiet gold.
            </h1>

            <p className="text-stone-300 font-serif text-lg leading-relaxed max-w-xl">
              Step into an online museum crafted for souls who linger over couplets.
              Rediscover classical and modern Urdu-Hindi shayari with script transliterations,
              deep linguistic roots, ambient mehfil soundscapes, and artisan literary artifacts.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenSanctuary}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-sans font-medium text-xs rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-amber-900/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enter Sanctuary Mode</span>
              </button>

              <button
                onClick={onViewBoutique}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-sans text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Museum Boutique</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Sher of the Day (Framed Manuscript Vitrine) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#1c1917] to-[#141210] border border-amber-900/40 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800/80 mb-6">
                <div className="text-xs uppercase tracking-widest font-cinzel text-amber-400/90 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Masterpiece of the Day</span>
                </div>

                {/* Script Switcher */}
                <div className="flex items-center gap-1 p-0.5 bg-stone-900/90 border border-stone-800 rounded-lg text-[11px]">
                  <button
                    onClick={() => setActiveScript('urdu')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeScript === 'urdu' ? 'bg-amber-950 text-amber-200 border border-amber-800/60 font-urdu' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    اردو
                  </button>
                  <button
                    onClick={() => setActiveScript('hindi')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeScript === 'hindi' ? 'bg-amber-950 text-amber-200 border border-amber-800/60' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    हिंदी
                  </button>
                  <button
                    onClick={() => setActiveScript('roman')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeScript === 'roman' ? 'bg-amber-950 text-amber-200 border border-amber-800/60' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Roman
                  </button>
                </div>
              </div>

              {/* The Couplet Display */}
              <div className="min-h-[140px] flex flex-col justify-center my-2">
                {activeScript === 'urdu' && (
                  <p className="font-urdu text-2xl sm:text-3xl text-amber-100 text-right leading-[2.2] tracking-wide whitespace-pre-line drop-shadow-sm">
                    {featuredSher.urdu}
                  </p>
                )}
                {activeScript === 'hindi' && (
                  <p className="font-serif text-xl sm:text-2xl text-amber-100/95 leading-relaxed whitespace-pre-line">
                    {featuredSher.hindi}
                  </p>
                )}
                {activeScript === 'roman' && (
                  <p className="font-serif italic text-lg sm:text-xl text-amber-100/95 leading-relaxed whitespace-pre-line">
                    "{featuredSher.roman}"
                  </p>
                )}
              </div>

              {/* Translation & Author */}
              <div className="pt-4 border-t border-stone-800/70 mt-4 space-y-3">
                <p className="text-stone-400 font-serif text-sm italic leading-relaxed">
                  — {featuredSher.englishTranslation}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="font-cinzel text-stone-200 font-medium text-sm">
                      {featuredSher.poet}
                    </div>
                    <div className="text-[11px] text-stone-500 font-sans">
                      {featuredSher.poetEra}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRecite}
                      aria-label="Recite this couplet"
                      className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-900 border border-stone-800 rounded-lg transition-colors"
                      title="Audio Recitation"
                    >
                      <Volume2 className={`w-4 h-4 ${isReciting ? 'text-amber-400 animate-pulse' : ''}`} />
                    </button>
                    <button
                      onClick={() => onOpenCardModal(featuredSher)}
                      className="px-3 py-1.5 text-xs font-sans text-stone-300 hover:text-amber-200 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors flex items-center gap-1.5"
                      title="Generate Instagram Story / Post Card"
                    >
                      <Share2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Story Card</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Utility Ribbon (Pattern A from Museum Skill) */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-stone-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-stone-200 font-medium">Exhibition Wings:</span>
            <button
              onClick={() => onSelectCategory('all')}
              className="hover:text-amber-300 transition-colors"
            >
              All Galleries
            </button>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <button
              onClick={() => onSelectCategory('ishq')}
              className="hover:text-amber-300 transition-colors"
            >
              Pavilion of Ishq (Love)
            </button>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <button
              onClick={() => onSelectCategory('dard')}
              className="hover:text-amber-300 transition-colors"
            >
              Courtyard of Dard (Pain)
            </button>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <button
              onClick={() => onSelectCategory('tanhai')}
              className="hover:text-amber-300 transition-colors"
            >
              Hall of Tanhai (Solitude)
            </button>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <button
              onClick={() => onSelectCategory('ruhaniyat')}
              className="hover:text-amber-300 transition-colors"
            >
              Sufi Sanctuary (Spiritual)
            </button>
          </div>

          <div className="flex items-center gap-2 text-stone-400 text-xs">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>10 Curated Archival Couplets On Display</span>
          </div>
        </div>
      </div>
    </section>
  );
};
