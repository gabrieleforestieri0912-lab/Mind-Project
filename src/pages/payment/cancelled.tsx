import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { XCircle, ChevronLeft, ArrowRight } from 'lucide-react';

export default function PaymentCancelled() {
  return (
    <>
      <SEO title="Pagamento Annullato" description="Il pagamento è stato annullato." />
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
            className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <XCircle className="w-9 h-9 text-red-400" />
          </motion.div>

          <h1 className="text-3xl font-black italic uppercase tracking-tight mb-3 pr-[0.1em]">
            Pagamento <span className="text-red-400">Annullato</span>
          </h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Nessun problema. Se hai bisogno di aiuto per scegliere il percorso giusto, contattaci.
          </p>

          <div className="space-y-3">
            <Link
              href="/services"
              className="flex items-center justify-center gap-2 w-full bg-accent-primary text-black px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,180,0,0.25)]"
            >
              <ArrowRight className="w-4 h-4" />
              Riprova
            </Link>
            <Link
              href="/contacts"
              className="flex items-center justify-center gap-2 w-full bg-white/[0.04] border border-white/[0.08] text-white px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.08]"
            >
              <ChevronLeft className="w-4 h-4" />
              Contattaci
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
}
