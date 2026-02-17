import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'

function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
      {/* Extra decorative blobs for hero */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-32 left-1/4 w-64 h-64 bg-green-400/20 dark:bg-green-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-emerald-300/15 dark:bg-emerald-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
            className="relative w-36 h-36 mx-auto mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-emerald-400 to-accent opacity-80 blur-md animate-pulse" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-white/30 dark:ring-white/10">
              SJ
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary dark:text-primary-dark font-mono text-sm mb-3 tracking-wider"
          >
            &lt; Hello World /&gt;
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          >
            Susanth{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 dark:from-primary-dark dark:to-accent">
              Jegadeesan
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-6"
          >
            <span className="px-4 py-1.5 glass rounded-full text-sm font-medium text-primary dark:text-primary-dark glow-green">
              QA Test Engineer
            </span>
            <span className="px-4 py-1.5 glass rounded-full text-sm font-medium text-emerald-700 dark:text-accent">
              Front-End Developer
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-7 py-3 bg-gradient-to-r from-primary to-emerald-500 dark:from-primary-dark dark:to-emerald-400 text-white dark:text-dark-bg rounded-2xl font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-all hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
            <a
              href="#experience"
              onClick={(e) => { e.preventDefault(); document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-7 py-3 glass rounded-2xl font-semibold text-primary dark:text-primary-dark hover:glow-green transition-all hover:-translate-y-0.5"
            >
              View My Work
            </a>
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
              { icon: FaLinkedin, href: 'https://linkedin.com/in/susanth-j-597713227', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-3.5 glass rounded-2xl text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-all hover:-translate-y-1 hover:glow-green"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
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
