import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, LogIn } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <>
      <SEO
        title="Password Dimenticata"
        description="Recupera la password del tuo account Mind Project."
        canonicalUrl="https://mind-project.com/forgot-password"
      />
      <main className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex relative bg-[#080808] items-start justify-center pt-0 pb-8 px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/[0.08] to-transparent z-0" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[250px] h-[250px] bg-accent-primary/[0.03] blur-[60px] rounded-full" />
          <div className="absolute top-[-5%] right-[-5%] w-[180px] h-[180px] bg-accent-primary/[0.02] blur-[80px] rounded-full" />

          <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-white transition-colors z-10">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Torna alla Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-lg text-right mt-16 lg:mt-24"
          >
            <h1 className="text-4xl font-black italic mb-4 leading-tight">
              Recupera <br />
              <span className="text-accent-primary">Accesso</span>
            </h1>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Ti invieremo un link per reimpostare la password. Nessuna preoccupazione, succede anche ai migliori.
            </p>
          </motion.div>
        </div>

        <div className="flex items-start justify-center pt-0 pb-4 px-4 sm:pt-0 sm:pb-8 sm:px-8 lg:pt-0 lg:pb-16 lg:px-16 bg-[#050505] relative">
          <div className="lg:hidden absolute top-5 left-5">
            <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mt-20 lg:mt-24"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-7 h-7 text-green-400" />
                </div>
                <h2 className="text-2xl font-black italic mb-2">Controlla la tua Email</h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Se esiste un account associato a <strong className="text-white">{email}</strong>, riceverai un link per reimpostare la password.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-accent-primary font-bold text-sm hover:underline"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Torna al login
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="mb-6 text-center lg:text-left">
                  <h2 className="text-2xl font-black italic mb-2">Password Dimenticata</h2>
                  <p className="text-gray-600 text-xs">
                    Inserisci la tua email e ti invieremo un link per reimpostarla.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        className="flex items-center gap-2 bg-red-500/[0.08] border border-red-500/20 text-red-400 text-[10px] font-bold p-3 rounded-lg"
                      >
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-600 ml-1">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 group-focus-within:text-accent-primary transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="la-tua@email.com"
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all placeholder:text-gray-700 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-accent-primary text-black rounded-lg font-black text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,180,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Invio in corso...</span>
                      </>
                    ) : (
                      <>
                        <span>Invia Link di Recupero</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center mt-6 text-gray-600 text-xs">
                  Hai ricordato la password?{' '}
                  <Link href="/login" className="text-accent-primary font-bold hover:underline underline-offset-4">
                    Accedi
                  </Link>
                </p>
              </>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
