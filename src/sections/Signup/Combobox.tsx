import chevronDown from '@/assets/signup/chevron-down.svg'
import mapPinFilled from '@/assets/signup/map-pin-filled.svg'
import mapPin from '@/assets/signup/map-pin.svg'
import search from '@/assets/signup/search.svg'
import { cn } from '@/lib/cn'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

/*
 * Figma "Field / Cidade" (Vazio · Aberto · Selecionado), generalizado para
 * estado e cidade. Painel com busca (ignora acentos) e lista rolável;
 * teclado: setas, Enter, Esc.
 */
export type Option = { value: string; label: string }

const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

type Props = {
  label: string
  placeholder: string
  searchPlaceholder: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  loading?: boolean
  withPin?: boolean
}

export function Combobox({ label, placeholder, searchPlaceholder, options, value, onChange, disabled, loading, withPin }: Props) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const searchInput = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [hover, setHover] = useState(0)

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return q ? options.filter((o) => normalize(o.label).includes(q)) : options
  }, [query, options])

  const selected = options.find((o) => o.value === value)

  // fecha ao clicar fora
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // mantém a opção destacada visível ao navegar pelo teclado
  useEffect(() => {
    list.current?.children[hover]?.scrollIntoView({ block: 'nearest' })
  }, [hover])

  const choose = (v: string) => {
    onChange(v)
    setOpen(false)
    setQuery('')
  }

  const toggle = () => {
    if (disabled) return
    setOpen((o) => !o)
    setQuery('')
    setHover(Math.max(0, options.findIndex((o) => o.value === value)))
    requestAnimationFrame(() => searchInput.current?.focus())
  }

  return (
    <div ref={root} className="relative flex min-w-0 flex-col gap-2">
      <label htmlFor={`${id}-trigger`} className="text-[13px] leading-[18px] font-medium tracking-[-0.01em] text-ink">
        {label}
      </label>
      <button
        id={`${id}-trigger`}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={toggle}
        className={cn(
          'flex h-[52px] w-full items-center gap-[10px] bg-bg-alt pr-[14px] pl-4 text-left transition-[border-color,opacity] duration-200 focus-visible:outline-none',
          open ? 'border-[1.5px] border-ink' : 'border border-subtle enabled:hover:border-ink focus-visible:border-ink',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        {withPin && <img src={selected ? mapPinFilled : mapPin} alt="" width={18} height={18} />}
        <span className={cn('min-w-0 flex-1 truncate text-base leading-6', selected ? 'text-ink' : 'text-subtle')}>
          {loading ? 'Carregando…' : selected?.label || placeholder}
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
            className="absolute top-full left-0 z-20 mt-2 w-full min-w-[260px] origin-top border border-ink bg-bg-alt py-2 drop-shadow-[0_12px_16px_rgba(18,18,15,0.08)]"
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
                    setHover((h) => Math.min(h + 1, filtered.length - 1))
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setHover((h) => Math.max(h - 1, 0))
                  } else if (e.key === 'Enter') {
                    e.preventDefault()
                    if (filtered[hover]) choose(filtered[hover].value)
                  } else if (e.key === 'Escape') {
                    setOpen(false)
                  }
                }}
                role="combobox"
                aria-expanded
                aria-controls={`${id}-list`}
                aria-activedescendant={filtered[hover] ? `${id}-opt-${hover}` : undefined}
                placeholder={searchPlaceholder}
                className="w-full flex-1 bg-transparent text-base leading-6 text-ink outline-none placeholder:text-subtle"
              />
            </div>

            {/* 5 opções visíveis (44px cada), o resto rola */}
            <ul
              ref={list}
              id={`${id}-list`}
              role="listbox"
              aria-label={label}
              className="max-h-[220px] overflow-y-auto overscroll-contain"
            >
              {filtered.map((o, i) => (
                <li
                  key={o.value}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={o.value === value}
                  onPointerEnter={() => setHover(i)}
                  onClick={() => choose(o.value)}
                  className={cn(
                    'flex h-11 shrink-0 cursor-pointer items-center px-4 text-base leading-6 text-ink transition-colors duration-150',
                    i === hover && 'bg-placeholder',
                  )}
                >
                  <span className="truncate">{o.label}</span>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="flex h-11 items-center px-4 text-[13px] leading-[18px] text-subtle">Nada encontrado para “{query.trim()}”.</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
