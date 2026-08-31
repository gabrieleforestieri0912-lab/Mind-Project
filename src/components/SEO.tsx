import Head from 'next/head';

export const SITE_URL = 'https://mind-project.com';
export const SITE_NAME = 'Mind Project';
export const AUTHOR_NAME = 'Gabriele Forestieri';
export const CONTACT_EMAIL = 'gabriele.forestieri0912@gmail.com';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

const toAbsoluteUrl = (url?: string): string => {
  if (!url) return `${SITE_URL}/assets/mind-project-icon.png`;
  if (url.startsWith('http')) return url;
  return `${SITE_URL}${url}`;
};

const defaultJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Mind Project',
      url: SITE_URL,
      logo: `${SITE_URL}/assets/mind-project-icon.png`,
      email: CONTACT_EMAIL,
      foundingDate: '2024',
      founder: { '@id': `${SITE_URL}/#person` },
      contactPoint: {
        '@type': 'ContactPoint',
        email: CONTACT_EMAIL,
        contactType: 'customer support',
        availableLanguage: ['Italian'],
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      jobTitle: 'Performance Coach',
      url: SITE_URL,
      email: CONTACT_EMAIL,
      description:
        'Performance coach e fondatore di Mind Project, programma di coaching online per mindset, disciplina e crescita personale.',
      knowsAbout: [
        'mindset',
        'disciplina',
        'abitudini atomiche',
        'psicologia comportamentale',
        'performance mentale',
        'crescita personale',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Coaching strategico e percorsi di mindset per diventare la miglior versione di te stesso attraverso l'eccellenza mentale.",
      inLanguage: 'it-IT',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

export default function SEO({
  title,
  description,
  canonicalUrl,
  ogImage,
  keywords,
  type = 'website',
  jsonLd,
  publishedTime,
  modifiedTime,
  noIndex,
}: SEOProps) {
  const siteTitle = 'Gabriele Forestieri | Coaching Online & Mindset';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  const defaultDescription =
    "Coaching strategico e percorsi di mindset per diventare la miglior versione di te stesso attraverso l'eccellenza mentale.";
  const pageDescription = description || defaultDescription;

  const pageOgImage = toAbsoluteUrl(ogImage);
  const pageCanonical = canonicalUrl || `${SITE_URL}/`;

  const defaultKeywords = [
    'mindset coaching',
    'coaching online',
    'performance mentale',
    'Gabriele Forestieri',
    'Mind Project',
    'disciplina',
    'mentalità',
    'successo',
    'sviluppo personale',
    'abitudini atomiche',
  ];
  const pageKeywords = keywords
    ? [...keywords, ...defaultKeywords].join(', ')
    : defaultKeywords.join(', ');

  const structuredData = jsonLd
    ? Array.isArray(jsonLd)
      ? [...jsonLd, ...defaultJsonLd['@graph']]
      : [jsonLd, ...defaultJsonLd['@graph']]
    : defaultJsonLd['@graph'];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="Gabriele Forestieri" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta charSet="utf-8" />

      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      <link rel="canonical" href={pageCanonical} />
      <link
        rel="alternate"
        type="text/markdown"
        href={`${SITE_URL}/llms.txt`}
        title="llms.txt"
      />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Mind Project" />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:locale:alternate" content="it_IT" />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mindproject" />
      <meta name="twitter:creator" content="@gabforestieri" />
      <meta name="twitter:url" content={pageCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageOgImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      <meta name="theme-color" content="#050505" />
      <meta name="color-scheme" content="dark" />
      <meta name="msapplication-TileColor" content="#050505" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': structuredData }) }}
      />
    </Head>
  );
}
