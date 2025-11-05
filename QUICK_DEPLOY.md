# ⚡ Quick Deploy Guide - Deploy ใน 5 นาที

## 🎯 ขั้นตอนแบบย่อ

### 1. Push โค้ดไป Git (ถ้ายังไม่ได้)
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 2. สร้าง Database บน Render.com
- ไปที่ https://dashboard.render.com
- คลิก "New +" → "PostgreSQL"
- Name: `loy-krathong-db`
- คลิก "Create Database"
- **คัดลอก Internal Database URL** (เก็บไว้)

### 3. Deploy Web Service
- คลิก "New +" → "Web Service"
- เชื่อมต่อ Git Repository
- ตั้งค่า:
  - **Build Command:** `npm install && npx prisma generate && npm run build`
  - **Start Command:** `npm start`
- เพิ่ม Environment Variables:
  - `DATABASE_URL` = Internal Database URL (จาก Step 2)
  - `NODE_ENV` = `production`
- คลิก "Create Web Service"

### 4. Run Migrations
- หลังจาก deploy สำเร็จ → คลิก "Shell"
- รัน: `npx prisma migrate deploy`

### 5. ทดสอบ
- เปิด URL ที่ Render ให้
- ทดสอบทุกฟีเจอร์

## ✅ เสร็จแล้ว!

เว็บไซต์ของคุณพร้อมใช้งานแล้ว 🎉

---

**คำแนะนำ:** อ่าน `DEPLOY_GUIDE.md` สำหรับรายละเอียดเพิ่มเติม

