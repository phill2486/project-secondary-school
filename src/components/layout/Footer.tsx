import Link from 'next/link'
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import Image from 'next/image'


export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#800000' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
  <Image
    src="/kps2.jfif"
    alt="KPS Logo"
    width={40}
    height={40}
    className="object-contain w-full h-full"
  />
</div>
              <div>
                <p className="font-bold text-white leading-tight">Kampala Preparatory</p>
                <p className="text-xs leading-tight" style={{ color: '#FF8C00' }}>School — Soaring To Excellence</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Soaring to Excellence since 2020. Providing elite, holistic primary education in the heart of Kitebi, Rubaga, Kampala.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 hover:bg-orange-500 transition-all duration-200 hover:scale-110">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-5"
              style={{ color: '#FF8C00' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'Fee Structure', href: '/fees' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Apply Now', href: '/apply' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-5"
              style={{ color: '#FF8C00' }}>
              Programmes
            </h4>
            <ul className="space-y-3">
              {[
                'Nursery & Kindergarten',
                'Primary 1 – Primary 3',
                'Primary 4 – Primary 6',
                'Primary 7 (PLE)',
                'Sports & Skating',
                'Arts & Culture',
              ].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm">→ {item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-5"
              style={{ color: '#FF8C00' }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: '#FF8C00' }} />
                <span className="text-gray-400 text-sm">Kitebi, Rubaga Division, Kampala, Uganda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: '#FF8C00' }} />
                <span className="text-gray-400 text-sm">+256 708 810 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" style={{ color: '#FF8C00' }} />
                <span className="text-gray-400 text-sm">info@kps.ac.ug</span>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: '#ffffff10' }}>
              <p className="text-xs text-gray-400 mb-1">School Hours</p>
              <p className="text-sm text-white font-medium">Mon – Fri: 7:30am – 5:00pm</p>
              <p className="text-sm text-white font-medium">Sat: 8:00am – 1:00pm</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Kampala Preparatory School. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}