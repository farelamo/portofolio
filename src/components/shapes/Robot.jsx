import { useRef } from 'react'
import { motion } from 'framer-motion'
import { usePointerLook } from '../../lib/hooks.js'

const INK = 'var(--ink)'

/** Friendly AI agent robot with a blinking face screen that looks at the pointer. */
export default function Robot({ size = 160, track = true, className = '', style, ...rest }) {
  const ref = useRef(null)
  const [px, py] = usePointerLook(ref, { max: 7, anchorY: 0.45, enabled: track })

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 215"
      width={size}
      height={(size * 215) / 200}
      className={className}
      style={{ overflow: 'visible', ...style }}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g stroke={INK} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M100 44V24" />
        <motion.circle
          cx="100"
          cy="16"
          r="10"
          fill="var(--pink)"
          strokeWidth="4"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <rect x="12" y="80" width="20" height="42" rx="8" fill="var(--yellow)" strokeWidth="4" />
        <rect x="168" y="80" width="20" height="42" rx="8" fill="var(--yellow)" strokeWidth="4" />
        <rect x="88" y="150" width="24" height="16" fill={INK} />
        <rect x="58" y="162" width="84" height="46" rx="16" fill="var(--ai)" />
        <motion.circle
          cx="100"
          cy="185"
          r="8"
          fill="var(--mint)"
          strokeWidth="3"
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <rect x="28" y="42" width="144" height="112" rx="36" fill="var(--ai)" />
        <rect x="46" y="62" width="108" height="72" rx="24" fill={INK} stroke="none" />
        <motion.g style={{ x: px, y: py }}>
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ duration: 3.4, times: [0, 0.88, 0.94, 1], repeat: Infinity }}
          >
            <rect x="66" y="80" width="20" height="26" rx="10" fill="var(--mint)" stroke="none" />
            <rect x="114" y="80" width="20" height="26" rx="10" fill="var(--mint)" stroke="none" />
          </motion.g>
          <path d="M88 118 Q100 126 112 118" stroke="var(--mint)" strokeWidth="4" fill="none" />
        </motion.g>
      </g>
    </svg>
  )
}
