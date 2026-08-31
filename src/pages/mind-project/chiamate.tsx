import Link from 'next/link';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import {
  Play,
  ArrowLeft,
  Clock,
  Calendar,
  Users,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CALLS = [
  {
    id: 1,
    title: 'Kickoff — Imposta la Mentalità Giusta',
    date: '15 Gennaio 2026',
    duration: '48:22',
    videoId: 'B_vU9Ua78f0',
    desc: 'La prima chiamata del percorso. Impostiamo le basi, definiamo gli obiettivi e creiamo il tuo manifesto personale.',
  },
  {
    id: 2,
    title: 'Gestione del Tempo e Priorità',
    date: '22 Gennaio 2026',
    duration: '52:10',
    videoId: 'B_vU9Ua78f0',
    desc: 'Come strutturare la giornata per massimizzare risultati. Tecniche di time-blocking and deep work applicate.',
  },
  {
    id: 3,
    title: 'Disciplina vs Motivazione',
    date: '29 Gennaio 2026',
    duration: '45:38',
    videoId: 'B_vU9Ua78f0',
    desc: 'La differenza tra chi resta costante e chi abbandona. Il sistema dei micro-commitments giornalieri.',
  },
  {
    id: 4,
    title: 'Superare i Momenti di Blocco',
    date: '5 Febbraio 2026',
    duration: '50:15',
    videoId: 'B_vU9Ua78f0',
    desc: 'Cosa fare quando non hai voglia, quando tutto sembra inutile. Il protocollo anti-blocco testato sui campioni.',
  },
  {
    id: 5,
    title: 'Identità e Narrativa Personale',
    date: '12 Febbraio 2026',
    duration: '55:03',
    videoId: 'B_vU9Ua78f0',
    desc: 'Riscrivi la storia che ti racconti. Diventa la persona che produce i risultati che desideri.',
  },
  {
    id: 6,
    title: 'Q&A — Le Vostre Domande',
    date: '19 Febbraio 2026',
    duration: '42:18',
    videoId: 'B_vU9Ua78f0',
    desc: 'Risposto a tutte le domande della community. Temi: ansia, costanza, ambiente tossico, confronto sociale.',
  },
  {
    id: 7,
    title: 'Resilienza: Il Segreto dei Campioni',
    date: '26 Febbraio 2026',
    duration: '49:44',
    videoId: 'B_vU9Ua78f0',
    desc: 'Come rimbalzare dopo ogni caduta. Il framework dei 3R: Riconosci, Rielabora, Rilancia.',
  },
  {
    id: 8,
    title: 'Chiusura — Il Tuo Piano 90 Giorni',
    date: '5 Marzo 2026',
    duration: '58:30',
    videoId: 'B_vU9Ua78f0',
    desc: 'La chiamata finale. Costruiamo insieme il tuo piano d\'azione personalizzato per i prossimi 90 giorni.',
  },
];

export default function ChiamateRegistrate() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/user');
        const data = await res.json();
        if (!data.authenticated) {
          router.push('/login?callbackUrl=' + encodeURIComponent(router.asPath));
        } else {
          setIsAuthorized(true);
        }
      } catch {
        router.push('/login?callbackUrl=' + encodeURIComponent(router.asPath));
      }
    };
    checkAuth();
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-16 pb-12 px-3 sm:px-4 animate-pulse">
        <div className="max-w-4xl mx-auto space-y-6 mt-10">
          <div className="space-y-3">
            <div className="w-32 h-4 bg-white/5 rounded" />
            <div className="w-64 h-8 bg-white/5 rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-48 aspect-video bg-white/5 rounded-xl shrink-0" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="w-3/4 h-5 bg-white/5 rounded" />
                  <div className="w-1/2 h-4 bg-white/5 rounded" />
                  <div className="w-1/4 h-4 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Chiamate Registrate — Mind Project"
        description="Playlist completa delle chiamate registrate del percorso Mind Project. Guarda le sessioni di coaching on-demand."
        canonicalUrl="https://mind-prjct.vercel.app/mind-project/chiamate"
      />

      <main className="min-h-screen bg-[#050505] relative">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-primary/[0.03] blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent-primary/[0.02] blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20 sm:pb-24">
          <Link
            href="/services/mind-project"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-accent-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Torna a Mind Project
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-6">
              <Play className="w-3 h-3 text-accent-primary" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary">
                Playlist Esclusiva
              </span>
            </div>
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black italic tracking-tight leading-[1] uppercase mb-5 pr-3 sm:pr-4">
              Chiamate <br />
              <span className="gradient-text">Registrate</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Tutte le sessioni di coaching live registrate. Riguardale quando
              vuoi, approfondisci i temi e integra ciò che impari nei moduli del
              corso.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-accent-primary" />
                <span className="text-xs sm:text-sm font-bold text-gray-400">
                  {CALLS.length} Episodi
                </span>
              </div>
              <div className="w-px h-4 bg-white/[0.08] hidden sm:block" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-primary" />
                <span className="text-xs sm:text-sm font-bold text-gray-400">
                  ~50 min ciascuna
                </span>
              </div>
              <div className="w-px h-4 bg-white/[0.08] hidden sm:block" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-primary" />
                <span className="text-xs sm:text-sm font-bold text-gray-400">
                  +500 Atleti
                </span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4 sm:space-y-5">
            {CALLS.map((call, i) => (
              <motion.div
                key={call.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${call.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-accent-primary/20 hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="relative w-full sm:w-48 md:w-56 aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-[#0a0a0a] shrink-0">
                    <Image
                      src={`https://img.youtube.com/vi/${call.videoId}/mqdefault.jpg`}
                      alt={call.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-accent-primary/90 flex items-center justify-center shadow-[0_0_30px_rgba(255,180,0,0.3)]">
                        <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {call.duration}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black text-accent-primary/60 uppercase tracking-wider">
                        Ep. {String(call.id).padStart(2, '0')}
                      </span>
                      <div className="w-px h-3 bg-white/[0.08]" />
                      <div className="flex items-center gap-1 text-neutral-600">
                        <Calendar className="w-2.5 h-2.5" />
                        <span className="text-[10px] font-bold">{call.date}</span>
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-black italic uppercase tracking-tight text-white group-hover:text-accent-primary transition-colors mb-2">
                      {call.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                      {call.desc}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center shrink-0">
                    <ChevronRight className="w-5 h-5 text-neutral-700 group-hover:text-accent-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 sm:mt-20"
          >
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-4">
              Non hai ancora accesso?
            </p>
            <Link
              href="/services/mind-project"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-accent-primary text-black rounded-2xl font-black text-sm sm:text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,180,0,0.25)] uppercase tracking-wider group"
            >
              Sblocca il Corso Mind Project
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}
