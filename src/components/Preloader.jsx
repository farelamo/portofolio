import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion } from 'framer-motion'
import Whale from './shapes/Whale.jsx'
import Helm from './shapes/Helm.jsx'
import Gopher from './shapes/Gopher.jsx'
import Robot from './shapes/Robot.jsx'
import { Hex } from './shapes/Shapes.jsx'

const wipe = [0.76, 0, 0.24, 1]

/* ---------- Scene art: one mini animation per "deploy step" ---------- */

function SceneDocker() {
  return (
    <div className="scene">
      <Whale width={320} build delay={0.05} spout waves className="scene__svg" />
    </div>
  )
}

const podColors = ['var(--mint)', 'var(--yellow)', 'var(--pink)', 'var(--docker)', 'var(--orange)', 'var(--ai)', 'var(--go)']

function SceneK8s() {
  return (
    <div className="scene scene-k8s">
      <motion.div
        className="scene-k8s__helm"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 170, damping: 13 }}
      >
        <Helm size={150} spin={2.5} className="scene__svg" />
      </motion.div>
      <motion.div
        className="scene-k8s__orbit"
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      >
        {podColors.map((c, i) => {
          const a = (i / podColors.length) * Math.PI * 2 - Math.PI / 2
          return (
            <motion.span
              key={i}
              className="scene-k8s__pod"
              style={{ left: `${50 + Math.cos(a) * 44}%`, top: `${50 + Math.sin(a) * 44}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.2 + i * 0.06 }}
            >
              <Hex size={36} color={c} />
            </motion.span>
          )
        })}
      </motion.div>
    </div>
  )
}

function SceneGo() {
  return (
    <div className="scene scene-go">
      <motion.div
        initial={{ y: 220 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
      >
        <Gopher size={170} wave track={false} className="scene__svg" />
      </motion.div>
      <motion.span
        className="bubble-pop"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: -8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.3 }}
      >
        go!
      </motion.span>
      <span className="scene-go__hole" />
    </div>
  )
}

const agentNodes = [
  { x: 40, y: 34, c: 'var(--orange)', l: 'metrics' },
  { x: 280, y: 34, c: 'var(--yellow)', l: 'dashboards' },
  { x: 40, y: 186, c: 'var(--mint)', l: 'logs' },
  { x: 280, y: 186, c: 'var(--pink)', l: 'uptime' },
]

function SceneAgent() {
  return (
    <div className="scene scene-agent">
      <svg viewBox="0 0 320 220" className="scene-agent__net" aria-hidden="true">
        {agentNodes.map((n, i) => (
          <g key={n.l}>
            <motion.line
              x1="160"
              y1="110"
              x2={n.x}
              y2={n.y}
              stroke="var(--bg)"
              strokeWidth="3"
              strokeDasharray="1 0"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            />
            <motion.circle
              r="5"
              fill="var(--mint)"
              initial={{ cx: n.x, cy: n.y, opacity: 0 }}
              animate={{ cx: [n.x, 160], cy: [n.y, 110], opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, delay: 0.4 + i * 0.1, repeat: Infinity }}
            />
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.3 + i * 0.08 }}
            >
              <circle cx={n.x} cy={n.y} r="16" fill={n.c} stroke="var(--bg)" strokeWidth="3" />
            </motion.g>
            <text x={n.x} y={n.y > 100 ? n.y + 34 : n.y - 24} className="scene-agent__label">
              {n.l}
            </text>
          </g>
        ))}
      </svg>
      <motion.div
        className="scene-agent__robot"
        initial={{ scale: 0, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14 }}
      >
        <Robot size={120} track={false} className="scene__svg" />
      </motion.div>
    </div>
  )
}

const greetColors = ['var(--docker)', 'var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--ai)', 'var(--orange)']

function Greeting() {
  const text = 'Halo, welcome!'
  return (
    <div className="greet">
      <h2 className="greet__title" aria-label={text}>
        {text.split('').map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            style={{ color: greetColors[i % greetColors.length] }}
            initial={{ y: 80, opacity: 0, rotate: -20 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 14, delay: i * 0.035 }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </h2>
      <motion.p
        className="greet__sub"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        You’re entering Fariz’s playground
      </motion.p>
      <div className="greet__team">
        {[
          <Whale key="w" width={96} bob={false} />,
          <Helm key="h" size={60} spin={3} />,
          <Gopher key="g" size={58} wave track={false} />,
          <Robot key="r" size={62} track={false} />,
        ].map((el, i) => (
          <motion.span
            key={i}
            initial={{ y: 60, scale: 0 }}
            animate={{ y: [0, -12, 0], scale: 1 }}
            transition={{
              scale: { type: 'spring', stiffness: 380, damping: 14, delay: 0.25 + i * 0.08 },
              y: { duration: 0.9, repeat: Infinity, delay: 0.25 + i * 0.12, ease: 'easeInOut' },
            }}
          >
            {el}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

const SCENES = [
  { label: 'build', color: 'var(--docker)', cmd: 'docker build -t fariz/portfolio .', note: 'Stacking containers', Art: SceneDocker },
  { label: 'deploy', color: 'var(--k8s)', cmd: 'kubectl apply -f fariz.yaml', note: 'Scheduling pods', Art: SceneK8s },
  { label: 'run', color: 'var(--go)', cmd: 'go run ./cmd/fariz', note: 'Waking up the gopher', Art: SceneGo },
  { label: 'agent', color: 'var(--ai)', cmd: 'agent --mode=autopilot', note: 'Booting the AI agent', Art: SceneAgent },
]

function Typed({ text, ms }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const step = Math.max(12, ms / text.length)
    const t = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), step)
    return () => clearInterval(t)
  }, [text, ms])
  return <>{text.slice(0, n)}</>
}

function readSeen() {
  try {
    return sessionStorage.getItem('ff-intro-seen') === '1'
  } catch {
    return false
  }
}

/**
 * Welcome sequence styled like a deploy pipeline:
 * docker build -> kubectl apply -> go run -> agent start -> greeting,
 * then colored layers wipe up to reveal the site. Skippable; shorter on repeat visits.
 */
export default function Preloader({ onDone }) {
  const fast = useRef(readSeen()).current
  const sceneMs = fast ? 450 : 900
  const greetMs = fast ? 900 : 1600
  const [step, setStep] = useState(0)
  const [pct, setPct] = useState(0)
  const doneRef = useRef(false)

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    try {
      sessionStorage.setItem('ff-intro-seen', '1')
    } catch {
      /* storage unavailable: fine */
    }
    onDone()
  }, [onDone])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }
    const timers = SCENES.map((_, i) => setTimeout(() => setStep(i + 1), sceneMs * (i + 1)))
    timers.push(setTimeout(finish, sceneMs * SCENES.length + greetMs))
    const c = animate(0, 100, {
      duration: (sceneMs * SCENES.length) / 1000,
      ease: 'easeInOut',
      onUpdate: (v) => setPct(Math.round(v)),
    })
    const onKey = (e) => (e.key === 'Escape' || e.key === 'Enter') && finish()
    window.addEventListener('keydown', onKey)
    return () => {
      timers.forEach(clearTimeout)
      c.stop()
      window.removeEventListener('keydown', onKey)
    }
  }, [sceneMs, greetMs, finish])

  const scene = SCENES[Math.min(step, SCENES.length - 1)]
  const layers = ['var(--mint)', 'var(--pink)', 'var(--yellow)', 'var(--docker)']

  return (
    <motion.div className="pre" role="dialog" aria-modal="true" aria-label="Welcome intro">
      {layers.map((c, i) => (
        <motion.div
          key={c}
          className="pre__layer"
          style={{ background: c }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: wipe, delay: 0.5 - i * 0.1 }}
        />
      ))}
      <motion.div className="pre__bg" exit={{ y: '-100%' }} transition={{ duration: 0.7, ease: wipe, delay: 0.08 }} />

      <motion.div className="pre__content" exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.25 }}>
        <header className="pre__top">
          <span className="pre__logo">
            fariz<span>.go</span>
          </span>
          <button type="button" className="pre__skip" onClick={finish}>
            Skip intro <kbd>Esc</kbd>
          </button>
        </header>

        <div className="pre__stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="pre__scene"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.15, y: -30, filter: 'blur(6px)' }}
              transition={{ duration: 0.22 }}
            >
              {step < SCENES.length ? <scene.Art /> : <Greeting />}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="pre__term" aria-hidden="true">
          {step < SCENES.length ? (
            <>
              <span className="pre__prompt">$</span> <Typed key={step} text={scene.cmd} ms={sceneMs * 0.55} />
              <span className="caret" />
              <span className="pre__note">{scene.note}…</span>
            </>
          ) : (
            <>
              <span className="pre__prompt">✓</span> all systems healthy
              <span className="pre__note">Opening the playground…</span>
            </>
          )}
        </p>

        <ol className="pre__steps" aria-label="Loading steps">
          {SCENES.map((s, i) => {
            const state = i < step ? 'is-done' : i === step ? 'is-active' : ''
            return (
              <li key={s.label} className={`pre__step ${state}`} style={{ '--c': s.color }}>
                <span className="pre__step-icon" aria-hidden="true">
                  {i < step ? '✓' : i === step ? <span className="spinner" /> : i + 1}
                </span>
                {s.label}
              </li>
            )
          })}
        </ol>

        <div className="pre__progress">
          <div className="pre__track">
            <div className="pre__fill" style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
          <span className="pre__pct mono" aria-live="off">
            {pct}%
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
