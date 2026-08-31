'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CalendarIcon, PlayCircle, Lock, Phone, Star, Settings, Trophy, Flame, Zap, CheckCircle2, Award, ChevronRight, CheckSquare, Square, X } from 'lucide-react';
import SEO from '@/components/SEO';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  bio?: string;
  role?: string;
  subscriptionType?: string;
  isVip?: boolean;
  mindsetLevel?: number;
  workoutProgress?: number;
  createdAt?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const COURSE_MODULES = [
  { id: 'm1', title: 'Modulo 1: La Fondazione Alpha', desc: "Imposta gli obiettivi di performance ed elimina le credenze limitanti." },
  { id: 'm2', title: 'Modulo 2: Routine ed Efficacia', desc: 'Ottimizza il sonno, sveglia all\'alba e time-blocking operativo.' },
  { id: 'm3', title: 'Modulo 3: Nutrizione & Fisiologia', desc: 'Alimentazione d\'élite per focus cognitivo prolungato e costanza.' },
  { id: 'm4', title: 'Modulo 4: Resilienza Inarrestabile', desc: 'Strategie mentali per superare blocchi e imprevisti sotto pressione.' },
];

export default function Profile() {
  const router = useRouter();
  const { session } = useSupabaseAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (!session?.user) {
      router.push('/login?callbackUrl=' + encodeURIComponent(router.asPath));
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/user');
        const data = await response.json();
        if (data.authenticated) {
          setUser(data.user);
          const progress = data.user.workoutProgress || 0;
          const completedCount = Math.round(progress / 25);
          const initialCompleted: Record<string, boolean> = {};
          COURSE_MODULES.forEach((mod, idx) => {
            if (idx < completedCount) {
              initialCompleted[mod.id] = true;
            }
          });
          setCompletedModules(initialCompleted);
        }
      } catch (err) {
        console.error('Fetch user failed', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [session, router]);

  const getMindsetGrade = (level: number) => {
    if (level < 2) return 'Membro Novizio';
    if (level < 4) return 'Performer Alpha';
    return 'Top Performer';
  };

  const handleModuleToggle = async (moduleId: string, index: number) => {
    const updatedCompleted = { ...completedModules, [moduleId]: !completedModules[moduleId] };

    COURSE_MODULES.forEach((mod, idx) => {
      if (updatedCompleted[moduleId]) {
        if (idx <= index) updatedCompleted[mod.id] = true;
      } else {
        if (idx >= index) updatedCompleted[mod.id] = false;
      }
    });

    setCompletedModules(updatedCompleted);

    const completedCount = Object.values(updatedCompleted).filter(Boolean).length;
    const newProgress = completedCount * 25;
    const newLevel = Math.min(completedCount + 1, 5);

    setUser((prev) => prev ? { ...prev, workoutProgress: newProgress, mindsetLevel: newLevel } : prev);

    try {
      await fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workoutProgress: newProgress, mindsetLevel: newLevel }),
      });
    } catch (err) {
      console.error('Errore durante l\'aggiornamento del progresso su DB:', err);
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setIsBookingOpen(false);
      setBookingSuccess(false);
      setSelectedSlot('');
    }, 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-3 sm:px-4 animate-pulse">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-4 bg-white/5 rounded-full" />
            <div className="w-48 h-8 bg-white/5 rounded-lg" />
          </div>
          <div className="glass-card p-5 sm:p-6 md:p-8 flex flex-col items-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-white/5" />
            <div className="w-40 h-6 bg-white/5 rounded-full" />
            <div className="w-64 h-4 bg-white/5 rounded-full" />
            <div className="flex gap-4">
              <div className="w-40 h-10 bg-white/5 rounded-lg" />
              <div className="w-40 h-10 bg-white/5 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Profilo"
        description="Il tuo profilo Mind Project. Monitora i tuoi progressi e gestisci il tuo account."
        canonicalUrl="https://mind-prjct.vercel.app/profile"
      />
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-14 sm:py-16 space-y-8 sm:space-y-12">
        <motion.section {...fadeInUp} className="text-center">
          <span className="category-tag justify-center">Area Riservata</span>
          <h1 className="section-title mb-4">
            Il Tuo <span className="gradient-text">Profilo</span>
          </h1>
        </motion.section>

        <motion.div
          className="glass-card p-5 sm:p-6 md:p-8 text-center relative overflow-hidden group"
          {...fadeInUp}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent" />

          <div className="relative inline-block mb-6 sm:mb-8">
            <div className="absolute inset-0 bg-accent-primary/[0.08] blur-2xl rounded-full" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-xl border border-accent-primary/20 p-1 group-hover:rotate-2 transition-all duration-500">
              <div className="w-full h-full rounded-lg overflow-hidden bg-neutral-900 border border-white/[0.06] flex items-center justify-center">
                {user?.image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={user.image}
                      className="object-cover group-hover:scale-[1.03] transition-all duration-500"
                      alt="Profile"
                      fill
                      sizes="96px"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-accent-primary font-black text-2xl uppercase italic tracking-tighter">
                    {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'MP'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <h2 className="text-xl md:text-3xl font-black mb-3 italic uppercase tracking-tighter text-white">
            {user?.name || user?.email}
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            {user?.bio || 'Membro d\'élite del Mind Project. Il tuo viaggio verso la miglior versione di te stesso è inarrestabile.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary min-w-[200px]"
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              Prenota Sessione Live
            </button>
            <Link
              href="/settings"
              className="btn-glass min-w-[200px]"
            >
              <Settings className="w-3.5 h-3.5" />
              Impostazioni
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <motion.div className="glass-card p-4 sm:p-5" {...fadeInUp}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.15em] mb-4 text-accent-primary">
              Stato Percorso
            </h3>
            <div className="space-y-3">
              <p className="text-gray-400 text-xs">
                Progresso allenamento:{' '}
                <span className="text-white font-black text-base">
                  {user?.workoutProgress || 0}%
                </span>
              </p>
              <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent-primary shadow-[0_0_8px_rgba(255,180,0,0.3)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${user?.workoutProgress || 0}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div className="glass-card p-4 sm:p-5" {...fadeInUp}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.15em] mb-4 text-accent-primary">
              Mindset Level
            </h3>
            <div className="space-y-3">
              <p className="text-gray-400 text-xs">
                Grado attuale:{' '}
                <span className="text-white font-black uppercase text-sm">
                  {getMindsetGrade(user?.mindsetLevel || 0)}
                </span>
              </p>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-1000 ${
                      i <= (user?.mindsetLevel || 0)
                        ? 'bg-accent-primary shadow-[0_0_5px_rgba(255,180,0,0.3)]'
                        : 'bg-white/[0.04]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="glass-card p-5 sm:p-6" {...fadeInUp}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-accent-primary">
              Bacheca Trofei
            </h3>
            <Trophy className="w-4 h-4 text-accent-primary" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 1, name: 'Primo Passo', desc: 'Hai iniziato il tuo viaggio', icon: <CheckCircle2 className="w-6 h-6" />, unlocked: (user?.workoutProgress || 0) > 0 || (user?.mindsetLevel || 0) > 0 },
              { id: 2, name: 'Costanza', desc: 'Livello Mindset 2 Raggiunto', icon: <Flame className="w-6 h-6" />, unlocked: (user?.mindsetLevel || 0) >= 2 },
              { id: 3, name: 'Inarrestabile', desc: 'Metà del percorso completato', icon: <Zap className="w-6 h-6" />, unlocked: (user?.workoutProgress || 0) >= 50 },
              { id: 4, name: 'Elite', desc: 'Livello Massimo Raggiunto', icon: <Star className="w-6 h-6" />, unlocked: (user?.mindsetLevel || 0) >= 5 },
            ].map((badge) => (
              <div
                key={badge.id}
                className={`relative flex flex-col items-center p-4 rounded-xl border transition-all duration-500 ${
                  badge.unlocked
                    ? 'bg-accent-primary/10 border-accent-primary/30 shadow-[0_0_15px_rgba(255,180,0,0.1)]'
                    : 'bg-white/[0.02] border-white/[0.04] opacity-50 grayscale'
                }`}
              >
                <div className={`mb-3 p-3 rounded-full ${badge.unlocked ? 'bg-accent-primary/20 text-accent-primary' : 'bg-white/5 text-gray-500'}`}>
                  {badge.icon}
                </div>
                <h4 className="text-xs font-black uppercase mb-1 text-center text-white">{badge.name}</h4>
                <p className="text-[9px] text-gray-400 text-center uppercase tracking-wider">{badge.desc}</p>
                {!badge.unlocked && <Lock className="absolute top-2 right-2 w-3 h-3 text-gray-600" />}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.section className="space-y-4" {...fadeInUp}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-2xl font-black italic uppercase tracking-tight">
              Moduli del Corso & Academy
            </h2>
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-accent-primary">
              Studio & Pratica
            </span>
          </div>

          <div className="grid gap-3">
            {COURSE_MODULES.map((mod, index) => {
              const isCompleted = completedModules[mod.id];
              return (
                <div
                  key={mod.id}
                  onClick={() => handleModuleToggle(mod.id, index)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isCompleted
                      ? 'bg-accent-primary/5 border-accent-primary/20 hover:bg-accent-primary/10'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'
                  }`}
                >
                  <div className="pt-0.5 text-accent-primary shrink-0">
                    {isCompleted ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-700" />
                    )}
                  </div>
                  <div>
                    <h3 className={`text-sm sm:text-base font-bold transition-all ${isCompleted ? 'text-accent-primary italic line-through' : 'text-white'}`}>
                      {mod.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        <AnimatePresence>
          {isBookingOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden"
              >
                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                  <Award className="w-8 h-8 text-accent-primary mx-auto mb-3" />
                  <h3 className="text-xl font-black italic uppercase text-white">
                    Prenota Coaching Live
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Scegli uno slot per la tua sessione individuale con Gabriele.
                  </p>
                </div>

                {bookingSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/[0.08] border border-green-500/20 p-5 rounded-xl text-center space-y-2"
                  >
                    <p className="text-green-400 font-bold text-sm">Sessione Prenotata con Successo!</p>
                    <p className="text-xs text-gray-500">Riceverai un link Zoom via email a breve.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-wider text-gray-600">
                        Seleziona Giorno & Orario
                      </label>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        required
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 focus:outline-none focus:border-accent-primary text-sm text-white"
                      >
                        <option value="" disabled className="bg-[#0a0a0a]">Scegli una data...</option>
                        <option value="lun_10" className="bg-[#0a0a0a]">Lunedì 25 Maggio — 10:00</option>
                        <option value="lun_16" className="bg-[#0a0a0a]">Lunedì 25 Maggio — 16:00</option>
                        <option value="mer_11" className="bg-[#0a0a0a]">Mercoledì 27 Maggio — 11:00</option>
                        <option value="gio_15" className="bg-[#0a0a0a]">Giovedì 28 Maggio — 15:00</option>
                        <option value="ven_09" className="bg-[#0a0a0a]">Venerdì 29 Maggio — 09:00</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-accent-primary text-black rounded-lg font-black text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,180,0,0.2)] uppercase tracking-wider"
                    >
                      Conferma Appuntamento
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
