import project from "@/models/project";
import task from "@/models/task";
import { connectToDatabase } from "@/utils/bd";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const { id } = req.query;

  if (req.method === "PUT") {
    const updateProject = await project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json(updateProject);
  }

  if (req.method === "DELETE") {
    const existingProject = await project.findById(id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    await task.deleteMany({ _id: { $in: existingProject.tasks } });
    await project.findByIdAndDelete(id);
    return res.status(200).json({ message: "Project deleted" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
