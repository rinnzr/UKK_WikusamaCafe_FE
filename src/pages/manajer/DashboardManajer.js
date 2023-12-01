import { useState, useEffect } from "react"; // usestate untuk menyimpan nilai, useeffect: menjelaskan function sebelum render/return
import axios from "axios";
// import { FiBookOpen,FiUser } from "react-icons/fi";
// import{FaHands} from "react-icons/fa";
import Layout from "../../Components/layout"
import { baseURL, config } from "../../config";

function DashboardManajer() {
  const [mejas, setMejas] = useState("");
  const [menus, setMenus] = useState("");
  const [user, setUser] = useState("");
  let [users, setUsers] = useState([]);

  useEffect(() => {
    //sesuai dengan functionnya
    getMejas();
    getMenus();
    getUsers();
    getUser();
    
  }, []);

  const getMejas = () => {
    axios
      .get(baseURL + "/meja", config)
      .then((response) => {
        setMejas(response.data.data.length);
        console.log(response.data);
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = () => {
    axios
      .get(baseURL + "/user", config)
      .then((response) => {
        setUsers(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUser = () => {
    axios
      .get(baseURL + "/user", config)
      .then((response) => {
        setUser(response.data.data.length);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex sm:p-7 w-full">
        <div className="w-full h-screen mx-10 mt-28 ml-60 ">          
          {/* {users.map((item)=> ( */}
            <h1 className="text-2xl font-semibold text-center  capitalize lg:text-3xl text-[#0B2447]">
            Saat ini anda login Sebagai manajer
          </h1>
          {/* ))} */}

          <p className="max-w-2xl mx-auto mt-4 text-center  xl:mt-6 text-[#0B2447]">
            Hai Manajer aku tau kamu cuma liat-liat penghasilan perbulan dan perhari 
            Tetap Semangat yaaaaa!!!! love Manajer
          </p>

          <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">

            {/* menu */}
          <div className="w-full p-8 space-y-8 text-center bg-[#FD841F] rounded-lg">
              <p className="font-medium text-gray-200 uppercase">Menu</p>

              <h2 className="text-5xl font-bold text-white uppercase ">
                {menus}
              </h2>
              <p className="font-medium text-gray-200">Jumlah Menu</p>
            </div>

            {/* meja */}
            <div className="w-full p-8 space-y-8 text-center border bg-[#E14D2A] rounded-lg ">
              <p className="font-medium  uppercase text-gray-200">
                Meja
              </p>
              <h2 className="text-5xl font-bold  uppercase text-white">
                {mejas}
              </h2>
              <p className="font-medium  text-gray-200">Jumlah Meja</p>
            </div>

            {/* user */}
            <div className="w-full p-8 space-y-8 text-center bg-[#CD104D] rounded-lg ">
              <p className="font-medium  uppercase text-gray-200">
                User 
              </p>

              <h2 className="text-5xl font-bold uppercase text-white">
                {user}
              </h2>

              <p className="font-medium  text-gray-200">
                Jumlah user (admin,Manajer,Kasir)
              </p>
            </div>

           

            
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardManajer;
