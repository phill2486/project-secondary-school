'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, Search, Share2, Heart, Play } from 'lucide-react'

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

const heroSlides = [
  { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80', caption: 'Graduation Day 2024', sub: 'Celebrating our finest achievers' },
  { src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80', caption: 'Our Beautiful Campus', sub: 'A world-class learning environment' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80', caption: 'Cultural Day 2024', sub: 'Celebrating diversity and talent' },
  { src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&q=80', caption: 'Sports Day Champions', sub: 'Excellence on and off the field' },
]

const dayInLife = [
  { time: '7:00 AM', title: 'Morning Assembly', src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', desc: 'Pupils gather for morning devotion and announcements' },
  { time: '8:30 AM', title: 'Classroom Learning', src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', desc: 'Engaging lessons with dedicated teachers' },
  { time: '11:00 AM', title: 'Break Time', src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80', desc: 'Pupils relax, socialise and recharge' },
  { time: '2:00 PM', title: 'Sports & PE', src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80', desc: 'Physical development and teamwork on the field' },
  { time: '4:30 PM', title: 'Afternoon Study', src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80', desc: 'Quiet study time guided by class teachers' },
]

const allImages = [
  { src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80', category: 'academics', caption: 'Pupils focused on their studies' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', category: 'academics', caption: 'Computer laboratory session' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', category: 'academics', caption: 'Science practical session' },
  { src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', category: 'academics', caption: 'Library study session' },
  { src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80', category: 'sports', caption: 'Basketball team in action' },
  { src: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80', category: 'sports', caption: 'Football match day' },
  { src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80', category: 'sports', caption: 'Athletics on the track' },
  { src: 'https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?w=800&q=80', category: 'sports', caption: 'Morning sports training' },
  { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80', category: 'events', caption: 'PLE Graduation ceremony 2024' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', category: 'events', caption: 'Annual school conference' },
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', category: 'events', caption: 'Prize giving day celebrations' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', category: 'events', caption: 'Cultural day performances' },
  { src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', category: 'facilities', caption: 'KPS main building' },
  { src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', category: 'facilities', caption: 'School assembly hall' },
  { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', category: 'facilities', caption: 'Well equipped classrooms' },
  { src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80', category: 'arts', caption: 'Art and design studio' },
  { src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80', category: 'arts', caption: 'School music performance' },
  { src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80', category: 'arts', caption: 'Drama and theatre showcase' },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'academics', label: 'Academics' },
  { id: 'sports', label: 'Sports' },
  { id: 'events', label: 'Events' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'arts', label: 'Arts & Culture' },
]

export default function GalleryPage() {
  const heroRef = useReveal()
  const dayRef = useReveal()
  const gridRef = useReveal()

  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 4000)
    return () => clearInterval(t)
  }, [])

  const [dayStep, setDayStep] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [shareToast, setShareToast] = useState(false)

  const filtered = allImages.filter(img => {
    const matchCat = activeCategory === 'all' || img.category === activeCategory
    const matchSearch = img.caption.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  function openLightbox(i: number) {
    setLightbox(i)
    document.body.style.overflow = 'hidden'
  }

  function closeLightbox() {
    setLightbox(null)
    document.body.style.overflow = ''
  }

  function prev() {
    if (lightbox === null) return
    setLightbox(lightbox === 0 ? filtered.length - 1 : lightbox - 1)
  }

  function next() {
    if (lightbox === null) return
    setLightbox(lightbox === filtered.length - 1 ? 0 : lightbox + 1)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightbox === null) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, filtered.length])

  function toggleLike(i: number) {
    setLiked(prev => {
      const n = new Set(prev)
      n.has(i) ? n.delete(i) : n.add(i)
      return n
    })
  }

  function handleShare() {
    setShareToast(true)
    setTimeout(() => setShareToast(false), 2500)
  }

  return (
    <main style={{ paddingTop: '64px' }}>

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg"
          style={{ backgroundColor: '#800000' }}>
          Link copied to clipboard!
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: 'rgba(0,0,0,0.97)' }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-white text-sm font-medium opacity-60">
              {lightbox + 1} / {filtered.length}
            </span>
            <p className="text-white text-sm font-semibold">
              {filtered[lightbox].caption}
            </p>
            <div className="flex items-center gap-3">
              <button onClick={handleShare}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Share2 size={16} color="white" />
              </button>
              <button onClick={closeLightbox}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <X size={18} color="white" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative px-16">
            <button onClick={prev}
              className="absolute left-4 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
              <ChevronLeft size={28} color="white" />
            </button>
            <div className="relative w-full max-w-5xl h-full max-h-[65vh] rounded-2xl overflow-hidden">
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].caption}
                fill
                className="object-cover"
                sizes="90vw"
              />
            </div>
            <button onClick={next}
              className="absolute right-4 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
              <ChevronRight size={28} color="white" />
            </button>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 overflow-x-auto">
            {filtered.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                className="relative shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
                style={{
                  border: i === lightbox ? '2px solid #FF8C00' : '2px solid transparent',
                  opacity: i === lightbox ? 1 : 0.5,
                }}
              >
                <Image src={img.src} alt={img.caption} fill className="object-cover" sizes="64px" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hero Slider */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === slide ? 1 : 0 }}
          >
            <Image src={s.src} alt={s.caption} fill priority={i === 0} className="object-cover" />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(128,0,0,0.65)' }} />
          </div>
        ))}

        <div
          ref={heroRef.ref}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
          style={{
            opacity: heroRef.visible ? 1 : 0,
            transform: heroRef.visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
            style={{ backgroundColor: 'rgba(255,140,0,0.2)', color: '#FF8C00' }}
          >
            Campus Life
          </span>
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4 transition-all duration-700">
            {heroSlides[slide].caption}
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            {heroSlides[slide].sub}
          </p>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === slide ? '28px' : '8px',
                  height: '8px',
                  backgroundColor: i === slide ? '#FF8C00' : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-10">
          <button
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <Play size={14} />
            Watch School Reel
          </button>
        </div>
      </section>

      {/* Day in the Life */}
      <section className="py-24 px-4" style={{ backgroundColor: '#FDFCF8' }}>
        <div className="max-w-6xl mx-auto">
          <div
            ref={dayRef.ref}
            className="text-center mb-16"
            style={{
              opacity: dayRef.visible ? 1 : 0,
              transform: dayRef.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
            >
              Experience
            </span>
            <h2 className="text-4xl font-bold mb-3" style={{ color: '#800000' }}>
              A Day in the Life at KPS
            </h2>
            <p className="text-sm" style={{ color: '#64748B' }}>
              Follow a pupil through a typical day at Kampala Preparatory School
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={dayInLife[dayStep].src}
                alt={dayInLife[dayStep].title}
                fill
                className="object-cover transition-all duration-700"
                sizes="50vw"
              />
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{ backgroundColor: '#FF8C00', color: '#800000' }}
              >
                {dayInLife[dayStep].time}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {dayInLife.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setDayStep(i)}
                  className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor: i === dayStep ? '#800000' : 'white',
                    border: `2px solid ${i === dayStep ? '#800000' : '#e2e8f0'}`,
                    transform: i === dayStep ? 'translateX(8px)' : 'translateX(0)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      backgroundColor: i === dayStep ? '#FF8C00' : 'rgba(128,0,0,0.08)',
                      color: '#800000',
                    }}
                  >
                    {item.time.split(':')[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm"
                      style={{ color: i === dayStep ? 'white' : '#800000' }}>
                      {item.title}
                    </p>
                    <p className="text-xs mt-0.5"
                      style={{ color: i === dayStep ? 'rgba(255,255,255,0.6)' : '#64748B' }}>
                      {item.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            ref={gridRef.ref}
            style={{
              opacity: gridRef.visible ? 1 : 0,
              transform: gridRef.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div className="text-center mb-12">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
              >
                Browse All
              </span>
              <h2 className="text-4xl font-bold mb-3" style={{ color: '#800000' }}>
                KPS Photo Gallery
              </h2>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
              <div className="relative w-full sm:w-72">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                  style={{ borderColor: '#e2e8f0', color: '#800000' }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: activeCategory === cat.id ? '#800000' : '#F8FAFC',
                      color: activeCategory === cat.id ? '#FF8C00' : '#64748B',
                      border: `2px solid ${activeCategory === cat.id ? '#800000' : '#e2e8f0'}`,
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>
              {filtered.length} photo{filtered.length !== 1 ? 's' : ''} found
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">📷</p>
                <p className="font-semibold" style={{ color: '#800000' }}>No photos found</p>
                <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>Try a different search or category</p>
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
                {filtered.map((img, i) => (
                  <div
                    key={img.src + i}
                    className="break-inside-avoid mb-4 relative group rounded-xl overflow-hidden cursor-pointer"
                    style={{
                      opacity: gridRef.visible ? 1 : 0,
                      transform: gridRef.visible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.5s ease ${(i % 8) * 60}ms, transform 0.5s ease ${(i % 8) * 60}ms`,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.caption}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3"
                      style={{ backgroundColor: 'rgba(128,0,0,0.78)' }}
                    >
                      <div className="flex justify-between items-start">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleLike(i) }}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{ backgroundColor: liked.has(i) ? '#ef4444' : 'rgba(255,255,255,0.2)' }}
                        >
                          <Heart size={14} color="white" fill={liked.has(i) ? 'white' : 'none'} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleShare() }}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                        >
                          <Share2 size={14} color="white" />
                        </button>
                      </div>
                      <div
                        className="flex items-center justify-between"
                        onClick={() => openLightbox(i)}
                      >
                        <p className="text-white text-xs font-medium">{img.caption}</p>
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#FF8C00' }}
                        >
                          <ZoomIn size={13} color="#800000" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}