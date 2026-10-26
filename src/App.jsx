import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CanvasBackground from './components/CanvasBackground';
import AudioPlayer from './components/AudioPlayer';
import Envelope from './components/Envelope';
import BirthdayCard from './components/BirthdayCard';
import { Shield, Moon } from 'lucide-react';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#e6dad2] flex flex-col justify-between overflow-x-hidden selection:bg-[#8B0000] selection:text-[#ffd700]">
      {/* 1. Atmospheric Canvas Background: Rose Petals, Mist & Embers */}
      <CanvasBackground />

      {/* 2. Vignette Dark Overlay */}
      <div className="fixed inset-0 vignette-overlay z-0" />

      {/* 3. Audio Player Widget (Lana Del Rey — Salvatore) */}
      <AudioPlayer />

      {/* 4. Top Gothic Mystic Falls Brand Header */}
      <header className="relative z-10 pt-6 pb-2 text-center select-none pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16060a]/70 border border-[#D4AF37]/25 backdrop-blur-sm shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
          <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-cinzel text-[11px] tracking-[0.25em] text-[#d6c4b9] uppercase">
            The Vampire Diaries • Qadrdon Do'stlik Rishtasi
          </span>
          <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>
      </header>

      {/* 5. Main Content Area: Smooth Framer Motion transition between Envelope & Card */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="envelope-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, filter: 'blur(8px)', transition: { duration: 0.8 } }}
              className="w-full flex justify-center"
            >
              <Envelope onOpen={() => setIsOpened(true)} isOpened={isOpened} />
            </motion.div>
          ) : (
            <motion.div
              key="birthday-card-view"
              initial={{ opacity: 0, scale: 0.85, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center"
            >
              <BirthdayCard onReset={() => setIsOpened(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 6. Gothic Friendship Footer */}
      <footer className="relative z-10 py-5 text-center text-xs font-cinzel text-[#826f66] tracking-widest select-none">
        <p className="flex items-center justify-center gap-2">
          <span>«Vaqt o'tsa ham qadrini yo'qotmaydigan tuyg'ular bor: bu — sadoqat, hurmat va mustahkam do'stlik.»</span>
          <span className="text-[#8B0000]">•</span>
          <span>Mystic Falls, 1864</span>
        </p>
      </footer>
    </div>
  );
}
