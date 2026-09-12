"use client";

import { useState } from "react";
import { format, addMinutes } from "date-fns";
import { demoServices, DemoSlot } from "@/lib/demo-data";
import { bookAppointment } from "@/lib/actions";

interface BookingFormProps {
  providerSlug: string;
  slots: DemoSlot[];
}

export function BookingForm({ providerSlug, slots }: BookingFormProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(demoServices[0].id);
  const [selectedSlotValue, setSelectedSlotValue] = useState<string>(slots[0]?.value || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentService = demoServices.find((s) => s.id === selectedServiceId) || demoServices[0];
  const currentSlot = slots.find((s) => s.value === selectedSlotValue) || slots[0];

  const slotStartDate = currentSlot?.value ? new Date(currentSlot.value) : new Date();
  const calculatedEndDate = addMinutes(slotStartDate, currentService.duration);

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);
        try {
          await bookAppointment(formData);
        } finally {
          setIsSubmitting(false);
        }
      }}
      className="space-y-8"
    >
      <input type="hidden" name="providerSlug" value={providerSlug} />
      <input type="hidden" name="serviceId" value={currentService.id} />
      <input type="hidden" name="serviceName" value={currentService.name} />
      <input type="hidden" name="duration" value={currentService.duration.toString()} />
      <input type="hidden" name="startTime" value={currentSlot?.value || ""} />

      {/* Step 1: Service Selection */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
              1
            </span>
            <h3 className="text-base font-semibold text-stone-900">Select Service Tier</h3>
          </div>
          <span className="text-xs font-medium text-stone-500">Duration & Pricing</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {demoServices.map((service) => {
            const isSelected = service.id === currentService.id;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedServiceId(service.id)}
                className={`relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-600/20"
                    : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-700">
                      {service.duration} mins
                    </span>
                    <span className="text-xs font-semibold text-emerald-700">
                      ${service.price}
                    </span>
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-stone-900 leading-snug">
                    {service.name}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-600 line-clamp-2">
                    {service.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Selected
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Time Slot Picker */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
              2
            </span>
            <h3 className="text-base font-semibold text-stone-900">Choose Available Time Slot</h3>
          </div>
          <span className="text-xs font-medium text-stone-500">
            {format(slotStartDate, "EEEE, MMMM d")}
          </span>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {slots.map((slot) => {
              const isSelected = slot.value === currentSlot?.value;
              return (
                <button
                  key={slot.value}
                  type="button"
                  onClick={() => setSelectedSlotValue(slot.value)}
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? "border-emerald-700 bg-emerald-700 text-white shadow-sm"
                      : "border-stone-200 bg-stone-50 text-stone-800 hover:border-emerald-300 hover:bg-white"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-3.5 w-3.5 opacity-70"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {slot.timeString}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step 3: Client Details */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
            3
          </span>
          <h3 className="text-base font-semibold text-stone-900">Your Contact Details</h3>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              name="guestName"
              required
              placeholder="e.g. Alex Morgan"
              className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm transition-colors placeholder:text-stone-400 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Work Email <span className="text-rose-500">*</span>
            </label>
            <input
              name="guestEmail"
              type="email"
              required
              placeholder="alex@company.com"
              className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm transition-colors placeholder:text-stone-400 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Phone Number <span className="text-stone-400 font-normal">(Optional, for SMS reminders)</span>
            </label>
            <input
              name="guestPhone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm transition-colors placeholder:text-stone-400 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Session Agenda or Specific Questions <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Briefly describe what you'd like to achieve during our consultation..."
              className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm transition-colors placeholder:text-stone-400 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>
        </div>
      </section>

      {/* Appointment Summary Box */}
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Booking Summary
            </p>
            <p className="text-sm font-semibold text-stone-950 mt-0.5">
              {currentService.name}
            </p>
            <p className="text-xs text-stone-600 mt-0.5">
              {currentSlot?.label} (Approx. until {format(calculatedEndDate, "HH:mm")})
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-stone-900">${currentService.price}</span>
            <span className="text-xs text-stone-500 block">Total Due</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Confirming Booking Request...
          </>
        ) : (
          <>
            Request Appointment Confirmation
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
      </button>

      <p className="text-center text-xs text-stone-500">
        🔒 Encrypted & verified. Your confirmation and calendar invite will be emailed instantly.
      </p>
    </form>
  );
}
