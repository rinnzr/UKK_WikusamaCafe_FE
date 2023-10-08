import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate(); //fungsi usenavigate yang di definisikan menjadi variabel navigate
  React.useEffect(() => {
    if (!localStorage.getItem("logged")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <section className="flex w-full fixed duration-200 h-full max-h-screen">
        <aside className=" w-fit">
          <Sidebar />
        </aside>
        <main className="w-full px-4">{children}</main>
      </section>
    </>
  );
}
