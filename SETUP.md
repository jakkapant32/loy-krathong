# 🚀 คู่มือตั้งค่าโปรเจกต์

## 1. สร้างไฟล์ .env

สร้างไฟล์ `.env` ใน root directory และใส่ข้อมูลต่อไปนี้:

```env
# Database Connection
# ใช้ External Database URL สำหรับ development (localhost)
DATABASE_URL="postgresql://loy_krathong_user:RwLw4i9stt4LazotQEa3tEnpw9LevOcE@dpg-d45kgg3e5dus73c7cj40-a.oregon-postgres.render.com/loy_krathong"

# Node Environment
NODE_ENV="development"
```

## 2. ติดตั้ง Dependencies

```bash
npm install
```

## 3. Generate Prisma Client

```bash
npm run prisma:generate
```

## 4. Run Database Migrations

```bash
npm run prisma:migrate
```

เมื่อรันคำสั่งนี้ จะมีคำถาม:
- **Migration name**: ตั้งชื่อ เช่น `init` หรือ `initial_migration`
- Prisma จะสร้างตารางในฐานข้อมูลให้อัตโนมัติ

## 5. ตรวจสอบฐานข้อมูล

เปิด Prisma Studio เพื่อดูข้อมูล:
```bash
npm run prisma:studio
```

จะเปิดเบราว์เซอร์ที่ `http://localhost:5555`

## 6. รันเว็บไซต์

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

---

## 📝 หมายเหตุสำคัญ

### Internal vs External Database URL

- **External Database URL** (ที่ใช้ตอนนี้):
  - ใช้สำหรับ development ในเครื่อง
  - ใช้สำหรับเชื่อมต่อจากนอก Render network
  - Format: `postgresql://...@dpg-xxx.oregon-postgres.render.com/...`

- **Internal Database URL** (สำหรับ production):
  - ใช้เมื่อ deploy Web Service บน Render
  - เชื่อมต่อผ่าน private network (เร็วกว่า, ปลอดภัยกว่า)
  - Format: `postgresql://...@dpg-xxx-a/...`

### เมื่อ Deploy บน Render.com

1. ใน Render Dashboard → Web Service → Environment Variables
2. เพิ่ม `DATABASE_URL` และใช้ **Internal Database URL**:
   ```
   postgresql://loy_krathong_user:RwLw4i9stt4LazotQEa3tEnpw9LevOcE@dpg-d45kgg3e5dus73c7cj40-a/loy_krathong
   ```

---

## ✅ Checklist

- [ ] สร้างไฟล์ `.env` พร้อม `DATABASE_URL`
- [ ] รัน `npm install`
- [ ] รัน `npm run prisma:generate`
- [ ] รัน `npm run prisma:migrate`
- [ ] ทดสอบด้วย `npm run dev`

---

## 🆘 Troubleshooting

### Error: Can't reach database server

- ตรวจสอบว่า `DATABASE_URL` ถูกต้อง
- ตรวจสอบว่าใช้ External URL สำหรับ localhost
- ตรวจสอบ internet connection

### Error: Migration failed

- ตรวจสอบว่า database มีอยู่จริง
- ตรวจสอบว่า user มีสิทธิ์สร้างตาราง
- ลองรัน `npm run prisma:migrate reset` (⚠️ ระวัง: จะลบข้อมูลทั้งหมด)

### Error: Prisma Client not generated

- รัน `npm run prisma:generate` อีกครั้ง
- ตรวจสอบว่า `@prisma/client` ติดตั้งแล้ว

