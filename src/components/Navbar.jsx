import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { BsSun, BsMoon } from 'react-icons/bs'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
]

function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)

      const sections = navLinks.map(link => link.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <m.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <m.a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            className="shrink-0 relative"
            whileHover={{ scale: 1.12, rotate: 8 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {/* Spinning ring */}
            <div
              className="absolute -inset-0.5 rounded-xl spin-slow opacity-90"
              style={{ background: 'conic-gradient(from 0deg, #16a34a, #4ade80, #a3e635, #16a34a)' }}
            />
            {/* Badge */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-emerald-500 dark:from-primary-dark dark:to-accent flex items-center justify-center shadow-md">
              <m.span
                className="text-white dark:text-dark-bg text-sm font-bold tracking-tight"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              >
                SJ
              </m.span>
            </div>
          </m.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-primary dark:text-primary-dark glass glow-green'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark hover:bg-white/30 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2.5 rounded-xl glass text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <BsSun size={16} /> : <BsMoon size={16} />}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl glass text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <BsSun size={16} /> : <BsMoon size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl glass text-gray-600 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-emerald-400 to-accent transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`block px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeSection === link.href.slice(1)
                      ? 'text-primary dark:text-primary-dark glass'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
  )
}

export default Navbar
