import arrowDown from '@/assets/hero/arrow-down.svg'
import logoSquad from '@/assets/hero/logo-squad.svg'
import logoTourDaIa from '@/assets/hero/logo-tour-da-ia.svg'
import { enter, EASE_OUT_EXPO } from '@/lib/motion'
import { motion, type Variants } from 'motion/react'

/* Herdam "hidden"/"show" do motion.section pai (Hero). */
const fadeDown = (delay: number): Variants => ({
  hidden: { opacity: 0, y: -10, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: enter(delay, 1) },
})

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { delay: 0.15, duration: 1.4, ease: EASE_OUT_EXPO } },
}

export function SiteHeader() {
  return (
    <header className="flex flex-col gap-[33px]">
      <div className="flex h-[42px] items-center justify-between gap-6">
        <motion.a
          variants={fadeDown(0)}
          href="#"
          aria-label="Tour da IA, por squad.com"
          className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-4"
        >
          <img
            src={logoTourDaIa}
            alt=""
            width={143}
            height={24.43}
            className="h-auto w-[112px] sm:w-[143px]"
          />
          {/* "por squad.com": texto Inter + wordmark, 60% de opacidade como no Figma */}
          <span className="flex items-center gap-[6px] opacity-60 max-sm:origin-left max-sm:scale-[0.78]">
            <span className="font-inter text-[17.642px] leading-[25.66px] tracking-[-0.02em] text-black">
              por
            </span>
            <img src={logoSquad} alt="" width={85} height={15.34} className="mt-[3px]" />
          </span>
        </motion.a>

        <motion.a
          variants={fadeDown(0.08)}
          href="#votar"
          className="group inline-flex shrink-0 items-center gap-[10px] bg-ink px-[14px] py-[12px] text-[13px] leading-[18px] font-medium tracking-[0.14em] text-white transition-colors duration-300 hover:bg-ink-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-[18px]"
        >
          INSCREVA-SE
          <img
            src={arrowDown}
            alt=""
            width={14}
            height={14}
            className="transition-transform duration-300 ease-out group-hover:translate-y-[2px]"
          />
        </motion.a>
      </div>
      <motion.div variants={drawLine} aria-hidden className="h-px origin-left bg-line" />
    </header>
  )
}
