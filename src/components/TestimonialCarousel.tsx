'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

export interface TestimonialSlide {
  /** Chiave stabile per React */
  id: string;
  /** Nome del cliente (solo iniziale + nome, per privacy) */
  name: string;
  /** Contesto breve, es. "dal corso Mentalità" */
  context: string;
  /** Path o URL assoluta del video */
  src: string;
  /** Immagine di anteprima mostrata prima del play (ottimizza il peso) */
  poster: string;
  /** Testo alternativo per accessibilità */
  label: string;
}

interface TestimonialCarouselProps {
  slides: TestimonialSlide[];
}

export default function TestimonialCarousel({ slides }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1);
      setIndex(next);
    },
    [index, slides.length]
  );

  const next = () => goTo(index === slides.length - 1 ? 0 : index + 1);
  const prev = () => goTo(index === 0 ? slides.length - 1 : index - 1);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        next();
      }, 5000); // Change slide every 5 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, index, slides.length, next]);

  // Start auto-play when component mounts
  useEffect(() => {
    setIsAutoPlaying(true);
  }, []);

  // Auto-play video when slide changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play might be blocked by browser, that's fine
      });
    }
  }, [index]);

  // Pause auto-play on user interaction
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  if (slides.length === 0) return null;

  const current = slides[index];
  const prevIndex = index === 0 ? slides.length - 1 : index - 1;
  const nextIndex = index === slides.length - 1 ? 0 : index + 1;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Carousel container with visible prev/next slides */}
      <div className="relative">
        {/* Previous slide (peek) */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[18%] z-0">
          <motion.div
            key={slides[prevIndex].id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.4, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="h-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/[0.03] bg-[#050505]"
          >
            <img
              src={slides[prevIndex].poster}
              alt={slides[prevIndex].label}
              className="w-full h-full object-cover opacity-50"
            />
          </motion.div>
        </div>

        {/* Main slide */}
        <div className="relative z-10 mx-auto lg:mx-auto lg:ml-[18%] lg:mr-[18%] lg:w-[64%]">
          <div className="relative aspect-[9/16] rounded-3xl overflow-hidden border border-white/[0.06] bg-[#050505] shadow-2xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <video
                  ref={videoRef}
                  key={current.src}
                  controls
                  autoPlay
                  playsInline
                  muted
                  // Non scaricare nulla finche l'utente non preme play: i file
                  // pesano decine di MB e l'auto-download azzererebbe le Core
                  // Web Vitals della home, soprattutto da mobile.
                  preload="none"
                  poster={current.poster}
                  aria-label={current.label}
                  className="w-full h-full object-cover"
                  onMouseEnter={handleUserInteraction}
                  onTouchStart={handleUserInteraction}
                >
                  <source src={current.src} type="video/mp4" />
                  Il tuo browser non supporta la riproduzione di video.
                </video>
              </motion.div>
            </AnimatePresence>

            {/* Frecce laterali */}
            <button
              type="button"
              onClick={() => {
                prev();
                handleUserInteraction();
              }}
              aria-label="Testimonianza precedente"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/[0.1] text-white/80 hover:text-accent-primary hover:border-accent-primary/40 transition-all active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                next();
                handleUserInteraction();
              }}
              aria-label="Testimonianza successiva"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/[0.1] text-white/80 hover:text-accent-primary hover:border-accent-primary/40 transition-all active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Next slide (peek) */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[18%] z-0">
          <motion.div
            key={slides[nextIndex].id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.4, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="h-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/[0.03] bg-[#050505]"
          >
            <img
              src={slides[nextIndex].poster}
              alt={slides[nextIndex].label}
              className="w-full h-full object-cover opacity-50"
            />
          </motion.div>
        </div>
      </div>

      {/* Didascalia */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-base sm:text-lg font-black italic text-white truncate">{current.name}</p>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">
            {current.context}
          </p>
        </div>

        {/* Indicatori */}
        <div className="flex items-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => {
                goTo(i);
                handleUserInteraction();
              }}
              aria-label={`Vai alla testimonianza ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-accent-primary' : 'w-1.5 bg-white/15 hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Frecce (mobile) */}
      <div className="mt-5 sm:hidden flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            prev();
            handleUserInteraction();
          }}
          aria-label="Testimonianza precedente"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06] text-white active:scale-90 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold text-gray-500 tabular-nums">
          {index + 1} / {slides.length}
        </span>
        <button
          type="button"
          onClick={() => {
            next();
            handleUserInteraction();
          }}
          aria-label="Testimonianza successiva"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06] text-white active:scale-90 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
