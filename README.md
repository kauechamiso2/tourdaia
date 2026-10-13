# tourdaia

Landing page — Vite + React + TypeScript + Tailwind CSS v4 + Motion.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + build de produção em dist/
npm run preview  # serve o build
npm run lint     # oxlint
npm run dev:vivo # versão para aprovação da Vivo (vídeos com a marca + bloco roxo)
npm run deploy   # publica no GitHub Pages: /tourdaia/ (pública) e /tourdaia/vivo/ (aprovação Vivo)
```

## Estrutura

```
src/
  sections/        # uma pasta por seção da LP (Hero/…)
  components/      # peças compartilhadas entre seções (SiteHeader…)
  assets/<seção>/  # imagens e SVGs exportados do Figma, por seção
  lib/             # helpers (cn…)
  index.css        # tokens do design (@theme), container-page + estilos base
```

Imports absolutos via `@/` (ex: `import { cn } from '@/lib/cn'`).

## Versões

`VITE_VARIANT=vivo` troca o que está em `src/variants/vivo.ts` (vídeos do hero com
lojas Vivo, foto do time com o letreiro Vivo e a seção de parceria). Sem a variável —
caso do projeto `tourdaia` na Vercel — o build sai com `src/variants/default.ts` e os assets da Vivo não
entram no pacote.

Na Vercel, cada push na `main` publica os dois projetos:
`tourdaia` → https://tourdaia.vercel.app (pública) e
`tourdaia-vivo` (variável `VITE_VARIANT=vivo`) → https://tourdaia-vivo.vercel.app (aprovação).
