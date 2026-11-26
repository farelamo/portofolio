import Lenis from 'lenis'

let lenis = null

/** Start Lenis smooth scrolling (skipped when the user prefers reduced motion). */
export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
  let raf = requestAnimationFrame(function loop(time) {
    lenis.raf(time)
    raf = requestAnimationFrame(loop)
  })
  return () => {
    cancelAnimationFrame(raf)
    lenis.destroy()
    lenis = null
  }
}

/** Smooth-scroll to a selector or number; falls back to native scrolling. */
export function scrollTo(target) {
  if (lenis) {
    // force: allow scrolling even while a menu has Lenis stopped
    lenis.scrollTo(target, { offset: 0, duration: 1.4, force: true })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target })
  else document.querySelector(target)?.scrollIntoView()
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
