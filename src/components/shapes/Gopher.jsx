import { useRef } from 'react'
import { motion } from 'framer-motion'
import { usePointerLook } from '../../lib/hooks.js'

const INK = 'var(--ink)'
const blink = {
  animate: { scaleY: [1, 1, 0.1, 1] },
  transition: { duration: 4, times: [0, 0.9, 0.95, 1], repeat: Infinity },
}

/** Original gopher-style mascot. Pupils follow the pointer, eyes blink, right arm can wave. */
export default function Gopher({ size = 180, wave = false, track = true, className = '', style, ...rest }) {
  const ref = useRef(null)
  const [px, py] = usePointerLook(ref, { max: 9, anchorY: 0.36, enabled: track })

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 250"
      width={size}
      height={size * 1.25}
      className={className}
      style={{ overflow: 'visible', ...style }}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="66" cy="238" rx="22" ry="9" fill="var(--tan)" />
        <ellipse cx="134" cy="238" rx="22" ry="9" fill="var(--tan)" />
        <circle cx="44" cy="50" r="17" fill="var(--gopher)" />
        <circle cx="156" cy="50" r="17" fill="var(--gopher)" />
        <rect x="26" y="28" width="148" height="210" rx="74" fill="var(--gopher)" />
        <ellipse cx="100" cy="184" rx="50" ry="44" fill="#fff" fillOpacity="0.35" stroke="none" />
        <ellipse cx="28" cy="156" rx="11" ry="22" fill="var(--tan)" transform="rotate(18 28 156)" />
        <motion.ellipse
          cx="172"
          cy="156"
          rx="11"
          ry="22"
          fill="var(--tan)"
          style={{ originX: 0.5, originY: 0 }}
          initial={{ rotate: -18 }}
          animate={wave ? { rotate: [-150, -115, -160, -115, -150] } : { rotate: -18 }}
          transition={wave ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 }}
        />
        {[68, 132].map((cx) => (
          <motion.g key={cx} {...blink}>
            <circle cx={cx} cy="94" r="27" fill="#fff" />
            <motion.g style={{ x: px, y: py }}>
              <circle cx={cx + (cx < 100 ? 4 : -4)} cy="96" r="11" fill={INK} stroke="none" />
              <circle cx={cx + (cx < 100 ? 8 : 0)} cy="91" r="3.5" fill="#fff" stroke="none" />
            </motion.g>
          </motion.g>
        ))}
        <rect x="92" y="140" width="16" height="18" rx="3" fill="#fff" strokeWidth="3" />
        <path d="M100 142v15" strokeWidth="2.5" />
        <ellipse cx="100" cy="134" rx="23" ry="15" fill="var(--tan)" />
        <ellipse cx="100" cy="126" rx="9" ry="6" fill={INK} stroke="none" />
        <ellipse cx="50" cy="138" rx="10" ry="6" fill="var(--pink)" fillOpacity=".55" stroke="none" />
        <ellipse cx="150" cy="138" rx="10" ry="6" fill="var(--pink)" fillOpacity=".55" stroke="none" />
      </g>
    </svg>
  )
}
