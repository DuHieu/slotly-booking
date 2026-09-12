import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { BrandLogo } from "@/components/brand-logo";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fafaf9] px-4 py-12">
      <div className="mb-6 flex flex-col items-center text-center">
        <BrandLogo size="md" />
        <h1 className="mt-3 text-lg font-bold text-stone-900">Sign in to Provider Console</h1>
        <p className="mt-1 text-xs text-stone-500 max-w-xs">
          Access your appointment queue, client communications, and service configurations.
        </p>
      </div>

      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />

      <div className="mt-6 flex items-center gap-4 text-xs text-stone-500">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          ← Back to Slotly Overview
        </Link>
        <span>•</span>
        <span className="flex items-center gap-1">
          <span>🔒 Secured with Clerk Auth</span>
        </span>
      </div>
    </main>
  );
}
