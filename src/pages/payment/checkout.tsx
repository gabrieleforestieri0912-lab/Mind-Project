'use client';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { useRouter } from 'next/router';
import { Shield } from 'lucide-react';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(0);
  const [service, setService] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const stripeKeyMissing = !stripePromise;

  useEffect(() => {
    const isLoggedInCheck = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isLoggedInCheck);
    if (!isLoggedInCheck) {
      router.push('/login?callbackUrl=' + encodeURIComponent(router.asPath));
      return;
    }

    if (!router.isReady) return;

    const { service: queryService, plan: queryPlan, price: queryPrice } = router.query;

    const finalAmount = parseFloat(queryPrice as string) || 25;
    setAmount(finalAmount);
    setService((queryService as string) || 'Programma Personalizzato');

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: queryService || 'MIND PROJECT',
        plan: queryPlan || 'Mensile',
        metadata: { service: queryService, plan: queryPlan },
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [router.isReady, router.query, router]);

  if (!isLoggedIn && router.isReady) {
    return null;
  }

  return (
    <>
      <SEO
        title="Checkout"
        description="Completa il tuo acquisto in modo sicuro tramite Stripe."
        canonicalUrl="https://mind-prjct.vercel.app/payment/checkout"
      />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-14 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-start">
        <div>
          <span className="category-tag">Pagamento Sicuro</span>
          <h1 className="text-2xl md:text-4xl font-black mb-4 sm:mb-5 italic uppercase tracking-tighter">
            Sicurezza{' '}
            <span className="text-accent-primary underline decoration-accent-primary/20 underline-offset-4">
              Garantita
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
            I tuoi dati sono protetti da crittografia end-to-end tramite Stripe.
            Completa il tuo ordine per sbloccare i contenuti.
          </p>

          <div className="bg-white/[0.02] border border-white/[0.06] p-4 sm:p-5 rounded-xl sm:rounded-xl space-y-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-accent-primary" />
              <h2 className="text-xs font-black uppercase tracking-wider text-accent-primary">
                Riepilogo Ordine
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                <div>
                  <p className="text-white font-black uppercase text-sm">
                    {service}
                  </p>
                </div>
                <span className="text-lg font-black text-white">
                  {amount}€
                </span>
              </div>
              <div className="flex justify-between text-lg font-black pt-1">
                <span>Totale</span>
                <span className="text-accent-primary">{amount}€</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-accent-primary/10 p-4 sm:p-5 md:p-6 rounded-xl shadow-[0_0_25px_rgba(255,180,0,0.03)] backdrop-blur-sm">
          {stripeKeyMissing ? (
            <p className="py-8 text-center text-sm text-red-400 font-bold uppercase tracking-widest">
              Pagamenti non disponibili: chiave Stripe non configurata
              (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
            </p>
          ) : clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance: { theme: 'night' } }}
            >
              <CheckoutForm amount={amount} service={service} />
            </Elements>
          ) : (
            <div className="py-8 space-y-4 animate-pulse">
              <div className="w-full h-12 bg-white/5 rounded-lg" />
              <div className="w-full h-12 bg-white/5 rounded-lg" />
              <div className="flex gap-3">
                <div className="flex-1 h-12 bg-white/5 rounded-lg" />
                <div className="flex-1 h-12 bg-white/5 rounded-lg" />
              </div>
              <div className="w-full h-12 bg-white/5 rounded-lg mt-4" />
              <p className="text-gray-600 font-bold uppercase tracking-widest text-[8px] text-center">
                Connessione a Stripe...
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
