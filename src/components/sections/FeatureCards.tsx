'use client'

import { useEffect, useRef, useState } from 'react'
import { BookOpen, Trophy, Users, Globe, Microscope, Music } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'PLE Excellence',
    description: 'Consistently ranked among Kampala\'s top PLE performers with students scoring 4 aggregates and Division 1 results.',
    color: '#800000',
  },
  {
    icon: Trophy,
    title: 'Sports & Skating',
    description: 'Active participants in the East Africa Inter-Schools Speed Skate Championships and local football leagues.',
    color: '#FF8C00',
  },
  {
    icon: Users,
    title: 'Expert Teachers',
    description: 'Dedicated, experienced faculty maintaining strict teacher-to-student ratios for personalised attention.',
    color: '#800000',
  },
  {
    icon: Globe,
    title: 'Holistic Development',
    description: 'Beyond academics — character, discipline and leadership are at the heart of the KPS experience.',
    color: '#FF8C00',
  },
  {
    icon: Microscope,
    title: 'Modern Facilities',
    description: 'Well-equipped classrooms, science resources and sports grounds in the heart of Kitebi, Rubaga.',
    color: '#800000',
  },
  {
    icon: Music,
    title: 'Arts & Culture',
    description: 'Rich cultural programme celebrating Ugandan heritage through music, drama and creative arts.',
    color: '#FF8C00',
  },
]

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  index,
}: {
  icon: any
  title: string
  description: string
  color: string
  index: number
}) {
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
    <div
      ref={ref}
      className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms, box-shadow 0.3s ease`,
      }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: color === '#FF8C00' ? 'rgba(255,140,0,0.12)' : 'rgba(128,0,0,0.08)' }}
      >
        <Icon size={26} style={{ color }} />
      </div>
      <h3 className="text-lg font-bold mb-3" style={{ color: '#800000' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
        {description}
      </p>
    </div>
  )
}

export default function FeatureCards() {
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
            Why Choose KPS
          </span>
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#800000' }}>
            Why Families Choose KPS
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#64748B' }}>
            We go beyond textbooks to develop disciplined, confident young leaders ready for Uganda's top secondary schools.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}