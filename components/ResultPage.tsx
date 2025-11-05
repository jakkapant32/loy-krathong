'use client'

import { motion } from 'framer-motion'
import { Share2, RefreshCw, Facebook, Instagram, Copy } from 'lucide-react'
import { useState, useEffect } from 'react'
import { KrathongGraphics } from './KrathongGraphics'
import { thailandProvinces } from '@/lib/thailand-provinces'
import { famousLocations } from '@/lib/famous-locations'

interface ResultPageProps {
  name: string
  wish: string
  krathong: string
  location: string
  locationLat?: number
  locationLng?: number
  isCouple?: boolean
  partnerName?: string
  partnerWish?: string
  onReset: () => void
}

const krathongEmojis: Record<string, string> = {
  'banana-leaf': '🌿',
  'lotus': '🪷',
  'bread': '🍞',
  'coconut': '🥥',
}

// สร้าง location names map
const locationNames: Record<string, string> = {}
thailandProvinces.forEach(p => {
  locationNames[p.id] = p.name
})
famousLocations.forEach(loc => {
  locationNames[loc.id] = loc.name
})

const blessings = [
  'ขอให้สมหวังดังคำอธิษฐาน 🌕',
  'ขอให้ความสุขและความเจริญรุ่งเรืองมาสู่คุณ ✨',
  'ขอให้สิ่งที่คุณปรารถนาบรรลุผล 💫',
  'ขอให้มีแต่ความดีและความสุขในชีวิต 🌟',
  'ขอให้คำอธิษฐานของคุณเป็นจริง 🌙',
]

export default function ResultPage({ 
  name, 
  wish, 
  krathong, 
  location, 
  locationLat,
  locationLng,
  isCouple = false,
  partnerName,
  partnerWish,
  onReset 
}: ResultPageProps) {
  const [randomBlessing] = useState(blessings[Math.floor(Math.random() * blessings.length)])
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  // บันทึกข้อมูลไปยังฐานข้อมูล
  useEffect(() => {
    const saveWish = async () => {
      try {
        const response = await fetch('/api/wishes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            wish,
            krathong,
            location,
            locationLat,
            locationLng,
            isPublic: false, // ตั้งเป็น private โดย default
            isCouple,
            partnerName: isCouple ? partnerName : undefined,
            partnerWish: isCouple ? partnerWish : undefined,
          }),
        })

        const data = await response.json()
        if (data.success) {
          setSaved(true)
          // เก็บ wish ID ลง localStorage เพื่อให้ผู้ใช้เห็นได้เฉพาะของตัวเอง
          const myWishes = JSON.parse(localStorage.getItem('myWishes') || '[]')
          myWishes.push(data.wish.id)
          localStorage.setItem('myWishes', JSON.stringify(myWishes))
        }
      } catch (error) {
        console.error('Error saving wish:', error)
      }
    }

    saveWish()
  }, [name, wish, krathong, location, locationLat, locationLng, isCouple, partnerName, partnerWish])

  const shareText = isCouple
    ? `เราคู่รักได้ลอยกระทงออนไลน์พร้อมคำอธิษฐาน: "${wish}" และ "${partnerWish}" ที่ ${locationNames[location]} 🌕`
    : `ฉันได้ลอยกระทงออนไลน์พร้อมคำอธิษฐาน: "${wish}" ที่ ${locationNames[location]} 🌕`

  const handleShare = async (platform: 'facebook' | 'instagram' | 'copy') => {
    if (platform === 'facebook') {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`
      window.open(url, '_blank')
    } else if (platform === 'instagram') {
      // Instagram doesn't support direct sharing, so we'll copy to clipboard
      navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      alert('คัดลอกข้อความแล้ว! ไปแชร์บน Instagram ได้เลย')
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 animate-float flex justify-center">
            <KrathongGraphics type={krathong} size={120} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
            🌕 คำอธิษฐานของคุณได้ถูกส่งไปแล้ว
          </h2>
        </div>

        {/* Wish Card */}
        <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border border-white/30">
          <div className="text-center">
            {isCouple ? (
              <div className="space-y-3 md:space-y-4">
                <div>
                  <p className="text-base md:text-lg mb-2 italic text-pink-200">"{wish}"</p>
                  <p className="text-sm md:text-base text-gray-300">- {name}</p>
                </div>
                <div className="border-t border-white/20 pt-3 md:pt-4">
                  <p className="text-base md:text-lg mb-2 italic text-purple-200">"{partnerWish}"</p>
                  <p className="text-sm md:text-base text-gray-300">- {partnerName}</p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-lg md:text-xl mb-3 md:mb-4 italic text-white">"{wish}"</p>
                <p className="text-sm md:text-base text-gray-300">- {name}</p>
              </>
            )}
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/20">
              <p className="text-xs md:text-sm text-gray-400">สถานที่: {locationNames[location] || location}</p>
            </div>
          </div>
        </div>

        {/* Random Blessing */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-3 md:p-4 mb-4 md:mb-6 text-center border border-yellow-400/30">
          <p className="text-base md:text-lg font-semibold text-yellow-200">{randomBlessing}</p>
        </div>

        {/* Share Buttons */}
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-center mb-3 md:mb-4 flex items-center justify-center gap-2">
            <Share2 className="w-4 md:w-5 h-4 md:h-5" />
            <span>แชร์คำอธิษฐานของคุณ</span>
          </h3>

          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('facebook')}
              className="p-3 md:p-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all flex flex-col items-center gap-1 md:gap-2"
            >
              <Facebook className="w-5 md:w-6 h-5 md:h-6" />
              <span className="text-xs md:text-sm">Facebook</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('instagram')}
              className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all flex flex-col items-center gap-1 md:gap-2"
            >
              <Instagram className="w-5 md:w-6 h-5 md:h-6" />
              <span className="text-xs md:text-sm">Instagram</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('copy')}
              className="p-3 md:p-4 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-semibold transition-all flex flex-col items-center gap-1 md:gap-2"
            >
              <Copy className="w-5 md:w-6 h-5 md:h-6" />
              <span className="text-xs md:text-sm">{copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}</span>
            </motion.button>
          </div>
        </div>

        {/* Reset Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="w-full mt-4 md:mt-6 py-3 md:py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base md:text-lg shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 md:w-5 h-4 md:h-5" />
          <span>ลอยกระทงใหม่</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

