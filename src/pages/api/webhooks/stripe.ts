import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Non forzare apiVersion: vedi nota in create-payment-intent.ts.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(readable: NodeJS.ReadableStream): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk as Buffer);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'] as string | undefined;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } else {
      console.warn('Stripe webhook signature not verified. STRIPE_WEBHOOK_SECRET missing.');
      event = JSON.parse(rawBody.toString());
    }
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err instanceof Error ? err.message : err}`);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : err}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { userId, userEmail, service } = paymentIntent.metadata || {};

    if ((userId || userEmail) && service) {
      try {
        let user: { id: string } | null = null;

        if (userId) {
          const { data } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('id', userId)
            .single();
          user = data;
        } else if (userEmail) {
          const { data } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('email', userEmail)
            .single();
          user = data;
        }

        if (user) {
          const serviceName = String(service).toUpperCase();
          const updates: Record<string, unknown> = {};
          if (serviceName.includes('VIP')) {
            updates.subscription_type = 'vip';
            updates.is_vip = true;
          } else if (serviceName.includes('BUSINESS')) {
            updates.subscription_type = 'vip';
            updates.is_vip = true;
          } else {
            updates.subscription_type = 'standard';
            updates.is_vip = false;
          }

          await supabaseAdmin.from('users').update(updates).eq('id', user.id);
          console.log(`Subscription updated via Webhook for user: ${userEmail || userId} -> ${updates.subscription_type}`);
        } else {
          console.error(`Webhook: User not found with ID ${userId} or email ${userEmail}`);
        }
      } catch (dbErr) {
        console.error("Webhook: Error updating user in DB:", dbErr);
        return res.status(500).json({ error: 'Database update failed' });
      }
    } else {
      console.warn('Webhook: Missing user details or service in PaymentIntent metadata', paymentIntent.metadata);
    }
  }

  res.status(200).json({ received: true });
}
