import SEO from '@/components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy di Mind Project. Come gestiamo e proteggiamo i tuoi dati personali."
        canonicalUrl="https://mind-project.com/homepage/privacy-policy"
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="category-tag justify-center">Legale</span>
          <h1 className="text-2xl sm:text-4xl font-black italic uppercase">
            Privacy <span className="text-accent-primary">Policy</span>
          </h1>
        </div>

        <div className="prose prose-invert prose-sm sm:prose max-w-none space-y-8">
          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">1. Introduzione</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mind Project respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">2. Raccolta dei dati</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Raccogliamo informazioni che ci fornisci direttamente quando ti registri, acquisti un servizio o ci contatti. Queste possono includere nome, email, informazioni di pagamento e dati di utilizzo.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">3. Utilizzo dei dati</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Utilizziamo le tue informazioni per: fornire i nostri servizi, elaborare transazioni, comunicare con te, migliorare la nostra piattaforma e rispettare obblighi legali.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">4. Protezione dei dati</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni personali. Utilizziamo crittografia, secure socket layer (SSL) e altre tecnologie di sicurezza.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">5. Cookie</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Il nostro sito utilizza cookie per migliorare l'esperienza utente. Puoi controllare i cookie attraverso le impostazioni del tuo browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">6. Terze parti</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Condividiamo dati con terze parti necessarie per fornire i nostri servizi (es. provider di pagamento, servizi di hosting). Questi soggetti sono tenuti a proteggere i tuoi dati.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">7. I tuoi diritti</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Hai diritto di accedere, correggere o eliminare i tuoi dati personali. Contattaci per esercitare questi diritti.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">8. Contatti</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Per domande sulla Privacy Policy, contattaci a: <a href="mailto:gabriele.forestieri0912@gmail.com" className="text-accent-primary">gabriele.forestieri0912@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
