import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs"; 
import { connectToDatabase } from "@/utils/bd";
import User from "@/models/user";
import { sendEmail } from "@/utils/sendEmail";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await connectToDatabase(); 

  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10); 
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const newUser = new User({ name, email, password: hashedPassword, verificationCode  });
  await newUser.save();

  await sendEmail(email, "Verify your email", `Your verification code is: ${verificationCode}`);

  res.status(201).json({ message: "User registered. Check your email for the verification code." });
}
