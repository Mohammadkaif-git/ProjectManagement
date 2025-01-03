import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LargeNumberLike } from "crypto";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export interface Project{
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
}

export enum Status{
    ToDO="To Do",
    WorkInProgress="Work In Progress",
    UnderReview="Under Review",
    Completed="Completed"
}

export enum Priority{
    Urgent="Urgent",
    High="High",
    Medium="Medium",
    Low="Low",
    Backlog="Backlog"
}

export interface User{
    usedId?:number;
    username?:string;
    email?:string;
    profilePictureUrl?:string;
    cognitoId?:string;
    teamId?:number;
}

export interface Attachement{
    id:number;
    fileUrl:string;
    fileName:string;
    taskId:number;
    uploadedById:number;

}

export interface Task{
    id: number;
    title: string;
    description: string;
    status: Status;
    priority: string;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    points?: number;
    attachments?: Array<{
        fileURL: string;
        fileName: string;
    }>;
    comments?: Array<any>;
    author?: {
        userId: number;
        username: string;
        profilePictureUrl: string;
    };
    assignee?: {
        userId: number;
        username: string;
        profilePictureUrl: string;
    };
}
export const api=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
    }),
    reducerPath:"api",
    tagTypes:["Projects","Tasks"],
    endpoints:(build)=>({getProjects:build.query<Project[],void>({
        query:()=>"projects",
        providesTags:["Projects"],
    }),
    createProject:build.mutation<Project,Partial<Project>>({
        query:(project)=>({
            url:"projects",
            method:"POST",
            body:project,
        }),
        invalidatesTags:["Projects"],
    }),
    updateTaskStatus:build.mutation<Task,{taskId:number,status:Status}>({
        query:({taskId,status})=>({
            url:`tasks/${taskId}/status`,
            method:"PATCH",
            body:{status},
        }),
        invalidatesTags:(result,error,{taskId})=>[{type:"Tasks",id:taskId}],
    }),
    getTaskById: build.query<Task, number>({
        query: (taskId) => `/tasks/${taskId}`,
        providesTags: (result, error, taskId) => [{ type: 'Tasks', id: taskId }],
    }),
    getTasks: build.query<Task[], { projectId?: number }>({
        query: ({ projectId }) => {
            const url = projectId ? `/tasks?projectId=${projectId}` : '/tasks';
            console.log('Making request to:', url); // Debug log
            return url;
        },
        transformResponse: (response: Task[]) => {
            console.log('Received response:', response); // Debug log
            return response;
        },
        providesTags: (result) =>
            result
                ? [
                    ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
                    { type: 'Tasks', id: 'LIST' },
                ]
                : [{ type: 'Tasks', id: 'LIST' }],
    }),
    createTask:build.mutation<Project,Partial<Task>>({
        query:(task)=>({
            url:"task",
            method:"POST",
            body:task,
        }),
        invalidatesTags:["Tasks"],
    }),
}),
       
});

export const {useGetProjectsQuery,useCreateProjectMutation,useUpdateTaskStatusMutation,useGetTasksQuery,useGetTaskByIdQuery,useCreateTaskMutation}=api;