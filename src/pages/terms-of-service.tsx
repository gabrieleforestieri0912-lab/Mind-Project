import SEO from '@/components/SEO';

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Termini di Servizio"
        description="Termini di Servizio di Mind Project. Condizioni d'uso della piattaforma."
        canonicalUrl="https://mind-prjct.vercel.app/terms-of-service"
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="category-tag justify-center">Legale</span>
          <h1 className="text-2xl sm:text-4xl font-black italic uppercase">
            Termini di <span className="text-accent-primary">Servizio</span>
          </h1>
        </div>

        <div className="prose prose-invert prose-sm sm:prose max-w-none space-y-8">
          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">1. Accettazione dei termini</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Accedendo e utilizzando il sito web di Mind Project, accetti di essere vincolato da questi Termini di Servizio. Se non accetti questi termini, non dovresti utilizzare il nostro sito.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">2. Descrizione del servizio</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mind Project fornisce programmi di coaching online, corsi sulla mentalità e contenuti relativi alla performance e alla disciplina. I servizi sono forniti da Gabriele Forestieri come performance coach.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">3. Account utente</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Per accedere a determinati servizi, potrebbe essere necessario creare un account. Sei responsabile di mantenere la riservatezza delle tue credenziali e di tutte le attività sotto il tuo account.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">4. Acquisti e pagamenti</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tutti gli acquisti sono soggetti ai nostri termini di pagamento. I prezzi sono espressi in euro e possono essere modificati in qualsiasi momento. Offriamo diversi piani di abbonamento con fatturazione ricorrente.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">5. Politica di rimborso</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Offriamo un diritto di recesso di 14 giorni per i nuovi acquisti, a condizione che il contenuto digitale non sia stato ancora fruito. Per richiedere un rimborso, contattaci a gabriele.forestieri0912@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">6. Proprietà intellettuale</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tutti i contenuti presenti sul sito, inclusi testi, immagini, video, grafica e codice, sono proprietà di Mind Project o dei suoi licenziatari. Non è consentito copiare, distribuire o utilizzare questi contenuti senza autorizzazione scritta.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">7. Uso responsabile</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ti aspettiamo di utilizzare il sito in modo responsabile e legale. Non sono consentiti: comportamenti fraudolenti, tentativi di hacking, violazione di diritti di terzi, o qualsiasi attività che possa danneggiare il sito o gli altri utenti.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">8. Limitazione di responsabilità</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mind Project non garantisce che il sito sia sempre disponibile o privo di errori. Non siamo responsabili per eventuali danni derivanti dall'utilizzo del sito o dei suoi servizi.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">9. Modifiche ai termini</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ci riserviamo il diritto di modificare questi Termini di Servizio in qualsiasi momento. Le modifiche saranno efficaci appena pubblicate sul sito. L'uso continuato del sito dopo le modifiche costituisce accettazione dei nuovi termini.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">10. Contatti</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Per domande sui Termini di Servizio, contattaci a: <a href="mailto:gabriele.forestieri0912@gmail.com" className="text-accent-primary">gabriele.forestieri0912@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
