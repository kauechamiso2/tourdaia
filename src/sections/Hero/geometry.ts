import type { CSSProperties } from 'react'

/*
 * Medidas do Figma (frame "hero-visual", 612 × 638.53) + o card da parada mais à
 * direita, que transborda 126px → caixa total de 738 × 638.53.
 * Tudo é posicionado em % dessa caixa para escalar sem perder a composição.
 */
export const BOX_W = 738
export const BOX_H = 638.53
export const MAP_W = 612

export const box = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: `${(x / BOX_W) * 100}%`,
  top: `${(y / BOX_H) * 100}%`,
  width: `${(w / BOX_W) * 100}%`,
  height: `${(h / BOX_H) * 100}%`,
})

/* Ponta do pin (quadrado de 69.63 girado ~45° dentro da caixa de 98.46). */
export const pinTip = (x: number, y: number) => ({ x: x + 49.23, y: y + 23 + 98.46 })
