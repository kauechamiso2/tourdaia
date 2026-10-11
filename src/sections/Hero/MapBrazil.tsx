import mapSvg from '@/assets/hero/map-brazil.svg?raw'
import { motion } from 'motion/react'
import type { CSSProperties } from 'react'
import { BOX_H, MAP_W } from './geometry'
import type { Stop } from './stops'

/* Estados extraídos do SVG exportado do Figma (27 paths "BR-XX"). */
const STATES = [...mapSvg.matchAll(/<path id="BR-(\w\w)" d="([^"]+)"/g)].map(([, uf, d]) => ({ uf, d }))

type Props = {
  stops: Stop[]
  /* paradas com a região acesa (a atual e, na transição, a anterior) */
  lit: Array<number | null>
  className?: string
  style?: CSSProperties
}

/* Mapa base cinza + uma camada por região que acende com o degradê azul da fita. */
export function MapBrazil({ stops, lit, className, style }: Props) {
  return (
    <svg viewBox={`0 0 ${MAP_W} ${BOX_H}`} fill="none" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="tour-region" x1="0" y1="0" x2={MAP_W} y2={BOX_H} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-tour-sky)" />
          <stop offset="0.5" stopColor="var(--color-tour-blue)" />
          <stop offset="1" stopColor="var(--color-tour-royal)" />
        </linearGradient>
      </defs>

      <g fill="#DCDCDC">
        {STATES.map(({ uf, d }) => (
          <path key={uf} d={d} />
        ))}
      </g>

      {stops.map((stop, i) => (
        <motion.g
          key={stop.region}
          fill="url(#tour-region)"
          initial={{ opacity: 0 }}
          animate={{ opacity: lit.includes(i) ? 0.42 : 0 }}
          transition={{ duration: lit.includes(i) ? 1.2 : 0.8, ease: 'easeInOut', delay: lit.includes(i) ? 0.1 : 0 }}
        >
          {STATES.filter(({ uf }) => stop.states.includes(uf)).map(({ uf, d }) => (
            <path key={uf} d={d} />
          ))}
        </motion.g>
      ))}
    </svg>
  )
}
