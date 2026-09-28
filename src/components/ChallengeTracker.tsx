import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Cloud, Flame, RotateCcw, Trophy, Zap } from 'lucide-react';

const CHALLENGE_DAYS = 30;

/**
 * Tracker della Sfida 30 Giorni.
 * La sfida è una feature del percorso base Mind Project, non una pagina a sé:
 * vive come tab dentro /academy/mind-project. I dati sono persistiti sulla
 * colonna users.challenge_logs tramite /api/user/challenge.
 */
export default function ChallengeTracker() {
  const [logs, setLogs] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const res = await fetch('/api/user/challenge');
        const data = await res.json();
        setLogs(data.challengeLogs || {});
      } catch {
        setMessage('Impossibile caricare il progresso della sfida');
      } finally {
        setLoading(false);
      }
    };
    loadChallenge();
  }, []);

  const toggleDay = useCallback((dayIndex: number) => {
    const key = String(dayIndex);
    setLogs((prev) => ({ ...prev, [key]: !prev[key] }));
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

  const resetChallenge = async () => {
    if (syncing) return;
    const confirmed = window.confirm(
      'Azzerare la Sfida 30 Giorni? Tutti i giorni completati verranno cancellati e il progresso ripartirà da zero.'
    );
    if (!confirmed) return;
    const empty: Record<string, boolean> = {};
    setLogs(empty);
    setSyncing(true);
    setMessage('');
    try {
      const res = await fetch('/api/user/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: empty }),
      });
      if (!res.ok) throw new Error('reset failed');
      setMessage('Sfida azzerata');
    } catch {
      setMessage('Errore durante il reset');
    } finally {
      setSyncing(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const completedCount = Object.values(logs).filter(Boolean).length;
  const progress = (completedCount / CHALLENGE_DAYS) * 100;

  if (loading) {
    return (
      <div className="max-w-3xl space-y-6 animate-pulse">
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-white/5 rounded-xl" />
          ))}
        </div>
        <div className="h-20 bg-white/5 rounded-2xl" />
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: CHALLENGE_DAYS }).map((_, i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
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
          <span className="text-xs font-bold text-accent-primary">
            {completedCount}/{CHALLENGE_DAYS}
          </span>
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
                aria-label={`Giorno ${i + 1}`}
                aria-pressed={!!isCompleted}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-90 ${
                  isCompleted
                    ? 'bg-accent-primary/20 border border-accent-primary/40 shadow-[0_0_15px_rgba(255,180,0,0.15)]'
                    : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-accent-primary/20'
                }`}
              >
                <span
                  className={`text-[10px] font-black ${
                    isCompleted ? 'text-accent-primary' : 'text-gray-600'
                  }`}
                >
                  {i + 1}
                </span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-accent-primary" />}
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
          disabled={syncing}
          className="flex items-center justify-center gap-2 bg-white/[0.04] border border-white/[0.08] px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-gray-500 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Resetta
        </button>
      </motion.div>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-accent-primary mt-4"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
