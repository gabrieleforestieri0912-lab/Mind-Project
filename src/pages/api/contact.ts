import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Tutti i campi sono obbligatori.' });
  }

  try {
    const { data: newContact, error } = await supabase
      .from('contacts')
      .insert({ name, email, message })
      .select('id')
      .single();

    if (error) throw error;

    let emailSent = false;
    let emailError: string | null = null;

    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Mind Project <contact@mind-project.it>',
          to: [process.env.EMAIL_TO || 'gabriele.forestieri0912@gmail.com'],
          replyTo: email,
          subject: `Mind Project - Nuovo messaggio da ${name}`,
          html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0c0c0e; color: #e4e4e7; margin: 0; padding: 20px 0; -webkit-font-smoothing: antialiased; }
    .wrapper { max-width: 600px; margin: 0 auto; background-color: #141416; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; }
    .header { background-color: #1c1c1f; padding: 30px; text-align: center; border-bottom: 1px solid #27272a; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase; color: #ffffff; }
    .header h1 span { color: #ffb400; }
    .content { padding: 40px 30px; }
    .field { margin-bottom: 25px; }
    .label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #71717a; margin-bottom: 5px; }
    .value { font-size: 16px; font-weight: 500; color: #f4f4f5; }
    .value-email a { color: #ffb400; text-decoration: none; font-weight: bold; }
    .message-box { background-color: #1c1c1f; border: 1px solid #27272a; border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap; }
    .footer { background-color: #0c0c0e; padding: 20px; text-align: center; font-size: 11px; color: #52525b; border-top: 1px solid #27272a; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header"><h1>MIND <span>PROJECT</span></h1></div>
    <div class="content">
      <div class="field">
        <div class="label">Notifica di Contatto</div>
        <div style="font-size: 18px; font-weight: bold; color: #ffffff; margin-top: 5px;">Hai ricevuto un nuovo messaggio!</div>
      </div>
      <div style="margin-bottom: 25px; border-bottom: 1px solid #27272a; padding-bottom: 20px;">
        <div class="field" style="margin-bottom: 15px;">
          <div class="label">Nome Mittente</div>
          <div class="value" style="color: #ffffff; font-weight: bold;">${name}</div>
        </div>
        <div class="field" style="margin-bottom: 5px;">
          <div class="label">Indirizzo Email</div>
          <div class="value value-email"><a href="mailto:${email}">${email}</a></div>
        </div>
      </div>
      <div class="field">
        <div class="label">Messaggio</div>
        <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>
    </div>
    <div class="footer">Questa è una notifica automatica generata dal modulo contatti del sito Mind Project.</div>
  </div>
</body>
</html>`,
        });
        emailSent = true;
      } catch (err) {
        console.error('Failed to send contact email via Resend:', err);
        emailError = err instanceof Error ? err.message : 'Unknown error';
      }
    } else {
      console.warn('Resend API key not configured. Email sending was skipped.');
    }

    return res.status(200).json({
      message: 'Messaggio inviato con successo! Ti risponderemo entro 24 ore.',
      contactId: newContact?.id,
      emailSent,
      ...(emailError && { emailError }),
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ message: 'Errore interno del server. Riprova più tardi.' });
  }
}
