import arrowRight from '@/assets/signup/arrow-right.svg'
import { cn } from '@/lib/cn'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useMemo, useState, type FormEvent } from 'react'
import { Combobox } from './Combobox'
import { STATES } from './data/states'

type CitiesByUF = Record<string, string[]>

/* 5.571 municípios (IBGE) — carregados só quando o formulário aparece */
let citiesCache: Promise<CitiesByUF> | null = null
const loadCities = () => (citiesCache ??= import('./data/municipios.json').then((m) => m.default as CitiesByUF))

const STATE_OPTIONS = STATES.map((s) => ({ value: s.uf, label: s.name }))

/*
 * Figma "Form / Inscrição" (Vazio · Preenchido · Enviado).
 * Estado → cidade (todos os municípios do IBGE) + WhatsApp, obrigatórios; o
 * botão habilita com tudo preenchido e o envio troca o formulário pelo cartão
 * de sucesso.
 * TODO: ligar o envio ao backend/CRM — hoje só registra localmente.
 */

/* (11) 9 0000-0000 */
const formatPhone = (raw: string) => {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 3) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`
}

const swap = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.25 } },
}

export function SignupForm() {
  const id = useId()
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')
  const [cities, setCities] = useState<CitiesByUF | null>(null)

  useEffect(() => {
    loadCities().then(setCities)
  }, [])

  const cityOptions = useMemo(
    () => (uf && cities ? cities[uf].map((c) => ({ value: c, label: c })) : []),
    [uf, cities],
  )
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)

  const valid = Boolean(uf && city) && phone.replace(/\D/g, '').length === 11

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setSent(true)
  }


  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div key="sent" {...swap} role="status" className="flex flex-col gap-4 border border-ink p-7">
          <p className="flex items-center gap-[10px] font-mono text-[11px] leading-4 tracking-[0.113em] text-ink">
            <span aria-hidden className="size-[7px] bg-accent" />
            VOTO REGISTRADO
          </p>
          <p className="text-[24px] leading-[30px] font-medium tracking-[-0.02em] text-ink">
            Valeu! {city} tem mais um voto.
          </p>
          <p className="text-[15px] leading-6 text-muted">
            A gente avisa no seu WhatsApp quando a sua cidade entrar na rota. Quanto mais gente votar, maior a chance.
          </p>
        </motion.div>
      ) : (
        <motion.form key="form" {...swap} onSubmit={submit} noValidate className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-3">
            <Combobox
              label="Seu estado"
              placeholder="Estado"
              searchPlaceholder="Buscar estado…"
              options={STATE_OPTIONS}
              value={uf}
              onChange={(v) => {
                if (v !== uf) setCity('')
                setUf(v)
              }}
            />
            <Combobox
              label="Sua cidade"
              placeholder={uf ? 'Selecione sua cidade' : 'Escolha o estado'}
              searchPlaceholder="Buscar cidade…"
              options={cityOptions}
              value={city}
              onChange={setCity}
              disabled={!uf}
              loading={Boolean(uf) && !cities}
              withPin
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-phone`} className="text-[13px] leading-[18px] font-medium tracking-[-0.01em] text-ink">
              Seu WhatsApp
            </label>
            <div className="flex h-[52px] items-center border border-subtle bg-bg-alt pr-[14px] transition-colors duration-200 focus-within:border-ink hover:border-ink">
              <span className="flex h-full items-center border-r border-line pr-[14px] pl-4 text-base leading-6 text-ink">+55</span>
              <input
                id={`${id}-phone`}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(11) 9 0000-0000"
                className="w-full flex-1 bg-transparent pl-[14px] text-base leading-6 text-ink outline-none placeholder:text-subtle"
              />
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={!valid}
              className={cn(
                'group flex h-[52px] w-full items-center justify-center gap-[10px] rounded-full px-6 text-[13px] leading-5 font-medium tracking-[-0.005em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
                valid ? 'bg-ink text-bg-alt hover:bg-ink-hover' : 'cursor-not-allowed bg-ink text-subtle',
              )}
            >
              Votar e receber novidades
              <img
                src={arrowRight}
                alt=""
                width={16}
                height={16}
                className={cn('transition-[transform,filter] duration-300', valid && 'brightness-0 invert group-hover:translate-x-0.5')}
              />
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
