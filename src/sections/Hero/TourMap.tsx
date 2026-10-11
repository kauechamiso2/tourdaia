import { enter } from '@/lib/motion'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { box, BOX_H, MAP_W, pinTip } from './geometry'
import { MapBrazil } from './MapBrazil'
import { STOPS } from './stops'
import { TourStop, type StopState } from './TourStop'

/*
 * Mapa do tour: as paradas acendem uma por vez, em loop, norte → sul.
 * Cada parada mostra a região no mapa, o pin e um card com o vídeo dela.
 *
 * O ciclo só roda com o mapa visível (pausa fora da tela, economiza CPU e
 * dados). Se ele aparece depois da entrada do hero (mobile, ao rolar), os
 * atrasos iniciais encolhem para não parecer lento.
 */

const MAP_START = 0.4
const FIRST_STOP = 0.7
/* intervalo entre uma parada e a próxima — os vídeos têm 8s */
const DWELL = 3.2
/* a próxima entra enquanto a atual ainda está aberta; a atual só sai depois disso */
const OVERLAP = 1.0

const mapIn = (shift: number): Variants => ({
  hidden: { opacity: 0, scale: 0.965, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: enter(Math.max(0, MAP_START + shift), 1.6) },
})

export function TourMap({ className, play }: { className?: string; play: boolean }) {
  const reduceMotion = useReducedMotion()
  const mountedAt = useRef(0)
  const videos = useRef<Array<HTMLVideoElement | null>>([])
  const [inView, setInView] = useState(false)
  const [seen, setSeen] = useState(false)
  const [shift, setShift] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  // parada anterior, ainda aberta durante o OVERLAP
  const [prev, setPrev] = useState<number | null>(null)

  const running = play && inView

  useEffect(() => {
    mountedAt.current = performance.now()
  }, [])

  // relógio do ciclo: primeira parada após a entrada do mapa, depois a cada DWELL
  useEffect(() => {
    if (!running) return
    const delay = active === null ? Math.max(0.2, FIRST_STOP + shift) : DWELL
    const t = window.setTimeout(() => {
      setPrev(active)
      setActive(active === null ? 0 : (active + 1) % STOPS.length)
    }, delay * 1000)
    return () => window.clearTimeout(t)
  }, [running, active, shift])

  // depois do OVERLAP a parada anterior sai
  useEffect(() => {
    if (prev === null) return
    const t = window.setTimeout(() => setPrev(null), OVERLAP * 1000)
    return () => window.clearTimeout(t)
  }, [prev])

  // a parada que entra toca do início
  useEffect(() => {
    const v = active === null ? null : videos.current[active]
    if (!v || !running || reduceMotion) return
    v.currentTime = 0
    v.play().catch(() => {})
  }, [active, running, reduceMotion])

  // quem não está aberta pausa depois de recolher (ou tudo, fora da tela)
  useEffect(() => {
    const timers = videos.current.map((v, i) =>
      v && (!running || (i !== active && i !== prev)) ? window.setTimeout(() => v.pause(), running ? 700 : 0) : 0,
    )
    return () => timers.forEach(clearTimeout)
  }, [active, prev, running])

  const isOpen = (i: number) => i === active || i === prev
  const stateOf = (i: number): StopState => (active === null ? 'hidden' : isOpen(i) ? 'in' : 'out')
  const next = active === null ? 0 : (active + 1) % STOPS.length

  return (
    <motion.div
      aria-hidden
      className={className}
      initial="hidden"
      animate={play && seen ? 'show' : 'hidden'}
      viewport={{ amount: 0.3 }}
      onViewportEnter={() => {
        if (!seen && performance.now() - mountedAt.current > 1500) setShift(-0.45)
        setSeen(true)
        setInView(true)
      }}
      onViewportLeave={() => setInView(false)}
    >
      <div className="relative aspect-[738/638.53] w-full">
        <motion.div variants={mapIn(shift)} className="absolute origin-[45%_50%]" style={box(0, 0, MAP_W, BOX_H)}>
          <MapBrazil stops={STOPS} lit={[active, prev]} className="size-full" />

          {/* marcadores discretos das paradas — o roteiro fica legível entre um pin e outro */}
          {STOPS.map(({ region, x, y }, i) => {
            const tip = pinTip(x, y)
            return (
              <motion.span
                key={region}
                className="absolute size-[6px] -translate-1/2 rounded-full bg-ink"
                style={{ left: `${(tip.x / MAP_W) * 100}%`, top: `${(tip.y / BOX_H) * 100}%` }}
                animate={{ opacity: isOpen(i) ? 0 : 0.22, scale: isOpen(i) ? 0.4 : 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            )
          })}
        </motion.div>

        {STOPS.map((stop, i) => (
          <TourStop
            key={stop.region}
            stop={stop}
            state={stateOf(i)}
            preload={i === active || i === next ? 'auto' : 'metadata'}
            videoRef={(el) => {
              videos.current[i] = el
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
