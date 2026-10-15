import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Book, SherItem } from '../types';
import { BookCover } from './BookCover';

interface SherBookCardProps {
  sher: SherItem;
  book?: Book;
  onOrder: (bookId: string) => void;
}

// A sher on top, and the book it comes from right underneath it.
export const SherBookCard: React.FC<SherBookCardProps> = ({ sher, book, onOrder }) => (
  <article className="bg-white border border-stone-200 rounded-lg flex flex-col overflow-hidden hover:shadow-md transition-shadow">
    <div className="p-6 flex-1">
      <p className="font-urdu text-2xl text-stone-900 text-center whitespace-pre-line">{sher.urdu}</p>
      <p className="mt-4 text-sm text-stone-500 text-center italic whitespace-pre-line">{sher.roman}</p>
      <p className="mt-4 text-center text-sm font-semibold text-[#b5121b]">— {sher.poet}</p>
    </div>

    {book && (
      <div className="border-t border-stone-200 bg-stone-50 p-4 flex gap-4 items-center">
        <BookCover book={book} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-wide text-stone-500">Ye sher is kitaab se hai</p>
          <p className="font-semibold text-stone-900 truncate">{book.title}</p>
          <p className="text-sm">
            <span className="font-bold text-[#b5121b]">Rs. {book.pricePkr}</span>{' '}
            <span className="text-stone-400 line-through text-xs">Rs. {book.oldPricePkr}</span>
          </p>
        </div>
        <button
          onClick={() => onOrder(book.id)}
          className="shrink-0 inline-flex items-center gap-1.5 bg-[#b5121b] hover:bg-[#8f0e15] text-white text-sm font-medium px-3 py-2 rounded-md"
        >
          <ShoppingBag className="w-4 h-4" />
          Khareedein
        </button>
      </div>
    )}
  </article>
);
