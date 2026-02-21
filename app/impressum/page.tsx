export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            Dipl.-Ing. Thorsten Esch<br />
            Puchheimer Weg 16<br />
            82223 Eichenau
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: thorsten.esch@googlemail.com<br />
            USt-IdNr.: nicht erforderlich
          </p>

          <h2>Disclaimer</h2>
          <p>
            Kein offizieller Service von Google. Google ist eine Marke der Google LLC.
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-8">
            Stand: Februar 2026
          </p>
        </div>
      </div>
    </main>
  )
}