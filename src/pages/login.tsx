import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  Mail,
  Lock,
  ArrowRight,
  Chrome,
  ArrowLeft,
  LogIn,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    const target = (router.query.callbackUrl as string) || '/';
    router.push(target);
  };

  return (
    <>
      <SEO
        title="Accedi"
        description="Accedi al tuo account Mind Project per riprendere il tuo allenamento."
        canonicalUrl="https://mind-project.com/login"
        noIndex
      />
      <main className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex relative bg-[#080808] items-start justify-center pt-0 pb-8 px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/[0.08] to-transparent z-0" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[250px] h-[250px] bg-accent-primary/[0.03] blur-[60px] rounded-full" />
          <div className="absolute top-[-5%] right-[-5%] w-[180px] h-[180px] bg-accent-primary/[0.02] blur-[80px] rounded-full" />

          <Link
            href="/"
            className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-white transition-colors z-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Torna alla Home
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-lg text-right mt-16 lg:mt-24"
          >
            <h1 className="text-4xl font-black italic mb-4 leading-tight">
              BENTORNATO <br />
              <span className="text-accent-primary">ACADEMY</span>
            </h1>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              La costanza è la chiave del successo. Accedi per riprendere il tuo
              allenamento e monitorare i tuoi progressi.
            </p>
            <div className="flex gap-3 items-center justify-end p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
              <div>
                <p className="font-bold text-right text-xs">Nuove Sfide</p>
                <p className="text-[8px] text-gray-600 uppercase tracking-widest font-black text-right">
                  Ti aspettano oggi
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                <LogIn className="text-accent-primary w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-start justify-center pt-0 pb-4 px-4 sm:pt-0 sm:pb-8 sm:px-8 lg:pt-0 lg:pb-16 lg:px-16 bg-[#050505] relative">
          <div className="lg:hidden absolute top-5 left-5">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mt-20 lg:mt-24"
          >
            <div className="mb-6 text-center lg:text-left">
              <h2 className="text-2xl font-black italic mb-2">Accedi</h2>
              <p className="text-gray-600 text-xs">
                Inserisci le tue credenziali per continuare.
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
                <label className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-600 ml-1">
                  Email
                </label>
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

              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-600">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[8px] font-bold text-accent-primary hover:underline"
                  >
                    Dimenticata?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 group-focus-within:text-accent-primary transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3 h-3 rounded border-white/[0.06] bg-white/[0.03] accent-accent-primary"
                />
                <label
                  htmlFor="remember"
                  className="text-[9px] font-bold text-gray-500 cursor-pointer select-none"
                >
                  Ricordami
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-accent-primary text-black rounded-lg font-black text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,180,0,0.2)] group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Accesso in corso...</span>
                  </>
                ) : (
                  <>
                    <span>Entra nel Project</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px bg-white/[0.06] flex-1" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-gray-700">
                Oppure accedi con
              </span>
              <div className="h-px bg-white/[0.06] flex-1" />
            </div>

            <div className="mt-4">
              <button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-gray-100 rounded-lg py-2.5 transition-colors group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {googleLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                <span className="text-xs font-bold text-gray-800">
                  {googleLoading ? 'Reindirizzamento...' : 'Google'}
                </span>
              </button>
            </div>

            <p className="text-center mt-6 text-gray-600 text-xs">
              Non hai un account?{' '}
              <Link
                href="/signup"
                className="text-accent-primary font-bold hover:underline underline-offset-4"
              >
                Registrati
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
