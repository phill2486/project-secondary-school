'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ClipboardList,
  FileText,
  PenLine,
  UserCheck,
  PartyPopper,
  CheckCircle,
  Download,
  ChevronDown,
} from 'lucide-react'

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

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Submit Application',
    desc: 'Complete the online application form or pick up a physical copy at our campus in Kitebi, Rubaga Division.',
    date: 'Jan – Mar 2026',
  },
  {
    icon: PenLine,
    step: '02',
    title: 'Entrance Assessment',
    desc: 'All prospective pupils (Nursery to P.7) undergo an entrance interview in Mathematics and English to ensure they meet our preparatory standards.',
    date: 'Within 1 week',
  },
  {
    icon: UserCheck,
    step: '03',
    title: 'Placement Decision',
    desc: 'Successful candidates receive an official admission letter with fee payment guidelines and reporting date.',
    date: 'Feb – Apr 2026',
  },
  {
    icon: PartyPopper,
    step: '04',
    title: 'Report to KPS',
    desc: 'Join the KPS Eagle family! Bring all required documents and uniform on your first reporting day.',
    date: 'May 2026',
  },
]

const requirements = [
  {
    title: 'Academic Requirements',
    items: [
      'Previous school report cards (last 2 terms)',
      'PLE results slip for P.7 transfer students',
      'Recommendation letter from previous school',
      'Completed entrance assessment (Maths & English)',
    ],
  },
  {
    title: 'Personal Documents',
    items: [
      'Birth certificate (original + photocopy)',
      'Passport-size photographs (4 copies)',
      'National ID or passport copy of parent/guardian',
      'LC1 letter or proof of Kampala residence',
    ],
  },
  {
    title: 'Health & Welfare',
    items: [
      'Immunisation and vaccination records',
      'Medical fitness note from a registered clinic',
      'Declaration of any special learning needs',
      'Emergency contact details for parent/guardian',
    ],
  },
  {
    title: 'Financial Requirements',
    items: [
      'Non-refundable application fee: UGX 20,000',
      'First term fees payable before reporting date',
      'Uniform purchased from the school store',
      'Requirements levy as per class (see fee structure)',
    ],
  },
]

const downloads = [
  { title: 'KPS Admissions Prospectus 2026', size: '2.1 MB', type: 'PDF' },
  { title: 'Application Form (Printable)', size: '150 KB', type: 'PDF' },
  { title: 'Fee Schedule 2026', size: '90 KB', type: 'PDF' },
  { title: 'Medical Declaration Form', size: '110 KB', type: 'PDF' },
  { title: 'Parent Agreement Form', size: '80 KB', type: 'PDF' },
]
function RequirementCard({
  title,
  items,
  index,
  visible,
}: {
  title: string
  items: string[]
  index: number
  visible: boolean
}) {
  return (
    <div
      className="relative bg-white rounded-2xl p-7 border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      {/* Gold left border on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300"
        style={{ backgroundColor: '#F59E0B', transform: 'scaleY(0)', transformOrigin: 'bottom' }}
      />
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl group-hover:scale-y-100 transition-transform duration-300"
        style={{ backgroundColor: '#F59E0B', transformOrigin: 'bottom' }}
      />

      {/* Title */}
      <h3 className="font-bold text-base mb-5 group-hover:text-yellow-600 transition-colors duration-200"
        style={{ color: '#800000' }}>
        {title}
      </h3>

      {/* Items — hidden by default, revealed on hover */}
      <ul className="space-y-3 max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500 ease-in-out">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
            <span className="text-sm" style={{ color: '#64748B' }}>{item}</span>
          </li>
        ))}
      </ul>

      {/* Hint text — visible before hover
      <p className="text-xs mt-2 group-hover:opacity-0 transition-opacity duration-200"
        style={{ color: '#94a3b8' }}>
        Hover to see requirements →
      </p> */}
    </div>
  )
}

export default function AdmissionsPage() {
  const hero = useReveal()
  const stepsRef = useReveal()
  const reqRef = useReveal()
  const dlRef = useReveal()

  const [dlToast, setDlToast] = useState('')

  function handleDownload(title: string) {
    setDlToast(`Downloading "${title}"...`)
    setTimeout(() => setDlToast(''), 3000)
  }

  return (
    <main style={{ paddingTop: '64px' }}>

      {/* Toast */}
      {dlToast && (
        <div
          className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg"
          style={{ backgroundColor: '#800000' }}
        >
          ⬇ {dlToast}
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1600&q=80"
            alt="Admissions"
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
            Admissions 2025/2026
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Join Our School Family
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
We welcome applications from motivated pupils ready to soar to excellenceWe welcome applications from motivated students ready to excel
          </p>
          <Link
            href="/apply"
            className="inline-flex px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#F59E0B', color: '#800000' }}
          >
            Apply Now →
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div
            ref={stepsRef.ref}
            className="text-center max-w-2xl mx-auto mb-16"
            style={{
              opacity: stepsRef.visible ? 1 : 0,
              transform: stepsRef.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
            >
              How To Apply
            </span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#800000' }}>
              The Admissions Process
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
            Follow these simple steps to secure your child's place at Kampala Preparatory School.

            </p>
          </div>

          {/* Step timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5 hidden sm:block"
              style={{ backgroundColor: '#e2e8f0' }}
            />

            <div className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <div
                  key={step.step}
                  className="flex items-start gap-6"
                  style={{
                    opacity: stepsRef.visible ? 1 : 0,
                    transform: stepsRef.visible ? 'translateX(0)' : 'translateX(-24px)',
                    transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                  }}
                >
                  {/* Icon circle */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-md"
                    style={{ backgroundColor: '#800000', border: '3px solid#FF8C00' }}
                  >
                    <step.icon size={22} style={{ color: '#F59E0B' }} />
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
                        >
                          Step {step.step}
                        </span>
                        <h3 className="font-bold text-base" style={{ color: '#800000' }}>
                          {step.title}
                        </h3>
                      </div>
                      <span className="text-xs font-medium" style={{ color: '#F59E0B' }}>
                        {step.date}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Accordion */}
      <section className="py-24 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-3xl mx-auto">
          <div
            ref={reqRef.ref}
            className="text-center mb-16"
            style={{
              opacity: reqRef.visible ? 1 : 0,
              transform: reqRef.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
            >
              What You Need
            </span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#800000' }}>
              Admission Requirements
            </h2>
            <p className="text-sm" style={{ color: '#64748B' }}>
              Click each category to expand the full requirements list.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {requirements.map((req, i) => (
              <RequirementCard
                key={req.title}
                {...req}
                index={i}
                visible={reqRef.visible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div
            ref={dlRef.ref}
            className="text-center mb-16"
            style={{
              opacity: dlRef.visible ? 1 : 0,
              transform: dlRef.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
            >
              Downloads
            </span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#800000' }}>
              Admissions Documents
            </h2>
            <p className="text-sm" style={{ color: '#64748B' }}>
              Download and print the forms you need for your application.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {downloads.map((doc, i) => (
              <div
                key={doc.title}
                className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:border-yellow-200 transition-all duration-300"
                style={{
                  opacity: dlRef.visible ? 1 : 0,
                  transform: dlRef.visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: 'rgba(128,0,0,0.08)', color: '#800000' }}
                  >
                    {doc.type}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#800000' }}>
                      {doc.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
                      {doc.size}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(doc.title)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#800000', color: 'white' }}
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: '#800000' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Apply?
          </h2>
          <p className="text-gray-400 mb-8">
Complete your child's application online in under 10 minutes. Slots are limited.
          </p>
          <Link
            href="/apply"
            className="inline-flex px-10 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#F59E0B', color: '#800000' }}
          >
            Start Your Application →
          </Link>
        </div>
      </section>

    </main>
  )
}