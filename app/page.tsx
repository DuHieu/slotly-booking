import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BrandLogo } from "@/components/brand-logo";
import { demoBookings, demoProvider, demoServices } from "@/lib/demo-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafaf9] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Announcement Bar */}
      <div className="border-b border-emerald-900/10 bg-gradient-to-r from-emerald-800 to-teal-900 px-4 py-2 text-center text-xs font-medium text-emerald-100">
        <span className="inline-flex items-center gap-1.5">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <strong className="text-white">Slotly v1.0 Live Demo:</strong> Fully containerized with Docker Desktop, PostgreSQL 16 & Clerk Auth.
        </span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <BrandLogo size="md" />

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600">
            <Link href={`/book/${demoProvider.slug}`} className="transition-colors hover:text-stone-950">
              Live Client Booking
            </Link>
            <a href="#features" className="transition-colors hover:text-stone-950">
              Platform Capabilities
            </a>
            <a href="#architecture" className="transition-colors hover:text-stone-950">
              Tech Stack
            </a>
          </nav>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-stone-700 shadow-xs transition-all hover:bg-stone-50 hover:text-stone-950">
                  Sign In
                </button>
              </SignInButton>
              <Link
                href="/sign-up"
                className="hidden sm:inline-flex rounded-lg border border-emerald-700/30 bg-emerald-50 px-3.5 py-2 text-emerald-800 shadow-xs transition-all hover:bg-emerald-100"
              >
                Register Studio
              </Link>
              <Link
                href={`/book/${demoProvider.slug}`}
                className="rounded-lg bg-emerald-700 px-4 py-2 text-white shadow-xs transition-all hover:bg-emerald-800"
              >
                Test Client Flow →
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="rounded-lg bg-emerald-700 px-4 py-2 text-white shadow-xs transition-all hover:bg-emerald-800"
              >
                Provider Console →
              </Link>
              <div className="border-l border-stone-200 pl-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600" />
            Independent Service Operations Platform
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl md:text-6xl">
            Effortless client scheduling for{" "}
            <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
              boutique studios & advisors.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
            Replace back-and-forth emails with a branded booking portal. Define service packages, collect qualified client requests, and manage appointments in one unified workspace.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={`/book/${demoProvider.slug}`}
              className="w-full sm:w-auto rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              <span>Explore Public Booking Page</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-xs transition-all hover:bg-stone-50 hover:text-stone-950 flex items-center justify-center gap-2"
            >
              <span>Open Provider Dashboard</span>
            </Link>
          </div>

          {/* Social Proof Metric Chips */}
          <div className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-stone-200/80 pt-8 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-sm">4.98 / 5.0</span>
              <span>Client Satisfaction</span>
            </div>
            <div className="h-4 w-px bg-stone-200" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-sm">99.9%</span>
              <span>Uptime SLA</span>
            </div>
            <div className="h-4 w-px bg-stone-200" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-sm">0%</span>
              <span>Platform Take-Rate</span>
            </div>
            <div className="h-4 w-px bg-stone-200" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-sm">Clerk v6</span>
              <span>Secured Routes</span>
            </div>
          </div>
        </div>

        {/* Interactive Dual-Panel Mockup Preview */}
        <div className="mx-auto mt-14 max-w-6xl px-6">
          <div className="rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-6 shadow-xl shadow-stone-200/50">
            <div className="mb-4 flex items-center justify-between border-b border-stone-150 pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-stone-400">slotly.app / live-preview</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Live Demo Active
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              {/* Left Preview: Studio Info */}
              <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <span>Sample Client Portal</span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-stone-900">{demoProvider.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">{demoProvider.bio}</p>

                <div className="mt-5 space-y-2 border-t border-stone-200/70 pt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Primary Timezone</span>
                    <span className="font-semibold text-stone-900">{demoProvider.timezone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Consultation Location</span>
                    <span className="font-semibold text-stone-900">{demoProvider.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Weekly Bookings</span>
                    <span className="font-semibold text-emerald-700">18 Sessions</span>
                  </div>
                </div>
              </div>

              {/* Right Preview: Live Booking Queue */}
              <div className="rounded-xl border border-stone-200 bg-white p-5">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h4 className="text-sm font-bold text-stone-900">Upcoming Client Queue</h4>
                  <span className="text-[11px] font-medium text-stone-500">Synced Real-Time</span>
                </div>

                <div className="divide-y divide-stone-100 mt-2">
                  {demoBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between py-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-stone-900">{booking.customer}</p>
                          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">{booking.service}</p>
                      </div>
                      <div className="text-right text-xs">
                        <p className="font-semibold text-stone-900">{booking.date}</p>
                        <p className="text-[11px] text-stone-500">{booking.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars Section */}
      <section id="features" className="border-y border-stone-200/80 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Boutique SaaS Capabilities
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">
              Engineered for seamless client booking.
            </h2>
            <p className="mt-3 text-sm text-stone-600">
              Everything required to operate professional appointment scheduling without third-party commission or complex configuration.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <article className="rounded-2xl border border-stone-200/90 bg-[#fafaf9] p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-stone-950">Branded Public Booking Page</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Give your clients a responsive, distraction-free booking portal. Dynamic time chips, service duration previews, and zero signup barrier for clients.
              </p>
            </article>

            <article className="rounded-2xl border border-stone-200/90 bg-[#fafaf9] p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-stone-950">Protected Operator Workspace</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Clerk Authentication keeps studio management routes strictly confidential. Real-time metric tiles, service creator, and profile editors live in an auth-guarded console.
              </p>
            </article>

            <article className="rounded-2xl border border-stone-200/90 bg-[#fafaf9] p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-stone-950">Automated Email Notifications</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Resend integration ready to dispatch booking receipts to clients and instantaneous intake alerts with customer phone numbers and agendas to studio operators.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Service Showcase Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Advisory Offerings
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
                Ready-to-book consultation tiers
              </h2>
            </div>
            <Link
              href={`/book/${demoProvider.slug}`}
              className="mt-4 md:mt-0 text-xs font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
            >
              <span>View Interactive Selector</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {demoServices.map((service) => (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-stone-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                      {service.badge}
                    </span>
                    <span className="text-xs font-semibold text-stone-500">
                      {service.duration} mins
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-stone-950">{service.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 min-h-[50px]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 flex items-baseline justify-between border-t border-stone-100 pt-4">
                  <span className="text-3xl font-bold text-stone-950">${service.price}</span>
                  <Link
                    href={`/book/${demoProvider.slug}`}
                    className="rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                  >
                    Select Slot
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Architecture Section */}
      <section id="architecture" className="border-t border-stone-200/80 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
            Portfolio Architecture & Technical Stack
          </span>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            {[
              "Next.js 15 (App Router)",
              "React 18 Server Components",
              "TypeScript 5",
              "Tailwind CSS v3",
              "Clerk Auth v6",
              "Drizzle ORM",
              "PostgreSQL 16",
              "Docker Desktop Compose",
              "Resend Email API",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-stone-200 bg-[#fafaf9] px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-[#fafaf9] py-10 text-xs text-stone-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <BrandLogo size="sm" />
          <p>© 2026 Slotly Booking SaaS. Built for independent service businesses and boutique studios.</p>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-stone-700 font-medium">All systems operational</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
