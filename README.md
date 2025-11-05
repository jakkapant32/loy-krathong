# 🌕 ลอยกระทงออนไลน์ - Loy Krathong Online

เว็บไซต์สำหรับลอยกระทงออนไลน์พร้อมคำอธิษฐานของคุณ

## ✨ ฟีเจอร์

### ฟีเจอร์หลัก
- 🌿 **เลือกแบบกระทง** - ใบตอง, ดอกบัว, ขนมปัง, กะลามะพร้าว
- 💫 **พิมพ์คำอธิษฐาน** - ใส่ชื่อและคำอธิษฐานของคุณ
- 🗺️ **เลือกสถานที่ลอย** - เลือกสถานที่ลอยกระทงจากหลายสถานที่ในประเทศไทย
- ✨ **แอนิเมชันลอยกระทง** - แอนิเมชันสวยงามพร้อมประกายไฟ
- 📱 **แชร์โซเชียล** - แชร์คำอธิษฐานไปยัง Facebook และ Instagram

### ฟีเจอร์เสริม
- 💞 **ลอยคู่ความรัก** - ลอยกระทงคู่กับคนรัก พร้อมคำอธิษฐานของทั้งสองคน
- 🌎 **แผนที่กระทงออนไลน์** - ดูว่ามีคนลอยกระทงจากที่ไหนบ้างบนแผนที่
- 📜 **หอคำอธิษฐาน** - อ่านคำอธิษฐานของผู้ใช้คนอื่นๆ
- 💾 **ระบบฐานข้อมูล** - เก็บข้อมูลคำอธิษฐานใน PostgreSQL

## 🚀 การติดตั้ง

### Prerequisites
- Node.js 18+ 
- PostgreSQL (สำหรับ production)
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

1. **Clone repository**
```bash
git clone <repository-url>
cd Krathong
```

2. **ติดตั้ง dependencies**
```bash
npm install
```

3. **ตั้งค่า Environment Variables**
สร้างไฟล์ `.env` จาก `.env.example`:
```bash
cp .env.example .env
```

แก้ไข `.env` และเพิ่ม `DATABASE_URL`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/loy_krathong?schema=public"
```

4. **ตั้งค่าฐานข้อมูล**
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

5. **รัน development server**
```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **Next.js 14** - React Framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Leaflet** - Interactive maps
- **React Leaflet** - React components for Leaflet

### Backend
- **Next.js API Routes** - Server-side API
- **Prisma** - ORM for database
- **PostgreSQL** - Database

## 📁 โครงสร้างโปรเจกต์

```
├── app/
│   ├── api/
│   │   └── wishes/
│   │       ├── route.ts          # API สำหรับบันทึก/ดึงคำอธิษฐาน
│   │       └── map/
│   │           └── route.ts      # API สำหรับข้อมูลแผนที่
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                  # หน้าหลัก
│   └── globals.css               # Global styles
├── components/
│   ├── KrathongSelector.tsx      # เลือกกระทง
│   ├── WishForm.tsx              # ฟอร์มคำอธิษฐาน
│   ├── CoupleWishForm.tsx        # ฟอร์มลอยคู่
│   ├── LocationSelector.tsx      # เลือกสถานที่
│   ├── FloatingAnimation.tsx     # แอนิเมชันลอย
│   ├── CoupleFloatingAnimation.tsx # แอนิเมชันลอยคู่
│   ├── ResultPage.tsx            # หน้าผลลัพธ์
│   ├── WishTower.tsx             # หอคำอธิษฐาน
│   ├── KrathongMap.tsx           # แผนที่กระทง
│   └── Sparkles.tsx              # เอฟเฟกต์ประกายไฟ
├── lib/
│   └── prisma.ts                 # Prisma client instance
├── prisma/
│   └── schema.prisma             # Database schema
├── render.yaml                   # Render.com configuration
├── DEPLOY.md                     # คู่มือการ Deploy
└── package.json
```

## 🗄️ Database Schema

```prisma
model Wish {
  id          String   @id @default(cuid())
  name        String
  wish        String
  krathong    String
  location    String
  locationLat Float?
  locationLng Float?
  isPublic    Boolean  @default(true)
  isCouple    Boolean  @default(false)
  partnerName String?
  partnerWish String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🚀 Deploy บน Render.com

ดูคู่มือการ Deploy ที่ `DEPLOY.md` สำหรับรายละเอียด

### สรุปขั้นตอน:
1. สร้าง PostgreSQL Database บน Render.com
2. Deploy Web Service จาก Git Repository
3. ตั้งค่า Environment Variables (DATABASE_URL)
4. รัน Prisma Migrations

## 📝 Scripts

```bash
# Development
npm run dev              # รัน development server

# Build
npm run build            # Build สำหรับ production
npm start                # รัน production server

# Database
npm run prisma:generate # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # เปิด Prisma Studio
```

## 🎨 Customization

### สีธีม
แก้ไขสีใน `tailwind.config.js`:
- `krathong-blue`: สีฟ้า
- `krathong-purple`: สีม่วง
- `krathong-dark`: สีพื้นหลังเข้ม

### สถานที่ลอยกระทง
เพิ่มสถานที่ใหม่ใน `components/LocationSelector.tsx`

### คำอวยพร
แก้ไขคำอวยพรใน `components/ResultPage.tsx`

## 📝 License

MIT

## 🤝 Contributing

Pull requests are welcome! สำหรับการเปลี่ยนแปลงใหญ่ๆ กรุณาเปิด issue เพื่ออภิปรายก่อน

## 🙏 Acknowledgments

- แรงบันดาลใจจากเทศกาลลอยกระทงของไทย
- ใช้ emoji จาก Unicode Standard
