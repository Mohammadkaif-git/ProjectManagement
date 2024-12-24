"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { RootState } from "@/app/redux";
import { setIsSideBarCollapsed } from "@/state";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useGetProjectsQuery } from "@/state/api";
const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state: RootState) => state.global.isSideBarCollapsed
  );

  useEffect(() => {
    setShowProjects(true);
    setShowPriority(true);
  }, []);

  const sidbarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white 
    ${isSideBarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidbarClassNames}>
      {/* Top logo */}
      <div className="flex h-100 w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            EDLIST
          </div>
          {isSideBarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSideBarCollapsed(!isSideBarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* TEAM */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-white">
              PROJECT TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500 dark:text-white">Private</p>
            </div>
          </div>
        </div>

        {/* Navbar links */}
        <nav className="z-10 w-full">
          <SidebarLink href="/" icon={Home} label="Home" />
          <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
          <SidebarLink href="/search" icon={Search} label="Search" />
          <SidebarLink href="/settings" icon={Settings} label="Settings" />
          <SidebarLink href="/users" icon={User} label="Users" />
          <SidebarLink href="/teams" icon={Users} label="Team" />
        </nav>

        {/* Projects Section */}
        <div>
          <button 
            onClick={() => setShowProjects((prev) => !prev)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500 dark:text-white"
          >
            <span>Projects</span>
            {showProjects ? (
              <ChevronUp className="h-5 w-5"/>
            ) : (
              <ChevronDown className="h-5 w-5"/>
            )}
          </button>

          {/* Project List - Moved outside button */}
          {showProjects && (
            <div className="flex flex-col w-full">
              {projects?.map((project) => (
                <SidebarLink
                  key={project.id}
                  icon={Briefcase}
                  href={`/projects/${project.id}`}
                  label={project.name}
                />
              ))}
            </div>
          )}
        </div>

        <button onClick={()=> setShowPriority((prev)=>!prev)} 
        className="flex w-full items-center justify-between px-8 py-3 text-gray-500 dark:text-white">
            <span className="">Priority</span>
            {showPriority ? (
                <ChevronUp className="h-5 w-5"/>
            ):<ChevronDown className="h-5 w-5"/>}
        </button>
        {showPriority && (
            <>
            <SidebarLink icon={AlertCircle} label="Urgent" href="/priority/urgent"/>
            <SidebarLink icon={ShieldAlert} label="High" href="/priority/High"/>
            <SidebarLink icon={AlertTriangle} label="Medium" href="/priority/medium"/>
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low"/>
            <SidebarLink icon={Layers3} label="Backlog" href="/priority/backlog"/>
            </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-all hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        }justify-start px-8 py-3 `}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
