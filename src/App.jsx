import StatusBar from './components/StatusBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Terminal from './components/Terminal'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <StatusBar />
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Timeline />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
