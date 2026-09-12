import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { BrandLogo } from "@/components/brand-logo";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fafaf9] px-4 py-12">
      <div className="mb-6 flex flex-col items-center text-center">
        <BrandLogo size="md" />
        <h1 className="mt-3 text-lg font-bold text-stone-900">Create Provider Account</h1>
        <p className="mt-1 text-xs text-stone-500 max-w-xs">
          Start accepting client appointments with your dedicated branded booking portal.
        </p>
      </div>

      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />

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
