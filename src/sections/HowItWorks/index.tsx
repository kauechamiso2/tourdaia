import ribbon from '@/assets/steps/ribbon@2x.webp'
import { VoteButton } from '@/components/VoteButton'
import { enter } from '@/lib/motion'
import { motion, type Variants } from 'motion/react'
import { TimelineHorizontal, TimelineVertical } from './Timeline'

/*
 * Figma: Marketing › "Como funciona / Desktop · 1921" (110:23015).
 * Passos sempre acesos; o ônibus percorre a linha quando ela entra na tela.
 * Desktop: linha horizontal. Mobile: linha vertical.
 */

const reveal = (i: number): Variants => ({
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: enter(i * 0.08, 1.1) },
})

function Intro() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="flex flex-col items-center gap-7 text-center"
    >
      <motion.p variants={reveal(0)} className="flex items-center gap-[10px] font-mono text-[11px] leading-4 tracking-[0.113em] text-ink">
        <span aria-hidden className="size-[7px] bg-tour-marker" />
        TOUR DA IA
      </motion.p>
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-5">
          <motion.h2
            variants={reveal(1)}
            className="text-[clamp(34px,4.2vw+6px,56px)] leading-[1.07] font-medium tracking-[-0.05em] text-balance text-ink"
          >
            Seu time digital chegou na sua cidade
          </motion.h2>
          <motion.p variants={reveal(2)} className="max-w-[540px] text-[17px] leading-7 text-muted lg:text-[18px]">
            Conheça os agentes de inteligência artificial que podem atender seus clientes, vender mais e automatizar
            tarefas do seu negócio.
          </motion.p>
        </div>
        <VoteButton variants={reveal(3)} />
      </div>
    </motion.div>
  )
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative isolate overflow-hidden bg-canvas py-24 lg:py-40">
      {/* guias verticais do grid: 60px para fora do container de 1200 */}
      <span aria-hidden className="absolute inset-y-0 left-[calc(50%-660px)] hidden w-px bg-line min-[1400px]:block" />
      <span aria-hidden className="absolute inset-y-0 left-[calc(50%+659px)] hidden w-px bg-line min-[1400px]:block" />

      {/*
        Fita com dither exportada do Figma (já termina desfocada na base, então
        se dissolve na emenda com a próxima seção, sem corte). Em 1920 começa
        342px à direita do centro e encosta na borda direita; em telas maiores
        segue encostada na borda, de onde ela "entra".
      */}
      <img
        src={ribbon}
        alt=""
        aria-hidden
        width={618}
        height={392}
        className="pointer-events-none absolute bottom-0 left-[max(50%+342px,100%-618px)] -z-10 w-[618px] max-w-none select-none"
      />

      <div className="mx-auto flex w-full max-w-[calc(1200px+var(--gutter)*2)] flex-col gap-16 px-[var(--gutter)] lg:gap-[136px]">
        <Intro />
        <div className="hidden lg:block">
          <TimelineHorizontal />
        </div>
        <div className="mx-auto w-full max-w-[420px] lg:hidden">
          <TimelineVertical />
        </div>
      </div>
    </section>
  )
}
