import { Metadata } from 'next'
import { 
  SEOArticleLayout, 
  CTASection, 
  InternalLinkBox, 
  ContentCard,
  StepBox,
  ImportantNote,
  TableOfContents,
  CheckList
} from '@/components/seo-article-layout'

export const metadata: Metadata = {
  title: 'Google Unternehmensprofil gesperrt – Ursachen und Lösung | GBP Reaktivierung',
  description: 'Ihr Google Unternehmensprofil wurde gesperrt? Erfahren Sie die häufigsten Ursachen und wie Sie mit konkreten Schritten die Sperrung aufheben können.',
  alternates: {
    canonical: '/google-unternehmensprofil-gesperrt'
  },
  openGraph: {
    title: 'Google Unternehmensprofil gesperrt – was jetzt?',
    description: 'Konkrete Hilfe bei gesperrtem Google Business Profile. Ursachen verstehen und Sperrung erfolgreich aufheben.',
    url: '/google-unternehmensprofil-gesperrt',
    type: 'article'
  }
}

export default function GoogleUnternehmensprofilGesperrtPage() {
  return (
    <SEOArticleLayout>
      <h1>Google Unternehmensprofil gesperrt – was jetzt?</h1>

      <p className="lead text-xl text-slate-600 dark:text-slate-400">
        Eine Sperrung des Google Unternehmensprofils kann massive Auswirkungen auf lokale Unternehmen haben: Sichtbarkeitsverlust in der Google-Suche, fehlende Kartenanzeige und damit einbrechende Kundenanfragen. In diesem Artikel erfahren Sie, warum Profile gesperrt werden und wie Sie die Ursache Ihrer Sperrung systematisch ermitteln können.
      </p>

      <TableOfContents items={[
        'Unterschied zwischen sanfter und harter Sperrung',
        'Häufige Ursachen für eine Sperrung',
        'Welche Unterlagen Google häufig erwartet',
        'Was Sie jetzt konkret tun sollten',
        'Zeitrahmen und Erfolgsaussichten'
      ]} />

      <CTASection />

      <h2>Unterschied zwischen sanfter und harter Sperrung</h2>

      <p>
        Google unterscheidet bei Sperrungen zwischen zwei Varianten, die unterschiedliche Auswirkungen auf Ihr Geschäft haben:
      </p>

      <ContentCard title="Sanfte Sperrung (Soft Suspension)" variant="secondary">
        <p>
          Bei einer sanften Sperrung bleibt Ihr Profil in der Google-Suche und auf Google Maps grundsätzlich sichtbar. Allerdings werden wichtige Funktionen eingeschränkt:
        </p>
        <CheckList variant="cross" items={[
          'Sie können keine Änderungen an Ihrem Profil vornehmen',
          'Neue Bewertungen werden möglicherweise nicht angezeigt',
          'Die Ranking-Position in lokalen Suchergebnissen kann deutlich verschlechtert sein',
          'Ihr Profil erscheint mit dem Hinweis "Vorübergehend geschlossen" oder ähnlichen Einschränkungen'
        ]} />
      </ContentCard>

      <ContentCard title="Harte Sperrung (Hard Suspension)" variant="primary">
        <p>
          Eine harte Sperrung ist die schwerwiegendere Variante. Hierbei wird Ihr Profil komplett aus den Suchergebnissen und von Google Maps entfernt:
        </p>
        <CheckList variant="cross" items={[
          'Das Profil ist für Nutzer nicht mehr auffindbar',
          'Bestehende Bewertungen und Fotos sind nicht sichtbar',
          'Kein direkter Kontakt über Google möglich (Anruf-Button, Routenplanung, etc.)',
          'Massive Umsatzeinbußen, da potenzielle Kunden Sie nicht mehr über Google finden'
        ]} />
      </ContentCard>

      <ImportantNote>
        <p>
          Die Art der Sperrung gibt oft erste Hinweise auf die Schwere des vermuteten Verstoßes. Während sanfte Sperrungen häufig bei vermuteten technischen Problemen oder Unklarheiten auftreten, deutet eine harte Sperrung auf einen als schwerwiegend eingestuften Richtlinienverstoß hin.
        </p>
      </ImportantNote>

      <h2>Häufige Ursachen für eine Sperrung</h2>

      <p>
        Google sperrt Profile nicht willkürlich, sondern aufgrund konkreter Richtlinienverstöße oder Verdachtsmomente. Die häufigsten Ursachen sind:
      </p>

      <ContentCard title="1. Virtuelle Büros und fehlende physische Präsenz">
        <p>
          Einer der häufigsten Gründe für Sperrungen: Die Nutzung einer virtuellen Büroadresse ohne tatsächliche Geschäftstätigkeit vor Ort. Google verlangt, dass Kunden Sie an der angegebenen Adresse aufsuchen können oder Sie dort nachweislich geschäftlich tätig sind. Coworking Spaces sind nur zulässig, wenn Sie dort dauerhaft einen festen Arbeitsplatz haben.
        </p>
      </ContentCard>

      <ContentCard title="2. Inkonsistente NAP-Daten">
        <p>
          NAP steht für Name, Address, Phone (Name, Adresse, Telefonnummer). Wenn diese Daten auf Ihrer Website, in anderen Verzeichnissen oder im Google-Profil selbst nicht übereinstimmen, wertet Google dies als Vertrauenssignal-Problem. Selbst kleine Abweichungen wie "Str." statt "Straße" können problematisch sein.
        </p>
      </ContentCard>

      <ContentCard title="3. Keyword-Stuffing im Firmennamen">
        <p>
          Das Hinzufügen von Suchbegriffen zum offiziellen Firmennamen ist ein klarer Richtlinienverstoß. Beispiel: "Müller Sanitär Berlin Notdienst 24h" statt einfach "Müller Sanitär". Solche Zusätze dienen ausschließlich der Suchmaschinenmanipulation und werden konsequent geahndet.
        </p>
      </ContentCard>

      <ContentCard title="4. Multiple Profile für denselben Standort">
        <p>
          Mehrere Google Business Profile für dasselbe Unternehmen am gleichen Standort sind nicht zulässig. Dies passiert oft versehentlich, wenn verschiedene Mitarbeiter oder Dienstleister unabhängig voneinander Profile anlegen.
        </p>
      </ContentCard>

      <ContentCard title="5. Unzureichende Nachweise der Geschäftsexistenz">
        <p>
          Bei Neuerstellung oder nach Meldungen von Nutzern fordert Google oft Nachweise an. Fehlen diese oder wirken sie unglaubwürdig, erfolgt die Sperrung. Typische fehlende Nachweise: Gewerbeanmeldung, Geschäftsbeschilderung, Innenraumfotos, Versorgungsrechnungen auf den Firmennamen.
        </p>
      </ContentCard>

      <ContentCard title="6. Verdächtige Bewertungsaktivitäten">
        <p>
          Der Kauf gefälschter Bewertungen oder koordinierte Bewertungsaktionen werden von Google erkannt und führen zur Sperrung. Auch das massenhafte Löschen negativer Bewertungen durch unzulässige Meldungen kann problematisch sein.
        </p>
      </ContentCard>

      <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
        <InternalLinkBox 
          title="7 Gründe für Profil-Sperrungen"
          description="Detaillierte Analyse aller relevanten Sperrungsgründe mit Praxisbeispielen"
          href="/google-profil-gesperrt-gruende"
        />
        <InternalLinkBox 
          title="Einspruch richtig einlegen"
          description="Schritt-für-Schritt-Anleitung für einen erfolgreichen Einspruch"
          href="/google-profil-einspruch"
        />
      </div>

      <h2>Welche Unterlagen Google häufig erwartet</h2>

      <p>
        Um eine Sperrung aufzuheben, müssen Sie Google überzeugen, dass Ihr Unternehmen legitim ist und die Richtlinien einhält. Welche Dokumente und Nachweise Google konkret erwartet, hängt stark von der Art der Sperrung, Ihrem Geschäftsmodell und dem vermuteten Verstoß ab.
      </p>

      <ContentCard title="Typische Nachweiskategorien" variant="secondary">
        <p>Google fordert üblicherweise Nachweise in folgenden Bereichen an:</p>
        <CheckList variant="arrow" items={[
          'Geschäftliche Legitimation (z.B. Gewerbeanmeldung, Handelsregisterauszug)',
          'Adressnachweis (z.B. Versorgungsrechnungen, Mietverträge)',
          'Physische Präsenz (z.B. Fotos der Geschäftsbeschilderung, Innenraumaufnahmen)',
          'Branchenspezifische Qualifikationen (bei regulierten Branchen)'
        ]} />
      </ContentCard>

      <ImportantNote>
        <p>
          Die exakte Zusammenstellung der benötigten Dokumente variiert erheblich je nach Sperrungsgrund. Ein virtuelles Büro erfordert andere Nachweise als ein Ladengeschäft, eine sanfte Sperrung andere als eine harte Sperrung. Eine pauschale Checkliste kann in vielen Fällen unvollständig oder überdimensioniert sein.
        </p>
      </ImportantNote>

      <CTASection 
        text="Dokumenten-Checkliste für Ihren Fall erstellen"
        subtitle="Ermitteln Sie in 5 Minuten, welche Nachweise in Ihrer spezifischen Situation relevant sind"
      />

      <h2>Was Sie jetzt konkret tun sollten</h2>

      <p>
        Bei einer Sperrung sollten Sie strukturiert und zügig vorgehen. Hier die empfohlenen Schritte:
      </p>

      <StepBox number={1} title="Art der Sperrung identifizieren">
        <p>
          Prüfen Sie, ob Ihr Profil noch sichtbar ist (sanfte Sperrung) oder komplett verschwunden (harte Sperrung). Dies gibt Hinweise auf die Schwere des Problems und die zu erwartende Bearbeitungszeit.
        </p>
      </StepBox>

      <StepBox number={2} title="Mögliche Ursachen analysieren">
        <p>Überprüfen Sie kritisch, welcher der oben genannten Punkte auf Ihre Situation zutreffen könnte:</p>
        <ul>
          <li>Nutzen Sie eine virtuelle Büroadresse?</li>
          <li>Stimmen Ihre NAP-Daten überall überein?</li>
          <li>Enthält Ihr Firmenname unzulässige Zusätze?</li>
          <li>Gibt es mehrere Profile für Ihren Standort?</li>
          <li>Haben Sie alle geforderten Nachweise eingereicht?</li>
        </ul>
      </StepBox>

      <StepBox number={3} title="Probleme beheben">
        <p>Bevor Sie Einspruch einlegen, sollten Sie identifizierte Probleme korrigieren:</p>
        <CheckList variant="check" items={[
          'Bereinigen Sie inkonsistente Daten auf Ihrer Website und in anderen Verzeichnissen',
          'Entfernen Sie unzulässige Keywords aus dem Firmennamen',
          'Löschen Sie doppelte Profile (lassen Sie nur das älteste bestehen)',
          'Stellen Sie alle notwendigen Nachweise zusammen'
        ]} />
      </StepBox>

      <StepBox number={4} title="Dokumentation vorbereiten">
        <p>
          Erstellen Sie eine vollständige Dokumentenmappe mit allen relevanten Nachweisen. Achten Sie auf gute Qualität und Lesbarkeit aller Scans und Fotos.
        </p>
      </StepBox>

      <StepBox number={5} title="Professionellen Einspruch formulieren">
        <p>
          Der Einspruch sollte sachlich, präzise und vollständig sein. Vermeiden Sie emotionale Formulierungen oder Vorwürfe. Strukturieren Sie Ihre Argumentation klar und fügen Sie alle Nachweise als Anhänge bei.
        </p>
      </StepBox>

      <CTASection 
        text="Zum Profil-Check"
        subtitle="Erhalten Sie eine individuelle Analyse Ihrer Situation inkl. konkreter Handlungsempfehlungen"
      />

      <h2>Zeitrahmen und Erfolgsaussichten</h2>

      <p>
        Die Bearbeitung eines Einspruchs durch Google dauert typischerweise zwischen 3 und 14 Werktagen. In komplexen Fällen kann es auch länger dauern.
      </p>

      <ImportantNote>
        <p>
          Reichen Sie nicht mehrfach denselben Einspruch ein, da dies die Bearbeitung verzögert.
        </p>
      </ImportantNote>

      <p>
        Die Erfolgsaussichten hängen stark von folgenden Faktoren ab:
      </p>

      <CheckList variant="check" items={[
        'Vollständigkeit der Unterlagen: Je lückenloser Ihre Dokumentation, desto höher die Erfolgswahrscheinlichkeit',
        'Klarheit des Falls: Eindeutige Situationen werden schneller positiv entschieden als komplexe Grenzfälle',
        'Qualität des Einspruchs: Professionell formulierte, strukturierte Einsprüche haben höhere Erfolgsraten',
        'Behebung der Ursachen: Nachweisliche Korrektur identifizierter Probleme verbessert die Chancen erheblich'
      ]} />

      <ContentCard title="Erfolgsrate bei berechtigten Einsprüchen" variant="primary">
        <p>
          Bei berechtigten Einsprüchen mit vollständiger Dokumentation liegt die Erfolgsrate erfahrungsgemäß bei <strong>über 80%</strong>. Wichtig ist jedoch, realistisch zu bleiben: Liegt tatsächlich ein schwerwiegender Richtlinienverstoß vor, wird Google die Sperrung aufrechterhalten.
        </p>
      </ContentCard>

      <h2>Vorbeugende Maßnahmen für die Zukunft</h2>

      <p>
        Nach erfolgreicher Reaktivierung sollten Sie Maßnahmen ergreifen, um zukünftige Sperrungen zu vermeiden:
      </p>

      <CheckList variant="check" items={[
        'Halten Sie Profildaten stets aktuell und konsistent über alle Plattformen hinweg',
        'Dokumentieren Sie alle Änderungen am Profil',
        'Reagieren Sie zeitnah auf Bewertungen (positiv und negativ)',
        'Laden Sie regelmäßig aktuelle Fotos hoch',
        'Vermeiden Sie jegliche Form von Manipulation (gekaufte Bewertungen, Keyword-Stuffing, etc.)',
        'Überprüfen Sie regelmäßig die Google Business Profile Richtlinien auf Änderungen'
      ]} />

      <div className="not-prose my-12">
        <InternalLinkBox 
          title="Einspruch Schritt für Schritt"
          description="Detaillierte Anleitung für einen erfolgreichen Einspruch bei Google"
          href="/google-profil-einspruch"
        />
      </div>

      <h2>Fazit</h2>

      <p>
        Eine Sperrung des Google Unternehmensprofils ist ein ernstes Problem für lokale Unternehmen, aber in den meisten Fällen lösbar. Entscheidend sind eine sachliche Analyse der Ursachen, die vollständige Behebung identifizierter Probleme und ein professionell formulierter Einspruch mit umfassender Dokumentation.
      </p>

      <p>
        Nutzen Sie unseren kostenlosen Assistenten, um die wahrscheinlichsten Ursachen Ihrer Sperrung zu identifizieren und einen individuellen Aktionsplan zu erhalten. So erhöhen Sie Ihre Chancen auf eine schnelle und erfolgreiche Reaktivierung erheblich.
      </p>
    </SEOArticleLayout>
  )
}