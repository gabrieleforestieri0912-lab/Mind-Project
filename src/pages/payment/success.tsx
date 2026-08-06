import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function PaymentSuccess() {
  const router = useRouter();
  const [service, setService] = useState('');

  useEffect(() => {
    if (router.query.service) {
      setService(decodeURIComponent(router.query.service as string));
    }
  }, [router.query]);

  return (
    <>
      <SEO title="Pagamento Riuscito" description="Il tuo pagamento è stato completato con successo." />
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-9 h-9 text-green-400" />
          </motion.div>

          <h1 className="text-3xl font-black italic uppercase tracking-tight mb-3 pr-[0.1em]">
            Pagamento <span className="gradient-text">Completato</span>
          </h1>
          <p className="text-gray-500 text-sm mb-2 leading-relaxed">
            Il tuo accesso a <strong className="text-white">{service || 'Mind Project'}</strong> è stato attivato.
          </p>
          <p className="text-gray-600 text-xs mb-8">
            Hai già accesso a tutti i contenuti. Inizia subito il tuo percorso.
          </p>

          <div className="space-y-3">
            <Link
              href="/academy/mind-project"
              className="flex items-center justify-center gap-2 w-full bg-accent-primary text-black px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,180,0,0.25)]"
            >
              <CheckCircle2 className="w-4 h-4" />
              Vai al Video Corso
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/profile"
              className="flex items-center justify-center gap-2 w-full bg-white/[0.04] border border-white/[0.08] text-white px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.08]"
            >
              Il Mio Profilo
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
}
