import arrowDown from '@/assets/steps/arrow-down.svg'
import { motion, type Variants } from 'motion/react'

/* Botão-pílula "Votar na minha cidade" (Figma "button-primary"), usado em mais de uma seção. */
export function VoteButton({ variants }: { variants?: Variants }) {
  return (
    <motion.a
      variants={variants}
      href="#votar"
      className="group inline-flex h-12 items-center gap-[10px] rounded-full bg-ink px-6 text-[13px] leading-5 font-medium tracking-[-0.005em] text-bg-alt transition-colors duration-300 hover:bg-ink-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      Votar na minha cidade
      <img
        src={arrowDown}
        alt=""
        width={10.43}
        height={10.43}
        className="size-[9.43px] transition-transform duration-300 ease-out group-hover:translate-y-[2px]"
      />
    </motion.a>
  )
}
