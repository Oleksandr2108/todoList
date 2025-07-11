"use client";

import { useDispatch } from "react-redux";
import CustomInput from "@/components/CusstomInput";

import CustomButton from "@/components/CustomButton/CustomButton";
import { useRegisterMutation } from "@/services/authApi";
import { setEmail } from "@/features/authSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await registerUser(data).unwrap();
      alert(res.message);
      dispatch(setEmail(data.email));

      router.push("/verify-email");
    } catch (err) {
      console.error("Register error:", err);
      alert("Register error: " + JSON.stringify(err));
    }
  };

  return (
    <section className="col-span-full h-screen flex flex-col items-center justify-center">
      <h1 className="col-span-full text-[40px] font-bold text-main text-center mb-10">
        SIGN UP
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-span-full flex flex-col items-center justify-center w-full"
      >
        <CustomInput
          label={"Name"}
          type={"text"}
          placeholder={"Your name ..."}
          {...register("name", { required: "Name is required" })}
        />
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

      <div className=" w-full flex items-center justify-center mt-1">
        <div className="h-[1px] bg-secondary flex-1"></div>
        <div className=" p-2 text-[11px] font-semibold">
          <span> Have an account? </span>
          <span> Sign in</span>
        </div>
        <div className="h-[1px] bg-secondary flex-1"></div>
      </div>
    </section>
  );
};

export default RegisterPage;
