"use client";

import dynamic from 'next/dynamic';

const DashboardWrapper = dynamic(() => import('../../dashboardWrapper'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
} 