/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";

import { authMiddleware } from "@/middleware/authMiddleware";
import { connectToDatabase } from "@/utils/bd";
import User from "@/models/user";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const user = await User.findById((req as any).user.userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
}

export default authMiddleware(handler);
