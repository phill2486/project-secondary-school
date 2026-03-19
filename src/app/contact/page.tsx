'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

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

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Location',
    lines: ['Kitebi, Rubaga Division', 'Kampala, Uganda'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+256 708 810 000', '+256 772 412 743', '+256 781 526 202'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@kps.ac.ug', 'admissions@kps.ac.ug'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Mon – Fri: 7:30am – 5:00pm', 'Sat: 8:00am – 1:00pm'],
  },
]

export default function ContactPage() {
  const hero = useReveal()
  const content = useReveal()

  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1800)
  }

  return (
    <main style={{ paddingTop: '64px' }}>

      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80"
            alt="Contact us"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(128,0,0,0.85)' }} />
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
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm">
           We would love to hear from you. Our team at Kitebi is ready to assist with any enquiry.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto">
          <div
            ref={content.ref}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            style={{
              opacity: content.visible ? 1 : 0,
              transform: content.visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >

            {/* Contact Info Cards */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, i) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    opacity: content.visible ? 1 : 0,
                    transform: content.visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(255,140,0,0.12)' }}
                    >
                      <item.icon size={20} style={{ color: '#F59E0B' }} />
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-1.5" style={{ color: '#800000' }}>
                        {item.title}
                      </p>
                      {item.lines.map((line) => (
                        <p key={line} className="text-sm" style={{ color: '#64748B' }}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
             <div
                className="rounded-2xl overflow-hidden border border-gray-100"
                style={{ height: '220px' }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7534298!2d32.54693!3d0.29637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc0f5b6ea759%3A0x8e3a48d5a7b2c123!2sKitebi%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sug!4v1710000000001!5m2!1sen!2sug"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full py-16 gap-5 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(34,197,94,0.12)' }}
                  >
                    <CheckCircle size={40} style={{ color: '#22c55e' }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#800000' }}>
                      Message Sent!
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                      Thank you for reaching out. A member of our team will
                      get back to you within 1 business day. You can also reach us directly on +256 708 810 000.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: '#800000', color: 'white' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2" style={{ color: '#800000' }}>
                      Send Us a Message
                    </h2>
                    <p className="text-sm" style={{ color: '#64748B' }}>
                      Fill in the form below and we will respond as soon as possible.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                        style={{
                          borderColor: errors.name ? '#ef4444' : '#e2e8f0',
                          color: '#800000',
                        }}
                      />
                      {errors.name && (
                        <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                        style={{
                          borderColor: errors.email ? '#ef4444' : '#e2e8f0',
                          color: '#800000',
                        }}
                      />
                      {errors.email && (
                        <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-5">
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
                      Subject *
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                      style={{
                        borderColor: errors.subject ? '#ef4444' : '#e2e8f0',
                        color: form.subject ? '#800000' : '#94a3b8',
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option>Admissions Enquiry</option>
                      <option>Fee Payment</option>
                      <option>Academic Information</option>
                      <option>PLE Results & Performance</option>
                      <option>Uniform & Requirements</option>
                      <option>General Enquiry</option>
                      <option>Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 resize-none"
                      style={{
                        borderColor: errors.message ? '#ef4444' : '#e2e8f0',
                        color: '#800000',
                      }}
                    />
                    {errors.message && (
                      <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.message}</p>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                    style={{ backgroundColor: '#800000', color: 'white' }}
                  >
                    {status === 'loading' ? (
                      <>
                        <div
                          className="w-5 h-5 rounded-full border-2 animate-spin"
                          style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#F59E0B' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}