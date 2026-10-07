import React from 'react';
import { Bookmark, Sparkles, Instagram } from 'lucide-react';
import { AmbientAudioPlayer } from './AmbientAudioPlayer';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  onOpenSanctuary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSavedModal,
  onOpenSanctuary,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0a09]/90 backdrop-blur-md border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('exhibition');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg sm:text-xl font-cinzel font-semibold tracking-widest text-amber-100/90 hover:text-amber-200 transition-colors shrink-0"
        >
          DASTAAN
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-cinzel text-stone-400">
          <button
            onClick={() => setActiveTab('exhibition')}
            className={`transition-colors hover:text-amber-200 ${
              activeTab === 'exhibition' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Exhibition
          </button>
          <button
            onClick={() => setActiveTab('boutique')}
            className={`transition-colors hover:text-amber-200 ${
              activeTab === 'boutique' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Boutique
          </button>
          <button
            onClick={onOpenSanctuary}
            className="transition-colors hover:text-amber-200 flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Sanctuary Mode</span>
          </button>
          <button
            onClick={() => setActiveTab('lexicon')}
            className={`transition-colors hover:text-amber-200 ${
              activeTab === 'lexicon' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Lexicon
          </button>
          <button
            onClick={() => setActiveTab('guestbook')}
            className={`transition-colors hover:text-amber-200 ${
              activeTab === 'guestbook' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Submissions
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          <AmbientAudioPlayer />

          <button
            onClick={onOpenSavedModal}
            aria-label="View saved shers"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans text-stone-300 hover:text-amber-200 bg-stone-900 border border-stone-800 rounded-lg hover:border-stone-700 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">My Diwan</span>
            {savedCount > 0 && (
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {savedCount}
              </span>
            )}
          </button>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            title="100k Community on Instagram"
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-400 hover:text-pink-400 bg-stone-900/60 border border-stone-800 rounded-lg transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono">100k</span>
          </a>
        </div>
      </div>
    </header>
  );
};
