import { useState, useEffect } from "react"; // usestate untuk menyimpan nilai, useeffect: menjelaskan function sebelum render/return
import axios from "axios";
import { baseURL, config } from "../../config";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


function DashboardManajer() {
  const [mejas, setMejas] = useState("");
  const [menus, setMenus] = useState([]);
  const [user, setUser] = useState("");
  const [transaksi, setTransaksi] = useState("");
  let [users, setUsers] = useState([]);

  useEffect(() => {
    //sesuai dengan functionnya
    getMejas();
    getMenus();
    getUsers();
    getUser();
    getTransaksi();
    
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
  const getTransaksi = () => {
    axios
      .get(baseURL + "/transaksi", config)
      .then((response) => {
        setTransaksi(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMenus = () => {
    axios
      .get(baseURL + "/menu", config)
      .then((response) => {
        setMenus(response.data.data);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const jumlahMenu = {};

  for (const transaksis of transaksi) {
    for (const detail of transaksis.detail_transaksi) {
      const idMenu = detail.menu.id_menu;
        jumlahMenu[idMenu] =
          (jumlahMenu[idMenu] || 0) + detail.jumlah;
       
    }
  }
  console.log(menus)

  const filterAndSortMenu = (jenis, jumlahMenu) => {
    return menus
      .filter((menu) => menu.jenis === jenis && jumlahMenu[menu.id_menu])
      .sort((a, b) => jumlahMenu[b.id_menu] - jumlahMenu[a.id_menu])
      .map((menu) => ({
        nama_menu: menu.nama_menu,
        harga: menu.harga,
        jumlah: jumlahMenu[menu.id_menu],
      }));
  };

  const rangeMakanan = filterAndSortMenu("makanan", jumlahMenu);
  const rangeMinuman = filterAndSortMenu("minuman", jumlahMenu)


  ChartJS.register(ArcElement, Tooltip, Legend);
   const dataMakanan = {
    labels:rangeMakanan.slice(0, 5).map((item) => item.nama_menu),
    datasets: [
      {
        label: '# of Votes',
        data: rangeMakanan.slice(0, 5).map((item) => item.jumlah),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0,
      },
    ],
  };
  ChartJS.register(ArcElement, Tooltip, Legend);

  const dataMinuman = {
    labels: rangeMinuman.map((item) => item.nama_menu),
    datasets: [
      {
        label: '# of Votes',
        data: rangeMinuman.map((item) => item.jumlah),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0,
      },
    ],
  };
  
  return (
    <>
      <section className="p-3">
      <div className="mx-auto">
        <div className="">          
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
                {menus.length}
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
<div className="h-72 w-72">
<Doughnut data={dataMakanan} />

</div>
<div className="h-72 w-72">

<Doughnut data={dataMinuman} />

</div>

          </div>
        </div>
      </div>
      </section>
    </>
  );
}


export default DashboardManajer;
