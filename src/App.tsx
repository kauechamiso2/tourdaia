import { Footer } from '@/sections/Footer'
import { Hero } from '@/sections/Hero'
import { HowItWorks } from '@/sections/HowItWorks'
// Parceria Squad + Vivo: escondida por enquanto (código e vídeo seguem em src/sections/Partner).
// Para voltar: reimportar e recolocar <Partner /> entre <Team /> e <Route />,
// e devolver py-24 lg:py-40 em Team e Route (hoje com o respiro reduzido entre eles).
// import { Partner } from '@/sections/Partner'
import { Route } from '@/sections/Route'
import { Signup } from '@/sections/Signup'
import { Team } from '@/sections/Team'
import { MotionConfig } from 'motion/react'

export default function App() {
  return (
    // respeita "reduzir movimento" do sistema: sem deslocamentos, só opacidade
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <HowItWorks />
        <Team />
        <Route />
        <Signup />
      </main>
      <Footer />
    </MotionConfig>
  )
}
