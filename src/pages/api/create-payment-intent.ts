import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import { getToken } from 'next-auth/jwt';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31' as Stripe.LatestApiVersion,
});

const PRICING_CATALOG: Record<string, Record<string, number>> = {
  'MIND PROJECT': {
    Mensile: 30,
    Trimestrale: 80,
    Annuale: 280,
  },
  'MIND PROJECT VIP': {
    Trimestrale: 150,
    Semestrale: 280,
    Annuale: 500,
  },
  'BUSINESS PROTOCOL': {
    Trimestrale: 197,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { service, plan, metadata } = req.body;

    if (!service || !plan) {
      return res.status(400).json({ error: 'Servizio e piano richiesti.' });
    }

    const serviceCatalog = PRICING_CATALOG[service as string];
    if (!serviceCatalog) {
      return res.status(400).json({ error: 'Servizio non valido.' });
    }

    const securePrice = serviceCatalog[plan as string];
    if (!securePrice) {
      return res.status(400).json({ error: 'Piano non valido per questo servizio.' });
    }

    let userEmail: string | null = null;
    let userId: string | null = null;

    const nextAuthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (nextAuthToken?.email) {
      userEmail = nextAuthToken.email as string;
    } else {
      const { auth_token } = req.cookies;
      if (auth_token) {
        try {
          const decoded = jwt.verify(auth_token, process.env.JWT_SECRET!) as { userId: string };
          userId = decoded.userId;
        } catch {
          // Non bloccante
        }
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(securePrice * 100),
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        ...(metadata as Record<string, string> | undefined),
        service: service as string,
        plan: plan as string,
        securePrice: String(securePrice),
        userId: userId || '',
        userEmail: userEmail || '',
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe Error:', err instanceof Error ? err.message : err);
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
}
