import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, TrendingUp, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';
import React from 'react';

const features = [
  { icon: TrendingUp, text: 'Ottimizzazione dei Processi Aziendali' },
  { icon: BarChart3, text: 'Scalabilità e Incremento Fatturato' },
  { icon: ShieldCheck, text: 'Sistemi di Controllo e Sicurezza' },
  { icon: Briefcase, text: 'Consulenza Strategica Direzionale' },
];

const plans = [
  {
    name: 'Standard',
    price: '29€',
    duration: '/mese',
    highlight: false,
    features: ['Implementazione protocollo base', 'Supporto via email entro 48h', 'Accesso alla documentazione'],
    cta: 'Inizia Ora',
  },
  {
    name: 'Advanced',
    price: '59€',
    duration: '/mese',
    highlight: true,
    badge: 'Consigliato',
    features: ['Implementazione protocollo completa', 'Supporto Priority Live (24h)', 'Audit mensile personalizzato', 'Accesso al network esclusivo'],
    cta: 'Scegli Advanced',
  },
];

export default function BusinessProtocol() {
  return (
    <>
      <Head>
        <title>Business Protocol - Ottimizza il tuo Business</title>
        <meta name="description" content="Soluzioni avanzate per ottimizzare i processi aziendali e scalare il tuo business." />
      </Head>
      <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/[0.05] blur-[120px] rounded-full" />
          <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[40%] bg-teal-600/[0.04] blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                  Per le Aziende
                </span>
              </div>
              <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black italic uppercase tracking-tighter leading-[0.9] mb-5">
                Scala il tuo <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Business.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
                Struttura la tua azienda con i protocolli esatti utilizzati dai leader di mercato. Ottimizza i processi, riduci gli sprechi e massimizza i profitti in modo prevedibile.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {features.map((F, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <F.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-300">{F.text}</span>
                  </div>
                ))}
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
                  src="/assets/Image/content.jpg"
                  alt="Business Protocol"
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mb-4 block">
                Piani di Implementazione
              </span>
              <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight mb-4 pr-[0.1em]">
                Scegli il <span className="gradient-text">Tuo Livello</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                Seleziona il supporto più adatto alla struttura attuale della tua azienda.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className={`relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                    plan.highlight
                      ? 'bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border-emerald-500/30 shadow-2xl shadow-emerald-500/10'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-emerald-500/20'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-emerald-500/20">
                      {plan.badge}
                    </div>
                  )}

                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl sm:text-4xl font-black italic">{plan.price}</span>
                      <span className="text-sm sm:text-base text-gray-500 font-bold">{plan.duration}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? 'text-emerald-400' : 'text-gray-600'}`} />
                        <span className="text-gray-300 text-sm sm:text-base">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 mt-auto ${
                    plan.highlight
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                      : 'bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/[0.08]'
                  }`}>
                    {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
