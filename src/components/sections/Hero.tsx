'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80"
          alt="Students in classroom"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(128,0,0,0.75)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ backgroundColor: 'rgba(255,140,0,0.2)', color: '#F59E0B', border: '1px solid rgba(255,140,0,0.3)' }}
        >
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          Now Enrolling — Academic Year 2025/2026
        </div>

        {/* Heading */}
        <h1
        
          className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-150 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          
        >
          Soaring To{' '}
          <span style={{ color: '#FF8C00' }}>Excellence.</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Nurturing Uganda's next generation of leaders. Kampala Preparatory School offers an elite, holistic primary education in the heart of Kitebi, Rubaga.

        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            href="/apply"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: '#F59E0B', color: '#800000' }}
          >
            Apply for 2026 Intake →
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:bg-white/10"
            style={{ border: '2px solid rgba(255,255,255,0.4)' }}
          >
            Learn More
          </Link>
        </div>

        {/* Stats row */}
        <div
          className={`mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto transition-all duration-700 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { value: '90+', label: 'First Grades (PLE)' },
            { value: '100%', label: 'Top School Transition' },
            { value: 'Top 50', label: 'Kampala District' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#F59E0B' }}>
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: '2px solid rgba(255,255,255,0.4)' }}>
          <div className="w-1 h-3 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}