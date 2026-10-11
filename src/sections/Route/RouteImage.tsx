import photo from '@/assets/route/bus-photo@2x.webp'
import pin from '@/assets/route/pin.svg'
import ribbon from '@/assets/route/ribbon@2x.webp'
import { EASE_OUT_EXPO, EASE_OUT_QUART } from '@/lib/motion'
import { motion, type Variants } from 'motion/react'
import type { CSSProperties } from 'react'

/*
 * Figma "route-image" (840 × 726): fita azul por trás, foto do ônibus num
 * quadro de 743 × 495 e o pin à esquerda. Posições em % da caixa para escalar.
 *
 * Entrada: a foto abre em cortina (com um leve zoom-out), a fita se desenha da
 * esquerda para a direita e o pin cai no ponto com mola, soltando dois anéis.
 */
const W = 840
const H = 726
const box = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
  height: `${(h / H) * 100}%`,
})

const PHOTO = { x: 121, y: 111, w: 743, h: 495 }
const PIN = { x: 20, y: 474, size: 115.487 }
const TIP = { x: PIN.x + PIN.size / 2, y: PIN.y + PIN.size }

const photoIn: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: EASE_OUT_EXPO } },
}

const photoZoom: Variants = {
  hidden: { scale: 1.12 },
  show: { scale: 1, transition: { duration: 1.9, ease: EASE_OUT_EXPO } },
}

const ribbonIn: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { delay: 0.2, duration: 1.9, ease: EASE_OUT_EXPO } },
}

const pinIn: Variants = {
  hidden: { opacity: 0, y: -40, scale: 0.55 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      opacity: { delay: 0.7, duration: 0.3, ease: 'linear' },
      default: { type: 'spring', stiffness: 300, damping: 19, mass: 0.9, delay: 0.7 },
    },
  },
}

const ring = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.2 },
  show: { opacity: [0, 0.8, 0], scale: [0.2, 3], transition: { delay, duration: 1.6, ease: EASE_OUT_QUART, times: [0, 0.15, 1] } },
})

export function RouteImage({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      <div className="relative aspect-[840/726] w-full">
        <motion.img
          variants={ribbonIn}
          src={ribbon}
          alt=""
          width={840}
          height={444}
          className="absolute"
          style={box(0, 332, 840, 444)}
        />

        {[0.9, 1.2].map((d) => (
          <motion.span
            key={d}
            variants={ring(d)}
            className="absolute rounded-full border-[1.5px] border-route-blue/50"
            style={box(TIP.x - 22, TIP.y - 22, 44, 44)}
          />
        ))}

        <motion.div
          variants={pinIn}
          className="absolute grid origin-[50%_100%] place-items-center"
          style={box(PIN.x, PIN.y, PIN.size, PIN.size)}
        >
          <img src={pin} alt="" width={81.67} height={81.67} className="w-[70.72%] -rotate-[44.17deg]" />
        </motion.div>

        <motion.div variants={photoIn} className="absolute overflow-hidden" style={box(PHOTO.x, PHOTO.y, PHOTO.w, PHOTO.h)}>
          <motion.img
            variants={photoZoom}
            src={photo}
            alt=""
            width={743}
            height={495}
            decoding="async"
            className="size-full origin-left object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
