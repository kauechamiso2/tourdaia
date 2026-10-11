import { useEffect, useState } from 'react'

/*
 * Segura a animação de entrada até as webfonts carregarem, para o título não
 * trocar de fonte no meio do movimento. Timeout evita travar em rede lenta.
 */
export function useFontsReady(timeout = 1200) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let done = false
    const go = () => {
      if (done) return
      done = true
      setReady(true)
    }
    document.fonts.ready.then(go)
    const t = window.setTimeout(go, timeout)
    return () => window.clearTimeout(t)
  }, [timeout])

  return ready
}
