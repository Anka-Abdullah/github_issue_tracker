"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GitBranch } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/dashboard");
    }, 800);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
          <GitBranch size={20} className="text-white" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Signing you in…</p>
        <div className="mt-3 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-gray-700 dark:border-t-gray-400 rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}