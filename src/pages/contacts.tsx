import { useState } from 'react';
import SEO from '@/components/SEO';

export default function Contacts() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Qualcosa è andato storto. Riprova.');
      }

      setSuccess(data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contatti"
        description="Contattaci per domande sui programmi di coaching e mindset. Risposta entro 24 ore."
        canonicalUrl="https://mind-project.com/contacts"
        keywords={['contatti coaching', 'supporto mindset', 'info Mind Project']}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          <div>
            <span className="category-tag">Supporto</span>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-5 italic uppercase tracking-tighter">
              Mettiti in{' '}
              <span className="text-accent-primary">Contatto</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
              Hai domande sui programmi o sul coaching? Scrivimi e ti risponderò
              il prima possibile.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary text-sm sm:text-base border border-accent-primary/20 shrink-0">
                  ✉
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-gray-600 mb-0.5">
                    Email
                  </p>
                  <span className="font-bold text-white text-sm sm:text-base break-all">
                    gabriele.forestieri0912@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-xl space-y-3 sm:space-y-4">
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

            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-600 ml-1">
                Nome
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Il tuo nome"
                autoComplete="name"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 sm:px-5 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all placeholder:text-gray-600"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-600 ml-1">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="la-tua@email.com"
                autoComplete="email"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 sm:px-5 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all placeholder:text-gray-600"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-600 ml-1">
                Messaggio
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Come possiamo aiutarti?"
                rows={4}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 sm:px-5 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 transition-all resize-none placeholder:text-gray-600"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-accent-primary text-black rounded-lg font-black text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,180,0,0.2)] uppercase tracking-wider disabled:opacity-50"
            >
              {loading ? 'Invio in corso...' : 'Invia Messaggio'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
