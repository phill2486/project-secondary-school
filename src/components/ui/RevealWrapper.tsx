'use client'

import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

export default function RevealWrapper({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, visible } = useScrollReveal(0.1, delay)

  return (
    <div ref={ref} className={className} style={revealStyle(visible, delay)}>
      {children}
    </div>
  )
}