export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Verantwortlicher</h2>
          <p>
            Dipl-Ing. Thorsten Esch<br />
            Puchheimer Weg 16<br />
            82223 Eichenau<br />
            E-Mail: thorsten.esch@googlemail.com
          </p>

          <h2>2. Hosting und Infrastruktur</h2>
          <p>
            Hosting-Anbieter: [Vercel]<br />
            Datenbank: Supabase
          </p>

          <h2>3. Datenverarbeitung</h2>
          <p>
            Wir verarbeiten folgende Daten:
          </p>
          <ul>
            <li>wizard_runs: Analysedaten und Ergebnisse</li>
            <li>conversion_events: Nutzungsstatistiken</li>
          </ul>

          <h2>4. Zweck der Verarbeitung</h2>
          <ul>
            <li>Bereitstellung der Analyse</li>
            <li>Fehleranalyse</li>
            <li>Missbrauchsprävention</li>
            <li>Conversion-Messung</li>
          </ul>

          <h2>5. Rechtsgrundlagen</h2>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsdurchführung) 
            und Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen).
          </p>

          <h2>6. Speicherdauer</h2>
          <p>
            Die Daten werden für [180 Tage] gespeichert und anschließend gelöscht.
          </p>

          <h2>7. Ihre Rechte</h2>
          <p>
            Sie haben folgende Rechte:
          </p>
          <ul>
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch (Art. 21 DSGVO)</li>
          </ul>

          <h2>8. Weitergabe von Daten</h2>
          <p>
            Eine Weitergabe von Daten erfolgt nur an unsere Auftragsverarbeiter (Supabase/Hosting).
            Stripe wird nur aktiviert, falls Sie eine Zahlung durchführen möchten.
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-8">
            Stand: Februar 2026
          </p>
        </div>
      </div>
    </main>
  )
}