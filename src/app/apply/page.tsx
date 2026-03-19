'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Upload, ChevronRight, ChevronLeft } from 'lucide-react'

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

const steps = ['Student Info', 'Academic', 'Parent / Guardian', 'Review & Submit']

const inputClass = "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-yellow-400"

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
        {label}
      </label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{error}</p>}
    </div>
  )
}

export default function ApplyPage() {
  const hero = useReveal()
  const formRef = useReveal()

  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    studentName: '',
    dob: '',
    gender: '',
    nationality: 'Ugandan',
    currentSchool: '',
    gradeApplying: '',
    previousResults: '',
    parentName: '',
    relationship: '',
    phone: '',
    email: '',
    occupation: '',
    howHeard: '',
    specialNeeds: 'No',
  })

  const appRef = `KPS-APP-${Date.now().toString().slice(-7)}`

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function validateStep(s: number) {
    const e: Record<string, string> = {}
    if (s === 0) {
      if (!form.studentName.trim()) e.studentName = 'Required'
      if (!form.dob) e.dob = 'Required'
      if (!form.gender) e.gender = 'Required'
    }
    if (s === 1) {
      if (!form.currentSchool.trim()) e.currentSchool = 'Required'
      if (!form.gradeApplying) e.gradeApplying = 'Required'
    }
    if (s === 2) {
      if (!form.parentName.trim()) e.parentName = 'Required'
      if (!form.relationship) e.relationship = 'Required'
      if (!form.phone.trim()) e.phone = 'Required'
      if (!form.email.trim()) e.email = 'Required'
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    }
    return e
  }

  function handleNext() {
    const e = validateStep(step)
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    setStep(step + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSubmit() {
    setStatus('loading')
    setTimeout(() => setStatus('success'), 2500)
  }

  return (
    <main style={{ paddingTop: '64px' }}>

      {/* Hero */}
      <section className="relative h-56 sm:h-72 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1600&q=80"
            alt="Apply"
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
            Admissions 2025 / 2026
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Apply Now</h1>
          <p className="text-gray-300 text-sm max-w-lg mx-auto">
Complete the form below to begin your child's application to Kampala Preparatory School
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div
          ref={formRef.ref}
          className="max-w-2xl mx-auto"
          style={{
            opacity: formRef.visible ? 1 : 0,
            transform: formRef.visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >

          {status === 'success' ? (
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'rgba(34,197,94,0.12)' }}
              >
                <CheckCircle size={44} style={{ color: '#22c55e' }} />
              </div>
              <h2 className="text-3xl font-bold mb-3" style={{ color: '#800000' }}>
                Application Submitted!
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748B' }}>
                Thank you, <strong>{form.studentName}</strong>. Your application has been received.
               Our admissions team will contact {form.email} within 3 business days to schedule the entrance assessment in Mathematics and English.

              </p>
              <div className="rounded-xl p-5 mb-8 text-left" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>Application Ref</p>
                    <p className="font-bold mt-0.5" style={{ color: '#800000' }}>{appRef}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>Student Name</p>
                    <p className="font-bold mt-0.5" style={{ color: '#800000' }}>{form.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>Grade Applying</p>
                    <p className="font-bold mt-0.5" style={{ color: '#800000' }}>{form.gradeApplying}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>Parent Contact</p>
                    <p className="font-bold mt-0.5" style={{ color: '#800000' }}>{form.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#800000', color: 'white' }}
                >
                  Back to Home
                </Link>
                <Link
                  href="/portal"
                  className="px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#F59E0B', color: '#800000' }}
                >
                  Go to Portal →
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Step Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  {steps.map((s, i) => (
                    <div key={s} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                          style={{
                            backgroundColor: i <= step ? '#800000' : '#e2e8f0',
                            color: i <= step ? '#F59E0B' : '#94a3b8',
                          }}
                        >
                          {i < step ? <CheckCircle size={16} /> : i + 1}
                        </div>
                        <p
                          className="text-xs mt-1.5 font-medium hidden sm:block text-center"
                          style={{ color: i <= step ? '#800000' : '#94a3b8' }}
                        >
                          {s}
                        </p>
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className="flex-1 h-0.5 mx-2 mb-5 transition-all duration-500"
                          style={{ backgroundColor: i < step ? '#F59E0B' : '#e2e8f0' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">

                {/* STEP 0 — Student Info */}
                {step === 0 && (
                  <div className="flex flex-col gap-5">
                    <div className="mb-2">
                      <h2 className="text-xl font-bold" style={{ color: '#800000' }}>Student Information</h2>
                      <p className="text-sm mt-1" style={{ color: '#64748B' }}>Tell us about the student applying</p>
                    </div>
                    <Field label="Student Full Name *" error={errors.studentName}>
                      <input
                        type="text"
                        placeholder="First and last name"
                        value={form.studentName}
                        onChange={(e) => update('studentName', e.target.value)}
                        className={inputClass}
                        style={{ borderColor: errors.studentName ? '#ef4444' : '#e2e8f0', color: '#800000' }}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Date of Birth *" error={errors.dob}>
                        <input
                          type="date"
                          value={form.dob}
                          onChange={(e) => update('dob', e.target.value)}
                          className={inputClass}
                          style={{ borderColor: errors.dob ? '#ef4444' : '#e2e8f0', color: '#800000' }}
                        />
                      </Field>
                      <Field label="Gender *" error={errors.gender}>
                        <select
                          value={form.gender}
                          onChange={(e) => update('gender', e.target.value)}
                          className={inputClass}
                          style={{ borderColor: errors.gender ? '#ef4444' : '#e2e8f0', color: form.gender ? '#800000' : '#94a3b8' }}
                        >
                          <option value="">Select</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </Field>
                    </div>
                    <Field label="Nationality">
                      <input
                        type="text"
                        value={form.nationality}
                        onChange={(e) => update('nationality', e.target.value)}
                        className={inputClass}
                        style={{ borderColor: '#e2e8f0', color: '#800000' }}
                      />
                    </Field>
                  </div>
                )}

                {/* STEP 1 — Academic */}
                {step === 1 && (
                  <div className="flex flex-col gap-5">
                    <div className="mb-2">
                      <h2 className="text-xl font-bold" style={{ color: '#800000' }}>Academic Information</h2>
                      <p className="text-sm mt-1" style={{ color: '#64748B' }}>Tell us about the student's academic background</p>
                    </div>
                    <Field label="Current / Last School Attended *" error={errors.currentSchool}>
                      <input
                        type="text"
                        placeholder="Name of school"
                        value={form.currentSchool}
                        onChange={(e) => update('currentSchool', e.target.value)}
                        className={inputClass}
                        style={{ borderColor: errors.currentSchool ? '#ef4444' : '#e2e8f0', color: '#800000' }}
                      />
                    </Field>
                    <Field label="Grade / Class Applying For *" error={errors.gradeApplying}>
                      <select
                        value={form.gradeApplying}
                        onChange={(e) => update('gradeApplying', e.target.value)}
                        className={inputClass}
                        style={{ borderColor: errors.gradeApplying ? '#ef4444' : '#e2e8f0', color: form.gradeApplying ? '#800000' : '#94a3b8' }}
                      >
                        <option value="">Select class</option>
                        <option>Nursery</option>
                        <option>Kindergarten</option>
                        <option>Primary 1</option>
                        <option>Primary 2</option>
                        <option>Primary 3</option>
                        <option>Primary 4</option>
                        <option>Primary 5</option>
                        <option>Primary 6</option>
                        <option>Primary 7</option>
                      </select>
                    </Field>
                    <Field label="Most Recent Exam Results">
                      <input
                        type="text"
                        placeholder="e.g. PLE Aggregate 4, or top of class in P.6"
                        value={form.previousResults}
                        onChange={(e) => update('previousResults', e.target.value)}
                        className={inputClass}
                        style={{ borderColor: '#e2e8f0', color: '#800000' }}
                      />
                    </Field>
                    <Field label="Upload Report Card (Optional)">
                      <label
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed cursor-pointer hover:bg-gray-50 transition-colors"
                        style={{ borderColor: '#e2e8f0' }}
                      >
                        <Upload size={18} style={{ color: '#94a3b8' }} />
                        <span className="text-sm" style={{ color: '#94a3b8' }}>
                          Click to upload PDF or image
                        </span>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                      </label>
                    </Field>
                  </div>
                )}

                {/* STEP 2 — Parent */}
                {step === 2 && (
                  <div className="flex flex-col gap-5">
                    <div className="mb-2">
                      <h2 className="text-xl font-bold" style={{ color: '#800000' }}>Parent / Guardian Details</h2>
                      <p className="text-sm mt-1" style={{ color: '#64748B' }}>Primary contact for the student</p>
                    </div>
                    <Field label="Parent / Guardian Full Name *" error={errors.parentName}>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={form.parentName}
                        onChange={(e) => update('parentName', e.target.value)}
                        className={inputClass}
                        style={{ borderColor: errors.parentName ? '#ef4444' : '#e2e8f0', color: '#800000' }}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Relationship *" error={errors.relationship}>
                        <select
                          value={form.relationship}
                          onChange={(e) => update('relationship', e.target.value)}
                          className={inputClass}
                          style={{ borderColor: errors.relationship ? '#ef4444' : '#e2e8f0', color: form.relationship ? '#800000' : '#94a3b8' }}
                        >
                          <option value="">Select</option>
                          <option>Father</option>
                          <option>Mother</option>
                          <option>Guardian</option>
                          <option>Other</option>
                        </select>
                      </Field>
                      <Field label="Occupation">
                        <input
                          type="text"
                          placeholder="e.g. Teacher"
                          value={form.occupation}
                          onChange={(e) => update('occupation', e.target.value)}
                          className={inputClass}
                          style={{ borderColor: '#e2e8f0', color: '#800000' }}
                        />
                      </Field>
                    </div>
                    <Field label="Phone Number *" error={errors.phone}>
                      <input
                        type="tel"
                        placeholder="07XXXXXXXX"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className={inputClass}
                        style={{ borderColor: errors.phone ? '#ef4444' : '#e2e8f0', color: '#800000' }}
                      />
                    </Field>
                    <Field label="Email Address *" error={errors.email}>
                      <input
                        type="email"
                        placeholder="parent@email.com"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={inputClass}
                        style={{ borderColor: errors.email ? '#ef4444' : '#e2e8f0', color: '#800000' }}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="How Did You Hear About Us?">
                        <select
                          value={form.howHeard}
                          onChange={(e) => update('howHeard', e.target.value)}
                          className={inputClass}
                          style={{ borderColor: '#e2e8f0', color: form.howHeard ? '#800000' : '#94a3b8' }}
                        >
                          <option value="">Select</option>
                          <option>Friend / Family</option>
                          <option>Social Media</option>
                          <option>Newspaper</option>
                          <option>Radio / TV</option>
                          <option>Walked Past</option>
                          <option>Other</option>
                        </select>
                      </Field>
                      <Field label="Special Educational Needs?">
                        <select
                          value={form.specialNeeds}
                          onChange={(e) => update('specialNeeds', e.target.value)}
                          className={inputClass}
                          style={{ borderColor: '#e2e8f0', color: '#800000' }}
                        >
                          <option>No</option>
                          <option>Yes — will provide details</option>
                        </select>
                      </Field>
                    </div>
                  </div>
                )}

                {/* STEP 3 — Review */}
                {step === 3 && (
                  <div className="flex flex-col gap-5">
                    <div className="mb-2">
                      <h2 className="text-xl font-bold" style={{ color: '#800000' }}>Review Your Application</h2>
                      <p className="text-sm mt-1" style={{ color: '#64748B' }}>Please confirm your details before submitting</p>
                    </div>
                    {[
                      {
                        title: 'Student Information',
                        fields: [
                          { label: 'Name', value: form.studentName },
                          { label: 'Date of Birth', value: form.dob },
                          { label: 'Gender', value: form.gender },
                          { label: 'Nationality', value: form.nationality },
                        ],
                      },
                      {
                        title: 'Academic',
                        fields: [
                          { label: 'Current School', value: form.currentSchool },
                          { label: 'Applying For', value: form.gradeApplying },
                          { label: 'Results', value: form.previousResults || 'Not provided' },
                        ],
                      },
                      {
                        title: 'Parent / Guardian',
                        fields: [
                          { label: 'Name', value: form.parentName },
                          { label: 'Relationship', value: form.relationship },
                          { label: 'Phone', value: form.phone },
                          { label: 'Email', value: form.email },
                        ],
                      },
                    ].map((section) => (
                      <div key={section.title} className="rounded-xl overflow-hidden border border-gray-100">
                        <div className="px-5 py-3" style={{ backgroundColor: '#800000' }}>
                          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#F59E0B' }}>
                            {section.title}
                          </p>
                        </div>
                        <div className="divide-y divide-gray-50">
                          {section.fields.map((f) => (
                            <div key={f.label} className="flex items-center justify-between px-5 py-3">
                              <p className="text-xs" style={{ color: '#94a3b8' }}>{f.label}</p>
                              <p className="text-sm font-medium" style={{ color: '#800000' }}>{f.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: 'rgba(255,140,0,0.08)' }}
                    >
                      <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
                      <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
                        By submitting this application I confirm that all information provided is accurate
                        and I agree to Project Secondary School's admissions terms and conditions.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-8">
                  {step > 0 && (
                    <button
                      onClick={() => { setStep(step - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className="flex-1 py-3 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2 transition-all duration-200 hover:bg-gray-50"
                      style={{ borderColor: '#e2e8f0', color: '#64748B' }}
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  )}
                  {step < steps.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
                      style={{ backgroundColor: '#F59E0B', color: '#800000' }}
                    >
                      Continue <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:opacity-70"
                      style={{ backgroundColor: '#800000', color: 'white' }}
                    >
                      {status === 'loading' ? (
                        <>
                          <div
                            className="w-4 h-4 rounded-full border-2 animate-spin"
                            style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#F59E0B' }}
                          />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  )}
                </div>

              </div>
            </>
          )}
        </div>
      </section>

    </main>
  )
}