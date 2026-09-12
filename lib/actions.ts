"use server";

import { currentUser } from "@clerk/nextjs/server";
import { addMinutes } from "date-fns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { db, bookings, serviceProviders, services } from "@/db";

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getRequiredValue(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim();

  if (!value) {
    throw new Error(`${key} is required`);
  }

  return value;
}

export async function saveProviderProfile(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const name = getRequiredValue(formData, "name");
  const slug = normalizeSlug(getRequiredValue(formData, "slug"));
  const email = user.emailAddresses[0]?.emailAddress ?? getRequiredValue(formData, "email");
  const bio = formData.get("bio")?.toString().trim() || null;
  const timezone = formData.get("timezone")?.toString().trim() || "UTC";

  if (hasDatabase()) {
    await db
      .insert(serviceProviders)
      .values({
        id: user.id,
        email,
        name,
        slug,
        bio,
        timezone,
      })
      .onConflictDoUpdate({
        target: serviceProviders.id,
        set: {
          email,
          name,
          slug,
          bio,
          timezone,
          updatedAt: new Date(),
        },
      });
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard?profile=${hasDatabase() ? "saved" : "demo"}`);
}

export async function createService(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const name = getRequiredValue(formData, "serviceName");
  const description = formData.get("description")?.toString().trim() || null;
  const duration = Number(getRequiredValue(formData, "duration"));
  const price = Number(formData.get("price")?.toString() || "0");

  if (!Number.isFinite(duration) || duration < 15) {
    throw new Error("Duration must be at least 15 minutes");
  }

  if (hasDatabase()) {
    await db.insert(services).values({
      name,
      description,
      duration,
      price,
      providerId: user.id,
    });
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard?service=${hasDatabase() ? "created" : "demo"}`);
}

export async function bookAppointment(formData: FormData) {
  const serviceId = getRequiredValue(formData, "serviceId");
  const startTime = new Date(getRequiredValue(formData, "startTime"));
  const guestName = getRequiredValue(formData, "guestName");
  const guestEmail = getRequiredValue(formData, "guestEmail");
  const guestPhone = formData.get("guestPhone")?.toString().trim() || null;
  const notes = formData.get("notes")?.toString().trim() || null;
  const duration = Number(formData.get("duration")?.toString() || "30");
  const providerSlug = getRequiredValue(formData, "providerSlug");
  const serviceName = getRequiredValue(formData, "serviceName");
  const endTime = addMinutes(startTime, duration);

  if (hasDatabase()) {
    await db.insert(bookings).values({
      startTime,
      endTime,
      status: "pending",
      serviceId,
      guestName,
      guestEmail,
      guestPhone,
      notes,
    });
  }

  if (process.env.RESEND_API_KEY && process.env.BOOKING_NOTIFICATION_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Slotly <onboarding@resend.dev>",
      to: process.env.BOOKING_NOTIFICATION_EMAIL,
      subject: `New booking request: ${serviceName}`,
      text: [
        `Service: ${serviceName}`,
        `Customer: ${guestName}`,
        `Email: ${guestEmail}`,
        guestPhone ? `Phone: ${guestPhone}` : null,
        `Start: ${startTime.toISOString()}`,
        notes ? `Notes: ${notes}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  }

  revalidatePath(`/book/${providerSlug}`);
  redirect(`/book/${providerSlug}?booked=${hasDatabase() ? "pending" : "demo"}`);
}
