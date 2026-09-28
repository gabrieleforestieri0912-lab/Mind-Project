// Catalogo prezzi unico per Mind Project.
// Usato da: pagine servizio (card prezzi), home, /services e
// src/pages/api/create-payment-intent.ts (che ricalcola l'importo lato server
// prima di creare il PaymentIntent: se questo valore non combacia con quello
// mostrato in pagina, l'addebito non corrisponde a what's displayed).
export interface Plan {
  name: string;
  /** Prezzo formattato con valuta, es. '27€' */
  price: string;
  /** Valore numerico in euro, usato per il checkout e Stripe */
  priceValue: number;
  /** Durata del piano, es. '/mese' */
  duration: string;
  /** CTA mostrata sulla card piano */
  cta: string;
  /** Chiave usata dal catalogo server per ricalcolare l'importo */
  service: string;
  /** Alias di `name`, usato nelle query string del checkout */
  plan: string;
  /** true = piano in evidenza, false = piano secondario */
  highlight: boolean;
  /** true = piano non acquistabile al momento */
  disabled?: boolean;
  badge?: string;
  bonuses?: string[];
}

export const SERVICE_KEYS = {
  mindProject: 'MIND PROJECT',
  mindProjectVip: 'MIND PROJECT VIP',
  businessProtocol: 'BUSINESS PROTOCOL',
} as const;

export const MIND_PROJECT_PLANS: Plan[] = [
  {
    name: 'Mensile',
    plan: 'Mensile',
    price: '27€',
    priceValue: 27,
    duration: '/mese',
    highlight: false,
    cta: 'Inizia Ora',
    service: SERVICE_KEYS.mindProject,
    bonuses: ['Video corso mentalità per apprendere le basi'],
  },
  {
    name: 'Annuale',
    plan: 'Annuale',
    price: '397€',
    priceValue: 397,
    duration: '/anno',
    highlight: false,
    disabled: true,
    badge: 'Offerta a tempo limitato',
    cta: 'Non disponibile',
    service: SERVICE_KEYS.mindProject,
    bonuses: [
      'Video corso mentalità per apprendere le basi',
      'Videochiamata iniziale 1:1 con me',
      'Accesso a tutte le Videochiamate Registrate (+20 ore)',
    ],
  },
];

export const MIND_PROJECT_VIP_PLANS: Plan[] = [
  {
    name: 'Trimestrale',
    plan: 'Trimestrale',
    price: '197€',
    priceValue: 197,
    duration: '/3 mesi',
    highlight: false,
    cta: 'Diventa VIP',
    service: SERVICE_KEYS.mindProjectVip,
  },
  {
    name: 'Semestrale',
    plan: 'Semestrale',
    price: '397€',
    priceValue: 397,
    duration: '/6 mesi',
    highlight: false,
    cta: 'Diventa VIP',
    service: SERVICE_KEYS.mindProjectVip,
  },
  {
    name: 'Annuale',
    plan: 'Annuale',
    price: '697€',
    priceValue: 697,
    duration: '/anno',
    highlight: true,
    badge: 'La Scelta dei Leader',
    cta: 'Accedi al Massimo Livello',
    service: SERVICE_KEYS.mindProjectVip,
  },
];

export const BUSINESS_PROTOCOL_PLANS: Plan[] = [
  {
    name: 'Semestrale',
    plan: 'Semestrale',
    price: '497€',
    priceValue: 497,
    duration: '/6 mesi',
    highlight: false,
    cta: 'Inizia Ora',
    service: SERVICE_KEYS.businessProtocol,
  },
  {
    name: 'Annuale',
    plan: 'Annuale',
    price: '897€',
    priceValue: 897,
    duration: '/anno',
    highlight: true,
    badge: 'La Scelta dei Vincitori',
    cta: 'Accedi al Percorso',
    service: SERVICE_KEYS.businessProtocol,
  },
];

/** Prezzo d'ingresso mostrato sulle card dei percorsi (home e /services). */
export const ENTRY_PRICE: Record<string, { price: string; duration: string }> = {
  [SERVICE_KEYS.mindProject]: { price: '27€', duration: '/mese' },
  [SERVICE_KEYS.mindProjectVip]: { price: '197€', duration: '/3 mesi' },
  [SERVICE_KEYS.businessProtocol]: { price: '497€', duration: '/6 mesi' },
};

export const HELL_ROOM_PRICE = { price: '750€', duration: '/una tantum' };

/**
 * Catalogo server: DEVE restare allineato a quello sopra.
 * È la fonte di verità per l'importo addebitato su Stripe.
 */
export const PRICING_CATALOG: Record<string, Record<string, number>> = {
  [SERVICE_KEYS.mindProject]: {
    Mensile: MIND_PROJECT_PLANS[0].priceValue,
  },
  [SERVICE_KEYS.mindProjectVip]: {
    Trimestrale: MIND_PROJECT_VIP_PLANS[0].priceValue,
    Semestrale: MIND_PROJECT_VIP_PLANS[1].priceValue,
    Annuale: MIND_PROJECT_VIP_PLANS[2].priceValue,
  },
  [SERVICE_KEYS.businessProtocol]: {
    Semestrale: BUSINESS_PROTOCOL_PLANS[0].priceValue,
    Annuale: BUSINESS_PROTOCOL_PLANS[1].priceValue,
  },
};
