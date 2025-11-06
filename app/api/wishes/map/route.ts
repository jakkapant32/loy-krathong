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

    // ตรวจสอบ database connection ก่อน
    try {
      // สร้าง where clause - ถ้ามี myWishIds ให้กรองตาม ID
      let whereClause: any = undefined
      
      if (myWishIds) {
        const wishIds = myWishIds.split(',').filter(id => id.trim())
        if (wishIds.length > 0) {
          whereClause = { id: { in: wishIds } }
        }
        // ถ้า myWishIds ว่างเปล่า ให้ whereClause เป็น undefined (ดึงทั้งหมด)
      }
      // ถ้าไม่มี myWishIds ให้ whereClause เป็น undefined (ดึงทั้งหมด)

      // ดึง wishes ทั้งหมดที่มี location (ไม่ว่าจะมี coordinates หรือไม่)
      // Frontend จะแปลง location string เป็น coordinates เอง
      // location เป็น required field อยู่แล้ว ไม่ต้องเช็ค null
      // ไม่ส่ง wish field เพื่อไม่แสดงข้อความคำอธิษฐาน
      const queryOptions: any = {
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
      }

      // เพิ่ม where clause เฉพาะเมื่อมี
      if (whereClause) {
        queryOptions.where = whereClause
      }

      const wishes = await prisma.wish.findMany(queryOptions)

      return NextResponse.json({ success: true, wishes })
    } catch (dbError) {
      console.error('Database query error:', dbError)
      if (dbError instanceof Error) {
        console.error('Database error message:', dbError.message)
        console.error('Database error stack:', dbError.stack)
      }
      // ถ้า database error ให้ return empty array แทน error
      return NextResponse.json(
        { 
          success: true, 
          wishes: [],
          error: dbError instanceof Error ? dbError.message : 'Database error'
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error fetching map data:', error)
    // Log more details for debugging
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    // ถ้า database error ให้ return empty array แทน error เพื่อไม่ให้แผนที่พัง
    return NextResponse.json(
      { 
        success: true, 
        wishes: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 200 } // เปลี่ยนเป็น 200 แทน 500 เพื่อไม่ให้ frontend พัง
    )
  }
}

