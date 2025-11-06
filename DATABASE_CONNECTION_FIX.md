# 🔧 แก้ไขปัญหา Database Connection

## ปัญหา
```
Can't reach database server at `dpg-d45kgg3e5dus73c7cj40-a:5432`
```

## วิธีแก้ไข

### 1. ตรวจสอบ Database Status
1. ไปที่ [Render Dashboard](https://dashboard.render.com)
2. เปิด Database `loy-krathong-db`
3. ตรวจสอบว่า Database **กำลังทำงานอยู่** (Status: Available)
   - ถ้า Status เป็น "Paused" หรือ "Sleeping" → คลิก "Resume" หรือ "Start"

### 2. ตรวจสอบ Environment Variables
1. ไปที่ Web Service `loy-krathong` → **Environment**
2. ตรวจสอบว่า `DATABASE_URL` มีอยู่และถูกต้อง
3. **ถ้าไม่มี `DATABASE_URL`:**
   - คลิก "Add Environment Variable"
   - Key: `DATABASE_URL`
   - Value: ใช้ **Internal Database URL** จาก Database dashboard:
     ```
     postgresql://loy_krathong_user:RwLw4i9stt4LazotQEa3tEnpw9LevOcE@dpg-d45kgg3e5dus73c7cj40-a/loy_krathong
     ```
   - คลิก "Save Changes"

### 3. ตรวจสอบ render.yaml
ไฟล์ `render.yaml` ควรมีการตั้งค่าดังนี้:
```yaml
envVars:
  - key: DATABASE_URL
    fromDatabase:
      name: loy-krathong-db
      property: connectionString
```

**ถ้า render.yaml ตั้งค่าถูกต้องแล้ว:**
- Render ควรจะใช้ Internal Database URL อัตโนมัติ
- แต่ถ้ายังมีปัญหา อาจต้องตั้งค่า `DATABASE_URL` ใน Environment Variables โดยตรง

### 4. Restart Web Service
หลังจากแก้ไข Environment Variables:
1. ไปที่ Web Service → **Manual Deploy** → **Deploy latest commit**
2. หรือรอให้ Auto Deploy ทำงาน (ถ้าเปิดไว้)

### 5. ตรวจสอบ Database Migrations
หลังจาก Database เชื่อมต่อได้แล้ว:
1. ไปที่ Web Service → **Shell**
2. รันคำสั่ง:
   ```bash
   npx prisma migrate deploy
   ```
3. ตรวจสอบว่ามีตาราง `Wish` ในฐานข้อมูล

## ✅ Checklist
- [ ] Database Status เป็น "Available"
- [ ] `DATABASE_URL` ถูกตั้งค่าใน Environment Variables
- [ ] ใช้ Internal Database URL (ไม่ใช่ External)
- [ ] Web Service ถูก restart แล้ว
- [ ] Migrations ถูก run แล้ว

## 🔍 ตรวจสอบ Connection String Format

**Internal Database URL (สำหรับ Render):**
```
postgresql://user:password@dpg-xxx-a/database_name
```

**External Database URL (สำหรับ localhost):**
```
postgresql://user:password@dpg-xxx.oregon-postgres.render.com/database_name
```

⚠️ **สำคัญ:** ใน Render ต้องใช้ **Internal URL** เท่านั้น!

