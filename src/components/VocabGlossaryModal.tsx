import React, { useState } from 'react';
import { X, Search, Sparkles, BookA } from 'lucide-react';
import { VOCAB_GLOSSARY } from '../data/shayariData';

interface VocabGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWordClick?: (word: string) => void;
}

export const VocabGlossaryModal: React.FC<VocabGlossaryModalProps> = ({
  isOpen,
  onClose,
  onWordClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredWords = VOCAB_GLOSSARY.filter(
    (item) =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.poetContext.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#141210] border border-amber-900/50 rounded-2xl shadow-2xl p-6 sm:p-7 my-auto text-stone-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <BookA className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-lg font-cinzel font-medium text-amber-200">
                Lafz-o-Maani: The Literary Lexicon
              </h2>
              <p className="text-xs text-stone-400 font-sans">
                Etymology and spiritual nuances of classical Urdu poetry terms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close lexicon"
            className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search words (e.g., Hijr, Wisal, Sukoon)..."
            className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-9 pr-4 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-600"
          />
        </div>

        {/* Word List Grid */}
        <div className="mt-5 space-y-3 max-h-[460px] overflow-y-auto pr-1">
          {filteredWords.map((item) => (
            <div
              key={item.word}
              className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800/80 hover:border-amber-900/50 transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-base font-serif text-amber-200 font-medium">
                  {item.word}
                </span>
                <span className="text-[11px] text-stone-500 font-mono">
                  {item.pronunciation}
                </span>
              </div>
              <div className="text-xs text-stone-300 font-sans mt-1">
                {item.meaning}
              </div>
              <div className="text-[11px] text-stone-400 font-serif italic mt-1.5 pt-1.5 border-t border-stone-800/40">
                "{item.poetContext}"
              </div>
            </div>
          ))}

          {filteredWords.length === 0 && (
            <div className="py-8 text-center text-xs text-stone-500">
              No poetic terms matching "{searchTerm}" found in this wing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
