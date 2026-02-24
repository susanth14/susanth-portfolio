import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

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
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
