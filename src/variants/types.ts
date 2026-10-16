import type { ComponentType } from 'react'

export type StopKey = 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'

/*
 * O que muda entre as versões do site. `@variant` aponta para default.ts ou
 * vivo.ts conforme VITE_VARIANT no build (ver vite.config.ts) — a versão que
 * não está em uso nem entra no pacote.
 */
export type Variant = {
  /* vídeo + capa de cada parada do mapa do hero */
  stopMedia: Record<StopKey, { video: string; poster: string }>
  /* foto do time na seção de inscrição */
  teamPhoto: string
  /* seção de parceria (bloco roxo); null = escondida */
  Partner: ComponentType | null
  /* "squad.com + vivo" acima do título do hero; null = sem */
  HeroLockup: ComponentType | null
}
