import { Footer } from '@/sections/Footer'
import { Hero } from '@/sections/Hero'
import { HowItWorks } from '@/sections/HowItWorks'
import { Partner } from '@/sections/Partner'
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
        <Partner />
        <Route />
        <Signup />
      </main>
      <Footer />
    </MotionConfig>
  )
}
