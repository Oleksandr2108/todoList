"use client";

// import { useForm } from "react-hook-form";
import { useVerifyEmailMutation } from "@/services/authApi";
// Хук для доступу до state
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import { useAppSelector } from "@/store/hooks";

// type CodeFormValues = {
//   code: string;
// };

const VerifyEmailPage = () => {
  const email = useAppSelector((state) => state.auth.email);
  const router = useRouter();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // лише цифри

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // перехід до наступного поля
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = async () => {
    const code = digits.join("");

    if (code.length !== 6 || !email) {
      alert("Заповніть всі поля");
      return;
    }

    try {
      const res = await verifyEmail({ email, code }).unwrap();
      alert(res.message);
      router.push("/login");
    } catch (err) {
      console.error("Verify error:", err);
      alert("Помилка верифікації");
    }
  };

  return (
    <section className="col-span-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Verify Your Email</h1>
      <p className="text-sm mb-4">Enter the 6-digit code sent to your email</p>

      <div className="flex gap-2 mb-6">
        {digits.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => {
              inputsRef.current[index] = el!;
            }}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:border-main outline-none"
          />
        ))}
      </div>

      <CustomButton
        text="Verify Email"
        disabled={isLoading}
        type="button"
        onClick={onSubmit}
        classBtn="w-[200px]"
      />
    </section>
  );
};

export default VerifyEmailPage;
