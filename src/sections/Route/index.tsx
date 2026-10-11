import { VoteButton } from '@/components/VoteButton'
import { cn } from '@/lib/cn'
import { EASE_OUT_EXPO, enter } from '@/lib/motion'
import { motion, type Variants } from 'motion/react'
import { RouteImage } from './RouteImage'

/*
 * Figma: Marketing › "Rota / Desktop · 1921" (110:23413).
 * Imagem sangrando até a borda esquerda da tela; coluna de texto começa no
 * centro (50%), alinhada ao grid de 1200.
 */

type Phase = { region: string; description: string; date?: string; tag?: string }

const PHASES: Phase[] = [
  { region: 'Sudeste', description: 'A largada. As primeiras paradas do Tour acontecem no Sudeste.', date: 'JAN 2027', tag: 'ESTREIA' },
  { region: 'Sul', description: 'Seguimos pela BR-116 até o Sul do país.' },
  { region: 'Nordeste', description: 'Subimos a BR-116 rumo ao Nordeste, cidade por cidade.' },
]

const reveal = (i: number): Variants => ({
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: enter(i * 0.08, 1.1) },
})

const railDraw: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { delay: 0.2, duration: 1.4, ease: EASE_OUT_EXPO } },
}

const markerPop = (i: number): Variants => ({
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 20, delay: 0.3 + i * 0.22 } },
})

function Marker({ live, i }: { live: boolean; i: number }) {
  return (
    <motion.span variants={markerPop(i)} className="relative mt-[2px] block size-3 shrink-0">
      <span className={cn('absolute inset-0', live ? 'bg-route-blue' : 'border border-ink bg-canvas')} />
      {/* a estreia "pulsa": é a próxima parada */}
      {live && (
        <motion.span
          className="absolute inset-0 border border-route-blue"
          animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.6, delay: 1.2 }}
        />
      )}
    </motion.span>
  )
}

export function Route() {
  return (
    <section id="rota" className="relative isolate overflow-hidden bg-canvas py-24 lg:py-40">
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[calc(50%+659px)] hidden w-px bg-line min-[1400px]:block" />

      <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-[120px]">
        {/* imagem: encosta na borda esquerda da tela e termina 120px antes do centro */}
        <div className="w-full lg:ml-[max(0px,calc(50%-120px-840px))] lg:w-[min(840px,calc(50%-120px))] lg:shrink-0">
          <RouteImage />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="flex w-full flex-col gap-12 px-[var(--gutter)] lg:max-w-[calc(600px+var(--gutter))] lg:pr-[var(--gutter)] lg:pl-0"
        >
          <div className="flex flex-col">
            <div className="flex flex-col gap-6">
              <motion.h2
                variants={reveal(0)}
                className="text-[min(92px,calc((100vw-var(--gutter)*2)/5.9))] leading-[1.0362] font-medium tracking-[-0.067em] whitespace-nowrap text-ink lg:text-[min(92px,6.4vw)]"
              >
                Pé na estrada.
              </motion.h2>
              <motion.p variants={reveal(1)} className="text-[17px] leading-7 text-muted lg:text-[18px]">
                Em janeiro, o ônibus do Tour da IA sai pela BR-116. A lista completa de cidades será revelada em breve.
              </motion.p>
            </div>
          </div>

          <ol className="relative flex flex-col gap-10">
            {/* trilho: some em degradê na altura do botão */}
            <motion.span
              aria-hidden
              variants={railDraw}
              className="absolute top-[14px] left-[6px] h-[calc(100%-32px)] w-px origin-top bg-[linear-gradient(to_bottom,var(--color-ink)_86.5%,transparent)]"
            />
            {PHASES.map((p, i) => {
              const live = Boolean(p.tag)
              return (
                <li key={p.region} className="flex gap-6">
                  <Marker live={live} i={i} />
                  <motion.div variants={reveal(3 + i)} className="flex flex-col gap-2">
                    {p.date && (
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] leading-4 tracking-[0.113em] text-ink">{p.date}</span>
                        <span className="bg-route-blue px-2 py-[3px] font-mono text-[10px] leading-[14px] font-medium tracking-[0.044em] text-white">
                          {p.tag}
                        </span>
                      </div>
                    )}
                    <h3 className={cn('text-[24px] leading-[30px] font-medium tracking-[-0.02em]', live ? 'text-ink' : 'text-gray-region')}>
                      {p.region}
                    </h3>
                    <p className="text-[15px] leading-6 text-muted">{p.description}</p>
                  </motion.div>
                </li>
              )
            })}
            <li className="pl-9">
              <VoteButton variants={reveal(6)} />
            </li>
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
