import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa'

const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'susanthj14@gmail.com',
    href: 'mailto:susanthj14@gmail.com',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+91 8754326992',
    href: 'tel:+918754326992',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/susanth-j',
    href: 'https://www.linkedin.com/in/susanth-j-597713227/',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Availability',
    value: 'Open to Remote & Relocation',
    href: null,
  },
]

function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:susanthj14@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name} (${formData.email})`
    window.location.href = mailtoLink
    setFormData({ name: '', email: '', message: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-24 relative">
      {/* Extra decorative blob for contact */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-400/10 dark:bg-green-400/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2">
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 dark:from-primary-dark dark:to-accent">
              Touch
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">
            I'm open to new opportunities. Let's connect!
          </p>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Whether you have a job opportunity, a project in mind, or just want to say hello,
                feel free to reach out. I'm always interested in discussing quality assurance,
                test automation, and web development.
              </p>

              <div className="space-y-3">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/30 dark:hover:bg-white/5 transition-all group"
                      >
                        <div className="p-2.5 glass-subtle rounded-xl group-hover:glow-green transition-all">
                          <item.icon size={18} className="text-primary dark:text-primary-dark" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-3 rounded-xl">
                        <div className="p-2.5 glass-subtle rounded-xl">
                          <item.icon size={18} className="text-primary dark:text-primary-dark" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 glow-green"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl glass-subtle text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-dark/50 outline-none transition-all text-sm placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl glass-subtle text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-dark/50 outline-none transition-all text-sm placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl glass-subtle text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-dark/50 outline-none transition-all resize-none text-sm placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary to-emerald-500 dark:from-primary-dark dark:to-emerald-400 text-white dark:text-dark-bg rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/20 transition-all hover:-translate-y-0.5"
                >
                  {submitted ? 'Opening Email Client...' : 'Send Message'}
                </button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
