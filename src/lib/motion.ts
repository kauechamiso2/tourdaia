import type { Transition } from 'motion/react'

/* Curvas de entrada: desaceleração longa, sem "quique" — chega e assenta. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const

export const enter = (delay: number, duration = 1.1): Transition => ({
  delay,
  duration,
  ease: EASE_OUT_EXPO,
})
