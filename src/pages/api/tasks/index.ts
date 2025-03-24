/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";

import Task from "../../../models/task";
import { connectToDatabase } from "@/utils/bd";
import { authenticateUser } from "@/middleware/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const userId = (req as any).userId;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const tasks = await Task.find({ userId });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title } = req.body;
      const userId = (req as any).userId;

      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const task = await Task.create({ title, userId });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}

export default authenticateUser(handler);
