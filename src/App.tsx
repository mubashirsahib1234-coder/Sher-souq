/**
 * Poetry Mart — sher padhein, kitaab khareedein.
 * Every sher on the page links to the book it comes from.
 */

import React, { useMemo, useState } from 'react';
import { BookOpen, Feather, Search, ShoppingBag } from 'lucide-react';
import { SHAYARI_GALLERY } from './data/shayariData';
import { BOOKS } from './data/booksData';
import { CategoryTheme } from './types';
import { BookCover } from './components/BookCover';
import { SherBookCard } from './components/SherBookCard';
import { OrderForm } from './components/OrderForm';

const CATEGORIES: { id: CategoryTheme | 'all'; label: string }[] = [
  { id: 'all', label: 'Sab' },
  { id: 'ishq', label: 'Ishq' },
  { id: 'dard', label: 'Dard' },
  { id: 'tanhai', label: 'Tanhai' },
  { id: 'zindagi', label: 'Zindagi' },
  { id: 'ruhaniyat', label: 'Ruhaniyat' },
  { id: 'inquilab', label: 'Inquilab' }
];

const NAV_LINKS = [
  { href: '#shayari', label: 'Shayari' },
  { href: '#kitaabein', label: 'Kitaabein' },
  { href: '#shayar', label: 'Shayar' },
  { href: '#order', label: 'Order' }
];

const bookForSher = (sherId: string) => BOOKS.find((b) => b.sherId === sherId);

const SectionHeading: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-8 text-center">
    <h2 className="text-3xl font-serif font-bold text-stone-900">{title}</h2>
    <p className="mt-1 text-stone-500">{subtitle}</p>
    <span className="block w-12 h-0.5 bg-[#b5121b] mx-auto mt-3" />
  </div>
);

export default function App() {
  const [category, setCategory] = useState<CategoryTheme | 'all'>('all');
  const [query, setQuery] = useState('');
  const [orderBookId, setOrderBookId] = useState('');

  const featured = SHAYARI_GALLERY[0];
  const featuredBook = bookForSher(featured.id);

  const filteredShers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SHAYARI_GALLERY.filter(
      (s) =>
        (category === 'all' || s.category === category) &&
        (!q || s.poet.toLowerCase().includes(q) || s.roman.toLowerCase().includes(q) || s.urdu.includes(q))
    );
  }, [category, query]);

  const startOrder = (bookId: string) => {
    setOrderBookId(bookId);
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2">
            <Feather className="w-6 h-6 text-[#b5121b]" />
            <span className="text-2xl font-serif font-bold text-stone-900">
              Poetry <span className="text-[#b5121b]">Mart</span>
            </span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-stone-600">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[#b5121b]">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#order"
            className="inline-flex items-center gap-1.5 bg-[#b5121b] hover:bg-[#8f0e15] text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            <ShoppingBag className="w-4 h-4" />
            Order
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero: aaj ka sher + uski kitaab */}
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-[1fr_220px] gap-10 items-center">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-widest text-[#b5121b] font-semibold">Aaj ka sher</p>
              <p className="font-urdu text-3xl sm:text-4xl text-stone-900 mt-4 whitespace-pre-line md:text-right">
                {featured.urdu}
              </p>
              <p className="mt-4 text-stone-500 italic whitespace-pre-line">{featured.roman}</p>
              <p className="mt-3 font-semibold text-stone-700">— {featured.poet}</p>
              {featuredBook && (
                <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={() => startOrder(featuredBook.id)}
                    className="bg-[#b5121b] hover:bg-[#8f0e15] text-white font-medium px-5 py-2.5 rounded-md"
                  >
                    {featuredBook.title} khareedein — Rs. {featuredBook.pricePkr}
                  </button>
                  <a
                    href="#shayari"
                    className="border border-stone-300 hover:border-[#b5121b] text-stone-700 font-medium px-5 py-2.5 rounded-md"
                  >
                    Aur shayari padhein
                  </a>
                </div>
              )}
            </div>
            {featuredBook && (
              <div className="w-44 mx-auto">
                <BookCover book={featuredBook} />
              </div>
            )}
          </div>
        </section>

        {/* Shayari section — har sher ke neeche kitaab */}
        <section id="shayari" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-20">
          <SectionHeading title="Shayari" subtitle="Sher padhein — aur jo dil ko lage, wo kitaab ghar mangwayein" />

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`px-4 py-1.5 rounded-full text-sm border ${
                    category === c.id
                      ? 'bg-[#b5121b] border-[#b5121b] text-white'
                      : 'bg-white border-stone-300 text-stone-600 hover:border-[#b5121b]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <label className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Shayar ya sher talaash karein"
                className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-md bg-white text-sm focus:outline-none focus:border-[#b5121b]"
              />
            </label>
          </div>

          {filteredShers.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredShers.map((s) => (
                <SherBookCard key={s.id} sher={s} book={bookForSher(s.id)} onOrder={startOrder} />
              ))}
            </div>
          ) : (
            <p className="text-center text-stone-500">Koi sher nahi mila.</p>
          )}
        </section>

        {/* Kitaabein section */}
        <section id="kitaabein" className="bg-white border-y border-stone-200 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <SectionHeading title="Kitaabein" subtitle="Urdu shayari ki behtareen kitaabein — cash on delivery" />
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {BOOKS.map((b) => (
                <div key={b.id} className="flex flex-col">
                  <BookCover book={b} />
                  <p className="mt-3 font-semibold text-stone-900">{b.title}</p>
                  <p className="text-xs text-stone-500">
                    {b.poet} · {b.pages} safhaat
                  </p>
                  <p className="mt-1 text-xs text-stone-600 line-clamp-2">{b.blurb}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-bold text-[#b5121b]">Rs. {b.pricePkr}</span>{' '}
                    <span className="text-stone-400 line-through text-xs">Rs. {b.oldPricePkr}</span>
                  </p>
                  <button
                    onClick={() => startOrder(b.id)}
                    className="mt-2 border border-[#b5121b] text-[#b5121b] hover:bg-[#b5121b] hover:text-white text-sm font-medium py-1.5 rounded-md"
                  >
                    Order karein
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shayar section */}
        <section id="shayar" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-16">
          <SectionHeading title="Shayar" subtitle="Jin ke alfaaz sadiyon se dilon mein zinda hain" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SHAYARI_GALLERY.map((s) => (
              <div key={s.id} className="bg-white border border-stone-200 rounded-lg p-5">
                <p className="font-semibold text-stone-900">{s.poet}</p>
                <p className="text-xs text-[#b5121b] mt-0.5">{s.poetEra}</p>
                <p className="text-sm text-stone-600 mt-2">{s.poetBio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Order section */}
        <section id="order" className="bg-white border-t border-stone-200 scroll-mt-16">
          <div className="max-w-2xl mx-auto px-4 py-16">
            <SectionHeading title="Order Karein" subtitle="Form bharein — hum phone par confirm karenge" />
            <OrderForm selectedBookId={orderBookId} onSelectBook={setOrderBookId} />
          </div>
        </section>
      </main>

      <footer className="bg-stone-900 text-stone-400 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#e8474f]" />
            <span className="font-serif text-lg text-white">Poetry Mart</span>
          </p>
          <p>© {new Date().getFullYear()} Poetry Mart · Sher padhein, kitaab khareedein</p>
        </div>
      </footer>
    </div>
  );
}
