import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    console.log('Deleting data in order...');
    
    await prisma.comment.deleteMany({});
    await prisma.attachment.deleteMany({});
    await prisma.taskAssignment.deleteMany({});
    await prisma.task.deleteMany({});
    await prisma.projectTeam.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.team.deleteMany({});
    
    console.log('Successfully deleted all data');
  } catch (error) {
    console.error('Error during deletion:', error);
    throw error;
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  // Reorder files to respect foreign key constraints
  const orderedFileNames = [
    "team.json",         // 1st: Teams
    "user.json",         // 2nd: Users (needs teams)
    "project.json",      // 3rd: Projects
    "projectTeam.json",  // 4th: Project-Team associations
    "task.json",         // 5th: Tasks (needs users and projects)
    "taskAssignment.json", // 6th: Task assignments (needs tasks and users)
    "attachment.json",   // 7th: Attachments (needs tasks)
    "comment.json"       // 8th: Comments (needs tasks and users)
  ];

  await deleteAllData();

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    try {
      for (const data of jsonData) {
        try {
          await model.create({ data });
        } catch (createError: any) {
          if (createError.code === 'P2002') {
            console.log(`Skipping duplicate entry in ${modelName}`);
            continue;
          }
          if (createError.code === 'P2003') {
            console.error(`Foreign key constraint failed in ${modelName}:`, data);
            continue;
          }
          throw createError;
        }
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Seeding completed');
  });
