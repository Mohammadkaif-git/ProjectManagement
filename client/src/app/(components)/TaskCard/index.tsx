"use client";

import React from 'react';
import { Task } from '@/state/api';
import { format } from 'date-fns';
import Image from 'next/image';
import { MessageSquareMore } from 'lucide-react';

type TaskCardProps = {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    const taskTagsSplit = task.tags ? task.tags.split(',') : [];

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-dark-secondary">
            {task.attachments && task.attachments.length > 0 && (
                <div className="mb-3">
                    <Image
                        src={`/${task.attachments[0].fileURL}`}
                        alt={task.attachments[0].fileName}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
                {task.priority && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${task.priority === "Urgent" ? "bg-red-100 text-red-800" : 
                        task.priority === "High" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-blue-100 text-blue-800"}`
                    }>
                        {task.priority}
                    </span>
                )}
                {taskTagsSplit.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {tag.trim()}
                    </span>
                ))}
            </div>

            <h3 className="font-medium mb-2">{task.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>

            <div className="text-xs text-gray-500 mb-3">
                {task.startDate && format(new Date(task.startDate), "MMM dd, yyyy")}
                {task.startDate && task.dueDate && " - "}
                {task.dueDate && format(new Date(task.dueDate), "MMM dd, yyyy")}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                    {task.assignee && (
                        <Image
                            src={`/${task.assignee.profilePictureUrl}`}
                            alt={task.assignee.username}
                            width={24}
                            height={24}
                            className="rounded-full border-2 border-white"
                        />
                    )}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                    <MessageSquareMore size={16} />
                    <span className="text-sm">{task.comments?.length || 0}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;