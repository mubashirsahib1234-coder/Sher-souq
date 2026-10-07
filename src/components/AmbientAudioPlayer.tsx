import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, CloudRain, Flame, Music2 } from 'lucide-react';
import { soundscape, SoundscapeType } from '../utils/audioSynthesizer';

export const AmbientAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mode, setMode] = useState<SoundscapeType>('tanpura');
  const [volume, setVolume] = useState<number>(0.35);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    soundscape.setVolume(volume);
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      soundscape.stop();
      setIsPlaying(false);
    } else {
      soundscape.start(mode);
      setIsPlaying(true);
    }
  };

  const handleSelectMode = (newMode: SoundscapeType) => {
    setMode(newMode);
    if (isPlaying) {
      soundscape.start(newMode);
    }
  };

  const presets: { id: SoundscapeType; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'tanpura', label: 'Tanpura Drone', icon: <Music2 className="w-4 h-4 text-amber-400" />, desc: 'Harmonic D-raga meditative resonance' },
    { id: 'monsoon', label: 'Monsoon Rain', icon: <CloudRain className="w-4 h-4 text-cyan-400" />, desc: 'Gentle raindrops tapping haveli eaves' },
    { id: 'embers', label: 'Hearth & Embers', icon: <Flame className="w-4 h-4 text-orange-400" />, desc: 'Warm crackling fireplace ambiance' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5 p-1 bg-stone-900/80 border border-stone-800 rounded-lg text-xs">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause ambient audio' : 'Play ambient audio'}
          className={`flex items-center gap-2 px-2.5 py-1 rounded transition-colors ${
            isPlaying ? 'bg-amber-950/70 text-amber-200 border border-amber-800/60' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-sans font-medium">Mehfil Audio: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="font-sans font-medium">Ambience</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          title="Soundscape Settings"
          className="p-1 rounded text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>

      {isOpenMenu && (
        <div className="absolute right-0 mt-2 w-72 p-3 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800 mb-2.5">
            <span className="text-xs uppercase tracking-wider font-cinzel text-amber-400">Ambient Soundscape</span>
            <span className="text-[11px] text-stone-400">Pure Web Audio</span>
          </div>

          <div className="space-y-1.5 mb-3">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  handleSelectMode(preset.id);
                  if (!isPlaying) {
                    soundscape.start(preset.id);
                    setIsPlaying(true);
                  }
                }}
                className={`w-full text-left p-2 rounded-lg text-xs flex items-start gap-2.5 transition-colors ${
                  mode === preset.id
                    ? 'bg-amber-950/40 border border-amber-800/50 text-stone-200'
                    : 'bg-stone-950/40 border border-stone-800/40 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="mt-0.5">{preset.icon}</div>
                <div>
                  <div className="font-medium text-stone-200">{preset.label}</div>
                  <div className="text-[10px] text-stone-500">{preset.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-800">
            <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
