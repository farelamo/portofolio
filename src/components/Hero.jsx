import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/resume.js'
import { C } from '../lib/theme.js'
import Playground from './Playground.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import Helm from './shapes/Helm.jsx'
import { Box, Hex, Sparkle } from './shapes/Shapes.jsx'
import Icon from './Icon.jsx'
import { Anchor, INTRO_DELAY as D, easeOut } from './motion.jsx'

const letterColors = ['var(--docker)', 'var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--ai)']
const roleColors = [C.docker, C.yellow, C.pink, C.mint, C.ai]

const shapes = [
  { shape: 'ring', x: '46%', y: '12%', size: 38, color: 'var(--pink)', speed: 0.6 },
  { shape: 'plus', x: '3%', y: '78%', size: 34, color: 'var(--docker)', speed: 0.4 },
  { shape: 'squiggle', x: '40%', y: '88%', size: 110, color: 'var(--mint)', speed: 0.5, hideSm: true },
  { shape: 'tri', x: '94%', y: '86%', size: 40, color: 'var(--orange)', speed: 0.8, hideSm: true },
]

const chips = [
  { icon: <Box size={20} color="var(--docker)" />, text: '~8m → ~1m Docker builds' },
  { icon: <Sparkle size={20} color="var(--yellow)" />, text: 'Up to 400% faster APIs' },
  { icon: <Helm size={20} spin={0} />, text: 'Multi-cluster Kubernetes' },
  { icon: <Hex size={20} color="var(--mint)" />, text: 'GPA 3.92' },
]

function BouncyWord({ text }) {
  return (
    <span className="bouncy" aria-hidden="true">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="bouncy__ch"
          style={{ color: letterColors[i % letterColors.length] }}
          initial={{ y: 140, rotate: -25, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 14, delay: D + 0.25 + i * 0.07 }}
          whileHover={{
            y: -22,
            rotate: i % 2 ? 10 : -10,
            scale: 1.08,
            transition: { type: 'spring', stiffness: 500, damping: 10 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

function RoleFlip() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <>
      <span className="sr-only">{profile.roles.join(', ')}</span>
      <motion.span
        layout
        className="role-pill"
        aria-hidden="true"
        animate={{ backgroundColor: roleColors[i % roleColors.length] }}
        transition={{ layout: { type: 'spring', stiffness: 300, damping: 26 }, duration: 0.3 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={profile.roles[i]}
            initial={{ y: '110%', rotateX: -80 }}
            animate={{ y: '0%', rotateX: 0 }}
            exit={{ y: '-110%', rotateX: 80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            {profile.roles[i]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  )
}

const up = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easeOut, delay: D + delay },
})

export default function Hero() {
  const { github, linkedin } = profile.contacts
  return (
    <section id="home" className="hero">
      <FloatingShapes items={shapes} />
      <div className="hero__grid">
        <div className="hero__text">
          <motion.p className="chip hero__hello" {...up(0.1)}>
            <motion.span
              className="wave"
              aria-hidden="true"
              animate={{ rotate: [0, 18, -8, 18, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
            >
              👋
            </motion.span>
            Halo! Welcome to my playground
          </motion.p>

          <h1 className="hero__title">
            <span className="sr-only">Hi, I’m Fariz</span>
            <motion.span className="hero__hi" aria-hidden="true" {...up(0.15)}>
              Hi, I’m
            </motion.span>
            <BouncyWord text={profile.firstName} />
          </h1>
          <motion.p className="hero__fullname mono" {...up(0.55)}>
            {profile.name}
          </motion.p>

          <motion.div className="hero__role" {...up(0.6)}>
            <span>I’m a</span>
            <RoleFlip />
          </motion.div>

          <motion.p className="hero__lead" {...up(0.7)}>
            I build Go backends, run multi-cloud Kubernetes, and teach AI agents to help debug production.
            2+ years shipping systems that are fast, scalable and secure.
          </motion.p>

          <motion.div className="hero__cta" {...up(0.8)}>
            <Anchor href="#impact" className="btn btn--yellow">
              See my work <Icon name="arrow" size={18} />
            </Anchor>
            <Anchor href="#contact" className="btn">
              Say hello
            </Anchor>
            <a className="btn btn--icon" href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <Icon name="github" />
            </a>
            <a className="btn btn--icon" href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <Icon name="linkedin" />
            </a>
          </motion.div>

          <motion.ul
            className="hero__chips"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: D + 0.95 } } }}
          >
            {chips.map((c) => (
              <motion.li
                key={c.text}
                className="chip chip--sm"
                variants={{
                  hidden: { opacity: 0, scale: 0.6, y: 10 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 16 } },
                }}
                whileHover={{ y: -4, rotate: -2 }}
              >
                {c.icon}
                {c.text}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Playground />
      </div>

      <motion.div className="scroll-cue mono" aria-hidden="true" {...up(1.3)}>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <Box size={22} color="var(--yellow)" />
        </motion.span>
        scroll to explore
      </motion.div>
    </section>
  )
}
