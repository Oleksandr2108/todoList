/* eslint-disable @typescript-eslint/no-explicit-any */
import { authenticateUser } from "@/middleware/auth";
import project from "@/models/project";

import { connectToDatabase } from "@/utils/bd";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const userId = (req as any).userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "GET") {
    try {
      const projects = await project.find({ userId }).populate("tasks");
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error get project:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title } = req.body;
      const newProject = await project.create({ title, userId, tasks: [] });
      return res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default authenticateUser(handler);
