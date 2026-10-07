import React, { useState } from 'react';
import { X, Send, Sparkles, Instagram, Check } from 'lucide-react';
import { SubmittedSher } from '../types';

interface SubmitSherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: SubmittedSher) => void;
}

export const SubmitSherModal: React.FC<SubmitSherModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [sherText, setSherText] = useState('');
  const [category, setCategory] = useState('ishq');
  const [meaning, setMeaning] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sherText.trim() || !authorName.trim()) return;

    const newSubmission: SubmittedSher = {
      id: 'sub-' + Date.now(),
      authorName,
      instagramHandle: instagramHandle.startsWith('@') ? instagramHandle : `@${instagramHandle}`,
      sherText,
      category,
      meaning,
      timestamp: Date.now(),
      approved: true, // auto-displayed in community gallery for instant delight!
    };

    onSubmit(newSubmission);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#141210] border border-amber-900/50 rounded-2xl shadow-2xl p-6 sm:p-7 my-auto text-stone-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-cinzel font-medium text-amber-200">
              Submit to the Museum Gallery
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close submit dialog"
            className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-cinzel text-stone-100">Couplet Received</h3>
            <p className="text-xs text-stone-400 font-sans max-w-xs mx-auto">
              Your verse is now displayed in the Community Guestbook and queued for curatorial archival review.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-cinzel uppercase text-stone-400 block mb-1">
                  Your Name / Poet Pen-name
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Asad or Farhan"
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-cinzel uppercase text-stone-400 block mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  placeholder="@your_instagram"
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-cinzel uppercase text-stone-400 block mb-1">
                Theme / Wing
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-600"
              >
                <option value="ishq">Pavilion of Ishq (Love & Longing)</option>
                <option value="dard">Courtyard of Dard (Heartbreak & Melancholy)</option>
                <option value="tanhai">Hall of Tanhai (Solitude)</option>
                <option value="zindagi">Gallery of Zindagi (Existential & Time)</option>
                <option value="ruhaniyat">Sufi Sanctuary (Divine & Mystic)</option>
                <option value="inquilab">Chamber of Inquilab (Defiance & Spirit)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-cinzel uppercase text-stone-400 block mb-1">
                The Couplet / Sher (Urdu, Hindi, or Roman)
              </label>
              <textarea
                required
                rows={3}
                value={sherText}
                onChange={(e) => setSherText(e.target.value)}
                placeholder="Enter 2-4 lines of poetry..."
                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-600 font-serif leading-relaxed"
              />
            </div>

            <div>
              <label className="text-[11px] font-cinzel uppercase text-stone-400 block mb-1">
                Context / Meaning (Optional)
              </label>
              <textarea
                rows={2}
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="What inspired this sher, or what does it mean to you?"
                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-600 text-xs"
              />
            </div>

            <p className="text-[11px] text-stone-500 font-sans italic">
              Selected submissions are shared with our 100K Instagram community with full creator credits.
            </p>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-sans font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30"
            >
              <Send className="w-4 h-4" />
              <span>Submit for Exhibition</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
