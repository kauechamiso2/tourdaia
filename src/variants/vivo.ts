import centroOestePoster from '@/assets/vivo/stops/centro-oeste-poster.jpg'
import centroOeste from '@/assets/vivo/stops/centro-oeste.mp4'
import nordestePoster from '@/assets/vivo/stops/nordeste-poster.jpg'
import nordeste from '@/assets/vivo/stops/nordeste.mp4'
import nortePoster from '@/assets/vivo/stops/norte-poster.jpg'
import norte from '@/assets/vivo/stops/norte.mp4'
import sudestePoster from '@/assets/vivo/stops/sudeste-poster.jpg'
import sudeste from '@/assets/vivo/stops/sudeste.mp4'
import sulPoster from '@/assets/vivo/stops/sul-poster.jpg'
import sul from '@/assets/vivo/stops/sul.mp4'
import teamPhoto from '@/assets/vivo/team-photo@2x.webp'
import { PartnerLockup } from '@/sections/Hero/PartnerLockup'
import { Partner } from '@/sections/Partner'
import type { Variant } from './types'

/* Versão para aprovação da Vivo: lojas com a marca Vivo + bloco roxo da parceria. */
export const variant: Variant = {
  stopMedia: {
    norte: { video: norte, poster: nortePoster },
    nordeste: { video: nordeste, poster: nordestePoster },
    'centro-oeste': { video: centroOeste, poster: centroOestePoster },
    sudeste: { video: sudeste, poster: sudestePoster },
    sul: { video: sul, poster: sulPoster },
  },
  teamPhoto,
  Partner,
  HeroLockup: PartnerLockup,
}
