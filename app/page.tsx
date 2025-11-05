'use client'

import { useState } from 'react'
import KrathongSelector from '@/components/KrathongSelector'
import WishForm from '@/components/WishForm'
import CoupleWishForm from '@/components/CoupleWishForm'
import LocationSelector from '@/components/LocationSelector'
import FloatingAnimation from '@/components/FloatingAnimation'
import CoupleFloatingAnimation from '@/components/CoupleFloatingAnimation'
import ResultPage from '@/components/ResultPage'
import KrathongMap from '@/components/KrathongMap'
import { Sparkles } from '@/components/Sparkles'
import { Heart, MapPin, Home as HomeIcon } from 'lucide-react'
import { motion } from 'framer-motion'

type Step = 'home' | 'select' | 'wish' | 'couple-wish' | 'location' | 'floating' | 'result' | 'map'

export default function Home() {
  const [step, setStep] = useState<Step>('home')
  const [selectedKrathong, setSelectedKrathong] = useState<string | null>(null)
  const [wishData, setWishData] = useState<{ name: string; wish: string } | null>(null)
  const [coupleData, setCoupleData] = useState<{ person1: { name: string; wish: string }; person2: { name: string; wish: string } } | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [locationLat, setLocationLat] = useState<number | undefined>(undefined)
  const [locationLng, setLocationLng] = useState<number | undefined>(undefined)
  const [isCoupleMode, setIsCoupleMode] = useState(false)

  const handleKrathongSelect = (krathong: string) => {
    setSelectedKrathong(krathong)
    setStep('wish')
  }

  const handleWishSubmit = (name: string, wish: string) => {
    setWishData({ name, wish })
    setStep('location')
  }

  const handleCoupleWishSubmit = (person1: { name: string; wish: string }, person2: { name: string; wish: string }) => {
    setCoupleData({ person1, person2 })
    setStep('location')
  }

  const handleLocationSelect = (location: string, lat?: number, lng?: number) => {
    setSelectedLocation(location)
    setLocationLat(lat)
    setLocationLng(lng)
    setStep('floating')
    
    setTimeout(() => {
      setStep('result')
    }, 4000)
  }

  const handleReset = () => {
    setStep('home')
    setSelectedKrathong(null)
    setWishData(null)
    setCoupleData(null)
    setSelectedLocation(null)
    setLocationLat(undefined)
    setLocationLng(undefined)
    setIsCoupleMode(false)
  }

  if (step === 'home') {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <Sparkles />
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center mb-8 md:mb-12 px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 flex items-center justify-center gap-3 animate-glow">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">🌕</span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">ลอยกระทงออนไลน์</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4">
              ใส่คำอธิษฐานของคุณก่อนลอยกระทงลงน้ำ
            </p>
            <p className="text-sm md:text-lg text-gray-400">
              ทำตามคำอธิษฐานของคุณให้เป็นจริง
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
            {/* ลอยกระทงปกติ */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsCoupleMode(false) // Reset couple mode
                setStep('select')
              }}
              className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 hover:border-blue-400/50 transition-all text-left group"
            >
              <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">🌿</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">ลอยกระทง</h3>
              <p className="text-sm md:text-base text-gray-300">ลอยกระทงพร้อมคำอธิษฐานของคุณ</p>
            </motion.button>

            {/* ลอยคู่ความรัก */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsCoupleMode(true)
                setStep('select')
              }}
              className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-400/30 hover:border-pink-400/50 transition-all text-left group"
            >
              <div className="flex items-center gap-2 text-4xl md:text-5xl mb-4">
                <span className="group-hover:scale-110 transition-transform">🌿</span>
                <Heart className="w-6 md:w-8 h-6 md:h-8 text-pink-400" />
                <span className="group-hover:scale-110 transition-transform">🌿</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                <Heart className="w-5 md:w-6 h-5 md:h-6 text-pink-400" />
                <span>ลอยคู่ความรัก</span>
              </h3>
              <p className="text-sm md:text-base text-gray-300">ลอยกระทงคู่กับคนรักของคุณ</p>
            </motion.button>

            {/* แผนที่กระทงออนไลน์ */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('map')}
              className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-400/30 hover:border-green-400/50 transition-all text-left group"
            >
              <MapPin className="w-10 md:w-12 h-10 md:h-12 mb-4 text-green-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">แผนที่กระทง</h3>
              <p className="text-sm md:text-base text-gray-300">ดูว่าคุณลอยกระทงจากที่ไหนบ้าง</p>
            </motion.button>
          </div>
        </div>
      </main>
    )
  }

  if (step === 'map') {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <Sparkles />
        <KrathongMap onBack={() => setStep('home')} />
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Sparkles />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {step === 'select' && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setStep('home')}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <HomeIcon className="w-5 h-5" />
                <span>กลับหน้าหลัก</span>
              </button>
              <div className="flex-1"></div>
            </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-3 animate-glow">
                    <span className="text-6xl md:text-7xl">🌕</span>
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">ลอยกระทงออนไลน์</span>
                  </h1>
            <p className="text-xl text-gray-300 mb-8">
              ใส่คำอธิษฐานของคุณก่อนลอยกระทงลงน้ำ
            </p>
            <KrathongSelector onSelect={(krathong) => {
              if (isCoupleMode) {
                setSelectedKrathong(krathong)
                setStep('couple-wish')
              } else {
                handleKrathongSelect(krathong)
              }
            }} />
          </div>
        )}

        {step === 'wish' && selectedKrathong && (
          <WishForm 
            krathong={selectedKrathong}
            onSubmit={handleWishSubmit}
            onBack={() => setStep('select')}
          />
        )}

        {step === 'couple-wish' && selectedKrathong && (
          <CoupleWishForm 
            krathong={selectedKrathong}
            onSubmit={handleCoupleWishSubmit}
            onBack={() => setStep('select')}
          />
        )}

        {step === 'location' && (wishData || coupleData) && (
          <LocationSelector 
            wishData={
              wishData || 
              (coupleData ? { name: coupleData.person1.name, wish: coupleData.person1.wish } : { name: '', wish: '' })
            }
            krathong={selectedKrathong!}
            onSelect={handleLocationSelect}
            onBack={() => setStep(coupleData ? 'couple-wish' : 'wish')}
          />
        )}

        {step === 'floating' && selectedLocation && (
          <>
            {coupleData ? (
              <CoupleFloatingAnimation 
                krathong={selectedKrathong!}
                person1={coupleData.person1}
                person2={coupleData.person2}
                location={selectedLocation}
              />
            ) : wishData ? (
              <FloatingAnimation 
                krathong={selectedKrathong!}
                wish={wishData.wish}
                location={selectedLocation}
              />
            ) : null}
          </>
        )}

        {step === 'result' && selectedLocation && (
          <ResultPage 
            name={wishData?.name || coupleData?.person1.name || ''}
            wish={wishData?.wish || coupleData?.person1.wish || ''}
            krathong={selectedKrathong!}
            location={selectedLocation}
            locationLat={locationLat}
            locationLng={locationLng}
            isCouple={!!coupleData}
            partnerName={coupleData?.person2.name}
            partnerWish={coupleData?.person2.wish}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  )
}
