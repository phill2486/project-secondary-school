'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

const highlights = [
  'Applications open for 2026 academic year',
  'Limited slots — especially P.5 to P.7',
  'Bursaries available for exceptional pupils',
  'Flexible payment plans available',
]

export default function AdmissionsCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80"
          alt="KPS campus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(128,0,0,0.88)' }} />
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-5xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
              style={{ backgroundColor: 'rgba(255,140,0,0.2)', color: '#FF8C00' }}
            >
              Admissions Open
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Begin Your Child's
              <br />
              <span style={{ color: '#FF8C00' }}>Journey With KPS</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Join a growing community of high-achieving pupils in Kitebi, Kampala.
              Our 100% transition rate to top secondary schools speaks for itself.
            </p>
            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: '#FF8C00' }} />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="px-8 py-4 rounded-xl font-semibold text-sm text-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                style={{ backgroundColor: '#FF8C00', color: '#800000' }}
              >
                Apply Now →
              </Link>
              <Link
                href="/admissions"
                className="px-8 py-4 rounded-xl font-semibold text-sm text-center text-white transition-all duration-200 hover:bg-white/10"
                style={{ border: '2px solid rgba(255,255,255,0.3)' }}
              >
                Learn About Admissions
              </Link>
            </div>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <h3 className="text-white font-bold text-xl mb-6">Application Timeline</h3>
            <div className="space-y-5">
              {[
                { step: '01', title: 'Submit Application', desc: 'Online or at our Kitebi campus', date: 'Jan – Mar 2026' },
                { step: '02', title: 'Entrance Assessment', desc: 'Maths & English interview', date: 'Within 1 week' },
                { step: '03', title: 'Placement Decision', desc: 'Admission letter issued', date: 'Feb – Apr 2026' },
                { step: '04', title: 'Report to KPS', desc: 'Begin your KPS journey!', date: 'May 2026' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs"
                    style={{ backgroundColor: '#FF8C00', color: '#800000' }}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <span className="text-xs" style={{ color: '#FF8C00' }}>{item.date}</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-8 p-4 rounded-xl text-center"
              style={{ backgroundColor: 'rgba(255,140,0,0.15)' }}
            >
              <p className="text-white font-semibold text-sm">Need help applying?</p>
              <p className="text-gray-400 text-xs mt-1">Call us: +256 708 810 000</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}