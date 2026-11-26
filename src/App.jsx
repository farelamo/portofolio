import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { lockScroll, startSmoothScroll } from './lib/smooth-scroll.js'
import Preloader from './components/Preloader.jsx'
import TopBar from './components/TopBar.jsx'
import Dock from './components/Dock.jsx'
import Hero from './components/Hero.jsx'
import StackMarquee from './components/StackMarquee.jsx'
import About from './components/About.jsx'
import Highlights from './components/Highlights.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    return startSmoothScroll()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    lockScroll(loading)
  }, [loading])

  return (
    <>
      <AnimatePresence>{loading && <Preloader key="pre" onDone={done} />}</AnimatePresence>

      {!loading && (
        <>
          <TopBar />
          <Dock />
          <main id="main">
            <Hero />
            <StackMarquee />
            <About />
            <Highlights />
            <Experience />
            <Skills />
            <Education />
          </main>
          <Contact />
        </>
      )}
    </>
  )
}
