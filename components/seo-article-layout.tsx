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
      <article className="container max-w-4xl mx-auto py-12 px-4">
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-700 dark:prose-li:text-slate-300">
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