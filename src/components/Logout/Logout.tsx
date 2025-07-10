"use client";
import { useDispatch } from "react-redux";
import { logout } from "@/features/authSlice";
import { useRouter } from "next/navigation";
import CustomButton from "../CustomButton/CustomButton";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout()); // Redux state
    localStorage.removeItem("token"); // на всякий випадок
    router.push("/login"); // редирект на логін
  };

  return (
    // <button onClick={handleLogout} className="text-red-500">
    //   Вийти з акаунта
    // </button>
    <CustomButton
      type="button"
      onClick={handleLogout}
      text={"Logout"}
      disabled={false}
      classBtn={""}
    />
  );
};

export default LogoutButton;
