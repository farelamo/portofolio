import { useId } from 'react'
import { motion } from 'framer-motion'

const INK = 'var(--ink)'
// [x, y, color] for each container on the whale's back
const BOXES = [
  [44, 58, 'var(--docker)'],
  [80, 58, 'var(--yellow)'],
  [116, 58, 'var(--docker)'],
  [152, 58, 'var(--pink)'],
  [80, 22, 'var(--mint)'],
  [116, 22, 'var(--docker)'],
  [116, -14, 'var(--orange)'],
]
const WAVE = 'M-40 180' + ' q10 -8 20 0 t20 0'.repeat(8)

/** Docker-style whale carrying containers. `build` drops the containers in one by one. */
export default function Whale({
  width = 240,
  build = false,
  delay = 0,
  spout = false,
  waves = false,
  bob = true,
  className = '',
  style,
  ...rest
}) {
  const clip = useId()
  return (
    <svg
      viewBox="0 -30 270 220"
      width={width}
      height={(width * 220) / 270}
      className={className}
      style={{ overflow: 'visible', ...style }}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <motion.g
        animate={bob ? { y: [0, -5, 0] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <g stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <motion.path
            d="M206 110 C224 102 230 86 234 68 C242 80 254 82 264 78 C256 94 242 112 214 126 Z"
            fill="var(--docker)"
            style={{ originX: 0, originY: 1 }}
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path d="M16 92 H218 C218 138 176 166 118 166 C58 166 16 138 16 92 Z" fill="var(--docker)" />
          <path d="M44 146 Q118 178 196 126" stroke="#fff" strokeOpacity=".4" strokeWidth="6" fill="none" />
          <circle cx="56" cy="118" r="7" fill="#fff" strokeWidth="3" />
          <circle cx="57" cy="119" r="3.5" fill={INK} stroke="none" />
          <path d="M38 134 Q54 146 72 136" fill="none" strokeWidth="3.5" />
          <ellipse cx="84" cy="132" rx="8" ry="4.5" fill="var(--pink)" fillOpacity=".7" stroke="none" />
          {BOXES.map(([x, y, c], i) => (
            <motion.g
              key={i}
              initial={build ? { y: -260, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 15, delay: delay + i * 0.08 }}
            >
              <rect x={x} y={y} width="32" height="32" rx="5" fill={c} strokeWidth="3.5" />
              <path d={`M${x + 11} ${y + 8}v16M${x + 21} ${y + 8}v16`} strokeWidth="2.5" strokeOpacity=".4" />
            </motion.g>
          ))}
        </g>
        {spout &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={28 + i * 6}
              cy="84"
              r={4 + (i % 2)}
              fill="var(--gopher)"
              stroke={INK}
              strokeWidth="2.5"
              animate={{ y: [0, -44 - i * 6], x: [0, (i - 1) * 14], opacity: [0, 1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25, ease: 'easeOut' }}
            />
          ))}
      </motion.g>
      {waves && (
        <>
          <defs>
            <clipPath id={clip}>
              <rect x="-10" y="160" width="290" height="40" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clip})`}>
            <motion.path
              d={WAVE}
              fill="none"
              stroke="var(--docker)"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ x: [-40, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            />
          </g>
        </>
      )}
    </svg>
  )
}
