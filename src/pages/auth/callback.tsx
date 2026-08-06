import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@/lib/supabase-browser';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.code) return;

    const handleCallback = async () => {
      const supabase = createClient();

      // _initialize() auto-handles PKCE code exchange + saves session.
      // getSession() awaits initializePromise then returns the session.
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth callback error:', error);
        setError('Errore durante l\'accesso con Google. Riprova.');
        return;
      }

      if (data.session) {
        router.push('/');
      }
    };

    handleCallback();
  }, [router.isReady, router.query.code, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <p className="text-red-400 text-sm font-bold mb-4">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="text-accent-primary font-bold underline"
          >
            Torna al login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm font-bold">Completamento accesso...</p>
      </div>
    </div>
  );
}
