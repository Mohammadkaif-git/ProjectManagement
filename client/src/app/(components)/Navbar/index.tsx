import React, { useEffect } from 'react'
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSideBarCollapsed } from '@/state';

const Navbar = () => {

  const dispatch=useAppDispatch();
  const isSideBarCollapsed=useAppSelector((state)=>state.global.isSideBarCollapsed);
  const isDarkMode=useAppSelector((state)=>state.global.isDarkMode);


  return (
    <div className='flex items-center justify-between bg-white px-4 py-4 dark:bg-black sm:px-6 lg:px-8'>
      {/* Left Section with Search */}
      <div className='flex items-center gap-4 md:gap-8'>
        {!isSideBarCollapsed ? null: (
          <button onClick={()=> dispatch(setIsSideBarCollapsed(!isSideBarCollapsed))}>
            <Menu className='h-8 w-8 dark:text-white'></Menu>
          </button>
        )}
        <div className='relative flex h-min w-full max-w-xs md:w-[200px]'>
          <Search className='absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer '/>
          <input
            className='w-full rounded border-none bg-gray-100 p-2 pl-10 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:placeholder-gray-400'
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>
      
      {/* Right Section with Settings Icon and Divider */}
      <div className='flex items-center'>
        <button onClick={()=>dispatch(setIsDarkMode(!isDarkMode))} className={isDarkMode ? `rounded p-2 dark:hover:bg-gray-700` : `rounded p-2 hover:bg-gray-100` }>
          {isDarkMode ? (
            <Sun className='h-5 w-5 cursor-pointer dark:text-white'/>
          ):(
            <Moon className='h-5 w-5 cursor-pointer dark:text-white'/>
          )}
        </button>
        <Link href="/settings" 
          className={isDarkMode 
                      ? `h-min w-min rounded p-2 dark:hover:bg-gray-700` 
                      : `h-min w-min rounded p-2 hover:bg-gray-100` }>
          <Settings className='h-6 w-6 cursor-pointer dark:text-white' />
        </Link>
        <div className='hidden ml-2 mr-5 h-full w-[1px] bg-gray-200 md:inline-block dark:bg-gray-600'>

        </div>
      </div>
    </div>
  );
}

export default Navbar;
