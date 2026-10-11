import pinGlowA from '@/assets/hero/pin-glow-a.svg'
import pinGlowB from '@/assets/hero/pin-glow-b.svg'
import pin from '@/assets/hero/pin.svg'
import { EASE_OUT_EXPO, EASE_OUT_QUART } from '@/lib/motion'
import { motion, type Variants } from 'motion/react'
import type { Ref } from 'react'
import { box, pinTip } from './geometry'
import type { Stop } from './stops'

export type StopState = 'hidden' | 'in' | 'out'

/*
 * Uma parada do tour. Fica sempre montada; alterna entre "in" e "out" para a
 * saída de uma sobrepor a entrada da próxima.
 *
 * Entrada: anel pulsa no ponto → brilho floresce → pin cai com mola →
 *          card abre em cortina saindo do pin, vídeo desinfla.
 * Saída:   card recolhe de volta para o pin → pin sobe e some → brilho apaga.
 */

const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

const glow: Variants = {
  hidden: { opacity: 0, scale: 0.4, transition: { duration: 0 } },
  in: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 1.4, ease: EASE_OUT_QUART } },
  out: { opacity: 0, scale: 0.6, transition: { delay: 0.25, duration: 0.7, ease: EASE_IN_OUT } },
}

const ring = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.2, transition: { duration: 0 } },
  in: { opacity: [0, 0.9, 0], scale: [0.2, 2.8], transition: { delay, duration: 1.5, ease: EASE_OUT_QUART, times: [0, 0.15, 1] } },
  out: { opacity: 0, transition: { duration: 0.2 } },
})

const pinV: Variants = {
  hidden: { opacity: 0, y: -36, scale: 0.55, transition: { duration: 0 } },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      opacity: { delay: 0.12, duration: 0.3, ease: 'linear' },
      default: { type: 'spring', stiffness: 300, damping: 20, mass: 0.9, delay: 0.12 },
    },
  },
  out: { opacity: 0, y: -24, scale: 0.7, transition: { delay: 0.3, duration: 0.45, ease: EASE_IN_OUT } },
}

const card: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)', x: -12, transition: { duration: 0 } },
  in: { clipPath: 'inset(0% 0% 0% 0%)', x: 0, transition: { delay: 0.38, duration: 1.05, ease: EASE_OUT_EXPO } },
  out: { clipPath: 'inset(0% 100% 0% 0%)', x: -12, transition: { duration: 0.55, ease: EASE_IN_OUT } },
}

const media: Variants = {
  hidden: { scale: 1.2, transition: { duration: 0 } },
  in: { scale: 1, transition: { delay: 0.38, duration: 1.8, ease: EASE_OUT_EXPO } },
  out: { scale: 1.08, transition: { duration: 0.55, ease: EASE_IN_OUT } },
}

type Props = {
  stop: Stop
  state: StopState
  preload: 'auto' | 'metadata'
  videoRef: Ref<HTMLVideoElement>
}

export function TourStop({ stop: { x, y, video, poster }, state, preload, videoRef }: Props) {
  const tip = pinTip(x, y)

  return (
    <motion.div initial="hidden" animate={state} className="pointer-events-none absolute inset-0">
      {/* brilho sob o pin: duas camadas desfocadas do Figma */}
      <motion.img variants={glow} src={pinGlowA} alt="" width={165} height={132} className="absolute" style={box(x - 34, y + 58, 165, 132)} />
      <motion.img variants={glow} src={pinGlowB} alt="" width={215} height={182} className="absolute" style={box(x - 59, y + 33, 215, 182)} />

      {/* anéis de "chegada" no ponto do mapa */}
      {[0, 0.32].map((d) => (
        <motion.span
          key={d}
          variants={ring(d)}
          className="absolute rounded-full border-[1.5px] border-tour-royal/60"
          style={box(tip.x - 20, tip.y - 20, 40, 40)}
        />
      ))}

      <motion.div
        variants={pinV}
        className="absolute grid origin-[50%_100%] place-items-center will-change-transform"
        style={box(x, y + 23, 98.458, 98.458)}
      >
        <img src={pin} alt="" width={69.628} height={69.628} className="w-[70.72%] -rotate-[44.17deg]" />
      </motion.div>

      <motion.div variants={card} className="absolute overflow-hidden bg-ink will-change-[clip-path]" style={box(x + 100, y, 182, 112)}>
        <motion.video
          ref={videoRef}
          variants={media}
          src={video}
          poster={poster}
          preload={preload}
          muted
          playsInline
          disablePictureInPicture
          className="size-full origin-left object-cover will-change-transform"
        />
      </motion.div>
    </motion.div>
  )
}
