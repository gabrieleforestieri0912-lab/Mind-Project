import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Trophy, Zap, Cloud, RotateCcw } from 'lucide-react';

const CHALLENGE_DAYS = 30;

export default function ChallengePage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<Record<string, boolean>>({});
  const [startDate, setStartDate] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/user');
        const data = await res.json();
        if (!data.authenticated) {
          router.push('/login?callbackUrl=' + encodeURIComponent('/habit/challenge'));
        } else {
          const pRes = await fetch('/api/user/challenge');
          const pData = await pRes.json();
          setLogs(pData.challengeLogs || {});
          setStartDate(pData.startDate || new Date().toISOString().split('T')[0]);
          setIsAuthorized(true);
        }
      } catch {
        router.push('/login?callbackUrl=' + encodeURIComponent('/habit/challenge'));
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const toggleDay = useCallback((dayIndex: number) => {
    const key = String(dayIndex);
    setLogs((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('challengeLogs', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const syncToCloud = async () => {
    setSyncing(true);
    setMessage('');
    try {
      const res = await fetch('/api/user/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs }),
      });
      const data = await res.json();
      setMessage(data.message || 'Salvato!');
    } catch {
      setMessage('Errore durante il salvataggio');
    } finally {
      setSyncing(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const resetChallenge = () => {
    setLogs({});
    localStorage.removeItem('challengeLogs');
  };

  const completedCount = Object.values(logs).filter(Boolean).length;
  const progress = (completedCount / CHALLENGE_DAYS) * 100;

  const dayLabels = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-16 px-3 sm:px-4 animate-pulse">
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
          <div className="w-48 h-6 bg-white/5 rounded" />
          <div className="w-full h-4 bg-white/5 rounded-full" />
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="aspect-square bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <>
      <Head>
        <title>Sfida 30 Giorni — Mind Project</title>
        <meta name="description" content="La Sfida 30 Giorni di Mind Project. 30 giorni per trasformare le tue abitudini e costruire disciplina incrollabile." />
      </Head>

      <main className="min-h-screen bg-[#050505] text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 sm:py-28">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-5">
              <Flame className="w-4 h-4 text-accent-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary">
                Sfida 30 Giorni
              </span>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-black italic uppercase tracking-tight leading-[1] mb-3">
              Costruisci la <span className="gradient-text">Disciplina</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
              Segna ogni giorno in cui completi la tua azione chiave. 30 giorni per trasformare una scelta in una parte di te.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-center">
              <Trophy className="w-5 h-5 text-accent-primary mx-auto mb-1.5" />
              <p className="text-2xl font-black">{completedCount}</p>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Completati</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-center">
              <Zap className="w-5 h-5 text-accent-primary mx-auto mb-1.5" />
              <p className="text-2xl font-black">{CHALLENGE_DAYS - completedCount}</p>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Rimanenti</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-center">
              <Flame className="w-5 h-5 text-accent-primary mx-auto mb-1.5" />
              <p className="text-2xl font-black">{Math.round(progress)}%</p>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Progresso</p>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500">Progresso Giornaliero</span>
              <span className="text-xs font-bold text-accent-primary">{completedCount}/{CHALLENGE_DAYS}</span>
            </div>
            <div className="w-full h-3 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-accent-primary to-accent-primary/60 rounded-full"
              />
            </div>
          </motion.div>

          {/* Calendar Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 mb-6"
          >
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: CHALLENGE_DAYS }).map((_, i) => {
                const key = String(i);
                const isCompleted = logs[key];
                return (
                  <button
                    key={i}
                    onClick={() => toggleDay(i)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-90 ${
                      isCompleted
                        ? 'bg-accent-primary/20 border border-accent-primary/40 shadow-[0_0_15px_rgba(255,180,0,0.15)]'
                        : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-accent-primary/20'
                    }`}
                  >
                    <span className={`text-[10px] font-black ${
                      isCompleted ? 'text-accent-primary' : 'text-gray-600'
                    }`}>
                      {i + 1}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={syncToCloud}
              disabled={syncing}
              className="flex-1 flex items-center justify-center gap-2 bg-accent-primary text-black px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,180,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              <Cloud className="w-4 h-4" />
              {syncing ? 'Salvataggio...' : 'Salva su Cloud'}
            </button>
            <button
              onClick={resetChallenge}
              className="flex items-center justify-center gap-2 bg-white/[0.04] border border-white/[0.08] px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-gray-500 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Resetta
            </button>
          </motion.div>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xs font-bold text-accent-primary mt-4"
            >
              {message}
            </motion.p>
          )}
        </div>
      </main>
    </>
  );
}
