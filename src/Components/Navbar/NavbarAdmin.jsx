import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCollection, BiFoodMenu, BiTable, BiUser, BiLogOut } from "react-icons/bi";
import { IoFastFoodSharp } from "react-icons/io5";
import {MdOutlineNoFood } from "react-icons/md";
import { Link } from "react-router-dom";

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
  const active = window.location.pathname

  return (
    <aside className="bg-yellow-950 h-full w-auto fixed flex flex-col border-spacing-3 border-r border-neutral-700">
      <div className="font-bold border-b mb-10 text-xl text-neutral-50 py-7 px-6 flex items-center">
        <MdOutlineNoFood className="text-2xl" />
        <span className="pl-3">Foodie Cafe </span>
      </div>
    
      <div className="flex-grow flex flex-col text-gray-50 capitalize">
        <Link
          to="DashboardAdmin"
          className={` ${active==='/DashboardAdmin'&&'bg-orange-200 text-neutral-700'} px-6 py-5 text-sm`}
        >
          <BiCollection className="text-lg inline-block" />
          <span className="pl-2">Dashboard</span>
        </Link>
        <Link
          to="menu"
          className={` ${active==='/menu'&&'bg-orange-200 text-neutral-700'} px-6 py-5 text-sm`}
        >
          <BiFoodMenu className="text-xl inline-block" />
          <span className="pl-2">Menu</span>
        </Link>
        <Link
          to="Meja"
          className={` ${active==='/Meja'&&'bg-orange-200 text-neutral-700'} px-6 py-5 text-sm`}
        >
          <BiTable className="text-xl inline-block" />
          <span className="pl-2">Meja</span>
        </Link>
        <Link
          to="User"
          className={` ${active==='/User'&&'bg-orange-200 text-neutral-700'} px-6 py-5 text-sm`}
        >
          <BiUser className="text-xl inline-block" />
          <span className="pl-2">Pengguna</span>
        </Link>
      </div>
      <button
        className="px-8 py-5 text-neutral-50 mb-3 text-sm hover:bg-orange-200 hover:text-neutral-700"
        onClick={handleLogout}
      >
        <BiLogOut className="text-xl font-bold inline-block" />
        <span className="pl-2 font-bold">LOGOUT</span>
      </button>
    </aside>
  );
}

export default NavbarAdmin;
