import { EASE_OUT_EXPO } from '@/lib/motion'
import { motion, type Variants } from 'motion/react'
import { AgentMedia } from './AgentMedia'
import type { Agent } from './agents'

/*
 * Card de agente, sempre no mesmo tamanho base (420 × 618 — Figma tinha 642 com
 * mídia de 364×300; a mídia virou um quadrado de 240). Os cards de
 * trás são o mesmo card escalado pelo carrossel.
 * Ao virar o ativo, nome, descrição e ferramentas reaparecem em cascata.
 */

const reveal = (i: number): Variants => ({
  idle: { opacity: 1, y: 0 },
  active: {
    opacity: [0.15, 1],
    y: [8, 0],
    transition: { delay: 0.12 + i * 0.035, duration: 0.7, ease: EASE_OUT_EXPO },
  },
})

type Props = { agent: Agent; active: boolean; preload: 'auto' | 'none' }

export function AgentCard({ agent, active, preload }: Props) {
  return (
    <motion.article
      initial={false}
      animate={active ? 'active' : 'idle'}
      className="flex h-[618px] w-[420px] flex-col gap-5 overflow-hidden bg-bg-alt p-7"
    >
      <AgentMedia agent={agent} active={active} preload={preload} />

      <div className="flex flex-col gap-[10px]">
        {/* nome: presença própria (22px semibold), mas abaixo do departamento na hierarquia */}
        <motion.p variants={reveal(0)} className="text-[22px] leading-7 font-semibold tracking-[-0.02em] text-ink">
          {agent.name}
        </motion.p>
        <motion.h3 variants={reveal(1)} className="text-[44px] leading-[48px] font-medium tracking-[-0.04em] text-ink">
          {agent.role}
        </motion.h3>
        <motion.p variants={reveal(2)} className="text-[15px] leading-6 text-muted">
          {agent.description}
        </motion.p>
        <motion.p variants={reveal(3)} className="text-[15px] leading-6 text-muted">
          Ferramentas:
        </motion.p>
        <ul className="flex flex-wrap gap-[6px]">
          {agent.tools.map((tool, i) => (
            <motion.li
              key={tool}
              variants={reveal(4 + i)}
              className="border border-line px-[10px] py-[5px] text-[13px] leading-[18px] text-ink"
            >
              {tool}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
