import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const protectedPaths = [
  '/profile',
  '/settings',
  '/academy',
  '/mind-project',
  '/payment/checkout',
];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // La response va creata PRIMA del client: e' l'oggetto su cui i cookie
  // aggiornati (refresh dell'access token scaduto) vengono scritti dentro
  // setAll. Con un no-op l'utente autenticato risultava disconnesso non
  // appena il token andava in scadenza e veniva rimandato a /login.
  const response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // NextRequest.cookies accetta solo (name, value): le opzioni
            // (path, httpOnly, expiry...) vengono preservate sulla response.
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = '';
    // Conserva query string e fragment: senza ?service/plan/price il checkout
    // perderebbe il piano selezionato e dopo il login verrebbe caricato il
    // PaymentIntent errato.
    url.searchParams.set('callbackUrl', pathname + search);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets/|api/).*)',
  ],
};
