"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to projects page
    router.push('/projects');
  }, [router]);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="p-6">Redirecting to projects...</div>
    </main>
  );
}
