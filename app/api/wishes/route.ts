import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET - ดึงคำอธิษฐานทั้งหมด (สำหรับหอคำอธิษฐาน)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50')
    const myWishIds = searchParams.get('myWishIds') // รายการ wish IDs ที่ผู้ใช้ลอยเอง

    let whereClause: any = {}

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
      take: limit,
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
        partnerWish: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ success: true, wishes })
  } catch (error) {
    console.error('Error fetching wishes:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wishes' },
      { status: 500 }
    )
  }
}

// POST - บันทึกคำอธิษฐานใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      wish,
      krathong,
      location,
      locationLat,
      locationLng,
      isPublic = false, // เปลี่ยน default เป็น private
      isCouple = false,
      partnerName,
      partnerWish,
    } = body

    if (!name || !wish || !krathong || !location) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newWish = await prisma.wish.create({
      data: {
        name,
        wish,
        krathong,
        location,
        locationLat: locationLat ? parseFloat(locationLat) : null,
        locationLng: locationLng ? parseFloat(locationLng) : null,
        isPublic,
        isCouple,
        partnerName: isCouple ? partnerName : null,
        partnerWish: isCouple ? partnerWish : null,
      },
    })

    return NextResponse.json({ success: true, wish: newWish }, { status: 201 })
  } catch (error) {
    console.error('Error creating wish:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create wish' },
      { status: 500 }
    )
  }
}

