import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Target, Zap, Flame, Brain, ArrowRight, CheckCircle2, BookOpen, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    title: 'Benvenuto nel Mind Project',
    desc: 'Hai fatto il primo passo verso la tua trasformazione. Preparati a diventare la persona che ammiri.',
    icon: Target,
  },
  {
    title: 'Imposta il tuo Obiettivo',
    desc: 'Cosa vuoi raggiungere? Chi vuoi diventare? Nei prossimi giorni costruiremo insieme il tuo piano.',
    icon: Zap,
  },
  {
    title: 'Inizia dal Video Corso',
    desc: 'Il primo modulo ti aspetta. 20 minuti al giorno per attivare il tuo mindset e iniziare il cambiamento.',
    icon: Brain,
  },
  {
    title: 'La Costanza è la Chiave',
    desc: 'Non serve essere perfetti. Serve essere costanti. La Sfida 30 Giorni ti aiuterà a mantenere il ritmo.',
    icon: Flame,
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.push('/academy/mind-project');
    }
  };

  return (
    <>
      <SEO title="Benvenuto — Mind Project" description="Inizia il tuo percorso di trasformazione con Mind Project." />
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 border border-accent-primary/20 flex items-center justify-center mx-auto mb-8">
                {(() => {
                  const Icon = steps[step].icon;
                  return <Icon className="w-9 h-9 text-accent-primary" />;
                })()}
              </div>

              <div className="flex justify-center gap-1.5 mb-8">
                {steps.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-accent-primary' : 'w-1.5 bg-white/[0.08]'}`} />
                ))}
              </div>

              <h1 className="text-3xl font-black italic uppercase tracking-tight mb-4 pr-[0.1em]">
                {steps[step].title}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-sm mx-auto leading-relaxed">
                {steps[step].desc}
              </p>

              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 bg-accent-primary text-black px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,180,0,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {step < steps.length - 1 ? (
                  <><span>Continua</span><ArrowRight className="w-4 h-4" /></>
                ) : (
                  <><span>Inizia il Corso</span><BookOpen className="w-4 h-4" /></>
                )}
              </button>

              <div className="mt-6">
                <Link href="/" className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors underline underline-offset-4">
                  Salta e vai alla Home
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
