'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Target, Eye, Heart, Award, Users, BookOpen, Trophy } from 'lucide-react'

function useReveal() {
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
  return { ref, visible }
}

const staff = [
  {
    name: 'Dr. Emmanuel Ssali',
    role: 'Headteacher',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'PhD in Education Leadership with 25 years of experience transforming schools across East Africa.',
  },
  {
    name: 'Mrs. Florence Nakawesi',
    role: 'Deputy Headteacher — Academics',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Masters in Curriculum Development. Champion of student-centred learning and academic excellence.',
  },
  {
    name: 'Mr. Ronald Byamugisha',
    role: 'Deputy Headteacher — Welfare',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Dedicated to student wellbeing, discipline and extracurricular development for over 18 years.',
  },
  {
    name: 'Ms. Patricia Atim',
    role: 'Director of Admissions',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
    bio: 'Passionate about making quality education accessible. Oversees the full admissions process.',
  },
]

const values = [
  { icon: Target, title: 'Academic Excellence', desc: 'We set the highest standards and support every pupil to meet them in PLE and beyond.' },
  { icon: Heart, title: 'Integrity', desc: 'Honesty and strong character are non-negotiable at KPS.' },
  { icon: Users, title: 'Hard Work', desc: 'We instil a culture of diligence and resilience in every child.' },
  { icon: Award, title: 'Discipline', desc: 'Structured, purposeful learning environments where every child thrives.' },
]

function OrgNode({
  name,
  role,
  image,
  highlight = false,
}: {
  name: string
  role: string
  image: string
  highlight?: boolean
}) {
  return (
    <div className="flex flex-col items-center group">
      {/* Circle image */}
      <div
        className="relative rounded-full overflow-hidden transition-all duration-300 group-hover:scale-110"
        style={{
          width: highlight ? '100px' : '80px',
          height: highlight ? '100px' : '80px',
          border: `3px solid ${highlight ? '#F59E0B' : '#cbd5e1'}`,
          boxShadow: highlight ? '0 0 0 4px rgba(255,140,0,0.15)' : 'none',
        }}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      {/* Name & Role */}
      <div className="mt-3 text-center">
        <p
          className="font-bold text-sm"
          style={{ color: '#800000' }}
        >
          {name}
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: highlight ? '#F59E0B' : '#64748B' }}
        >
          {role}
        </p>
      </div>
    </div>
  )
}


export default function AboutPage() {
  const hero = useReveal()
  const mission = useReveal()
  const stats = useReveal()
  const valuesRef = useReveal()
  const team = useReveal()

  return (
    <main style={{ paddingTop: '64px' }}>

      {/* Hero Banner */}
      <section className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80"
            alt="School building"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(128,0,0,0.82)' }} />
        </div>
        <div
          ref={hero.ref}
          className="relative z-10 text-center px-4"
          style={{
            opacity: hero.visible ? 1 : 0,
            transform: hero.visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: 'rgba(255,140,0,0.2)', color: '#F59E0B' }}
          >
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Story & Mission
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Serving the community with quality education since 1980
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4 bg-white">
        <div
          ref={mission.ref}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          style={{
            opacity: mission.visible ? 1 : 0,
            transform: mission.visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Image */}
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80"
              alt="Students studying"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(255,140,0,0.12)' }}
                >
                  <Target size={22} style={{ color: '#F59E0B' }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#800000' }}>Our Mission</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                    To provide a highly competitive preparatory environment where every child is empowered with academic rigour, discipline, and character — producing well-rounded pupils ready for Uganda's top secondary schools.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(128,0,0,0.08)' }}
                >
                  <Eye size={22} style={{ color: '#800000' }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#800000' }}>Our Vision</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                   To be recognised as Kampala's premier preparatory school — known for producing disciplined, academically excellent young leaders who consistently dominate the Primary Leaving Examinations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(255,140,0,0.12)' }}
                >
                  <BookOpen size={22} style={{ color: '#F59E0B' }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#800000' }}>Our History</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                    Opened in 2020, KPS was founded with a singular vision: to redefine primary education in Uganda. Despite being a young institution, our dedication to top-quality teaching has already positioned us among Kampala's top PLE performers, with students consistently scoring 4 aggregates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4" style={{ backgroundColor: '#800000' }}>
        <div
          ref={stats.ref}
          className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8"
          style={{
            opacity: stats.visible ? 1 : 0,
            transform: stats.visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {[
            { icon: Users, value: '500+', label: 'Pupils Enrolled' },
            { icon: BookOpen, value: '40+', label: 'Qualified Teachers' },
            { icon: Trophy, value: '90+', label: 'PLE First Grades' },
            { icon: Award, value: '2020', label: 'Year Founded' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon size={28} className="mx-auto mb-3" style={{ color: '#F59E0B' }} />
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm" style={{ color: '#94a3b8' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto">
          <div
            ref={valuesRef.ref}
            className="text-center max-w-2xl mx-auto mb-16"
            style={{
              opacity: valuesRef.visible ? 1 : 0,
              transform: valuesRef.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
            >
              Our Values
            </span>
            <h2 className="text-4xl font-bold" style={{ color: '#800000' }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
                style={{
                  opacity: valuesRef.visible ? 1 : 0,
                  transform: valuesRef.visible ? 'translateY(0)' : 'translateY(28px)',
                  transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: 'rgba(255,140,0,0.12)' }}
                >
                  <v.icon size={26} style={{ color: '#F59E0B' }} />
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ color: '#800000' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Hierarchy */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div
            ref={team.ref}
            className="text-center max-w-2xl mx-auto mb-16"
            style={{
              opacity: team.visible ? 1 : 0,
              transform: team.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
            >
              Leadership
            </span>
            <h2 className="text-4xl font-bold" style={{ color: '#800000' }}>
              Our Leadership Structure
            </h2>
          </div>

          {/* Org Chart */}
          <div className="flex flex-col items-center gap-0">

            {/* Level 1 — Headteacher */}
            <div
              className="flex flex-col items-center"
              style={{
                opacity: team.visible ? 1 : 0,
                transform: team.visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.6s ease 0ms, transform 0.6s ease 0ms',
              }}
            >
              <OrgNode
                name="Dr. Emmanuel Ssali"
                role="Headteacher"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                highlight
              />
              {/* Vertical line down */}
              <div className="w-0.5 h-10" style={{ backgroundColor: '#F59E0B' }} />
            </div>

            {/* Horizontal connector */}
            <div className="flex items-start">
              {/* Left branch */}
              <div className="flex flex-col items-center">
                <div className="h-0.5 w-32 sm:w-48" style={{ backgroundColor: '#cbd5e1' }} />
              </div>
              {/* Center dot */}
              <div className="w-3 h-3 rounded-full border-2 -mt-1.5 shrink-0"
                style={{ backgroundColor: '#F59E0B', borderColor: '#F59E0B' }} />
              {/* Right branch */}
              <div className="flex flex-col items-center">
                <div className="h-0.5 w-32 sm:w-48" style={{ backgroundColor: '#cbd5e1' }} />
              </div>
            </div>

            {/* Level 2 — Deputies */}
            <div
              className="flex flex-col sm:flex-row gap-0 items-start justify-center w-full"
              style={{
                opacity: team.visible ? 1 : 0,
                transform: team.visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.6s ease 200ms, transform 0.6s ease 200ms',
              }}
            >
              {/* Deputy 1 */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-8" style={{ backgroundColor: '#cbd5e1' }} />
                <OrgNode
                  name="Mrs. Florence Nakawesi"
                  role="Deputy — Academics"
                  image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
                />
                {/* Line down to level 3 */}
                <div className="w-0.5 h-8" style={{ backgroundColor: '#cbd5e1' }} />
              </div>

              {/* Spacer */}
              <div className="hidden sm:block w-32 sm:w-48" />

              {/* Deputy 2 */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-8" style={{ backgroundColor: '#cbd5e1' }} />
                <OrgNode
                  name="Mr. Ronald Byamugisha"
                  role="Deputy — Welfare"
                  image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                />
                <div className="w-0.5 h-8" style={{ backgroundColor: '#cbd5e1' }} />
              </div>
            </div>

            {/* Level 3 connector */}
            <div className="flex items-start">
              <div className="h-0.5 w-32 sm:w-48" style={{ backgroundColor: '#cbd5e1' }} />
              <div className="w-3 h-3 rounded-full border-2 -mt-1.5 shrink-0"
                style={{ backgroundColor: '#cbd5e1', borderColor: '#cbd5e1' }} />
              <div className="h-0.5 w-32 sm:w-48" style={{ backgroundColor: '#cbd5e1' }} />
            </div>

            {/* Level 3 — Director */}
            <div
              className="flex flex-col items-center"
              style={{
                opacity: team.visible ? 1 : 0,
                transform: team.visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.6s ease 400ms, transform 0.6s ease 400ms',
              }}
            >
              <div className="w-0.5 h-8" style={{ backgroundColor: '#cbd5e1' }} />
              <OrgNode
                name="Ms. Patricia Atim"
                role="Director of Admissions"
                image="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#800000' }}>
            Ready to Join the KPS Family?
          </h2>
          <p className="mb-8" style={{ color: '#64748B' }}>
Take the first step toward an elite preparatory education in Kampala.          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#F59E0B', color: '#800000' }}
            >
              Apply Now →
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#800000' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}