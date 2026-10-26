import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Shield } from 'lucide-react';
import { globalAudioEngine } from '../utils/audioEngine';

export default function Envelope({ onOpen, isOpened }) {
  const [isBreaking, setIsBreaking] = useState(false);

  const handleSealClick = () => {
    if (isBreaking || isOpened) return;
    setIsBreaking(true);
    // Play sound effect
    globalAudioEngine.playSealBreak();

    // After animation triggers, notify parent to reveal the BirthdayCard scroll
    setTimeout(() => {
      onOpen();
    }, 950);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 select-none">
      {/* Mystic Ambient glow around envelope */}
      <div className="absolute w-[360px] sm:w-[540px] h-[360px] rounded-full bg-gradient-to-r from-[#8B0000]/30 via-[#c4122d]/15 to-[#D4AF37]/20 blur-3xl pointer-events-none -z-10 animate-candle-glow" />

      {/* Subtitle / Teaser */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center mb-6"
      >
        <span className="font-cursive text-2xl sm:text-3xl text-[#D4AF37] block mb-1">
          Salvatore sirli arxivlaridan...
        </span>
        <h2 className="font-cinzel text-xs sm:text-sm tracking-[0.3em] text-[#d6c5bb] uppercase flex items-center justify-center gap-2">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
          Mystic Falls • Qadrdon Do'stga
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </h2>
      </motion.div>

      {/* 3D Envelope Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full max-w-[460px] h-[300px] sm:h-[320px] rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] perspective-1000"
      >
        {/* Envelope Base Body */}
        <div className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-b from-[#1b080d] via-[#120508] to-[#090204] border-2 border-[#D4AF37]/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]">
          {/* Subtle Damask / Victorian Pattern Texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Gold Filigree corner borders */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/70" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/70" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/70" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/70" />

          {/* Envelope Pocket fold lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            {/* Left triangle fold */}
            <polygon points="0,0 230,160 0,320" fill="rgba(30, 8, 14, 0.45)" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" />
            {/* Right triangle fold */}
            <polygon points="460,0 230,160 460,320" fill="rgba(25, 6, 11, 0.5)" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" />
            {/* Bottom triangle fold */}
            <polygon points="0,320 230,150 460,320" fill="rgba(38, 10, 18, 0.6)" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="1" />
          </svg>

          {/* Addressee Inscription */}
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <p className="font-cursive text-2xl sm:text-3xl text-[#f5d77f] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Kimga: Husniddin (Qadrdon Do'stimga)
            </p>
            <p className="font-cinzel text-[10px] tracking-[0.25em] text-[#a99187] uppercase mt-0.5">
              Mystic Falls • Shaxsan ishonchli do'stimning qo'liga
            </p>
          </div>
        </div>

        {/* Envelope Top Flap */}
        <motion.div
          animate={isBreaking ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
          className="absolute inset-x-0 top-0 h-1/2"
        >
          <div className="relative w-full h-full">
            <svg viewBox="0 0 460 160" className="w-full h-full filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.8)]">
              <polygon
                points="0,0 460,0 230,155"
                fill="#2a0a12"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <polygon
                points="10,4 450,4 230,145"
                fill="#1e070d"
              />
            </svg>
          </div>
        </motion.div>

        {/* Wax Seal Button */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={
                isBreaking
                  ? {
                      scale: [1, 1.25, 0],
                      opacity: [1, 0.8, 0],
                      rotate: [0, -10, 25],
                      filter: ['brightness(1)', 'brightness(2)', 'brightness(3)']
                    }
                  : { scale: 1, opacity: 1 }
              }
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
            >
              <button
                onClick={handleSealClick}
                disabled={isBreaking}
                aria-label="Muhrni sindirish"
                className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full wax-seal-btn flex items-center justify-center cursor-pointer outline-none focus:ring-4 focus:ring-[#D4AF37]/50"
              >
                {/* Molten wax organic outer ring */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  <path
                    d="M50 4 C65 2, 85 10, 92 28 C99 44, 96 68, 86 84 C74 96, 52 98, 32 94 C14 88, 2 74, 4 50 C5 30, 22 10, 50 4 Z"
                    fill="#7d0510"
                    opacity="0.9"
                  />
                  <path
                    d="M50 8 C62 6, 80 14, 86 29 C92 42, 90 64, 80 78 C70 88, 50 90, 34 86 C18 81, 8 68, 10 48 C11 31, 26 13, 50 8 Z"
                    fill="#9c0919"
                  />
                </svg>

                {/* Inner embossed stamp ring */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#ff99a8]/30 flex flex-col items-center justify-center bg-gradient-to-br from-[#7a040e] to-[#450207] shadow-inner">
                  {/* Monogram Crest: Gothic "H" for Husniddin */}
                  <span className="font-decorative text-2xl sm:text-3xl text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
                    H
                  </span>
                  <span className="text-[7px] tracking-[0.2em] uppercase text-[#ffccd5] font-cinzel -mt-1 font-bold">
                    Do'stlik
                  </span>
                </div>

                {/* Crack lines appearing during break */}
                {isBreaking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-full h-1 bg-[#fff] shadow-[0_0_12px_#ff0033] rotate-45" />
                    <div className="w-full h-1 bg-[#fff] shadow-[0_0_12px_#ff0033] -rotate-30" />
                  </motion.div>
                )}
              </button>

              {/* Tooltip / Hint */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-3 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0d0406]/90 border border-[#D4AF37]/50 shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              >
                <Flame className="w-3.5 h-3.5 text-[#ff4d6d] animate-pulse" />
                <span className="font-cinzel text-[11px] tracking-wider text-[#ffd700] font-medium">
                  {isBreaking ? "Muhr ochilmoqda..." : "Muhrni ochish uchun bosing"}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Atmospheric Quote underneath */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="mt-8 font-cormorant italic text-sm sm:text-base text-[#bfa89e] text-center max-w-md flex items-center justify-center gap-2"
      >
        <Shield className="w-4 h-4 text-[#D4AF37]/70" />
        <span>«Chin do'stlik vaqt sinovlaridan qo'rqmaydi, u asrlar o'tsa ham o'z qadrini yo'qotmaydi.»</span>
      </motion.p>
    </div>
  );
}
