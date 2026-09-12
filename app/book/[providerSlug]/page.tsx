import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { BookingForm } from "@/components/booking-form";
import { demoProvider, demoServices, getDemoSlots } from "@/lib/demo-data";

type BookingPageProps = {
  params: Promise<{ providerSlug: string }>;
  searchParams?: Promise<Record<string, string | undefined>>;
};

export default async function BookingPage({ params, searchParams }: BookingPageProps) {
  const { providerSlug } = await params;
  const query = await searchParams;
  const slots = getDemoSlots();

  return (
    <main className="min-h-screen bg-[#fafaf9] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <BrandLogo size="sm" />
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-stone-500 sm:inline-block">
              Are you the studio operator?
            </span>
            <Link
              href="/dashboard"
              className="rounded-lg border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:text-stone-950"
            >
              Provider Portal →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[380px_1fr] items-start">
          {/* Provider Profile Sidebar */}
          <aside className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm shadow-stone-200/40">
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Accepting New Clients
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-stone-900">
              {demoProvider.name}
            </h1>
            <p className="mt-1 text-xs font-medium text-emerald-700">
              {demoProvider.tagline}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              {demoProvider.bio}
            </p>

            {/* Credibility & Logistics Chips */}
            <div className="mt-6 space-y-2.5 border-t border-b border-stone-100 py-4 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <svg className="h-4 w-4 text-amber-500 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Client Rating
                </span>
                <span className="font-semibold text-stone-900">
                  {demoProvider.rating} / 5.0 ({demoProvider.reviewsCount} reviews)
                </span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <svg className="h-4 w-4 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
                  </svg>
                  Meeting Mode
                </span>
                <span className="font-semibold text-stone-900">Google Meet (Auto-invite)</span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <svg className="h-4 w-4 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Timezone
                </span>
                <span className="font-semibold text-stone-900">{demoProvider.timezone}</span>
              </div>
            </div>

            {/* Service Menu Preview */}
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Available Services ({demoServices.length})
              </h2>
              <div className="mt-3 space-y-2.5">
                {demoServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between rounded-lg border border-stone-150 bg-stone-50/70 p-2.5 text-xs transition-colors hover:bg-stone-50"
                  >
                    <div>
                      <p className="font-semibold text-stone-900">{service.name}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{service.duration} mins</p>
                    </div>
                    <span className="font-bold text-stone-900 bg-white px-2 py-1 rounded border border-stone-200">
                      ${service.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Verified Footnote */}
            <div className="mt-6 rounded-xl bg-emerald-50/60 p-3 text-[11px] text-emerald-800 border border-emerald-100 flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-emerald-600">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Verified Slotly Provider. No booking fee charged to client.</span>
            </div>
          </aside>

          {/* Booking Interaction Area */}
          <section className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-sm shadow-stone-200/40">
            {query?.booked ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-stone-900">
                  Booking Request Received!
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-stone-600">
                  Thank you! Your appointment request has been registered. The studio will review and send the calendar invitation with Google Meet credentials directly to your inbox.
                </p>

                <div className="mx-auto mt-6 max-w-sm rounded-xl border border-stone-200 bg-stone-50 p-4 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Status:</span>
                    <span className="font-semibold text-emerald-700">Confirmed & Queued</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Studio:</span>
                    <span className="font-semibold text-stone-900">{demoProvider.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Ref Code:</span>
                    <span className="font-mono text-stone-700">CLN-849201</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href={`/book/${providerSlug}`}
                    className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-xs font-semibold text-stone-800 shadow-sm hover:bg-stone-50"
                  >
                    Book Another Appointment
                  </Link>
                  <Link
                    href="/"
                    className="rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-800"
                  >
                    Back to Slotly Home
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="border-b border-stone-100 pb-5">
                  <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                    Schedule an Appointment
                  </h2>
                  <p className="mt-1 text-sm text-stone-500">
                    Select an advisory service and pick your preferred time slot to reserve a dedicated consultation.
                  </p>
                </div>

                <div className="mt-6">
                  <BookingForm providerSlug={providerSlug} slots={slots} />
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
