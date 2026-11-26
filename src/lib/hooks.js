import { useEffect, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useMediaQuery(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatch(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return match
}

/**
 * Spring x/y offsets (in SVG user units, up to `max`) pointing from the
 * element toward the pointer. Used for mascot eyes that follow the cursor.
 */
export function usePointerLook(ref, { max = 8, anchorY = 0.5, enabled = true } = {}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 20 })
  const sy = useSpring(y, { stiffness: 220, damping: 20 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height * anchorY)
      const d = Math.hypot(dx, dy) || 1
      const k = Math.min(d / 180, 1) * max
      x.set((dx / d) * k)
      y.set((dy / d) * k)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [ref, max, anchorY, enabled, x, y])

  return [sx, sy]
}
