import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

const DDL_STATEMENTS = [
  // 1. service_providers
  `CREATE TABLE IF NOT EXISTS "service_providers" (
    "id" text PRIMARY KEY NOT NULL,
    "email" text NOT NULL,
    "name" text NOT NULL,
    "slug" text NOT NULL,
    "bio" text,
    "timezone" text DEFAULT 'UTC' NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "service_providers_email_unique" UNIQUE("email"),
    CONSTRAINT "service_providers_slug_unique" UNIQUE("slug")
  );`,

  // 2. services
  `CREATE TABLE IF NOT EXISTS "services" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "duration" integer NOT NULL,
    "price" real,
    "is_active" boolean DEFAULT true NOT NULL,
    "provider_id" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  );`,

  // 3. customers
  `CREATE TABLE IF NOT EXISTS "customers" (
    "id" text PRIMARY KEY NOT NULL,
    "email" text NOT NULL,
    "name" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "customers_email_unique" UNIQUE("email")
  );`,

  // 4. bookings
  `CREATE TABLE IF NOT EXISTS "bookings" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "start_time" timestamp NOT NULL,
    "end_time" timestamp NOT NULL,
    "status" text NOT NULL,
    "service_id" uuid NOT NULL,
    "customer_id" text,
    "guest_email" text,
    "guest_name" text,
    "guest_phone" text,
    "notes" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  );`,

  // 5. availabilities
  `CREATE TABLE IF NOT EXISTS "availabilities" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "day_of_week" integer NOT NULL,
    "start_time" text NOT NULL,
    "end_time" text NOT NULL,
    "provider_id" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  );`,

  // 6. blocked_times
  `CREATE TABLE IF NOT EXISTS "blocked_times" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "start_time" timestamp NOT NULL,
    "end_time" timestamp NOT NULL,
    "reason" text,
    "provider_id" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  );`,

  // 7. calendar_connections
  `CREATE TABLE IF NOT EXISTS "calendar_connections" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "provider" text NOT NULL,
    "access_token" text NOT NULL,
    "refresh_token" text,
    "expires_at" timestamp,
    "provider_id" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  );`,

  // Foreign keys
  `DO $$ BEGIN
    ALTER TABLE "services" ADD CONSTRAINT "services_provider_id_service_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."service_providers"("id") ON DELETE no action ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`,

  `DO $$ BEGIN
    ALTER TABLE "bookings" ADD CONSTRAINT "bookings_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`,

  `DO $$ BEGIN
    ALTER TABLE "bookings" ADD CONSTRAINT "bookings_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`,

  `DO $$ BEGIN
    ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_provider_id_service_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."service_providers"("id") ON DELETE no action ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`,

  `DO $$ BEGIN
    ALTER TABLE "blocked_times" ADD CONSTRAINT "blocked_times_provider_id_service_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."service_providers"("id") ON DELETE no action ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`,

  `DO $$ BEGIN
    ALTER TABLE "calendar_connections" ADD CONSTRAINT "calendar_connections_provider_id_service_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."service_providers"("id") ON DELETE no action ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`,
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  const expectedSecret = process.env.SETUP_SECRET || "slotly-init-2025";
  if (secret !== expectedSecret) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Pass ?secret=slotly-init-2025 to execute database setup.",
      },
      { status: 401 }
    );
  }

  const results: string[] = [];

  try {
    // 1. Run DDL statements
    for (let i = 0; i < DDL_STATEMENTS.length; i++) {
      await sql.query(DDL_STATEMENTS[i]);
      results.push(`Statement ${i + 1} executed`);
    }

    // 2. Seed default provider if not exists
    await sql.query(`
      INSERT INTO service_providers (id, email, name, slug, bio, timezone)
      VALUES (
        'provider_alex_morgan',
        'alex.morgan@slotly.demo',
        'Alex Morgan',
        'alex-morgan',
        'Senior Product & Technical Architecture Consultant helping modern software teams and founders build scalable systems.',
        'America/New_York'
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        slug = EXCLUDED.slug,
        bio = EXCLUDED.bio;
    `);
    results.push("Default provider seeded");

    // 3. Seed demo services if none exist
    const existingServices = await sql.query(`SELECT count(*) as count FROM services;`);
    const serviceCount = Number(existingServices.rows[0]?.count || 0);

    if (serviceCount === 0) {
      await sql.query(`
        INSERT INTO services (name, description, duration, price, provider_id)
        VALUES 
          ('Discovery & Technical Audit', 'High-impact 45-minute architectural review and bottleneck diagnosis for engineering teams.', 45, 150, 'provider_alex_morgan'),
          ('Architecture & Strategy Session', 'In-depth 60-minute technical roadmap planning and stack optimization consultation.', 60, 220, 'provider_alex_morgan'),
          ('Executive Advisory & Roadmap', '90-minute comprehensive strategic advisory session covering technical delivery, cloud economics, and product milestones.', 90, 320, 'provider_alex_morgan');
      `);
      results.push("Default services seeded");
    } else {
      results.push(`Services table already has ${serviceCount} rows`);
    }

    // 4. Query all tables in public schema
    const tablesQuery = await sql.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    const tables = tablesQuery.rows.map((r) => r.table_name);

    return NextResponse.json({
      success: true,
      message: "Slotly database initialized successfully on Neon PostgreSQL!",
      tables,
      results,
    });
  } catch (error) {
    console.error("Database setup failed:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to initialize database",
        details: msg,
      },
      { status: 500 }
    );
  }
}
