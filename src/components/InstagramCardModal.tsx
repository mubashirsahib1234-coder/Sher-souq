import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Copy, Check, Instagram, Sparkles, RefreshCw } from 'lucide-react';
import { SherItem } from '../types';

interface InstagramCardModalProps {
  sher: SherItem | null;
  onClose: () => void;
}

type CardFormat = 'story' | 'post'; // story = 9:16 (1080x1920), post = 1:1 (1080x1080)
type CardTheme = 'obsidian' | 'parchment' | 'emerald' | 'burgundy';
type CardScript = 'urdu' | 'hindi' | 'dual' | 'roman';

export const InstagramCardModal: React.FC<InstagramCardModalProps> = ({
  sher,
  onClose,
}) => {
  const [format, setFormat] = useState<CardFormat>('story');
  const [theme, setTheme] = useState<CardTheme>('obsidian');
  const [scriptType, setScriptType] = useState<CardScript>('dual');
  const [igHandle, setIgHandle] = useState<string>('@shayari.museum');
  const [copiedCaption, setCopiedCaption] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render canvas whenever controls change
  useEffect(() => {
    if (!sher) return;
    renderCanvas();
  }, [sher, format, theme, scriptType, igHandle]);

  if (!sher) return null;

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = format === 'story' ? 1080 : 1080;
    const height = format === 'story' ? 1920 : 1080;

    canvas.width = width;
    canvas.height = height;

    // Palette per theme
    let bgGradient: [string, string];
    let borderColor = 'rgba(217, 119, 6, 0.4)';
    let primaryTextColor = '#fef3c7';
    let subTextColor = '#d6d3d1';
    let poetColor = '#fbbf24';
    let watermarkColor = '#a8a29e';

    if (theme === 'obsidian') {
      bgGradient = ['#141210', '#0a0908'];
      borderColor = '#b45309';
      primaryTextColor = '#fef3c7';
      subTextColor = '#e7e5e4';
      poetColor = '#f59e0b';
      watermarkColor = '#78716c';
    } else if (theme === 'parchment') {
      bgGradient = ['#f5efe6', '#ebe1d1'];
      borderColor = '#78350f';
      primaryTextColor = '#292524';
      subTextColor = '#44403c';
      poetColor = '#9a3412';
      watermarkColor = '#78716c';
    } else if (theme === 'emerald') {
      bgGradient = ['#062e24', '#021812'];
      borderColor = '#059669';
      primaryTextColor = '#ecfdf5';
      subTextColor = '#a7f3d0';
      poetColor = '#34d399';
      watermarkColor = '#6ee7b7';
    } else {
      // burgundy
      bgGradient = ['#2e0c15', '#16050a'];
      borderColor = '#be123c';
      primaryTextColor = '#fff1f2';
      subTextColor = '#fecdd3';
      poetColor = '#fb7185';
      watermarkColor = '#fda4af';
    }

    // 1. Draw Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, bgGradient[0]);
    grad.addColorStop(1, bgGradient[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle inner border frame
    const margin = format === 'story' ? 70 : 50;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

    // Inner delicate corner brackets
    const bracketSize = 35;
    ctx.strokeStyle = poetColor;
    ctx.lineWidth = 3;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(margin + bracketSize, margin);
    ctx.lineTo(margin, margin);
    ctx.lineTo(margin, margin + bracketSize);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(width - margin - bracketSize, margin);
    ctx.lineTo(width - margin, margin);
    ctx.lineTo(width - margin, margin + bracketSize);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(margin, height - margin - bracketSize);
    ctx.lineTo(margin, height - margin);
    ctx.lineTo(margin + bracketSize, height - margin);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(width - margin - bracketSize, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.lineTo(width - margin, height - margin - bracketSize);
    ctx.stroke();

    // Top Museum Header
    ctx.textAlign = 'center';
    ctx.fillStyle = watermarkColor;
    ctx.font = '500 24px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('DASTAAN — MUSEUM OF SHAYARI', width / 2, margin + 65);

    ctx.fillStyle = borderColor;
    ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText(sher.wingTitle.toUpperCase(), width / 2, margin + 105);

    // Center divider ornament
    ctx.beginPath();
    ctx.moveTo(width / 2 - 60, margin + 130);
    ctx.lineTo(width / 2 + 60, margin + 130);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Content Vertical Positioning
    const centerY = height / 2;

    if (scriptType === 'urdu' || scriptType === 'dual') {
      // Draw Urdu Text
      ctx.fillStyle = primaryTextColor;
      ctx.font = '600 52px "Amiri", "Noto Nastaliq Urdu", serif';
      ctx.textAlign = 'center';

      const urduLines = sher.urdu.split('\n');
      const startUrduY = scriptType === 'dual' ? centerY - 150 : centerY - 60;
      urduLines.forEach((line, idx) => {
        ctx.fillText(line, width / 2, startUrduY + idx * 85);
      });

      if (scriptType === 'dual') {
        // Subtle divider
        ctx.beginPath();
        ctx.arc(width / 2, centerY + 30, 4, 0, Math.PI * 2);
        ctx.fillStyle = poetColor;
        ctx.fill();

        // English Translation
        ctx.fillStyle = subTextColor;
        ctx.font = 'italic 400 28px "Cormorant Garamond", Georgia, serif';
        const transLines = sher.englishTranslation.split('\n');
        transLines.forEach((tLine, tIdx) => {
          ctx.fillText(`"${tLine}"`, width / 2, centerY + 80 + tIdx * 45);
        });
      }
    } else if (scriptType === 'hindi') {
      ctx.fillStyle = primaryTextColor;
      ctx.font = '500 46px "Rozha One", "Cormorant Garamond", Georgia, serif';
      ctx.textAlign = 'center';

      const hindiLines = sher.hindi.split('\n');
      hindiLines.forEach((line, idx) => {
        ctx.fillText(line, width / 2, centerY - 60 + idx * 75);
      });

      // English Translation below
      ctx.fillStyle = subTextColor;
      ctx.font = 'italic 400 26px "Cormorant Garamond", Georgia, serif';
      ctx.fillText(`"${sher.englishTranslation.split('\n')[0]}"`, width / 2, centerY + 110);
    } else {
      // Roman
      ctx.fillStyle = primaryTextColor;
      ctx.font = 'italic 400 42px "Cormorant Garamond", Georgia, serif';
      ctx.textAlign = 'center';

      const romanLines = sher.roman.split('\n');
      romanLines.forEach((line, idx) => {
        ctx.fillText(`"${line}"`, width / 2, centerY - 70 + idx * 70);
      });

      // English
      ctx.fillStyle = subTextColor;
      ctx.font = '400 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(sher.englishTranslation.split('\n')[0], width / 2, centerY + 100);
    }

    // Poet Credit
    const poetY = format === 'story' ? height - margin - 150 : height - margin - 100;
    ctx.fillStyle = poetColor;
    ctx.font = '600 32px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '2px';
    ctx.fillText(`— ${sher.poet.toUpperCase()}`, width / 2, poetY);

    ctx.fillStyle = watermarkColor;
    ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(sher.yearOrSource, width / 2, poetY + 40);

    // Bottom Watermark & Instagram Handle
    const bottomY = height - margin - 40;
    ctx.fillStyle = watermarkColor;
    ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(igHandle, width / 2, bottomY);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `dastaan_${sher.poet.toLowerCase().replace(/\s+/g, '_')}_${format}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopyCaption = () => {
    const caption = `"${sher.urdu}"\n\n"${sher.roman}"\n\n${sher.englishTranslation}\n\n— ${sher.poet} (${sher.yearOrSource})\n\n📍 Archive Curation: ${igHandle}\nSave this post & visit the online museum for more timeless couplets.\n\n#shayari #urdupoetry #ghalib #jaunelia #faizahmadfaiz #hindipoetry #poetrylove #rekhta #dastaan #museumpoetry #aestheticurdu`;
    navigator.clipboard.writeText(caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#141210] border border-amber-900/50 rounded-2xl shadow-2xl p-4 sm:p-6 my-auto text-stone-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-400" />
            <h2 className="text-lg font-cinzel font-medium text-amber-200">
              Instagram Story & Post Card Studio
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Canvas Preview, Right Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-5 items-start">
          {/* Canvas Preview Area */}
          <div className="md:col-span-6 flex flex-col items-center justify-center bg-black/60 p-4 rounded-xl border border-stone-800">
            <div
              className={`relative overflow-hidden rounded-lg shadow-2xl border border-stone-700/50 max-h-[460px] flex items-center justify-center`}
            >
              <canvas
                ref={canvasRef}
                className="max-h-[440px] w-auto object-contain rounded"
              />
            </div>
            <div className="mt-3 text-xs text-stone-500 font-sans text-center">
              Rendered at 1080px HD master resolution
            </div>
          </div>

          {/* Configuration Controls */}
          <div className="md:col-span-6 space-y-4">
            {/* Format Selection */}
            <div>
              <label className="text-xs font-cinzel uppercase text-stone-400 block mb-1.5">
                Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFormat('story')}
                  className={`p-2 rounded-lg text-xs font-sans transition-colors ${
                    format === 'story'
                      ? 'bg-amber-950 text-amber-200 border border-amber-800'
                      : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  Instagram Story (9:16)
                </button>
                <button
                  onClick={() => setFormat('post')}
                  className={`p-2 rounded-lg text-xs font-sans transition-colors ${
                    format === 'post'
                      ? 'bg-amber-950 text-amber-200 border border-amber-800'
                      : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  Square Post (1:1)
                </button>
              </div>
            </div>

            {/* Theme Palette */}
            <div>
              <label className="text-xs font-cinzel uppercase text-stone-400 block mb-1.5">
                Museum Aesthetic Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTheme('obsidian')}
                  className={`p-2 rounded-lg text-xs text-left transition-colors flex items-center gap-2 ${
                    theme === 'obsidian'
                      ? 'bg-amber-950/80 text-amber-200 border border-amber-700'
                      : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-[#141210] border border-amber-500 inline-block" />
                  <span>Obsidian & Gold</span>
                </button>

                <button
                  onClick={() => setTheme('parchment')}
                  className={`p-2 rounded-lg text-xs text-left transition-colors flex items-center gap-2 ${
                    theme === 'parchment'
                      ? 'bg-amber-950/80 text-amber-200 border border-amber-700'
                      : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-[#f5efe6] border border-stone-600 inline-block" />
                  <span>Archival Paper</span>
                </button>

                <button
                  onClick={() => setTheme('emerald')}
                  className={`p-2 rounded-lg text-xs text-left transition-colors flex items-center gap-2 ${
                    theme === 'emerald'
                      ? 'bg-amber-950/80 text-amber-200 border border-amber-700'
                      : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-[#062e24] border border-emerald-400 inline-block" />
                  <span>Royal Emerald</span>
                </button>

                <button
                  onClick={() => setTheme('burgundy')}
                  className={`p-2 rounded-lg text-xs text-left transition-colors flex items-center gap-2 ${
                    theme === 'burgundy'
                      ? 'bg-amber-950/80 text-amber-200 border border-amber-700'
                      : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-[#2e0c15] border border-rose-400 inline-block" />
                  <span>Crimson Dusk</span>
                </button>
              </div>
            </div>

            {/* Script Display */}
            <div>
              <label className="text-xs font-cinzel uppercase text-stone-400 block mb-1.5">
                Script Rendering
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setScriptType('dual')}
                  className={`p-2 rounded-lg text-xs font-sans transition-colors ${
                    scriptType === 'dual'
                      ? 'bg-amber-950 text-amber-200 border border-amber-800'
                      : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  Dual (Urdu + English)
                </button>
                <button
                  onClick={() => setScriptType('urdu')}
                  className={`p-2 rounded-lg text-xs font-sans transition-colors ${
                    scriptType === 'urdu'
                      ? 'bg-amber-950 text-amber-200 border border-amber-800'
                      : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  Pure Urdu Calligraphy
                </button>
                <button
                  onClick={() => setScriptType('hindi')}
                  className={`p-2 rounded-lg text-xs font-sans transition-colors ${
                    scriptType === 'hindi'
                      ? 'bg-amber-950 text-amber-200 border border-amber-800'
                      : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  Hindi Devanagari
                </button>
                <button
                  onClick={() => setScriptType('roman')}
                  className={`p-2 rounded-lg text-xs font-sans transition-colors ${
                    scriptType === 'roman'
                      ? 'bg-amber-950 text-amber-200 border border-amber-800'
                      : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  Roman Phonetic
                </button>
              </div>
            </div>

            {/* Instagram Watermark Handle */}
            <div>
              <label className="text-xs font-cinzel uppercase text-stone-400 block mb-1.5">
                Instagram Page Credit / Watermark
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={igHandle}
                  onChange={(e) => setIgHandle(e.target.value)}
                  placeholder="@your_instagram_page"
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-sans font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-900/40"
              >
                <Download className="w-4 h-4" />
                <span>Download High-Res PNG</span>
              </button>

              <button
                onClick={handleCopyCaption}
                className="py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-sans text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {copiedCaption ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Caption Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>Copy IG Caption</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
