import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/bd";
import User from "@/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    const users = await User.find({}, "-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error get users:", error);
    return res.status(500).json({ message: "Error server" });
  }
}
