'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Nakamya',
    role: 'Parent — Primary 6 Pupil',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
    quote: 'KPS has transformed my daughter. The discipline and academic standards here are unlike anything I have seen in Kampala. She scored Division 1 in her mock exams.',
  },
  {
    name: 'Robert Ssemakula',
    role: 'Parent — Primary 7 Candidate',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    quote: 'My son joined KPS in P.5 and within one year his Mathematics improved dramatically. The teachers genuinely care about every child\'s progress.',
  },
  {
    name: 'Grace Achieng',
    role: 'Alumni Parent — Now at St. Mary\'s College',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    quote: 'Our daughter got 4 aggregates in PLE and joined one of Kampala\'s best secondary schools. KPS made that possible. We are forever grateful.',
  },
  {
    name: 'Moses Kato',
    role: 'Parent — Primary 3 Pupil',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    quote: 'Even at Primary 3 the structure is impressive. My son comes home excited about school every day. The Eagle House spirit is real!',
  },
]

function TestimonialCard({
  name, role, image, quote, index, visible,
}: {
  name: string
  role: string
  image: string
  quote: string
  index: number
  visible: boolean
}) {
  return (
    <div
      className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms, box-shadow 0.3s ease`,
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
        style={{ backgroundColor: 'rgba(255,140,0,0.12)' }}
      >
        <Quote size={18} style={{ color: '#FF8C00' }} />
      </div>
      <p className="text-sm leading-relaxed flex-1 mb-8" style={{ color: '#64748B' }}>
        "{quote}"
      </p>
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: '#800000' }}>{name}</p>
          <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
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
    <section className="py-24 px-4" style={{ backgroundColor: '#FDFCF8' }}>
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="text-center max-w-2xl mx-auto mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
          >
            Testimonials
          </span>
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#800000' }}>
            What KPS Families Say
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#64748B' }}>
            Hear from parents and alumni about their experience at Kampala Preparatory School.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} visible={visible} />
          ))}
        </div>

        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.6s',
          }}
        >
          {[
            { value: '4', label: 'PLE Aggregate (Top Students)' },
            { value: '100%', label: 'Top School Transition' },
            { value: '90+', label: 'First Grades Awarded' },
            { value: 'Top 50', label: 'Kampala District Ranking' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold" style={{ color: '#800000' }}>{stat.value}</p>
              <p className="text-sm mt-1" style={{ color: '#64748B' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}