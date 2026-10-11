import connector from '@/assets/steps/connector.svg'
import { cn } from '@/lib/cn'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { BusPin } from './BusPin'
import { StepText } from './StepText'
import { STEPS } from './steps'

/*
 * Os passos ficam todos acesos desde o início. Quando a linha entra na tela,
 * o ônibus faz o percurso uma vez: anda até o passo 2, para um instante e
 * segue até o 3. O trilho escurece atrás dele e cada marcador pulsa quando
 * ele passa.
 */
const LEG = { duration: 1.25, ease: [0.65, 0, 0.35, 1] } as const
/* parada no passo do meio */
const STOP_S = 0.45

function useBusDrive(target: RefObject<HTMLElement | null>) {
  const last = STEPS.length - 1
  const progress = useMotionValue(0)
  const inView = useInView(target, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      progress.set(1)
      return
    }
    // uma perna por trecho entre marcadores, com a parada entre elas
    const run = animate(
      STEPS.slice(1).map((_, i) => [progress, (i + 1) / last, { ...LEG, at: i === 0 ? 0.2 : `+${STOP_S}` }] as const),
    )
    return () => run.stop()
  }, [inView, reduceMotion, last, progress])

  // inclina para frente durante o trajeto
  const velocity = useVelocity(progress)
  const lean = useSpring(useTransform(velocity, [-1, 0, 1], [-8, 0, 8], { clamp: true }), {
    stiffness: 220,
    damping: 22,
  })

  const [reached, setReached] = useState(0)
  useMotionValueEvent(progress, 'change', (v) => setReached(Math.floor(v * last + 0.04)))

  return { progress, lean, reached }
}

/* Marcador azul 12×12; dá um "ping" quando o ônibus chega. */
function Marker({ lit }: { lit: boolean }) {
  return (
    <span className="relative block size-3 shrink-0">
      <span className="absolute inset-0 bg-tour-marker" />
      <motion.span
        className="absolute inset-0 border border-tour-marker"
        initial={false}
        animate={lit ? { scale: [1, 2.6], opacity: [0.7, 0] } : { scale: 1, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  )
}

const pct = (v: number) => `${v * 100}%`

/* ---------------- Desktop: linha horizontal ---------------- */

export function TimelineHorizontal() {
  const line = useRef<HTMLDivElement>(null)
  const { progress, lean, reached } = useBusDrive(line)
  const busX = useTransform(progress, pct)

  return (
    <div ref={line} className="flex w-full flex-col">
      <div className="relative flex items-center justify-between">
        {/* trilho: base apagada + trecho percorrido em tinta */}
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/15" />
        <motion.span
          className="absolute top-1/2 left-[6px] h-px w-[calc(100%-12px)] origin-left -translate-y-1/2 bg-ink"
          style={{ scaleX: progress }}
        />
        {STEPS.map((s, i) => (
          <Marker key={s.n} lit={reached >= i} />
        ))}

        {/* camada do tamanho do percurso: deslocá-la em % = andar de marcador a marcador */}
        <motion.div className="absolute top-[-109px] left-0 w-[calc(100%-12px)]" style={{ x: busX }}>
          <BusPin lean={lean} className="-ml-[43.229px]" />
        </motion.div>
      </div>

      <div className="grid grid-cols-3">
        {STEPS.map((s, i) => {
          const alignTo = i === 0 ? 'start' : i === STEPS.length - 1 ? 'end' : 'center'
          return (
            <div key={s.n} className={cn('flex flex-col', { start: 'items-start', center: 'items-center', end: 'items-end' }[alignTo])}>
              <img src={connector} alt="" width={12} height={80} />
              <StepText step={s} alignTo={alignTo} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------------- Mobile: linha vertical ---------------- */

export function TimelineVertical() {
  const list = useRef<HTMLOListElement>(null)
  const { progress, reached } = useBusDrive(list)
  const busY = useTransform(progress, pct)

  return (
    <ol ref={list} className="relative grid auto-rows-fr gap-0 pl-9">
      {/* trilho vertical no centro dos marcadores (x = 6px) */}
      <span className="absolute top-[6px] bottom-0 left-[5.5px] w-px bg-ink/15" />
      <TrackFill progress={progress} />

      {STEPS.map((s, i) => (
        <li key={s.n} className="relative pb-12 last:pb-0">
          <span className="absolute top-0 -left-9">
            <Marker lit={reached >= i} />
          </span>
          <StepText step={s} />
        </li>
      ))}

      {/* percurso = do 1º ao último marcador (2/3 da lista com linhas iguais) */}
      <motion.div className="pointer-events-none absolute top-[6px] left-0 h-[calc((100%-6px)*2/3)]" style={{ y: busY }}>
        <div className="absolute top-0 left-[6px] -translate-x-1/2 -translate-y-full scale-[0.62] origin-bottom">
          <BusPin className="mb-[10.5px]" />
        </div>
      </motion.div>
    </ol>
  )
}

function TrackFill({ progress }: { progress: MotionValue<number> }) {
  return (
    <motion.span
      className="absolute top-[6px] left-[5.5px] h-[calc((100%-6px)*2/3)] w-px origin-top bg-ink"
      style={{ scaleY: progress }}
    />
  )
}
