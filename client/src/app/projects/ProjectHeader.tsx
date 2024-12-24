"use client";

import React from 'react';
import Header from '../(components)/Header';
import { Clock, Filter, Grid3X3, List, Share2, Share2Icon, Table } from 'lucide-react';

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  // console.log("ProjectHeader rendering, activeTab:", activeTab); // Debug log

  return (
    <div className='w-full bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-stroke-dark'>
      {/* Header Section */}
      <div className='px-6 py-5 '>
        <Header name="Product Design Development"/>
      </div>

      <div className='flex items-center gap-3 pb-2 pl-6'>
          <button className='text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-200'>
            <Filter className='h-5 w-5'/>
          </button>
          <button className='text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-200'>
            <Share2Icon className='h-5 w-5'/>
          </button>
          <div className='relative'>
            <input type='text' placeholder='Search Task'
            className='rounded-md border py-1 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-dark-secondary dark:bg-dark-secondary dark:text-white'/>
               <Grid3X3 className='absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500'/>
          </div>
        </div>

      {/* Tabs Section */}
      <div className='px-6 border-t border-gray-200 dark:border-stroke-dark'>
        <div className='flex space-x-8'>
          <TabButton 
            name="Board" 
            icon={<Grid3X3 className="h-5 w-5" />} 
            setActiveTab={setActiveTab} 
            activeTab={activeTab}
          />
          <TabButton 
            name="List" 
            icon={<List className="h-5 w-5" />} 
            setActiveTab={setActiveTab} 
            activeTab={activeTab}
          />
          <TabButton 
            name="Timeline" 
            icon={<Clock className="h-5 w-5" />} 
            setActiveTab={setActiveTab} 
            activeTab={activeTab}
          />
          <TabButton 
            name="Table" 
            icon={<Table className="h-5 w-5" />} 
            setActiveTab={setActiveTab} 
            activeTab={activeTab}
          />
        </div>
     
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
}

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;
  
  return (
    <button
      onClick={() => setActiveTab(name)}
      className={`flex items-center space-x-2 py-4 px-3 border-b-2 transition-colors ${
        isActive 
          ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      }`}
    >
      {icon}
      <span>{name}</span>
    </button>
  );
};

export default ProjectHeader;