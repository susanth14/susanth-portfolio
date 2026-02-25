import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'

const roles = ['Manual Testing Engineer', 'Front-End Developer', 'Automation Engineer']

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
      {/* Decorative blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-32 left-1/4 w-64 h-64 bg-green-400/20 dark:bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-emerald-300/15 dark:bg-emerald-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center">

          {/* Avatar — entrance + float + spinning ring */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
            className="relative w-36 h-36 mx-auto mb-8"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.8 }}
              className="relative w-full h-full"
            >
              {/* Spinning conic gradient ring */}
              <div
                className="absolute -inset-2 rounded-full spin-slow opacity-80"
                style={{ background: 'conic-gradient(from 0deg, #16a34a, #4ade80, #a3e635, #16a34a)' }}
              />
              {/* White gap */}
              <div className="absolute -inset-1 rounded-full bg-white dark:bg-dark-bg" />
              {/* Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                <picture>
                  <source srcSet="/image.webp" type="image/webp" />
                  <img
                    src="/image.png"
                    alt="Susanth Jegadeesan"
                    className="w-full h-full object-cover object-top"
                    fetchPriority="high"
                    decoding="async"
                    width="144"
                    height="144"
                  />
                </picture>
              </div>
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          >
            Susanth{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 dark:from-primary-dark dark:to-accent">Jegadeesan</span>
          </motion.h1>

          {/* Cycling role badge */}
          <div className="flex justify-center mb-6 h-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="px-5 py-1.5 glass rounded-full text-sm font-semibold text-primary dark:text-primary-dark glow-green"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            QA Test Engineer with expertise in{' '}
            <span className="text-primary dark:text-primary-dark font-semibold">Playwright automation</span>{' '}
            and a strong background in{' '}
            <span className="text-primary dark:text-primary-dark font-semibold">React.js development</span>.
            Building quality software through comprehensive testing and clean code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-7 py-3 bg-gradient-to-r from-primary to-emerald-500 dark:from-primary-dark dark:to-emerald-400 text-white dark:text-dark-bg rounded-2xl font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-shadow"
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.preventDefault(); document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-7 py-3 glass rounded-2xl font-semibold text-primary dark:text-primary-dark hover:glow-green transition-all"
            >
              View My Work
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: FaEnvelope, href: 'mailto:susanthj14@gmail.com', label: 'Email' },
              { icon: FaPhone, href: 'tel:+918754326992', label: 'Phone' },
              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/susanth-j-597713227/', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-3.5 glass rounded-2xl text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors hover:glow-green"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 glass rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 bg-primary dark:bg-primary-dark rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
