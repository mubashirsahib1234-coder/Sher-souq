import React from 'react';
import { Instagram, BookOpen, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenSanctuary: () => void;
  onOpenLexicon: () => void;
  onOpenSubmit: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSanctuary,
  onOpenLexicon,
  onOpenSubmit,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0807] border-t border-stone-800/80 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-800/60">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xl font-cinzel font-semibold tracking-widest text-amber-100 block">
              DASTAAN
            </span>
            <p className="text-stone-400 font-serif leading-relaxed text-sm">
              An online museum and reading sanctuary dedicated to preserving the emotional and linguistic splendour of Urdu-Hindi poetry.
            </p>
            <div className="flex items-center gap-2 pt-1 text-stone-300">
              <Instagram className="w-4 h-4 text-pink-400" />
              <span className="font-sans font-medium text-xs">
                Community of 100,000+ Readers on Instagram
              </span>
            </div>
          </div>

          {/* Exhibition Wings */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-cinzel uppercase tracking-widest text-amber-400">
              Exhibition Wings
            </div>
            <ul className="space-y-2 text-stone-400 font-sans">
              <li>
                <button
                  onClick={() => onSelectCategory('ishq')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Pavilion of Ishq (Love & Longing)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('dard')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Courtyard of Dard (Heartbreak)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('tanhai')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Hall of Tanhai (Solitude)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ruhaniyat')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Sufi Sanctuary (Spiritual)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('inquilab')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Chamber of Inquilab (Defiance)
                </button>
              </li>
            </ul>
          </div>

          {/* Sanctuary & Tools */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-cinzel uppercase tracking-widest text-amber-400">
              Sanctuary
            </div>
            <ul className="space-y-2 text-stone-400 font-sans">
              <li>
                <button
                  onClick={onOpenSanctuary}
                  className="hover:text-amber-200 transition-colors"
                >
                  Sanctuary Mode
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLexicon}
                  className="hover:text-amber-200 transition-colors"
                >
                  Lafz-o-Maani Lexicon
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSubmit}
                  className="hover:text-amber-200 transition-colors"
                >
                  Submit Couplet
                </button>
              </li>
              <li>
                <a
                  href="#boutique"
                  className="hover:text-amber-200 transition-colors"
                >
                  Museum Boutique
                </a>
              </li>
            </ul>
          </div>

          {/* Ethical Affiliate Disclosure */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-cinzel uppercase tracking-widest text-amber-400">
              Curator’s Disclosure
            </div>
            <p className="text-stone-400 font-serif text-xs leading-relaxed">
              Dastaan is an independent literary archive. When you acquire artisan journals, pens, and books through our guild affiliate links, we may receive a modest commission at no extra cost to you, helping keep this museum free and accessible.
            </p>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 font-sans">
          <div>
            © {new Date().getFullYear()} Dastaan Museum of Shayari. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-400 hover:text-amber-300 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
