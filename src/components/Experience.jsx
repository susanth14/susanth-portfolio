import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaBriefcase } from 'react-icons/fa'

const experiences = [
  {
    title: 'Manual QA Test Engineer',
    company: 'Skillmine Technology Pvt Ltd',
    period: 'Mar 2025 - Present',
    current: true,
    points: [
      'Working on US-based FCS (First Credit Service) project performing comprehensive QA testing',
      'Perform manual testing of enterprise web applications including functional, smoke, regression, and UI testing',
      'Design and execute comprehensive test cases for complex business scenarios',
      'Implement automation testing using Playwright framework with JavaScript and TypeScript',
      'Identify, log, and track defects through complete lifecycle using defect management tools',
      'Collaborate with development team in Agile environment to ensure quality deliverables',
    ],
    tags: ['Playwright', 'JavaScript', 'TypeScript', 'Manual Testing', 'Agile'],
  },
  {
    title: 'Front-End Developer',
    company: 'Skillmine Technology Pvt Ltd',
    period: 'Dec 2023 - Sep 2024',
    current: false,
    points: [
      'Developed CRM application features using React.js with focus on performance optimization',
      'Implemented frontend integration and enhanced UI/UX across multiple application modules',
      'Conducted basic testing and gathered user feedback to improve application quality',
    ],
    tags: ['React.js', 'HTML', 'CSS', 'JavaScript', 'UI/UX'],
  },
]

function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2">
            Work{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 dark:from-primary-dark dark:to-accent">
              Experience
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">My professional journey</p>

          <div className="relative">
            {/* Timeline line - glass style */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent dark:from-primary-dark/30 dark:via-primary-dark/10" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.2 }}
                  className="relative md:pl-20"
                >
                  {/* Timeline dot with glow */}
                  <div className="hidden md:flex absolute left-5 top-6 w-7 h-7 rounded-full items-center justify-center z-10">
                    <div className="absolute inset-0 bg-primary dark:bg-primary-dark rounded-full opacity-30 blur-sm" />
                    <div className="relative w-full h-full bg-gradient-to-br from-primary to-emerald-500 dark:from-primary-dark dark:to-accent rounded-full flex items-center justify-center shadow-lg">
                      <FaBriefcase size={11} className="text-white dark:text-dark-bg" />
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-6 hover:glow-green transition-all hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                        <p className="text-primary dark:text-primary-dark font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {exp.current && (
                          <span className="px-2.5 py-0.5 bg-green-500/10 text-green-600 dark:text-primary-dark rounded-full text-xs font-semibold border border-green-500/20">
                            Current
                          </span>
                        )}
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{exp.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-4">
                      {exp.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-primary dark:bg-primary-dark rounded-full shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 glass-subtle rounded-full text-xs font-medium text-primary dark:text-primary-dark"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
