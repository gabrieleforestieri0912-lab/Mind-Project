'use client';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

interface CheckoutFormProps {
  amount: number;
  service: string;
}

export default function CheckoutForm({ amount, service }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const returnUrl = `${window.location.origin}/payment/success?service=${encodeURIComponent(service)}`;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'An error occurred');
    } else {
      setMessage('Si è verificato un errore inaspettato.');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] p-5 rounded-xl" />

      <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.04] text-xs text-gray-500 leading-relaxed">
        Effettuando il pagamento accetti i nostri{' '}
        <span className="text-accent-primary underline cursor-pointer">
          termini di servizio
        </span>
        . Riceverai immediatamente l&apos;accesso ai contenuti digitali.
      </div>

      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full flex items-center justify-center gap-2 px-7 py-5 bg-accent-primary text-black rounded-xl font-black text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,180,0,0.2)] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Elaborazione...' : `Paga ${amount}€`}
      </button>

      {message && (
        <div className="text-red-400 font-bold text-center text-sm">
          {message}
        </div>
      )}
    </form>
  );
}
