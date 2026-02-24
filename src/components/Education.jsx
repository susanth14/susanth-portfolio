import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGraduationCap } from 'react-icons/fa'

function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 dark:from-primary-dark dark:to-accent">
              Education
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">My academic background</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <motion.div whileHover={{ y: -6 }} className="glass rounded-2xl p-8 hover:glow-green transition-shadow">
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-primary dark:bg-primary-dark rounded-xl opacity-20 blur-md" />
                  <div className="relative p-3.5 bg-gradient-to-br from-primary/15 to-emerald-400/15 dark:from-primary-dark/15 dark:to-accent/15 rounded-xl border border-primary/10 dark:border-primary-dark/10">
                    <FaGraduationCap size={28} className="text-primary dark:text-primary-dark" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    B.Tech in Mechanical Engineering
                  </h3>
                  <p className="text-primary dark:text-primary-dark font-medium mt-1">
                    Kalasalingam Academy of Research and Education
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Srivilliputhur
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-mono mt-3 px-3 py-1 glass-subtle rounded-lg inline-block">
                    June 2016 - April 2020
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
