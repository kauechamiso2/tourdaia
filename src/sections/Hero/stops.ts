import centroOestePoster from '@/assets/hero/stops/centro-oeste-poster.jpg'
import centroOeste from '@/assets/hero/stops/centro-oeste.mp4'
import nordestePoster from '@/assets/hero/stops/nordeste-poster.jpg'
import nordeste from '@/assets/hero/stops/nordeste.mp4'
import nortePoster from '@/assets/hero/stops/norte-poster.jpg'
import norte from '@/assets/hero/stops/norte.mp4'
import sudestePoster from '@/assets/hero/stops/sudeste-poster.jpg'
import sudeste from '@/assets/hero/stops/sudeste.mp4'
import sulPoster from '@/assets/hero/stops/sul-poster.jpg'
import sul from '@/assets/hero/stops/sul.mp4'

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
  { region: 'Norte', states: ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'], x: 135, y: 17.765, video: norte, poster: nortePoster },
  { region: 'Nordeste', states: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'], x: 456, y: 95.765, video: nordeste, poster: nordestePoster },
  { region: 'Centro-Oeste', states: ['DF', 'GO', 'MS', 'MT'], x: 190, y: 188.765, video: centroOeste, poster: centroOestePoster },
  { region: 'Sudeste', states: ['ES', 'MG', 'RJ', 'SP'], x: 396, y: 275.765, video: sudeste, poster: sudestePoster },
  { region: 'Sul', states: ['PR', 'RS', 'SC'], x: 270, y: 411.765, video: sul, poster: sulPoster },
]
