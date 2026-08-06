import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Crown, CheckCircle2, Shield, Star, PhoneCall, Gift, ArrowRight } from 'lucide-react';
import React from 'react';

const features = [
  '2 Videochiamate 1 a 1 con me',
  '3 Videochiamate di gruppo ogni settimana',
  'Supporto completo',
  'Live esclusiva con me',
  'Supporto 24/7',
  'SOS CALL in caso di emergenza',
];

const vipBonuses = [
  'Accesso a tutte le chiamate registrate',
  'Accesso a tutti i corsi di MIND PROJECT (Video corso mentalità e altri)',
];

const plans = [
  {
    name: 'Trimestrale',
    price: '197€',
    duration: '/3 mesi',
    highlight: false,
    cta: 'Diventa VIP',
  },
  {
    name: 'Semestrale',
    price: '397€',
    duration: '/6 mesi',
    highlight: false,
    cta: 'Diventa VIP',
  },
  {
    name: 'Annuale',
    price: '697€',
    duration: '/anno',
    highlight: true,
    badge: 'La Scelta dei Leader',
    cta: 'Accedi al Massimo Livello',
  },
];

export default function MindProjectVip() {
  return (
    <>
      <Head>
        <title>Mind Project VIP - L'Elite del Mindset</title>
        <meta name="description" content="Accesso esclusivo, coaching 1-a-1 e supporto h24. Il livello definitivo di Mind Project." />
      </Head>
      <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/[0.05] blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-yellow-600/[0.04] blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                  Esclusivo
                </span>
              </div>
              <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black italic uppercase tracking-tighter leading-[0.9] mb-5">
                L'Esperienza <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600">Definitiva.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
                Non accontentarti della media. Accesso diretto, coaching privato e supporto d'emergenza. Questo è il percorso per chi esige risultati straordinari, senza compromessi.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative aspect-square md:aspect-video lg:aspect-square w-full max-w-lg mx-auto rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl">
                <Image
                  src="/assets/Image/mind-project-vip.png"
                  alt="Mind Project VIP"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/80 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden mb-6 sm:mb-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full" />
                <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center">
                    <Star className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight">Privilegi VIP</h2>
                </div>
                <ul className="space-y-3 sm:space-y-4 relative z-10">
                  {features.map((feature, idx) => {
                    const isSpecial = feature.includes('SOS CALL') || feature.includes('1 a 1');
                    return (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 + 0.2 }}
                        className={`flex items-start gap-3 sm:gap-4 p-3 rounded-xl transition-colors ${isSpecial ? 'bg-amber-500/5 border border-amber-500/10' : ''}`}
                      >
                        {isSpecial ? (
                          <PhoneCall className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-amber-500/70 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm sm:text-base ${isSpecial ? 'text-amber-100 font-bold' : 'text-gray-300'}`}>{feature}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-yellow-900/10 border border-amber-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <Gift className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg sm:text-xl font-black italic uppercase tracking-tight text-amber-400">Bonus Inclusi</h3>
                </div>
                <ul className="space-y-3">
                  {vipBonuses.map((bonus, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-300">
                      <span className="text-amber-500 mt-1 shrink-0">•</span>
                      <span>{bonus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <div className="lg:col-span-5 grid gap-4 sm:gap-6">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                    plan.highlight
                      ? 'bg-gradient-to-br from-amber-900/30 to-yellow-900/20 border-amber-500/30 shadow-2xl shadow-amber-500/10'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-amber-500/20'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 right-4 sm:right-6 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-amber-500/20">
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-3xl sm:text-4xl font-black italic">{plan.price}</span>
                    <span className="text-sm sm:text-base text-gray-500 font-bold">{plan.duration}</span>
                  </div>

                  <div className="mb-5 mt-auto">
                    <p className="text-[10px] font-black uppercase tracking-wider text-amber-500/80 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" /> + Tutti i Bonus Inclusi
                    </p>
                  </div>

                  <button className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/20'
                      : 'bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/[0.08]'
                  }`}>
                    {plan.cta} {plan.highlight ? <Crown className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
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
