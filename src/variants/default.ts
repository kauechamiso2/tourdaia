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
import teamPhoto from '@/assets/signup/team-photo@2x.webp'
import type { Variant } from './types'

/* Versão pública (produção / Vercel): sem marca Vivo. */
export const variant: Variant = {
  stopMedia: {
    norte: { video: norte, poster: nortePoster },
    nordeste: { video: nordeste, poster: nordestePoster },
    'centro-oeste': { video: centroOeste, poster: centroOestePoster },
    sudeste: { video: sudeste, poster: sudestePoster },
    sul: { video: sul, poster: sulPoster },
  },
  teamPhoto,
  Partner: null,
  HeroLockup: null,
}
