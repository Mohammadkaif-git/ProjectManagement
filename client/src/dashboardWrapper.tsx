"use client";

import React, { useEffect } from 'react'
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import StoreProvider, { RootState, useAppSelector } from '@/app/redux';


const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  const isSideBarCollapsed = useAppSelector((state: RootState) => state.global.isSideBarCollapsed);
  const isDarkMode = useAppSelector((state: RootState) => state.global.isDarkMode);

  useEffect(() => {
    if(isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className='flex min-h-screen w-full'>
      <Sidebar />
      <main className={`flex w-full flex-col ${isSideBarCollapsed ? "" : "md:pl-64"}`}>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper; 