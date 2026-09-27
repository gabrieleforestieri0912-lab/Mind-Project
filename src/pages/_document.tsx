import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="it" data-scroll-behavior="smooth">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/assets/mind-project-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/mind-project-icon.png"
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="google-site-verification" content="googlea6268f8bf7c70352.html" />
        <meta name="theme-color" content="#050505" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
