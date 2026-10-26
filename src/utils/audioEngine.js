// Web Audio API Gothic Sound Engine for The Vampire Diaries Aesthetic
class GothicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.loopTimeout = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  // Play a single gothic piano/bell tone
  playTone(freq, duration = 1.6, type = 'sine', decay = 1.2, detune = 0) {
    if (!this.ctx || !this.isPlaying) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.detune.setValueAtTime(detune, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * decay);

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration * decay);
  }

  // Mystic Falls gothic romance arpeggio progression (D minor, Bb major, G minor, A7)
  startMusic() {
    this.init();
    this.isPlaying = true;

    const chords = [
      // D minor (Mysterious Salvatore study)
      [146.83, 220.00, 293.66, 349.23, 440.00, 587.33],
      // Bb major (Tender romance)
      [116.54, 174.61, 233.08, 293.66, 349.23, 466.16],
      // G minor (Melancholy longing)
      [98.00, 146.83, 196.00, 233.08, 293.66, 392.00],
      // A harmonic minor / A dominant 7 (Vampiric passion & tension)
      [110.00, 164.81, 220.00, 277.18, 329.63, 440.00],
      // F major (Faint hope)
      [174.61, 261.63, 349.23, 440.00, 523.25, 698.46],
      // C# diminished (Dark seduction)
      [138.59, 207.65, 277.18, 329.63, 392.00, 554.37]
    ];

    let chordIndex = 0;
    let noteStep = 0;

    const playSequence = () => {
      if (!this.isPlaying) return;

      const currentChord = chords[chordIndex];
      const freq = currentChord[noteStep % currentChord.length];

      // Layered ethereal gothic timbre (sine bell + warm triangle)
      this.playTone(freq, 2.2, 'sine', 1.4);
      this.playTone(freq * 0.5, 3.0, 'triangle', 1.6, 5);

      noteStep++;
      if (noteStep >= currentChord.length * 2) {
        noteStep = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }

      this.loopTimeout = setTimeout(playSequence, 440);
    };

    playSequence();
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.loopTimeout) {
      clearTimeout(this.loopTimeout);
      this.loopTimeout = null;
    }
  }

  // Wax seal breaking sound effect
  playSealBreak() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.04));
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.25);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    whiteNoise.start(now);

    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.frequency.setValueAtTime(120, now);
    subOsc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
    subGain.gain.setValueAtTime(0.4, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.3);
  }

  // Candle blowing out sound effect (breath of wind + whoosh)
  playCandleBlow() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * (i / bufferSize));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.linearRampToValueAtTime(300, now + 0.6);
    filter.Q.value = 1.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  // Birthday wish celebration chimes
  playWishChimes() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51, 1567.98];

    notes.forEach((freq, idx) => {
      const time = now + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.25, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 1.2);
    });
  }
}

export const globalAudioEngine = new GothicAudioEngine();
