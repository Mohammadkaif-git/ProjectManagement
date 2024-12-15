import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query";
import { LargeNumberLike } from "crypto";


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
    title:string;
    description:string;
    status?:Status;
    priority?:Priority;
    tags?:string;
    startDate?:string;
    dueDate?:string;
    points?:number;
    projectId:number;
    authorId?:number;
    assignedUserId?:number;

    author?:User;
    assignee?:User;
    comments?:Comment[];
    attachement?:Attachement[];
}
export const api=createApi({
    baseQuery:fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath:"api",
    tagTypes:[],
    endpoints:(build)=>({getProjects:build.query<Project[],void>({
        query:()=>"projects",
        providesTags:["Projects"],
    }),
}),
       
});

export const {}=api;