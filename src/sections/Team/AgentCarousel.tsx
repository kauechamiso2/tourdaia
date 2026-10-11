import arrowLeft from '@/assets/team/arrow-left.svg'
import arrowRight from '@/assets/team/arrow-right.svg'
import { motion, useReducedMotion, type PanInfo } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AgentCard } from './AgentCard'
import { AGENTS } from './agents'

/*
 * Pilha de cards (Figma "card-stack"): o ativo na frente; o anterior atrás à
 * esquerda (90%) e o próximo atrás à direita (80%), ambos a 45%.
 * Posições medidas no Figma a partir do canto do card ativo (origem 0 0).
 * Os demais esperam invisíveis fora do quadro e entram/saem pelas laterais.
 */
/*
 * `veil`: os cards são sempre opacos; o "45%" do Figma é um véu da cor do fundo
 * por cima (55%). Sobre o fundo o resultado é idêntico, e na troca o card que
 * vem para frente cobre o outro sem as duas camadas se misturarem.
 * `opacity` só liga/desliga os cards que esperam fora do quadro.
 */
type Slot = { x: number; y: number; scale: number; opacity: number; veil: number; z: number }

const SLOTS: Record<number, Slot> = {
  [-3]: { x: -300, y: 76, scale: 0.78, opacity: 0, veil: 0.55, z: 0 },
  [-2]: { x: -300, y: 76, scale: 0.78, opacity: 0, veil: 0.55, z: 1 },
  [-1]: { x: -180, y: 38, scale: 0.9, opacity: 1, veil: 0.55, z: 2 },
  [0]: { x: 0, y: 0, scale: 1, opacity: 1, veil: 0, z: 3 },
  [1]: { x: 264, y: 53, scale: 0.8, opacity: 1, veil: 0.55, z: 2 },
  [2]: { x: 400, y: 90, scale: 0.7, opacity: 0, veil: 0.55, z: 1 },
}

const N = AGENTS.length
const CARD_W = 420
const CARD_H = 618
const AUTOPLAY_MS = 5200

/* distância circular do card i até o ativo, em [-3, 2] */
const offsetOf = (i: number, active: number) => {
  const d = (((i - active) % N) + N) % N
  return d > N / 2 - 1 ? d - N : d
}

/* mola com "peso": desliza, assenta, quase sem quique */
const MOVE = { type: 'spring', visualDuration: 0.8, bounce: 0.12 } as const
const FADE = { duration: 0.5, ease: [0.25, 1, 0.5, 1] } as const
/* o véu de quem vem para frente sai rápido; o de quem vai para trás entra devagar */
const UNVEIL = { duration: 0.35, ease: 'easeOut' } as const

export function AgentCarousel() {
  const reduceMotion = useReducedMotion()
  // `from` = ativo anterior, para saber de onde cada card está vindo
  const [{ active, from }, setNav] = useState({ active: 0, from: 0 })
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)

  // no mobile a pilha inteira escala para caber; no desktop fica 1:1
  const frame = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(1)
  useLayoutEffect(() => {
    const el = frame.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setK(Math.min(1, e.contentRect.width / CARD_W)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const go = useCallback((dir: 1 | -1) => setNav(({ active: a }) => ({ active: (a + dir + N) % N, from: a })), [])

  // troca automática (pausa com hover/foco/arrasto e fora da tela); o timer
  // reinicia a cada troca, então clicar numa seta não encurta o próximo intervalo
  useEffect(() => {
    if (paused || !inView || reduceMotion) return
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS)
    return () => window.clearTimeout(t)
  }, [active, paused, inView, reduceMotion, go])

  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    if (offset.x < -60 || velocity.x < -500) go(1)
    else if (offset.x > 60 || velocity.x > 500) go(-1)
  }

  return (
    <motion.div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Agentes do Squad"
      className="relative"
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
    >
      <div ref={frame} className="w-full">
        {/* slot do card ativo: centralizado no mobile; no desktop alinhado à direita da coluna (Figma) */}
        <div
          className="relative mx-auto lg:mx-0 lg:ml-[clamp(0px,calc(100%-420px),180px)]"
          style={{ width: CARD_W * k, height: CARD_H * k }}
        >
          <motion.div
            className="absolute top-0 left-0 origin-top-left cursor-grab touch-pan-y active:cursor-grabbing"
            style={{ width: CARD_W, height: CARD_H, scale: k }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            dragSnapToOrigin
            onDragStart={() => setPaused(true)}
            onDragEnd={(e, info) => {
              setPaused(false)
              onDragEnd(e, info)
            }}
          >
            {AGENTS.map((agent, i) => {
              const off = offsetOf(i, active)
              const slot = SLOTS[off]
              const prev = offsetOf(i, from)
              // atravessar por trás (invisível → invisível) é instantâneo
              const jump = Math.abs(off) >= 2 && Math.abs(prev) >= 2
              const isActive = off === 0
              return (
                <motion.div
                  key={agent.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${N}: ${agent.name}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className="absolute top-0 left-0 origin-top-left"
                  style={{ zIndex: slot.z }}
                  initial={false}
                  animate={{ x: slot.x, y: slot.y, scale: slot.scale, opacity: slot.opacity }}
                  transition={jump ? { duration: 0 } : { default: MOVE, opacity: FADE }}
                  onClick={() => off !== 0 && Math.abs(off) === 1 && go(off as 1 | -1)}
                >
                  <motion.div
                    animate={{
                      boxShadow: isActive ? '0px 24px 48px 0px rgba(18,18,15,0.06)' : '0px 24px 48px 0px rgba(18,18,15,0)',
                    }}
                    transition={FADE}
                    className={Math.abs(off) === 1 ? 'relative cursor-pointer' : 'relative'}
                  >
                    <AgentCard agent={agent} active={isActive} preload={Math.abs(off) <= 1 ? 'auto' : 'none'} />
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-canvas"
                      initial={false}
                      animate={{ opacity: slot.veil }}
                      transition={jump ? { duration: 0 } : isActive ? UNVEIL : FADE}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* setas: centralizadas sob o card ativo, 36px abaixo dele */}
        <div className="mx-auto mt-9 flex justify-center gap-2 lg:mx-0 lg:ml-[clamp(0px,calc(100%-420px),180px)]" style={{ width: CARD_W * k }}>
          <ArrowButton label="Agente anterior" icon={arrowLeft} onClick={() => go(-1)} />
          <ArrowButton label="Próximo agente" icon={arrowRight} onClick={() => go(1)} />
        </div>
      </div>

      <p aria-live={paused ? 'polite' : 'off'} className="sr-only">
        {AGENTS[active].name}, {AGENTS[active].role}
      </p>
    </motion.div>
  )
}

function ArrowButton({ label, icon, onClick }: { label: string; icon: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      className="grid size-11 place-items-center rounded-full border border-ink transition-colors duration-300 hover:bg-ink [&:hover_img]:invert focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <img src={icon} alt="" width={18} height={18} className="transition-[filter] duration-300" />
    </motion.button>
  )
}
