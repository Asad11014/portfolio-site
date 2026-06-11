import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-base-700/50 bg-base-950/60">
      <div className="section-pad flex flex-col items-center justify-between gap-3 py-7 font-mono text-[11px] text-ink-faint sm:flex-row">
        <span>
          © {new Date().getFullYear()} {profile.name} · built with React · Vite · Tailwind
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-accent" />
          last deploy: green · 0 incidents
        </span>
      </div>
    </footer>
  )
}
