import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-10 sm:py-14 mt-16 sm:mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-12 sm:mb-14">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 group">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/assets/Image/mind-project-icon.png"
                  alt="Mind Project Logo"
                  fill
                  sizes="40px"
                  className="object-contain relative z-10"
                />
              </div>
              <span className="text-lg sm:text-xl font-black italic tracking-tighter">
                MIND<span className="text-accent-primary">PROJECT</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-5 sm:mb-6">
              Trasforma la tua vita attraverso la mentalità e le azioni.
              Coaching online e programmi di Calisthenics per la tua miglior
              versione.
            </p>
            <div className="flex gap-2">
              {['instagram', 'youtube', 'tiktok'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center hover:bg-accent-primary hover:border-accent-primary hover:scale-105 transition-all duration-300 group/social"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${social}/666`}
                    className="w-3.5 h-3.5 group-hover/social:brightness-0 transition-all"
                    alt={social}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h4 className="text-[10px] font-black text-white mb-4 sm:mb-5 uppercase tracking-[0.15em]">
                Servizi
              </h4>
              <ul className="space-y-2">
                {[
                  { name: 'Mind Project', href: '/services' },
                  { name: 'Mind Project VIP', href: '/services' },
                  { name: 'Business Protocol', href: '/services' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-500 text-xs transition-all hover:text-accent-primary hover:pl-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-white mb-4 sm:mb-5 uppercase tracking-[0.15em]">
                Legali
              </h4>
              <ul className="space-y-2">
                {[
                  { name: 'Privacy Policy', href: '/privacy-policy' },
                  { name: 'Termini', href: '/terms-of-service' },
                  { name: 'Supporto', href: '/contacts' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-500 text-xs transition-all hover:text-accent-primary hover:pl-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-white mb-4 sm:mb-5 uppercase tracking-[0.15em]">
                Contatti
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:gabriele.forestieri0912@gmail.com"
                    className="text-gray-500 text-xs transition-all hover:text-accent-primary"
                  >
                    gabriele.forestieri0912@gmail.com
                  </a>
                </li>
                <li>
                  <Link
                    href="/contacts"
                    className="text-gray-500 text-xs transition-all hover:text-accent-primary"
                  >
                    Contattaci
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-5 sm:pt-6 border-t border-white/[0.04] flex justify-center items-center">
          <p className="text-gray-500 text-xs tracking-wide text-center">
            &copy; {new Date().getFullYear()} Gabriele Forestieri.
          </p>
        </div>
      </div>
    </footer>
  );
}
