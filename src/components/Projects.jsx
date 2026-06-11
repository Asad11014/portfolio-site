import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import { projects } from '../data/portfolio'
import SectionHeader from './SectionHeader'

function Sparkline({ data, color }) {
  const options = {
    chart: {
      type: 'area',
      sparkline: { enabled: true },
      animations: { enabled: true, easing: 'easeinout', speed: 900 },
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0, stops: [0, 100] },
    },
    colors: [color],
    tooltip: { enabled: false },
    grid: { padding: { top: 0, bottom: 0, left: 0, right: 0 } },
  }
  return (
    <Chart options={options} series={[{ data }]} type="area" height={56} width="100%" />
  )
}

const envStyle = {
  production: 'border-accent/40 bg-accent/10 text-accent',
  staging: 'border-accent-amber/40 bg-accent-amber/10 text-accent-amber',
}

function DeployCard({ p, idx }) {
  const color = p.env === 'production' ? '#34d399' : '#fbbf24'
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: idx * 0.1 }}
      className="panel group relative flex flex-col overflow-hidden p-6"
    >
      {/* header row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-bold text-ink">{p.name}</h3>
            <span className={`chip ${envStyle[p.env]}`}>
              <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-current" />
              {p.env}
            </span>
          </div>
          <p className="mt-0.5 font-mono text-xs text-ink-dim">{p.subtitle}</p>
        </div>
        <div className="text-right font-mono text-[11px] text-ink-faint">
          <div className="text-accent">● {p.status}</div>
          <div>build #{1000 + idx * 37}</div>
        </div>
      </div>

      {/* chart */}
      <div className="mt-5 rounded-lg border border-base-700/50 bg-base-950/40 px-3 pt-3">
        <div className="label-mono mb-1">{p.chartLabel}</div>
        <Sparkline data={p.chart} color={color} />
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink-dim">{p.summary}</p>

      <ul className="mt-4 space-y-2">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-[13px] leading-relaxed text-ink-dim">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {h}
          </li>
        ))}
      </ul>

      {/* build manifest */}
      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>

      {/* actions */}
      <div className="mt-6 flex flex-wrap gap-3 border-t border-base-700/50 pt-5">
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-base-950 transition hover:brightness-110"
          >
            ↗ Live demo
          </a>
        )}
        <a
          href={p.code}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-base-700 bg-base-850 px-4 py-2 font-mono text-sm text-ink-dim transition hover:border-accent/50 hover:text-accent"
        >
          ⎇ Source
        </a>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="deployments" className="section-pad py-20">
      <SectionHeader
        index="02"
        kicker="Shipped & running"
        title="Deployments"
        desc="Production software I designed, built and shipped — not demos. Each one solves a real operational problem."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, i) => (
          <DeployCard key={p.id} p={p} idx={i} />
        ))}
      </div>
    </section>
  )
}
