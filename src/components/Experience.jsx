import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { experiences } from '../data/resume.js'
import { useMediaQuery } from '../lib/hooks.js'
import { SectionHeading, Scribble } from './motion.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import Helm from './shapes/Helm.jsx'
import Gopher from './shapes/Gopher.jsx'
import { Box, Sparkle } from './shapes/Shapes.jsx'

const kinds = {
  devops: { label: 'DevOps', tint: '#D8E4FF', icon: <Helm size={72} spin={8} /> },
  backend: { label: 'Backend', tint: '#D2F3FA', icon: <Gopher size={60} /> },
  fullstack: {
    label: 'Fullstack',
    tint: '#FFF0C7',
    icon: (
      <span className="exp__boxes">
        <Box size={40} color="var(--yellow)" />
        <Box size={40} color="var(--pink)" />
      </span>
    ),
  },
  org: { label: 'Organization', tint: '#FFE0EE', icon: <Sparkle size={60} color="var(--pink)" /> },
}

const shapes = [
  { shape: 'helm', x: '90%', y: '8%', size: 60, color: 'var(--k8s)', speed: 0.5 },
  { shape: 'squiggle', x: '2%', y: '16%', size: 100, color: 'var(--yellow)', speed: 0.6, hideSm: true },
  { shape: 'hex', x: '4%', y: '84%', size: 44, color: 'var(--pink)', speed: 0.8 },
]

export default function Experience() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const horizontal = useMediaQuery('(max-width: 900px)')
  const item = experiences[active]
  const kind = kinds[item.kind]

  // Roving focus: arrows / Home / End move between pods
  function onKeyDown(e) {
    const last = experiences.length - 1
    const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    let next = null
    if (e.key in map) next = (active + map[e.key] + experiences.length) % experiences.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="experience" className="section exp">
      <FloatingShapes items={shapes} />
      <SectionHeading index="03" kicker="experience" color="var(--gopher)">
        Every role is a <Scribble color="var(--gopher)" after=".">pod</Scribble>
      </SectionHeading>
      <p className="section__sub">Pick a pod to inspect it. Newest first, all the way back to my first internship.</p>

      <div className="exp__grid">
        <div className="pods">
          <p className="pods__cmd mono">
            <span>$</span> kubectl get pods -n career
          </p>
          <div
            className="pods__list"
            role="tablist"
            aria-label="Career history"
            aria-orientation={horizontal ? 'horizontal' : 'vertical'}
            onKeyDown={onKeyDown}
            data-lenis-prevent-wheel={horizontal ? '' : undefined}
          >
            {experiences.map((it, i) => {
              const selected = i === active
              return (
                <button
                  key={it.slug}
                  ref={(el) => (tabs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`pod-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="pod-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`pod-row ${selected ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {selected && (
                    <motion.span
                      layoutId="pod-active"
                      className="pod-row__bg"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="pod-row__name mono">{it.slug}</span>
                  <span className={`pod-row__status mono ${it.current ? 'is-running' : ''}`}>
                    <i aria-hidden="true" />
                    {it.current ? 'Running' : 'Completed'}
                  </span>
                  <span className="pod-row__age mono">{it.period}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="exp__panel card" role="tabpanel" id="pod-panel" aria-labelledby={`pod-tab-${active}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="exp__head" style={{ background: kind.tint }}>
                <div>
                  <p className="exp__meta mono">
                    {kind.label} · {item.period}
                  </p>
                  <h3 className="exp__role">{item.role}</h3>
                  <p className="exp__company">{item.company}</p>
                </div>
                <motion.div
                  className="exp__icon"
                  aria-hidden="true"
                  initial={{ scale: 0, rotate: -40 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.1 }}
                >
                  {kind.icon}
                </motion.div>
              </div>
              <motion.ul
                className="exp__points"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              >
                {item.points.map((p, k) => (
                  <motion.li
                    key={k}
                    variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                  >
                    {p}
                  </motion.li>
                ))}
              </motion.ul>
              <ul className="tags" aria-label="Technologies">
                {item.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
