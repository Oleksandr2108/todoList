"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomInput from "@/components/CusstomInput";

import CustomButton from "@/components/CustomButton/CustomButton";
import { useLoginMutation } from "@/services/authApi";
import { setToken } from "@/features/authSlice";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setToken(response.token));
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <h1 className="text-[40px] font-bold text-main text-center">SIGN IN</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full"
      >
        <CustomInput
          label={"Email"}
          type={"email"}
          placeholder={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <CustomInput
          label={"Password"}
          type={"password"}
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <CustomButton
          type="submit"
          disabled={isLoading}
          text="Sign in"
          classBtn="w-[300px] mt-7"
        />
      </form>
    </>
  );
};

export default LoginPage;
