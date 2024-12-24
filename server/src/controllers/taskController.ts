import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = req.query.taskId;
        
        if (!taskId) {
            // If no taskId is provided, fetch all tasks
            const allTasks = await prisma.task.findMany({
                include: {
                    author: true,
                    assignee: true,
                    comments: true,
                    attachments: true
                }
            });
            res.status(200).json(allTasks);
            return;
        }

        // Fetch specific task by ID
        const task = await prisma.task.findUnique({
            where: { 
                id: Number(taskId)
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true
            }
        });
        
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        console.log(`Found task with ID: ${taskId}`);
        res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({
            error: "Error fetching task",
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            title,
            description,
            status,
            priority,
            dueDate,
            projectId,
            authorId,
            assigneeId,
        } = req.body;
        const newTask = await prisma.task.create({ 
            data: {
                title, 
                description, 
                status, 
                priority, 
                dueDate, 
                projectId: Number(projectId),
                authorUserId: authorId,     // Changed from authorId
                assignedUserId: assigneeId  // Changed from assigneeId
            } 
        });
        res.status(201).json(newTask);
    } catch (error:any) {
        console.error('Error details:', error);
        res.status(500).json({ message: `Error creating Task: ${error.message}` });
    }
}
 
export const updatedTask = async (req: Request, res: Response): Promise<void> => {
    const { TaskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: { 
                id: Number(TaskId)
            },
            data: {
                status
            }
        });
        
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({
            error: "Error updating task",
        });
    }
};

