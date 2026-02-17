import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { BsSun, BsMoon } from 'react-icons/bs'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
]

function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" onClick={(e) => handleClick(e, '#home')} className="text-xl font-bold text-primary dark:text-primary-dark drop-shadow-sm">
            &lt;SJ /&gt;
          </a>

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

      <AnimatePresence>
        {isOpen && (
          <motion.div
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
