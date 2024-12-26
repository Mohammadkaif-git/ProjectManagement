"use client";

import React from 'react';
import Header from '../(components)/Header';
import { User, Mail, Users, Briefcase } from 'lucide-react';

type Props = {}

function SettingsPage({}: Props) {
    const userSettings = {
        username: "John Doe",
        email: "john.doe@example.com",
        teamName: "Dev Team",
        role: "Developer"
    }

    return (
        <div className='p-6 sm:p-8'>
            <Header name="Settings" />
            
            <div className='mt-8 max-w-2xl'>
                {/* Username Field */}
                <div className='mb-6 group'>
                    <div className='flex items-center gap-3 mb-2'>
                        <User className='w-5 h-5 text-gray-400 dark:text-white' />
                        <label className='text-sm font-medium text-gray-700 dark:text-white'>
                            Username
                        </label>
                    </div>
                    <div className='ml-8'>
                        <div className='p-3 bg-white dark:bg-dark-secondary rounded-lg border border-gray-200 
                            dark:border-stroke-dark group-hover:border-blue-500 dark:group-hover:border-blue-500 
                            transition-colors'>
                            <span className='text-gray-800 dark:text-white'>
                                {userSettings.username}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Email Field */}
                <div className='mb-6 group'>
                    <div className='flex items-center gap-3 mb-2'>
                        <Mail className='w-5 h-5 text-gray-400 dark:text-white' />
                        <label className='text-sm font-medium text-gray-700 dark:text-white'>
                            Email
                        </label>
                    </div>
                    <div className='ml-8'>
                        <div className='p-3 bg-white dark:bg-dark-secondary rounded-lg border border-gray-200 
                            dark:border-stroke-dark group-hover:border-blue-500 dark:group-hover:border-blue-500 
                            transition-colors'>
                            <span className='text-gray-800 dark:text-white'>
                                {userSettings.email}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Team Field */}
                <div className='mb-6 group'>
                    <div className='flex items-center gap-3 mb-2'>
                        <Users className='w-5 h-5 text-gray-400 dark:text-white' />
                        <label className='text-sm font-medium text-gray-700 dark:text-white'>
                            Team
                        </label>
                    </div>
                    <div className='ml-8'>
                        <div className='p-3 bg-white dark:bg-dark-secondary rounded-lg border border-gray-200 
                            dark:border-stroke-dark group-hover:border-blue-500 dark:group-hover:border-blue-500 
                            transition-colors'>
                            <span className='text-gray-800 dark:text-white'>
                                {userSettings.teamName}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Role Field */}
                <div className='mb-6 group'>
                    <div className='flex items-center gap-3 mb-2'>
                        <Briefcase className='w-5 h-5 text-gray-400 dark:text-white' />
                        <label className='text-sm font-medium text-gray-700 dark:text-white'>
                            Role
                        </label>
                    </div>
                    <div className='ml-8'>
                        <div className='p-3 bg-white dark:bg-dark-secondary rounded-lg border border-gray-200 
                            dark:border-stroke-dark group-hover:border-blue-500 dark:group-hover:border-blue-500 
                            transition-colors'>
                            <span className='text-gray-800 dark:text-white'>
                                {userSettings.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;