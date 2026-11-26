import { motion, useReducedMotion } from 'framer-motion'
import { highlights } from '../data/resume.js'
import { SectionHeading, Scribble } from './motion.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import Helm from './shapes/Helm.jsx'
import Robot from './shapes/Robot.jsx'
import { Cloud } from './shapes/Shapes.jsx'

const INK = 'var(--ink)'

/** A dot that travels along a path (SVG animateMotion), hidden for reduced motion. */
function Packet({ path, dur = 2, begin = 0, color = 'var(--yellow)', still }) {
  if (still) return null
  return (
    <circle r="6" fill={color} stroke={INK} strokeWidth="2.5">
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  )
}

function GitOpsArt({ still }) {
  const flow = 'M44 85 H236'
  return (
    <svg viewBox="0 0 320 170" className="art" aria-hidden="true">
      <g stroke={INK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M30 40 V130" />
        <path d="M44 85 H130 M190 85 H240" className="flow" />
      </g>
      {[50, 85, 120].map((y, i) => (
        <circle key={y} cx="30" cy={y} r="10" fill={i === 1 ? 'var(--orange)' : '#fff'} stroke={INK} strokeWidth="3.5" />
      ))}
      <circle cx="160" cy="85" r="30" fill="#fff" stroke={INK} strokeWidth="3.5" />
      <g className="spin" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round">
        <path d="M142 74 A21 21 0 0 1 178 76" />
        <path d="M178 96 A21 21 0 0 1 142 94" />
        <path d="M172 68 L179 77 L168 79" />
        <path d="M148 102 L141 93 L152 91" />
      </g>
      <Helm x="232" y="42" size={86} spin={8} />
      <Packet path={flow} still={still} />
      <Packet path={flow} begin={1} color="var(--mint)" still={still} />
      <text x="30" y="156">git push</text>
      <text x="160" y="140">argocd sync</text>
      <text x="275" y="148">cluster</text>
      <text x="160" y="30">jenkins · vault</text>
    </svg>
  )
}

const tools = [
  { x: 10, y: 16, w: 100, l: 'Prometheus', c: 'var(--orange)' },
  { x: 210, y: 16, w: 100, l: 'Grafana', c: 'var(--yellow)' },
  { x: 10, y: 124, w: 100, l: 'ELK APM', c: 'var(--mint)' },
  { x: 210, y: 124, w: 100, l: 'Uptime Kuma', c: 'var(--pink)' },
]

function AgentArt({ still }) {
  return (
    <svg viewBox="0 0 320 170" className="art" aria-hidden="true">
      {tools.map((t) => {
        const cx = t.x + t.w / 2
        const cy = t.y + 15
        const path = `M${cx} ${cy} L160 85`
        return (
          <g key={t.l}>
            <path d={path} stroke={INK} strokeWidth="3" className="flow" fill="none" />
            <Packet path={path} dur={1.6} begin={t.x / 200} color={t.c} still={still} />
          </g>
        )
      })}
      {tools.map((t) => (
        <g key={`${t.l}-chip`}>
          <rect x={t.x} y={t.y} width={t.w} height="30" rx="15" fill={t.c} stroke={INK} strokeWidth="3" />
          <text x={t.x + t.w / 2} y={t.y + 19}>
            {t.l}
          </text>
        </g>
      ))}
      <Robot x="122" y="44" size={76} />
      <motion.g
        animate={still ? undefined : { scale: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: 0.6 }}
      >
        <rect x="196" y="66" width="62" height="26" rx="13" fill="#fff" stroke={INK} strokeWidth="3" />
        <text x="227" y="83">RCA ✓</text>
      </motion.g>
    </svg>
  )
}

function Lock({ x, y }) {
  return (
    <g transform={`translate(${x - 9} ${y - 10})`} stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
      <path d="M4 9 V6 a5 5 0 0 1 10 0 V9" fill="none" />
      <rect x="0" y="8" width="18" height="13" rx="3" fill="var(--yellow)" />
    </g>
  )
}

function CloudArt({ still }) {
  const aws = [75, 50]
  const gcp = [245, 50]
  const ali = [160, 128]
  const line = (a, b) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`
  const lines = [line(aws, gcp), line(aws, ali), line(gcp, ali)]
  return (
    <svg viewBox="0 0 320 170" className="art" aria-hidden="true">
      {lines.map((d) => (
        <path key={d} d={d} stroke={INK} strokeWidth="3" className="flow flow--dash" fill="none" />
      ))}
      <Packet path={lines[0]} dur={2.2} still={still} color="var(--mint)" />
      <Packet path={lines[1]} dur={1.8} begin={0.5} still={still} color="var(--pink)" />
      <Packet path={lines[2]} dur={2} begin={1} still={still} />
      <Cloud x="20" y="15" size={110} color="var(--yellow)" />
      <Cloud x="190" y="15" size={110} color="var(--docker)" />
      <Cloud x="105" y="93" size={110} color="var(--pink)" />
      <text x="75" y="58" className="art__strong">AWS</text>
      <text x="245" y="58" className="art__strong">GCP</text>
      <text x="160" y="136" className="art__strong">Alibaba</text>
      <Lock x={160} y={50} />
      <Lock x={117} y={90} />
      <Lock x={203} y={90} />
    </svg>
  )
}

function Cylinder({ x, y, color, label }) {
  return (
    <g stroke={INK} strokeWidth="3">
      <path d={`M${x} ${y + 8} v30 a26 8 0 0 0 52 0 v-30`} fill={color} />
      <ellipse cx={x + 26} cy={y + 8} rx="26" ry="8" fill={color} />
      <text x={x + 26} y={y + 60} stroke="none">
        {label}
      </text>
    </g>
  )
}

function CdcArt({ still }) {
  const p1 = 'M72 40 C92 40 92 78 112 78 H262'
  const p2 = 'M72 112 C92 112 92 92 112 92 H262'
  return (
    <svg viewBox="0 0 320 170" className="art" aria-hidden="true">
      <path d={p1} stroke={INK} strokeWidth="3" fill="none" className="flow" />
      <path d={p2} stroke={INK} strokeWidth="3" fill="none" className="flow" />
      <Packet path={p1} dur={2} still={still} color="var(--orange)" />
      <Packet path={p2} dur={2} begin={0.8} still={still} color="var(--docker)" />
      <Cylinder x={18} y={18} color="var(--orange)" label="MariaDB" />
      <Cylinder x={18} y={90} color="var(--docker)" label="Postgres" />
      <rect x="110" y="60" width="62" height="50" rx="12" fill="var(--ai)" stroke={INK} strokeWidth="3" />
      <text x="141" y="89">debezium</text>
      <rect x="192" y="60" width="52" height="50" rx="12" fill="var(--mint)" stroke={INK} strokeWidth="3" />
      {[72, 84, 96].map((y) => (
        <path key={y} d={`M202 ${y} H234`} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      ))}
      <text x="218" y="128">kafka</text>
      <rect x="260" y="40" width="52" height="84" rx="10" fill="#fff" stroke={INK} strokeWidth="3" />
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={268 + i * 14}
          width="10"
          rx="2"
          fill={['var(--pink)', 'var(--yellow)', 'var(--docker)'][i]}
          stroke={INK}
          strokeWidth="2"
          y={60}
          height={56}
          style={{ originY: 1 }}
          animate={still ? undefined : { scaleY: [0.3, 1, 0.5, 0.8, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}
      <text x="286" y="142">ELK</text>
    </svg>
  )
}

const arts = { gitops: GitOpsArt, agent: AgentArt, cloud: CloudArt, cdc: CdcArt }

const shapes = [
  { shape: 'cloud', x: '84%', y: '4%', size: 100, color: '#fff', speed: 0.4 },
  { shape: 'plus', x: '1.5%', y: '26%', size: 34, color: 'var(--pink)', speed: 0.8 },
  { shape: 'ring', x: '48%', y: '50%', size: 40, color: 'var(--docker)', speed: 0.6, hideSm: true },
  { shape: 'tri', x: '92%', y: '80%', size: 42, color: 'var(--mint)', speed: 0.7, hideSm: true },
]

export default function Highlights() {
  const reduced = useReducedMotion()
  return (
    <section id="impact" className="section impact">
      <FloatingShapes items={shapes} />
      <SectionHeading index="02" kicker="impact" color="var(--pink)">
        Things I’ve <Scribble color="var(--pink)" after=".">built & automated</Scribble>
      </SectionHeading>

      <div className="hl-grid">
        {highlights.map((h, i) => {
          const Art = arts[h.art]
          return (
            <motion.article
              key={h.title}
              className="hl card"
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 110, damping: 16, delay: (i % 2) * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="hl__art" style={{ background: h.tint }}>
                <Art still={reduced} />
              </div>
              <div className="hl__body">
                <span className="hl__idx mono">0{i + 1}</span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
                <ul className="tags" aria-label="Technologies">
                  {h.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
