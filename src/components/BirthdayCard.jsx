import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, Edit2, Check, Bookmark, Feather, Shield, Swords, Wine } from 'lucide-react';
import { globalAudioEngine } from '../utils/audioEngine';

function TypewriterHeadline({ text }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < text.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 70);
    return () => clearInterval(timer);
  }, [text]);

  const displayed = text.slice(0, count);
  const isComplete = count >= text.length;

  return (
    <span className="font-cursive text-3xl sm:text-5xl md:text-6xl text-[#f3cf7a] drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] block mb-1">
      {displayed}
      {!isComplete && (
        <span className="inline-block w-1.5 h-8 sm:h-10 bg-[#D4AF37] ml-1 animate-pulse" />
      )}
    </span>
  );
}

export default function BirthdayCard({ onReset }) {
  const [name, setName] = useState('Husniddin');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('Husniddin');
  const [torchesLit, setTorchesLit] = useState(true);

  const fullHeadline = `Tug'ilgan kuning bilan, ${name}!`;

  // "Make a Wish / Toast" handler
  const handleToast = () => {
    if (!torchesLit) return;

    setTorchesLit(false);
    globalAudioEngine.playCandleBlow();

    setTimeout(() => {
      globalAudioEngine.playWishChimes();
      triggerGothicCelebration();
    }, 450);
  };

  const relightTorches = () => {
    setTorchesLit(true);
  };

  const handleNameSave = () => {
    if (tempName.trim()) {
      setName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const triggerGothicCelebration = () => {
    const end = Date.now() + 3.2 * 1000;
    const colors = ['#8B0000', '#D4AF37', '#ff1a40', '#ffd700', '#4A0E17', '#ffffff', '#cd7f32'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        shapes: ['square'],
        scalar: 1.2
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        shapes: ['square'],
        scalar: 1.2
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    setTimeout(() => {
      confetti({
        particleCount: 85,
        spread: 110,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#ffd700', '#ff0033', '#8B0000', '#cd7f32'],
        scalar: 1.4
      });
    }, 550);
  };

  const torchLabels = ['Ishonch', 'Matonat', 'Sadoqat'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-3xl mx-auto my-6 px-4"
    >
      {/* Background ambient crimson & gold glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#8B0000]/30 via-[#D4AF37]/20 to-[#4A0E17]/40 rounded-3xl blur-2xl -z-10 animate-candle-glow" />

      {/* Main Ancient Journal Parchment Container */}
      <div className="relative rounded-2xl parchment-card parchment-texture overflow-hidden p-6 sm:p-10 md:p-12 text-[#e8ded6]">
        {/* Ornate Gold Filigree Corners */}
        <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37]/80 pointer-events-none" />
        <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#D4AF37]/80 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#D4AF37]/80 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37]/80 pointer-events-none" />

        {/* Vintage Journal Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#D4AF37]/30 pb-4 mb-8 gap-3">
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-cinzel text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
              The Salvatore Chronicles • Do'stlik Bitigi
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-cormorant italic text-sm text-[#baa397]">
              Mystic Falls • 26-Oktyabr
            </span>
            {!isEditingName ? (
              <button
                onClick={() => {
                  setTempName(name);
                  setIsEditingName(true);
                }}
                className="flex items-center gap-1 text-[11px] font-cinzel text-[#D4AF37]/80 hover:text-[#ffd700] transition-colors px-2 py-0.5 rounded border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer"
                title="Ismni o'zgartirish"
              >
                <Edit2 className="w-3 h-3" />
                <span>Ism</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-[#0a0a0a] border border-[#D4AF37] text-xs px-2 py-0.5 rounded text-[#ffd700] outline-none font-cinzel w-28"
                  autoFocus
                />
                <button
                  onClick={handleNameSave}
                  className="p-1 rounded bg-[#8B0000] text-white hover:bg-[#a50000] cursor-pointer"
                >
                  <Check className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Animated Headline with Typewriter */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block"
          >
            <TypewriterHeadline key={fullHeadline} text={fullHeadline} />
            <span className="font-cormorant italic text-sm sm:text-base text-[#e8c568] font-medium flex items-center justify-center gap-3 mt-1">
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
              Qiyin damda ham, quvonchda ham doim yoningda bo'ladigan chin do'stlar uchun.
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </span>
          </motion.div>
        </div>

        {/* 3 Virtual Torches representing Trust, Character, Loyalty */}
        <div className="flex justify-center items-end gap-8 sm:gap-14 my-8">
          {[0, 1, 2].map((torchIndex) => {
            const torchHeights = ['h-16', 'h-22', 'h-16'];
            const torchWidths = 'w-4 sm:w-5';
            return (
              <div key={torchIndex} className="flex flex-col items-center relative">
                {/* Flame & Glow */}
                <div className="relative h-12 flex items-center justify-center">
                  <AnimatePresence>
                    {torchesLit ? (
                      <motion.div
                        key="flame"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        className="relative flex flex-col items-center"
                      >
                        <div className="absolute w-12 h-16 rounded-full bg-orange-500/25 blur-md animate-flame pointer-events-none" />
                        <div className="w-3.5 h-7 rounded-full bg-gradient-to-t from-[#ff2200] via-[#ff9900] to-[#fffbc7] animate-flame shadow-[0_0_15px_#ff6600]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -40, scale: 1.8 }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                        className="w-2.5 h-8 rounded-full bg-gray-400/50 blur-[2px]"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Wick */}
                <div className="w-0.5 h-2.5 bg-neutral-900" />

                {/* Wax / Pillar */}
                <div
                  className={`${torchHeights[torchIndex]} ${torchWidths} rounded-t-sm bg-gradient-to-b from-[#e5dcd3] via-[#bdaea1] to-[#8c7b6f] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),2px_4px_8px_rgba(0,0,0,0.6)] relative overflow-hidden`}
                >
                  <div className="absolute top-0 left-0 w-1.5 h-3 bg-[#f5efe9] rounded-b-full shadow-sm" />
                  <div className="absolute top-0 right-1 w-1 h-5 bg-[#f5efe9] rounded-b-full shadow-sm" />
                </div>

                {/* Antique Gold Base */}
                <div className="w-9 sm:w-11 h-2 rounded-full bg-gradient-to-r from-[#947622] via-[#ffd700] to-[#6d5516] shadow-md mt-0.5" />

                {/* Torch Label */}
                <span className="font-cinzel text-[10px] tracking-widest text-[#D4AF37] uppercase mt-2 font-semibold">
                  {torchLabels[torchIndex]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Letter Content: From female friend to male friend (Uzbek) */}
        <div className="my-8 px-2 sm:px-6 text-left space-y-5 font-cormorant text-lg sm:text-xl md:text-2xl leading-relaxed text-[#eddcd2]">
          <p className="first-letter:font-decorative first-letter:text-5xl sm:first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:text-[#ffd700] first-letter:leading-none">
            {name}, qadrdonim, tug'ilgan kuning muborak bo'lsin! Bugungi kunda so'zida qat'iy turadigan, har qanday vaziyatda bemalol suyansa bo'ladigan mard, samimiy va ishonchli do'stning borligi — men uchun juda katta baxt. Har doim qo'llab-quvvatlaganing, quvnoq kayfiyating va mustahkam fe'l-atvoring uchun sendan behad minnatdorman.
          </p>

          <p className="italic text-[#f0ded3] pl-4 border-l-2 border-[#D4AF37]/50">
            «Yangi yoshing senga har bir qadamingda mustahkam ishonch, ulkan g'alabalar va qalbingdagi eng ezgu orzularing ro'yobini olib kelsin. Hayotingda doimo yelkadosh bo'ladigan, sen bilan birga oxirigacha boradigan sodiq insonlar ko'paysin.»
          </p>

          <p>
            Barcha to'siqlar va qiyinchiliklar yo'lingdan chekinsin, ko'zlagan har bir maqsading cho'qqisiga yetish nasib qilsin. Doimo shunday ochiqko'ngil, adolatli va irodali bo'lib qol. Do'stligimiz yillar o'tsa ham faqat mustahkamlanib boraversin. Yana bir bor tavallud ayyoming qutlug' bo'lsin!
          </p>
        </div>

        {/* Sign-off from female friend */}
        <div className="flex flex-col items-end my-6 pr-4 sm:pr-8">
          <p className="font-cursive text-2xl sm:text-3xl text-[#ffd700]">
            Samimiy hurmat va do'stona mehr bilan,
          </p>
          <p className="font-cinzel text-xs tracking-[0.2em] text-[#c4122d] uppercase font-bold mt-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Sening qadrdon do'sting (dugonang)</span>
          </p>
        </div>

        {/* Action Bar: Toast / Blow out torches */}
        <div className="border-t border-[#D4AF37]/30 pt-8 mt-6 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {torchesLit ? (
              <motion.button
                key="make-wish-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToast}
                className="group relative px-8 py-3.5 rounded-full overflow-hidden cursor-pointer font-cinzel font-semibold text-sm sm:text-base tracking-widest text-[#ffd700] bg-gradient-to-r from-[#4A0E17] via-[#8B0000] to-[#4A0E17] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(139,0,0,0.7)] flex items-center gap-3"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <Wine className="w-5 h-5 text-[#ffd700]" />
                <span>Qadah ko'tarish & Shamni o'chirish</span>
                <Swords className="w-5 h-5 text-[#ffd700]" />
              </motion.button>
            ) : (
              <motion.div
                key="toast-granted-banner"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="px-6 py-4 rounded-xl bg-[#26080e]/95 border border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)] backdrop-blur-md max-w-lg mb-4">
                  <div className="flex items-center justify-center gap-2 mb-1.5">
                    <Swords className="w-4 h-4 text-[#ffd700]" />
                    <span className="font-cinzel text-sm sm:text-base text-[#ffd700] font-bold tracking-wider uppercase">
                      Do'stlik, kuch va yorqin g'alabalar uchun!
                    </span>
                    <Swords className="w-4 h-4 text-[#ffd700]" />
                  </div>
                  <p className="font-cormorant italic text-sm sm:text-base text-[#edd6ca]">
                    «Barcha ezgu niyatlaring ijobat bo'lsin! Hayoting omad, muvaffaqiyat va yuksak cho'qqilarga to'lsin!»
                  </p>
                </div>

                {/* Relight button */}
                <button
                  onClick={relightTorches}
                  className="flex items-center gap-2 text-xs font-cinzel text-[#d4af37] hover:text-[#fff] transition-colors py-1.5 px-4 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] bg-[#120406]/70 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Olovni qayta yoqish</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset / Return to Envelope */}
          <button
            onClick={onReset}
            className="mt-6 font-cormorant text-xs sm:text-sm text-[#9c8479] hover:text-[#ffd700] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Maktubni buklash va konvertga qaytarish</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
