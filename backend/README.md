# 🧱 SetkaPro Backend (Wire Mesh Production System)

A modern backend for managing a wire mesh (сетка) manufacturing business — built to track wire stock, production, clients, sales, employees, machines, and more. Designed specifically for hands-on factory operations with real-time insights, PDF invoices, and Excel exports.

---

## ✅ Full Feature List – Tailored for Your Dad’s Business

### 🔐 1. User Login & Roles

| Feature                  | Details                            |
| ------------------------ | ---------------------------------- |
| Owner login              | Full access to all features        |
| Employee login (limited) | Role-based: makers, drivers, cooks |
| Admin panel (optional)   | Manage users & permissions         |

### 📦 2. Wire Stock Management

| Feature            | Details                                       |
| ------------------ | --------------------------------------------- |
| Add wire purchase  | Wire type, size, supplier, quantity, price/kg |
| Auto-updated stock | Deducted when mesh is made                    |
| Wire usage history | See usage per production                      |
| Low stock alert    | Trigger notifications (future)                |

### 🏗️ 3. Сетка Production (Mesh Making)

| Feature               | Details                                |
| --------------------- | -------------------------------------- |
| Production entry      | Select type (10×10, etc.), who made it |
| Auto wire calculation | Based on type and quantity             |
| Logs                  | Filter by worker, machine, or date     |
| Attach photos         | For QA (planned)                       |

### 🛒 4. Client & Sales Management

| Feature        | Details                       |
| -------------- | ----------------------------- |
| Add client     | Name, phone, address          |
| Add sale       | Select mesh, quantity, price  |
| PDF invoice    | Auto-generated and printable  |
| Track payments | Paid/unpaid status            |
| Sales history  | Filter by client/product/date |

### 👥 5. Employee & Shift Tracking

| Feature               | Details                              |
| --------------------- | ------------------------------------ |
| Add employees         | Name, role, salary                   |
| Weekly schedule       | Assign shifts (calendar UI optional) |
| Attendance (optional) | Log daily attendance                 |
| Basic payroll         | Manual salary input & payments       |

### 🛠️ 6. Machines & Maintenance

| Feature          | Details                      |
| ---------------- | ---------------------------- |
| Add machines     | Name, type, purchase date    |
| Track usage      | Link to employee + time used |
| Maintenance logs | Date, issue, cost, fixed by  |
| Auto alerts      | Monthly reminders (future)   |

### 📊 7. Dashboard & Reports

| Feature                 | Details                      |
| ----------------------- | ---------------------------- |
| Wire stock summary      | Usage trend & current levels |
| Mesh production summary | Totals per type/month        |
| Top clients             | Based on sales volume        |
| Profit report           | Expenses vs revenue          |
| GPT report summary      | Monthly comparison (future)  |

### 💰 8. Expense Tracking

| Feature                 | Details                       |
| ----------------------- | ----------------------------- |
| Add expenses            | Transport, food, repair, etc. |
| Filter by category/date | Monthly breakdown             |
| Receipt uploads         | Optional future enhancement   |

### 📱 9. Mobile-Responsive UI

| Feature                       | Details                        |
| ----------------------------- | ------------------------------ |
| Works on phone/tablet/desktop | Mobile-first design            |
| PWA support                   | Add to home screen             |
| Quick action buttons          | Fast wire/mesh entry on the go |

### ⚖️ 10. Settings / Config

| Feature                  | Details              |
| ------------------------ | -------------------- |
| Add/edit mesh types      | (10×10, 15×15, etc.) |
| Define employee roles    | Maker, driver, etc.  |
| Configure currency/units | Optional             |

---

## 🔮 Future Upgrades (Post-MVP)

- WhatsApp order notifications
- SMS shift reminders to employees
- QR/barcode scanning for wire stock
- GPS logs for drivers
- Voice-to-text input for mobile entries

---

## 🚀 Tech Stack

| Layer     | Tools                                          |
| --------- | ---------------------------------------------- |
| Backend   | **Node.js**, **Express**, **TypeScript**       |
| Database  | **PostgreSQL** (via **Prisma ORM**)            |
| Auth      | **JWT-based** with roles (`OWNER`, `EMPLOYEE`) |
| Docs      | **Swagger** (OpenAPI 3)                        |
| Exports   | **PDFKit**, **ExcelJS**                        |
| Dev Tools | **Nodemon**, **ts-node**, **dotenv**           |

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/setkapro-backend.git
cd setkapro-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env
# Edit .env with your database URL and JWT secret
```

### 4. Run Database Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the Dev Server

```bash
npm run dev
# API is now live at: http://localhost:3001
```

### 6. Swagger API Docs

```bash
http://localhost:3001/api/docs
```

---

## 📚 Project Structure

```
src/
├── controllers/      // Business logic
├── routes/           // API endpoints
├── prisma/           // Prisma client & schema
├── docs/             // Swagger config
├── middleware/       // Auth middleware
├── utils/            // Helpers: asyncHandler, Excel/PDF
```

---

## 🧢 Suggested Next Steps

- Add unit & integration tests (Jest)
- Implement role-based UI (React/TS frontend)
- Set up deployment (Railway, Render, VPS)

---

## 👍 Made with love for real-world factory needs.
