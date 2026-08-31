import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, Users, Target, Crown, Gift, ArrowRight, Brain } from 'lucide-react';
import React from 'react';
import SEO from '@/components/SEO';

const features = [
  { icon: Rocket, text: 'Monetizza la tua passione con il Personal Brand' },
  { icon: Users, text: 'Community esclusiva su WhatsApp con persone affamate' },
  { icon: Brain, text: 'Mentalità per monetizzare la tua passione in meno di 4 mesi' },
  { icon: Target, text: "Piano d'azione su misura per i tuoi obiettivi economici" },
];

const pathFeatures = [
  '2 Videochiamate di gruppo dal vivo ogni settimana con me',
  'Community esclusiva con persone affamate su Whatsapp',
  'Scopri come attrarre clienti, creare il tuo Personal Brand e monetizzarlo',
  'Apprendi la mentalità che mi ha permesso di monetizzare la mia passione in meno di 4 mesi',
  'Migliora autostima, fiducia in te stesso, disciplina per avviare la tua attività',
  'Elimina la paura del giudizio altrui che ti impedisce di crescere nel tuo business',
  'Elimina paure, vizi, cattive abitudini e procrastinazione che ti stanno bloccando',
  'Elimina la sindrome dell’impostore',
  'Piano d’azione su misura per raggiungere tutti i tuoi obiettivi economici in meno di 3 mesi',
  'Cambia il tuo ambiente circondandoti di vincitori',
  'Impara le abitudini per far decollare la tua attività',
];

const bonuses = [
  '1 Anno intero di videochiamate di gruppo settimanali',
  'Video corso sul Personal Brand',
  'Strategia iniziale videochiamata 1:1',
];

const plans = [
  {
    name: 'Semestrale',
    price: '497€',
    priceValue: 497,
    duration: '/6 mesi',
    highlight: false,
    cta: 'Inizia Ora',
    service: 'BUSINESS PROTOCOL',
    plan: 'Semestrale',
  },
  {
    name: 'Annuale',
    price: '897€',
    priceValue: 897,
    duration: '/anno',
    highlight: true,
    badge: 'La Scelta dei Vincitori',
    cta: 'Accedi al Percorso',
    service: 'BUSINESS PROTOCOL',
    plan: 'Annuale',
  },
];

export default function BusinessProtocol() {
  const productJsonLd = {
    '@type': 'Service',
    '@id': 'https://mind-project.com/services/business-protocol#service',
    name: 'Business Protocol — Monetizza la tua Passione',
    description:
      'Monetizza la tua passione attraverso il Personal Brand e scappa dal sistema. Blueprint per recuperare il tuo investimento entro 90 giorni.',
    image: 'https://mind-project.com/assets/business-protocol.png',
    serviceType: 'Personal Brand Coaching',
    provider: {
      '@type': 'Organization',
      name: 'Mind Project',
      url: 'https://mind-project.com',
    },
    areaServed: { '@type': 'Country', name: 'Italy' },
    offers: [
      {
        '@type': 'Offer',
        name: 'Business Protocol Semestrale',
        price: '497',
        priceCurrency: 'EUR',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://mind-project.com/services/business-protocol',
      },
      {
        '@type': 'Offer',
        name: 'Business Protocol Annuale',
        price: '897',
        priceCurrency: 'EUR',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://mind-project.com/services/business-protocol',
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mind-project.com/' },
      { '@type': 'ListItem', position: 2, name: 'Percorsi', item: 'https://mind-project.com/services' },
      { '@type': 'ListItem', position: 3, name: 'Business Protocol', item: 'https://mind-project.com/services/business-protocol' },
    ],
  };

  return (
    <>
      <SEO
        title="Business Protocol - Monetizza la tua Passione"
        description="Monetizza la tua passione attraverso il Personal Brand e scappa dal sistema. Blueprint per recuperare il tuo investimento entro 90 giorni. A partire da 497€/6 mesi."
        canonicalUrl="https://mind-project.com/services/business-protocol"
        keywords={['business protocol', 'personal brand', 'monetizzare la passione', 'business online', 'community whatsapp']}
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
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
                <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                  Personal Brand
                </span>
              </div>
              <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black italic uppercase tracking-tighter leading-[0.9] mb-5">
                Monetizza la tua <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Passione.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
                Scappa dal sistema e trasforma la tua passione in un business attraverso il tuo Personal Brand. Blueprint per recuperare il tuo investimento entro 90 giorni.
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
                  src="/assets/business-protocol.png"
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
                Il Percorso
              </span>
              <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight mb-4 pr-[0.1em]">
                Cosa Ricevi <span className="gradient-text">Oggi</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                Tutto ciò che ti serve per creare il tuo Personal Brand, attrarre clienti e monetizzare la tua passione.
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
                    {pathFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? 'text-emerald-400' : 'text-gray-600'}`} />
                        <span className="text-gray-300 text-sm sm:text-base">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-6 sm:mb-8 pt-5 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-3">
                      <Gift className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Bonus Inclusi:</span>
                    </div>
                    <ul className="space-y-2">
                      {bonuses.map((bonus, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-emerald-500 mt-0.5">•</span> {bonus}
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-sm text-amber-300 font-bold">
                        <span className="text-amber-400 mt-0.5">🎁</span> Bonus regalo 1 anno di Mind Project (Valore 397€)
                      </li>
                    </ul>
                  </div>

                  <Link
                    href={`/payment/checkout?service=${encodeURIComponent(plan.service)}&plan=${encodeURIComponent(plan.plan)}&price=${plan.priceValue}`}
                    className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 mt-auto ${
                      plan.highlight
                        ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                        : 'bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/[0.08]'
                    }`}
                  >
                    {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
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