import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
  type?: string;
  jsonLd?: Record<string, unknown>;
}

export default function SEO({
  title,
  description,
  canonicalUrl,
  ogImage,
  keywords,
  type = 'website',
  jsonLd,
}: SEOProps) {
  const siteTitle = 'Gabriele Forestieri | Coaching Online & Mindset';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  const defaultDescription =
    'Coaching strategico e percorsi di mindset per diventare la miglior versione di te stesso attraverso l\'eccellenza mentale.';
  const pageDescription = description || defaultDescription;

  const defaultOgImage = '/assets/Image/mind-project-icon.png';
  const ogImageUrl = ogImage || defaultOgImage;

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
  ];
  const pageKeywords = keywords
    ? [...keywords, ...defaultKeywords].join(', ')
    : defaultKeywords.join(', ');

  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mind Project',
    url: 'https://mind-project.com',
    description: pageDescription,
    author: {
      '@type': 'Person',
      name: 'Gabriele Forestieri',
    },
  };

  const structuredData = jsonLd || defaultJsonLd;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="Gabriele Forestieri" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta charSet="utf-8" />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Mind Project" />
      <meta property="og:locale" content="it_IT" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mindproject" />
      {canonicalUrl && <meta property="twitter:url" content={canonicalUrl} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta name="theme-color" content="#050505" />
      <meta name="color-scheme" content="dark" />
      <meta name="msapplication-TileColor" content="#050505" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
