import React from 'react';
import { Book } from '../types';

// Simple printed-style cover so every book looks consistent without image files.
export const BookCover: React.FC<{ book: Book; size?: 'sm' | 'lg' }> = ({ book, size = 'lg' }) => {
  const dims = size === 'sm' ? 'w-16 h-24' : 'w-full aspect-[2/3]';
  return (
    <div
      className={`${dims} relative shrink-0 rounded-r-md rounded-l-sm shadow-md overflow-hidden flex flex-col items-center justify-center text-center px-2`}
      style={{ backgroundColor: book.cover.bg, color: book.cover.accent }}
    >
      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/25" />
      <span className="absolute inset-2 border rounded-sm opacity-40" style={{ borderColor: book.cover.accent }} />
      <span className={`font-urdu ${size === 'sm' ? 'text-sm' : 'text-2xl sm:text-3xl'} leading-tight`}>
        {book.urduTitle}
      </span>
      {size === 'lg' && (
        <span className="mt-2 text-[11px] uppercase tracking-widest opacity-80">{book.poet}</span>
      )}
    </div>
  );
};
