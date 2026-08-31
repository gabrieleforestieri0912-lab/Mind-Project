import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Zap, Target, Gift, ArrowRight } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import SEO from '@/components/SEO';

const features = [
  'Videochiamata di gruppo settimanale dal vivo con me',
  'Crea quella persona che ammiri e rispetti',
  'Cambia il tuo ambiente con il gruppo privato di Mind Project',
  'Elimina le dipendenze e implementa buone abitudini',
  'Rompi credenze limitanti e supera le tue paure',
  "Supera l'insicurezza e la paura del giudizio altrui",
  'Allinea le tue azioni con il tuo scopo',
];

const plans = [
  {
    name: 'Mensile',
    price: '37€',
    priceValue: 37,
    duration: '/mese',
    highlight: false,
    cta: 'Inizia Ora',
    service: 'MIND PROJECT',
    plan: 'Mensile',
    bonuses: ['Video corso mentalità per apprendere le basi'],
  },
  {
    name: 'Annuale',
    price: '397€',
    priceValue: 397,
    duration: '/anno',
    highlight: false,
    disabled: true,
    badge: 'Offerta a tempo limitato',
    cta: 'Non disponibile',
    service: 'MIND PROJECT',
    plan: 'Annuale',
    bonuses: [
      'Video corso mentalità per apprendere le basi',
      'Videochiamata iniziale 1:1 con me',
      'Accesso a tutte le Videochiamate Registrate (+20 ore)',
    ],
  },
];

export default function MindProjectBase() {
  const productJsonLd = {
    '@type': 'Product',
    '@id': 'https://mind-prjct.vercel.app/services/mind-project#product',
    name: 'Mind Project — Percorso Base di Mindset',
    description:
      'Programma di coaching online per rivoluzionare il mindset, superare le paure e raggiungere gli obiettivi con il supporto della community.',
    image: 'https://mind-prjct.vercel.app/assets/mind-project.png',
    brand: {
      '@type': 'Brand',
      name: 'Mind Project',
    },
    provider: {
      '@type': 'Organization',
      name: 'Mind Project',
      url: 'https://mind-prjct.vercel.app',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Mind Project Mensile',
        price: '37',
        priceCurrency: 'EUR',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://mind-prjct.vercel.app/services/mind-project',
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mind-prjct.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Percorsi', item: 'https://mind-prjct.vercel.app/services' },
      { '@type': 'ListItem', position: 3, name: 'Mind Project Base', item: 'https://mind-prjct.vercel.app/services/mind-project' },
    ],
  };

  return (
    <>
      <SEO
        title="Mind Project Base - Rivoluziona il tuo Mindset"
        description="Il percorso base di Mind Project: videochiamate settimanali di gruppo, community esclusiva e un metodo testato per eliminare le dipendenze, superare le paure e raggiungere i tuoi obiettivi. A partire da 37€/mese."
        canonicalUrl="https://mind-prjct.vercel.app/services/mind-project"
        keywords={['Mind Project base', 'percorso mindset', 'coaching online', 'crescita personale', 'community esclusiva', 'eliminare dipendenze']}
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
      <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/[0.06] blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-cyan-600/[0.04] blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <Target className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                  Il Percorso Base
                </span>
              </div>
              <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black italic uppercase tracking-tighter leading-[0.9] mb-5">
                Rivoluziona il tuo <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Mindset.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
                Il punto di partenza per distruggere le tue paure, implementare abitudini vincenti e prendere il controllo totale della tua vita insieme a una community di persone determinate.
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
                  src="/assets/mind-project.png"
                  alt="Mind Project Base"
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
              className="lg:col-span-7 bg-white/[0.02] border border-white/[0.06] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10"
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight">Cosa Ottieni</h2>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                {features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 + 0.2 }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="lg:col-span-5 grid gap-4 sm:gap-6">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
                    plan.disabled
                      ? 'bg-white/[0.01] border-white/[0.04] opacity-70'
                      : `hover:-translate-y-1 ${plan.highlight
                        ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border-blue-500/30 shadow-xl shadow-blue-500/10'
                        : 'bg-white/[0.02] border-white/[0.06] hover:border-blue-500/20'}`
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 right-4 sm:right-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl sm:text-4xl font-black italic">{plan.price}</span>
                    <span className="text-sm sm:text-base text-gray-500 font-bold">{plan.duration}</span>
                  </div>
                  {plan.disabled ? (
                    <button
                      disabled
                      className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-2 bg-white/[0.03] text-gray-500 border border-white/[0.06]"
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <Link
                      href={`/payment/checkout?service=${encodeURIComponent(plan.service)}&plan=${encodeURIComponent(plan.plan)}&price=${plan.priceValue}`}
                      className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        plan.highlight
                          ? 'bg-white text-[#050505] hover:bg-gray-200 hover:shadow-lg hover:shadow-white/20'
                          : 'bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/[0.08]'
                      }`}
                    >
                      {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {plan.bonuses && plan.bonuses.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-white/[0.06]">
                      <div className="flex items-center gap-2 mb-3">
                        <Gift className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">Bonus Inclusi:</span>
                      </div>
                      <ul className="space-y-1.5">
                        {plan.bonuses.map((bonus, bIdx) => (
                          <li key={bIdx} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-cyan-500 mt-0.5">•</span> {bonus}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="text-center text-[10px] text-gray-600 mt-5 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider">
                    <Shield className="w-3 h-3" /> Pagamento Sicuro
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
