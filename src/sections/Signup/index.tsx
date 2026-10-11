import arrowUpRight from '@/assets/signup/arrow-up-right.svg'
import mapBa from '@/assets/signup/map-ba.svg'
import pin from '@/assets/signup/pin.svg'
import ribbon from '@/assets/signup/ribbon.webp'
import photo from '@/assets/signup/team-photo@2x.webp'
import { EASE_OUT_EXPO, enter } from '@/lib/motion'
import { motion, type Variants } from 'motion/react'
import { SignupForm } from './SignupForm'

/*
 * Figma: Marketing › "Inscrição / Desktop · 1921" (110:23737).
 * Fundo azul com o mapa da Bahia, a fita e o pin; caixa clara de 1320 com
 * formulário à esquerda e foto do time à direita.
 */

const reveal = (i: number): Variants => ({
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: enter(0.2 + i * 0.08, 1.1) },
})

const boxIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE_OUT_EXPO } },
}

const ribbonIn: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { delay: 0.15, duration: 2, ease: EASE_OUT_EXPO } },
}

const pinIn: Variants = {
  hidden: { opacity: 0, y: -50, scale: 0.6 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      opacity: { delay: 0.8, duration: 0.3 },
      default: { type: 'spring', stiffness: 260, damping: 18, delay: 0.8 },
    },
  },
}

const photoIn: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { delay: 0.35, duration: 1.3, ease: EASE_OUT_EXPO } },
}

const photoZoom: Variants = {
  hidden: { scale: 1.15 },
  show: { scale: 1, transition: { delay: 0.35, duration: 2, ease: EASE_OUT_EXPO } },
}

export function Signup() {
  return (
    <motion.section
      id="votar"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative isolate overflow-hidden bg-signup-blue px-[var(--gutter)] py-24 lg:flex lg:min-h-[1075px] lg:items-center lg:py-20"
    >
      {/* mapa da Bahia: começa 1005px à esquerda do frame de 1920 → 45px à direita do centro */}
      <img
        src={mapBa}
        alt=""
        aria-hidden
        width={1168.2}
        height={1275.31}
        className="pointer-events-none absolute top-[-26px] left-[calc(50%+45px)] -z-10 w-[1168px] max-w-none select-none"
      />
      {/* fita: base da seção, largura do frame */}
      <motion.img
        variants={ribbonIn}
        src={ribbon}
        alt=""
        aria-hidden
        width={1920}
        height={611}
        className="pointer-events-none absolute bottom-0 left-[calc(50%-960px)] -z-10 w-[1920px] max-w-none select-none"
      />
      <motion.div
        variants={pinIn}
        aria-hidden
        className="pointer-events-none absolute bottom-[45.7px] left-[max(0px,calc(50%-944px))] -z-10 hidden size-[196.3px] origin-bottom place-items-center lg:grid"
      >
        <img src={pin} alt="" width={138.82} height={138.82} className="w-[70.72%] -rotate-[44.17deg]" />
      </motion.div>

      {/* guias verticais do grid */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[calc(50%-660px)] hidden w-px bg-line min-[1400px]:block" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[calc(50%+659px)] hidden w-px bg-line min-[1400px]:block" />

      <motion.div
        variants={boxIn}
        className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-12 border border-line bg-bg-alt px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:gap-20 lg:px-[60px] lg:py-20"
      >
        <div className="flex flex-1 flex-col gap-10">
          <div className="flex flex-col gap-6">
            <motion.h2
              variants={reveal(0)}
              className="text-[clamp(32px,2.4vw+12px,44px)] leading-[1.09] font-medium tracking-[-0.04em] text-ink"
            >
              Vote pra gente parar
              <br />
              na sua cidade.
            </motion.h2>
            <motion.p variants={reveal(1)} className="text-[17px] leading-7 text-muted lg:text-[18px]">
              Escolha a sua cidade e deixe o seu WhatsApp. A gente avisa quando ela entrar na rota.
            </motion.p>
          </div>

          {/* z-10: a lista de cidades abre por cima do bloco de baixo (que também anima e cria camada própria) */}
          <motion.div variants={reveal(2)} className="relative z-10">
            <SignupForm />
          </motion.div>

          <motion.div variants={reveal(3)} className="flex flex-col gap-3 border-t border-line pt-7">
            <p className="text-[13px] leading-[18px] text-subtle">Quer conhecer mais sobre o Squad?</p>
            <a href="https://squad.com" target="_blank" rel="noreferrer" className="group flex w-full max-w-[330px] flex-col gap-[15px]">
              <span className="flex items-center justify-between gap-4 text-[13px] leading-5 font-medium tracking-[-0.005em] text-ink">
                Agende uma reunião virtual com nosso time
                <img src={arrowUpRight} alt="" width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="h-px w-full origin-left bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[0.6]" />
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={photoIn}
          className="relative aspect-[560/600] w-full shrink-0 overflow-hidden bg-ink/10 lg:w-[min(560px,42vw)]"
        >
          <motion.img
            variants={photoZoom}
            src={photo}
            alt="Os seis agentes do Squad juntos numa loja Vivo"
            width={560}
            height={600}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
