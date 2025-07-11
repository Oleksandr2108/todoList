"use client";

import LogoutButton from "@/components/Logout/Logout";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

// import { useState } from "react";
// import { useLoginMutation } from "../services/authApi";
// import { useDispatch } from "react-redux";
// import { setToken } from "../features/authSlice";
// import CustomInput from "@/components/CusstomInput";
// import "./globals.css";
// import CustomButton from "@/components/CustomButton/CustomButton";

const HomePage = () => {
  useAuthRedirect();
  // const dispatch = useDispatch();
  // const [login, { isLoading }] = useLoginMutation();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await login({ email, password }).unwrap();
  //     dispatch(setToken(response.token));
  //     console.log("TOKEN:", response);
  //     alert("Успішний вхід!");
  //   } catch (err) {
  //     console.error("Login error:", err);
  //   }
  // };

  return (
    <>
      <h1 className="text-[40px] font-bold text-main text-center">Home Page</h1>
      <LogoutButton />
      {/* <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full">
        <CustomInput
          label={"Email"}
          type={"email"}
          placeholder={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          label={"Password"}
          type={"password"}
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomButton
          type="submit"
          disabled={isLoading}
          text="Sign in"
          classBtn="w-[300px] mt-7"
        />
      </form> */}
    </>
  );
};

export default HomePage;
