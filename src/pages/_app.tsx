import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { initAnalytics } from '@/lib/analytics';
import type { AppProps } from 'next/app';

if (typeof window !== 'undefined') {
  initAnalytics();
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const handleReveal = () => {
      if (observer) observer.disconnect();

      const reveals = document.querySelectorAll('.reveal');

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      reveals.forEach((reveal) => {
        reveal.classList.remove('active');
        observer?.observe(reveal);
      });
    };

    const timer = setTimeout(handleReveal, 100);

    if (['/login', '/signup'].includes(router.pathname)) {
      document.body.classList.add('no-padding');
    } else {
      document.body.classList.remove('no-padding');
    }

    router.events.on('routeChangeComplete', handleReveal);

    return () => {
      clearTimeout(timer);
      router.events.off('routeChangeComplete', handleReveal);
      if (observer) observer.disconnect();
    };
  }, [router.events, router.pathname]);

  const hideNavAndFooter = ['/login', '/signup'].includes(router.pathname);

  return (
    <SupabaseAuthProvider>
      {!hideNavAndFooter && <Navbar />}
      <div className={hideNavAndFooter ? '' : 'min-h-screen pt-20'}>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </div>
      {!hideNavAndFooter && <Footer />}
    </SupabaseAuthProvider>
  );
}
