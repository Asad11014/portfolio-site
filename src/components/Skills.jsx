import { motion } from 'framer-motion'
import { services } from '../data/portfolio'
import SectionHeader from './SectionHeader'
import { useInViewOnce } from '../hooks'

function HealthBar({ level, delay }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-700/70">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: 'easeOut' }}
        className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent"
      />
    </div>
  )
}

function ServiceCard({ svc, idx }) {
  const [ref, inView] = useInViewOnce(0.3)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.06 }}
      className="panel p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-sm font-semibold text-ink">{svc.group}</h3>
        <span className="chip border-accent/30 bg-accent/5 text-accent">
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-accent" />
          {svc.status}
        </span>
      </div>
      <div className="space-y-3">
        {svc.items.map((it, i) => (
          <div key={it.name}>
            <div className="mb-1 flex items-baseline justify-between font-mono text-[11px]">
              <span className="text-ink-dim">{it.name}</span>
              <span className="tabular-nums text-ink-faint">{it.level}%</span>
            </div>
            <HealthBar level={it.level} delay={i * 0.05} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="services" className="section-pad py-20">
      <SectionHeader
        index="01"
        kicker="Skill matrix"
        title="Services & health"
        desc="Every capability, monitored like a running service. All systems operational — these are the stacks I ship with in production."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((svc, i) => (
          <ServiceCard key={svc.group} svc={svc} idx={i} />
        ))}
      </div>
    </section>
  )
}
