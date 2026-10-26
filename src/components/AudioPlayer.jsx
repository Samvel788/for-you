import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc3, Music2, Play } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/audio/salvatore.m4a');
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const handleFirstGesture = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay policy fallback
        });
      }
      window.removeEventListener('pointerdown', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = 0.45;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <div
        onClick={togglePlay}
        title={isPlaying ? "Musiqani to'xtatish" : "Lana Del Rey — Salvatore musiqasini yoqish"}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full cursor-pointer 
                   bg-[#150a0d]/85 hover:bg-[#250d14]/95 border border-[#D4AF37]/40 hover:border-[#D4AF37] 
                   backdrop-blur-md shadow-[0_4px_20px_rgba(139,0,0,0.4)] 
                   transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        {/* Glowing aura */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#8B0000]/25 via-[#D4AF37]/25 to-[#8B0000]/25 blur-md transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />

        {/* Disc / Playback Indicator */}
        <div className="relative flex items-center justify-center">
          <Disc3
            className={`w-5 h-5 text-[#D4AF37] transition-transform duration-1000 ${
              isPlaying ? 'animate-spin' : 'group-hover:rotate-45'
            }`}
          />
          {isPlaying ? (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff1e42] animate-ping" />
          ) : (
            <Play className="absolute w-2 h-2 text-[#D4AF37] fill-[#D4AF37]" />
          )}
        </div>

        {/* Track label and status */}
        <div className="flex flex-col text-left">
          <span className="font-cinzel text-xs tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
            Lana Del Rey • Salvatore
            <Music2 className={`w-3 h-3 text-[#ff4d6d] ${isPlaying ? 'animate-pulse' : 'opacity-60'}`} />
          </span>
          <span className="text-[10px] text-[#bda89e] font-cormorant italic tracking-wide">
            {isPlaying ? "Salvatore saundtreki yangramoqda" : "Musiqani tinglash uchun bosing"}
          </span>
        </div>

        {/* Equalizer bars */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 px-1">
            <span className="w-0.5 bg-[#D4AF37] animate-[pulse_0.6s_infinite_ease-in-out] h-2" />
            <span className="w-0.5 bg-[#c4122d] animate-[pulse_0.9s_infinite_ease-in-out_0.2s] h-3.5" />
            <span className="w-0.5 bg-[#D4AF37] animate-[pulse_0.7s_infinite_ease-in-out_0.4s] h-1.5" />
            <span className="w-0.5 bg-[#c4122d] animate-[pulse_0.8s_infinite_ease-in-out_0.1s] h-3" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-[#8a7266] group-hover:text-[#D4AF37] transition-colors" />
        )}
      </div>

      {isPlaying && (
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-[#150a0d]/85 border border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#8B0000]/40 transition-colors backdrop-blur-md cursor-pointer"
          title={isMuted ? "Ovozni yoqish" : "Ovozsiz rejim"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
