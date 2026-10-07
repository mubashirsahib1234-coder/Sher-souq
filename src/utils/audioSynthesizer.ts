/**
 * Pure Web Audio API Soundscape Generator
 * Generates ambient acoustic textures for contemplative poetry reading without external audio files.
 */

export type SoundscapeType = 'tanpura' | 'monsoon' | 'embers';

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private currentMode: SoundscapeType = 'tanpura';
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private volume: number = 0.45;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public isPlaying(): boolean {
    return this.isRunning;
  }

  public getMode(): SoundscapeType {
    return this.currentMode;
  }

  public start(mode: SoundscapeType = 'tanpura') {
    this.initContext();
    this.stop();
    this.currentMode = mode;
    this.isRunning = true;

    if (mode === 'tanpura') {
      this.playTanpuraDrone();
    } else if (mode === 'monsoon') {
      this.playRainTexture();
    } else if (mode === 'embers') {
      this.playEmbersTexture();
    }
  }

  public stop() {
    this.isRunning = false;
    // Clear intervals or stop oscillators
    this.activeNodes.forEach((item) => {
      if (typeof item === 'number') {
        window.clearInterval(item);
      } else {
        try {
          if ('stop' in item && typeof (item as AudioScheduledSourceNode).stop === 'function') {
            (item as AudioScheduledSourceNode).stop();
          }
          item.disconnect();
        } catch {
          // ignore already stopped
        }
      }
    });
    this.activeNodes = [];
  }

  // 1. Classical Tanpura / Meditative Drone (D, A, D octave)
  private playTanpuraDrone() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Frequencies: D2 (73.42Hz), A2 (110.0Hz), D3 (146.83Hz), F#3 (185.0Hz harmonic shimmer)
    const freqs = [73.42, 110.0, 146.83, 185.0];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'sine' : idx === 1 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Warm low-pass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320 + idx * 80, ctx.currentTime);

      // Subtle slow pulse / chorus effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.08, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);

      gain.gain.setValueAtTime(0.12 / (idx + 1), ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      lfo.start();

      this.activeNodes.push(osc, gain, filter, lfo, lfoGain);
    });
  }

  // 2. Monsoon Rain on Courtyard
  private playRainTexture() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(1.2, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
    this.activeNodes.push(whiteNoise, filter, gain);
  }

  // 3. Embers & Night Fireplace
  private playEmbersTexture() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Gentle low wind rumble
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(45, ctx.currentTime);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(90, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    osc.start();

    this.activeNodes.push(osc, filter, gain);

    // Occasional subtle wood spark crackle
    const interval = window.setInterval(() => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;
      if (Math.random() > 0.4) {
        const snapOsc = this.ctx.createOscillator();
        const snapGain = this.ctx.createGain();
        snapOsc.type = 'square';
        snapOsc.frequency.setValueAtTime(200 + Math.random() * 800, this.ctx.currentTime);
        snapGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        snapGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

        snapOsc.connect(snapGain);
        snapGain.connect(this.masterGain);
        snapOsc.start();
        snapOsc.stop(this.ctx.currentTime + 0.05);
      }
    }, 280);

    this.activeNodes.push(interval);
  }
}

export const soundscape = new SoundscapeEngine();
