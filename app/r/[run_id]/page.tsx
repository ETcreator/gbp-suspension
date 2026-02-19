import { z } from 'zod'
import { type Pack } from '@/lib/packs/packSchema'
import { UnlockButton } from './UnlockButton'
import styles from './styles.module.css'
import { logConversionEvent } from '@/lib/conversion/logEvent'

const paramsSchema = z.object({
  run_id: z.string().uuid()
})

export default async function Page({ params }: { params: { run_id: string } }) {
  const parseResult = paramsSchema.safeParse(params)
  if (!parseResult.success) {
    return (
      <main className={styles.main}>
        <div role="alert" className={styles.alert}>Ungültige Anfrage</div>
      </main>
    )
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pack/${params.run_id}`,
    { cache: 'no-store' }
  )

  if (response.status === 404) {
    return (
      <main className={styles.main}>
        <div role="alert" className={styles.alert}>Analyse nicht gefunden</div>
      </main>
    )
  }

  if (!response.ok) {
    return (
      <main className={styles.main}>
        <div role="alert" className={styles.alert}>Ein Fehler ist aufgetreten</div>
      </main>
    )
  }

  const pack: Pack = await response.json()
  const content = pack.access.mode === 'preview' ? pack.content_preview! : pack.content

  // Log preview view event (fail-open)
  logConversionEvent({
    runId: params.run_id,
    eventType: 'preview_viewed',
    meta: { source: 'r/[run_id] server_render' }
  }).catch(error => {
    console.error('Failed to log preview view:', error)
  })

  return (
    <main className={styles.main}>
      {pack.access.mode === 'preview' && (
        <div className={styles.previewNotice}>
          Vorschau – vollständiger Pack nach Freischaltung
        </div>
      )}
      <article>
        <header>
          <h1 className={styles.h1}>{content.executive_summary.headline}</h1>
          <ul className={styles.list}>
            {content.executive_summary.bullets.map((bullet, i) => (
              <li key={i} className={styles.listItem}>{bullet}</li>
            ))}
          </ul>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>Erkannte Auffälligkeiten</h2>
          {content.hypotheses.map((hypothesis) => (
            <article key={hypothesis.hypothesis_id}>
              <h3 className={styles.h3}>{hypothesis.title}</h3>
              <ul className={styles.list}>
                {hypothesis.why_it_matched.map((reason, i) => (
                  <li key={i} className={styles.listItem}>{reason}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Handlungsempfehlungen</h2>
          {content.checklist.map((section) => (
            <div key={section.section_id}>
              <h3 className={styles.h3}>{section.title}</h3>
              <ul className={styles.list}>
                {section.items.map((item, i) => (
                  <li key={i} className={styles.listItem}>
                    {item.priority === 'high' && <strong>Wichtig: </strong>}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Einspruch</h2>
          <h3 className={styles.h3}>{content.appeal.subject}</h3>
          <pre className={styles.preWrap}>{content.appeal.body_de}</pre>
        </section>

        {pack.access.mode === 'preview' && (
          <UnlockButton runId={params.run_id} />
        )}
      </article>
    </main>
  )
}