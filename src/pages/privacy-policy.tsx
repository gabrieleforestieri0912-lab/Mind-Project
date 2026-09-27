import SEO from '@/components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy di Mind Project. Come gestiamo e proteggiamo i tuoi dati personali."
        canonicalUrl="https://mind-prjct.vercel.app/privacy-policy"
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="category-tag justify-center">Legale</span>
          <h1 className="text-2xl sm:text-4xl font-black italic uppercase">
            Privacy <span className="text-accent-primary">Policy</span>
          </h1>
          <p className="text-gray-400 text-sm mt-4">Ultimo aggiornamento: Settembre 2026</p>
        </div>

        <div className="prose prose-invert prose-sm sm:prose max-w-none space-y-8">
          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">1. Introduzione</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mind Project ("noi", "nostro", "ci") si impegna a proteggere la tua privacy. Questa Privacy Policy spiega in dettaglio come raccogliamo, utilizziamo, divulghiamo e proteggiamo le tue informazioni personali quando utilizzi il nostro sito web https://mind-prjct.vercel.app e i nostri servizi di coaching online.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Utilizzando il nostro sito e i nostri servizi, accetti la raccolta e l'uso delle tue informazioni come descritto in questa politica. Se non accetti la nostra politica, ti preghiamo di non utilizzare il nostro sito o i nostri servizi.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">2. Dati che raccogliamo</h2>
            <h3 className="text-base font-bold text-white mb-2">2.1 Dati personali forniti direttamente</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Raccogliamo informazioni che ci fornisci volontariamente quando:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>Crei un account (nome, email, password)</li>
              <li>Acquisti i nostri servizi (informazioni di pagamento, indirizzo di fatturazione)</li>
              <li>Compili il modulo di contatto (nome, email, messaggio)</li>
              <li>Ti iscrivi alla newsletter (indirizzo email)</li>
              <li>Partecipi ai programmi di coaching (progressi, obiettivi personali)</li>
            </ul>

            <h3 className="text-base font-bold text-white mb-2 mt-4">2.2 Dati raccolti automaticamente</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Quando visiti il nostro sito, raccogliamo automaticamente:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>Indirizzo IP e informazioni sul dispositivo</li>
              <li>Tipo di browser e sistema operativo</li>
              <li>Pagine visitate e tempo speso sul sito</li>
              <li>Referrer (sito da cui provieni)</li>
              <li>Clic e interazioni con il sito</li>
            </ul>

            <h3 className="text-base font-bold text-white mb-2 mt-4">2.3 Cookie e tecnologie simili</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Utilizziamo cookie e tecnologie simili per:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>Mantenere la sessione di login</li>
              <li>Analizzare il traffico del sito (Google Analytics)</li>
              <li>Migliorare l'esperienza utente</li>
              <li>Personalizzare i contenuti</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">3. Utilizzo dei dati</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Utilizziamo le tue informazioni personali per le seguenti finalità:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Fornitura dei servizi:</strong> Erogare i programmi di coaching, corsi e contenuti che hai acquistato</li>
              <li><strong>Elaborazione pagamenti:</strong> Processare transazioni e inviare ricevute/fatture</li>
              <li><strong>Comunicazioni:</strong> Inviare email relative al tuo account, aggiornamenti sui servizi e materiale educativo</li>
              <li><strong>Miglioramento:</strong> Analizzare l'utilizzo per migliorare i nostri servizi e contenuti</li>
              <li><strong>Sicurezza:</strong> Prevenire frodi, abusi e proteggere il nostro sito</li>
              <li><strong>Conformità legale:</strong> Rispettare obblighi legali e normativi</li>
              <li><strong>Marketing:</strong> Inviare newsletter e promozioni (con il tuo consenso)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">4. Base legale del trattamento</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Il trattamento dei tuoi dati personali si basa sulle seguenti basi legali (GDPR):
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Consenso:</strong> Quando ci dai il consenso esplicito (es. newsletter)</li>
              <li><strong>Contratto:</strong> Quando necessario per eseguire un contratto (es. fornire servizi pagati)</li>
              <li><strong>Obbligo legale:</strong> Quando richiesto dalla legge (es. fatturazione)</li>
              <li><strong>Interesse legittimo:</strong> Per scopi legittimi come sicurezza e miglioramento del servizio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">5. Condivisione dei dati</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Potremmo condividere le tue informazioni con:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Stripe:</strong> Per elaborare pagamenti in modo sicuro</li>
              <li><strong>Supabase:</strong> Per l'hosting del database e autenticazione</li>
              <li><strong>Vercel:</strong> Per l'hosting del sito web</li>
              <li><strong>Resend:</strong> Per l'invio di email transazionali</li>
              <li><strong>Google Analytics:</strong> Per analizzare il traffico del sito</li>
              <li><strong>Autorità legali:</strong> Quando richiesto dalla legge</li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed">
              Non vendiamo i tuoi dati personali a terze parti. Tutti i nostri fornitori di servizi sono vincolati da contratti che proteggono la tua privacy.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">6. Trasferimenti internazionali</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              I tuoi dati possono essere trasferiti e trattati in paesi al di fuori dell'Unione Europea. Quando questo accade, ci assicuriamo che siano in place adeguate salvaguardie (es. clausole contrattuali standard UE) per proteggere i tuoi dati conformemente al GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">7. Sicurezza dei dati</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Implementiamo misure di sicurezza tecniche e organizzative per proteggere le tue informazioni:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>Crittografia SSL/TLS per tutte le comunicazioni</li>
              <li>Crittografia dei dati sensibili nel database</li>
              <li>Accessi limitati e autenticazione multi-fattore</li>
              <li>Monitoraggio regolare per vulnerabilità</li>
              <li>Backup sicuri e piani di recupero dati</li>
              <li>Aggiornamenti regolari dei sistemi di sicurezza</li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nonostante le nostre misure, nessun metodo di trasmissione su internet è 100% sicuro. Non possiamo garantire la sicurezza assoluta dei dati.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">8. Conservazione dei dati</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Conserviamo i tuoi dati personali per il tempo necessario alle finalità per cui sono stati raccolti:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Account:</strong> Finché il tuo account è attivo o fino a quando non richiedi la cancellazione</li>
              <li><strong>Transazioni:</strong> Per 10 anni per obblighi fiscali e contabili</li>
              <li><strong>Marketing:</strong> Finché mantieni il consenso o fino a quando non revoci</li>
              <li><strong>Log di sistema:</strong> Per 12 mesi per sicurezza e analisi</li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed">
              Al termine del periodo di conservazione, i dati vengono eliminati o anonimizzati in modo sicuro.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">9. I tuoi diritti (GDPR)</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Hai i seguenti diritti sui tuoi dati personali:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Diritto di accesso:</strong> Sapere quali dati possediamo su di te</li>
              <li><strong>Diritto di rettifica:</strong> Correggere dati inaccurati o incompleti</li>
              <li><strong>Diritto alla cancellazione:</strong> Richiedere la cancellazione dei tuoi dati</li>
              <li><strong>Diritto alla limitazione:</strong> Limitare il trattamento dei tuoi dati</li>
              <li><strong>Diritto alla portabilità:</strong> Ricevere i tuoi dati in formato strutturato</li>
              <li><strong>Diritto di opposizione:</strong> Opporti al trattamento per interesse legittimo</li>
              <li><strong>Diritto di revoca del consenso:</strong> Revocare il consenso precedentemente dato</li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed">
              Per esercitare questi diritti, contattaci all'indirizzo email indicato di seguito.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">10. Cookie</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Il nostro sito utilizza diversi tipi di cookie:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Cookie essenziali:</strong> Necessari per il funzionamento del sito (autenticazione, sicurezza)</li>
              <li><strong>Cookie analitici:</strong> Per analizzare come utilizzi il sito (Google Analytics)</li>
              <li><strong>Cookie funzionali:</strong> Per ricordare le tue preferenze</li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed">
              Puoi gestire le preferenze dei cookie attraverso le impostazioni del tuo browser. Tieni presente che disabilitare i cookie essenziali potrebbe impedire il funzionamento corretto del sito.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">11. Minori</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              I nostri servizi non sono destinati a minori di 18 anni. Non raccogliamo consapevolmente informazioni personali da minori. Se veniamo a conoscenza di aver raccolto dati da un minore, provvederemo a eliminarli immediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">12. Modifiche alla policy</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con la data di ultimo aggiornamento. L'uso continuato del sito dopo le modifiche costituisce accettazione della nuova policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mb-3">13. Contatti</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Per domande, reclami o richieste relative alla privacy policy, contattaci:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Email:</strong> <a href="mailto:gabriele.forestieri0912@gmail.com" className="text-accent-primary">gabriele.forestieri0912@gmail.com</a></li>
              <li><strong>Sito:</strong> https://mind-prjct.vercel.app</li>
              <li><strong>Indirizzo:</strong> Italia</li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed">
              Risponderemo alla tua richiesta entro 30 giorni come previsto dal GDPR.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
