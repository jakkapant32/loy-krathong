'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { KrathongGraphics } from './KrathongGraphics'
import { thailandProvinces } from '@/lib/thailand-provinces'
import { famousLocations } from '@/lib/famous-locations'

interface FloatingAnimationProps {
  krathong: string
  wish: string
  location: string
}

// สร้าง location names map
const locationNamesMap: Record<string, string> = {}
thailandProvinces.forEach(p => {
  locationNamesMap[p.id] = p.name
})
famousLocations.forEach(loc => {
  locationNamesMap[loc.id] = loc.name
})

export default function FloatingAnimation({ krathong, wish, location }: FloatingAnimationProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    // สร้างประกายไฟ
    const newSparkles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setSparkles(newSparkles)

    // สร้าง ripple effect
    const interval = setInterval(() => {
      const ripple = document.createElement('div')
      ripple.className = 'water-ripple'
      const x = 50 + (Math.random() - 0.5) * 20
      const y = 70 + (Math.random() - 0.5) * 10
      ripple.style.left = `${x}%`
      ripple.style.top = `${y}%`
      document.querySelector('.water-container')?.appendChild(ripple)
      
      setTimeout(() => ripple.remove(), 2000)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Water background */}
        <div className="water-container absolute inset-0 bg-water-gradient opacity-90"></div>

        {/* Floating krathong with graphics */}
        <motion.div
          initial={{ y: 150, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative z-10 mb-8"
        >
          <motion.div
            animate={{
              y: [0, -25, 0],
              rotate: [0, 8, -8, 0],
              x: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            <div className="filter drop-shadow-2xl">
              <KrathongGraphics type={krathong} size={200} />
            </div>
          </motion.div>
        </motion.div>

        {/* Sparkles */}
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="sparkle absolute"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Wish text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-10 text-center px-4"
        >
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/30 max-w-md mx-auto">
            <p className="text-lg md:text-xl mb-2 text-white font-semibold">"{wish}"</p>
            <p className="text-xs md:text-sm text-gray-300">กำลังลอยไปที่ {locationNamesMap[location] || location}</p>
          </div>
        </motion.div>

        {/* Success message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5 }}
          className="relative z-10 mt-8 text-center"
        >
          <div className="text-4xl md:text-5xl mb-4">🌕</div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent px-4">
            คำอธิษฐานของคุณได้ถูกส่งไปแล้ว
          </h2>
        </motion.div>
      </div>
    </div>
  )
}

