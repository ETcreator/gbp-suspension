import { Metadata } from 'next'
import { 
  SEOArticleLayout, 
  CTASection, 
  InternalLinkBox,
  ContentCard,
  StepBox,
  ImportantNote,
  TableOfContents,
  CheckList,
  HighlightBox
} from '@/components/seo-article-layout'

export const metadata: Metadata = {
  title: 'Google Profil Einspruch einlegen – Schritt für Schritt Anleitung',
  description: 'So legen Sie erfolgreich Einspruch gegen eine Google Business Profile Sperrung ein. Welche Dokumente nötig sind und häufige Fehler beim Einspruch.',
  alternates: {
    canonical: '/google-profil-einspruch'
  },
  openGraph: {
    title: 'Google Profil Einspruch richtig einlegen',
    description: 'Schritt-für-Schritt-Anleitung für einen erfolgreichen Einspruch bei gesperrtem Google Business Profile.',
    url: '/google-profil-einspruch',
    type: 'article'
  }
}

export default function GoogleProfilEinspruchPage() {
  return (
    <SEOArticleLayout>
      <h1>Google Profil Einspruch einlegen – Schritt für Schritt</h1>

      <p className="lead text-xl text-slate-600 dark:text-slate-400">
        Nach einer Sperrung Ihres Google Business Profiles ist der Einspruch der entscheidende Schritt zur Reaktivierung. Doch ein erfolgreicher Einspruch erfordert sorgfältige Vorbereitung, die richtigen Dokumente und eine professionelle Kommunikation. In diesem Leitfaden erfahren Sie, wie Sie Ihren Einspruch optimal vorbereiten und häufige Fehler vermeiden.
      </p>

      <TableOfContents items={[
        'Wann ein Einspruch sinnvoll ist',
        'Welche Dokumente typischerweise nötig sind',
        'Häufige Fehler beim Einspruch',
        'Der optimale Einspruchs-Ablauf',
        'Textvorlage für den Einspruch'
      ]} />

      <CTASection text="Jetzt Einspruch vorbereiten" />

      <h2>Wann ein Einspruch sinnvoll ist</h2>

      <p>
        Nicht in jeder Situation ist ein sofortiger Einspruch die beste Strategie. Prüfen Sie zunächst, ob folgende Voraussetzungen erfüllt sind:
      </p>

      <ContentCard title="✅ Einspruch ist sinnvoll, wenn:" variant="primary">
        <CheckList variant="check" items={[
          'Die Sperrung unberechtigt ist: Ihr Unternehmen erfüllt alle Google-Richtlinien und die Sperrung beruht auf einem Missverständnis oder Fehler',
          'Sie alle Nachweise haben: Sie können die Legitimität Ihres Geschäfts durch offizielle Dokumente belegen',
          'Probleme wurden behoben: Falls ursprünglich Verstöße vorlagen, haben Sie diese bereits korrigiert',
          'Sie die Ursache kennen: Sie haben identifiziert, warum die Sperrung erfolgte und können gezielt darauf eingehen'
        ]} />
      </ContentCard>

      <ContentCard title="⏸️ Warten Sie mit dem Einspruch, wenn:" variant="secondary">
        <CheckList variant="cross" items={[
          'Dokumente fehlen noch: Beschaffen Sie erst alle notwendigen Nachweise, bevor Sie den Einspruch einreichen',
          'Verstöße noch aktiv sind: Korrigieren Sie zuerst alle Richtlinienverstöße (z.B. Keyword-Stuffing im Namen, doppelte Profile)',
          'NAP-Daten inkonsistent sind: Gleichen Sie erst alle Kontaktdaten auf Website und anderen Plattformen ab',
          'Die Situation unklar ist: Analysieren Sie erst gründlich die wahrscheinlichen Ursachen'
        ]} />
      </ContentCard>

      <ImportantNote>
        <p>
          Ein voreiliger Einspruch ohne ausreichende Vorbereitung verschlechtert Ihre Chancen. Google protokolliert alle Einreichungen, und ein abgelehnter Einspruch erschwert spätere Versuche.
        </p>
      </ImportantNote>

      <div className="not-prose my-8">
        <InternalLinkBox 
          title="Sperrungsgründe verstehen"
          description="Analysieren Sie die häufigsten Ursachen für Profil-Sperrungen"
          href="/google-profil-gesperrt-gruende"
        />
      </div>

      <h2>Welche Dokumente typischerweise nötig sind</h2>

      <p>
        Die Qualität und Vollständigkeit Ihrer Dokumentation entscheidet maßgeblich über den Erfolg des Einspruchs. Welche Dokumente Google konkret fordert, variiert jedoch erheblich je nach Art der Sperrung, Ihrem Geschäftsmodell und dem vermuteten Richtlinienverstoß.
      </p>

      <ContentCard title="Dokumentenkategorien im Überblick" variant="secondary">
        <p>Google prüft typischerweise Nachweise in folgenden Bereichen:</p>
        <CheckList variant="arrow" items={[
          'Geschäftliche Legitimation: Offizielle Registrierungen und Genehmigungen',
          'Adressnachweis: Belege für die physische Geschäftsadresse',
          'Geschäftspräsenz: Fotos und visuelle Nachweise der Geschäftstätigkeit',
          'Branchenqualifikationen: Zulassungen bei regulierten Tätigkeiten'
        ]} />
      </ContentCard>

      <ImportantNote>
        <p>
          Die exakte Zusammenstellung hängt von vielen Faktoren ab: Ein Ladengeschäft benötigt andere Nachweise als ein Service-Unternehmen, ein virtuelles Büro andere als ein traditionelles Gewerbe. Eine sanfte Sperrung kann mit weniger Dokumentation aufhebbar sein als eine harte Sperrung.
        </p>
      </ImportantNote>

      <ContentCard title="Situationsabhängige Anforderungen">
        <p>Je nach Ihrem Geschäftsmodell und Sperrungsgrund können unterschiedliche Schwerpunkte gesetzt werden:</p>
        <ul>
          <li><strong>Virtuelle Büros:</strong> Besonderer Fokus auf Nachweise der tatsächlichen Geschäftstätigkeit</li>
          <li><strong>Service Area Business:</strong> Dokumentation der Kundentermine vor Ort</li>
          <li><strong>Regulierte Branchen:</strong> Zusätzliche Qualifikationsnachweise erforderlich</li>
          <li><strong>Mehrfach-Sperrungen:</strong> Umfangreichere Dokumentation zur Glaubwürdigkeit</li>
        </ul>
      </ContentCard>

      <CTASection 
        text="Individuelle Dokumenten-Checkliste erstellen"
        subtitle="Ermitteln Sie in 5 Minuten, welche spezifischen Nachweise in Ihrem Fall relevant sind"
      />

      <h2>Häufige Fehler beim Einspruch</h2>

      <p>
        Viele Einsprüche werden abgelehnt, weil vermeidbare Fehler gemacht wurden. Hier die häufigsten Stolpersteine:
      </p>

      <ContentCard title="❌ Fehler 1: Unvollständige Dokumentation">
        <p><strong>Problem:</strong> Es werden nur 2 von 4 geforderten Dokumenten eingereicht, in der Hoffnung, dass dies ausreicht.</p>
        <p><strong>Lösung:</strong> Reichen Sie von Anfang an alle relevanten Nachweise ein. Unvollständige Einsprüche werden meist direkt abgelehnt, ohne dass Google nachfragt.</p>
      </ContentCard>

      <ContentCard title="❌ Fehler 2: Schlechte Dokumentenqualität">
        <p><strong>Problem:</strong> Unscharfe Fotos, unleserliche Scans oder zu klein komprimierte Dateien.</p>
        <p><strong>Lösung:</strong> Alle Dokumente müssen klar lesbar sein. Fotos sollten mindestens 1920x1080 Pixel haben, Scans mindestens 300 DPI. Testen Sie die Lesbarkeit auf einem anderen Gerät.</p>
      </ContentCard>

      <ContentCard title="❌ Fehler 3: Emotionale oder anklagende Formulierungen">
        <p><strong>Problem:</strong> "Diese Sperrung ist eine Frechheit! Wir verlieren dadurch täglich Kunden und sind kurz vor der Insolvenz!"</p>
        <p><strong>Lösung:</strong> Bleiben Sie sachlich und professionell. Konzentrieren Sie sich auf Fakten und Nachweise, nicht auf Emotionen. Google bearbeitet täglich tausende Fälle – Emotionen helfen nicht.</p>
      </ContentCard>

      <ContentCard title="❌ Fehler 4: Zu kurze oder zu lange Erklärungen">
        <p><strong>Problem:</strong> Entweder nur "Bitte reaktivieren Sie mein Profil" oder seitenlange Romane ohne Struktur.</p>
        <p><strong>Lösung:</strong> Optimal sind 300-600 Wörter: Kurze Einleitung, strukturierte Darstellung der Situation, Auflistung der Nachweise, höfliche Bitte um Überprüfung.</p>
      </ContentCard>

      <ContentCard title="❌ Fehler 5: Mehrfaches Einreichen desselben Einspruchs">
        <p><strong>Problem:</strong> Nach 2 Tagen noch keine Antwort, also wird der Einspruch nochmal geschickt, und noch einmal...</p>
        <p><strong>Lösung:</strong> Geduld haben. Die Bearbeitung dauert 5-14 Werktage. Mehrfache Einreichungen verzögern die Bearbeitung und wirken unprofessionell.</p>
      </ContentCard>

      <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
        <InternalLinkBox 
          title="Komplette Übersicht"
          description="Alle Informationen zur Sperrung und Reaktivierung"
          href="/google-unternehmensprofil-gesperrt"
        />
        <InternalLinkBox 
          title="7 Sperrungsgründe"
          description="Die häufigsten Ursachen für Profil-Sperrungen"
          href="/google-profil-gesperrt-gruende"
        />
      </div>

      <h2>Der optimale Einspruchs-Ablauf</h2>

      <p>
        Folgen Sie diesem bewährten Prozess für maximale Erfolgsaussichten:
      </p>

      <h3>Phase 1: Vorbereitung (2-4 Tage)</h3>

      <StepBox number={1} title="Ursachenanalyse">
        <CheckList variant="arrow" items={[
          'Identifizieren Sie den wahrscheinlichsten Sperrungsgrund',
          'Prüfen Sie Ihr Profil auf Richtlinienverstöße',
          'Notieren Sie alle relevanten Aspekte Ihrer Situation'
        ]} />
      </StepBox>

      <StepBox number={2} title="Problembehebung">
        <CheckList variant="check" items={[
          'Korrigieren Sie alle identifizierten Verstöße',
          'Gleichen Sie NAP-Daten überall ab',
          'Entfernen Sie unzulässige Keywords',
          'Löschen Sie doppelte Profile'
        ]} />
      </StepBox>

      <StepBox number={3} title="Dokumentenbeschaffung">
        <CheckList variant="check" items={[
          'Besorgen Sie alle notwendigen offiziellen Nachweise',
          'Erstellen Sie professionelle Fotos',
          'Scannen Sie alle Dokumente in hoher Qualität',
          'Benennen Sie Dateien aussagekräftig (z.B. "Gewerbeanmeldung_Musterfirma.pdf")'
        ]} />
      </StepBox>

      <h3>Phase 2: Einspruchs-Formulierung (1 Tag)</h3>

      <ContentCard title="Struktur des Einspruchs" variant="primary">
        <p><strong>Betreff:</strong> "Antrag auf Überprüfung der Sperrung – [Ihr Firmenname]"</p>
        
        <h4>Einleitung (2-3 Sätze):</h4>
        <ul>
          <li>Höfliche Anrede</li>
          <li>Nennung des betroffenen Profils</li>
          <li>Bitte um Überprüfung</li>
        </ul>

        <h4>Hauptteil (strukturiert nach Punkten):</h4>
        <ul>
          <li>Kurze Beschreibung Ihres Unternehmens</li>
          <li>Darstellung der Situation</li>
          <li>Eingehen auf vermuteten Sperrungsgrund</li>
          <li>Auflistung der beigefügten Nachweise</li>
          <li>Beschreibung behobener Probleme (falls zutreffend)</li>
        </ul>

        <h4>Schluss (2-3 Sätze):</h4>
        <ul>
          <li>Versicherung der Richtlinienkonformität</li>
          <li>Angebot für weitere Informationen</li>
          <li>Höfliche Grußformel</li>
        </ul>
      </ContentCard>

      <h3>Phase 3: Einreichung</h3>

      <StepBox number={4} title="So reichen Sie den Einspruch ein">
        <ol>
          <li>Melden Sie sich im Google Business Profile Manager an</li>
          <li>Wählen Sie das gesperrte Profil aus</li>
          <li>Klicken Sie auf "Support" oder "Hilfe"</li>
          <li>Wählen Sie "Sperrung anfechten" oder "Kontosperrung"</li>
          <li>Füllen Sie das Formular vollständig aus</li>
          <li>Laden Sie alle Dokumente hoch (beachten Sie die Dateigrößenlimits)</li>
          <li>Überprüfen Sie alles nochmal</li>
          <li>Senden Sie den Einspruch ab</li>
          <li>Notieren Sie sich Datum und ggf. Referenznummer</li>
        </ol>
      </StepBox>

      <h3>Phase 4: Nachverfolgung</h3>

      <ContentCard title="Nach der Einreichung">
        <CheckList variant="arrow" items={[
          'Tage 1-5: Geduldig warten, nicht erneut einreichen',
          'Tag 10-14: Falls keine Antwort: Höfliche Status-Anfrage',
          'Bei Ablehnung: Gründe analysieren, fehlende Informationen ergänzen, erneut einreichen',
          'Bei Genehmigung: Profil sorgfältig überprüfen und optimieren'
        ]} />
      </ContentCard>

      <CTASection 
        text="Assistenz für Einspruchs-Vorbereitung"
        subtitle="Lassen Sie sich bei der Vorbereitung Ihres Einspruchs unterstützen"
      />

      <h2>Textvorlage für den Einspruch</h2>

      <p>
        Die optimale Formulierung und Struktur Ihres Einspruchs hängt stark vom identifizierten Sperrungsgrund und Ihrer individuellen Situation ab. Ein Einspruch bei Adressproblemen erfordert andere Schwerpunkte als einer bei Keyword-Verstößen.
      </p>

      <ContentCard title="Grundprinzipien erfolgreicher Einsprüche" variant="primary">
        <p>Unabhängig vom Sperrungsgrund sollten Sie folgende Elemente berücksichtigen:</p>
        <CheckList variant="check" items={[
          'Sachlicher, professioneller Ton ohne Emotionalität',
          'Klare Benennung des Problems und der Korrekturmaßnahmen',
          'Strukturierte Darstellung: Situation → Ursache → Lösung → Nachweise',
          'Vollständige Liste aller beigefügten Dokumente',
          'Versicherung der Richtlinienkonformität'
        ]} />
      </ContentCard>

      <ImportantNote>
        <p>
          Während die Grundstruktur eines Einspruchs relativ konstant ist, variieren die inhaltlichen Schwerpunkte erheblich: Bei virtuellen Büros müssen Sie Ihre physische Präsenz nachweisen, bei NAP-Problemen die Korrektur der Inkonsistenzen dokumentieren, bei Keyword-Verstößen die Bereinigung des Firmennamens belegen. Eine generische Vorlage kann daher in vielen Fällen kontraproduktiv sein.
        </p>
      </ImportantNote>

      <CTASection 
        text="Einspruchstext für Ihren Fall generieren"
        subtitle="Erhalten Sie eine auf Ihre Situation zugeschnittene Einspruchsstruktur"
      />

      <ImportantNote>
        <p>
          Bei Ablehnung nicht aufgeben! Viele erfolgreiche Reaktivierungen erfolgten im zweiten oder dritten Anlauf. Analysieren Sie die Ablehnungsgründe genau, ergänzen Sie fehlende Informationen und reichen Sie einen überarbeiteten Einspruch nach mindestens 7 Tagen ein.
        </p>
      </ImportantNote>

      <div className="not-prose my-8">
        <InternalLinkBox 
          title="Zurück zur Übersicht"
          description="Alle Informationen zu Sperrung und Reaktivierung im Detail"
          href="/google-unternehmensprofil-gesperrt"
        />
      </div>

      <h2>Fazit</h2>

      <p>
        Ein erfolgreicher Einspruch gegen eine Google Business Profile Sperrung erfordert sorgfältige Vorbereitung, vollständige Dokumentation und professionelle Kommunikation. Vermeiden Sie die häufigen Fehler, nehmen Sie sich Zeit für die Vorbereitung und bleiben Sie sachlich in Ihrer Argumentation.
      </p>

      <p>
        Die meisten berechtigten Einsprüche sind erfolgreich, wenn alle notwendigen Nachweise vorliegen und identifizierte Probleme behoben wurden. Mit der richtigen Herangehensweise steht einer Reaktivierung Ihres Profils nichts im Wege.
      </p>
    </SEOArticleLayout>
  )
}