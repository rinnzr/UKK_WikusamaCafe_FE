import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {BiCollection,BiFoodMenu, BiLogOut} from "react-icons/bi";
import { TbReportMoney} from "react-icons/tb";
import {IoFastFoodSharp} from "react-icons/io5"

function NavbarKasir() {

  const navigate = useNavigate();
  const userRole = "admin,manajer,kasir";

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
    <aside className="bg-[#3F2E3E] px-2 h-full w-auto fixed flex flex-col border-spacing-3 rounded-lg">
      <div className="font-bold text-xl text-[#F2E3DB] py-7 px-6 flex items-center">
        <IoFastFoodSharp className="text-2xl" />
        <span className="pl-3">Foodie Cafe </span>
      </div>
      <div className="flex-grow flex flex-col text-[#F2E3DB] capitalize">
        <a
          href="DashboardKasir"
          className="px-6 py-4 font-medium text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C] hover:rounded-lg"
        >
          <BiCollection className="text-xl inline-block" />
          <span className="pl-2">Dashboard</span>
        </a>
        <a
          href="transaksi"
          className="px-6 py-4 font-medium text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C] hover:rounded-lg"
        >
          <TbReportMoney className="text-xl inline-block" />
          <span className="pl-2">Transaksi</span>
        </a>
        <a
          href="Tambahtransaksi"
          className="px-6 py-4 font-medium text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C] hover:rounded-lg"
        >
          <BiFoodMenu className="text-xl inline-block" />
          <span className="pl-2">Menu</span>
        </a>
      </div>
        <button
        className="px-6 py-4 font-medium text-[#F2E3DB] mb-10  text-base transition-colors duration-300 transform hover:bg-[#e0b0c9] hover:text-[#331D2C] hover:rounded-lg"
        onClick={handleLogout}
      >
        <BiLogOut className="text-xl inline-block" />
        <span className="pl-2">Logout</span>
      </button>
    </aside>
      
    </>
  );
}
export default NavbarKasir;

{/* <aside className="flex flex-col w-52 h-screen px-4 py-8 overflow-y-auto border-r rounded-lg  rtl:border-l bg-[#263A29] border-[#ffff]">
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <a
              className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749] "
              href="DashboardAdmin"
            >
              <div classNameName="text-xl">
                <BiCollection />
              </div>
              <span className="mx-4 font-medium">Dashboard</span>
            </a>

            <a
              className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749] "
              href="menu"
            >
              <div classNameName="text-xl">
                <BiFoodMenu />
              </div>
              <span className="mx-4 font-medium">Menu</span>
            </a>

            <a
              className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749] "
              href="meja"
            >
              <div classNameName="text-xl">
                <BiTable />
              </div>
              <span className="mx-4 font-medium">Meja</span>
            </a>

            <a
              className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749]" href="user">
              <div classNameName="text-xl">
                <BiUser />
              </div>
              <span className="mx-4 font-medium">Pengguna</span>
            </a>

            <hr className="my-6 border-gray-00 " />

            <a
              className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749] "
              href="Login"
              onClick={handleLogout}
            >
              <div classNameName="text-xl">
                <BiLogOut />
              </div>
              <span className="mx-4 font-medium">Logout</span>
            </a>
          </nav>

          <a
            className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749] "
            href="DashboardAdmin"
            onClick={handleLogout}
          >
            <div classNameName="text-3xl">
              <BiLogOut />
            </div>
            <span   className="mx-2 font-medium text-[#F2E3DB ] ">Logout</span>
          </a>
        </div>
      </aside> */}
