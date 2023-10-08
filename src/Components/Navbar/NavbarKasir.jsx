import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiCollection, BiFoodMenu, BiLogOut, BiUser } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { MdOutlineNoFood } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

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
  const active = window.location.pathname;
  console.log(active);
  return (
    <>
      <aside className="bg-yellow-950 h-full w-auto fixed flex flex-col border-spacing-3 border-r border-neutral-700">
        <div className="font-bold border-b mb-10 text-xl text-neutral-50 py-7 px-6 flex items-center">
          <MdOutlineNoFood className="text-2xl" />
          <span className="pl-3">Foodie Cafe </span>
        </div>
        <div className="flex-grow flex flex-col text-neutral-50 capitalize">
          <Link
            to="DashboardKasir"
            className={` ${
              active === "/DashboardKasir" && "bg-orange-200 text-neutral-700"
            } px-6 py-5 text-sm`}
          >
            <BiCollection className="text-xl inline-block" />
            <span className="pl-2">Dashboard</span>
          </Link>
          <Link
            to="transaksi"
            className={` ${
              active === "/transaksi" && "bg-orange-200 text-neutral-700"
            } px-6 py-5 text-sm`}
          >
            <TbReportMoney className="text-xl inline-block" />
            <span className="pl-2">Transaksi</span>
          </Link>
          <Link
            to="Tambahtransaksi"
            className={` ${
              active === "/Tambahtransaksi" && "bg-orange-200 text-neutral-700"
            } px-6 py-5 text-sm`}
          >
            <BiFoodMenu className="text-xl inline-block" />
            <span className="pl-2">Menu</span>
          </Link>
        </div>
        <div className="px-2 ">
          <p className="bg-white mb-5 rounded text-lg font-semibold flex gap-4 justify-center items-center w-full h-12">
            {" "}
            <span>
              {" "}
              <BiUser className="text-xl inline-block" />
            </span>
            Kasir
          </p>

          <button
            className="w-full py-5 px-8 hover:gap-6  duration-200 gap-4 flex text-neutral-50 mb-3 text-sm hover:bg-orange-200  hover:text-neutral-700"
            onClick={handleLogout}
          >
            <span className="w-fit font-bold">LOGOUT</span>
            <BiLogOut className="text-xl font-bold inline-block rotate-180" />
          </button>
        </div>
      </aside>
    </>
  );
}
export default NavbarKasir;
