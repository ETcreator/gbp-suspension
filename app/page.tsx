import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function HomePage() {
  const MainCTA = ({ children }: { children: React.ReactNode }) => (
    <Button 
      asChild 
      size="lg" 
      className="font-medium bg-blue-700 hover:bg-blue-800 text-white px-8 py-5 text-lg shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
    >
      {children}
    </Button>
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h1 className="leading-[1.15]">
              <span className="block text-4xl md:text-5xl font-bold tracking-tight">
                Google Profil gesperrt?
              </span>
              <span className="block text-4xl md:text-4xl font-semibold text-blue-700 dark:text-blue-500 mt-2">
                Erhalten Sie jetzt Ihren konkreten Entsperrplan – inklusive der Dokumente, die für Ihren Einspruch entscheidend sind.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-8 leading-relaxed">
              Analyse dauert ca. 5 Minuten + individueller Einspruchsplan für Ihr Unternehmensprofil.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Basierend auf aktuellen Google Business Richtlinien · Kein Zugriff auf Ihr Google Konto erforderlich
            </p>
          </div>
          <div className="space-y-4 pt-4">
            <MainCTA>
              <Link href="/wizard">
                Kostenlose 5-Minuten-Analyse starten
              </Link>
            </MainCTA>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Keine Anmeldung · Sofort Ergebnis · 100 % unverbindlich
            </p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white/70 dark:bg-slate-900/70">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <p className="text-sm md:text-base text-emerald-600 dark:text-emerald-500">✓ Speziell für gesperrte Google Business Profile</p>
            <p className="text-sm md:text-base text-emerald-600 dark:text-emerald-500">✓ Kein Agenturvertrag – Do-it-yourself Plan</p>
            <p className="text-sm md:text-base text-emerald-600 dark:text-emerald-500">✓ Entwickelt für lokale Unternehmen</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-4">
        <div className="container max-w-4xl mx-auto space-y-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-center">
            So funktioniert's
          </h2>
          <div className="grid gap-8">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Der Prozess</h3>
                    <div className="space-y-4">
                      <p className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center flex-shrink-0">1</span>
                        <span>Sie beantworten 6 gezielte Fragen</span>
                      </p>
                      <p className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center flex-shrink-0">2</span>
                        <span>Wir identifizieren den wahrscheinlichsten Sperrgrund</span>
                      </p>
                      <p className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center flex-shrink-0">3</span>
                        <span>Sie erhalten eine konkrete Einspruchsvorlage + Dokumenten-Checkliste</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-80 space-y-8">
                  <div className="text-center p-6 bg-blue-50 dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700">
                    <div className="space-y-2">
                      <p className="text-base md:text-lg text-slate-700 dark:text-slate-300">
                        Kostenlose Analyse · Individueller Freischaltungs-Plan für 79 € einmalig
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                        Schon ein gewonnener Kunde amortisiert die Investition.
                      </p>
                    </div>
                    <ul className="mt-6 space-y-3 text-emerald-600 dark:text-emerald-500">
                      <li>✓ Kein Abo</li>
                      <li>✓ Keine laufenden Kosten</li>
                      <li>✓ Sofort verfügbar</li>
                    </ul>
                  </div>
                  <MainCTA>
                    <Link href="/wizard" className="w-full">
                      Kostenlose 5-Minuten-Analyse starten
                    </Link>
                  </MainCTA>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Ratgeber Section */}
      <section className="py-24 px-4">
        <div className="container max-w-4xl mx-auto space-y-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-center">
            Hilfreiche Ratgeber
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
              <Link href="/google-unternehmensprofil-gesperrt" className="block space-y-4 group">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300">
                  Profil gesperrt?
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Verstehen Sie die Ursachen und erfahren Sie, welche Schritte zur Reaktivierung führen.
                </p>
                <span className="text-sm text-blue-700 dark:text-blue-400 font-medium inline-flex items-center">
                  Mehr erfahren
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
              <Link href="/google-profil-einspruch" className="block space-y-4 group">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300">
                  Einspruch einlegen
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Schritt-für-Schritt-Anleitung für einen erfolgreichen Einspruch bei Google.
                </p>
                <span className="text-sm text-blue-700 dark:text-blue-400 font-medium inline-flex items-center">
                  Mehr erfahren
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
              <Link href="/google-profil-gesperrt-gruende" className="block space-y-4 group">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300">
                  7 Sperrungsgründe
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Die häufigsten Ursachen für gesperrte Profile und wie Sie diese vermeiden.
                </p>
                <span className="text-sm text-blue-700 dark:text-blue-400 font-medium inline-flex items-center">
                  Mehr erfahren
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-white/50 dark:bg-slate-900/50">
        <div className="container max-w-4xl mx-auto space-y-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-center">
            Häufige Fragen
          </h2>
          <div className="grid gap-6">
            <Card className="p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold mb-4">Wie schnell bekomme ich Ergebnisse?</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Sie erhalten Ihren Freischaltungs-Plan sofort nach der Analyse. Die Bearbeitung durch Google kann dann 2-14 Tage dauern.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold mb-4">Ersetzt das eine Agentur?</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Sie erhalten einen Do-it-yourself Plan. Für die Umsetzung brauchen Sie keine Agentur, aber müssen selbst aktiv werden.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold mb-4">Was, wenn mein Profil zu Recht gesperrt wurde?</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Die Analyse zeigt Ihnen, ob ein berechtigter Verstoß vorliegt. In diesem Fall erhalten Sie Hinweise zur Behebung der Probleme.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <MainCTA>
            <Link href="/wizard">
              Kostenlose 5-Minuten-Analyse starten
            </Link>
          </MainCTA>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Keine Anmeldung · Sofort Ergebnis · 100 % unverbindlich
          </p>
        </div>
      </section>
    </main>
  )
}