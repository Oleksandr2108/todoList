import { NextApiRequest, NextApiResponse } from "next";

import Task from "../../../models/task";
import { connectToDatabase } from "@/utils/bd";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === "PUT") {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedTask);
  }

  
  if (req.method === "DELETE") {
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task deleted" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
