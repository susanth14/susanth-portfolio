import { m, useInView, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

function AnimatedCounter({ value, isInView }) {
  const numStr = value.replace(/[^0-9]/g, '')
  const suffix = value.replace(/[0-9]/g, '')
  const num = parseInt(numStr) || 0
  const spring = useSpring(0, { stiffness: 60, damping: 18 })
  const display = useTransform(spring, (v) => Math.round(v) + suffix)

  useEffect(() => {
    if (isInView && num > 0) spring.set(num)
  }, [isInView, num, spring])

  if (!num) return <span>{value}</span>
  return <m.span>{display}</m.span>
}

function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const highlights = [
    'Working on US-based financial services project (FCS)',
    'Proficient in Playwright automation with JS & TS',
    'Strong React.js front-end development background',
    'Experience in Agile methodology & defect lifecycle',
    'Open to relocation and remote opportunities',
  ]

  const stats = [
    { value: '1+', label: 'Years Experience' },
    { value: '2', label: 'Roles Handled' },
    { value: '3', label: 'Certifications' },
    { value: 'US', label: 'Project Domain' },
  ]

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 dark:from-primary-dark dark:to-accent">
              Me
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">Get to know me better</p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Animated stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  className="glass rounded-2xl p-6 text-center hover:glow-green transition-shadow cursor-default"
                >
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-emerald-400 dark:from-primary-dark dark:to-accent">
                    <AnimatedCounter value={stat.value} isInView={isInView} />
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
                </m.div>
              ))}
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                I'm a <strong>QA Test Engineer</strong> currently working at{' '}
                <strong>Skillmine Technology Pvt Ltd</strong> on a US-based financial services project.
                With a background in front-end development using React.js, I bring a unique perspective
                to quality assurance - understanding both how applications are built and how they should
                be tested.
              </p>
              <div className="space-y-3">
                {highlights.map((item, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}  
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/30 dark:hover:bg-white/5 transition-colors"
                  >
                    <FaCheckCircle className="text-primary dark:text-primary-dark mt-1 shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}

export default About
