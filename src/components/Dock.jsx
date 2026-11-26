import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Icon from './Icon.jsx'
import { onAnchorClick } from './motion.jsx'
import { useMediaQuery } from '../lib/hooks.js'

const items = [
  { id: 'home', label: 'Home', icon: 'home', c: 'var(--yellow)' },
  { id: 'about', label: 'About', icon: 'user', c: 'var(--mint)' },
  { id: 'impact', label: 'Impact', icon: 'zap', c: 'var(--pink)' },
  { id: 'experience', label: 'Experience', icon: 'work', c: 'var(--gopher)' },
  { id: 'skills', label: 'Skills', icon: 'layers', c: 'var(--ai)' },
  { id: 'education', label: 'Education', icon: 'cap', c: 'var(--orange)' },
  { id: 'contact', label: 'Contact', icon: 'mail', c: 'var(--yellow)' },
]

/** macOS-style magnifying dock item */
function DockItem({ item, mouseX, active, base, max }) {
  const ref = useRef(null)
  const dist = useTransform(mouseX, (v) => {
    const r = ref.current?.getBoundingClientRect()
    return r ? v - r.left - r.width / 2 : Infinity
  })
  const sizeT = useTransform(dist, [-130, 0, 130], [base, max, base])
  const size = useSpring(sizeT, { mass: 0.1, stiffness: 180, damping: 13 })
  const href = `#${item.id}`

  return (
    <li>
      <motion.a
        ref={ref}
        href={href}
        className="dock__item"
        style={{ width: size, height: size, '--c': item.c }}
        aria-current={active ? 'true' : undefined}
        onClick={(e) => onAnchorClick(e, href)}
        whileTap={{ scale: 0.85 }}
      >
        {active && (
          <motion.span
            layoutId="dock-active"
            className="dock__active"
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          />
        )}
        <Icon name={item.icon} />
        <span className="dock__tip">{item.label}</span>
      </motion.a>
    </li>
  )
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity)
  const [active, setActive] = useState('home')
  const small = useMediaQuery('(max-width: 560px)')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <div className="dock-wrap">
      <motion.nav
        className="dock"
        aria-label="Sections"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.9 }}
      >
        <ul>
          {items.map((it) => (
            <DockItem
              key={it.id}
              item={it}
              mouseX={mouseX}
              active={active === it.id}
              base={small ? 40 : 46}
              max={small ? 40 : 68}
            />
          ))}
        </ul>
      </motion.nav>
    </div>
  )
}
