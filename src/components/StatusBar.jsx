import { useClock } from '../hooks'

export default function StatusBar() {
  const now = useClock()
  const time = now.toLocaleTimeString('en-GB', { hour12: false })

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-base-700/60 bg-base-950/85 backdrop-blur-md">
      <div className="section-pad flex h-9 items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-2 text-ink-dim">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-accent">SYSTEM: OPERATIONAL</span>
          <span className="hidden text-ink-faint sm:inline">· all services nominal</span>
        </div>
        <div className="flex items-center gap-4 text-ink-faint">
          <span className="hidden sm:inline">region: eu-west / london</span>
          <span className="tabular-nums text-ink-dim">{time} UTC+1</span>
        </div>
      </div>
    </div>
  )
}
