// Analytics wrapper — pluggable (PostHog, Plausible, etc.)
// Set NEXT_PUBLIC_POSTHOG_KEY in .env.local to enable PostHog.

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (id: string, properties?: Record<string, unknown>) => void;
      reset: () => void;
    };
  }
}

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function initAnalytics() {
  if (typeof window === 'undefined' || !POSTHOG_KEY) return;

  // PostHog snippet (lazy-loaded)
  if (!window.posthog) {
    const script = document.createElement('script');
    script.src = `https://us.i.posthog.com/static/array.js`;
    script.async = true;
    script.setAttribute('data-posthog-key', POSTHOG_KEY);
    script.setAttribute('data-posthog-host', 'https://us.i.posthog.com');
    document.head.appendChild(script);
  }
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.posthog?.capture(name, properties);
}

export function identifyUser(userId: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.posthog?.identify(userId, properties);
}
