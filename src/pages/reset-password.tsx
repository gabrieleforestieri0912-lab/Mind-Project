import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // _initialize() auto-detects the recovery code and fires PASSWORD_RECOVERY
    const supabase = createClient();
    if (!supabase) {
      setError('Configurazione non disponibile. Riprova più tardi.');
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setError('Link non valido o scaduto. Richiedi un nuovo recupero password.');
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Le password non corrispondono.');
      return;
    }

    setLoading(true);
    setError('');

    const supabase = createClient();
    if (!supabase) {
      setError('Configurazione non disponibile. Riprova più tardi.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push('/login'), 3000);
  };

  return (
    <>
      <SEO title="Reimposta Password" description="Reimposta la password del tuo account Mind Project." canonicalUrl="https://mind-prjct.vercel.app/reset-password" />
      <main className="min-h-screen flex items-center justify-center bg-[#050505] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-7 h-7 text-green-400" />
              </div>
              <h2 className="text-2xl font-black italic mb-2">Password Aggiornata</h2>
              <p className="text-gray-500 text-sm">Verrai reindirizzato al login...</p>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black italic mb-2">Nuova Password</h1>
                <p className="text-gray-600 text-sm">Scegli una password forte e sicura.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-red-500/[0.08] border border-red-500/20 text-red-400 text-[10px] font-bold p-3 rounded-lg"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-600 ml-1">Nuova Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 group-focus-within:text-accent-primary transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="Min. 6 caratteri"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all text-sm"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors" tabIndex={-1}>
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-600 ml-1">Conferma Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 group-focus-within:text-accent-primary transition-colors" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Ripeti la password"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all text-sm"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors" tabIndex={-1}>
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-accent-primary text-black rounded-lg font-black text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,180,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <><div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" /><span>Aggiornamento...</span></>
                  ) : (
                    <><span>Aggiorna Password</span><ArrowRight className="w-3.5 h-3.5" /></>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </main>
    </>
  );
}
