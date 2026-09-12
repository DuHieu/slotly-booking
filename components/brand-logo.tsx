import Link from "next/link";

interface BrandLogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BrandLogo({ href = "/", size = "md", className = "" }: BrandLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-base font-bold",
    md: "text-lg font-bold",
    lg: "text-2xl font-bold",
  };

  const content = (
    <div className={`flex items-center gap-2.5 tracking-tight ${className}`}>
      <div
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20 ring-1 ring-black/5`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`${textSizes[size]} leading-none text-stone-900 font-semibold flex items-center gap-1.5`}>
          Slotly
          <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            SaaS
          </span>
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
