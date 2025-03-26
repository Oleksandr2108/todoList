import User from "@/models/user";
import { connectToDatabase } from "@/utils/bd";
import { sendEmail } from "@/utils/sendEmail";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = resetCode;
  await user.save();

  await sendEmail(email, "Password Reset Code", `Your password reset code is: ${resetCode}`);

  res.json({ message: "Reset code sent to your email." });
}
