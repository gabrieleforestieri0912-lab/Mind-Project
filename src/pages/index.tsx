import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Target, Star, Briefcase, CheckCircle2, Shield, ArrowDown, Quote, ArrowRight, Flame, Brain, Zap, BookOpen, GraduationCap } from 'lucide-react';
import React, { useState } from 'react';
import SEO from '@/components/SEO';

const services = [
  {
    id: 'mind-project',
    name: 'Mind Project',
    tagline: 'Il Percorso Base',
    desc: 'Rivoluziona il tuo mindset, supera le paure e raggiungi i tuoi obiettivi con il supporto della community.',
    href: '/services/mind-project',
    icon: Target,
    gradient: 'from-blue-500 to-cyan-400',
    bgGradient: 'from-blue-500/10 to-cyan-500/5',
    borderHover: 'hover:border-blue-500/30',
  },
  {
    id: 'mind-project-vip',
    name: 'Mind Project VIP',
    tagline: 'Esclusivo',
    desc: 'Accesso totale, coaching 1 a 1 e supporto 24/7 per risultati straordinari senza compromessi.',
    href: '/services/mind-project-vip',
    icon: Star,
    gradient: 'from-amber-500 to-yellow-400',
    bgGradient: 'from-amber-500/10 to-yellow-500/5',
    borderHover: 'hover:border-amber-500/30',
  },
  {
    id: 'business-protocol',
    name: 'Business Protocol',
    tagline: 'Personal Brand',
    desc: 'Monetizza la tua passione attraverso il Personal Brand e scappa dal sistema.',
    href: '/services/business-protocol',
    icon: Briefcase,
    gradient: 'from-emerald-500 to-teal-400',
    bgGradient: 'from-emerald-500/10 to-teal-500/5',
    borderHover: 'hover:border-emerald-500/30',
  },
];

const faqs = [
  {
    q: 'Come funziona il percorso Mind Project?',
    a: 'Mind Project è un programma strutturato di crescita personale che combina video lezioni, chiamate settimanali di gruppo, esercizi pratici e una community esclusiva. Ogni modulo affronta un aspetto specifico del mindset per permetterti di evolvere in modo completo e duraturo.',
  },
  {
    q: 'Quanto tempo devo dedicare ogni settimana?',
    a: 'Il programma è flessibile. Le video lezioni sono on-demand e le puoi seguire quando vuoi. La chiamata settimanale di gruppo dura circa 50 minuti. In totale, ti consigliamo di dedicare almeno 2-3 ore a settimana per ottenere risultati significativi.',
  },
  {
    q: 'Cosa include la membership VIP?',
    a: 'La membership VIP include tutto ciò che offre il percorso base, più sessioni di coaching individuali, accesso 24/7 via messaggio, analisi personalizzata del tuo progresso e materiali esclusivi avanzati.',
  },
  {
    q: 'Posso cancellare l\'abbonamento in qualsiasi momento?',
    a: 'Sì, puoi cancellare in qualsiasi momento. Se hai un abbonamento mensile, l\'accesso rimane attivo fino alla fine del mese corrente. Per gli abbonamenti annuali, contattaci per i termini di rimborso.',
  },
  {
    q: 'I pagamenti sono sicuri?',
    a: 'Assolutamente. Utilizziamo Stripe come processore di pagamento, lo standard globale per la sicurezza delle transazioni online. I tuoi dati di pagamento sono crittografati e mai memorizzati sui nostri server.',
  },
  {
    q: 'Ho bisogno di esperienze pregresse?',
    a: 'No, il programma è progettato per funzionare a qualsiasi livello. I contenuti sono strutturati per guidarti passo dopo passo, indipendentemente dal tuo punto di partenza.',
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setMessage('Errore di connessione. Riprova.');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="la-tua@email.com"
        className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all placeholder:text-gray-700"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-accent-primary text-black rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,180,0,0.2)] disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? 'Invio...' : 'Iscriviti'}
      </button>
      {message && (
        <p className={`text-xs font-bold text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-full sm:mt-2 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </form>
  );
}

export default function HomePage() {
  const faqJsonLd = {
    '@type': 'FAQPage',
    '@id': 'https://mind-prjct.vercel.app/#faq',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mind-prjct.vercel.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Percorsi',
        item: 'https://mind-prjct.vercel.app/services',
      },
    ],
  };

  const courseJsonLd = {
    '@type': 'Course',
    name: 'Mind Project — Programma di Mindset e Crescita Personale',
    description:
      'Programma di coaching online per superare le paure, eliminare le dipendenze, implementare abitudini vincenti e raggiungere i propri obiettivi.',
    provider: {
      '@type': 'Organization',
      name: 'Mind Project',
      sameAs: 'https://mind-prjct.vercel.app',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT3H',
      inLanguage: 'it-IT',
      offers: {
        '@type': 'Offer',
        price: '37',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://mind-prjct.vercel.app/services/mind-project',
      },
    },
  };

  return (
    <>
      <SEO
        title="Mind Project — Rivoluziona il tuo Mindset"
        description="Mind Project è il programma di coaching online di Gabriele Forestieri: supera le paure, elimina le dipendenze, sviluppa disciplina e raggiungi i tuoi obiettivi con un metodo basato su neuroscienze e abitudini atomiche."
        canonicalUrl="https://mind-prjct.vercel.app/"
        keywords={['mindset', 'crescita personale', 'coaching online', 'disciplina', 'obiettivi', 'mentalità', 'abitudini atomiche', 'Gabriele Forestieri']}
        jsonLd={[faqJsonLd, breadcrumbJsonLd, courseJsonLd]}
      />

      <main className="bg-[#050505] text-white">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent-primary/[0.04] blur-[200px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/[0.03] blur-[180px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20 pb-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-6 sm:mb-8"
                >
                  <Target className="w-3.5 h-3.5 text-accent-primary" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary">
                    Il Programma di Crescita Personale
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-[clamp(2rem,7vw,3.5rem)] font-black italic tracking-tighter leading-[0.9] uppercase mb-6 pr-[0.15em]"
                >
                  Diventa la
                  <br />
                  <span className="gradient-text">Persona che Ammiri</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 sm:mb-10 leading-relaxed"
                >
                  Supera le tue paure, elimina le dipendenze, implementa abitudini vincenti e raggiungi ogni obiettivo che ti sei prefissato. Con il metodo Mind Project.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <Link
                    href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-accent-primary text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,180,0,0.25)] active:scale-[0.97]"
                >
                  Inizia il Tuo Percorso
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 bg-white/[0.04] border border-white/[0.08] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.08] active:scale-[0.97]"
                  >
                    Accedi all&apos;Area Riservata
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-10 sm:mt-12 inline-flex flex-wrap items-center gap-2 sm:gap-4"
                >
                  {['Neuroscienze', 'Psicologia Comportamentale', 'Abitudini Atomiche'].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:block relative"
              >
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl">
                  <Image
                    src="/assets/mind-project.png"
                    alt="Gabriele Forestieri — Mind Project"
                    fill
                    sizes="(max-width: 1024px) 0vw, 40vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Servizi */}
        <section className="py-16 sm:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mb-4 block">
                Scegli il Tuo Percorso
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-4 pr-[0.1em]">
                Trova il Piano <span className="gradient-text">Giusto per Te</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                Ogni percorso è progettato per portarti dal punto A al punto B con un metodo testato e supporto costante.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                  >
                    <Link
                      href={service.href}
                      className={`group block h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${service.bgGradient} border border-white/[0.06] ${service.borderHover} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl`}
                    >
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 sm:mb-6 shadow-lg`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5 block">
                        {service.tagline}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight mb-3 group-hover:text-accent-primary transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                        {service.desc}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary group-hover:gap-3 transition-all">
                        Scopri di più <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* La Mia Storia */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-accent-primary/[0.03] blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-600/[0.02] blur-[120px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mb-4 block">
                La Mia Storia
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-4 pr-[0.1em]">
                Dal Buio <span className="gradient-text">alla Luce</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                Perché ho creato Mind Project e cosa mi ha spinto a non arrendermi mai.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 w-full rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl">
                  <Image
                    src="/assets/mind-project.png"
                    alt="Gabriele Forestieri — Fondatore Mind Project"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-accent-primary mb-1">
                      Gabriele Forestieri
                    </p>
                    <p className="text-[10px] text-gray-500 font-bold">
                      Fondatore Mind Project
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 space-y-5"
              >
                <div className="relative">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-accent-primary/20 absolute -top-2 -left-2 sm:-top-4 sm:-left-4" />
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed pl-4 sm:pl-6 italic">
                    Non sono nato con una marcia in più. Anzi. Per anni mi sono sentito bloccato, intrappolato in un ciclo di insoddisfazione e paure che non riuscivo a spezzare. Guardavo gli altri ottenere risultati e mi chiedevo: <span className="text-white font-bold">"Perché loro sì e io no?"</span>
                  </p>
                </div>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  La risposta non era il talento. Non era la fortuna. Era l'assenza di un <span className="text-white font-bold">sistema</span>. Mi allenavo senza costanza, iniziavo progetti che abbandonavo dopo due settimane, cercavo la motivazione invece della disciplina. E ogni fallimento rafforzava la convinzione di non essere abbastanza.
                </p>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Poi ho capito una cosa che mi ha cambiato la vita: <span className="text-accent-primary font-bold">il problema non ero io. Era il mio metodo.</span>
                </p>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Ho passato anni a studiare neuroscienze, psicologia comportamentale, abitudinismo, produttività. Ho testato su me stesso ogni strategia, ho fallito decine di volte, ho eliminato dipendenze, ho ricostruito la mia identità pezzo per pezzo. Fino a creare un sistema replicabile che funzionasse indipendentemente dal punto di partenza.
                </p>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Oggi Mind Project è quel sistema. L'ho costruito per te, perché so esattamente cosa si prova a sentirsi in gabbia. E so anche cosa serve per uscirne.
                </p>

                <div className="flex items-center gap-2 text-accent-primary pt-2">
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-wider">La mia missione è la tua trasformazione</span>
                </div>
              </motion.div>
            </div>

            {/* Numeri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto"
            >
              {[
                { value: '3+', label: 'Anni di Ricerca', icon: BookOpen },
                { value: '1', label: 'Metodo Strutturato', icon: GraduationCap },
                { value: '100%', label: 'Dedicato a Te', icon: Target },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                  >
                    <Icon className="w-5 h-5 text-accent-primary mx-auto mb-2" />
                    <p className="text-2xl sm:text-3xl font-black italic text-white mb-1">{stat.value}</p>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-gray-600">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Il Metodo — Perché Funziona */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent-primary/[0.02] blur-[200px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mb-4 block">
                Il Metodo
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-4 pr-[0.1em]">
                Non è Motivazione. <span className="gradient-text">È Sistema.</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                Il Mind Project non si basa sulla motivazione passeggera. Costruiamo insieme un sistema di abitudini, credenze e azioni che funziona indipendentemente da come ti senti.
              </p>
            </motion.div>

            {/* Pilastri del Metodo */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
              {[
                {
                  icon: Brain,
                  title: 'Mindset Reset',
                  desc: 'Riscriviamo le credenze limitanti che ti tengono bloccato. Impari a riconoscere i pattern mentali distruttivi e li sostituisci con nuovi programmi di pensiero che lavorano per te, non contro di te.',
                  gradient: 'from-purple-500/10 to-blue-500/5',
                  border: 'hover:border-purple-500/30',
                  iconGradient: 'from-purple-500 to-blue-400',
                },
                {
                  icon: Zap,
                  title: 'Abitudini Atomiche',
                  desc: 'Implementiamo micro-abitudini quotidiane che si accumulano in risultati straordinari. Non serve rivoluzionare la tua vita in un giorno. Bastano piccoli cambiamenti consistenti nel tempo.',
                  gradient: 'from-accent-primary/10 to-amber-500/5',
                  border: 'hover:border-accent-primary/30',
                  iconGradient: 'from-accent-primary to-amber-400',
                },
                {
                  icon: Flame,
                  title: 'Disciplina Operativa',
                  desc: 'La motivazione è una fiamma che si spezza. La disciplina è un motore che non si ferma. Costruiamo insieme una routine operativa che ti porta ad agire ogni giorno, anche quando non ne hai voglia.',
                  gradient: 'from-red-500/10 to-rose-500/5',
                  border: 'hover:border-red-500/30',
                  iconGradient: 'from-red-500 to-rose-400',
                },
              ].map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className={`group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${pillar.gradient} border border-white/[0.06] ${pillar.border} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl`}
                  >
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${pillar.iconGradient} flex items-center justify-center mb-5 sm:mb-6 shadow-lg`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight mb-3 group-hover:text-accent-primary transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Come Funziona — Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-center mb-8 sm:mb-10 pr-[0.1em]">
                Il tuo <span className="gradient-text">Percorso</span>
              </h3>

              <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-6">
                {[
                  { step: '01', title: 'Diagnosi', desc: 'Analisi del tuo stato attuale: blocchi, abitudini, obiettivi.' },
                  { step: '02', title: 'Reset', desc: 'Eliminazione dei pattern limitanti e installazione di nuove credenze.' },
                  { step: '03', title: 'Costruzione', desc: 'Implementazione progressiva di abitudini atomiche su misura per te.' },
                  { step: '04', title: 'Evoluzione', desc: 'Monitoraggio continuo e calibrazione del sistema per risultati duraturi.' },
                ].map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative sm:text-center"
                  >
                    <div className="flex sm:flex-col items-center gap-3 sm:gap-2 p-4 sm:p-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-accent-primary font-black text-sm sm:text-base">{phase.step}</span>
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-white">{phase.title}</h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">{phase.desc}</p>
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="hidden sm:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-1rem)] h-px bg-gradient-to-r from-accent-primary/30 to-transparent" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-10 sm:mt-12"
            >
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">
                {[
                  'Neuroscienze',
                  'Psicologia Comportamentale',
                  'Habit Stacking',
                  'Cognitive Reframing',
                ].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl sm:rounded-4xl overflow-hidden bg-gradient-to-br from-accent-primary/10 via-accent-primary/5 to-transparent border border-accent-primary/20 p-8 sm:p-12 md:p-16 text-center"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-accent-primary/[0.06] blur-[120px] rounded-full" />
              </div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mb-4 block">
                  Il Momento è Adesso
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-6 pr-[0.1em]">
                  Pronto a <span className="gradient-text">Trasformarti</span>?
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
                  La persona che vuoi diventare è già dentro di te. Serve solo il sistema giusto per tirarla fuori. Inizia oggi.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-accent-primary text-black px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,180,0,0.25)] active:scale-[0.97]"
                >
                  Scopri i Percorsi
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/[0.03] blur-[120px] rounded-full" />
          </div>

          <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mb-4 block">
                Resta in Contatto
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-4 pr-[0.1em]">
                Ricevi <span className="gradient-text">Contenuti Esclusivi</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
                Iscriviti per ricevere strategie, approfondimenti e aggiornamenti direttamente da Gabriele.
              </p>

              <NewsletterForm />
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mb-4 block">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tight pr-[0.1em]">
                Domande <span className="gradient-text">Frequenti</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white/[0.02] border border-white/[0.05] rounded-xl sm:rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-4 sm:p-6 cursor-pointer list-none hover:bg-white/[0.02] transition-colors">
                    <span className="text-sm sm:text-base font-bold text-white group-open:text-accent-primary transition-colors">
                      {faq.q}
                    </span>
                    <div className="w-5 h-5 shrink-0 flex items-center justify-center rounded-full bg-white/[0.04] group-open:bg-accent-primary/20 transition-colors">
                      <ChevronRight className="w-3 h-3 text-gray-500 group-open:text-accent-primary group-open:rotate-90 transition-all" />
                    </div>
                  </summary>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Trust */}
        <section className="pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-accent-primary" />
                Pagamenti Sicuri
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-primary" />
                Certificato
              </div>
              <div className="flex items-center gap-2">
                <ArrowDown className="w-3.5 h-3.5 text-accent-primary" />
                Accesso Immediato
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
