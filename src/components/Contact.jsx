import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'
import SectionHeader from './SectionHeader'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, glyph: '✉' },
  { label: 'GitHub', value: profile.github.replace('https://', ''), href: profile.github, glyph: '⎇' },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone}`, glyph: '☎' },
]

export default function Contact() {
  return (
    <section id="contact" className="section-pad py-20">
      <SectionHeader index="05" kicker="Open a channel" title="Get in touch" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="panel relative overflow-hidden p-8 sm:p-10"
      >
        {/* scanline accent */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute inset-x-0 h-24 animate-scan bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs text-accent">STATUS: ACCEPTING CONNECTIONS</p>
            <h3 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
              Looking for an engineer who ships software that runs real operations?
            </h3>
            <p className="mt-3 max-w-lg text-sm text-ink-dim">
              I'm open to remote software engineering roles with US &amp; Canada based teams.
              Let's talk about what you're building.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-base-950 shadow-glow transition hover:brightness-110"
            >
              ✉ Start a conversation
            </a>
          </div>

          <div className="space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-lg border border-base-700/70 bg-base-850/60 px-4 py-3 transition hover:border-accent/50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-base-700 bg-base-900 text-accent">
                  {c.glyph}
                </span>
                <span className="min-w-0">
                  <span className="label-mono block">{c.label}</span>
                  <span className="block truncate font-mono text-sm text-ink-dim group-hover:text-accent">
                    {c.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
