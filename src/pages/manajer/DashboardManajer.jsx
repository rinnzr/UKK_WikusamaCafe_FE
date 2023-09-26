import { useState, useEffect } from "react";
import { baseURL, config } from "../../config";
import CardTotalKasirTransaksi from "../../Components/CardTotalKasirTransaksi";
import axios from "axios";
import { BiReset } from "react-icons/bi";
function DashboardManajer() {
  const [userKasir, setUserKasir] = useState([]);
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [dataTransaksiFiltered, setDataTransaksiFiltered] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datases, setDatases] = useState();

  useEffect(() => {
    const datass = dataTransaksiFiltered ? dataTransaksiFiltered : dataTransaksi;
    console.log("datanya", datass);
    setDatases(datass);
  });
  console.log("datanya hasilnya", datases);

  useEffect(() => {
    // getMejas();
    // getMenus();
    getUsers();
    getHistory();
  }, []);

  // const getMejas = () => {
  //   axios
  //     .get(baseURL + "/meja", config)
  //     .then((response) => {
  //       setMejas(response.data.data.length);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getMenus = () => {
  //   axios
  //     .get(baseURL + "/menu", config)
  //     .then((response) => {
  //       setMenus(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getHistory = () => {
    axios
      .get(baseURL + "/transaksi", config)
      .then((response) => {
        setDataTransaksi(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = () => {
    axios
      .get(baseURL + "/user", config)
      .then((response) => {
        setUserKasir(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilter = () => {
    const filterData = dataTransaksi.filter((transaksi) => {
      const transactionDate = new Date(transaksi.updatedAt)
        .toISOString()
        .split("T")[0];
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setDataTransaksiFiltered(filterData);
  };

  const groupedtransaksi = userKasir
    .filter((kasir) => kasir.role === "kasir")
    .reduce((result, kasir) => {
      const transaksidata = datases.filter(
        (transaksi) => transaksi.id_user === kasir.id_user
      );
      if (transaksidata.length > 0) {
        result[kasir.nama_user] = {
          kasir,
          transaksi: transaksidata,
        };
      }
      console.log("tarnsaksi data", result);
      return result;
    }, {});

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const handleResetDates = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <>
      <div className="flex py-4 w-full">
        <div className="w-full h-screen  ">
          <p className="text-2xl font-semibold italic text-neutral-700">
            Data transaksi Kasir
          </p>
          <div className="grid grid-cols-3 gap-4 border-b-2 pb-10 pt-4">
            {Object.keys(groupedtransaksi).map((namaKasir, idx) => (
              <CardTotalKasirTransaksi
                idx={idx + 1}
                key={namaKasir}
                namaKasir={namaKasir}
                jumlahTransaksi={groupedtransaksi[namaKasir].transaksi.length}
              />
            ))}
          </div>
          <div className="flex h-full items-start">
            <div className="flex justify-between px-2 w-full py-4 italic items-center">
              <p className="text-neutral-700 font-semibold  text-3xl">
                Data penjualan
              </p>
              <div
                className="flex flex-row gap-4 items-center font-semibold 
              text-neutral-400"
              >
                <button
                  onClick={handleResetDates}
                  className="bg-neutral-200 active:bg-blue-300   duration-100 text-2xl w-8 rounded text-white p-1 rotate-90 h-8"
                >
                  <BiReset className="active:rotate-90 rotate-180 duration-200" />
                </button>

                <label htmlFor="dari">Dari</label>
                <input
                  type="date"
                  id="dari"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="border-2  text-neutral-600 text-sm p-1 rounded-md"
                />

                <label htmlFor="sampai">sampai</label>
                <input
                  value={endDate}
                  type="date"
                  onChange={handleEndDateChange}
                  id="sampai"
                  className="border-2  text-neutral-600 text-sm p-1 rounded-md"
                />
                <button
                  onClick={handleFilter}
                  className="bg-blue-400  px-8 py-1.5 rounded-md border font-normal text-white"
                >
                  filter
                </button>
              </div>
            </div>
            <div className="w-ful max-w-xs min w-96 px-2 border-l border-blue-500 h-full">
              <p className="text-neutral-700 font-semibold  text-3xl">
                Menu Terlaris
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardManajer;
