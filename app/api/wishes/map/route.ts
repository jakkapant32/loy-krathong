import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET - ดึงข้อมูลสำหรับแผนที่ (รองรับทั้งที่มี coordinates และ location string)
// ถ้ามี myWishIds ให้แสดงเฉพาะของตัวเอง ถ้าไม่มีให้แสดงทั้งหมด
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const myWishIds = searchParams.get('myWishIds') // รายการ wish IDs ที่ผู้ใช้ลอยเอง

    let whereClause: any = {}

    // ถ้ามี myWishIds ให้แสดงเฉพาะของตัวเอง
    if (myWishIds) {
      const wishIds = myWishIds.split(',').filter(id => id.trim())
      if (wishIds.length > 0) {
        whereClause.id = { in: wishIds }
      }
      // ถ้า myWishIds ว่างเปล่า ให้ดึงทั้งหมด (whereClause จะยังคงว่างเปล่า)
    }
    // ถ้าไม่มี myWishIds ให้ดึงทั้งหมด (whereClause จะยังคงว่างเปล่า)

    // ดึง wishes ทั้งหมดที่มี location (ไม่ว่าจะมี coordinates หรือไม่)
    // Frontend จะแปลง location string เป็น coordinates เอง
    // location เป็น required field อยู่แล้ว ไม่ต้องเช็ค null
    // ไม่ส่ง wish field เพื่อไม่แสดงข้อความคำอธิษฐาน
    const wishes = await prisma.wish.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: 1000, // จำกัดจำนวนสำหรับแผนที่
      select: {
        id: true,
        name: true,
        // ไม่ส่ง wish field เพื่อไม่แสดงข้อความคำอธิษฐาน
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

