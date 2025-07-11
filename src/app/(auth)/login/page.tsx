"use client";

import { useDispatch } from "react-redux";
import CustomInput from "@/components/CusstomInput";

import CustomButton from "@/components/CustomButton/CustomButton";
import { useLoginMutation } from "@/services/authApi";
import { setToken } from "@/features/authSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setToken(response.token));
      localStorage.setItem("token", response.token);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  const clickRegister = () => {
    router.push("./register");
  };

  return (
    <section className="col-span-full h-screen flex flex-col items-center justify-center">
      <h1 className="col-span-full text-[40px] font-bold text-main text-center mb-10">
        SIGN IN
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-span-full flex flex-col items-center justify-center w-full"
      >
        <CustomInput
          label={"Email"}
          type={"email"}
          placeholder={"Email"}
          {...register("email", { required: "Email is required" })}
        />
        <CustomInput
          label={"Password"}
          type={"password"}
          placeholder={"Password"}
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-[-8px] mb-3">
            {errors.password.message}
          </span>
        )}
        <CustomButton
          type="submit"
          disabled={isLoading}
          text="Sign in"
          classBtn="w-[300px] mt-7"
        />
      </form>

      <div className=" w-full flex items-center justify-center mt-10">
        <div className="h-[1px] bg-secondary flex-1"></div>
        <div className=" p-2 text-[11px] font-semibold">
          <span className="text-[12px] font-semibold text-secondary">
            Forgot password ?
          </span>
        </div>
        <div className="h-[1px] bg-secondary flex-1"></div>
      </div>
      <div className=" w-full flex items-center justify-center mt-1">
        <div className="h-[1px] bg-secondary flex-1"></div>
        <div className=" p-2 text-[11px] font-semibold">
          <span className="text-[12px] font-semibold text-secondary">
            {" "}
            {`Don't have an account?`}
          </span>
          <span className="text-[12px] font-semibold text-orangeTxt cursor-pointer" onClick={clickRegister}>
            {" "}
            Create an account
          </span>
        </div>
        <div className="h-[1px] bg-secondary flex-1"></div>
      </div>
    </section>
  );
};

export default LoginPage;
