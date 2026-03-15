import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ReactNode } from 'react'

type CTAProps = {
  variant?: 'primary' | 'secondary'
  text?: string
  href?: string
}

export function SEOArticleLayout({ 
  children,
  showCTA = true,
  ctaText = "Kostenlose 5-Minuten-Analyse starten",
  ctaHref = "/wizard"
}: { 
  children: ReactNode
  showCTA?: boolean
  ctaText?: string
  ctaHref?: string
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header with back to home link */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="container max-w-4xl mx-auto py-4 px-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </header>

      <article className="container max-w-4xl mx-auto py-12 px-4">
        <div className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:font-semibold 
          prose-h1:text-4xl prose-h1:mb-8 prose-h1:tracking-tight
          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-700
          prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-blue-700 dark:prose-h3:text-blue-400
          prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3 prose-h4:font-semibold prose-h4:text-slate-800 dark:prose-h4:text-slate-200
          prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
          prose-ul:my-6 prose-ul:space-y-3
          prose-li:text-slate-700 dark:prose-li:text-slate-300
          prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-semibold
          prose-a:text-blue-700 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>

        {showCTA && (
          <CTASection text={ctaText} href={ctaHref} />
        )}
      </article>
    </main>
  )
}

export function CTASection({ 
  text = "Kostenlose 5-Minuten-Analyse starten",
  href = "/wizard",
  subtitle = "Keine Anmeldung · Sofort Ergebnis · 100 % unverbindlich"
}: {
  text?: string
  href?: string
  subtitle?: string
}) {
  return (
    <Card className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-slate-700">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Jetzt Sperrungsursache prüfen
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Erhalten Sie in nur 5 Minuten eine individuelle Analyse Ihrer Situation
          </p>
        </div>
        <Button 
          asChild 
          size="lg" 
          className="font-medium bg-blue-700 hover:bg-blue-800 text-white px-8 py-5 text-lg shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
        >
          <Link href={href}>
            {text}
          </Link>
        </Button>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      </div>
    </Card>
  )
}

export function InternalLinkBox({ 
  title,
  description,
  href
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200 bg-white dark:bg-slate-800/50">
      <Link href={href} className="block space-y-2 group">
        <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
          {title} →
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          {description}
        </p>
      </Link>
    </Card>
  )
}

export function HighlightBox({ 
  children,
  variant = 'info'
}: {
  children: ReactNode
  variant?: 'info' | 'success' | 'warning'
}) {
  const variants = {
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
    success: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
  }

  return (
    <div className={`not-prose my-8 p-6 rounded-lg border-l-4 ${variants[variant]}`}>
      <div className="prose prose-slate dark:prose-invert max-w-none prose-p:mb-3 prose-p:last:mb-0 prose-ul:my-3 prose-li:my-1">
        {children}
      </div>
    </div>
  )
}

export function QuickTip({ 
  title,
  children
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="not-prose my-8 p-6 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h4>
          <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-sm prose-p:mb-2 prose-p:last:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContentCard({ 
  title,
  children,
  variant = 'default'
}: {
  title: string
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary'
}) {
  const variants = {
    default: 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
    primary: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
    secondary: 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700'
  }

  return (
    <Card className={`not-prose my-8 p-6 ${variants[variant]}`}>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">{title}</h3>
      <div className="prose prose-slate dark:prose-invert max-w-none prose-p:mb-3 prose-ul:my-3 prose-li:my-1.5">
        {children}
      </div>
    </Card>
  )
}

export function StepBox({ 
  number,
  title,
  children
}: {
  number: number
  title: string
  children: ReactNode
}) {
  return (
    <div className="not-prose flex gap-4 my-6 p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h4>
        <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-sm prose-p:mb-2 prose-ul:my-2 prose-li:my-1">
          {children}
        </div>
      </div>
    </div>
  )
}

export function ImportantNote({ 
  children
}: {
  children: ReactNode
}) {
  return (
    <div className="not-prose my-8 p-6 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 rounded-r-lg">
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-sm prose-p:mb-2 prose-p:first:mt-0">
            <strong className="text-amber-900 dark:text-amber-100">⚠️ Wichtig:</strong> {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function TableOfContents({ 
  items
}: {
  items: string[]
}) {
  return (
    <Card className="not-prose my-10 p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        In diesem Artikel:
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function CheckList({ 
  items,
  variant = 'check'
}: {
  items: string[]
  variant?: 'check' | 'cross' | 'arrow'
}) {
  const icons = {
    check: (
      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    cross: (
      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    arrow: (
      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    )
  }

  return (
    <ul className="not-prose space-y-3 my-6">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="flex-shrink-0 mt-0.5">{icons[variant]}</span>
          <span className="text-slate-700 dark:text-slate-300">{item}</span>
        </li>
      ))}
    </ul>
  )
}
