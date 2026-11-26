import { motion } from 'framer-motion'
import Helm from './Helm.jsx'

const INK = 'var(--ink)'
const svgProps = { 'aria-hidden': 'true', focusable: 'false', style: { overflow: 'visible' } }

const poly = (n, r, start = -90) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((start + (i * 360) / n) * Math.PI) / 180
    return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`
  }).join(' ')

function gearPoints(n = 10, ro = 44, ri = 34) {
  const step = (Math.PI * 2) / n
  const out = []
  for (let i = 0; i < n; i++) {
    const a = i * step
    for (const [f, r] of [[0, ri], [0.12, ro], [0.45, ro], [0.57, ri]]) {
      out.push(`${(Math.cos(a + step * f) * r).toFixed(1)},${(Math.sin(a + step * f) * r).toFixed(1)}`)
    }
  }
  return out.join(' ')
}
const GEAR = gearPoints()

/** Shipping container / Docker box */
export function Box({ size = 48, color = 'var(--docker)', className }) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} className={className} {...svgProps}>
      <rect x="3" y="3" width="38" height="38" rx="7" fill={color} stroke={INK} strokeWidth="3" />
      <path d="M15 11v22M22 11v22M29 11v22" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeOpacity=".35" />
    </svg>
  )
}

/** Hexagon, reads as a Kubernetes pod */
export function Hex({ size = 48, color = 'var(--mint)', className }) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} className={className} {...svgProps}>
      <polygon points={poly(6, 44)} fill={color} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      <polygon points={poly(6, 18)} fill="none" stroke={INK} strokeWidth="5" strokeOpacity=".35" strokeLinejoin="round" />
    </svg>
  )
}

export function Sparkle({ size = 40, color = 'var(--yellow)', className }) {
  return (
    <svg viewBox="-26 -26 52 52" width={size} height={size} className={className} {...svgProps}>
      <path
        d="M0 -22 C3 -6 6 -3 22 0 C6 3 3 6 0 22 C-3 6 -6 3 -22 0 C-6 -3 -3 -6 0 -22Z"
        fill={color}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Gear({ size = 56, color = 'var(--mint)', className }) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} className={className} {...svgProps}>
      <polygon points={GEAR} fill={color} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <circle r="13" fill="var(--bg)" stroke={INK} strokeWidth="5" />
    </svg>
  )
}

export function Cloud({ size = 90, color = '#fff', className }) {
  return (
    <svg viewBox="0 0 124 80" width={size} height={(size * 80) / 124} className={className} {...svgProps}>
      <path
        d="M30 70 C13 70 6 54 16 43 C11 27 29 16 42 24 C48 7 77 5 85 24 C99 19 114 31 108 46 C119 52 114 70 100 70 Z"
        fill={color}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Squiggle({ size = 100, color = 'var(--pink)', className }) {
  return (
    <svg viewBox="0 0 124 28" width={size} height={(size * 28) / 124} className={className} {...svgProps}>
      <path d="M6 14 q14 -14 28 0 t28 0 t28 0 t28 0" fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" />
      <path d="M6 14 q14 -14 28 0 t28 0 t28 0 t28 0" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export function Ring({ size = 44, color = 'var(--yellow)', className }) {
  return (
    <svg viewBox="-30 -30 60 60" width={size} height={size} className={className} {...svgProps}>
      <circle r="21" fill="none" stroke={INK} strokeWidth="14" />
      <circle r="21" fill="none" stroke={color} strokeWidth="7" />
    </svg>
  )
}

export function Plus({ size = 34, color = 'var(--docker)', className }) {
  return (
    <svg viewBox="-20 -20 40 40" width={size} height={size} className={className} {...svgProps}>
      <path d="M0 -13V13M-13 0H13" stroke={INK} strokeWidth="12" strokeLinecap="round" />
      <path d="M0 -13V13M-13 0H13" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  )
}

export function Tri({ size = 44, color = 'var(--orange)', className }) {
  return (
    <svg viewBox="-30 -30 60 60" width={size} height={size} className={className} {...svgProps}>
      <polygon points="0,-22 21,16 -21,16" fill={color} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  )
}

export function GradCap({ size = 110, className }) {
  return (
    <svg viewBox="0 0 120 96" width={size} height={(size * 96) / 120} className={className} {...svgProps}>
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M30 42 V62 C30 72 90 72 90 62 V42" fill="var(--ink-2)" />
        <polygon points="60,12 114,34 60,56 6,34" fill="var(--ink)" />
        <path d="M44 30 L60 24" stroke="#fff" strokeOpacity=".5" />
        <motion.g
          style={{ originX: 0, originY: 0 }}
          animate={{ rotate: [0, 10, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M60 34 L100 42 V66" fill="none" stroke="var(--yellow)" strokeWidth="4" />
          <rect x="94" y="64" width="12" height="16" rx="3" fill="var(--yellow)" />
        </motion.g>
        <circle cx="60" cy="34" r="5" fill="var(--yellow)" />
      </g>
    </svg>
  )
}

export function Trophy({ size = 120, className }) {
  return (
    <svg viewBox="0 0 120 124" width={size} height={(size * 124) / 120} className={className} {...svgProps}>
      <g stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M32 28 H16 C12 48 22 60 36 62" fill="none" />
        <path d="M88 28 H104 C108 48 98 60 84 62" fill="none" />
        <path d="M30 18 H90 V44 C90 68 76 82 60 82 C44 82 30 68 30 44 Z" fill="var(--yellow)" />
        <rect x="52" y="82" width="16" height="16" fill="var(--orange)" />
        <rect x="34" y="98" width="52" height="16" rx="5" fill="var(--ink-2)" />
        <path d="M60 32 l5 10 11 1.5 -8 7.5 2 11 -10 -5.5 -10 5.5 2 -11 -8 -7.5 11 -1.5 Z" fill="#fff" strokeWidth="3" />
      </g>
    </svg>
  )
}

/** Registry used by FloatingShapes */
export const shapeMap = {
  box: Box,
  hex: Hex,
  sparkle: Sparkle,
  gear: Gear,
  cloud: Cloud,
  squiggle: Squiggle,
  ring: Ring,
  plus: Plus,
  tri: Tri,
  helm: ({ size, color }) => <Helm size={size} color={color} spin={0} />,
}
