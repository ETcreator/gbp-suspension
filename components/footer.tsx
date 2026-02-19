import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-slate-200 dark:border-slate-800">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 space-x-4">
          <Link href="/impressum" className="hover:text-slate-600 dark:hover:text-slate-300">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-slate-600 dark:hover:text-slate-300">
            Datenschutz
          </Link>
          <Link href="/agb" className="hover:text-slate-600 dark:hover:text-slate-300">
            AGB
          </Link>
        </div>
      </div>
    </footer>
  )
}