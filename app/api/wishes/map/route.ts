import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - ดึงข้อมูลสำหรับแผนที่ (เฉพาะที่มี coordinates)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const myWishIds = searchParams.get('myWishIds') // รายการ wish IDs ที่ผู้ใช้ลอยเอง

    let whereClause: any = {
      locationLat: { not: null },
      locationLng: { not: null },
    }

    // ถ้ามี myWishIds ให้แสดงเฉพาะของตัวเอง
    if (myWishIds) {
      const wishIds = myWishIds.split(',').filter(id => id.trim())
      if (wishIds.length > 0) {
        whereClause.id = { in: wishIds }
      } else {
        // ถ้าไม่มี wish IDs ให้ return empty array
        return NextResponse.json({ success: true, wishes: [] })
      }
    } else {
      // ถ้าไม่มี myWishIds ให้ return empty (ไม่แสดงอะไรเลย)
      return NextResponse.json({ success: true, wishes: [] })
    }

    const wishes = await prisma.wish.findMany({
      where: whereClause,
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

