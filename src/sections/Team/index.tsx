import { enter } from '@/lib/motion'
import { motion, type Variants } from 'motion/react'
import { AgentCarousel } from './AgentCarousel'

/* Figma: Marketing › "Time digital / Desktop · 1921" (110:23145). */

const reveal = (i: number): Variants => ({
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: enter(i * 0.08, 1.1) },
})

export function Team() {
  return (
    <section id="time-digital" className="relative isolate overflow-hidden bg-canvas pt-24 pb-12 lg:pt-40 lg:pb-20">
      <div className="mx-auto flex w-full max-w-[calc(1200px+var(--gutter)*2)] flex-col gap-14 px-[var(--gutter)] lg:flex-row lg:items-center lg:gap-0">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col gap-7 lg:flex-1 lg:pr-20"
        >
          <motion.p variants={reveal(0)} className="flex items-center gap-[10px] font-mono text-[11px] leading-4 tracking-[0.113em] text-ink">
            <span aria-hidden className="size-[7px] bg-olive" />
            SQUAD.COM
          </motion.p>
          <div className="flex flex-col gap-5">
            <motion.h2
              variants={reveal(1)}
              className="text-[clamp(34px,4.2vw+6px,56px)] leading-[1.07] font-medium tracking-[-0.05em] text-ink"
            >
              A solução completa para seu negócio
            </motion.h2>
            <motion.p variants={reveal(2)} className="text-[17px] leading-7 text-muted lg:text-[18px]">
              O Squad é um time de agentes de IA que assume o marketing, as vendas, o financeiro e a operação da sua
              empresa. Trabalhando juntos, com contexto compartilhado, 24 horas por dia.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={enter(0.15, 1.3)}
          className="lg:flex-1"
        >
          <AgentCarousel />
        </motion.div>
      </div>

      {/* guias verticais do grid, por cima dos cards como no Figma */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[calc(50%-660px)] z-10 hidden w-px bg-line min-[1400px]:block" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[calc(50%+659px)] z-10 hidden w-px bg-line min-[1400px]:block" />
    </section>
  )
}
