export default function AGBPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Leistungsbeschreibung</h2>
          <p>
            Wir bieten eine automatisierte DIY-Analyse für gesperrte Google Business Profile an. 
            Dies stellt keine Rechtsberatung dar.
          </p>

          <h2>2. Vertragsgegenstand</h2>
          <p>
            Sie erhalten einen strukturierten Aktionsplan zur Freischaltung Ihres Google Business Profils.
            Eine erfolgreiche Entsperrung kann nicht garantiert werden.
          </p>

          <h2>3. Preise und Zahlung</h2>
          <p>
            Der Preis für die Analyse beträgt 79 € (einmalig). Die Zahlung ist derzeit ggf. noch nicht aktiviert.
          </p>

          <h2>4. Haftung</h2>
          <p>
            Wir haften nur für Vorsatz und grobe Fahrlässigkeit. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen.
            Eine Garantie für die erfolgreiche Freischaltung Ihres Profils können wir nicht übernehmen.
          </p>

          <h2>5. Disclaimer</h2>
          <p>
            Kein offizieller Service von Google. Google ist eine Marke der Google LLC.
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-8">
            Stand: Februar 2024
          </p>
        </div>
      </div>
    </main>
  )
}