import { Hero } from '@/components/sections/Hero'
import { MusicLounge } from '@/components/sections/MusicLounge'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { OpenSource } from '@/components/sections/OpenSource'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <MusicLounge />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <OpenSource />
      <Contact />
    </>
  )
}

