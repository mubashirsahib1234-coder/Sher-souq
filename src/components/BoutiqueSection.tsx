import React, { useState } from 'react';
import {
  Tag,
  Star,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Sparkles,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { BoutiqueProduct } from '../types';

interface BoutiqueSectionProps {
  products: BoutiqueProduct[];
  onSelectProduct: (product: BoutiqueProduct) => void;
  onReadPairedSher: (sherId: string) => void;
}

export const BoutiqueSection: React.FC<BoutiqueSectionProps> = ({
  products,
  onSelectProduct,
  onReadPairedSher,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'journals', label: 'Journals & Quills' },
    { id: 'candles', label: 'Scent & Ambience' },
    { id: 'books', label: 'Collector Books' },
    { id: 'accessories', label: 'Wearable Poetry' },
    { id: 'apparel', label: 'Studio Apparel' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2200);
  };

  return (
    <section id="boutique" className="py-16 bg-[#0f0d0b] border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-800/80 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-cinzel tracking-widest text-amber-500">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>THE MUSEUM BOUTIQUE & GUILD</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400">CURATED ARTIFACTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-stone-100 font-medium">
              Artifacts for the Written Word
            </h2>

            <p className="text-stone-400 font-serif text-base leading-relaxed">
              Every item in the museum collection is hand-tested for poetry readers and writers:
              from deckle-edge journals that swallow ink gracefully to apothecary candles crafted to accompany midnight verses.
            </p>
          </div>

          {/* Currency Toggle & Community Affiliate Note */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center p-1 bg-stone-900 border border-stone-800 rounded-lg text-xs">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded transition-colors ${
                  currency === 'USD'
                    ? 'bg-amber-950 text-amber-200 border border-amber-800/60 font-medium'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1 rounded transition-colors ${
                  currency === 'INR'
                    ? 'bg-amber-950 text-amber-200 border border-amber-800/60 font-medium'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                INR (₹)
              </button>
            </div>

            <span className="text-[11px] text-stone-500 max-w-xs">
              Curator-vetted affiliate partners · Exclusive 10-20% discounts for our 100K community
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-950 text-amber-200 border border-amber-800/70 font-medium'
                  : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => {
            const displayPrice =
              currency === 'USD'
                ? `$${product.priceUsd.toFixed(2)}`
                : `₹${product.priceInr.toLocaleString()}`;
            const displayOriginal =
              currency === 'USD'
                ? `$${product.originalPriceUsd.toFixed(2)}`
                : `₹${Math.round(product.originalPriceUsd * 82).toLocaleString()}`;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative rounded-2xl bg-[#141210] border border-stone-800 hover:border-amber-900/60 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent opacity-80" />

                    {/* Stock & Badge Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-amber-950/90 text-amber-300 border border-amber-800/70 text-[10px] font-cinzel uppercase px-2 py-0.5 rounded tracking-wider backdrop-blur-sm">
                        {product.badge}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-stone-950/80 text-stone-300 border border-stone-800 text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                        {product.stockStatus}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-500 font-cinzel text-[11px] uppercase tracking-wider">
                        {product.affiliateMerchant}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 font-sans text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-stone-500 text-[11px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-stone-100 group-hover:text-amber-200 transition-colors leading-snug">
                      {product.title}
                    </h3>

                    <p className="text-stone-400 text-xs font-serif leading-relaxed line-clamp-2">
                      {product.tagline}
                    </p>

                    {/* Paired Sher Bridge */}
                    {product.pairedSherId && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onReadPairedSher(product.pairedSherId!);
                          }}
                          className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 transition-colors bg-amber-950/30 border border-amber-900/40 px-2.5 py-1 rounded"
                        >
                          <BookOpen className="w-3 h-3 text-amber-500" />
                          <span>Paired with Museum Verse</span>
                          <ArrowRight className="w-3 h-3 ml-0.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Price and Promo code */}
                <div className="p-5 pt-0 mt-3">
                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-stone-100 font-sans">
                          {displayPrice}
                        </span>
                        <span className="text-xs text-stone-500 line-through">
                          {displayOriginal}
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-sans">
                        Save {product.discountPercentage}% with code
                      </div>
                    </div>

                    {/* Promo Code Copy Pill */}
                    <button
                      type="button"
                      onClick={(e) => handleCopyCode(product.discountCode, e)}
                      title={`Copy promo code ${product.discountCode}`}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-900/50 rounded-lg text-xs transition-colors"
                    >
                      <Tag className="w-3 h-3 text-amber-400" />
                      <span className="font-mono font-medium">{product.discountCode}</span>
                      {copiedCode === product.discountCode ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-stone-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
