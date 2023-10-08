import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./Navbar/NavbarAdmin";
import NavbarKasir from "./Navbar/NavbarKasir";
import NavbarManajer from "./Navbar/NavbarManajer";

export default function Layout({ children }) {
  const userRole = JSON.parse(localStorage.getItem("user"));
  const array = ["ADMIN", "KASIR", "MANAJER"];
  const pages = [<NavbarAdmin />, <NavbarKasir />, <NavbarManajer />];

  // Check if userRole is not null before calling toUpperCase()
  const roleUpperCase = userRole?.toUpperCase() || "";
  const navigate = useNavigate(); //fungsi usenavigate yang di definisikan menjadi variabel navigate
  React.useEffect(() => {
    if (!localStorage.getItem("logged")) {
      navigate("/");
    }
  }, []);
  
  return (
    <>
      <section className="flex w-full h-full max-h-screen">
        <aside className="min-w-fit fixed">
          {pages[array.indexOf(roleUpperCase)]}
        </aside>
        <main className="w-full pl-56">{children}</main>
      </section>
    </>
  );
}