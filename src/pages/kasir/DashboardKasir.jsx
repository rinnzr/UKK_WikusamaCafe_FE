import React from "react";
import { Link } from "react-router-dom";

function DashboardKasir() {
  return (
    <>
      <section className="p-10 gap-10 h-screen items-center flex flex-col justify-center">
        <img src="/logo1.png" alt="" className="object-contain h-fit w-96" />
        <h2 className="text-3xl font-semibold text-teal-400">
          Welcome &nbsp;
          {localStorage.getItem("namauser")}
        </h2>
        <i className="mt-4 mb-8 text-base text-center text-neutral-400 w-[60rem]">
          Cafes are popular places to drink coffee, tea and other drinks. They
          offer a comfortable atmosphere and are often used as venues social for
          meetings, studying, or work. Cafes are following suit health trends,
          supports the local economy, and is often at the center of cultural
          activities
        </i>
        <Link
          to="/add-transaction"
          className="hover:bg-teal-400 hover:text-white px-8 py-4 rounded-lg duration-200 hover:font-medium"
        >
          LET'S ORDER!
        </Link>
      </section>
    </>
  );
}

export default DashboardKasir;
