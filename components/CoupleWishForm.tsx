'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Sparkles } from 'lucide-react'
import { KrathongGraphics } from './KrathongGraphics'

interface CoupleWishFormProps {
  krathong: string
  onSubmit: (person1: { name: string; wish: string }, person2: { name: string; wish: string }) => void
  onBack: () => void
}

const krathongEmojis: Record<string, string> = {
  'banana-leaf': '🌿',
  'lotus': '🪷',
  'bread': '🍞',
  'coconut': '🥥',
}

export default function CoupleWishForm({ krathong, onSubmit, onBack }: CoupleWishFormProps) {
  const [person1, setPerson1] = useState({ name: '', wish: '' })
  const [person2, setPerson2] = useState({ name: '', wish: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (person1.name.trim() && person1.wish.trim() && person2.name.trim() && person2.wish.trim()) {
      onSubmit(person1, person2)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto"
    >
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>กลับไปเลือกกระทง</span>
      </button>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
            <div className="animate-float">
              <KrathongGraphics type={krathong} size={70} />
            </div>
            <Heart className="w-6 md:w-8 h-6 md:h-8 text-pink-400 animate-pulse" />
            <div className="animate-float" style={{ animationDelay: '0.5s' }}>
              <KrathongGraphics type={krathong} size={70} />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            💞 ลอยคู่ความรัก
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            พิมพ์คำอธิษฐานของทั้งสองคน แล้วกระทงจะลอยคู่กัน
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Person 1 */}
          <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-pink-400/30">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-pink-200">👤 คนที่ 1</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="person1-name" className="block text-sm font-medium text-gray-300 mb-2">
                  ชื่อ
                </label>
                <input
                  type="text"
                  id="person1-name"
                  value={person1.name}
                  onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                  placeholder="ชื่อของคุณ"
              className="w-full px-4 py-2 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="person1-wish" className="block text-sm font-medium text-gray-300 mb-2">
              คำอธิษฐาน
            </label>
            <textarea
              id="person1-wish"
              value={person1.wish}
              onChange={(e) => setPerson1({ ...person1, wish: e.target.value })}
              placeholder="เช่น ขอให้เรารักกันตลอดไป..."
              rows={3}
              className="w-full px-4 py-2 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all resize-none text-sm md:text-base"
              required
            />
              </div>
            </div>
          </div>

          {/* Heart divider */}
          <div className="flex items-center justify-center">
            <Heart className="w-12 h-12 text-pink-400 animate-pulse" />
          </div>

          {/* Person 2 */}
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-purple-400/30">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-purple-200">👤 คนที่ 2</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="person2-name" className="block text-sm font-medium text-gray-300 mb-2">
                  ชื่อ
                </label>
                <input
                  type="text"
                  id="person2-name"
                  value={person2.name}
                  onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                  placeholder="ชื่อของคนรัก"
              className="w-full px-4 py-2 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="person2-wish" className="block text-sm font-medium text-gray-300 mb-2">
              คำอธิษฐาน
            </label>
            <textarea
              id="person2-wish"
              value={person2.wish}
              onChange={(e) => setPerson2({ ...person2, wish: e.target.value })}
              placeholder="เช่น ขอให้เรามีความสุขด้วยกัน..."
              rows={3}
              className="w-full px-4 py-2 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-none text-sm md:text-base"
              required
            />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!person1.name.trim() || !person1.wish.trim() || !person2.name.trim() || !person2.wish.trim()}
            className="w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-base md:text-lg shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>ต่อไปเลือกสถานที่ลอย</span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

