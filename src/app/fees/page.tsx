'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, X, CreditCard, Lock } from 'lucide-react'

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

const feeData = [
  { grade: 'Nursery – Kindergarten', tuition: 950000, activity: 150000, total: 1100000 },
  { grade: 'Primary 1 – Primary 3', tuition: 1100000, activity: 150000, total: 1250000 },
  { grade: 'Primary 4 – Primary 6', tuition: 1250000, activity: 200000, total: 1450000 },
  { grade: 'Primary 7 (Candidate)', tuition: 1500000, activity: 300000, total: 1800000 },
]

const included = [
  'All tuition and class learning materials',
  'Meals included in all fee packages',
  'Library and computer resource access',
  'Sports and PE coaching',
  'Cultural and co-curricular activities',
  'PLE intensive preparation for P.7',
]

function formatUGX(amount: number) {
  return 'UGX ' + amount.toLocaleString()
}

function PayModal({
  onClose,
}: {
  onClose: () => void
}) {
  const [step, setStep] = useState<'method' | 'student' | 'payment' | 'loading' | 'success'>('method')
  const [method, setMethod] = useState('')
  const [student, setStudent] = useState({ name: '', class: '', term: 'Term 1 — 2025' })
  const [payForm, setPayForm] = useState({ phone: '', card: '', expiry: '', cvv: '', code: '' })

  const selectedFee = feeData.find(f => f.grade === student.class)?.total || feeData[0].total
  const ref = `PSS-${Date.now().toString().slice(-6)}`

  const methods = [
    { id: 'mtn', label: 'MTN MoMo', sub: 'Mobile Money', icon: 'M', bg: '#fffbeb', border: '#F59E0B', iconBg: '#FFA533', iconColor: '#800000' },
    { id: 'airtel', label: 'Airtel Money', sub: 'Mobile Money', icon: 'A', bg: '#fef2f2', border: '#ef4444', iconBg: '#ef4444', iconColor: 'white' },
    { id: 'card', label: 'Debit / Credit', sub: 'Visa & Mastercard', icon: '💳', bg: '#f0fdf4', border: '#22c55e', iconBg: '#22c55e', iconColor: 'white' },
    { id: 'schoolpay', label: 'SchoolPay', sub: 'Student code', icon: 'S', bg: '#eff6ff', border: '#800000', iconBg: '#800000', iconColor: 'white' },
  ]

  function handlePay() {
    setStep('loading')
    setTimeout(() => setStep('success'), 2800)
  }

  const stepTitles: Record<string, string> = {
    method: 'Choose Payment Method',
    student: 'Student Details',
    payment: 'Payment Details',
    loading: 'Processing...',
    success: 'Payment Complete',
  }

  const stepNumbers: Record<string, number> = {
    method: 1, student: 2, payment: 3, loading: 3, success: 3,
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: 'white' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <p className="font-bold text-base" style={{ color: '#800000' }}>
              {stepTitles[step]}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
              Project Secondary School
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X size={16} style={{ color: '#64748B' }} />
          </button>
        </div>

        {/* Step indicators */}
        {step !== 'loading' && step !== 'success' && (
          <div className="flex items-center gap-2 px-6 pt-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: stepNumbers[step] >= n ? '#800000' : '#e2e8f0',
                    color: stepNumbers[step] >= n ? '#F59E0B' : '#94a3b8',
                  }}
                >
                  {n}
                </div>
                {n < 3 && (
                  <div
                    className="h-0.5 flex-1 transition-all duration-300"
                    style={{ backgroundColor: stepNumbers[step] > n ? '#F59E0B' : '#e2e8f0' }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="p-6">

          {/* Amount pill */}
          {step !== 'success' && step !== 'loading' && (
            <div
              className="rounded-xl p-3 mb-6 flex items-center justify-between"
              style={{ backgroundColor: 'rgba(255,140,0,0.08)' }}
            >
              <p className="text-xs font-medium" style={{ color: '#64748B' }}>Amount Due</p>
              <p className="text-lg font-bold" style={{ color: '#800000' }}>
                {formatUGX(selectedFee)}
              </p>
            </div>
          )}

          {/* STEP 1 — Method */}
          {step === 'method' && (
            <div className="flex flex-col gap-3">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setMethod(m.id); setStep('student') }}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                  style={{ borderColor: '#e2e8f0', backgroundColor: 'white' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = m.border
                    e.currentTarget.style.backgroundColor = m.bg
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0'
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ backgroundColor: m.iconBg, color: m.iconColor }}
                  >
                    {m.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#800000' }}>{m.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{m.sub}</p>
                  </div>
                  <div className="ml-auto text-gray-300 text-lg">›</div>
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 — Student Details */}
          {step === 'student' && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
                  Student Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amara Osei"
                  value={student.name}
                  onChange={(e) => setStudent({ ...student, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-yellow-400"
                  style={{ borderColor: '#e2e8f0', color: '#800000' }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
                  Class
                </label>
                <select
                  value={student.class}
                  onChange={(e) => setStudent({ ...student, class: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                  style={{ borderColor: '#e2e8f0', color: '#800000' }}
                >
                  {feeData.map((f) => (
                    <option key={f.grade} value={f.grade}>{f.grade}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
                  Term
                </label>
                <select
                  value={student.term}
                  onChange={(e) => setStudent({ ...student, term: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                  style={{ borderColor: '#e2e8f0', color: '#800000' }}
                >
                  <option>Term 1 — 2025</option>
                  <option>Term 2 — 2025</option>
                  <option>Term 3 — 2025</option>
                </select>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setStep('method')}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 hover:bg-gray-50"
                  style={{ borderColor: '#e2e8f0', color: '#64748B' }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep('payment')}
                  disabled={!student.name}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#F59E0B', color: '#800000' }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Payment Details */}
          {step === 'payment' && (
            <div className="flex flex-col gap-4">
              <div
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: '#F8FAFC' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: methods.find(m => m.id === method)?.iconBg,
                    color: methods.find(m => m.id === method)?.iconColor,
                  }}
                >
                  {methods.find(m => m.id === method)?.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#800000' }}>
                    {methods.find(m => m.id === method)?.label}
                  </p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    Paying for: {student.name} — {student.class}
                  </p>
                </div>
              </div>

              {(method === 'mtn' || method === 'airtel') && (
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
                    {method === 'mtn' ? 'MTN' : 'Airtel'} Mobile Money Number
                  </label>
                  <input
                    type="text"
                    placeholder={method === 'mtn' ? '077XXXXXXX' : '075XXXXXXX'}
                    value={payForm.phone}
                    onChange={(e) => setPayForm({ ...payForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-yellow-400"
                    style={{ borderColor: '#e2e8f0', color: '#800000' }}
                  />
                  <p className="text-xs mt-2" style={{ color: '#94a3b8' }}>
                    You will receive a prompt on your {method === 'mtn' ? 'MTN' : 'Airtel'} line to confirm.
                  </p>
                </div>
              )}

              {method === 'card' && (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        value={payForm.card}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 16)
                          const formatted = val.match(/.{1,4}/g)?.join(' ') || val
                          setPayForm({ ...payForm, card: formatted })
                        }}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-yellow-400"
                        style={{ borderColor: '#e2e8f0', color: '#800000' }}
                      />
                      <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>Expiry</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        maxLength={7}
                        value={payForm.expiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 4)
                          const formatted = val.length > 2 ? val.slice(0, 2) + ' / ' + val.slice(2) : val
                          setPayForm({ ...payForm, expiry: formatted })
                        }}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-yellow-400"
                        style={{ borderColor: '#e2e8f0', color: '#800000' }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={3}
                        value={payForm.cvv}
                        onChange={(e) => setPayForm({ ...payForm, cvv: e.target.value.replace(/\D/g, '') })}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-yellow-400"
                        style={{ borderColor: '#e2e8f0', color: '#800000' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === 'schoolpay' && (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>Student Code</label>
                    <input
                      type="text"
                      placeholder="e.g. PSS2025001"
                      value={payForm.code}
                      onChange={(e) => setPayForm({ ...payForm, code: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-yellow-400"
                      style={{ borderColor: '#e2e8f0', color: '#800000' }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>Guardian Phone</label>
                    <input
                      type="text"
                      placeholder="+256 7XX XXX XXX"
                      value={payForm.phone}
                      onChange={(e) => setPayForm({ ...payForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-yellow-400"
                      style={{ borderColor: '#e2e8f0', color: '#800000' }}
                    />
                  </div>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    Confirmation sent via SchoolPay SMS and email.
                  </p>
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setStep('student')}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 hover:bg-gray-50"
                  style={{ borderColor: '#e2e8f0', color: '#64748B' }}
                >
                  ← Back
                </button>
                <button
                  onClick={handlePay}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#F59E0B', color: '#800000' }}
                >
                  Pay Now →
                </button>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Lock size={12} style={{ color: '#94a3b8' }} />
                <p className="text-xs" style={{ color: '#94a3b8' }}>Secured & encrypted</p>
              </div>
            </div>
          )}

          {/* Loading */}
          {step === 'loading' && (
            <div className="flex flex-col items-center py-10 gap-5">
              <div
                className="w-14 h-14 rounded-full border-4 animate-spin"
                style={{ borderColor: '#e2e8f0', borderTopColor: '#F59E0B' }}
              />
              <p className="font-semibold text-sm" style={{ color: '#800000' }}>Processing payment...</p>
              <p className="text-xs" style={{ color: '#94a3b8' }}>Please do not close this window</p>
            </div>
          )}

          {/* Success */}
          {step === 'success' && (
            <div className="flex flex-col items-center py-6 gap-4 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(34,197,94,0.12)' }}
              >
                <CheckCircle size={32} style={{ color: '#22c55e' }} />
              </div>
              <div>
                <p className="font-bold text-lg mb-1" style={{ color: '#800000' }}>Payment Successful!</p>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  {student.name} — {student.class} fees received.
                </p>
              </div>
              <div className="w-full rounded-xl p-4" style={{ backgroundColor: '#F8FAFC' }}>
                <p className="text-xs" style={{ color: '#64748B' }}>Reference Number</p>
                <p className="font-bold text-base mt-1" style={{ color: '#800000' }}>{ref}</p>
                <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>
                  via {methods.find(m => m.id === method)?.label}
                </p>
                <p className="text-xs mt-2" style={{ color: '#94a3b8' }}>Receipt sent to your registered email</p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#800000', color: 'white' }}
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function FeesPage() {
  const hero = useReveal()
  const tableRef = useReveal()
  const includedRef = useReveal()
  const [modal, setModal] = useState(false)

  return (
    <main style={{ paddingTop: '64px' }}>

      {modal && <PayModal onClose={() => setModal(false)} />}

      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80"
            alt="Fees"
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
            2025 / 2026
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Fee Structure</h1>
          <p className="text-gray-300 max-w-lg mx-auto text-sm">
           Transparent, affordable fees — meals included in all packages
          </p>
        </div>
      </section>

      {/* Fee Table */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div
            ref={tableRef.ref}
            style={{
              opacity: tableRef.visible ? 1 : 0,
              transform: tableRef.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div className="text-center mb-12">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
              >
                Per Term
              </span>
              <h2 className="text-4xl font-bold" style={{ color: '#800000' }}>
                School Fees Breakdown
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#800000' }}>
                    {['Class', 'Tuition', 'Requirements Levy', 'Total / Term'].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: '#F59E0B' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feeData.map((row, i) => (
                    <tr
                      key={row.grade}
                      className="border-t border-gray-50 hover:bg-yellow-50 transition-colors duration-200"
                      style={{ backgroundColor: i % 2 === 0 ? 'white' : '#F8FAFC' }}
                    >
                      <td className="px-5 py-4 font-semibold text-sm" style={{ color: '#800000' }}>{row.grade}</td>
                      <td className="px-5 py-4 text-sm" style={{ color: '#64748B' }}>{formatUGX(row.tuition)}</td>
                      <td className="px-5 py-4 text-sm" style={{ color: '#64748B' }}>{formatUGX(row.activity)}</td>
                      {/* <td className="px-5 py-4 text-sm" style={{ color: '#64748B' }}>{formatUGX(row.boarding)}</td> */}
                      <td className="px-5 py-4 font-bold text-sm" style={{ color: '#800000' }}>{formatUGX(row.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col items-center gap-4 mt-10">
              <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
                * Fees are payable at the beginning of each term. Meals are included in all packages. Uniform is purchased separately from the school store.
              </p>
              <button
                onClick={() => setModal(true)}
                className="px-10 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                style={{ backgroundColor: '#F59E0B', color: '#800000' }}
              >
                Pay School Fees Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-4xl mx-auto">
          <div
            ref={includedRef.ref}
            style={{
              opacity: includedRef.visible ? 1 : 0,
              transform: includedRef.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div className="text-center mb-12">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ backgroundColor: 'rgba(255,140,0,0.15)', color: '#CC7000' }}
              >
                Included
              </span>
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#800000' }}>
                What Your Fees Cover
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {included.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  style={{
                    opacity: includedRef.visible ? 1 : 0,
                    transform: includedRef.visible ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(255,140,0,0.12)' }}
                  >
                    <CheckCircle size={18} style={{ color: '#F59E0B' }} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#800000' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: '#800000' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Questions About Fees?</h2>
          <p className="text-gray-400 mb-8 text-sm">Our bursar is available Monday to Friday, 8:00am – 4:00pm. Call +256 708 810 000.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#F59E0B', color: '#800000' }}
            >
              Contact the Bursar
            </Link>
            <Link
              href="/apply"
              className="px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:bg-white/10"
              style={{ border: '2px solid rgba(255,255,255,0.3)' }}
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}