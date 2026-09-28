import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
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

  useEffect(() => {
    const saved = localStorage.getItem('rememberedEmail');
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  const friendlyError = (message: string) => {
    if (/invalid login credentials/i.test(message))
      return 'Email o password non corretti. Controlla e riprova.';
    if (/email not confirmed/i.test(message))
      return 'Devi prima confermare la tua email. Controlla la tua casella di posta.';
    if (/too many requests|rate limit/i.test(message))
      return 'Troppi tentativi. Aspetta qualche minuto e riprova.';
    return message || 'Qualcosa è andato storto. Riprova.';
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    const supabase = createClient();
    if (!supabase) {
      setError('Configurazione non disponibile. Riprova più tardi.');
      setGoogleLoading(false);
      return;
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mind-prjct.vercel.app';
    const redirectTo = `${siteUrl}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) {
      setError(friendlyError(error.message));
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    if (!supabase) {
      setError('Configurazione non disponibile. Riprova più tardi.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(friendlyError(error.message));
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
        canonicalUrl="https://mind-prjct.vercel.app/login"
        noIndex
      />
      <main className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex order-2 relative bg-[#080808] items-center justify-center px-12 overflow-hidden">
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
            className="relative z-10 max-w-md"
          >
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mb-4 px-3 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20">
              Mind Project · Academy
            </span>
            <h1 className="text-4xl xl:text-5xl font-black italic mb-4 leading-tight">
              BENTORNATO NEL <span className="text-accent-primary">PROJECT</span>
            </h1>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Riprendi da dove avevi lasciato: videochiamate settimanali,
              community esclusiva e i tuoi progressi ti aspettano.
            </p>
            <ul className="space-y-3">
              {[
                'Videochiamate di gruppo ogni settimana',
                'Community esclusiva sempre al tuo fianco',
                'Progressi salvati su ogni dispositivo',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl"
                >
                  <CheckCircle className="text-accent-primary w-4 h-4 shrink-0" />
                  <span className="font-bold text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="order-1 flex items-center justify-center px-4 py-10 sm:px-8 lg:px-16 bg-[#050505] relative min-h-screen lg:min-h-full">
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
            className="w-full max-w-md mt-14 lg:mt-0"
          >
            <div className="mb-5 text-center lg:text-left">
              <h2 className="text-2xl font-black italic mb-2">Accedi al Project</h2>
              <p className="text-gray-500 text-xs leading-relaxed">
                Bentornato! Continua con Google oppure usa la tua email.
              </p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="flex items-center gap-2 bg-red-500/[0.08] border border-red-500/20 text-red-400 text-[10px] font-bold p-3 rounded-lg mb-4"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-gray-100 rounded-xl py-3 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-60 disabled:cursor-not-allowed"
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
              <span className="text-sm font-bold text-gray-800">
                {googleLoading ? 'Reindirizzamento a Google...' : 'Continua con Google'}
              </span>
            </button>
            <p className="text-center text-[10px] text-gray-600 mt-2">
              Veloce e sicuro · Nessuna password da ricordare
            </p>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px bg-white/[0.06] flex-1" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-gray-700">
                Oppure con email
              </span>
              <div className="h-px bg-white/[0.06] flex-1" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
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

            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
              <p className="text-gray-500 text-xs mb-2">Nuovo su Mind Project?</p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-accent-primary text-xs font-black uppercase tracking-wider hover:underline underline-offset-4"
              >
                Crea il tuo account <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
