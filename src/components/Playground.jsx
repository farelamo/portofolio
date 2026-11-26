import { useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'
import { facts } from '../data/resume.js'
import Gopher from './shapes/Gopher.jsx'
import Whale from './shapes/Whale.jsx'
import Helm from './shapes/Helm.jsx'
import Robot from './shapes/Robot.jsx'
import { Box, Cloud, Gear, Sparkle } from './shapes/Shapes.jsx'
import { INTRO_DELAY } from './motion.jsx'

const toys = [
  { id: 'helm', el: <Helm size={84} spin={10} />, x: '6%', y: '6%', r: -8 },
  { id: 'box1', el: <Box size={60} color="var(--yellow)" />, x: '78%', y: '6%', r: 12 },
  { id: 'box2', el: <Box size={46} color="var(--pink)" />, x: '84%', y: '30%', r: -10 },
  { id: 'spark', el: <Sparkle size={40} color="var(--yellow)" />, x: '46%', y: '3%', r: 0 },
  { id: 'gear', el: <Gear size={56} color="var(--mint)" />, x: '8%', y: '40%', r: 0 },
  { id: 'whale', el: <Whale width={124} />, x: '3%', y: '70%', r: -4 },
  { id: 'robot', el: <Robot size={80} />, x: '76%', y: '60%', r: 8 },
  { id: 'cloud', el: <Cloud size={84} color="#fff" />, x: '60%', y: '74%', r: 0 },
  { id: 'code', el: <span className="code-chip">{'{ go }'}</span>, x: '34%', y: '76%', r: -6 },
]

function Toy({ t, i, area }) {
  return (
    <motion.div
      className="toy"
      style={{ left: t.x, top: t.y }}
      drag
      dragConstraints={area}
      dragElastic={0.3}
      dragTransition={{ bounceStiffness: 380, bounceDamping: 14 }}
      initial={{ scale: 0, rotate: t.r - 60 }}
      animate={{ scale: 1, rotate: t.r }}
      transition={{ type: 'spring', stiffness: 260, damping: 14, delay: INTRO_DELAY + 0.45 + i * 0.06 }}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.2, rotate: 0, zIndex: 20 }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
      >
        {t.el}
      </motion.div>
    </motion.div>
  )
}

/** Hero sandbox: draggable tech shapes around a gopher that tells facts about Fariz. */
export default function Playground() {
  const area = useRef(null)
  const [fact, setFact] = useState(-1)
  const [scope, animate] = useAnimate()

  function nextFact() {
    setFact((f) => (f + 1) % facts.length)
    animate(scope.current, { y: [0, -36, 0], rotate: [0, -8, 8, 0], scaleY: [1, 1.06, 0.94, 1] }, { duration: 0.55 })
  }

  return (
    <motion.div
      className="play card"
      initial={{ opacity: 0, scale: 0.85, rotate: 4 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 140, damping: 16, delay: INTRO_DELAY + 0.2 }}
    >
      <div className="play__bar">
        <i />
        <i />
        <i />
        <span className="mono">playground.go</span>
        <span className="play__live mono">
          <span className="pulse" /> live
        </span>
      </div>

      <div className="play__area" ref={area}>
        {toys.map((t, i) => (
          <Toy key={t.id} t={t} i={i} area={area} />
        ))}

        <div className="play__center">
          <div className="bubble" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={fact}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.9 }}
                transition={{ duration: 0.18 }}
              >
                {fact < 0 ? 'Psst! Click me for fun facts about Fariz.' : facts[fact]}
              </motion.p>
            </AnimatePresence>
          </div>
          <button
            type="button"
            className="gopher-btn"
            onClick={nextFact}
            aria-label="Ask the gopher for a fun fact about Fariz"
          >
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}>
              <div ref={scope}>
                <Gopher size={160} wave={fact < 0} className="gopher-svg" />
              </div>
            </motion.div>
          </button>
          <span className="play__count mono" aria-hidden="true">
            fact {Math.max(fact + 1, 0)}/{facts.length}
          </span>
        </div>
      </div>

      <p className="play__hint mono">✦ drag the shapes · click the gopher</p>
    </motion.div>
  )
}
