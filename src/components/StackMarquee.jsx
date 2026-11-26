import { tapes } from '../data/resume.js'
import { Box, Gear, Hex, Sparkle } from './shapes/Shapes.jsx'

const icons = [
  (c) => <Box size={26} color={c} />,
  (c) => <Hex size={26} color={c} />,
  (c) => <Sparkle size={26} color={c} />,
  (c) => <Gear size={26} color={c} />,
]
const colors = ['var(--pink)', 'var(--mint)', '#fff', 'var(--ai)', 'var(--orange)']

/** Two tilted "tape" strips of tech names, scrolling opposite ways. Pauses on hover. */
export default function StackMarquee() {
  return (
    <div className="tapes" aria-hidden="true">
      {tapes.map((row, r) => (
        <div key={r} className={`tape tape--${r + 1}`}>
          <div className="tape__track">
            {[...row, ...row].map((name, i) => (
              <span key={i} className="tape__item">
                {icons[i % icons.length](colors[(i + r) % colors.length])}
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
