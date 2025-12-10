"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[rgb(var(--color-bg))] text-[rgb(var(--color-fg))]">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <button
        className="px-6 py-3 rounded-full border-1 border-[rgb(var(--color-fg))] hover:bg-[rgba(var(--color-fg),0.1)]"
        onClick={() => router.push("/dashboard")}
      >
        Go back to dashboard
      </button>
    </div>
  );
}
