import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCollection, BiFoodMenu, BiTable, BiUser, BiLogOut } from "react-icons/bi";
import { IoFastFoodSharp } from "react-icons/io5";

function NavbarAdmin() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Jika pengguna belum login, arahkan ke halaman login
    if (!localStorage.getItem("logged")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Hapus data dari localStorage
    localStorage.removeItem("logged");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
    // Navigasi ke halaman login
    navigate("/");
  };

  return (
    <aside className="bg-[#3F2E3E] h-full w-auto fixed flex flex-col border-spacing-3 rounded-lg">
      <div className="font-bold text-xl text-[#F2E3DB] py-7 px-6 flex items-center">
        <IoFastFoodSharp className="text-2xl" />
        <span className="pl-3">Foodie Cafe </span>
      </div>
    
      <div className="flex-grow flex flex-col text-[#F2E3DB] capitalize">
        <a
          href="DashboardAdmin"
          className="px-6 py-4 font-medium text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C] hover:rounded-lg"
        >
          <BiCollection className="text-xl inline-block" />
          <span className="pl-2">Dashboard</span>
        </a>
        <a
          href="menu"
          className="px-6 py-4 font-medium text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C] hover:rounded-lg"
        >
          <BiFoodMenu className="text-xl inline-block" />
          <span className="pl-2">Menu</span>
        </a>
        <a
          href="Meja"
          className="px-6 py-4 font-medium text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C]"
        >
          <BiTable className="text-xl inline-block" />
          <span className="pl-2">Meja</span>
        </a>
        <a
          href="User"
          className="px-6 py-4 font-medium text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C]"
        >
          <BiUser className="text-xl inline-block" />
          <span className="pl-2">Pengguna</span>
        </a>
      </div>
      <button
        className="px-6 py-4 font-bold text-[#EFE1D1] text-xl w-full text-left hover:bg-[#A78295] hover:text-[#331D2C] focus:ring no-underline"
        onClick={handleLogout}
      >
        <BiLogOut className="text-xl inline-block" />
        <span className="pl-2">Logout</span>
      </button>
    </aside>
  );
}

export default NavbarAdmin;
