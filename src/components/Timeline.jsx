import { motion } from 'framer-motion'
import { deployLog } from '../data/portfolio'
import SectionHeader from './SectionHeader'

function LogEntry({ e, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className="relative pl-10"
    >
      {/* node */}
      <span
        className={`absolute left-[11px] top-1.5 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full border-2 ${
          e.current ? 'border-accent bg-accent/20' : 'border-base-600 bg-base-850'
        }`}
      >
        {e.current && <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-accent" />}
      </span>

      <div className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="rounded bg-base-800 px-1.5 py-0.5 text-accent-cyan">{e.tag}</span>
            {e.current && (
              <span className="rounded bg-accent/10 px-1.5 py-0.5 text-accent">● active</span>
            )}
          </div>
          <span className="font-mono text-[11px] text-ink-faint">{e.period}</span>
        </div>

        <h3 className="mt-2.5 text-base font-semibold text-ink">{e.title}</h3>
        <p className="font-mono text-xs text-accent">
          {e.org} <span className="text-ink-faint">· {e.location}</span>
        </p>

        <ul className="mt-3 space-y-1.5">
          {e.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-[13px] leading-relaxed text-ink-dim">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-base-600" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="section-pad py-20">
      <SectionHeader
        index="03"
        kicker="git log --career"
        title="Deploy log"
        desc="The commit history of how I got here — most recent first."
      />
      <div className="relative">
        {/* vertical rail */}
        <span className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-base-700 to-transparent" />
        <div className="space-y-5">
          {deployLog.map((e, i) => (
            <LogEntry key={e.id} e={e} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
