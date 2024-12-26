"use client";

import React from 'react'
import { useGetTasksQuery, Task } from '@/state/api';
import Header from '@/app/(components)/Header';
import TaskCard from '@/app/(components)/TaskCard';

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
    const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: Number(id) });
    
    // console.log('Project ID:', id); // Debug log
    // console.log('Tasks:', tasks); // Debug log
    // console.log('Error:', error); // Debug log
    // console.log('Loading:', isLoading); // Debug log

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.error('Error details:', error);
        return <div>Error: {JSON.stringify(error)}</div>;
    }
    if (!tasks) return <div>No tasks found</div>;

    return (
        <div className='px-4 pb-8 xl:px-6'>
            <div className='pt-5 mb-6'>
                <Header name='List View'/>
            </div>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {tasks.map((task: Task) => (
                    <TaskCard 
                        key={task.id} 
                        task={task}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListView;