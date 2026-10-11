# tourdaia

Landing page — Vite + React + TypeScript + Tailwind CSS v4 + Motion.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + build de produção em dist/
npm run preview  # serve o build
npm run lint     # oxlint
npm run deploy   # build com base /tourdaia/ e publica na branch gh-pages (GitHub Pages)
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
