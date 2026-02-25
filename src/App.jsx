import { useState, useEffect, lazy, Suspense } from 'react'
import { LazyMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const loadFeatures = () => import('./lib/motionFeatures').then(r => r.default)

const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Education = lazy(() => import('./components/Education'))
const Certifications = lazy(() => import('./components/Certifications'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) return JSON.parse(saved)
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  return (
    <LazyMotion features={loadFeatures}>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/20 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-x-hidden">
      {/* Global floating blobs for glassmorphism depth */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blob blob-1 -top-48 -left-48" />
        <div className="blob blob-2 top-1/3 -right-32" />
        <div className="blob blob-3 bottom-1/4 left-1/4" />
        <div className="blob blob-1 -bottom-32 right-1/3" />
      </div>

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
    </LazyMotion>
  )
}

export default App
