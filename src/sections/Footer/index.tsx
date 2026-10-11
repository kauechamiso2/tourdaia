import logoSquad from '@/assets/hero/logo-squad.svg'
import logoTourDaIa from '@/assets/hero/logo-tour-da-ia.svg'
import arrowUpRight from '@/assets/signup/arrow-up-right.svg'
import { enter } from '@/lib/motion'
import { motion, type Variants } from 'motion/react'

/*
 * Rodapé (sem frame no Figma — segue a linguagem do header e das seções):
 * logo à esquerda, colunas Redes / Download à direita (ref. enviada), linha e
 * copyright embaixo.
 */

type Link = { label: string; href: string }

const COLUMNS: Array<{ title: string; links: Link[] }> = [
  {
    title: 'Redes',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/squadcom_br/' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@squadcom_br' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/innerai/' },
    ],
  },
  {
    title: 'Download',
    links: [
      { label: 'iOS & Android', href: 'https://squad.com/download' },
      { label: 'Mac & Windows', href: 'https://squad.com/download' },
    ],
  },
]

const reveal = (i: number): Variants => ({
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: enter(i * 0.08, 1) },
})

export function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-canvas"
    >
      <div className="container-page flex flex-col gap-16 pt-20 pb-10 lg:pt-28">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <motion.a variants={reveal(0)} href="#" aria-label="Tour da IA, por squad.com — voltar ao topo" className="flex w-fit flex-col gap-3">
            <img src={logoTourDaIa} alt="" width={143} height={24.43} className="h-auto w-[180px] lg:w-[220px]" />
            <span className="flex items-center gap-[6px] opacity-60">
              <span className="font-inter text-[17.642px] leading-[25.66px] tracking-[-0.02em] text-black">por</span>
              <img src={logoSquad} alt="" width={85} height={15.34} className="mt-[3px]" />
            </span>
          </motion.a>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-10 sm:gap-20 lg:w-[min(560px,45%)]">
            {COLUMNS.map((col, i) => (
              <motion.div key={col.title} variants={reveal(1 + i)} className="flex flex-col gap-6">
                <h2 className="text-[17px] leading-6 font-semibold tracking-[-0.01em] text-ink">{col.title}</h2>
                <ul className="flex flex-col gap-4">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 text-[17px] leading-6 text-muted transition-colors duration-300 hover:text-ink focus-visible:text-ink focus-visible:outline-none"
                      >
                        {l.label}
                        <img
                          src={arrowUpRight}
                          alt=""
                          width={14}
                          height={14}
                          className="-translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </nav>
        </div>

        <motion.div variants={reveal(3)} className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] leading-5 text-subtle">© 2026 Tour da IA por Squad</p>
          <a href="#" className="w-fit font-mono text-[11px] leading-4 tracking-[0.113em] text-subtle transition-colors duration-300 hover:text-ink">
            VOLTAR AO TOPO ↑
          </a>
        </motion.div>
      </div>
    </motion.footer>
  )
}
