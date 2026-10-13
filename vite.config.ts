import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'

/*
 * VITE_VARIANT=vivo gera a versão para aprovação da Vivo (vídeos com a marca
 * Vivo + bloco roxo). Sem a variável (Vercel / produção) sai a versão pública,
 * e os assets da Vivo nem entram no pacote.
 * Na Vercel: projeto `tourdaia` = versão pública; projeto `tourdaia-vivo`
 * (VITE_VARIANT=vivo) = versão de aprovação. Os dois publicam a partir da main.
 */
const variant = process.env.VITE_VARIANT === 'vivo' ? 'vivo' : 'default'

// GitHub Pages serve em /tourdaia/ (e a versão vivo em /tourdaia/vivo/); local e Vercel na raiz
const pagesBase = variant === 'vivo' ? '/tourdaia/vivo/' : '/tourdaia/'

/* a versão de aprovação não deve aparecer em buscadores */
const noindex: Plugin = {
  name: 'noindex',
  transformIndexHtml: (html) =>
    variant === 'vivo' ? html.replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>') : html,
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? pagesBase : '/',
  plugins: [react(), tailwindcss(), noindex],
  resolve: {
    alias: {
      '@variant': fileURLToPath(new URL(`./src/variants/${variant}.ts`, import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
