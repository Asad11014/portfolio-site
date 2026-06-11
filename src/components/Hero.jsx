import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile, metrics } from '../data/portfolio'
import { useCountUp, useInViewOnce } from '../hooks'

function MetricCard({ m, delay }) {
  const [ref, inView] = useInViewOnce(0.4)
  const value = useCountUp(m.value, { decimals: m.decimals, start: inView, duration: 1600 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="panel group relative overflow-hidden p-4"
    >
      <div className="label-mono">{m.label}</div>
      <div className="mt-2 font-mono text-3xl font-bold tabular-nums text-ink">
        {m.prefix || ''}
        <span className="text-accent glow-text">{value.toFixed(m.decimals)}</span>
        {m.suffix || ''}
      </div>
      <div className="mt-1 text-[11px] text-ink-faint">{m.note}</div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition group-hover:opacity-100" />
    </motion.div>
  )
}

const feedSeed = [
  ['DEPLOY', 'ARAnalytics → production', 'ok'],
  ['SYNC', 'Mintsoft incremental sync · 1,284 orders reconciled', 'ok'],
  ['REPORT', 'inventory-health.report generated', 'ok'],
  ['ETL', 'nightly pipeline completed in 42s', 'ok'],
  ['AUTH', 'session established · client portal', 'ok'],
  ['STREAM', 'SSE channel open · report progress', 'info'],
  ['BUILD', 'vite build · 0 errors', 'ok'],
  ['SCALE', 'render web service healthy', 'ok'],
]

function ActivityFeed() {
  const [lines, setLines] = useState(() =>
    feedSeed.slice(0, 5).map((l, i) => ({ ...mk(l), id: i })),
  )

  useEffect(() => {
    let id = 100
    const t = setInterval(() => {
      const pick = feedSeed[Math.floor(Math.random() * feedSeed.length)]
      setLines((prev) => [{ ...mk(pick), id: id++ }, ...prev].slice(0, 6))
    }, 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="panel flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-base-700/60 px-4 py-2.5">
        <span className="label-mono">Live activity</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent">
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-accent" /> streaming
        </span>
      </div>
      <div className="flex-1 space-y-1 p-3 font-mono text-[11px] leading-relaxed">
        {lines.map((l, i) => (
          <motion.div
            key={l.id}
            initial={i === 0 ? { opacity: 0, x: -8 } : false}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2"
          >
            <span className="text-ink-faint">{l.time}</span>
            <span
              className={
                l.kind === 'info'
                  ? 'text-accent-cyan'
                  : 'text-accent'
              }
            >
              {l.tag.padEnd(7, ' ')}
            </span>
            <span className="text-ink-dim">{l.msg}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function mk([tag, msg, kind]) {
  const d = new Date()
  return {
    tag,
    msg,
    kind,
    time: d.toLocaleTimeString('en-GB', { hour12: false }),
  }
}

export default function Hero() {
  return (
    <section id="overview" className="section-pad relative pt-32 pb-16 sm:pt-36">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        {/* left: identity */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chip mb-5 border-accent/30 bg-accent/5 text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            available for remote roles · US &amp; Canada
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-3 font-mono text-sm text-accent sm:text-base"
          >
            {profile.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 max-w-xl text-2xl font-medium leading-snug text-ink sm:text-3xl"
          >
            <span className="text-ink-dim">“</span>
            {profile.tagline}
            <span className="text-ink-dim">”</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-ink-dim"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <a
              href="#deployments"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('deployments')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-base-950 shadow-glow transition hover:brightness-110"
            >
              View deployments
            </a>
            <a
              href="#console"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('console')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-lg border border-base-700 bg-base-850 px-5 py-2.5 font-mono text-sm text-ink-dim transition hover:border-accent/50 hover:text-accent"
            >
              $ open console
            </a>
          </motion.div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-ink-faint">
            <span>📍 {profile.location}</span>
            <a href={`mailto:${profile.email}`} className="hover:text-accent">
              ✉ {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">
              ⎇ {profile.github.replace('https://', '')}
            </a>
          </div>
        </div>

        {/* right: control panel */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <MetricCard key={m.id} m={m} delay={0.1 + i * 0.08} />
            ))}
          </div>
          <div className="min-h-[180px] flex-1">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </section>
  )
}
