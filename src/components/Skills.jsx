import { m, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiHtml5,
  SiCss3,
  SiNestjs,
} from 'react-icons/si'
import { VscBeaker } from 'react-icons/vsc'
import { MdBugReport, MdSpeed } from 'react-icons/md'

const skillCategories = [
  {
    title: 'Testing & QA',
    skills: [
      { name: 'Playwright', icon: VscBeaker, color: '#2EAD33' },
      { name: 'Manual Testing', icon: VscBeaker, color: '#6366f1' },
      { name: 'Functional Testing', icon: MdBugReport, color: '#ef4444' },
      { name: 'API Testing', icon: MdSpeed, color: '#f59e0b' },
    ],
  },
  {
    title: 'Programming',
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    ],
  },
  {
    title: 'Frameworks & Tools',
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
]

const testingTypes = [
  { name: 'Functional Testing', hint: 'Verifies each feature works according to business requirements and expected behavior.' },
  { name: 'Regression Testing', hint: 'Re-runs existing tests after code changes to ensure no existing functionality is broken.' },
  { name: 'Smoke Testing', hint: 'Quick high-level checks on critical paths to confirm the build is stable before full testing.' },
  { name: 'UI Testing', hint: 'Validates visual elements, layouts, responsiveness, and user interactions across the application.' },
  { name: 'API Testing', hint: 'Tests REST API endpoints for correct responses, status codes, and data integrity.' },
  { name: 'Cross-browser Testing', hint: 'Ensures consistent behavior and appearance across Chrome, Firefox, Safari, and Edge.' },
]

function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeHint, setActiveHint] = useState(null)

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2">
            Technical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 dark:from-primary-dark dark:to-accent">
              Skills
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">Technologies I work with</p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {skillCategories.map((category, catIdx) => (
              <m.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIdx * 0.15 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 hover:glow-green transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-5 text-primary dark:text-primary-dark">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, i) => (
                    <m.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: catIdx * 0.15 + i * 0.05 }}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl glass-subtle hover:bg-white/40 dark:hover:bg-white/5 transition-all"
                    >
                      <skill.icon size={20} style={{ color: skill.color }} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                    </m.div>
                  ))}
                </div>
              </m.div>
            ))}
          </div>

          {/* Testing types */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-1 text-center">Testing Expertise</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mb-4">Click any badge to learn more</p>
            <div className="flex flex-wrap justify-center gap-3">
              {testingTypes.map((type, i) => (
                <m.button
                  key={type.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ scale: 1.07, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveHint(activeHint?.name === type.name ? null : type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                    activeHint?.name === type.name
                      ? 'bg-primary dark:bg-primary-dark text-white dark:text-dark-bg border-primary dark:border-primary-dark glow-green'
                      : 'glass-subtle text-primary dark:text-primary-dark border-transparent hover:glow-green'
                  }`}
                >
                  {type.name}
                </m.button>
              ))}
            </div>
          </m.div>

          {/* Hint popup */}
          <AnimatePresence>
            {activeHint && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setActiveHint(null)}
              >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                <m.div
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative glass-strong rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-primary/20 dark:border-primary-dark/20"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={() => setActiveHint(null)}
                    className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full glass-subtle text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-lg"
                  >
                    ×
                  </button>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-primary dark:bg-primary-dark" />
                    <h4 className="font-bold text-gray-900 dark:text-white">{activeHint.name}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{activeHint.hint}</p>
                </m.div>
              </m.div>
            )}
          </AnimatePresence>

          {/* Methodologies */}
          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            {['Agile', 'SDLC', 'Defect Lifecycle Management'].map(method => (
              <span
                key={method}
                className="px-4 py-2 glass-subtle rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {method}
              </span>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  )
}

export default Skills
