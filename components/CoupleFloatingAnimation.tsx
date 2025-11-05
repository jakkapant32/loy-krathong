'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { KrathongGraphics } from './KrathongGraphics'
import { thailandProvinces } from '@/lib/thailand-provinces'
import { famousLocations } from '@/lib/famous-locations'

interface CoupleFloatingAnimationProps {
  krathong: string
  person1: { name: string; wish: string }
  person2: { name: string; wish: string }
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

export default function CoupleFloatingAnimation({ krathong, person1, person2, location }: CoupleFloatingAnimationProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const newSparkles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setSparkles(newSparkles)

    const interval = setInterval(() => {
      const ripple = document.createElement('div')
      ripple.className = 'water-ripple'
      const x = 40 + (Math.random() - 0.5) * 20
      const y = 70 + (Math.random() - 0.5) * 10
      ripple.style.left = `${x}%`
      ripple.style.top = `${y}%`
      document.querySelector('.water-container')?.appendChild(ripple)
      
      setTimeout(() => ripple.remove(), 2000)
    }, 400)

    const interval2 = setInterval(() => {
      const ripple = document.createElement('div')
      ripple.className = 'water-ripple'
      const x = 60 + (Math.random() - 0.5) * 20
      const y = 70 + (Math.random() - 0.5) * 10
      ripple.style.left = `${x}%`
      ripple.style.top = `${y}%`
      document.querySelector('.water-container')?.appendChild(ripple)
      
      setTimeout(() => ripple.remove(), 2000)
    }, 500)

    return () => {
      clearInterval(interval)
      clearInterval(interval2)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="water-container absolute inset-0 bg-water-gradient opacity-90"></div>

        {/* Two krathongs floating together */}
        <div className="relative z-10 flex items-center gap-4 md:gap-8 flex-wrap justify-center">
          <motion.div
            initial={{ y: 150, opacity: 0, x: -50, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <motion.div
              animate={{
                y: [0, -25, 0],
                rotate: [0, 8, -8, 0],
                x: [0, -10, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <div className="filter drop-shadow-2xl">
                <KrathongGraphics type={krathong} size={160} />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="hidden md:block"
          >
            <Heart className="w-12 md:w-16 h-12 md:h-16 text-pink-400" />
          </motion.div>

          <motion.div
            initial={{ y: 150, opacity: 0, x: 50, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          >
            <motion.div
              animate={{
                y: [0, -25, 0],
                rotate: [0, -8, 8, 0],
                x: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="relative"
            >
              <div className="filter drop-shadow-2xl">
                <KrathongGraphics type={krathong} size={160} />
              </div>
            </motion.div>
          </motion.div>
        </div>

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

        {/* Wishes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-10 text-center px-4 mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto px-4">
            <div className="bg-pink-500/20 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-pink-400/30">
              <p className="text-base md:text-lg mb-2 text-white font-semibold">"{person1.wish}"</p>
              <p className="text-xs md:text-sm text-gray-300">- {person1.name}</p>
            </div>
            <div className="bg-purple-500/20 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-purple-400/30">
              <p className="text-base md:text-lg mb-2 text-white font-semibold">"{person2.wish}"</p>
              <p className="text-xs md:text-sm text-gray-300">- {person2.name}</p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-gray-300 mt-4 px-4">กำลังลอยไปที่ {locationNamesMap[location] || location}</p>
        </motion.div>

        {/* Success message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5 }}
          className="relative z-10 mt-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-4xl md:text-5xl mb-4">
            <span>🌕</span>
            <Heart className="w-6 md:w-8 h-6 md:h-8 text-pink-400" />
            <span>🌕</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 bg-clip-text text-transparent px-4">
            คำอธิษฐานของทั้งสองได้ถูกส่งไปแล้ว
          </h2>
        </motion.div>
      </div>
    </div>
  )
}

