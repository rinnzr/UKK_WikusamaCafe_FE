import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {BiCollection, BiLogOut} from "react-icons/bi";
import {IoFastFoodSharp} from "react-icons/io5"
import {TbReport, TbReportMoney} from "react-icons/tb";

function NavbarManajer() {
  const navigate = useNavigate();
  const userRole = "admin,manajer,kasir"

  useEffect(() => {
    //jika pengguna belum login, arahkan ke halaman login
    if (!localStorage.getItem("logged")) {
      navigate("/");
    }
  }, [navigate]);
  const handleLogout = () => {  
    //hapus data dari localStorage
    localStorage.removeItem("logged");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
    //navigasi ke halaman login
    navigate("/");
  };

  return (
    <>
    <aside className="bg-[#3F2E3E] h-full w-auto fixed flex flex-col border-spacing-3 rounded-lg">
      <div className="font-bold text-xl text-[#F2E3DB] py-7 px-6 flex items-center">
        <IoFastFoodSharp className="text-2xl" />
        <span className="pl-3">Foodie Cafe </span>
      </div>
      <div className="flex-grow flex flex-col text-[#F2E3DB] capitalize">
        <a
          href="DashboardManajer"
          className="px-6 py-4 font-medium text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C] hover:rounded-lg"
        >
          <BiCollection className="text-xl inline-block" />
          <span className="pl-2">Dashboard</span>
        </a>
        <a
          href="TransaksiManajer"
          className="px-6 py-4 font-medium text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C] hover:rounded-lg"
        >
          <TbReportMoney className="text-xl inline-block" />
          <span className="pl-2">Transaksi</span>
        </a>
        <a
          href="Laporan"
          className="px-6 py-4 font-medium text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C] hover:rounded-lg"
        >
          <TbReport className="text-xl inline-block" />
          <span className="pl-2">Laporan</span>
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
        
    </>
  )
}
export default NavbarManajer;

