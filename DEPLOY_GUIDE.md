# 🚀 คู่มือ Deploy บน Render.com (Step-by-Step)

## 📋 สิ่งที่ต้องเตรียม

1. ✅ บัญชี Render.com (สมัครได้ที่ https://render.com)
2. ✅ Git Repository (GitHub, GitLab, หรือ Bitbucket)
3. ✅ โค้ดที่พร้อม deploy

## 🔧 ขั้นตอนการ Deploy

### Step 1: Push โค้ดไปยัง Git Repository

ถ้ายังไม่ได้ push โค้ด:

```bash
# ตรวจสอบว่าโค้ดอยู่ใน git หรือยัง
git status

# ถ้ายังไม่ได้ initialize
git init
git add .
git commit -m "Initial commit - Loy Krathong website"

# เพิ่ม remote repository (แทน <your-repo-url> ด้วย URL จริง)
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: สร้าง PostgreSQL Database บน Render.com

1. เข้า https://dashboard.render.com
2. คลิก **"New +"** → **"PostgreSQL"**
3. ตั้งค่า:
   - **Name:** `loy-krathong-db`
   - **Database:** `loy_krathong`
   - **User:** `loy_krathong_user`
   - **Region:** เลือกที่ใกล้ที่สุด (แนะนำ Singapore)
   - **Plan:** Free (หรือ Paid ตามต้องการ)
4. คลิก **"Create Database"**
5. **บันทึก Connection String** ที่แสดงไว้ (จะใช้ตอน deploy)

### Step 3: Deploy Web Service

#### วิธีที่ 1: ใช้ render.yaml (แนะนำ)

1. ใน Dashboard คลิก **"New +"** → **"Blueprint"**
2. เลือก Git Repository ของคุณ
3. Render จะอ่าน `render.yaml` อัตโนมัติ
4. คลิก **"Apply"**

#### วิธีที่ 2: Deploy Manual

1. ใน Dashboard คลิก **"New +"** → **"Web Service"**
2. เชื่อมต่อ Git Repository:
   - เลือก Provider (GitHub/GitLab/Bitbucket)
   - Authorize Render.com
   - เลือก Repository
3. ตั้งค่า:
   - **Name:** `loy-krathong`
   - **Environment:** `Node`
   - **Region:** เลือกที่ใกล้ที่สุด
   - **Branch:** `main` (หรือ branch ที่คุณใช้)
   - **Root Directory:** (เว้นว่างไว้)
   - **Build Command:** 
     ```
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command:**
     ```
     npm start
     ```
4. คลิก **"Advanced"** → **"Add Environment Variable"**
   - **Key:** `DATABASE_URL`
   - **Value:** ใส่ Internal Database URL จาก Database ที่สร้างไว้
     ```
     postgresql://loy_krathong_user:RwLw4i9stt4LazotQEa3tEnpw9LevOcE@dpg-d45kgg3e5dus73c7cj40-a/loy_krathong
     ```
   - **Key:** `NODE_ENV`
   - **Value:** `production`
5. คลิก **"Create Web Service"**

### Step 4: รอ Build และ Deploy

1. Render จะเริ่ม build อัตโนมัติ
2. ดู Build Logs เพื่อตรวจสอบความคืบหน้า
3. ถ้ามี error ดูใน logs และแก้ไข

### Step 5: Run Database Migrations

หลังจาก deploy สำเร็จ:

1. ใน Web Service Dashboard คลิก **"Shell"**
2. รันคำสั่ง:
   ```bash
   npx prisma migrate deploy
   ```
3. รอให้ migrations เสร็จ

### Step 6: ตรวจสอบการทำงาน

1. เปิด URL ที่ Render ให้มา (เช่น `https://loy-krathong.onrender.com`)
2. ทดสอบ:
   - เปิดหน้าแรก
   - สร้างคำอธิษฐาน
   - ตรวจสอบว่าข้อมูลบันทึกลงฐานข้อมูล
   - ทดสอบแผนที่

## ✅ Checklist ก่อน Deploy

- [ ] โค้ด push ไป Git แล้ว
- [ ] ไม่มี `.env` ใน repository (มีใน `.gitignore` แล้ว)
- [ ] `DATABASE_URL` พร้อมใช้
- [ ] ทุก component ทำงานถูกต้อง
- [ ] Build ผ่าน (ถ้า build บนเครื่องได้)

## 🔍 Troubleshooting

### Build Error: "Cannot find module"

**แก้ไข:** ตรวจสอบว่า `node_modules` อยู่ใน `.gitignore` และไม่ commit ไป

### Database Connection Error

**แก้ไข:** 
- ตรวจสอบ `DATABASE_URL` ว่าใช้ Internal URL (ไม่ใช่ External)
- ตรวจสอบว่า Database และ Web Service อยู่ใน Region เดียวกัน

### Prisma Error: "Migration not found"

**แก้ไข:** 
- รัน `npx prisma migrate deploy` ใน Shell
- หรือรัน `npx prisma migrate dev` ใน local แล้ว push migrations ไป

### Page Not Loading

**แก้ไข:**
- ตรวจสอบ Build Logs
- ตรวจสอบ Runtime Logs
- ตรวจสอบว่า `npm start` ทำงาน

## 📝 Environment Variables ที่ต้องตั้งค่า

ใน Render.com Dashboard → Web Service → Environment:

```
DATABASE_URL=postgresql://loy_krathong_user:RwLw4i9stt4LazotQEa3tEnpw9LevOcE@dpg-d45kgg3e5dus73c7cj40-a/loy_krathong
NODE_ENV=production
```

## 🎯 หลังจาก Deploy สำเร็จ

1. ✅ ทดสอบทุกฟีเจอร์
2. ✅ ตรวจสอบ mobile responsiveness
3. ✅ ทดสอบการบันทึกข้อมูล
4. ✅ ทดสอบแผนที่

## 📞 ความช่วยเหลือ

ถ้ามีปัญหา:
1. ดู Build Logs ใน Render Dashboard
2. ดู Runtime Logs
3. ตรวจสอบ Database Connection
4. ตรวจสอบ Environment Variables

---

**หมายเหตุ:** Render.com Free Plan อาจมีข้อจำกัด:
- Sleep หลังจากไม่ใช้งาน 15 นาที
- Build time อาจนานขึ้น
- ใช้ Paid Plan สำหรับ production ที่ต้องการความเสถียร

