'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#800000' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
  className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl"
  animate={{ rotate: [0, -10, 10, -10, 0] }}
  transition={{ delay: 0.5, duration: 0.6 }}
>
  <Image
    src="/kps2.jfif"
    alt="KPS Logo"
    width={96}
    height={96}
    className="object-contain"
  />
</motion.div>

            <div className="text-center">
              <motion.p
                className="text-white font-bold text-2xl tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Kampala Preparatory
              </motion.p>
              <motion.p
                className="text-sm font-semibold tracking-widest uppercase mt-1"
                style={{ color: '#FF8C00' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                School
              </motion.p>
            </div>

            <motion.p
              className="text-white/60 text-xs tracking-widest uppercase mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Soaring To Excellence
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-12 w-40 h-0.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: '#FF8C00' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}