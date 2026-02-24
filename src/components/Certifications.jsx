import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCertificate } from 'react-icons/fa'
import { SiReact, SiNodedotjs } from 'react-icons/si'
import { VscBeaker } from 'react-icons/vsc'

const certifications = [
  {
    title: 'Playwright: Web Automation Testing From Zero to Hero',
    issuer: 'Skillzen',
    year: '2025',
    icon: VscBeaker,
    color: '#2EAD33',
  },
  {
    title: 'React.js - The Complete Guide (Hooks, React Router, Vite)',
    issuer: 'Udemy',
    year: '2024',
    icon: SiReact,
    color: '#61DAFB',
  },
  {
    title: 'Node.js - The Complete Guide (CRUD Operations)',
    issuer: 'Udemy',
    year: '2024',
    icon: SiNodedotjs,
    color: '#339933',
  },
]

function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 dark:from-primary-dark dark:to-accent">
              Certifications
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">Professional development & learning</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                className="glass rounded-2xl p-6 hover:glow-green transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 glass-subtle rounded-xl">
                    <cert.icon size={28} style={{ color: cert.color }} />
                  </div>
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400 glass-subtle px-2.5 py-1 rounded-full">
                    {cert.year}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-relaxed mb-3 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <FaCertificate size={12} className="text-primary/50 dark:text-primary-dark/50" />
                  <span className="text-xs font-medium">{cert.issuer}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
