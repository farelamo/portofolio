import { motion } from 'framer-motion'

const pts = (r, n = 7) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((-90 + (i * 360) / n) * Math.PI) / 180
    return [Math.cos(a) * r, Math.sin(a) * r]
  })

const HEPT = pts(90)
  .map((p) => p.map((v) => v.toFixed(1)).join(','))
  .join(' ')
const SPOKES = pts(62)

/** Kubernetes-style helm wheel. `spin` = seconds per rotation (0 = static). */
export default function Helm({ size = 120, spin = 12, color = 'var(--k8s)', className = '', style, ...rest }) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      className={className}
      style={{ overflow: 'visible', ...style }}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <polygon points={HEPT} fill={color} stroke="var(--ink)" strokeWidth="7" strokeLinejoin="round" />
      <motion.g
        animate={spin ? { rotate: 360 } : undefined}
        transition={spin ? { duration: spin, repeat: Infinity, ease: 'linear' } : undefined}
      >
        {/* invisible circle keeps the group's bbox centred so it spins in place */}
        <circle r="66" fill="none" stroke="none" />
        <circle r="42" fill="none" stroke="#fff" strokeWidth="11" />
        {SPOKES.map(([x, y], i) => (
          <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="#fff" strokeWidth="11" strokeLinecap="round" />
        ))}
        <circle r="14" fill="#fff" />
      </motion.g>
    </svg>
  )
}
