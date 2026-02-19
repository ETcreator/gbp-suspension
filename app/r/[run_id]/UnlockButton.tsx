'use client'

import styles from './styles.module.css'

export function UnlockButton({ runId }: { runId: string }) {
  const handleClick = () => {
    // Fire-and-forget conversion tracking
    fetch('/api/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        run_id: runId,
        event_type: 'unlock_clicked',
        meta: { source: 'unlock_button' }
      }),
      keepalive: true
    }).catch(() => {
      // Silently ignore tracking failures
    })
  }

  return (
    <footer className={styles.footer}>
      <a
        href={`/checkout?run_id=${runId}`}
        className={styles.unlockButton}
        onClick={handleClick}
      >
        Vollständigen Bericht freischalten
      </a>
    </footer>
  )
}