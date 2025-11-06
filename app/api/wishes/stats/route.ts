import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET - ตรวจสอบสถิติและข้อมูลในฐานข้อมูล (สำหรับ debugging)
export async function GET(request: NextRequest) {
  try {
    // นับจำนวน wishes ทั้งหมด
    const totalCount = await prisma.wish.count()
    
    // นับจำนวน wishes ที่มี coordinates
    const withCoordinatesCount = await prisma.wish.count({
      where: {
        locationLat: { not: null },
        locationLng: { not: null },
      },
    })
    
    // ดึง wishes ล่าสุด 10 รายการ (ไม่แสดงข้อมูลส่วนตัวทั้งหมด)
    const recentWishes = await prisma.wish.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        location: true,
        krathong: true,
        locationLat: true,
        locationLng: true,
        createdAt: true,
      },
    })
    
    return NextResponse.json({
      success: true,
      stats: {
        totalWishes: totalCount,
        wishesWithCoordinates: withCoordinatesCount,
        wishesWithoutCoordinates: totalCount - withCoordinatesCount,
      },
      recentWishes: recentWishes,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch stats', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

