import { useState, useEffect } from "react"; // usestate untuk menyimpan nilai, useeffect: menjelaskan function sebelum render/return
import axios from "axios";
// import { FiBookOpen,FiUser } from "react-icons/fi";
// import{FaHands} from "react-icons/fa";
import Layout from "../../Components/layout";
import { baseURL, config } from "../../config";

function DashboardAdmin() {
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
      <section className="p-6  text-gray-700 items-center">
        <div className="mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900">
            Selamat Datang Admin!!!!!
          </h2>
          <div className="grid gap-6 my-16 lg:grid-cols-3 border-spacing-4 border-rose-700">
            <div className="flex flex-col p-8 space-y-4 rounded-md bg-rose-50 ">
              <p className="text-2xl font-semibold">
                <b>{menus}</b>
                <p>Menu</p>
              </p>
            </div>
            <div className="flex flex-col p-8 space-y-4 rounded-md bg-rose-50 ">
              <p className="text-2xl font-semibold">
                <b>{user}</b>
                <p>User</p>
              </p>
            </div>
            <div className="flex flex-col p-8 space-y-4 rounded-md bg-rose-50 ">
              <p className="text-2xl font-semibold">
                <b>{mejas}</b>
                <p>Meja</p>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardAdmin;
