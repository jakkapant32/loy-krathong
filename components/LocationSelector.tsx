'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Search, X, Waves, Building2, TreePine } from 'lucide-react'
import { thailandProvinces } from '@/lib/thailand-provinces'
import { famousLocations } from '@/lib/famous-locations'
import { KrathongGraphics } from './KrathongGraphics'

interface LocationSelectorProps {
  wishData: { name: string; wish: string }
  krathong: string
  onSelect: (location: string, lat?: number, lng?: number) => void
  onBack: () => void
}

// แปลงจังหวัดเป็น locations format
const provinceLocations = thailandProvinces.map(province => ({
  id: province.id,
  name: province.name,
  emoji: '🌊',
  description: `จังหวัด${province.name}`,
  lat: province.lat,
  lng: province.lng,
  type: 'province',
}))

// รวมจังหวัดและสถานที่สำคัญ
const allLocations = [
  ...famousLocations.map(loc => ({
    id: loc.id,
    name: loc.name,
    emoji: loc.emoji,
    description: loc.description,
    lat: loc.lat,
    lng: loc.lng,
    type: loc.type,
  })),
  ...provinceLocations,
]

const krathongEmojis: Record<string, string> = {
  'banana-leaf': '🌿',
  'lotus': '🪷',
  'bread': '🍞',
  'coconut': '🥥',
}

export default function LocationSelector({ wishData, krathong, onSelect, onBack }: LocationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'famous' | 'province'>('all')

  // กรองตามหมวดหมู่
  let filteredByCategory = allLocations
  if (selectedCategory === 'famous') {
    filteredByCategory = allLocations.filter(loc => loc.type !== 'province')
  } else if (selectedCategory === 'province') {
    filteredByCategory = allLocations.filter(loc => loc.type === 'province')
  }

  // กรองตามคำค้นหา
  const filteredLocations = filteredByCategory.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <span>กลับไปแก้ไขคำอธิษฐาน</span>
      </button>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl mb-6">
        <div className="text-center mb-6">
          <div className="mb-3 animate-float flex justify-center">
            <KrathongGraphics type={krathong} size={80} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            คำอธิษฐานของคุณ
          </h2>
          <p className="text-sm md:text-base text-gray-300 italic">"{wishData.wish}"</p>
          <p className="text-xs md:text-sm text-gray-400 mt-2">- {wishData.name}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center flex items-center justify-center gap-2">
          <MapPin className="w-5 md:w-6 h-5 md:h-6" />
          <span>เลือกสถานที่ลอยกระทง</span>
        </h3>

        {/* Search Box and Category Filter */}
        <div className="mb-6 space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setSelectedCategory('famous')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                selectedCategory === 'famous'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Waves className="w-4 h-4" />
              สถานที่สำคัญ
            </button>
            <button
              onClick={() => setSelectedCategory('province')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                selectedCategory === 'province'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <MapPin className="w-4 h-4" />
              จังหวัด
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาสถานที่หรือจังหวัด..."
              className="w-full pl-12 pr-12 py-3 md:py-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-sm md:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-400 text-center">
              พบ {filteredLocations.length} สถานที่
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location, index) => (
              <motion.button
                key={location.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(location.id, location.lat, location.lng)}
                className="p-4 md:p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-purple-400/50 hover:bg-white/20 transition-all text-left group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {location.emoji}
                </div>
                <h4 className="text-base md:text-lg font-bold mb-1">{location.name}</h4>
                <p className="text-xs md:text-sm text-gray-400">{location.description}</p>
              </motion.button>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">ไม่พบจังหวัดที่ค้นหา</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
              >
                ล้างการค้นหา
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

