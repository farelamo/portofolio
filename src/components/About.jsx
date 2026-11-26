import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { profile } from '../data/resume.js'
import { Counter, SectionHeading, Scribble, easeOut } from './motion.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import Gopher from './shapes/Gopher.jsx'
import Whale from './shapes/Whale.jsx'
import Helm from './shapes/Helm.jsx'
import { Sparkle } from './shapes/Shapes.jsx'

const shapes = [
  { shape: 'hex', x: '92%', y: '6%', size: 46, color: 'var(--mint)', speed: 0.7 },
  { shape: 'sparkle', x: '2%', y: '30%', size: 36, color: 'var(--yellow)', speed: 0.5, spin: true },
  { shape: 'box', x: '88%', y: '70%', size: 40, color: 'var(--pink)', speed: 0.9, hideSm: true },
  { shape: 'gear', x: '4%', y: '88%', size: 50, color: 'var(--ai)', speed: 0.4, spin: true, hideSm: true },
]

function Bento({ className = '', delay = 0, children }) {
  return (
    <motion.div
      className={`bento ${className}`}
      initial={{ opacity: 0, y: 50, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay }}
      whileHover={{ y: -6 }}
    >
      {children}
    </motion.div>
  )
}

function useSeen() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return [ref, inView]
}

function BuildBars() {
  const [ref, inView] = useSeen()
  return (
    <div className="bars" ref={ref}>
      {[
        { label: 'before', val: '~8m', to: 1, cls: 'slow' },
        { label: 'after', val: '~1m', to: 0.125, cls: 'fast' },
      ].map((b, i) => (
        <div className="bar" key={b.label}>
          <span className="bar__label mono">{b.label}</span>
          <div className="bar__track">
            <motion.div
              className={`bar__fill bar__fill--${b.cls}`}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: b.to } : {}}
              transition={{ duration: 1.1, ease: easeOut, delay: 0.2 + i * 0.5 }}
            />
          </div>
          <span className="bar__val mono">{b.val}</span>
        </div>
      ))}
    </div>
  )
}

function Gauge() {
  const [ref, inView] = useSeen()
  const arc = 'M20 105 A80 80 0 0 1 180 105'
  return (
    <div className="gauge" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 200 120">
        <path d={arc} fill="none" stroke="var(--ink)" strokeWidth="20" strokeLinecap="round" />
        <path d={arc} fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round" />
        <motion.path
          d={arc}
          fill="none"
          stroke="var(--yellow)"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: easeOut }}
        />
      </svg>
      <motion.span
        className="gauge__needle"
        style={{ originX: 0.5, originY: 1 }}
        initial={{ rotate: -90 }}
        animate={inView ? { rotate: 78 } : {}}
        transition={{ type: 'spring', stiffness: 50, damping: 7, delay: 0.2 }}
      />
      <span className="gauge__hub" />
    </div>
  )
}

function ComplianceRing() {
  const [ref, inView] = useSeen()
  return (
    <div className="ring" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="46" fill="none" stroke="var(--ink)" strokeWidth="19" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="#fff" strokeWidth="12" />
        <g transform="rotate(-90 60 60)">
          <motion.circle
            cx="60"
            cy="60"
            r="46"
            fill="none"
            stroke="var(--mint)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 0.8 } : {}}
            transition={{ duration: 1.5, ease: easeOut }}
          />
        </g>
      </svg>
      <span className="ring__label">70–80%</span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section about">
      <FloatingShapes items={shapes} />
      <SectionHeading index="01" kicker="about me" color="var(--mint)">
        An engineer who loves <Scribble color="var(--mint)">fast, scalable</Scribble> systems.
      </SectionHeading>

      <div className="bento-grid">
        <Bento className="bento--summary">
          <p className="bento__kicker">$ whoami</p>
          <p className="bento__text">{profile.summary}</p>
          <p className="bento__sign mono">— {profile.name}</p>
          <div className="peek" aria-hidden="true">
            <Gopher size={130} />
          </div>
        </Bento>

        <Bento className="bento--yellow" delay={0.08}>
          <p className="bento__kicker">experience</p>
          <p className="bento__big">
            <Counter value={2} suffix="+" />
          </p>
          <p className="bento__note">years designing & shipping scalable systems</p>
          <motion.span
            className="bento__deco"
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkle size={46} color="#fff" />
          </motion.span>
        </Bento>

        <Bento className="bento--mint" delay={0.16}>
          <p className="bento__kicker">
            <span className="pulse" /> now running
          </p>
          <p className="bento__mid">DevOps Engineer</p>
          <p className="bento__note">@ PT POSe.id · since Oct 2025</p>
          <span className="bento__deco" aria-hidden="true">
            <Helm size={58} spin={6} />
          </span>
        </Bento>

        <Bento className="bento--blue bento--wide" delay={0.1}>
          <p className="bento__kicker">docker build pipeline</p>
          <p className="bento__big">
            −<Counter value={87} suffix="%" /> <span className="bento__unit">build time</span>
          </p>
          <BuildBars />
          <p className="bento__note">Multi-stage builds, layer caching & dependency optimization.</p>
          <span className="bento__whale" aria-hidden="true">
            <Whale width={120} spout />
          </span>
        </Bento>

        <Bento className="bento--pink bento--wide bento--row" delay={0.05}>
          <div>
            <p className="bento__kicker">endpoint performance</p>
            <p className="bento__big">
              <Counter value={400} suffix="%" />
            </p>
            <p className="bento__note">Up to 400% faster endpoints in Go through careful profiling and targeted fixes.</p>
          </div>
          <Gauge />
        </Bento>

        <Bento className="bento--ai bento--wide bento--row" delay={0.12}>
          <div>
            <p className="bento__kicker">security hardening</p>
            <p className="bento__mid">PCI DSS & ISO 27001</p>
            <p className="bento__note">
              Ansible-driven hardening across multiple environments, reaching ~70–80% compliance with organizational
              security requirements.
            </p>
          </div>
          <ComplianceRing />
        </Bento>
      </div>
    </section>
  )
}
