'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, RefreshCw } from 'lucide-react'

interface Wish {
  id: string
  name: string
  wish: string
  krathong: string
  location: string
  isCouple: boolean
  partnerName?: string
  partnerWish?: string
  createdAt: string
}

const krathongEmojis: Record<string, string> = {
  'banana-leaf': '🌿',
  'lotus': '🪷',
  'bread': '🍞',
  'coconut': '🥥',
}

const locationNames: Record<string, string> = {
  'chaophraya': 'แม่น้ำเจ้าพระยา',
  'chiangmai': 'คูเมืองเชียงใหม่',
  'kaennakorn': 'บึงแก่นนคร',
  'songkhla': 'ทะเลสาบสงขลา',
  'ping': 'แม่น้ำปิง',
  'virtual': 'โลกออนไลน์',
}

export default function WishTower({ onBack }: { onBack: () => void }) {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWishes = async () => {
    try {
      setLoading(true)
      // ดึงเฉพาะคำอธิษฐานของตัวเองจาก localStorage
      const myWishIds = JSON.parse(localStorage.getItem('myWishes') || '[]')
      
      if (myWishIds.length === 0) {
        setWishes([])
        setError(null)
        setLoading(false)
        return
      }

      const response = await fetch(`/api/wishes?limit=100&myWishIds=${myWishIds.join(',')}`)
      const data = await response.json()
      if (data.success) {
        setWishes(data.wishes)
        setError(null)
      } else {
        setError('ไม่สามารถโหลดคำอธิษฐานได้')
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishes()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>กลับหน้าหลัก</span>
      </button>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          📜 หอคำอธิษฐาน
        </h2>
        <p className="text-gray-300">คำอธิษฐานของคุณ</p>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={fetchWishes}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>รีเฟรช</span>
        </button>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin text-4xl">🌕</div>
          <p className="mt-4 text-gray-400">กำลังโหลดคำอธิษฐาน...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-center text-red-200">
          {error}
        </div>
      )}

      {!loading && !error && wishes.length === 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/20">
          <p className="text-xl text-gray-400">ยังไม่มีคำอธิษฐาน</p>
          <p className="text-sm text-gray-500 mt-2">เป็นคนแรกที่ลอยกระทงเลย!</p>
        </div>
      )}

      {!loading && !error && wishes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{krathongEmojis[wish.krathong] || '🌿'}</div>
                {wish.isCouple && <Heart className="w-5 h-5 text-pink-400" />}
              </div>

              {wish.isCouple ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-pink-300 mb-1">💕 {wish.name}</p>
                    <p className="text-sm italic text-gray-300">"{wish.wish}"</p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-sm text-purple-300 mb-1">💕 {wish.partnerName}</p>
                    <p className="text-sm italic text-gray-300">"{wish.partnerWish}"</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400 mb-2">- {wish.name}</p>
                  <p className="text-base text-white italic mb-3">"{wish.wish}"</p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500">
                  📍 {locationNames[wish.location] || wish.location}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(wish.createdAt)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

