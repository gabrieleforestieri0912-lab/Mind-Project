import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Crown, CheckCircle2, Shield, Star, PhoneCall, Gift, ArrowRight } from 'lucide-react';
import React from 'react';
import SEO from '@/components/SEO';
import { MIND_PROJECT_VIP_PLANS } from '@/lib/pricing';

const features = [
  '1 Videochiamata strategica 1:1 con me per comprendere il tuo punto',
  "Piano d'azione per il lancio del tuo servizio personalizzato",
  "Guida all'impacchettamento delle tue offerte",
  '2 Videochiamate di supporto 1:1 con me',
  'Supporto Whatsapp 24/7',
  '3 Videochiamate di gruppo dal vivo ogni settimana con me',
  'Formazione Personal Brand',
  'Impara le abitudini e la mentalità che mi hanno permesso di moltiplicare i miei risultati',
];

const vipBonuses = [
  'Accesso a tutte le chiamate registrate',
  'Accesso a tutti i corsi di MIND PROJECT',
  'Live esclusiva con me',
  'SOS CALL in caso di emergenza',
];

const plans = MIND_PROJECT_VIP_PLANS;

export default function MindProjectVip() {
  const productJsonLd = {
    '@type': 'Product',
    '@id': 'https://mind-prjct.vercel.app/services/mind-project-vip#product',
    name: 'Mind Project VIP — Coaching 1-a-1 Esclusivo',
    description:
      "Accesso totale al programma Mind Project con coaching individuale, supporto 24/7, live esclusive e SOS CALL per risultati straordinari senza compromessi.",
    image: 'https://mind-prjct.vercel.app/assets/mind-project-vip.png',
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
        name: 'VIP Trimestrale',
        price: '197',
        priceCurrency: 'EUR',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://mind-prjct.vercel.app/services/mind-project-vip',
      },
      {
        '@type': 'Offer',
        name: 'VIP Semestrale',
        price: '397',
        priceCurrency: 'EUR',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://mind-prjct.vercel.app/services/mind-project-vip',
      },
      {
        '@type': 'Offer',
        name: 'VIP Annuale',
        price: '697',
        priceCurrency: 'EUR',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://mind-prjct.vercel.app/services/mind-project-vip',
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mind-prjct.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Percorsi', item: 'https://mind-prjct.vercel.app/services' },
      { '@type': 'ListItem', position: 3, name: 'Mind Project VIP', item: 'https://mind-prjct.vercel.app/services/mind-project-vip' },
    ],
  };

  return (
    <>
      <SEO
        title="Mind Project VIP: Coaching 1-a-1 Elite"
        description="Il livello definitivo Mind Project con coaching 1-a-1, supporto 24/7, live esclusive e SOS CALL. Da 197€/3 mesi."
        canonicalUrl="https://mind-prjct.vercel.app/services/mind-project-vip"
        keywords={['Mind Project VIP', 'coaching 1 a 1', 'coaching privato', 'supporto 24/7', 'mindset esclusivo', 'programma elite']}
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
      <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/[0.05] blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-violet-600/[0.04] blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Crown className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                  Esclusivo
                </span>
              </div>
              <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black italic uppercase tracking-tighter leading-[0.9] mb-5">
                L'Esperienza <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-400 to-purple-600">Definitiva.</span>
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
                  src="/assets/mind-project-vip.png"
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full" />
                <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-400 flex items-center justify-center">
                    <Star className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight">Privilegi VIP</h2>
                </div>
                <ul className="space-y-3 sm:space-y-4 relative z-10">
                  {features.map((feature, idx) => {
                    const isSpecial = feature.includes('SOS CALL') || feature.includes('1:1') || feature.includes('1 a 1');
                    return (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 + 0.2 }}
                        className={`flex items-start gap-3 sm:gap-4 p-3 rounded-xl transition-colors ${isSpecial ? 'bg-purple-500/5 border border-purple-500/10' : ''}`}
                      >
                        {isSpecial ? (
                          <PhoneCall className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-purple-500/70 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm sm:text-base ${isSpecial ? 'text-purple-100 font-bold' : 'text-gray-300'}`}>{feature}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-violet-900/10 border border-purple-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <Gift className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg sm:text-xl font-black italic uppercase tracking-tight text-purple-400">Bonus Inclusi</h3>
                </div>
                <ul className="space-y-3">
                  {vipBonuses.map((bonus, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-300">
                      <span className="text-purple-500 mt-1 shrink-0">•</span>
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
                      ? 'bg-gradient-to-br from-purple-900/30 to-violet-900/20 border-purple-500/30 shadow-2xl shadow-purple-500/10'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-purple-500/20'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 right-4 sm:right-6 bg-gradient-to-r from-purple-400 to-fuchsia-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-purple-500/20">
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-3xl sm:text-4xl font-black italic">{plan.price}</span>
                    <span className="text-sm sm:text-base text-gray-500 font-bold">{plan.duration}</span>
                  </div>

                  <div className="mb-5 mt-auto">
                    <p className="text-[10px] font-black uppercase tracking-wider text-purple-500/80 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" /> + Tutti i Bonus Inclusi
                    </p>
                  </div>

                  <Link
                    href={`/payment/checkout?service=${encodeURIComponent(plan.service)}&plan=${encodeURIComponent(plan.plan)}&price=${plan.priceValue}`}
                    className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-purple-400 to-fuchsia-500 text-black hover:from-purple-300 hover:to-fuchsia-400 shadow-lg shadow-purple-500/20'
                        : 'bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/[0.08]'
                    }`}
                  >
                    {plan.cta} {plan.highlight ? <Crown className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
