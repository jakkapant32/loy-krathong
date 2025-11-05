'use client'

import { motion } from 'framer-motion'

interface KrathongGraphicsProps {
  type: string
  size?: number
  className?: string
}

export function KrathongGraphics({ type, size = 120, className = '' }: KrathongGraphicsProps) {
  const baseSize = size
  const leafWidth = baseSize * 0.8
  const leafHeight = baseSize * 1.2

  const renderKrathong = () => {
    switch (type) {
      case 'banana-leaf':
        return (
          <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" className={className}>
            {/* ใบตอง - ฐานกระทง */}
            <ellipse cx="60" cy="85" rx="35" ry="8" fill="#8B4513" opacity="0.8" />
            {/* ใบตองรอบๆ */}
            <path d="M 60 85 Q 40 75 30 60 Q 25 50 30 40" stroke="#228B22" strokeWidth="3" fill="none" />
            <path d="M 60 85 Q 50 75 45 60 Q 40 50 45 40" stroke="#228B22" strokeWidth="3" fill="none" />
            <path d="M 60 85 Q 70 75 75 60 Q 80 50 75 40" stroke="#228B22" strokeWidth="3" fill="none" />
            <path d="M 60 85 Q 80 75 90 60 Q 95 50 90 40" stroke="#228B22" strokeWidth="3" fill="none" />
            {/* เทียน */}
            <rect x="58" y="30" width="4" height="20" fill="#FFD700" />
            <circle cx="60" cy="30" r="3" fill="#FF6347" />
            {/* ดอกไม้ */}
            <circle cx="50" cy="50" r="3" fill="#FF69B4" />
            <circle cx="70" cy="50" r="3" fill="#FFD700" />
          </svg>
        )

      case 'lotus':
        return (
          <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" className={className}>
            {/* ฐานกระทง - กลีบบัว */}
            <ellipse cx="60" cy="85" rx="35" ry="8" fill="#8B4513" opacity="0.8" />
            {/* กลีบบัวชั้นล่าง */}
            <ellipse cx="60" cy="70" rx="30" ry="15" fill="#FF69B4" opacity="0.7" />
            <ellipse cx="45" cy="65" rx="15" ry="20" fill="#FFB6C1" opacity="0.8" transform="rotate(-30 45 65)" />
            <ellipse cx="75" cy="65" rx="15" ry="20" fill="#FFB6C1" opacity="0.8" transform="rotate(30 75 65)" />
            {/* กลีบบัวชั้นบน */}
            <ellipse cx="60" cy="55" rx="20" ry="12" fill="#FF1493" opacity="0.8" />
            <ellipse cx="50" cy="50" rx="10" ry="15" fill="#FFB6C1" opacity="0.9" transform="rotate(-20 50 50)" />
            <ellipse cx="70" cy="50" rx="10" ry="15" fill="#FFB6C1" opacity="0.9" transform="rotate(20 70 50)" />
            {/* เทียน */}
            <rect x="58" y="30" width="4" height="20" fill="#FFD700" />
            <circle cx="60" cy="30" r="3" fill="#FF6347" />
          </svg>
        )

      case 'bread':
        return (
          <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" className={className}>
            {/* ฐานขนมปัง */}
            <ellipse cx="60" cy="85" rx="35" ry="8" fill="#DEB887" opacity="0.9" />
            {/* ขนมปัง - กลมๆ */}
            <ellipse cx="60" cy="70" rx="32" ry="18" fill="#F4A460" />
            {/* เนื้อขนมปัง */}
            <ellipse cx="60" cy="65" rx="28" ry="15" fill="#FFE4B5" />
            {/* รอยแยกบนขนมปัง */}
            <line x1="45" y1="60" x2="75" y2="60" stroke="#CD853F" strokeWidth="2" />
            <line x1="50" y1="55" x2="70" y2="55" stroke="#CD853F" strokeWidth="1" />
            {/* เทียน */}
            <rect x="58" y="35" width="4" height="20" fill="#FFD700" />
            <circle cx="60" cy="35" r="3" fill="#FF6347" />
          </svg>
        )

      case 'coconut':
        return (
          <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" className={className}>
            {/* ฐานกะลามะพร้าว */}
            <ellipse cx="60" cy="85" rx="35" ry="8" fill="#8B4513" opacity="0.8" />
            {/* กะลามะพร้าว - ครึ่งวงกลม */}
            <path d="M 35 70 Q 35 50 60 50 Q 85 50 85 70 L 85 80 L 35 80 Z" fill="#8B4513" />
            {/* เนื้อกะลา */}
            <path d="M 40 70 Q 40 55 60 55 Q 80 55 80 70" fill="#A0522D" stroke="#654321" strokeWidth="1" />
            {/* รอยกะลา */}
            <ellipse cx="60" cy="65" rx="20" ry="8" fill="#D2691E" opacity="0.5" />
            {/* เทียน */}
            <rect x="58" y="35" width="4" height="20" fill="#FFD700" />
            <circle cx="60" cy="35" r="3" fill="#FF6347" />
            {/* ใบไม้ประดับ */}
            <circle cx="50" cy="60" r="2" fill="#228B22" />
            <circle cx="70" cy="60" r="2" fill="#228B22" />
          </svg>
        )

      default:
        return (
          <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" className={className}>
            <ellipse cx="60" cy="85" rx="35" ry="8" fill="#8B4513" opacity="0.8" />
            <rect x="58" y="30" width="4" height="20" fill="#FFD700" />
            <circle cx="60" cy="30" r="3" fill="#FF6347" />
          </svg>
        )
    }
  }

  return renderKrathong()
}

