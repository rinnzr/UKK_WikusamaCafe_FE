import React, { useState, useEffect } from "react";
import bg from "../Image/kasir.jpg";
import { useNavigate } from "react-router-dom";

function DashboardKasir() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah user sudah login atau belum 
    if (!localStorage.getItem("logged")) {
      navigate("/");
    } else {
      // setUser(`Selamat datang sebagai ${localStorage.getItem("user")} ${localStorage.getItem("namauser")}`);
      let role = localStorage.getItem("user");
      let namauser = localStorage.getItem("namauser");
      setUser(`Selamat datang ${namauser}`);
    }
  }, [navigate]);

  return (
<>
  <section className="sm:p-7 h-screen flex items-center">
  <div className="text-[#3F2E3E] w-full mx-10 ml-60 ">
    <div className="container flex flex-col mx-auto lg:flex-row">
      {/* <div  style={{backgroundImage:`url(${bg})`}}></div> */}
      <div className="w-1/3 aspect-video bg-cover ">
  <img src={bg} alt="" className="object-cover h-full w-full" />

      </div>
      <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
        <h2 className="text-3xl font-semibold leadi">{user}</h2>
        <p className="mt-4 mb-8 text-base">Selamat Datang di Foodie Cafe bermacam makanan dan minuman dimulai dari Nusantara sampai ke Western</p>
        <a href="Tambahtransaksi" className="self-start px-10 py-3 text-lg font-medium rounded-3xl bg-[#331D2C] text-[#EFE1D1]" fdprocessedid="ja8p8">Ayok Pesan!!
        
        </a>
      </div>
    </div>
    </div>

  </section>
</>
  );
}

export default DashboardKasir;
