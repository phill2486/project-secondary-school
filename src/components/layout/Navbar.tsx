'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Fees', href: '/fees' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
  { label: 'Portal', href: '/portal' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
      style={{ backgroundColor: '#800000' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
  <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
    <Image
      src="/kps2.jfif"
      alt="KPS Logo"
      width={40}
      height={40}
      className="object-contain"
    />
  </div>
  <div className="hidden sm:block">
    <p className="text-white font-bold text-sm leading-tight">Kampala Preparatory</p>
    <p className="text-xs leading-tight" style={{ color: '#FF8C00' }}>School — KPS</p>
  </div>
</Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={
                  pathname === link.href
                    ? { backgroundColor: '#F59E0B', color: '#800000' }
                    : {}
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Apply Now CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/apply"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#F59E0B', color: '#800000' }}
            >
              Apply Now
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white transition-colors"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden"
            style={{ backgroundColor: '#6b0000' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 pt-2 pb-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                    style={
                      pathname === link.href
                        ? { backgroundColor: '#FF8C00', color: '#800000' }
                        : { color: '#d1d5db' }
                    }
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.25 }}
              >
                <Link
                  href="/apply"
                  className="mt-2 block px-4 py-3 rounded-lg text-sm font-semibold text-center transition-all duration-200"
                  style={{ backgroundColor: '#FF8C00', color: '#800000' }}
                >
                  Apply Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}