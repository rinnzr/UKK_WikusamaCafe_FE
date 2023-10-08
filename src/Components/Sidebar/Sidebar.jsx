import * as React from "react";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiUser, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { menuData } from "./data";

function Sidebar() {
  const navigate = useNavigate();
  const getButtonClasses = (pathname) => {
    const commonClasses = `px-2 py-4 text-neutral-700 font-medium ease-out transition-colors hover:bg-opacity-50 hover:bg-teal-200 hover:pl-4 pl-2 hover:text-teal-500 duration-100 text-sm flex items-center ${
      !open && "justify-center text-lg"
    }`;
    const selectedClasses = `border-l-4 text-teal-500 bg-teal-50 border-teal-500   `;
    return pathname === window.location.pathname
      ? `${commonClasses} ${selectedClasses}`
      : commonClasses;
  };
  const role = localStorage.getItem("user");
  const name = localStorage.getItem("namauser");
  if (!menuData[role]) {
    console.error(`Role "${role}" tidak valid!`);
  }
  const Menus = menuData[role] || [];
  return (
    <aside
      className={` ${
        open ? "w-48" : "w-20 "
      } h-screen  px-2 bg-[#F9F8F8] text-sm  flex flex-col border-spacing-3 rounded-r-lg text-neutral-800`}
    >
      <button
        className={`p-2 right-0 mt-2 rounded-lg justify-end duration-200  bg-neutral-200 w-fit ml-auto`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-center ">
          <MdNavigateNext
            className={`text-xl rotate-180   duration-300 ${
              !open && "rotate-0"
            }`}
          />
        </div>
      </button>
      <img
        src={open ? "/logo1.png" : "/logo2.png"}
        alt=""
        className={`mx-auto py-4 ${open ? "w-20" : "w-8"}`}
      />
      <div className={`border-b border-teal-500  mb-4`}></div>
      <div
        className={`${
          !open && "text-center"
        } flex-grow flex flex-col capitalize1`}
      >
        {Menus.map((nav) => (
          <Link
            key={nav.id}
            to={nav.link}
            className={getButtonClasses(`${nav.link}`)}
          >
            {nav.icons}
            <span className="pl-2">{open && nav.nama} </span>
          </Link>
        ))}
      </div>
      <div className={`border-b border-teal-500  `}></div>
      <div
        className={`flex justify-between mt-2 items-center hover:bg-neutral-100 p-2 rounded-md mb-10 ${
          !open && "flex-col gap-2"
        }`}
      >
        <div
          className={`w-full flex justify-start gap-2 items-center ${
            !open && "justify-center"
          } `}
        >
          <BiUser className={`text-2xl w-8 h-8 bg-neutral-200 rounded p-2`} />
          {open && (
            <div>
              <p className="font-semibold text-sm -mb-2">{name}</p>
              <i className="font-normal text-xs text-neutral-400">{role}</i>
            </div>
          )}
        </div>
        <button
          className="px-3 py-4 font-medium flex justify-center gap-2 hover:gap-4 rounded hover:bg-red-400 text-red-400 hover:text-white  duration-200"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          <BiLogOut className="text-xl rotate-180 inline-blockduration-150" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
