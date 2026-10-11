import pin from '@/assets/steps/pin.svg'
import { motion, type MotionValue } from 'motion/react'

/* Pin do ônibus (variante azul do Figma). Caixa de 98.46, ponta embaixo, no centro. */
export function BusPin({ lean, className }: { lean?: MotionValue<number>; className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none grid size-[98.458px] origin-[50%_100%] place-items-center ${className ?? ''}`}
      style={{ rotate: lean }}
    >
      <img src={pin} alt="" width={69.628} height={69.628} className="w-[70.72%] -rotate-[44.17deg] drop-shadow-[0_10px_18px_rgba(19,18,16,0.10)]" />
    </motion.div>
  )
}
