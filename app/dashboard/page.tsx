import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { BrandLogo } from "@/components/brand-logo";
import { CopyLinkButton } from "@/components/copy-link-button";
import { DashboardBookingsTable } from "@/components/dashboard-bookings-table";
import { createService, saveProviderProfile } from "@/lib/actions";
import { demoProvider, demoServices } from "@/lib/demo-data";

type DashboardPageProps = {
  searchParams?: Promise<Record<string, string | undefined>>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const user = await currentUser();
  const params = await searchParams;
  const notice = params?.profile || params?.service;
  const email = user?.emailAddresses[0]?.emailAddress || demoProvider.email;

  return (
    <main className="min-h-screen bg-[#fafaf9] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900 pb-16">
      {/* Dashboard Top Header */}
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <span className="text-stone-300">/</span>
            <span className="text-xs font-semibold text-stone-600">Provider Console</span>
          </div>

          <div className="flex items-center gap-3">
            <CopyLinkButton slug={demoProvider.slug} />
            <Link
              href={`/book/${demoProvider.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:text-stone-900"
            >
              <span>View Public Page</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-stone-400">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </Link>
            <div className="border-l border-stone-200 pl-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Flash Message Banner */}
        {notice && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs font-medium text-emerald-900 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-emerald-600">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>
                {notice === "demo"
                  ? "Changes registered in preview session (connect DATABASE_URL for continuous storage)."
                  : "Profile and service configurations saved successfully to database."}
              </span>
            </div>
            <Link href="/dashboard" className="text-emerald-700 underline font-semibold hover:text-emerald-900">
              Dismiss
            </Link>
          </div>
        )}

        {/* Dashboard Title & Quick Share Banner */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-stone-200 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
              Studio Operations & Scheduling
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Manage client appointments, service pricing, and public studio profile for{" "}
              <span className="font-semibold text-stone-800">{demoProvider.name}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white border border-stone-200 p-2 text-xs shadow-xs">
            <span className="text-stone-500 pl-2 font-mono">
              slotly.app/book/{demoProvider.slug}
            </span>
            <CopyLinkButton slug={demoProvider.slug} />
          </div>
        </div>

        {/* Key Operational Metrics */}
        <section className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
              Bookings This Week
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-stone-950">18</span>
              <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                ↑ 14%
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">4 upcoming sessions</p>
          </div>

          <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
              Projected Revenue
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-stone-950">$3,420</span>
              <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                ↑ 8.5%
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">Avg. $190 / consultation</p>
          </div>

          <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
              Avg. Response Time
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-stone-950">12 mins</span>
              <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Optimal
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">Automated calendar invites</p>
          </div>

          <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
              Active Offerings
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-stone-950">{demoServices.length} Tiers</span>
              <span className="inline-flex items-center text-[11px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                Published
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">45m, 60m, and 90m options</p>
          </div>
        </section>

        {/* 2-Column Content Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Appointments & Services Catalog */}
          <div className="space-y-8">
            {/* Live Appointments Queue */}
            <section className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-stone-950">Upcoming Appointments</h2>
                  <p className="text-xs text-stone-500">
                    Live customer booking queue synced with calendar integrations.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  Live Queue
                </span>
              </div>

              <DashboardBookingsTable />
            </section>

            {/* Active Services List */}
            <section className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-stone-950">Published Services Catalog</h2>
                  <p className="text-xs text-stone-500">
                    Current active offerings visible on your public booking page.
                  </p>
                </div>
                <span className="text-xs font-medium text-stone-500">
                  {demoServices.length} active
                </span>
              </div>

              <div className="divide-y divide-stone-100">
                {demoServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between py-3.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-stone-900">{service.name}</p>
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600">
                          {service.duration} mins
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 max-w-md line-clamp-1">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold text-stone-900">${service.price}</span>
                      <span className="block text-[10px] text-emerald-700 font-semibold">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Forms & Controls */}
          <div className="space-y-8">
            {/* Create New Service */}
            <section className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs">
              <div className="border-b border-stone-150 pb-3 mb-5">
                <h2 className="text-lg font-bold text-stone-950">Add a New Service Tier</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Define consultation duration, client pricing, and session scope.
                </p>
              </div>

              <form action={createService} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Service Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="serviceName"
                    required
                    placeholder="e.g. Technical Architecture Review"
                    defaultValue="Rapid Advisory Diagnostic"
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-xs placeholder:text-stone-400 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Duration
                    </label>
                    <select
                      name="duration"
                      defaultValue="60"
                      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-xs focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                      <option value="120">120 minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Rate (USD $) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="price"
                      type="number"
                      min="0"
                      required
                      defaultValue="150"
                      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-xs focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Description & Expected Deliverables
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue="A focused strategic session analyzing roadmap priorities, architecture trade-offs, and key decision criteria."
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-xs focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-stone-950 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-stone-800"
                >
                  Publish Service to Booking Page
                </button>
              </form>
            </section>

            {/* Provider Profile Configuration */}
            <section className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs">
              <div className="border-b border-stone-150 pb-3 mb-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-stone-950">Studio Public Profile</h2>
                  <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-700">
                    Live Settings
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Information displayed on your public appointment link.
                </p>
              </div>

              <form action={saveProviderProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Studio or Consultant Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    defaultValue={demoProvider.name}
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-xs focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Public Slug <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="slug"
                      required
                      defaultValue={demoProvider.slug}
                      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-xs focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Primary Timezone
                    </label>
                    <input
                      name="timezone"
                      defaultValue={demoProvider.timezone}
                      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-xs focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Contact Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue={email}
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-xs focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Studio Bio & Focus Area
                  </label>
                  <textarea
                    name="bio"
                    rows={3}
                    defaultValue={demoProvider.bio}
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-xs focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-emerald-800"
                >
                  Save Profile Configuration
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
