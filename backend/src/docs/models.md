# 📦 Prisma Model Overview

## User

- **Fields:** id, name, email, password, role, createdAt
- **Purpose:** Authentication and access control

## Employee

- **Fields:** id, name, role, salary, createdAt
- **Relations:** MeshProductions, Invoices
- **Purpose:** Track factory employees

## Wire

- **Fields:** type, diameter, quantityKg, pricePerKg, supplier, createdAt
- **Purpose:** Manage inventory of raw wire

## MeshProduction

- **Fields:** meshType, quantity, wireUsedKg, wireDiameter, employeeId, createdAt
- **Relations:** ↔ Employee
- **Purpose:** Track daily mesh production

## Client

- **Fields:** name, phone, address, createdAt
- **Relations:** ↔ Invoice[]
- **Purpose:** Customer details

## Invoice

- **Fields:** id, total, createdAt
- **Relations:** ↔ Client, ↔ Employee, ↔ SaleItems
- **Purpose:** Represents a sale

## SaleItem

- **Fields:** meshType, quantity, unitPrice
- **Relations:** ↔ Invoice
- **Purpose:** Individual mesh items sold
