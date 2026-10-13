import { Footer } from '@/sections/Footer'
import { Hero } from '@/sections/Hero'
import { HowItWorks } from '@/sections/HowItWorks'
import { Route } from '@/sections/Route'
import { Signup } from '@/sections/Signup'
import { Team } from '@/sections/Team'
import { variant } from '@variant'
import { MotionConfig } from 'motion/react'

export default function App() {
  return (
    // respeita "reduzir movimento" do sistema: sem deslocamentos, só opacidade
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <HowItWorks />
        <Team />
        {/* parceria Squad + Vivo: só na versão vivo (ver src/variants) */}
        {variant.Partner && <variant.Partner />}
        <Route />
        <Signup />
      </main>
      <Footer />
    </MotionConfig>
  )
}
