'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  GraduationCap, LogOut, BookOpen, Trophy, Clock,
  TrendingUp, Bell, Calendar, ChevronRight, CheckCircle, AlertCircle
} from 'lucide-react'

const mockStudent = {
  id: 'KPS045',
  name: 'Kato Emmanuel',
  class: 'Primary 6',
  house: 'Eagle House',
  gpa: 'Div 1',
  attendance: 98,
  term: 'Term 1, 2026',
  feeStatus: 'paid',
  results: [
    { subject: 'Mathematics', teacher: 'Mr. Ssali', t1: 88, t2: 90, t3: 92, grade: 'D1', remarks: 'Excellent' },
    { subject: 'English Language', teacher: 'Mrs. Nakawesi', t1: 84, t2: 86, t3: 88, grade: 'D2', remarks: 'Very Good' },
    { subject: 'Science', teacher: 'Ms. Atim', t1: 90, t2: 93, t3: 95, grade: 'D1', remarks: 'Outstanding' },
    { subject: 'Social Studies', teacher: 'Mr. Okello', t1: 86, t2: 88, t3: 90, grade: 'D1', remarks: 'Excellent' },
    { subject: 'Religious Education', teacher: 'Mrs. Nambi', t1: 82, t2: 85, t3: 87, grade: 'D2', remarks: 'Very Good' },
    { subject: 'Luganda', teacher: 'Mr. Kato', t1: 80, t2: 83, t3: 85, grade: 'D2', remarks: 'Good' },
  ],
  events: [
    { date: 'Mar 20', title: 'P.7 Mock Examinations Begin', type: 'exam' },
    { date: 'Mar 28', title: 'Inter-House Sports Day', type: 'event' },
    { date: 'Apr 4', title: 'End of Term 1', type: 'holiday' },
    { date: 'May 6', title: 'Term 2 Begins', type: 'school' },
  ],
  announcements: [
    { title: 'P.7 Mock Exam Timetable Released', time: '2 hours ago', urgent: true },
    { title: 'Speed Skate Championships — March 28', time: '1 day ago', urgent: false },
    { title: 'School Fees Reminder — Term 2', time: '2 days ago', urgent: false },
  ],
}

const mockParent = {
  ...mockStudent,
  name: 'Mr. David Osei',
  role: 'parent',
  child: 'Amara Osei',
}

const mockTeacher = {
  name: 'Mr. Ronald Byamugisha',
  role: 'teacher',
  subject: 'Mathematics',
  classes: ['Primary 6 · Term 1, 2026'],
  students: 87,
  results: mockStudent.results,
}

function gradeColor(grade: string) {
  if (grade.startsWith('A')) return { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' }
  if (grade.startsWith('B')) return { bg: 'rgba(255,140,0,0.1)', color: '#CC7000' }
  return { bg: 'rgba(239,68,68,0.1)', color: '#dc2626' }
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const stored = sessionStorage.getItem('portal_user')
    if (!stored) { router.push('/portal'); return }
    setUser(JSON.parse(stored))
  }, [router])

  function logout() {
    sessionStorage.removeItem('portal_user')
    router.push('/portal')
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 animate-spin"
        style={{ borderColor: '#e2e8f0', borderTopColor: '#F59E0B' }} />
    </div>
  )

  const data = user.role === 'teacher' ? mockTeacher : mockStudent
  const tabs = user.role === 'teacher'
    ? ['overview', 'classes', 'results']
    : ['overview', 'results', 'fees', 'events']

  return (
    <main style={{ paddingTop: '64px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>

      {/* Dashboard Header */}
      <div style={{ backgroundColor: '#800000' }} className="px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
              style={{ backgroundColor: '#F59E0B', color: '#800000' }}
            >
              {data.name.charAt(0)}
            </div>
            <div>
              <p className="text-white font-bold">Welcome, {data.name.split(' ')[0]}</p>
              <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
                {user.role === 'student' && `${mockStudent.class} · ${mockStudent.term}`}
                {user.role === 'parent' && `Parent of ${mockParent.child}`}
                {user.role === 'teacher' && `${mockTeacher.subject} Teacher`}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:bg-white/10"
            style={{ color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: '#800000', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-3 text-xs font-semibold capitalize transition-all duration-200 whitespace-nowrap"
              style={{
                color: activeTab === tab ? '#F59E0B' : '#94a3b8',
                borderBottom: activeTab === tab ? '2px solid#FF8C00' : '2px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6">

            {/* Stats cards */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {(user.role !== 'teacher' ? [
                  { icon: TrendingUp, label: 'Division', value: 'Div 1', sub: 'PLE Standing', color: '#FF8C00' },
        { icon: Clock, label: 'Attendance', value: '98%', sub: 'This term', color: '#22c55e' },
        { icon: BookOpen, label: 'Subjects', value: '6', sub: 'Active this term', color: '#800000' },
        { icon: Trophy, label: 'House', value: 'Eagle', sub: 'Eagle House KPS', color: '#FF8C00' },
              ] : [
                { icon: BookOpen, label: 'Subject', value: mockTeacher.subject, sub: 'Teaching', color: '#F59E0B' },
                { icon: GraduationCap, label: 'Students', value: String(mockTeacher.students), sub: 'Total', color: '#800000' },
                { icon: Trophy, label: 'Classes', value: String(mockTeacher.classes.length), sub: 'Assigned', color: '#22c55e' },
                { icon: TrendingUp, label: 'Avg Score', value: '82%', sub: 'Class average', color: '#F59E0B' },
              ]).map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs" style={{ color: '#64748B' }}>{stat.label}</p>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}18` }}
                    >
                      <stat.icon size={15} style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mb-0.5" style={{ color: '#800000' }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Recent results */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold" style={{ color: '#800000' }}>Recent Results</h3>
                  <button
                    onClick={() => setActiveTab('results')}
                    className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: '#F59E0B' }}
                  >
                    View all <ChevronRight size={12} />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {mockStudent.results.slice(0, 4).map((r) => {
                    const gc = gradeColor(r.grade)
                    return (
                      <div key={r.subject} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-sm font-semibold" style={{ color: '#800000' }}>{r.subject}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{r.teacher}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-bold" style={{ color: '#800000' }}>{r.t3}%</p>
                            <p className="text-xs" style={{ color: '#94a3b8' }}>Term 3</p>
                          </div>
                          <span
                            className="px-2.5 py-1 rounded-lg text-xs font-bold"
                            style={{ backgroundColor: gc.bg, color: gc.color }}
                          >
                            {r.grade}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">

                {/* Fee status */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <h3 className="font-bold mb-4 text-sm" style={{ color: '#800000' }}>Fee Status</h3>
                  <div
                    className="flex items-center gap-3 p-3 rounded-xl mb-3"
                    style={{ backgroundColor: 'rgba(34,197,94,0.08)' }}
                  >
                    <CheckCircle size={18} style={{ color: '#22c55e' }} />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: '#16a34a' }}>Term 1 Paid</p>
                      <p className="text-xs" style={{ color: '#94a3b8' }}>UGX 1,740,000</p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: 'rgba(255,140,0,0.08)' }}
                  >
                    <AlertCircle size={18} style={{ color: '#F59E0B' }} />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: '#CC7000' }}>Term 2 Due Soon</p>
                      <p className="text-xs" style={{ color: '#94a3b8' }}>Due May 6, 2025</p>
                    </div>
                  </div>
                  <Link
                    href="/fees"
                    className="w-full mt-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center transition-all hover:scale-105"
                    style={{ backgroundColor: '#F59E0B', color: '#800000' }}
                  >
                    Pay Now →
                  </Link>
                </div>

                {/* Announcements */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell size={15} style={{ color: '#F59E0B' }} />
                    <h3 className="font-bold text-sm" style={{ color: '#800000' }}>Announcements</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {mockStudent.announcements.map((a) => (
                      <div key={a.title} className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: a.urgent ? '#ef4444' : '#94a3b8' }}
                        />
                        <div>
                          <p className="text-xs font-semibold" style={{ color: '#800000' }}>{a.title}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* RESULTS TAB */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold" style={{ color: '#800000' }}>Academic Results</h3>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
                  {user.role === 'student' ? mockStudent.class : 'All Classes'} — {mockStudent.term}
                </p>
              </div>
              <span
                className="px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{ backgroundColor: 'rgba(255,140,0,0.12)', color: '#CC7000' }}
              >
                Aggregates: 5 — Division 1
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC' }}>
                    {['Subject', 'Teacher', 'Term 1', 'Term 2', 'Term 3', 'Grade', 'Remarks'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold" style={{ color: '#64748B' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockStudent.results.map((r, i) => {
                    const gc = gradeColor(r.grade)
                    return (
                      <tr
                        key={r.subject}
                        className="border-t border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4 font-semibold text-sm" style={{ color: '#800000' }}>{r.subject}</td>
                        <td className="px-5 py-4 text-xs" style={{ color: '#64748B' }}>{r.teacher}</td>
                        <td className="px-5 py-4 text-sm" style={{ color: '#64748B' }}>{r.t1}%</td>
                        <td className="px-5 py-4 text-sm" style={{ color: '#64748B' }}>{r.t2}%</td>
                        <td className="px-5 py-4 font-bold text-sm" style={{ color: '#800000' }}>{r.t3}%</td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold"
                            style={{ backgroundColor: gc.bg, color: gc.color }}>
                            {r.grade}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs" style={{ color: '#94a3b8' }}>{r.remarks}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FEES TAB */}
        {activeTab === 'fees' && (
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold mb-6" style={{ color: '#800000' }}>Fee Statement — {mockStudent.term}</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Tuition Fee', amount: 'UGX 1,250,000', status: 'paid' },
                  { label: 'Requirements Levy', amount: 'UGX 200,000', status: 'paid' },
                  { label: 'Meals (Included)', amount: 'Included', status: 'paid' },
                  { label: 'Term 2 Balance', amount: 'UGX 1,450,000', status: 'pending' },
                ].map((item) => (
                  <div key={item.label}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ backgroundColor: '#F8FAFC' }}
                  >
                    <p className="text-sm font-medium" style={{ color: '#800000' }}>{item.label}</p>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-bold" style={{ color: '#800000' }}>{item.amount}</p>
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                        style={{
                          backgroundColor: item.status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(255,140,0,0.1)',
                          color: item.status === 'paid' ? '#16a34a' : '#CC7000',
                        }}
                      >
                        {item.status === 'paid' ? 'Paid' : 'Due'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/fees"
                className="w-full mt-6 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center transition-all hover:scale-105"
                style={{ backgroundColor: '#F59E0B', color: '#800000' }}
              >
                Pay Term 2 Fees →
              </Link>
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="max-w-2xl flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={18} style={{ color: '#F59E0B' }} />
                <h3 className="font-bold" style={{ color: '#800000' }}>Upcoming Events</h3>
              </div>
              <div className="flex flex-col gap-4">
                {mockStudent.events.map((event) => (
                  <div key={event.title} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                    <div
                      className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
                      style={{ backgroundColor: '#800000' }}
                    >
                      <p className="text-xs font-bold" style={{ color: '#F59E0B' }}>
                        {event.date.split(' ')[0]}
                      </p>
                      <p className="text-white text-xs font-semibold">
                        {event.date.split(' ')[1]}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#800000' }}>{event.title}</p>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block capitalize"
                        style={{
                          backgroundColor: event.type === 'exam' ? 'rgba(239,68,68,0.1)' : event.type === 'event' ? 'rgba(255,140,0,0.1)' : 'rgba(34,197,94,0.1)',
                          color: event.type === 'exam' ? '#dc2626' : event.type === 'event' ? '#CC7000' : '#16a34a',
                        }}
                      >
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CLASSES TAB — teacher only */}
        {activeTab === 'classes' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {mockTeacher.classes.map((cls) => (
              <div key={cls} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(255,140,0,0.12)' }}
                >
                  <GraduationCap size={24} style={{ color: '#F59E0B' }} />
                </div>
                <p className="font-bold text-lg" style={{ color: '#800000' }}>{cls}</p>
                <p className="text-xs mt-1" style={{ color: '#64748B' }}>Mathematics</p>
                <p className="text-xs mt-3 font-semibold" style={{ color: '#F59E0B' }}>~29 students</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}