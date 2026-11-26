import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { scrollTo } from '../lib/smooth-scroll.js'

export const easeOut = [0.22, 1, 0.36, 1]
export const spring = { type: 'spring', stiffness: 260, damping: 18 }
/** Hero animations wait for the preloader wipe to clear. */
export const INTRO_DELAY = 0.55

export function Reveal({ children, delay = 0, y = 40, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Counter({ value, decimals = 0, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState((0).toFixed(decimals))
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration, ease: easeOut, onUpdate: (v) => setN(v.toFixed(decimals)) })
    return () => c.stop()
  }, [inView, value, decimals, duration])
  return (
    <span ref={ref} className="counter">
      {n}
      {suffix}
    </span>
  )
}

export function onAnchorClick(e, href, after) {
  e.preventDefault()
  after?.()
  scrollTo(href)
  history.replaceState(null, '', href)
}

/** In-page link that uses Lenis smooth scrolling. */
export function Anchor({ href, children, onClick, ...rest }) {
  return (
    <a href={href} onClick={(e) => onAnchorClick(e, href, onClick)} {...rest}>
      {children}
    </a>
  )
}

/** Hand-drawn marker underline that draws itself on view. */
export function Scribble({ children, color = 'var(--yellow)', after = '' }) {
  return (
    <span className="scribble-wrap">
      <ScribbleMark color={color}>{children}</ScribbleMark>
      {after}
    </span>
  )
}

function ScribbleMark({ children, color }) {
  return (
    <span className="scribble">
      <span className="scribble__text">{children}</span>
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <motion.path
          d="M3 13 C 40 4, 80 18, 120 9 S 180 6, 197 12"
          stroke={color}
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35, ease: 'easeInOut' }}
        />
      </svg>
    </span>
  )
}

export function SectionHeading({ index, kicker, children, color = 'var(--yellow)', center = false }) {
  return (
    <header className={`sh ${center ? 'sh--center' : ''}`}>
      <Reveal y={16}>
        <span className="sh__kicker" style={{ '--c': color }}>
          <span className="sh__idx">{index}</span>
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08} as="h2" className="sh__title">
        {children}
      </Reveal>
    </header>
  )
}
