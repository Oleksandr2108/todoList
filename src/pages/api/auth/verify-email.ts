import User from "@/models/user";
import { connectToDatabase } from "@/utils/bd";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.isVerified) return res.status(400).json({ message: "User already verified" });
  if (user.verificationCode !== code) return res.status(400).json({ message: "Invalid code" });

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  res.json({ message: "Email verified successfully!" });
}
