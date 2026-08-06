'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/SEO';

interface ProfileData {
  name: string;
  bio: string;
}

export default function Settings() {
  const [profile, setProfile] = useState<ProfileData>({ name: '', bio: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkSessionAndLoad = async () => {
      try {
        const response = await fetch('/api/auth/user');
        const data = await response.json();

        if (!data.authenticated) {
          router.push(`/login?callbackUrl=${encodeURIComponent(router.asPath)}`);
        } else {
          setProfile({
            name: data.user.name || '',
            bio: data.user.bio || '',
          });
        }
      } catch {
        router.push(`/login?callbackUrl=${encodeURIComponent(router.asPath)}`);
      }
    };
    checkSessionAndLoad();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profile.name, bio: profile.bio }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Errore durante l'aggiornamento del profilo.");
      }

      setSuccess(data.message);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Impostazioni"
        description="Gestisci le impostazioni del tuo profilo Mind Project."
        canonicalUrl="https://mind-project.com/settings"
      />
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-14 sm:py-16">
        <span className="category-tag">Configurazione</span>
        <h1 className="text-2xl md:text-4xl font-black mb-6 sm:mb-8 italic">
          Impostazioni <span className="text-accent-primary">Profilo</span>
        </h1>
        <div className="bg-white/[0.02] border border-white/[0.06] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-xl space-y-6 sm:space-y-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-tight border-l-2 border-accent-primary/40 pl-3">
              Informazioni Pubbliche
            </h2>
            {error && (
              <div className="bg-red-500/[0.08] border border-red-500/20 text-red-400 text-xs font-bold p-3 rounded-lg text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500/[0.08] border border-green-500/20 text-green-400 text-xs font-bold p-3 rounded-lg text-center">
                {success}
              </div>
            )}

            <div className="grid gap-4">
              <div className="space-y-1.5">
                <label className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-600 ml-1">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all placeholder:text-gray-700 text-sm"
                  placeholder="Il tuo nome"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-600 ml-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 h-24 resize-none focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all placeholder:text-gray-700 text-sm"
                  placeholder="Raccontaci qualcosa di te..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-accent-primary text-black rounded-lg font-black text-xs transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(255,180,0,0.2)] w-fit uppercase tracking-wider disabled:opacity-50"
              >
                {loading ? 'Salvataggio...' : 'Salva Modifiche'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
