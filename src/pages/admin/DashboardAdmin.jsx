import { useState, useEffect } from "react"; // usestate untuk menyimpan nilai, useeffect: menjelaskan function sebelum render/return
import axios from "axios";
import {AiOutlineEdit} from "react-icons/ai"
import { baseURL, config } from "../../config";
import { Link } from "react-router-dom";


function DashboardAdmin() {
  const [mejas, setMejas] = useState("");
  const [menus, setMenus] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    //sesuai dengan functionnya
    getMejas();
    getMenus();
    getUser();
  }, []);

  const getMejas = () => {
    axios
      .get(baseURL + "/meja", config)
      .then((response) => {
        setMejas(response.data.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMenus = () => {
    axios
      .get(baseURL + "/menu", config)
      .then((response) => {
        setMenus(response.data.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };;
  const getUser = () => {
    axios
      .get(baseURL + "/user", config)
      .then((response) => {
        setUser(response.data.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="p-6  text-gray-700 items-center">
          <div className=" flex flex-col gap-4  my-16  border-spacing-4 border-rose-700">
            <div className="my-4">
            <h1 className="text-2xl font-medium pb-2">Menu</h1>
            <div className="flex justify-between items-center  h-24 rounded-md bg-white ">
              <p className="text-2xl font-semibold flex gap-4 h-full items-center px-4 border-r-2 border-yellow-900">
                <p>Jumlah</p>
                <b>{menus}</b>
              </p>
              <Link className="flex items-center gap-4 bg-yellow-950 px-4 rounded hover:translate-x-2 mr-6 h-16 duration-150 ease-out  text-white font-semibold " to="/menu">edit <AiOutlineEdit/></Link>
            </div>
            </div>
            <div className="my-4">
            <h1 className="text-2xl font-medium pb-2">User</h1>
            <div className="flex justify-between items-center  h-24 rounded-md bg-white ">
              <p className="text-2xl font-semibold flex gap-4 h-full items-center px-4 border-r-2 border-yellow-900">
                <p>Jumlah</p>
                <b>{user}</b>
              </p>
              <Link className="flex items-center gap-4 bg-yellow-950 px-4 rounded hover:translate-x-2 mr-6 h-16 duration-150 ease-out  text-white font-semibold " to="/User">edit <AiOutlineEdit/></Link>
            </div>
            </div>
            <div className="my-4">
            <h1 className="text-2xl font-medium pb-2">Meja</h1>
            <div className="flex justify-between items-center  h-24 rounded-md bg-white ">
              <p className="text-2xl font-semibold flex gap-4 h-full items-center px-4 border-r-2 border-yellow-900">
                <p>Jumlah</p>
                <b>{mejas}</b>
              </p>
              <Link className="flex items-center gap-4 bg-yellow-950 px-4 rounded hover:translate-x-2 mr-6 h-16 duration-150 ease-out  text-white font-semibold " to="/Meja">edit <AiOutlineEdit/></Link>
            </div>
            </div>
           
          
        </div>
      </section>
    </>
  );
}

export default DashboardAdmin;
