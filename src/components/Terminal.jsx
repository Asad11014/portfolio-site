import { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import { profile, services, projects, deployLog } from '../data/portfolio'

const PROMPT = 'guest@asad-rizvi:~$'

// Each command returns an array of output lines.
// A line is { t: 'out'|'ok'|'dim'|'accent'|'err'|'link', text, href? }
const commands = {
  help: () => [
    { t: 'dim', text: 'Available commands:' },
    { t: 'out', text: '  whoami        who is Asad Rizvi' },
    { t: 'out', text: '  skills        list the service/skill matrix' },
    { t: 'out', text: '  experience    print the deploy log (career)' },
    { t: 'out', text: '  projects      list shipped deployments' },
    { t: 'out', text: '  open <id>     open a project (e.g. open aranalytics)' },
    { t: 'out', text: '  contact       how to reach me' },
    { t: 'out', text: '  github        open my GitHub' },
    { t: 'out', text: '  resume        download / view summary' },
    { t: 'out', text: '  clear         clear the screen' },
    { t: 'dim', text: 'Tip: ↑/↓ for history, Tab to autocomplete.' },
  ],
  whoami: () => [
    { t: 'accent', text: profile.name },
    { t: 'out', text: profile.role },
    { t: 'dim', text: profile.location + ' · ' + profile.availability },
    { t: 'out', text: '' },
    { t: 'out', text: profile.tagline },
  ],
  skills: () =>
    services.flatMap((s) => [
      { t: 'accent', text: `[${s.group}]  ${s.status}` },
      { t: 'out', text: '  ' + s.items.map((i) => i.name).join(' · ') },
    ]),
  experience: () =>
    deployLog.flatMap((e) => [
      { t: 'accent', text: `${e.tag}` },
      { t: 'out', text: `  ${e.title} — ${e.org}` },
      { t: 'dim', text: `  ${e.period} · ${e.location}` },
    ]),
  projects: () =>
    projects.flatMap((p) => [
      { t: 'accent', text: `${p.name}  (${p.env})` },
      { t: 'out', text: `  ${p.subtitle}` },
      { t: 'dim', text: `  stack: ${p.stack.join(', ')}` },
      { t: 'dim', text: `  → open ${p.id}` },
    ]),
  contact: () => [
    { t: 'link', text: `email   ${profile.email}`, href: `mailto:${profile.email}` },
    { t: 'link', text: `github  ${profile.github}`, href: profile.github },
    { t: 'out', text: `phone   ${profile.phone}` },
    { t: 'out', text: `loc     ${profile.location}` },
  ],
  github: () => {
    window.open(profile.github, '_blank')
    return [{ t: 'ok', text: 'Opening GitHub…' }]
  },
  resume: () => [
    { t: 'ok', text: 'BSc Computer Science (2:1), University of Birmingham.' },
    { t: 'out', text: profile.summary },
    { t: 'dim', text: 'Ask via contact for the full PDF.' },
  ],
  ls: () => [{ t: 'out', text: 'skills/  experience/  projects/  contact  resume.pdf' }],
  pwd: () => [{ t: 'out', text: '/home/asad/portfolio' }],
  date: () => [{ t: 'out', text: new Date().toString() }],
  sudo: () => [{ t: 'err', text: 'guest is not in the sudoers file. This incident will be reported. 🙂' }],
  echo: (args) => [{ t: 'out', text: args.join(' ') }],
}

function runCommand(raw) {
  const input = raw.trim()
  if (!input) return { lines: [] }
  const [cmd, ...args] = input.split(/\s+/)
  const lower = cmd.toLowerCase()

  if (lower === 'clear') return { clear: true }

  if (lower === 'open') {
    const id = (args[0] || '').toLowerCase()
    const p = projects.find((x) => x.id === id || x.name.toLowerCase() === id)
    if (!p) return { lines: [{ t: 'err', text: `no project "${args[0] || ''}". try: projects` }] }
    const url = p.demo || p.code
    window.open(url, '_blank')
    return { lines: [{ t: 'ok', text: `Opening ${p.name} → ${url}` }] }
  }

  const fn = commands[lower]
  if (!fn) {
    return {
      lines: [{ t: 'err', text: `command not found: ${cmd}. type "help".` }],
    }
  }
  return { lines: fn(args) }
}

const lineClass = {
  out: 'text-ink-dim',
  ok: 'text-accent',
  dim: 'text-ink-faint',
  accent: 'text-accent-cyan',
  err: 'text-accent-red',
}

const banner = [
  { t: 'accent', text: '  ___   ____ ' },
  { t: 'accent', text: ' / _ \\ / __ \\   asad-rizvi ops console v1.0' },
  { t: 'accent', text: '/ __ |/ /_/ /   type "help" to get started' },
  { t: 'dim', text: '\\_/ |_|\\_,_/    ' },
]

export default function Terminal() {
  const [history, setHistory] = useState(banner)
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history])

  const submit = (e) => {
    e.preventDefault()
    const raw = input
    const echo = { t: 'cmd', text: `${PROMPT} ${raw}` }
    const res = runCommand(raw)

    if (res.clear) {
      setHistory([])
    } else {
      setHistory((h) => [...h, echo, ...res.lines])
    }
    if (raw.trim()) setCmdHistory((c) => [raw, ...c])
    setHistIdx(-1)
    setInput('')
  }

  const onKey = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistIdx((i) => {
        const ni = Math.min(i + 1, cmdHistory.length - 1)
        if (cmdHistory[ni] !== undefined) setInput(cmdHistory[ni])
        return ni
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistIdx((i) => {
        const ni = Math.max(i - 1, -1)
        setInput(ni === -1 ? '' : cmdHistory[ni] || '')
        return ni
      })
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const all = [...Object.keys(commands), 'open', 'clear']
      const match = all.find((c) => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  return (
    <section id="console" className="section-pad py-20">
      <SectionHeader
        index="04"
        kicker="Interactive"
        title="Console"
        desc="Not a screenshot. A real shell — explore my background by typing. Start with help."
      />

      <div
        className="panel overflow-hidden"
        onClick={() => inputRef.current?.focus()}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-base-700/60 bg-base-850/80 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-accent-red/80" />
          <span className="h-3 w-3 rounded-full bg-accent-amber/80" />
          <span className="h-3 w-3 rounded-full bg-accent/80" />
          <span className="ml-2 font-mono text-[11px] text-ink-faint">
            guest@asad-rizvi — zsh — 80×24
          </span>
        </div>

        {/* body */}
        <div
          ref={bodyRef}
          className="h-[360px] overflow-y-auto bg-base-950/70 p-4 font-mono text-[13px] leading-relaxed"
        >
          {history.map((l, i) =>
            l.t === 'cmd' ? (
              <div key={i} className="text-ink">
                <span className="text-accent">{PROMPT}</span>
                {' ' + l.text.replace(PROMPT, '').trimStart()}
              </div>
            ) : l.t === 'link' ? (
              <a
                key={i}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="block text-accent underline-offset-2 hover:underline"
              >
                {l.text}
              </a>
            ) : (
              <div key={i} className={lineClass[l.t] || 'text-ink-dim'}>
                {l.text || ' '}
              </div>
            ),
          )}

          {/* live input line */}
          <form onSubmit={submit} className="mt-1 flex items-center">
            <span className="text-accent">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="terminal input"
              className="ml-2 flex-1 bg-transparent text-ink caret-accent outline-none"
            />
          </form>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-ink-faint">
        try: <span className="text-accent">whoami</span> ·{' '}
        <span className="text-accent">projects</span> ·{' '}
        <span className="text-accent">open aranalytics</span> ·{' '}
        <span className="text-accent">experience</span>
      </p>
    </section>
  )
}
