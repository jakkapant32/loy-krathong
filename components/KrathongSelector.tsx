'use client'

import { motion } from 'framer-motion'
import { KrathongGraphics } from './KrathongGraphics'

interface KrathongSelectorProps {
  onSelect: (krathong: string) => void
}

const krathongs = [
  {
    id: 'banana-leaf',
    name: 'กระทงใบตอง',
    emoji: '🌿',
    description: 'กระทงแบบดั้งเดิม',
    color: 'from-green-400 to-emerald-600',
  },
  {
    id: 'lotus',
    name: 'กระทงดอกบัว',
    emoji: '🪷',
    description: 'สวยงามและเป็นมงคล',
    color: 'from-pink-400 to-purple-600',
  },
  {
    id: 'bread',
    name: 'กระทงขนมปัง',
    emoji: '🍞',
    description: 'เป็นอาหารปลา',
    color: 'from-yellow-400 to-orange-600',
  },
  {
    id: 'coconut',
    name: 'กระทงกะลามะพร้าว',
    emoji: '🥥',
    description: 'กระทงธรรมชาติ',
    color: 'from-amber-400 to-brown-600',
  },
]

export default function KrathongSelector({ onSelect }: KrathongSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
      {krathongs.map((krathong, index) => (
        <motion.div
          key={krathong.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <button
            onClick={() => onSelect(krathong.id)}
            className={`
              w-full p-4 md:p-6 rounded-2xl
              bg-gradient-to-br ${krathong.color}
              shadow-2xl hover:shadow-purple-500/50
              transition-all duration-300
              border-2 border-white/20
              hover:border-white/40
              group
              flex flex-col items-center justify-center
            `}
          >
            <div className="mb-4 animate-float group-hover:animate-none flex items-center justify-center">
              <KrathongGraphics type={krathong.id} size={80} className="md:scale-125" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 text-center">
              {krathong.name}
            </h3>
            <p className="text-xs md:text-sm text-white/80 text-center">
              {krathong.description}
            </p>
            
            {/* Sparkle effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-sparkle" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  )
}

