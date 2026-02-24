import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-10">
      <div className="glass-strong rounded-t-3xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Name */}
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Susanth Jegadeesan
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                QA Test Engineer & Front-End Developer
              </p>
            </div>

            {/* Social icons */}
            <div className="flex justify-center md:justify-end gap-3">
              {[
                { icon: FaEnvelope, href: 'mailto:susanthj14@gmail.com', label: 'Email' },
                { icon: FaPhone, href: 'tel:+918754326992', label: 'Phone' },
                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/susanth-j-597713227/', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2.5 glass-subtle rounded-xl text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark hover:glow-green transition-all"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200/50 dark:border-white/5 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              &copy; {currentYear} Susanth Jegadeesan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
