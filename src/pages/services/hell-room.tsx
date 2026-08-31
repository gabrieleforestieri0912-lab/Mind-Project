import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Lock, Gift, ShieldCheck, ArrowRight } from 'lucide-react';
import React from 'react';
import SEO from '@/components/SEO';

const features = [
  { icon: Flame, text: 'Challenge dei 90 giorni per nuove abitudini' },
  { icon: ShieldCheck, text: 'Mentalità dura e impenetrabile in 90 giorni' },
  { icon: Lock, text: 'Controllo giornaliero sul gruppo esclusivo' },
  { icon: CheckCircle2, text: 'Elimina ogni vizio e costruisci una disciplina incrollabile' },
];

const pathFeatures = [
  "2 Videochiamate mensili di gruppo dove ti spiego le basi della mentalità e rispondo alle tue domande",
  "Videochiamata mensile 1 a 1 con me dove revisionerò la tua situazione per aiutarti a diventare il migliore",
  "Accesso al gruppo esclusivo su WhatsApp con persone affamate e disciplinate",
  "Challenge dei 90 giorni per instaurare le nuove abitudini che ti servono per cambiare la tua vita",
  "Controllo giornaliero sul gruppo esclusivo per verificare che tu non fallisca in nulla",
  "Ti aiuto a costruire una mentalità dura e impenetrabile in 90 giorni per sbloccare qualsiasi risultato desideri",
  "Elimina ogni tipo di vizio e costruisci una disciplina incrollabile",
  "Sblocca tutti i tuoi obiettivi e smettila di procrastinare con la tua nuova mentalità",
];

const bonuses = [
  '3 Mesi di Mind Project inclusi (Valore 147€)',
  'Corso sulla mentalità incluso (Valore 100€)',
  'Accesso completo alle chiamate registrate per non perderti niente',
  'Template delle abitudini non negoziabili',
  '3 Mesi nel percorso più esclusivo Mind Project VIP con supporto 1 a 1 (Valore 197€)',
  'Impostazione personalizzata del tuo personal brand',
];

export default function HellRoom() {
  const breadcrumbJsonLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mind-prjct.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Percorsi', item: 'https://mind-prjct.vercel.app/services' },
      { '@type': 'ListItem', position: 3, name: 'Hell Room', item: 'https://mind-prjct.vercel.app/services/hell-room' },
    ],
  };

  return (
    <>
      <SEO
        title="Hell Room - Mind Project"
        description="L'intensivo di 90 giorni di Mind Project per costruire una mentalità dura e impenetrabile. Iscrizioni attualmente chiuse."
        canonicalUrl="https://mind-prjct.vercel.app/services/hell-room"
        keywords={['hell room', 'mentalità dura', 'challenge 90 giorni', 'disciplina', 'mindset intenso']}
        noIndex
        jsonLd={[breadcrumbJsonLd]}
      />
      <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-red-700/[0.06] blur-[120px] rounded-full" />
          <div className="absolute bottom-[0%] left-[-10%] w-[40%] h-[40%] bg-orange-600/[0.04] blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
                  Intensivo 90 Giorni
                </span>
              </div>
              <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black italic uppercase tracking-tighter leading-[0.9] mb-5">
                Hell <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Room.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
                Costruisci una mentalità dura e impenetrabile in 90 giorni. L'intensivo più estremo di Mind Project, con controllo giornaliero e supporto costante. Disponibilità limitata a 5 posti.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {features.map((F, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                      <F.icon className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-300">{F.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/[0.06] border border-red-500/20">
                <Lock className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-sm font-black uppercase tracking-wider text-red-400">Iscrizioni Chiuse</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative aspect-video lg:aspect-[4/3] w-full mx-auto rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl">
                <Image
                  src="/assets/hell-room.png"
                  alt="Hell Room"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/80 via-[#050505]/20 to-transparent" />
              </div>
            </motion.div>
          </div>

          <div className="mt-8 sm:mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 mb-4 block">
                Cosa Include
              </span>
              <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight mb-4 pr-[0.1em]">
                L'Intensivo <span className="gradient-text">Estremo</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                Tutto ciò che ti serve per distruggere i tuoi limiti in 90 giorni. Attualmente non disponibile.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-white/[0.06] flex flex-col"
              >
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-2">Intensivo 90 Giorni</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl sm:text-4xl font-black italic">750€</span>
                    <span className="text-sm sm:text-base text-gray-500 font-bold">/una tantum</span>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                  {pathFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-gray-600" />
                      <span className="text-gray-300 text-sm sm:text-base">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-6 sm:mb-8 pt-5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-400">Bonus Inclusi:</span>
                  </div>
                  <ul className="space-y-2">
                    {bonuses.map((bonus, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-red-500 mt-0.5">🎁</span> {bonus}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  disabled
                  className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-2 bg-white/[0.03] text-gray-500 border border-white/[0.06] mt-auto"
                >
                  <Lock className="w-3.5 h-3.5" /> Posti Esauriti
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}