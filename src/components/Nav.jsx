import { useEffect, useState } from 'react'

const links = [
  { id: 'overview', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'deployments', label: 'Deployments' },
  { id: 'timeline', label: 'Deploy Log' },
  { id: 'console', label: 'Console' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('overview')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className="fixed top-9 left-0 right-0 z-40 border-b border-base-700/40 bg-base-950/70 backdrop-blur-md">
      <div className="section-pad flex h-14 items-center justify-between">
        <button onClick={() => go('overview')} className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-accent/40 bg-accent/10 font-mono text-xs font-bold text-accent shadow-glow">
            AR
          </span>
          <span className="font-mono text-sm text-ink">
            asad<span className="text-accent">.</span>rizvi
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`rounded-md px-3 py-1.5 font-mono text-xs transition ${
                active === l.id
                  ? 'bg-accent/10 text-accent'
                  : 'text-ink-dim hover:bg-base-800 hover:text-ink'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-base-700 px-2.5 py-1.5 font-mono text-xs text-ink-dim md:hidden"
          aria-label="Toggle menu"
        >
          {open ? 'close' : 'menu'}
        </button>
      </div>

      {open && (
        <div className="border-t border-base-700/50 bg-base-900/95 px-5 py-2 md:hidden">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`block w-full rounded-md px-3 py-2 text-left font-mono text-sm ${
                active === l.id ? 'text-accent' : 'text-ink-dim'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
