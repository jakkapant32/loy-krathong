import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET - ดึงข้อมูลสำหรับแผนที่ (รองรับทั้งที่มี coordinates และ location string)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const myWishIds = searchParams.get('myWishIds') // รายการ wish IDs ที่ผู้ใช้ลอยเอง

    // ถ้ามี myWishIds ให้แสดงเฉพาะของตัวเอง
    if (!myWishIds) {
      // ถ้าไม่มี myWishIds ให้ return empty (ไม่แสดงอะไรเลย)
      return NextResponse.json({ success: true, wishes: [] })
    }

    const wishIds = myWishIds.split(',').filter(id => id.trim())
    if (wishIds.length === 0) {
      // ถ้าไม่มี wish IDs ให้ return empty array
      return NextResponse.json({ success: true, wishes: [] })
    }

    // ดึง wishes ทั้งหมดที่มี location (ไม่ว่าจะมี coordinates หรือไม่)
    // Frontend จะแปลง location string เป็น coordinates เอง
    const wishes = await prisma.wish.findMany({
      where: {
        id: { in: wishIds },
        location: { not: null }, // ต้องมี location อย่างน้อย
      },
      orderBy: { createdAt: 'desc' },
      take: 1000, // จำกัดจำนวนสำหรับแผนที่
      select: {
        id: true,
        name: true,
        wish: true,
        krathong: true,
        location: true,
        locationLat: true,
        locationLng: true,
        isCouple: true,
        partnerName: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ success: true, wishes })
  } catch (error) {
    console.error('Error fetching map data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch map data' },
      { status: 500 }
    )
  }
}

