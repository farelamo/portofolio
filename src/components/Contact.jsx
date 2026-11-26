import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/resume.js'
import { Anchor, SectionHeading, Scribble } from './motion.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import Gopher from './shapes/Gopher.jsx'
import Robot from './shapes/Robot.jsx'
import Whale from './shapes/Whale.jsx'
import Icon from './Icon.jsx'

const { email, phone, linkedin, github } = profile.contacts

const links = [
  { label: 'LinkedIn', value: 'fariz-fahmi-faturachmad', href: linkedin, icon: 'linkedin', c: 'var(--docker)', external: true },
  { label: 'GitHub', value: 'farelamo', href: github, icon: 'github', c: 'var(--mint)', external: true },
  { label: 'Phone', value: phone, href: `tel:${phone}`, icon: 'phone', c: 'var(--pink)' },
]

const shapes = [
  { shape: 'sparkle', x: '6%', y: '10%', size: 42, color: '#fff', speed: 0.6, spin: true },
  { shape: 'hex', x: '90%', y: '8%', size: 50, color: 'var(--pink)', speed: 0.5 },
  { shape: 'ring', x: '50%', y: '4%', size: 36, color: 'var(--docker)', speed: 0.8, hideSm: true },
  { shape: 'box', x: '80%', y: '52%', size: 42, color: 'var(--mint)', speed: 0.7, hideSm: true },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <footer id="contact" className="contact">
      <FloatingShapes items={shapes} />
      <div className="contact__inner">
        <SectionHeading index="06" kicker="contact" color="#fff">
          Let’s build something <Scribble color="#fff">scalable</Scribble> together.
        </SectionHeading>
        <p className="contact__lead">
          Got a platform to scale, a pipeline to speed up, or an idea for AI-powered ops? Drop me a message.
        </p>

        <div className="contact__grid">
          <motion.div
            className="contact-card contact-card--email card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 140, damping: 16 }}
          >
            <span className="contact-card__label mono">
              <Icon name="mail" size={18} /> email
            </span>
            <a href={`mailto:${email}`} className="contact-card__value">
              {email}
            </a>
            <div className="contact-card__actions">
              <button type="button" className="btn btn--sm btn--yellow" onClick={copyEmail}>
                <Icon name="copy" size={16} /> {copied ? 'Copied!' : 'Copy email'}
              </button>
              <a className="btn btn--sm" href={`mailto:${email}`}>
                Send mail <Icon name="arrow" size={16} />
              </a>
            </div>
          </motion.div>

          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              className="contact-card card"
              style={{ '--c': l.c }}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.08 * (i + 1) }}
            >
              <span className="contact-card__icon">
                <Icon name={l.icon} />
              </span>
              <span className="contact-card__label mono">{l.label}</span>
              <span className="contact-card__value">{l.value}</span>
              <span className="contact-card__arrow" aria-hidden="true">
                <Icon name="arrow" />
              </span>
            </motion.a>
          ))}
        </div>

        <div className="contact__mascots" aria-hidden="true">
          <motion.div
            initial={{ y: 120 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 160, damping: 14 }}
          >
            <Gopher size={120} wave />
          </motion.div>
          <motion.div
            initial={{ y: 120 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.15 }}
          >
            <Robot size={110} />
          </motion.div>
        </div>
      </div>

      <div className="sea" aria-hidden="true">
        <motion.div
          className="sea__whale"
          animate={{ x: ['105vw', '-30vw'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          <Whale width={150} spout />
        </motion.div>
        <div className="sea__waves" />
      </div>

      <div className="footer-bar">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="mono">built with React + Framer Motion · shipped like a pod</p>
        <Anchor href="#home" className="btn btn--sm">
          <Icon name="up" size={16} /> Back to top
        </Anchor>
      </div>

      <p className="sr-only" role="status">
        {copied ? 'Email address copied to clipboard' : ''}
      </p>
      <AnimatePresence>
        {copied && (
          <motion.div
            className="toast"
            aria-hidden="true"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            ✓ Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
