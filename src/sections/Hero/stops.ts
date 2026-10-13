import { variant } from '@variant'

export type Stop = {
  region: string
  /* UFs da região — ids "BR-XX" do SVG do mapa */
  states: string[]
  /* origem do grupo no Figma: x do pin, y do card (caixa 738 × 638.53) */
  x: number
  y: number
  video: string
  poster: string
}

/* Ordem do tour: norte → sul. Vídeos recortados para o card (182:112), sem áudio. */
export const STOPS: Stop[] = [
  { region: 'Norte', states: ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'], x: 135, y: 17.765, ...variant.stopMedia.norte },
  { region: 'Nordeste', states: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'], x: 456, y: 95.765, ...variant.stopMedia.nordeste },
  { region: 'Centro-Oeste', states: ['DF', 'GO', 'MS', 'MT'], x: 190, y: 188.765, ...variant.stopMedia['centro-oeste'] },
  { region: 'Sudeste', states: ['ES', 'MG', 'RJ', 'SP'], x: 396, y: 275.765, ...variant.stopMedia.sudeste },
  { region: 'Sul', states: ['PR', 'RS', 'SC'], x: 270, y: 411.765, ...variant.stopMedia.sul },
]
