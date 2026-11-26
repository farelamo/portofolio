import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { shapeMap } from './shapes/Shapes.jsx'

function Floater({ shape, x, y, size = 48, color, speed = 0.5, rotate = 0, spin = false, hideSm, progress, index }) {
  const Shape = shapeMap[shape]
  // parallax: each shape drifts at its own speed while the section scrolls by
  const py = useTransform(progress, [0, 1], [speed * 140, -speed * 140])
  const r = useTransform(progress, [0, 1], [rotate - 40 * speed, rotate + 40 * speed])
  return (
    <motion.div className={`floater ${hideSm ? 'floater--hide-sm' : ''}`} style={{ left: x, top: y, y: py, rotate: r }}>
      <motion.div
        animate={{ y: [0, -14, 0], rotate: spin ? 360 : [0, 8, 0] }}
        transition={{
          y: { duration: 4 + (index % 4), repeat: Infinity, ease: 'easeInOut' },
          rotate: spin
            ? { duration: 16, repeat: Infinity, ease: 'linear' }
            : { duration: 5 + (index % 3), repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <Shape size={size} color={color} />
      </motion.div>
    </motion.div>
  )
}

/** Decorative parallax shapes scattered behind a section's content. */
export default function FloatingShapes({ items }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return (
    <div ref={ref} className="floaters" aria-hidden="true">
      {items.map((it, i) => (
        <Floater key={i} {...it} index={i} progress={scrollYProgress} />
      ))}
    </div>
  )
}
