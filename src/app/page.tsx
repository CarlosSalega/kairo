export default function RootPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
          v0.1.0 — development
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Kairo</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Open source ecommerce framework for Next.js. Stack listo, a escribir código.
        </p>
      </div>

      <div className="grid w-full max-w-sm gap-2">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:bg-accent"
          >
            <span className="font-medium">{link.label}</span>
            <span className="text-muted-foreground">→</span>
          </a>
        ))}
      </div>
    </main>
  )
}

const LINKS = [
  { label: 'Storefront', href: '/productos' },
  { label: 'Admin', href: '/admin' },
  { label: 'Documentación', href: '/docs' },
]
