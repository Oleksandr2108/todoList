import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs"; // Бібліотека для хешування паролів
import { connectToDatabase } from "@/utils/bd";
import User from "@/models/user";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await connectToDatabase(); // Підключаємось до бази

  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10); 
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
}
