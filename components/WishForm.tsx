'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { KrathongGraphics } from './KrathongGraphics'

interface WishFormProps {
  krathong: string
  onSubmit: (name: string, wish: string) => void
  onBack: () => void
}

const krathongEmojis: Record<string, string> = {
  'banana-leaf': '🌿',
  'lotus': '🪷',
  'bread': '🍞',
  'coconut': '🥥',
}

export default function WishForm({ krathong, onSubmit, onBack }: WishFormProps) {
  const [name, setName] = useState('')
  const [wish, setWish] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && wish.trim()) {
      onSubmit(name.trim(), wish.trim())
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
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
          <div className="mb-4 animate-float flex justify-center">
            <KrathongGraphics type={krathong} size={100} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            พิมพ์คำอธิษฐานของคุณ
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            เขียนความในใจและคำอธิษฐานลงในกระทง
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              ชื่อของคุณ
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="พิมพ์ชื่อของคุณ"
              className="w-full px-4 py-2 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label htmlFor="wish" className="block text-sm font-medium text-gray-300 mb-2">
              คำอธิษฐาน
            </label>
            <textarea
              id="wish"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="เช่น ขอให้ครอบครัวมีความสุข ขอให้สอบติดมหาวิทยาลัยที่ตั้งใจไว้..."
              rows={5}
              className="w-full px-4 py-2 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-none text-sm md:text-base"
              required
            />
            <p className="text-xs text-gray-400 mt-2">
              {wish.length} / 200 ตัวอักษร
            </p>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!name.trim() || !wish.trim()}
            className="w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-base md:text-lg shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>ต่อไปเลือกสถานที่ลอย</span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

