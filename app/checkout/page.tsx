import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function CheckoutPage({
  searchParams
}: {
  searchParams: { run_id?: string }
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <Card className="p-8 text-center space-y-6">
          <h1 className="text-2xl font-semibold">
            Checkout kommt als nächstes.
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Danke – wir messen gerade die Nachfrage.
          </p>
          <div className="pt-4">
            <Link
              href={searchParams.run_id ? `/r/${searchParams.run_id}` : '/'}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Zurück zur Übersicht
            </Link>
          </div>
        </Card>
      </div>
    </main>
  )
}