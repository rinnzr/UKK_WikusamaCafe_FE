import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {BiCollection, BiLogOut, BiUser} from "react-icons/bi";
import {MdOutlineNoFood } from "react-icons/md";
import {TbReport, TbReportMoney} from "react-icons/tb";
import { Link } from "react-router-dom";

function NavbarManajer() {
  const navigate = useNavigate();
  const userRole = "admin,manajer,kasir"
  const active = window.location.pathname

  useEffect(() => {
    //jika pengguna belum login, arahkan ke halaman login
    if (!localStorage.getItem("logged")) {
      navigate("/");
    }
  }, [navigate]);
  const handleLogout = () => {  
    //hapus data dari localStorage
   
    localStorage.clear();
    //navigasi ke halaman login
    navigate("/");
  }; 

  return (
    <>
    <aside className="bg-yellow-950 h-full w-auto fixed flex flex-col border-spacing-3 border-r border-neutral-700">
    <div className="font-bold border-b mb-10 text-xl text-neutral-50 py-7 px-6 flex items-center">
        <MdOutlineNoFood className="text-2xl" />
        <span className="pl-3">Foodie Cafe </span>
      </div>
      <div className="flex-grow flex flex-col text-gray-50 capitalize">
        <Link
          to="DashboardManajer"
          className={` ${active==='/DashboardManajer'&&'bg-orange-200 text-neutral-700'} px-6 py-5 text-sm`}
        >
          <BiCollection className="text-xl inline-block" />
          <span className="pl-2">Dashboard</span>
        </Link>
        <Link
          to="TransaksiManajer"
          className={` ${active==='/TransaksiManajer'&&'bg-orange-200 text-neutral-700'} px-6 py-5 text-sm`}
        >
          <TbReportMoney className="text-xl inline-block" />
          <span className="pl-2">Transaksi</span>
        </Link>
        <Link
          to="Laporan"
          className={` ${active==='/Laporan'&&'bg-orange-200 text-neutral-700'} px-6 py-5 text-sm`}
        >
          <TbReport className="text-xl inline-block" />
          <span className="pl-2">Laporan</span>
        </Link>
        <Link
          to="LaporanKasir"
          className={` ${active==='/LaporanKasir'&&'bg-orange-200 text-neutral-700'} px-6 py-5 text-sm`}
        >
          <TbReport className="text-xl inline-block" />
          <span className="pl-2">Laporan Kasir</span>
        </Link>
      </div>
      <div className="px-2 " >

<p className="bg-white mb-8 rounded text-lg font-semibold flex gap-4 justify-center items-center w-full h-16"> <span>            <BiUser className="text-xl inline-block" />
</span>Manajer</p>

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
  )
}
export default NavbarManajer;

