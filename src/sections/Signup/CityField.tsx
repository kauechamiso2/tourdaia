import chevronDown from '@/assets/signup/chevron-down.svg'
import mapPinFilled from '@/assets/signup/map-pin-filled.svg'
import mapPin from '@/assets/signup/map-pin.svg'
import search from '@/assets/signup/search.svg'
import { cn } from '@/lib/cn'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { CITIES } from './cities'

/*
 * Figma "Field / Cidade" (Vazio · Aberto · Selecionado).
 * Combobox: abre um painel com busca + até 5 sugestões. Se a cidade não
 * estiver na lista, Enter usa o texto digitado.
 */
const MAX_OPTIONS = 5
const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export function CityField({ value, onChange }: { value: string; onChange: (city: string) => void }) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const searchInput = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [hover, setHover] = useState(0)

  const options = useMemo(() => {
    const q = normalize(query.trim())
    return (q ? CITIES.filter((c) => normalize(c).includes(q)) : CITIES).slice(0, MAX_OPTIONS)
  }, [query])

  // fecha ao clicar fora
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const choose = (city: string) => {
    onChange(city)
    setOpen(false)
    setQuery('')
  }

  const toggle = () => {
    setOpen((o) => !o)
    setHover(0)
    requestAnimationFrame(() => searchInput.current?.focus())
  }

  return (
    <div ref={root} className="relative flex flex-col gap-2">
      <label htmlFor={`${id}-trigger`} className="text-[13px] leading-[18px] font-medium tracking-[-0.01em] text-ink">
        Sua cidade
      </label>
      <button
        id={`${id}-trigger`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={toggle}
        className={cn(
          'flex h-[52px] w-full items-center gap-[10px] bg-bg-alt pr-[14px] pl-4 text-left transition-[border-color,box-shadow] duration-200 focus-visible:outline-none',
          open ? 'border-[1.5px] border-ink' : 'border border-subtle hover:border-ink focus-visible:border-ink',
        )}
      >
        <img src={value ? mapPinFilled : mapPin} alt="" width={18} height={18} />
        <span className={cn('flex-1 truncate text-base leading-6', value ? 'text-ink' : 'text-subtle')}>
          {value || 'Selecione sua cidade'}
        </span>
        <img
          src={chevronDown}
          alt=""
          width={18}
          height={18}
          className={cn('transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 left-0 z-20 mt-2 origin-top border border-ink bg-bg-alt py-2 drop-shadow-[0_12px_16px_rgba(18,18,15,0.08)]"
          >
            <div className="flex h-11 items-center gap-[10px] border-b border-line px-4 pt-1 pb-2">
              <img src={search} alt="" width={16} height={16} />
              <input
                ref={searchInput}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setHover(0)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setHover((h) => Math.min(h + 1, options.length - 1))
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setHover((h) => Math.max(h - 1, 0))
                  } else if (e.key === 'Enter') {
                    e.preventDefault()
                    const typed = query.trim()
                    if (options[hover]) choose(options[hover])
                    else if (typed) choose(typed)
                  } else if (e.key === 'Escape') {
                    setOpen(false)
                  }
                }}
                role="combobox"
                aria-expanded
                aria-controls={`${id}-list`}
                aria-activedescendant={options[hover] ? `${id}-opt-${hover}` : undefined}
                placeholder="Buscar cidade…"
                className="w-full flex-1 bg-transparent text-base leading-6 text-ink outline-none placeholder:text-subtle"
              />
            </div>

            <ul id={`${id}-list`} role="listbox" aria-label="Cidades">
              {options.map((city, i) => (
                <li
                  key={city}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={city === value}
                  onPointerEnter={() => setHover(i)}
                  onClick={() => choose(city)}
                  className={cn(
                    'flex h-11 cursor-pointer items-center px-4 text-base leading-6 text-ink transition-colors duration-150',
                    i === hover && 'bg-placeholder',
                  )}
                >
                  {city}
                </li>
              ))}
              {options.length === 0 && query.trim() && (
                <li
                  role="option"
                  aria-selected={false}
                  onClick={() => choose(query.trim())}
                  className="flex h-11 cursor-pointer items-center bg-placeholder px-4 text-base leading-6 text-ink"
                >
                  Usar “{query.trim()}”
                </li>
              )}
            </ul>

            <p className="flex h-11 items-center border-t border-line px-4 pt-2 text-[13px] leading-[18px] text-subtle">
              Não encontrou? Digite o nome que a gente anota.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
