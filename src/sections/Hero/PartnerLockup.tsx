import logoSquad from '@/assets/partner/logo-squad.svg'
import logoVivo from '@/assets/partner/logo-vivo.svg'
import plus from '@/assets/partner/plus.svg'
import { enter } from '@/lib/motion'
import { motion, type Variants } from 'motion/react'

/*
 * "squad.com + vivo" acima do título do hero — só na versão Vivo (entra via
 * src/variants/vivo.ts, então não pesa na versão pública). Mesmos logos e
 * proporções da seção de parceria, em escala menor.
 */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: enter(0.15, 1.1) },
}

export function PartnerLockup() {
  return (
    <motion.p variants={fadeUp} aria-label="squad.com + Vivo" className="flex items-center gap-[clamp(14px,1.2vw,22px)]">
      <img src={logoSquad} alt="" width={243.74} height={43.98} className="h-auto w-[clamp(104px,8.2vw,150px)]" />
      <img src={plus} alt="" width={23.33} height={23.33} className="h-auto w-[clamp(11px,0.8vw,15px)]" />
      <img src={logoVivo} alt="" width={121.21} height={45.17} className="h-auto w-[clamp(52px,4.1vw,75px)]" />
    </motion.p>
  )
}
