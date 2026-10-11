import { cn } from '@/lib/cn'
import type { Step } from './steps'

const align = {
  start: 'items-start text-left',
  center: 'items-center text-center',
  end: 'items-end text-right',
}

/* Texto de um passo (todos acesos — o título do Figma usa peso bold). */
export function StepText({ step, alignTo = 'start' }: { step: Step; alignTo?: keyof typeof align }) {
  return (
    <div className={cn('flex flex-col gap-3 pt-6', align[alignTo])}>
      <p className="font-mono text-[11px] leading-4 tracking-[0.113em] text-subtle">{step.n}</p>
      <div className={cn('flex flex-col gap-[10px]', align[alignTo])}>
        <h3 className="text-[24px] leading-[30px] font-bold tracking-[-0.02em] text-ink">{step.title}</h3>
        <p className="max-w-[340px] text-[15px] leading-6 text-muted">{step.body}</p>
      </div>
    </div>
  )
}
