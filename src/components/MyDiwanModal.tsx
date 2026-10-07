import React from 'react';
import { X, Bookmark, Trash2, Share2, Sparkles, BookOpen } from 'lucide-react';
import { SherItem } from '../types';

interface MyDiwanModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedShers: SherItem[];
  onRemoveSave: (id: string) => void;
  onClearAll: () => void;
  onOpenCardModal: (sher: SherItem) => void;
  onOpenSanctuary: () => void;
}

export const MyDiwanModal: React.FC<MyDiwanModalProps> = ({
  isOpen,
  onClose,
  savedShers,
  onRemoveSave,
  onClearAll,
  onOpenCardModal,
  onOpenSanctuary,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#141210] border border-amber-900/50 rounded-2xl shadow-2xl p-6 sm:p-7 my-auto text-stone-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            <div>
              <h2 className="text-lg font-cinzel font-medium text-amber-200">
                My Personal Diwan
              </h2>
              <p className="text-xs text-stone-400 font-sans">
                {savedShers.length} {savedShers.length === 1 ? 'couplet' : 'couplets'} saved in your treasury
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedShers.length > 0 && (
              <button
                onClick={onClearAll}
                title="Clear all saved verses"
                className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-stone-900 rounded-lg transition-colors text-xs flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Close Diwan"
              className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {savedShers.length === 0 ? (
          <div className="py-14 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-stone-600 mx-auto" />
            <h3 className="text-lg font-serif text-stone-300">Your Diwan is Empty</h3>
            <p className="text-xs text-stone-400 font-sans max-w-xs mx-auto">
              Click the bookmark icon on any couplet in the exhibition to curate your personal anthology.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4 max-h-[460px] overflow-y-auto pr-1">
            {savedShers.map((sher) => (
              <div
                key={sher.id}
                className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2 relative"
              >
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="text-amber-500 font-cinzel">{sher.poet}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenCardModal(sher)}
                      className="text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Story</span>
                    </button>
                    <button
                      onClick={() => onRemoveSave(sher.id)}
                      className="text-stone-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="font-urdu text-xl text-amber-100 text-right leading-relaxed">
                  {sher.urdu}
                </p>

                <p className="font-serif italic text-xs text-stone-400">
                  "{sher.englishTranslation}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        {savedShers.length > 0 && (
          <div className="mt-5 pt-4 border-t border-stone-800 flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onOpenSanctuary();
              }}
              className="py-2 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Read in Sanctuary Mode</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
