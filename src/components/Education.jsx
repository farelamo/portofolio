import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { awards, education } from '../data/resume.js'
import { Counter, SectionHeading, Scribble, easeOut } from './motion.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import { GradCap, Trophy, shapeMap } from './shapes/Shapes.jsx'

const shapes = [
  { shape: 'ring', x: '92%', y: '10%', size: 42, color: 'var(--orange)', speed: 0.6 },
  { shape: 'plus', x: '3%', y: '70%', size: 32, color: 'var(--mint)', speed: 0.8 },
]

function GpaRing({ gpa }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div className="gpa" ref={ref}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="48" fill="none" stroke="var(--ink)" strokeWidth="18" />
        <circle cx="60" cy="60" r="48" fill="none" stroke="#fff" strokeWidth="11" />
        <g transform="rotate(-90 60 60)">
          <motion.circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="var(--orange)"
            strokeWidth="11"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: gpa / 4 } : {}}
            transition={{ duration: 1.6, ease: easeOut }}
          />
        </g>
      </svg>
      <p className="gpa__value">
        <Counter value={gpa} decimals={2} />
        <span>/ 4.00 GPA</span>
      </p>
    </div>
  )
}

/** Share of the study period elapsed, computed from today's date. */
function useStudyProgress(start, end) {
  return useMemo(() => {
    const s = new Date(start).getTime()
    const e = new Date(end).getTime()
    const now = Date.now()
    const pct = Math.min(100, Math.max(0, ((now - s) / (e - s)) * 100))
    const status = now < s ? 'Upcoming' : now > e ? 'Completed' : 'In progress'
    return { pct: Math.round(pct), status }
  }, [start, end])
}

function StudyProgress({ start, end }) {
  const { pct, status } = useStudyProgress(start, end)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div className="study" ref={ref}>
      <p className="study__status">
        <span className="pulse" /> {status}
      </p>
      <div
        className="study__track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Study period elapsed"
      >
        <motion.div
          className="study__fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: pct / 100 } : {}}
          transition={{ duration: 1.3, ease: easeOut }}
        />
      </div>
      <p className="study__pct mono">{pct}% of the study period elapsed</p>
    </div>
  )
}

const confettiShapes = ['box', 'hex', 'sparkle', 'tri', 'ring', 'plus']
const confettiColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--docker)', 'var(--ai)', 'var(--orange)']

function Confetti({ burst }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2 + (burst % 3) * 0.3
        const d = 110 + ((i * 37 + burst * 13) % 70)
        return { x: Math.cos(a) * d, y: Math.sin(a) * d - 40, r: (i % 2 ? 1 : -1) * (180 + i * 20), s: shapeMap[confettiShapes[i % 6]], c: confettiColors[i % 6] }
      }),
    [burst],
  )
  if (!burst) return null
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => {
        const S = p.s
        return (
          <motion.span
            key={`${burst}-${i}`}
            initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
            animate={{ x: p.x, y: p.y, scale: 1, rotate: p.r, opacity: 0 }}
            transition={{ duration: 1.1, ease: easeOut }}
          >
            <S size={22} color={p.c} />
          </motion.span>
        )
      })}
    </div>
  )
}

export default function Education() {
  const [uni, binus] = education
  const award = awards[0]
  const [burst, setBurst] = useState(0)

  return (
    <section id="education" className="section edu">
      <FloatingShapes items={shapes} />
      <SectionHeading index="05" kicker="education & awards" color="var(--orange)">
        Always <Scribble color="var(--orange)" after=".">learning</Scribble>
      </SectionHeading>

      <div className="edu-grid">
        <motion.article
          className="edu-card card"
          initial="rest"
          whileInView="show"
          whileHover="hover"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ rest: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 }, hover: { y: -6 } }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          <motion.span
            className="edu-card__cap"
            aria-hidden="true"
            variants={{ hover: { y: -40, rotate: 360, transition: { duration: 0.8 } } }}
          >
            <GradCap size={96} />
          </motion.span>
          <p className="edu-card__period mono">{uni.period}</p>
          <h3>{uni.school}</h3>
          <p className="edu-card__degree">{uni.degree}</p>
          <p className="edu-card__detail">{uni.detail}</p>
          <GpaRing gpa={uni.gpa} />
          <div className="edu-card__thesis">
            <span className="mono">thesis</span>
            <p>{uni.thesis}</p>
          </div>
        </motion.article>

        <motion.article
          className="edu-card card edu-card--alt"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 }}
        >
          <p className="edu-card__period mono">{binus.period}</p>
          <h3>{binus.school}</h3>
          <p className="edu-card__degree">{binus.degree}</p>
          <p className="edu-card__detail">{binus.detail}</p>
          <StudyProgress start={binus.start} end={binus.end} />
        </motion.article>

        <motion.article
          className="award card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.15 }}
        >
          <div className="award__trophy">
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Trophy size={110} />
            </motion.span>
            <Confetti burst={burst} />
          </div>
          <div>
            <p className="award__kicker mono">award · {award.year}</p>
            <h3 className="award__title">{award.title}</h3>
            <button type="button" className="btn btn--sm btn--pink" onClick={() => setBurst((b) => b + 1)}>
              Celebrate 🎉
            </button>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
