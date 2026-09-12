# Slotly — Full-Stack Appointment Booking SaaS

> **Slotly** is a production-ready, full-stack appointment scheduling and client management SaaS engineered for modern service businesses, boutique studios, and independent advisors.

Built with **Next.js 15 (App Router)**, **React 18**, **TypeScript**, **Clerk Authentication**, **Drizzle ORM**, **PostgreSQL 16 (Docker)**, and **Tailwind CSS**.

[![Next.js](https://img.shields.io/badge/Next.js-15.0.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk_v6-6C47FF?style=flat&logo=clerk)](https://clerk.com/)
[![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle-C5F74F?style=flat&logo=drizzle)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_16-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Postgres_Container-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌐 Live Demo & Preview

- **Live Production URL**: [https://booking-saas-dusky-ten.vercel.app](https://booking-saas-dusky-ten.vercel.app)
- **Demo Client Booking Flow**: [https://booking-saas-dusky-ten.vercel.app/book/aura-studio](https://booking-saas-dusky-ten.vercel.app/book/aura-studio)
- **Demo Provider Console**: [https://booking-saas-dusky-ten.vercel.app/dashboard](https://booking-saas-dusky-ten.vercel.app/dashboard) *(Requires Clerk Sign-In)*

---

## 🌟 Core Features

- **Public Booking Pages (`/book/[providerSlug]`)**:
  - Branded client portal with studio bio, star rating, verified credentials, and studio location.
  - Shareable link format: `slotly.app/book/{providerSlug}`.
- **Interactive Service Selection**:
  - Tiered service cards with transparent pricing, descriptions, and duration badges (e.g. 45 min, 60 min, 90 min).
  - Instant visual selection with real-time total summary.
- **Available Appointment Slots**:
  - Date selector coupled with interactive time-slot chips.
  - Automated dynamic duration calculation (e.g. `09:00 AM - 10:00 AM`) based on the selected tier.
- **Clerk Authentication**:
  - Seamless authentication powered by Clerk v6 with dedicated, branded `/sign-in` and `/sign-up` routes.
  - Edge-compatible Next.js middleware protecting private provider routes (`/dashboard`).
- **Provider Operations Dashboard (`/dashboard`)**:
  - Executive operational metrics: Total Bookings, Projected Revenue, Response Latency, and Active Service Tiers.
  - 1-click **Copy Public Booking Link** with instant clipboard feedback.
  - Active service catalog with rates and durations.
  - Interactive "Publish New Service" modal with database-backed form action.
- **Booking Management Queue**:
  - Filterable appointment table with status tabs: `All`, `Confirmed`, and `Pending`.
  - Client avatars, booking date/time, contact information, and direct email actions.
- **Database Integration with Drizzle ORM**:
  - Fully typed schema with 7 relational models: `service_providers`, `services`, `availabilities`, `blocked_times`, `bookings`, `customers`, `calendar_connections`.
  - Type-safe queries, automated migrations, and zero-downtime schema evolution.
- **Responsive Modern UI**:
  - Crafted with Tailwind CSS using an elegant stone & emerald palette.
  - Mobile-first layouts, accessible button states, glassmorphic panels, and smooth transitions.

---

## 🏗️ Architecture & Data Flow

```mermaid
graph TD
    Client[Client / Customer] -->|Visits /book/aura-studio| BookingPortal[Public Booking Portal]
    BookingPortal -->|Selects Service & Time Slot| BookingAction[Server Action: bookAppointment]
    BookingAction -->|Persists Record| Postgres[(PostgreSQL 16 / Docker)]
    BookingAction -->|Dispatches Confirmation| ResendAPI[Resend Notification API]

    Provider[Service Provider / Operator] -->|Signs In via /sign-in| ClerkGuard[Clerk Auth Guard / Middleware]
    ClerkGuard -->|Session Verified| Dashboard[Provider Dashboard /dashboard]
    Dashboard -->|Manages Services & Appointments| DrizzleORM[Drizzle ORM Engine]
    DrizzleORM --> Postgres
```

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15.0.4** | React 18 App Router, Server Components, Server Actions |
| **Language** | **TypeScript 5** | Strict type-checking and end-to-end type safety |
| **Styling** | **Tailwind CSS 3.4** | Custom modern typography, glassmorphism, responsive utilities |
| **Authentication** | **Clerk Next.js v6** | Session management, protected middleware, OAuth / Email login |
| **Database & ORM** | **PostgreSQL 16 + Drizzle ORM** | Schema migrations, Drizzle Kit CLI, type-safe queries |
| **Containerization** | **Docker Desktop & Compose** | Local isolated PostgreSQL instance with health checks |
| **Transactional Email** | **Resend** | Booking confirmations and new appointment intake alerts |
| **Date Manipulation** | **date-fns 4.1** | Slot intervals, ISO formatting, and appointment arithmetic |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or `v24.x`
- **Docker Desktop**: Installed and running (for local PostgreSQL)
- **Git**

### 2. Clone the Repository
```bash
git clone https://github.com/DuHieu/slotly-booking.git
cd slotly-booking
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Local Database (Docker Compose)
A pre-configured `docker-compose.yml` is provided for containerized PostgreSQL on port `5434`:
```bash
docker compose up -d
```
Verify the container status:
```bash
docker ps --filter "name=booking_saas_postgres"
```

---

## 🔐 Clerk Authentication Setup

1. Create a free account at [clerk.com](https://clerk.com).
2. Create a new application in your Clerk Dashboard.
3. In the Clerk Dashboard, navigate to **API Keys** and copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_...` or `pk_live_...`)
   - `CLERK_SECRET_KEY` (starts with `sk_test_...` or `sk_live_...`)
4. Set the sign-in and sign-up paths in your Clerk application settings to `/sign-in` and `/sign-up`.

---

## 🗄️ Database & Drizzle Setup

1. Configure your database URL in `.env.local` (see below).
2. Generate schema migrations:
   ```bash
   npm run db:generate
   ```
3. Push schema to your PostgreSQL database:
   ```bash
   npm run db:push
   ```
4. (Optional) Launch Drizzle Studio to inspect database records visually in your browser:
   ```bash
   npm run db:studio
   ```

---

## ⚙️ Environment Variables

Create a `.env.local` file by copying `.env.example`:
```bash
cp .env.example .env.local
```

Populate the required environment variables:

| Variable | Required | Description | Example Placeholder |
| :--- | :---: | :--- | :--- |
| `DATABASE_URL` | **Yes** | PostgreSQL connection URI | `postgresql://postgres:password@localhost:5434/booking_saas` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | **Yes** | Clerk publishable frontend API key | `pk_test_your_clerk_publishable_key_here` |
| `CLERK_SECRET_KEY` | **Yes** | Clerk backend secret API key | `sk_test_your_clerk_secret_key_here` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | **Yes** | Custom sign-in route | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | **Yes** | Custom sign-up route | `/sign-up` |
| `RESEND_API_KEY` | *Optional* | Resend API key for transactional emails | `re_your_resend_api_key_here` |
| `RESEND_FROM_EMAIL` | *Optional* | Sender address for outgoing emails | `Slotly <bookings@yourdomain.com>` |
| `BOOKING_NOTIFICATION_EMAIL` | *Optional* | Recipient address for new booking alerts | `notifications@yourdomain.com` |

---

## 💻 Development Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server (default: `http://localhost:3000`) |
| `npm run build` | Compiles and optimizes production build for all routes |
| `npm run start` | Starts Next.js in production server mode |
| `npm run typecheck` | Executes `tsc --noEmit` to verify strict TypeScript types |
| `npm run lint` | Runs Next.js ESLint static code analysis |
| `npm run db:generate` | Generates Drizzle SQL migration files from schema |
| `npm run db:push` | Pushes Drizzle schema definitions directly to PostgreSQL |
| `npm run db:studio` | Opens interactive Drizzle Studio database UI in browser |

---

## 📸 Screenshots & Visual Walkthrough

### 1. Landing Page (`/`)
*High-converting SaaS presentation featuring value propositions, interactive UI previews, service showcases, and tech stack architecture.*

### 2. Client Booking Portal (`/book/[providerSlug]`)
*Frictionless 3-step scheduling engine: (1) Service Tier Selection, (2) Date & Interactive Time-Slot Picker, (3) Client Details with instant booking confirmation.*

### 3. Provider Console (`/dashboard`)
*Protected operations cockpit with operational metrics, shareable booking link widget, filterable appointment queue (`All` / `Confirmed` / `Pending`), and service catalog.*

### 4. Branded Authentication (`/sign-in` & `/sign-up`)
*Custom branded Clerk authentication portals with SSL trust indicators and direct back navigation.*

---

## 📜 License & Attribution

This project is open source and available under the [MIT License](LICENSE).

- Original architecture copyright (c) 2024 Sunny ([visualiseIT](https://github.com/visualiseIT)).
- Redesign, Drizzle migrations, containerization, and Slotly portfolio enhancements copyright (c) 2026 Du Van Hieu.

