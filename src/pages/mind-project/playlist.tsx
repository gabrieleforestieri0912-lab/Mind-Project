'use client';
import Link from 'next/link';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const PLAYLIST_ID = 'PLyWyAtaIuxRC9RnZnRyKmNI8dw-3_f0vl';
const EMBED_URL = `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}`;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

export default function PlaylistPage() {
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
        <div className="max-w-5xl mx-auto space-y-6 mt-10">
          <div className="w-48 h-6 bg-white/5 rounded" />
          <div className="w-full h-64 bg-white/5 rounded-2xl" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-20 bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Videochiamate Registrate - Mind Project"
        description="Playlist esclusiva delle videochiamate registrate del programma Mind Project. Approfondimenti, Q&A e strategie di performance."
        canonicalUrl="https://mind-prjct.vercel.app/mind-project/playlist"
        keywords={['videochiamate registrate', 'mind project playlist', 'coaching mentale', 'registrazioni']}
      />

      <main className="min-h-screen bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-primary/[0.03] blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/[0.03] blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 relative z-10">
          <Link
            href="/services/mind-project"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-accent-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Torna a Mind Project
            </span>
          </Link>

          <motion.section {...fadeInUp} className="text-center lg:text-left mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-6">
              <Sparkles className="w-3 h-3 text-accent-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary">Archivio Esclusivo</span>
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black italic tracking-tighter leading-[1] uppercase mb-6">
              Videochiamate <br />
              <span className="gradient-text">Registrate</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Approfondisci i concetti chiave del programma Mind Project. Accedi alle sessioni di coaching registrate per un'immersione completa nella mentalità d'élite.
            </p>
          </motion.section>

          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/[0.06]">
              <iframe
                className="w-full h-full"
                src={EMBED_URL}
                title="Mind Project - Videochiamate Registrate Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-gray-600 text-center mt-4">
              Puoi controllare la playlist direttamente su YouTube per vedere tutti i video.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
