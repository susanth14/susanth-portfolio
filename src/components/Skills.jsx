import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
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
  'Functional Testing',
  'Regression Testing',
  'Smoke Testing',
  'UI Testing',
  'API Testing',
  'Cross-browser Testing',
]

function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
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
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIdx * 0.15 }}
                className="glass rounded-2xl p-6 hover:glow-green transition-all hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold mb-5 text-primary dark:text-primary-dark">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, i) => (
                    <motion.div
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testing types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Testing Expertise</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {testingTypes.map((type, i) => (
                <motion.span
                  key={type}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="px-4 py-2 glass-subtle rounded-full text-sm font-medium text-primary dark:text-primary-dark hover:glow-green transition-all cursor-default"
                >
                  {type}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Methodologies */}
          <motion.div
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
