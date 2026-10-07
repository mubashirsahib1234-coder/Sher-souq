import React, { useState } from 'react';
import {
  X,
  Star,
  Tag,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Truck,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { BoutiqueProduct } from '../types';

interface ProductDetailModalProps {
  product: BoutiqueProduct | null;
  onClose: () => void;
  onReadPairedSher?: (sherId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onReadPairedSher,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'story'>('details');

  if (!product) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(product.discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#141210] border border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden my-auto text-stone-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Product Image Column */}
          <div className="md:col-span-5 relative bg-stone-950 min-h-[300px]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent md:hidden" />
            <div className="absolute top-4 left-4">
              <span className="bg-amber-950/90 text-amber-300 border border-amber-800 text-xs font-cinzel uppercase px-2.5 py-1 rounded backdrop-blur-sm">
                {product.badge}
              </span>
            </div>
          </div>

          {/* Product Info Column */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 pb-2 border-b border-stone-800">
                <span className="text-amber-500 font-cinzel uppercase tracking-wider">
                  {product.affiliateMerchant}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-stone-500">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl font-serif font-medium text-stone-100 mt-3 leading-snug">
                {product.title}
              </h2>

              <p className="text-stone-400 text-xs font-serif mt-1 italic">
                {product.tagline}
              </p>

              {/* Price Block */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-sans font-bold text-stone-100">
                  ${product.priceUsd.toFixed(2)}
                </span>
                <span className="text-sm font-sans text-stone-500 line-through">
                  ${product.originalPriceUsd.toFixed(2)}
                </span>
                <span className="text-xs font-sans text-stone-400">
                  (approx. ₹{product.priceInr.toLocaleString()})
                </span>
              </div>

              {/* Exclusive Promo Code Box */}
              <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-800/50 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase font-cinzel text-amber-400">
                    Community Discount Code
                  </div>
                  <div className="text-xs text-stone-300">
                    Saves {product.discountPercentage}% at checkout
                  </div>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-xs rounded-lg transition-colors"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span className="font-mono">{product.discountCode}</span>
                  {copied ? <Check className="w-3.5 h-3.5 text-stone-950" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Description & Features */}
              <div className="mt-5 space-y-3">
                <p className="text-stone-300 text-xs font-serif leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="text-xs uppercase font-cinzel text-stone-400">
                    Curated Specifications:
                  </div>
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paired Sher Shortcut */}
              {product.pairedSherId && onReadPairedSher && (
                <div className="mt-5 pt-3 border-t border-stone-800">
                  <button
                    onClick={() => {
                      onReadPairedSher(product.pairedSherId!);
                      onClose();
                    }}
                    className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span>Read the Museum Sher this artifact was curated for</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-800 space-y-3">
              <a
                href={`https://amazon.com?tag=dastaan-shayari-20&code=${product.discountCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-sans font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30"
              >
                <span>Acquire from Guild Merchant</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-around text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                  Curator Inspected
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-400" />
                  Worldwide Shipping
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                  30-Day Return
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
