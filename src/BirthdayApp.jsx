import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Mail, ArrowRight, RefreshCw, ImagePlus } from 'lucide-react';
import confetti from 'canvas-confetti';
import birthdayImage from './7ba0292ec5af1d27ace0473914f5cc1c.jpg';
import birthdayImage2 from './010101010.png';
import birthdayImage3 from './0179444.jpeg';
import birthdayImage4 from './01580.jpeg';

const memories = [
  {
    id: 1,
    title: 'Happy Birthday, 🎂! 🌸🎂 Keep smiling, keep shining, and always stay this beautiful.💖',
    description: 'A magical evening under the lights.',
    image: birthdayImage4,
  },
  {
    id: 2,
    title: 'Happy Birthday! May your day be as beautiful as your smile. 💕✨',
    description: 'Laughs, hugs, and endless joy.',
    image: birthdayImage3,
  },
  {
    id: 3,
    title: 'Happy Birthday! 🎉 May this year bring you joy, laughter, and all your heart desires. 💫',
    description: 'Soft lights and dreamy roads.',
    image: birthdayImage,
  },
  {
    id: 4,
    title: 'Wishing you endless happiness, love, and beautiful moments. Happy Birthday! 🎂✨',
    description: 'A new day, a new beginning.',
    image: birthdayImage2,
  }
];

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: 'easeIn' } },
};

const keypadButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default function BirthdayApp() {
  const [step, setStep] = useState('lock');
  const [passcode, setPasscode] = useState('');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [isCelebrated, setIsCelebrated] = useState(false);

  useEffect(() => {
    if (passcode.length === 4) {
      if (passcode === '2026') {
        setTimeout(() => setStep('welcome'), 350);
        triggerConfetti();
        playHappyBirthday(5); // play for 5 minutes
      } else {
        setTimeout(() => setPasscode(''), 500);
      }
    }
  }, [passcode]);

  const playHappyBirthday = (minutes = 5) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.connect(ctx.destination);

      const melody = [
        [392, 0.35], [392, 0.35], [440, 0.7], [392, 0.7], [523, 0.7], [494, 1.1],
        [392, 0.35], [392, 0.35], [440, 0.7], [392, 0.7], [587, 0.7], [523, 1.1],
        [392, 0.35], [392, 0.35], [784, 0.7], [659, 0.7], [523, 0.7], [494, 0.7], [440, 1.1],
        [698, 0.35], [698, 0.35], [659, 0.7], [523, 0.7], [587, 0.7], [523, 1.1],
      ];

      const sequenceLength = melody.reduce((s, n) => s + n[1], 0);
      const totalDuration = Math.max(1, minutes) * 60; // seconds
      const repeats = Math.ceil(totalDuration / sequenceLength);

      let startTime = ctx.currentTime + 0.05;
      for (let r = 0; r < repeats; r++) {
        let time = startTime + r * sequenceLength;
        melody.forEach(([freq, dur]) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, time);
          const noteGain = ctx.createGain();
          noteGain.gain.setValueAtTime(0.0001, time);
          noteGain.gain.linearRampToValueAtTime(0.06, time + 0.01);
          noteGain.gain.linearRampToValueAtTime(0.0001, time + dur);
          osc.connect(noteGain).connect(gain);
          osc.start(time);
          osc.stop(time + dur);
          time += dur;
        });
      }

      // Close AudioContext after the requested duration plus a small buffer
      const totalMs = (totalDuration + 0.5) * 1000;
      setTimeout(() => {
        if (ctx && ctx.state !== 'closed') ctx.close();
      }, totalMs);
    } catch (e) {
      console.warn('Audio playback failed', e);
    }
  };

  const ageCounts = useMemo(
    () => ({ years: 19, months: 0, days: 19 }),
    []
  );

  const handleKey = (value) => {
    if (passcode.length >= 4) return;
    setPasscode((prev) => `${prev}${value}`);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ffadbc', '#f8c3c3', '#ffffff'],
    });
    setIsCelebrated(true);
  };

  const restart = () => {
    setStep('lock');
    setPasscode('');
    setSelectedMemory(null);
    setLetterOpen(false);
    setIsCelebrated(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 flex items-center justify-center">
      <div className="relative w-full max-w-4xl rounded-[36px] border border-red-900/50 bg-gradient-to-br from-[#1b0305] via-[#240409] to-[#0c0203] p-8 shadow-2xl shadow-red-950/30">
        <div className="absolute inset-0 rounded-[36px] ring-1 ring-white/10" />
        <div className="relative space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-red-300/80">Birthday web app</p>
              <h1 className="text-3xl font-semibold text-white">A Romantic Celebration</h1>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-red-200/90 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-300" />
              Dreamy Anniversary
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'lock' && (
              <motion.div
                key="lock"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex flex-col items-center gap-4 rounded-[32px] border border-white/10 bg-white/5 px-8 py-10 text-center shadow-xl shadow-red-950/20">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border border-red-500/30 bg-red-950/20 shadow-inner shadow-black/40">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-red-600 to-pink-500 shadow-[0_0_40px_rgba(255,77,109,0.35)]" />
                  </div>
                  <p className="flex items-center justify-center gap-2 text-xl uppercase tracking-[0.35em] text-red-200"><Lock className="h-5 w-5" /> LOCKED</p>
                  <div className="flex items-center justify-center gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className={`h-4 w-10 rounded-full border ${index < passcode.length ? 'bg-red-400/90 border-transparent' : 'border-white/20'} transition-all duration-300`}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-[32px] border border-white/10 bg-black/40 p-6 shadow-lg shadow-black/40">
                  <div className="grid grid-cols-3 gap-4">
                    {keypadButtons.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleKey(item)}
                        className="rounded-3xl border border-white/10 bg-white/5 py-5 text-2xl font-semibold text-white/90 transition hover:bg-red-500/20 hover:text-red-100"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 text-center text-sm text-red-200/70">Enter the secret passcode to unlock the surprise.</div>
                </div>
              </motion.div>
            )}

            {step === 'welcome' && (
              <motion.div
                key="welcome"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8 rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-xl shadow-red-950/25"
              >
                <div className="text-center space-y-4">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-red-950/70 text-6xl shadow-[0_0_40px_rgba(255,77,109,0.2)]">
                    🐼
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl text-red-100">It's Your Special Day <span className="text-pink-300">💕</span></p>
                    <p className="text-sm text-red-200/80">A romantic birthday experience crafted with love.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('countdown')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.01]"
                >
                  START
                  <Sparkles className="h-5 w-5" />
                </button>
              </motion.div>
            )}

            {step === 'countdown' && (
              <motion.div
                key="countdown"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8 rounded-[32px] border border-white/10 bg-black/60 p-10 shadow-xl shadow-black/40"
              >
                <div className="rounded-[28px] border border-red-700/50 bg-gradient-to-b from-[#2b0608] to-[#180204] p-8 text-center shadow-inner shadow-red-950/40">
                  <p className="text-sm uppercase tracking-[0.35em] text-red-300/80">Age Counter</p>
                  <h2 className="mt-4 text-4xl font-semibold text-white">00 Years : 00 Months : 00 Days</h2>
                  <p className="mt-3 text-sm text-red-200/70">Counting every lovely moment with you.</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('welcome')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/90 transition hover:bg-white/10"
                  >
                    <RefreshCw className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('gallery')}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.01]"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'gallery' && (
              <motion.div
                key="gallery"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-red-400/90">Memories Gallery</p>
                    <h2 className="text-2xl font-semibold text-white">Click a memory to enlarge the love.</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('letter')}
                    className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-500"
                  >
                    <Mail className="h-4 w-4" /> View Letter
                  </button>
                </div>

                <div className="flex gap-4 overflow-x-auto py-2">
                  {memories.map((memory) => (
                    <motion.button
                      key={memory.id}
                      type="button"
                      onClick={() => setSelectedMemory(memory)}
                      whileHover={{ y: -6 }}
                      className="min-w-[260px] shrink-0 rounded-[28px] border border-white/10 bg-black/80 p-3 text-left shadow-xl shadow-black/30 transition hover:border-red-400/60"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-white/5">
                        <img src={memory.image} alt={memory.title} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <p className="text-lg font-semibold text-white">{memory.title}</p>
                        <p className="text-sm text-red-200/75">{memory.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setStep('letter')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.01]"
                >
                  Keep going
                  <Sparkles className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedMemory && (
              <motion.div
                key="memory-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  className="relative w-full max-w-3xl overflow-hidden rounded-[36px] border border-white/10 bg-[#120204] shadow-2xl shadow-black/60"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedMemory(null)}
                    className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 p-3 text-white/90 transition hover:bg-red-600/80"
                  >
                    ✕
                  </button>
                  <img src={selectedMemory.image} alt={selectedMemory.title} className="h-80 w-full object-cover" />
                  <div className="p-8">
                    <p className="text-sm uppercase tracking-[0.35em] text-red-300/80">Memory</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">{selectedMemory.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-red-100/80">{selectedMemory.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {letterOpen && (
              <motion.div
                key="letter-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              >
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="w-full max-w-2xl rounded-[36px] border border-red-500/20 bg-[#170509] p-10 shadow-2xl shadow-black/70"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-red-950/30 p-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-red-300/70">JUST FOR YOU</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white">My Heartfelt Birthday Note</h2>
                      </div>
                      <ImagePlus className="h-8 w-8 text-pink-300" />
                    </div>

                    <div className="space-y-4 rounded-[28px] border border-white/10 bg-black/50 p-6 text-red-100 shadow-inner shadow-red-950/30">
                      <p>Dear love,</p>
                      <p>
                        Every moment with you is a treasure. Today I celebrate the light you bring into my life, the warmth of your smile, and the way your laughter makes the world feel softer.
                      </p>
                      <p>
                        May this birthday be filled with dreamy memories, quiet joy, and the sweetest surprises that remind you how deeply you are cherished.
                      </p>
                      <p className="font-semibold text-white">With all my love, forever and always.</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={triggerConfetti}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.01]"
                      >
                        CELEBRATE 🎉
                      </button>
                      <button
                        type="button"
                        onClick={restart}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/90 transition hover:bg-white/10"
                      >
                        Restart
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                    {isCelebrated && (
                      <p className="text-sm text-pink-200/90">Confetti triggered! Close this modal to keep celebrating.</p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {!letterOpen && step === 'letter' && (
            <motion.div
              key="letter-view"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="rounded-[32px] border border-white/10 bg-black/60 p-10 shadow-xl shadow-black/40"
            >
              <div className="space-y-6">
                <div className="rounded-[28px] border border-red-700/50 bg-gradient-to-br from-[#2a0607] to-[#120204] p-8">
                  <p className="text-sm uppercase tracking-[0.35em] text-red-300/80">Just for you</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">A Letter from the Heart</h2>
                  <p className="mt-3 text-sm text-red-200/70">Tap the button below to open your birthday surprise.</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setLetterOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.01]"
                  >
                    Open Letter
                    <Mail className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/90 transition hover:bg-white/10"
                  >
                    Back to Lock
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
