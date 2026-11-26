import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skills } from '../data/resume.js'
import { SectionHeading, Scribble } from './motion.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import Helm from './shapes/Helm.jsx'

const filters = ['All', ...skills.map((g) => g.group)]

const shapes = [
  { shape: 'box', x: '94%', y: '12%', size: 44, color: 'var(--yellow)', speed: 0.7 },
  { shape: 'gear', x: '1%', y: '52%', size: 54, color: 'var(--docker)', speed: 0.5, spin: true, hideSm: true },
  { shape: 'sparkle', x: '90%', y: '88%', size: 38, color: 'var(--pink)', speed: 0.9, spin: true },
]

/** Skills as a mini cluster: each group is a node, each tool a container that drops in. */
export default function Skills() {
  const [filter, setFilter] = useState('All')
  const groups = filter === 'All' ? skills : skills.filter((g) => g.group === filter)
  const pods = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <section id="skills" className="section skills">
      <FloatingShapes items={shapes} />
      <SectionHeading index="04" kicker="skills" color="var(--ai)">
        My toolbox, <Scribble color="var(--ai)" after=".">containerized</Scribble>
      </SectionHeading>

      <div className="filters" role="group" aria-label="Filter skills by group">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`filter ${filter === f ? 'is-active' : ''}`}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {filter === f && (
              <motion.span layoutId="filter-bg" className="filter__bg" transition={{ type: 'spring', stiffness: 420, damping: 30 }} />
            )}
            <span className="filter__label">{f}</span>
          </button>
        ))}
      </div>
      <p className="skills__count mono" aria-live="polite">
        <span className="pulse" /> {pods} pods running on {groups.length} node{groups.length > 1 ? 's' : ''}
      </p>

      <motion.div className={`nodes ${filter !== 'All' ? 'nodes--single' : ''}`} layout>
        <AnimatePresence mode="popLayout">
          {groups.map((g) => (
            <motion.article
              key={g.group}
              layout
              className="node card"
              style={{ '--c': g.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
              <header className="node__head">
                <Helm size={36} spin={9} color={g.color} />
                <h3 className="mono">node/{g.group.toLowerCase()}</h3>
                <span className="node__count mono">{g.items.length} pods</span>
              </header>
              <motion.ul
                className="node__pods"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              >
                {g.items.map((s, i) => (
                  <motion.li
                    key={s}
                    className="pod"
                    variants={{
                      hidden: { y: -50, opacity: 0, rotate: -12 },
                      show: { y: 0, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 380, damping: 15 } },
                    }}
                    whileHover={{ y: -6, rotate: i % 2 ? 4 : -4, transition: { type: 'spring', stiffness: 500, damping: 12 } }}
                  >
                    {s}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
