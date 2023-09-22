import React from "react";
import NavbarAdmin from "./Navbar/NavbarAdmin";
import NavbarKasir from "./Navbar/NavbarKasir";
import NavbarManajer from "./Navbar/NavbarManajer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();//fungsi usenavigate yang di definisikan menjadi variabel navigate
  const userRole = localStorage.getItem("user"); //mengambil user role
  const array = ["ADMIN", "KASIR", "MANAJER"];
  const pages = [<NavbarAdmin />, <NavbarKasir />, <NavbarManajer />];

  const roleUpperCase = userRole?.toUpperCase() || "";

  React.useEffect(() => {//melakukan fungsi otomatis
    if (!localStorage.getItem("logged")) {
      //untuk mengambil data logged
      navigate("/"); //untuk redirect pada halama '/' atau 'login' ketika belum login
    }
  }, []);

  const { pathname } = useLocation();
  const isSidebarVisible = !["/"].includes(pathname); //memnbuat navbar visible ketika pathname /

  return (
    <>
      <section className="flex w-full h-full max-h-screen">
        <aside className="min-w-fit max-w-xs">
          {isSidebarVisible &&
           pages[array.indexOf(roleUpperCase)]}
        </aside>
        <main className="w-full pl-56 ">{children}</main>
      </section>
    </>
  );
}
