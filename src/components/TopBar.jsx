import { motion, useScroll, useSpring } from 'framer-motion'
import Helm from './shapes/Helm.jsx'
import { Anchor, easeOut } from './motion.jsx'

export default function TopBar() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="progress" aria-hidden="true">
        <motion.div className="progress__fill" style={{ scaleX: progress }} />
      </div>
      <motion.header
        className="topbar"
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.7 }}
      >
        <Anchor href="#home" className="logo" aria-label="Fariz, back to top">
          <span className="logo__mark">
            <Helm size={30} spin={0} />
          </span>
          <span>
            fariz<b>.go</b>
          </span>
        </Anchor>
        <p className="topbar__status mono">
          <span className="pulse" /> DevOps Engineer @ PT POSe.id
        </p>
        <Anchor href="#contact" className="btn btn--sm btn--yellow topbar__cta">
          Let’s talk
        </Anchor>
      </motion.header>
    </>
  )
}
