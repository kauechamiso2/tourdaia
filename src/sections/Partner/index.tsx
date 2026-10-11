import logoSquad from '@/assets/partner/logo-squad.svg'
import logoVivo from '@/assets/partner/logo-vivo.svg'
import plus from '@/assets/partner/plus.svg'
import poster from '@/assets/partner/tour-reel-poster.jpg'
import reel from '@/assets/partner/tour-reel.mp4'
import { EASE_OUT_EXPO, enter } from '@/lib/motion'
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import { useEffect, useRef } from 'react'

/*
 * Figma: Marketing › "Parceria / Desktop · 1922" (116:24481).
 * Fundo roxo Vivo (#660099) com texto e logos em branco. Texto à esquerda;
 * mídia à direita (842 de 1920, altura inteira, ancorada pela base). As
 * medidas escalam com a largura (vw) a partir do frame de 1920.
 *
 * Mídia: um único vídeo em loop com um trecho de cada filme do Tour (grupo
 * primeiro, depois as 5 regiões), com crossfade e emenda invisível. Já vem
 * recortado no formato da coluna (1008×1080), com o enquadramento escolhido
 * cena a cena para manter personagem e cliente no quadro (no grupo, uma
 * panorâmica suave passa por todos). Só carrega/toca com a seção na tela.
 */

const reveal = (i: number): Variants => ({
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: enter(i * 0.08, 1.1) },
})

const mediaIn: Variants = {
  hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, ease: EASE_OUT_EXPO } },
}

export function Partner() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()

  // tocar só quando visível (e começar a baixar um pouco antes de aparecer)
  const near = useInView(section, { margin: '400px 0px' })
  const visible = useInView(section, { amount: 0.15 })
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (near && v.preload !== 'auto') v.preload = 'auto'
    if (visible && !reduceMotion) v.play().catch(() => {})
    else v.pause()
  }, [near, visible, reduceMotion])

  return (
    <motion.section
      ref={section}
      id="parceria"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="relative isolate grid bg-vivo text-white lg:min-h-[max(640px,min(100svh,900px))] lg:grid-cols-[1078fr_842fr]"
    >
      {/* mídia: coluna direita inteira, ancorada pela base (no mobile, em cima) */}
      <motion.div variants={mediaIn} className="relative aspect-[1008/1080] overflow-hidden bg-vivo lg:order-2 lg:aspect-auto">
        <video
          ref={video}
          src={reel}
          poster={poster}
          preload="none"
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden
          className="absolute inset-0 size-full object-cover object-bottom"
        />
      </motion.div>

      {/* texto: 183px da borda em 1920 (9.53vw), 710px de largura (36.98vw) */}
      <div className="flex flex-col justify-center px-[var(--gutter)] py-20 lg:order-1 lg:py-24 lg:pr-12 lg:pl-[clamp(var(--gutter),9.53vw,183px)]">
        <div className="flex w-full max-w-[710px] flex-col gap-10 lg:max-w-[max(36.98vw,520px)] lg:gap-[clamp(40px,2.95vw,57px)]">
          {/* logos em branco (o filtro fica em cada imagem: o bloco anima `filter: blur`) */}
          <motion.div variants={reveal(0)} className="flex items-center gap-[clamp(20px,1.84vw,35px)] lg:pl-[clamp(8px,0.63vw,12px)]">
            <img src={logoSquad} alt="squad.com" width={243.74} height={43.98} className="h-auto w-[clamp(150px,12.69vw,243.74px)] brightness-0 invert" />
            <img src={plus} alt="+" width={23.33} height={23.33} className="h-auto w-[clamp(16px,1.215vw,23.33px)] brightness-0 invert" />
            <img src={logoVivo} alt="Vivo" width={121.21} height={45.17} className="h-auto w-[clamp(75px,6.31vw,121.21px)] brightness-0 invert" />
          </motion.div>

          <div className="flex flex-col gap-[clamp(14px,1.02vw,19.5px)]">
            <motion.h2
              variants={reveal(1)}
              className="text-[clamp(34px,2.8vw,53.68px)] leading-[1.091] font-medium tracking-[-0.04em] text-white"
            >
              Squad e Vivo se juntaram para democratizar IA
            </motion.h2>
            <motion.p variants={reveal(2)} className="text-[clamp(17px,1.144vw,21.96px)] leading-[1.556] text-white/85">
              Juntamos forças com parceiros presentes em todo o Brasil pra levar o Tour da IA até lojas na sua cidade e
              garantir uma condição especial para clientes <strong className="font-bold text-white">Vivo</strong>.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
