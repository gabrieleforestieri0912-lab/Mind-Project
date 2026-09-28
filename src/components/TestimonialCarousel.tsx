'use client';

import { useCallback, useState } from 'react';
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

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1);
      setIndex(next);
    },
    [index, slides.length]
  );

  const next = () => goTo(index === slides.length - 1 ? 0 : index + 1);
  const prev = () => goTo(index === 0 ? slides.length - 1 : index - 1);

  if (slides.length === 0) return null;

  const current = slides[index];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Video attivo */}
      <div className="relative aspect-[9/16] sm:aspect-video rounded-3xl sm:rounded-4xl overflow-hidden border border-white/[0.06] bg-[#050505] shadow-2xl">
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
              key={current.src}
              controls
              playsInline
              // Non scaricare nulla finche l'utente non preme play: i file
              // pesano decine di MB e l'auto-download azzererebbe le Core
              // Web Vitals della home, soprattutto da mobile.
              preload="none"
              poster={current.poster}
              aria-label={current.label}
              className="w-full h-full object-cover"
            >
              <source src={current.src} type="video/mp4" />
              Il tuo browser non supporta la riproduzione di video.
            </video>
          </motion.div>
        </AnimatePresence>

        {/* Frecce laterali (desktop) */}
        <button
          type="button"
          onClick={prev}
          aria-label="Testimonianza precedente"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 hidden sm:flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/[0.1] text-white/80 hover:text-accent-primary hover:border-accent-primary/40 transition-all active:scale-90"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Testimonianza successiva"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 hidden sm:flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/[0.1] text-white/80 hover:text-accent-primary hover:border-accent-primary/40 transition-all active:scale-90"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
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
              onClick={() => goTo(i)}
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
          onClick={prev}
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
          onClick={next}
          aria-label="Testimonianza successiva"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06] text-white active:scale-90 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
