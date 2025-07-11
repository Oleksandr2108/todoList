import Image from "next/image";
import Logo from "@/assets/Images/Logo.svg";

const Header = () => {
  return (
    <header className="col-span-full">
      <Image
        src={Logo}
        alt="Logo"
        // width={100}
        // height={50}
      />
    </header>
  );
};

export default Header;
