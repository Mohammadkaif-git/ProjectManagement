import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await prisma.project.findMany({
            include: {
                tasks: true, // Include related tasks
                projectTeams: true // Include team information
            }
        });
        
         //console.log('Retrieved projects:', projects); // Debug log
        
        if (!projects.length) {
            console.log('No projects found in database');
        }
        
        res.status(200).json(projects);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            error: "Error fetching projects",
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, startDate, endDate } = req.body;
        const newProject = await prisma.project.create({ data: {name, description, startDate, endDate} });
        res.status(201).json(newProject);
    } catch (error:any) {
        console.error('Error details:', error);
        res.status(500).json({ message: "Error creating project :${error.message}" });
    }
}
 