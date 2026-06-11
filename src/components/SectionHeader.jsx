import { motion } from 'framer-motion'

export default function SectionHeader({ index, kicker, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="mb-9"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="h-px w-8 bg-accent/40" />
        <span className="label-mono">{kicker}</span>
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {desc && <p className="mt-2 max-w-2xl text-sm text-ink-dim">{desc}</p>}
    </motion.div>
  )
}
