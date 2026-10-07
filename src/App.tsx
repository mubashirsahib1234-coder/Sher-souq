/**
 * Dastaan — The Online Museum of Shayari & Literary Sanctuary
 * Born out of a 100K+ community of poetry lovers on Instagram.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Share2,
  Bookmark,
  Instagram,
  Heart,
  PlusCircle,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { SHAYARI_GALLERY } from './data/shayariData';
import { BOUTIQUE_PRODUCTS } from './data/boutiqueData';
import { SherItem, BoutiqueProduct, SubmittedSher, ScriptMode } from './types';
import { Navbar } from './components/Navbar';
import { HeroExhibition } from './components/HeroExhibition';
import { SherCard } from './components/SherCard';
import { InstagramCardModal } from './components/InstagramCardModal';
import { SanctuaryReaderModal } from './components/SanctuaryReaderModal';
import { BoutiqueSection } from './components/BoutiqueSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { VocabGlossaryModal } from './components/VocabGlossaryModal';
import { SubmitSherModal } from './components/SubmitSherModal';
import { MyDiwanModal } from './components/MyDiwanModal';
import { Footer } from './components/Footer';

const INITIAL_SUBMISSIONS: SubmittedSher[] = [
  {
    id: 'sub-1',
    authorName: 'Aarav Malik',
    instagramHandle: '@aarav.writes',
    sherText: 'خامشی بھی اک صدا ہے غور سے سن تو سہی\nتیری یادوں کا دھواں دل میں اتر جاتا ہے',
    category: 'tanhai',
    meaning: 'Even silence possesses a voice if one listens intently; the smoke of your memories drifts softly into the core of the soul.',
    timestamp: Date.now() - 86400000 * 2,
    approved: true
  },
  {
    id: 'sub-2',
    authorName: 'Sana Farooqui',
    instagramHandle: '@sana_nazms',
    sherText: 'ہم نے تو لفظوں کو موتی سا سجایا تھا مگر\nوہ جو پڑھتے تو سمجھتے کہ فسانہ کیا تھا',
    category: 'ishq',
    meaning: 'We adorned our words like lustrous pearls; had they read it, they would have known the true saga behind them.',
    timestamp: Date.now() - 86400000 * 4,
    approved: true
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('exhibition');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPoet, setSelectedPoet] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scriptPreference, setScriptPreference] = useState<ScriptMode>('urdu');

  // Bookmarks / Saved Shers (localStorage persistence)
  const [savedSherIds, setSavedSherIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dastaan_saved_shers');
      return stored ? JSON.parse(stored) : ['jaun-elia-be-dili', 'ghalib-hazaron-khwahishen'];
    } catch {
      return ['jaun-elia-be-dili'];
    }
  });

  // Community Submissions
  const [submissions, setSubmissions] = useState<SubmittedSher[]>(() => {
    try {
      const stored = localStorage.getItem('dastaan_community_submissions');
      return stored ? JSON.parse(stored) : INITIAL_SUBMISSIONS;
    } catch {
      return INITIAL_SUBMISSIONS;
    }
  });

  // Modal states
  const [selectedSherForCard, setSelectedSherForCard] = useState<SherItem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<BoutiqueProduct | null>(null);
  const [isSanctuaryOpen, setIsSanctuaryOpen] = useState<boolean>(false);
  const [isLexiconOpen, setIsLexiconOpen] = useState<boolean>(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState<boolean>(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);

  // Sync saved shers to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dastaan_saved_shers', JSON.stringify(savedSherIds));
    } catch {
      // storage quota or private mode
    }
  }, [savedSherIds]);

  // Sync community submissions
  useEffect(() => {
    try {
      localStorage.setItem('dastaan_community_submissions', JSON.stringify(submissions));
    } catch {
      // ignore
    }
  }, [submissions]);

  const toggleSaveSher = (sherId: string) => {
    setSavedSherIds((prev) =>
      prev.includes(sherId) ? prev.filter((id) => id !== sherId) : [...prev, sherId]
    );
  };

  const handleAddSubmission = (newSub: SubmittedSher) => {
    setSubmissions((prev) => [newSub, ...prev]);
  };

  // Poets list for filter dropdown
  const uniquePoets = useMemo(() => {
    const list = Array.from(new Set(SHAYARI_GALLERY.map((s) => s.poet)));
    return list;
  }, []);

  // Filtered Shers
  const filteredShers = useMemo(() => {
    return SHAYARI_GALLERY.filter((sher) => {
      // Category filter
      if (selectedCategory !== 'all' && sher.category !== selectedCategory) {
        return false;
      }
      // Poet filter
      if (selectedPoet !== 'all' && sher.poet !== selectedPoet) {
        return false;
      }
      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesText =
          sher.urdu.toLowerCase().includes(query) ||
          sher.hindi.toLowerCase().includes(query) ||
          sher.roman.toLowerCase().includes(query) ||
          sher.englishTranslation.toLowerCase().includes(query) ||
          sher.poet.toLowerCase().includes(query) ||
          sher.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesText) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedPoet, searchQuery]);

  const savedSherObjects = useMemo(() => {
    return SHAYARI_GALLERY.filter((s) => savedSherIds.includes(s.id));
  }, [savedSherIds]);

  // Read paired sher from boutique item
  const handleReadPairedSher = (sherId: string) => {
    const found = SHAYARI_GALLERY.find((s) => s.id === sherId);
    if (found) {
      setActiveTab('exhibition');
      setSelectedCategory('all');
      setSelectedPoet('all');
      setSearchQuery('');
      // Scroll to sher card or open sanctuary
      const el = document.getElementById(`sher-${sherId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setSelectedSherForCard(found);
      }
    }
  };

  // Jump to boutique product
  const handleSelectProductById = (productId: string) => {
    const prod = BOUTIQUE_PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
    }
  };

  const wings = [
    { id: 'all', title: 'All Galleries' },
    { id: 'ishq', title: 'Pavilion of Ishq (Love)' },
    { id: 'dard', title: 'Courtyard of Dard (Heartbreak)' },
    { id: 'tanhai', title: 'Hall of Tanhai (Solitude)' },
    { id: 'zindagi', title: 'Gallery of Zindagi (Life & Time)' },
    { id: 'ruhaniyat', title: 'Sufi Sanctuary (Divine Soul)' },
    { id: 'inquilab', title: 'Chamber of Inquilab (Defiance)' },
  ];

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#e7e5e4] flex flex-col font-sans">
      {/* Top Bar Navigation (Strict 3-zone Top Bar Contract) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedSherIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenSanctuary={() => setIsSanctuaryOpen(true)}
      />

      <main className="flex-1">
        {/* Exhibition Marquee Hero */}
        <HeroExhibition
          featuredSher={SHAYARI_GALLERY[1]} /* Jaun Elia */
          onOpenSanctuary={() => setIsSanctuaryOpen(true)}
          onOpenCardModal={(sher) => setSelectedSherForCard(sher)}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveTab('exhibition');
            const galleryEl = document.getElementById('gallery-section');
            if (galleryEl) galleryEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewBoutique={() => {
            const b = document.getElementById('boutique');
            if (b) b.scrollIntoView({ behavior: 'smooth' });
            else setActiveTab('boutique');
          }}
        />

        {/* Community Proof Banner (Claim-to-Proof Adjacency) */}
        <section className="bg-[#12100e] border-b border-stone-800/80 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-stone-300 font-medium">Community of 100,000+ Readers:</span>
              <span className="text-stone-400">Over 48,000 couplets recited this month</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSubmitOpen(true)}
                className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Submit Your Poetry</span>
              </button>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <button
                onClick={() => setIsLexiconOpen(true)}
                className="text-stone-300 hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>Urdu Poetic Lexicon</span>
              </button>
            </div>
          </div>
        </section>

        {/* Main Exhibition Gallery Section */}
        <section id="gallery-section" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Filter & Search Utility Strip */}
          <div className="space-y-6 mb-10 pb-6 border-b border-stone-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest font-cinzel text-amber-500 mb-1">
                  Exhibition Archives
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-stone-100 font-medium">
                  The Permanent Collection
                </h2>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search poet, verse, or keyword..."
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-9 pr-4 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-600 transition-colors"
                />
              </div>
            </div>

            {/* Wing Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {wings.map((wing) => (
                <button
                  key={wing.id}
                  onClick={() => setSelectedCategory(wing.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                    selectedCategory === wing.id
                      ? 'bg-amber-950 text-amber-200 border border-amber-800/80 font-medium shadow-sm'
                      : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {wing.title}
                </button>
              ))}
            </div>

            {/* Sub-Filters: Poet Dropdown & Script Preference */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
              <div className="flex items-center gap-3">
                <span className="font-medium text-stone-300">Filter by Poet:</span>
                <select
                  value={selectedPoet}
                  onChange={(e) => setSelectedPoet(e.target.value)}
                  className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-stone-300 focus:outline-none focus:border-amber-600"
                >
                  <option value="all">All Masters</option>
                  {uniquePoets.map((poet) => (
                    <option key={poet} value={poet}>
                      {poet}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span>Default Script:</span>
                <div className="flex items-center gap-1 p-0.5 bg-stone-900 border border-stone-800 rounded-lg text-[11px]">
                  <button
                    onClick={() => setScriptPreference('urdu')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      scriptPreference === 'urdu'
                        ? 'bg-amber-950 text-amber-200 border border-amber-800/60'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Urdu
                  </button>
                  <button
                    onClick={() => setScriptPreference('hindi')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      scriptPreference === 'hindi'
                        ? 'bg-amber-950 text-amber-200 border border-amber-800/60'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Hindi
                  </button>
                  <button
                    onClick={() => setScriptPreference('roman')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      scriptPreference === 'roman'
                        ? 'bg-amber-950 text-amber-200 border border-amber-800/60'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Roman
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Verses Grid */}
          {filteredShers.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-stone-950/40 rounded-2xl border border-stone-800/60 p-8">
              <BookOpen className="w-12 h-12 text-stone-600 mx-auto" />
              <h3 className="text-xl font-serif text-stone-300">No Verses Match This Query</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try searching for a different word or clearing the filters to wander through other gallery wings.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPoet('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-700 text-xs rounded-lg transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredShers.map((sher) => (
                <div key={sher.id} id={`sher-${sher.id}`}>
                  <SherCard
                    sher={sher}
                    isSaved={savedSherIds.includes(sher.id)}
                    onToggleSave={toggleSaveSher}
                    onOpenCardModal={(s) => setSelectedSherForCard(s)}
                    onSelectProduct={handleSelectProductById}
                    scriptPreference={scriptPreference}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* The Curated Museum Boutique & Affiliate Product Showcase */}
        <BoutiqueSection
          products={BOUTIQUE_PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onReadPairedSher={handleReadPairedSher}
        />

        {/* Community Mehfil & Guestbook Wing (100k Community Hub) */}
        <section id="guestbook" className="py-16 bg-[#0c0a09] border-t border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-800 mb-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-cinzel tracking-widest text-amber-500">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>COMMUNITY OF 100,000+ READERS</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-400">INSTAGRAM VOICES</span>
                </div>
                <h2 className="text-3xl font-serif text-stone-100 font-medium">
                  The Reader’s Pavilion
                </h2>
                <p className="text-stone-400 font-serif text-sm max-w-xl">
                  Poetry submitted by members of our community, curated and cataloged alongside their creators’ pens.
                </p>
              </div>

              <button
                onClick={() => setIsSubmitOpen(true)}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-xs rounded-xl transition-colors flex items-center gap-2 self-start md:self-auto shadow-lg shadow-amber-900/30"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Your Couplet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-6 rounded-2xl bg-[#141210] border border-stone-800/80 hover:border-amber-900/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-400 pb-3 border-b border-stone-800/60 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-amber-300 font-medium">{sub.authorName}</span>
                        <a
                          href={`https://instagram.com/${sub.instagramHandle.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-500 hover:text-pink-400 transition-colors"
                        >
                          {sub.instagramHandle}
                        </a>
                      </div>
                      <span className="text-stone-500 uppercase text-[10px] font-cinzel">
                        {sub.category}
                      </span>
                    </div>

                    <p className="font-urdu text-2xl text-amber-100 text-right leading-relaxed whitespace-pre-line py-2">
                      {sub.sherText}
                    </p>

                    {sub.meaning && (
                      <p className="mt-3 pt-3 border-t border-stone-800/60 text-xs font-serif italic text-stone-400 leading-relaxed">
                        "{sub.meaning}"
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800/40 flex items-center justify-between text-xs text-stone-500">
                    <span>Archived on {new Date(sub.timestamp).toLocaleDateString()}</span>
                    <button
                      onClick={() =>
                        setSelectedSherForCard({
                          id: sub.id,
                          poet: `${sub.authorName} (${sub.instagramHandle})`,
                          poetEra: 'Contemporary Reader',
                          poetBio: 'Community submission from Dastaan 100k Mehfil',
                          category: sub.category as any,
                          wingTitle: 'Community Exhibition',
                          urdu: sub.sherText,
                          hindi: sub.sherText,
                          roman: sub.sherText,
                          englishTranslation: sub.meaning || 'Reader contribution',
                          contextMeaning: sub.meaning || '',
                          vocabBreakdown: [],
                          tags: ['Community'],
                          curatorNote: 'Submitted via Dastaan Museum Guestbook',
                          yearOrSource: 'Community Archive',
                          readTime: '1 min',
                          likesCount: 142
                        })
                      }
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px]"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Create Story Card</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Museum Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('exhibition');
          const galleryEl = document.getElementById('gallery-section');
          if (galleryEl) galleryEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSanctuary={() => setIsSanctuaryOpen(true)}
        onOpenLexicon={() => setIsLexiconOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
      />

      {/* --- ALL MODALS --- */}

      {/* 1. Instagram Story & Post Card Studio Modal */}
      <InstagramCardModal
        sher={selectedSherForCard}
        onClose={() => setSelectedSherForCard(null)}
      />

      {/* 2. Fullscreen Meditative Sanctuary Reader */}
      <SanctuaryReaderModal
        shers={filteredShers.length > 0 ? filteredShers : SHAYARI_GALLERY}
        isOpen={isSanctuaryOpen}
        onClose={() => setIsSanctuaryOpen(false)}
        onOpenCardModal={(sher) => setSelectedSherForCard(sher)}
        onToggleSave={toggleSaveSher}
        savedSherIds={savedSherIds}
      />

      {/* 3. Boutique Product Detail & Affiliate Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onReadPairedSher={handleReadPairedSher}
      />

      {/* 4. Lafz-o-Maani: Urdu Literary Lexicon Modal */}
      <VocabGlossaryModal
        isOpen={isLexiconOpen || activeTab === 'lexicon'}
        onClose={() => {
          setIsLexiconOpen(false);
          if (activeTab === 'lexicon') setActiveTab('exhibition');
        }}
      />

      {/* 5. Community Submission Modal */}
      <SubmitSherModal
        isOpen={isSubmitOpen || activeTab === 'guestbook'}
        onClose={() => {
          setIsSubmitOpen(false);
          if (activeTab === 'guestbook') setActiveTab('exhibition');
        }}
        onSubmit={handleAddSubmission}
      />

      {/* 6. My Diwan (Saved Verses) Modal */}
      <MyDiwanModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedShers={savedSherObjects}
        onRemoveSave={toggleSaveSher}
        onClearAll={() => setSavedSherIds([])}
        onOpenCardModal={(sher) => setSelectedSherForCard(sher)}
        onOpenSanctuary={() => {
          setIsSavedModalOpen(false);
          setIsSanctuaryOpen(true);
        }}
      />
    </div>
  );
}
