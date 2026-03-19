'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    label: 'Science Lab',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80',
    label: 'Sports Day',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80',
    label: 'Library',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    label: 'Classroom',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
    label: 'Arts & Culture',
    span: '',
  },
]

export default function GalleryPreview() {
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
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          ref={ref}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
            >
              Campus Life
            </span>
            <h2 className="text-4xl font-bold" style={{ color: '#800000' }}>
              Life at Project Secondary
            </h2>
          </div>
          <Link
            href="/gallery"
            className="shrink-0 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#800000', color: 'white' }}
          >
            View Full Gallery →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 h-auto lg:h-[520px]">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.span}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
                minHeight: i === 0 ? '260px' : '120px',
              }}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white font-semibold text-sm">{img.label}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}