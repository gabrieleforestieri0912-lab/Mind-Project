import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Target, Briefcase, Flame, Lock } from 'lucide-react';
import React from 'react';
import SEO from '@/components/SEO';

const paths = [
  {
    id: 'mind-project',
    name: 'Mind Project',
    subtitle: 'Il Percorso Base',
    description: 'Il punto di partenza per rivoluzionare il tuo mindset, superare le tue paure e raggiungere i tuoi obiettivi con il supporto della community.',
    href: '/services/mind-project',
    image: '/assets/mind-project.png',
    icon: Target,
    bgGradient: 'from-blue-500/10 to-cyan-500/5',
    borderHover: 'hover:border-blue-500/30',
    iconGradient: 'from-blue-500 to-cyan-400',
    tagColor: 'text-blue-400',
  },
  {
    id: 'mind-project-vip',
    name: 'Mind Project VIP',
    subtitle: 'Esperienza Esclusiva',
    description: 'Accesso totale, coaching 1 a 1, e supporto 24/7. Progettato per chi vuole risultati straordinari senza compromessi.',
    href: '/services/mind-project-vip',
    image: '/assets/mind-project-vip.png',
    icon: Star,
    bgGradient: 'from-amber-500/10 to-yellow-500/5',
    borderHover: 'hover:border-amber-500/30',
    iconGradient: 'from-amber-500 to-yellow-400',
    tagColor: 'text-amber-400',
  },
  {
    id: 'business-protocol',
    name: 'Business Protocol',
    subtitle: 'Personal Brand',
    description: 'Monetizza la tua passione attraverso il Personal Brand e scappa dal sistema, con il blueprint per recuperare il tuo investimento in 90 giorni.',
    href: '/services/business-protocol',
    image: '/assets/business-protocol.png',
    icon: Briefcase,
    bgGradient: 'from-emerald-500/10 to-teal-500/5',
    borderHover: 'hover:border-emerald-500/30',
    iconGradient: 'from-emerald-500 to-teal-400',
    tagColor: 'text-emerald-400',
  },
  {
    id: 'hell-room',
    name: 'Hell Room',
    subtitle: 'Intensivo 90 Giorni',
    description: 'L\'intensivo più estremo di Mind Project per costruire una mentalità dura e impenetrabile in 90 giorni. Attualmente non disponibile.',
    href: '/services/hell-room',
    image: '/assets/mind-project-vip.png',
    icon: Flame,
    bgGradient: 'from-red-500/10 to-orange-500/5',
    borderHover: 'hover:border-red-500/30',
    iconGradient: 'from-red-500 to-orange-400',
    tagColor: 'text-red-400',
    disabled: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function ServicesOverview() {
  const breadcrumbJsonLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mind-prjct.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Percorsi', item: 'https://mind-prjct.vercel.app/services' },
    ],
  };

  return (
    <>
      <SEO
        title="Percorsi di Coaching | Mind Project"
        description="Scopri i percorsi Mind Project: Base, VIP con coaching 1-a-1 e Business Protocol. Scegli il piano giusto per i tuoi obiettivi."
        canonicalUrl="https://mind-prjct.vercel.app/services"
        keywords={['percorsi coaching', 'Mind Project base', 'Mind Project VIP', 'Business Protocol', 'coaching online']}
        jsonLd={[breadcrumbJsonLd]}
      />
      <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-primary/[0.03] blur-[200px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/[0.02] blur-[180px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-6">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary">
                Scegli il Tuo Percorso
              </span>
            </div>
            <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black italic uppercase tracking-tighter leading-[0.9] mb-4 pr-[0.15em]">
              Trova il Piano <br />
              <span className="gradient-text">Giusto per Te</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Che tu voglia rivoluzionare la tua mentalità o scalare il tuo business, abbiamo il protocollo esatto per farti vincere.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {paths.map((path) => {
              const Icon = path.icon;
              const card = (
                <div className={`h-full relative bg-gradient-to-br ${path.bgGradient} border border-white/[0.06] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 flex flex-col ${
                  path.disabled
                    ? 'opacity-70 border-white/[0.04]'
                    : `${path.borderHover} hover:-translate-y-1 hover:shadow-2xl group`
                }`}>
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
                    <Image
                      src={path.image}
                      alt={path.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`object-cover transition-transform duration-700 ${path.disabled ? '' : 'group-hover:scale-105'}`}
                    />
                    <div className={`absolute top-4 right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${path.iconGradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${path.tagColor}`}>
                        {path.subtitle}
                      </span>
                    </div>
                    {path.disabled && (
                      <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[9px] font-black uppercase tracking-wider shadow-lg">
                        <Lock className="w-3 h-3" /> Non disponibile
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight mb-3 transition-colors text-white">
                      {path.name}
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                      {path.description}
                    </p>

                    {path.disabled ? (
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <Lock className="w-3.5 h-3.5" /> Iscrizioni Chiuse
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary group-hover:gap-3 transition-all">
                        Scopri di più <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              );

              return (
                <motion.div key={path.id} variants={itemVariants} className="h-full">
                  {path.disabled ? card : <Link href={path.href} className="block h-full">{card}</Link>}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>
    </>
  );
}
