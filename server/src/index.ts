import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import { Request, Response } from 'express';
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Home route");
});

app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1+1 as result`;
    res.json({ status: 'Database connected', test: result });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});