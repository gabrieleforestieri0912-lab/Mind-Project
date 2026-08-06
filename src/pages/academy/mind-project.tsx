import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  Lock,
  Play,
  CheckCircle2,
  Clock,
  ChevronRight,
  Brain,
  Sparkles,
} from 'lucide-react';

const MODULES = [
  {
    id: 'fondamenti',
    title: 'Fondamenti del Mindset',
    lessons: [
      { id: '1-1', title: 'Introduzione al Percorso', duration: '12:34', videoId: 'B_vU9Ua78f0' },
      { id: '1-2', title: 'Le 3 Leggi della Mentalità', duration: '18:22', videoId: 'B_vU9Ua78f0' },
      { id: '1-3', title: 'Identità e Autopercezione', duration: '15:48', videoId: 'B_vU9Ua78f0' },
      { id: '1-4', title: 'Il Sistema delle Credenze', duration: '21:10', videoId: 'B_vU9Ua78f0' },
    ],
  },
  {
    id: 'abitudini',
    title: 'Abitudini Atomiche',
    lessons: [
      { id: '2-1', title: 'Micro-commitments: Il Segreto', duration: '14:56', videoId: 'B_vU9Ua78f0' },
      { id: '2-2', title: 'Eliminare le Dipendenze', duration: '19:40', videoId: 'B_vU9Ua78f0' },
      { id: '2-3', title: 'Costruire una Routine Inattaccabile', duration: '16:33', videoId: 'B_vU9Ua78f0' },
      { id: '2-4', title: 'Ambiente e Architettura delle Scelte', duration: '22:05', videoId: 'B_vU9Ua78f0' },
    ],
  },
  {
    id: 'disciplina',
    title: 'Disciplina Incrollabile',
    lessons: [
      { id: '3-1', title: 'Disciplina vs Motivazione', duration: '17:18', videoId: 'B_vU9Ua78f0' },
      { id: '3-2', title: 'Il Protocollo Anti-Blocco', duration: '20:44', videoId: 'B_vU9Ua78f0' },
      { id: '3-3', title: 'Gestione dell\'Energia Mentale', duration: '14:22', videoId: 'B_vU9Ua78f0' },
      { id: '3-4', title: 'Resilienza: Il Superpotere', duration: '23:50', videoId: 'B_vU9Ua78f0' },
    ],
  },
  {
    id: 'azione',
    title: 'Esecuzione e Risultati',
    lessons: [
      { id: '4-1', title: 'Pianificazione Strategica', duration: '16:40', videoId: 'B_vU9Ua78f0' },
      { id: '4-2', title: 'Superare la Paura del Giudizio', duration: '18:55', videoId: 'B_vU9Ua78f0' },
      { id: '4-3', title: 'Allineamento Azioni-Scopo', duration: '15:12', videoId: 'B_vU9Ua78f0' },
      { id: '4-4', title: 'Il Tuo Piano 90 Giorni', duration: '25:30', videoId: 'B_vU9Ua78f0' },
    ],
  },
];

export default function AcademyMindProject() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [expandedModule, setExpandedModule] = useState('fondamenti');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/user');
        const data = await res.json();
        if (!data.authenticated) {
          router.push('/login?callbackUrl=' + encodeURIComponent('/academy/mind-project'));
        } else {
          setIsAuthorized(true);
          const saved = localStorage.getItem('completedLessons');
          if (saved) {
            setCompletedLessons(JSON.parse(saved));
          }
        }
      } catch {
        router.push('/login?callbackUrl=' + encodeURIComponent('/academy/mind-project'));
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLessonComplete = (lessonId: string) => {
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter((id) => id !== lessonId)
      : [...completedLessons, lessonId];
    setCompletedLessons(updated);
    localStorage.setItem('completedLessons', JSON.stringify(updated));
  };

  const allModulesLessons = MODULES.flatMap((m) => m.lessons);
  const totalLessons = allModulesLessons.length;
  const completedCount = completedLessons.length;
  const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-12 px-3 sm:px-4 animate-pulse">
        <div className="max-w-6xl mx-auto mt-10 space-y-6">
          <div className="w-48 h-6 bg-white/5 rounded" />
          <div className="w-full h-64 bg-white/5 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-white/5 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) return null;

  const currentLessonData = currentLesson
    ? allModulesLessons.find((l) => l.id === currentLesson)
    : null;

  return (
    <>
      <Head>
        <title>Il Mio Video Corso — Mind Project</title>
        <meta name="description" content="Accedi al videocorso esclusivo Mind Project. Segui le lezioni, traccia i tuoi progressi e diventa la persona che ammiri." />
      </Head>

      <main className="min-h-screen bg-[#050505] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 text-accent-primary mb-4">
              <Brain className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Area Riservata
              </span>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black italic uppercase tracking-tight leading-[1] mb-4">
              Il Tuo <span className="gradient-text">Video Corso</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl">
              Segui le lezioni al tuo ritmo. Ogni modulo è progettato per portarti un passo più vicino alla versione migliore di te stesso.
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 mb-10"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-primary" />
                <span className="text-sm font-bold">Tuo Progresso</span>
              </div>
              <span className="text-xs font-bold text-accent-primary">
                {completedCount}/{totalLessons} lezioni
              </span>
            </div>
            <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-accent-primary to-accent-primary/60 rounded-full"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar - Module List */}
            <div className="lg:col-span-1 order-2 lg:order-1 space-y-3">
              {MODULES.map((mod, mIdx) => (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: mIdx * 0.1 }}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedModule(expandedModule === mod.id ? '' : mod.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-accent-primary/60">
                        Modulo {mIdx + 1}
                      </span>
                      <h3 className="text-sm font-bold">{mod.title}</h3>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-gray-600 transition-transform shrink-0 ${
                        expandedModule === mod.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {expandedModule === mod.id && (
                    <div className="border-t border-white/[0.04]">
                      {mod.lessons.map((lesson) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        const isActive = currentLesson === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setCurrentLesson(lesson.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-white/[0.03] ${
                              isActive ? 'bg-accent-primary/5 border-l-2 border-accent-primary' : ''
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            ) : (
                              <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                                isActive ? 'border-accent-primary' : 'border-white/20'
                              }`} />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-bold truncate ${
                                isCompleted ? 'text-gray-400' : 'text-white'
                              }`}>
                                {lesson.title}
                              </p>
                              <span className="text-[10px] text-gray-600 font-bold">
                                {lesson.duration}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="pt-3">
                <Link
                  href="/mind-project/chiamate"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-gray-500 hover:text-accent-primary hover:border-accent-primary/20 transition-all text-xs font-bold"
                >
                  <Play className="w-3.5 h-3.5" />
                  Chiamate Registrate
                </Link>
              </div>
            </div>

            {/* Main - Video Player */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              {currentLessonData ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={currentLessonData.id}
                >
                  <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-white/[0.06] shadow-2xl mb-5">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${currentLessonData.videoId}`}
                      title={currentLessonData.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black italic tracking-tight">
                        {currentLessonData.title}
                      </h2>
                      <div className="flex items-center gap-3 mt-1">
                        <Clock className="w-3.5 h-3.5 text-gray-600" />
                        <span className="text-xs font-bold text-gray-600">
                          {currentLessonData.duration}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLessonComplete(currentLessonData.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                        completedLessons.includes(currentLessonData.id)
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {completedLessons.includes(currentLessonData.id)
                        ? 'Completata'
                        : 'Segna come completata'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="aspect-video rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-600 text-sm font-bold">
                      Seleziona una lezione per iniziare
                    </p>
                    <p className="text-gray-700 text-xs mt-1">
                      Scegli un modulo e clicca su una lezione
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
