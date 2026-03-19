'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { GraduationCap, Eye, EyeOff, Lock, User } from 'lucide-react'

const DEMO_USERS = [
  { id: 'KPS045', name: 'Kato Emmanuel', role: 'student', class: 'Primary 6', password: 'kps2024' },
  { id: 'P001', name: 'Mr. David Kato', role: 'parent', child: 'Kato Emmanuel', password: 'parent123' },
  { id: 'T001', name: 'Class Teacher', role: 'teacher', subject: 'Mathematics', password: 'teacher123' },
]

export default function PortalPage() {
  const router = useRouter()
  const [form, setForm] = useState({ id: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = sessionStorage.getItem('portal_user')
    if (user) router.push('/portal/dashboard')
  }, [router])

  function handleLogin() {
    if (!form.id || !form.password) {
      setError('Please enter your ID and password')
      return
    }
    setLoading(true)
    setError('')
    setTimeout(() => {
      const user = DEMO_USERS.find(
        u => u.id === form.id && u.password === form.password
      )
      if (user) {
        sessionStorage.setItem('portal_user', JSON.stringify(user))
        router.push('/portal/dashboard')
      } else {
        setError('Invalid ID or password. Try the demo credentials below.')
        setLoading(false)
      }
    }, 1500)
  }

  return (
    <main style={{ paddingTop: '64px' }}>
      <div className="min-h-screen flex" style={{ backgroundColor: '#F8FAFC' }}>

        {/* Left — Image panel */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80"
            alt="School portal"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(128,0,0,0.85)' }} />
          <div className="relative z-10 flex flex-col justify-center px-12">
            <div className="flex items-center gap-3 mb-10">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#F59E0B' }}
              >
                <GraduationCap size={24} color="#800000" />
              </div>
              <div>
                <p className="font-bold text-white text-lg leading-tight">Project Secondary</p>
                <p className="text-xs" style={{ color: '#F59E0B' }}>School Portal</p>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Welcome to the<br />
              <span style={{ color: '#FF8C00' }}>KPS Parent Portal</span>
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed mb-10">
           Access your child's results, fee status, timetable and school announcements — all in one place.
            </p>
            <div className="flex flex-col gap-4">
              {[
              { icon: '📊', label: 'View PLE results and term performance' },
              { icon: '💳', label: 'Check and pay school fees' },
              { icon: '📅', label: 'View timetable and school events' },
              { icon: '📢', label: 'Read school announcements' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-gray-300 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Login form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#800000' }}
              >
                <GraduationCap size={20} color="#F59E0B" />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#800000' }}>Kampala Preparatory School</p>
                <p className="text-xs" style={{ color: '#64748B' }}>KPS Parent & Student Portal</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-1" style={{ color: '#800000' }}>Sign In</h2>
                <p className="text-sm" style={{ color: '#64748B' }}>Enter your portal credentials to continue</p>
              </div>

              <div className="flex flex-col gap-5">
                {/* ID */}
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
                    Student / Parent ID
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
                    <input
                      type="text"
                      placeholder="e.g. KPS045 or P001"
                      value={form.id}
                      onChange={(e) => { setForm({ ...form, id: e.target.value }); setError('') }}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-yellow-400"
                      style={{ borderColor: error ? '#ef4444' : '#e2e8f0', color: '#800000' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#800000' }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) => { setForm({ ...form, password: e.target.value }); setError('') }}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      className="w-full pl-11 pr-11 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-yellow-400"
                      style={{ borderColor: error ? '#ef4444' : '#e2e8f0', color: '#800000' }}
                    />
                    <button
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showPass
                        ? <EyeOff size={16} style={{ color: '#94a3b8' }} />
                        : <Eye size={16} style={{ color: '#94a3b8' }} />
                      }
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-xs px-4 py-2 rounded-lg" style={{ color: '#ef4444', backgroundColor: '#fef2f2' }}>
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.02] disabled:opacity-70"
                  style={{ backgroundColor: '#800000', color: 'white' }}
                >
                  {loading ? (
                    <>
                      <div
                        className="w-4 h-4 rounded-full border-2 animate-spin"
                        style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#F59E0B' }}
                      />
                      Signing in...
                    </>
                  ) : 'Sign In →'}
                </button>
              </div>
            </div>

            {/* Demo credentials */}
            <div
              className="mt-4 rounded-2xl p-5 border"
              style={{ backgroundColor: 'white', borderColor: '#e2e8f0' }}
            >
              <p className="text-xs font-semibold mb-3" style={{ color: '#800000' }}>
                Demo Credentials
              </p>
              <div className="flex flex-col gap-2">
                {DEMO_USERS.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setForm({ id: u.id, password: u.password })}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs transition-all duration-200 hover:scale-[1.01] text-left"
                    style={{ backgroundColor: '#F8FAFC', border: '1px solid #e2e8f0' }}
                  >
                    <div>
                      <span className="font-semibold" style={{ color: '#800000' }}>{u.name}</span>
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                        style={{
                          backgroundColor: u.role === 'student' ? 'rgba(255,140,0,0.12)' : u.role === 'parent' ? 'rgba(128,0,0,0.08)' : 'rgba(34,197,94,0.1)',
                          color: u.role === 'student' ? '#CC7000' : u.role === 'parent' ? '#800000' : '#16a34a',
                        }}
                      >
                        {u.role}
                      </span>
                    </div>
                    <span style={{ color: '#94a3b8' }}>Click to fill →</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}