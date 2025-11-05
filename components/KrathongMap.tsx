'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ArrowLeft, MapPin } from 'lucide-react'
import { thailandProvinces } from '@/lib/thailand-provinces'
import { famousLocations } from '@/lib/famous-locations'
import 'leaflet/dist/leaflet.css'

// Dynamic import เพื่อหลีกเลี่ยง SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
const useMap = dynamic(() => import('react-leaflet').then(mod => mod.useMap), { ssr: false })

interface Wish {
  id: string
  name: string
  wish: string
  krathong: string
  location: string
  locationLat: number | null
  locationLng: number | null
  isCouple: boolean
  partnerName?: string
  createdAt: string
  locationName?: string
}

const krathongEmojis: Record<string, string> = {
  'banana-leaf': '🌿',
  'lotus': '🪷',
  'bread': '🍞',
  'coconut': '🥥',
}

// สร้าง location coordinates จาก thailandProvinces และ famousLocations
const locationCoordinates: Record<string, { lat: number; lng: number; name: string }> = {}
thailandProvinces.forEach(province => {
  locationCoordinates[province.id] = {
    lat: province.lat,
    lng: province.lng,
    name: province.name,
  }
})
famousLocations.forEach(loc => {
  locationCoordinates[loc.id] = {
    lat: loc.lat,
    lng: loc.lng,
    name: loc.name,
  }
})

// Custom icon for krathong markers
const createKrathongIcon = (emoji: string) => {
  const { Icon } = require('leaflet')
  // ใช้ encodeURIComponent แทน btoa เพื่อรองรับ emoji
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="rgba(154, 90, 226, 0.8)" stroke="white" stroke-width="2"/>
      <text x="20" y="28" font-size="20" text-anchor="middle">${emoji}</text>
    </svg>
  `.trim()
  
  return new Icon({
    iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  })
}

// Component for fitting map bounds
function MapBoundsComponent({ bounds }: { bounds: [[number, number], [number, number]] }) {
  const { useMap } = require('react-leaflet')
  const map = useMap()
  useEffect(() => {
    if (map && bounds) {
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [map, bounds])
  return null
}

export default function KrathongMap({ onBack }: { onBack: () => void }) {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        // ดึงเฉพาะคำอธิษฐานของตัวเองจาก localStorage
        const myWishIds = JSON.parse(localStorage.getItem('myWishes') || '[]')
        
        if (myWishIds.length === 0) {
          setWishes([])
          setLoading(false)
          return
        }

        const response = await fetch(`/api/wishes/map?myWishIds=${myWishIds.join(',')}`)
        const data = await response.json()
        if (data.success) {
          // ใช้ coordinates จาก location ถ้าไม่มี lat/lng
          const wishesWithCoords = data.wishes.map((wish: Wish) => {
            if (!wish.locationLat || !wish.locationLng) {
              const coords = locationCoordinates[wish.location] || locationCoordinates['bangkok']
              return { 
                ...wish, 
                locationLat: coords.lat, 
                locationLng: coords.lng,
                locationName: coords.name || wish.location
              }
            }
            return {
              ...wish,
              locationName: locationCoordinates[wish.location]?.name || wish.location
            }
          })
          setWishes(wishesWithCoords)
        }
      } catch (error) {
        console.error('Error fetching map data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMapData()
  }, [])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>กลับหน้าหลัก</span>
        </button>
        <div className="text-center py-12">
          <div className="inline-block animate-spin text-4xl">🌕</div>
          <p className="mt-4 text-gray-400">กำลังโหลดแผนที่...</p>
        </div>
      </div>
    )
  }

  // Thailand bounds
  const thailandBounds: [[number, number], [number, number]] = [
    [5.5, 97.0],   // Southwest
    [20.5, 105.5]  // Northeast
  ]
  
  // Calculate bounds from wishes or use Thailand bounds
  const lats = wishes.map(w => w.locationLat!).filter(Boolean)
  const lngs = wishes.map(w => w.locationLng!).filter(Boolean)
  const bounds: [[number, number], [number, number]] = lats.length > 0
    ? [[Math.min(...lats) - 0.5, Math.min(...lngs) - 0.5], [Math.max(...lats) + 0.5, Math.max(...lngs) + 0.5]]
    : thailandBounds

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>กลับหน้าหลัก</span>
      </button>

      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <MapPin className="w-6 md:w-8 h-6 md:h-8" />
          <span>🌎 แผนที่กระทงของคุณ</span>
        </h2>
        <p className="text-sm md:text-base text-gray-300">ดูว่าคุณลอยกระทงจากที่ไหนบ้าง</p>
        <p className="text-xs md:text-sm text-gray-400 mt-2">
          กระทงที่ลอยแล้ว: {wishes.length} ใบ
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-2 md:p-4 border border-white/20 shadow-2xl">
        <div className="h-[400px] md:h-[600px] rounded-lg md:rounded-xl overflow-hidden">
          <MapContainer
            center={[13.7563, 100.5018]}
            zoom={6}
            minZoom={5}
            maxBounds={thailandBounds}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapBoundsComponent bounds={bounds} />
            {wishes.map((wish) => {
              if (!wish.locationLat || !wish.locationLng) return null
              const emoji = krathongEmojis[wish.krathong] || '🌿'
              return (
                <Marker
                  key={wish.id}
                  position={[wish.locationLat, wish.locationLng]}
                  icon={createKrathongIcon(emoji)}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="text-2xl mb-2 text-center">{emoji}</div>
                      {wish.isCouple ? (
                        <div>
                          <p className="font-semibold text-pink-600">💕 {wish.name} & {wish.partnerName}</p>
                          <p className="mt-1 text-gray-600 text-xs">📍 {wish.locationName || wish.location}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-semibold">- {wish.name}</p>
                          <p className="mt-1 text-gray-600 text-xs">📍 {wish.locationName || wish.location}</p>
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

