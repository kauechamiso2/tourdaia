import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { Agent } from './agents'

/*
 * Personagem do card: quadrado de 240 centralizado. Fora de destaque: quadro congelado (`still`).
 * Em destaque: o vídeo começa exatamente nesse quadro e segue em loop — sem
 * pulo na troca. Ao sair do destaque, o vídeo some por cima do still e só
 * depois pausa e volta para o quadro congelado.
 */
const FADE_S = 0.45

type Props = { agent: Agent; active: boolean; preload: 'auto' | 'none' }

export function AgentMedia({ agent, active, preload }: Props) {
  const video = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const play = active && !reduceMotion
  // vídeo por cima só enquanto está em destaque e de fato tocando
  const visible = play && playing

  useEffect(() => {
    const v = video.current
    if (!v) return

    if (play) {
      const start = () => {
        v.currentTime = agent.stillAt
        v.play().catch(() => {})
      }
      if (v.readyState >= 1) start()
      else v.addEventListener('loadedmetadata', start, { once: true })
      return () => v.removeEventListener('loadedmetadata', start)
    }

    // sai do destaque: o vídeo some (visible = false) e só pausa depois do fade
    const t = window.setTimeout(() => {
      v.pause()
      if (v.readyState >= 1) v.currentTime = agent.stillAt
    }, FADE_S * 1000)
    return () => window.clearTimeout(t)
  }, [play, agent.stillAt])

  return (
    <div className="relative mx-auto size-[240px] shrink-0 overflow-hidden bg-placeholder">
      <img
        src={agent.still}
        alt=""
        width={240}
        height={240}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <motion.video
        ref={video}
        src={agent.video}
        preload={preload}
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-hidden
        className="absolute inset-0 size-full object-cover"
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: visible ? 0.25 : FADE_S, ease: 'easeOut' }}
      />
    </div>
  )
}
