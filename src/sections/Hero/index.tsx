import ribbon from '@/assets/hero/ribbon@2x.webp'
import { SiteHeader } from '@/components/SiteHeader'
import { EASE_OUT_EXPO, enter } from '@/lib/motion'
import { useFontsReady } from '@/lib/useFontsReady'
import { motion, type Variants } from 'motion/react'
import { TourMap } from './TourMap'

/*
 * Figma: Marketing › "Hero / Desktop · 1921" (104:21903).
 *
 * --display é o corpo do título (92px no desktop). A coluna de texto mede
 * 567/92 = 6.163em, então as quebras de linha do título são as mesmas do
 * Figma em qualquer tamanho de tela — por isso as linhas podem ser fixas
 * (e animadas uma a uma).
 * --bleed é quanto a foto da direita pode passar da coluna (126px no Figma),
 * limitado pelo espaço livre até a borda da janela.
 *
 * Entrada: header → título linha a linha → parágrafo; em paralelo a fita
 * cresce de baixo e o mapa assenta, depois as paradas acendem de norte a sul.
 */

const HEADLINE_START = 0.25
const HEADLINE_STAGGER = 0.085

const line = (i: number): Variants => ({
  hidden: { y: '108%' },
  show: { y: '0%', transition: enter(HEADLINE_START + i * HEADLINE_STAGGER, 1.25) },
})

const paragraph: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: enter(0.72, 1.2) },
}

const ribbonReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      clipPath: { delay: 0.35, duration: 1.8, ease: EASE_OUT_EXPO },
      opacity: { delay: 0.35, duration: 0.6, ease: 'linear' },
    },
  },
}

/* Linhas do título. "Brasil" ganha o degradê da marca. */
const LINES = [
  <>Vamos viajar</>,
  <>
    pelo{' '}
    <span className="-mr-[0.08em] bg-[linear-gradient(90deg,var(--color-brand-green)_0%,var(--color-brand-lime)_46.327%,var(--color-brand-orange)_100%)] bg-clip-text pr-[0.08em] text-transparent">
      Brasil
    </span>{' '}
    para
  </>,
  <>levar IA até seu</>,
  <>negócio</>,
]

export function Hero() {
  const ready = useFontsReady()

  return (
    <motion.section
      initial="hidden"
      animate={ready ? 'show' : 'hidden'}
      className="relative isolate flex flex-col overflow-hidden [--bleed:clamp(0px,calc((100vw-var(--content))/2-var(--gutter)),126px)] [--display:min(calc((100vw-var(--gutter)*2)/6.163),80px)] lg:min-h-[clamp(720px,100svh,900px)] lg:[--display:clamp(64px,calc(5.29vw+15.8px),92px)]"
    >
      {/*
        Fita com dither (shader do Figma) exportada como imagem.
        ≥1536px: o laço fica a 25px do texto (encostado na borda a partir de 1920px).
        Abaixo disso o laço não cabe inteiro — só a cauda aparece no canto inferior.
        A base esmaece para não marcar um corte reto na emenda com a próxima seção.
      */}
      <motion.img
        variants={ribbonReveal}
        src={ribbon}
        alt=""
        aria-hidden
        width={221}
        height={591}
        className="pointer-events-none absolute bottom-0 -left-[185px] -z-10 hidden w-[221px] max-w-none select-none [mask-image:linear-gradient(to_bottom,black_80%,transparent)] lg:block 2xl:left-[min(0px,50%-var(--content)/2-200px)]"
      />

      <div className="container-page flex flex-1 flex-col pt-[35px]">
        <SiteHeader />

        <div className="grid flex-1 pb-16 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-[clamp(48px,7vw,101px)]">
          <div className="flex w-[calc(var(--display)*6.163)] max-w-full flex-col gap-[30px] self-start pt-16 lg:pt-[120px]">
            <h1 className="text-[length:var(--display)] leading-[1.0362] font-medium tracking-[-0.067em] text-ink">
              <span className="sr-only">Vamos viajar pelo Brasil para levar IA até seu negócio</span>
              {LINES.map((content, i) => (
                // máscara por linha; o padding extra não corta descendentes (g, ç, j)
                <span key={i} aria-hidden className="-mx-[0.06em] -mb-[0.16em] block overflow-hidden px-[0.06em] pb-[0.16em]">
                  <motion.span variants={line(i)} className="block whitespace-nowrap will-change-transform">
                    {content}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p variants={paragraph} className="text-[15px] leading-[27px] text-muted">
              Visite uma loja Vivo participante e conte com nossos especialistas para colocar a IA para
              trabalhar no seu negócio, do atendimento às vendas.
            </motion.p>
          </div>

          <div className="mt-14 lg:mt-0 lg:self-center">
            <TourMap play={ready} className="w-full lg:w-[calc(100%+var(--bleed))] lg:max-w-[738px]" />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
