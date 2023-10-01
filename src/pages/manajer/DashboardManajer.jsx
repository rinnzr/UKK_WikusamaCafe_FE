import { useState, useEffect } from "react";
import { baseURL, config } from "../../config";
import CardTotalKasirTransaksi from "../../Components/CardTotalKasirTransaksi";
import axios from "axios";
import { BiReset } from "react-icons/bi";
import DataRange from "../../Components/DataRange";

import PieChart from "../../Components/PieChart";

function DashboardManajer() {
  const [userKasir, setUserKasir] = useState([]);
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [dataTransaksiFiltered, setDataTransaksiFiltered] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datases, setDatases] = useState([]);
  const [menus, setMenus] = useState([]);
  const [mejas, setMejas] = useState([]);
  const [pie, setPie] = useState(false);

  useEffect(() => {
    const datass = startDate && endDate ? dataTransaksiFiltered : dataTransaksi;
    setDatases(datass);
  });

  useEffect(() => {
    getMejas();
    getUsers();
    getMenus();
    getTransaksi();
  }, []);

  const getMejas = () => {
    axios
      .get(baseURL + "/meja", config)
      .then((response) => {
        setMejas(response.data.data);
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

  const getTransaksi = () => {
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
      return result;
    }, {});
  const handleResetDates = () => {
    setStartDate("");
    setEndDate("");
  };

  const lunas = datases
    .filter((item) => item.status === "lunas")
    .map((item) => item.length);
  const belum_lunas = datases.filter((item) => item.status !== "lunas");

  function hitungTotalJumlah(data) {
    let totalJumlah = 0;
    for (let i = 0; i < data.length; i++) {
      totalJumlah += data[i].jumlah;
    }
    return totalJumlah;
  }

  const jumlahMenuLunas = {};
  const jumlahMenubelumlunas = {};

  for (const transaksi of datases) {
    for (const detail of transaksi.detail_transaksi) {
      const idMenu = detail.menu.id_menu;
      if (transaksi.status === "lunas") {
        jumlahMenuLunas[idMenu] =
          (jumlahMenuLunas[idMenu] || 0) + detail.jumlah;
      } else {
        jumlahMenubelumlunas[idMenu] =
          (jumlahMenubelumlunas[idMenu] || 0) + detail.jumlah;
      }
    }
  }

  const calculateTotalHarga = (range) => {
    return range.reduce((accumulator, item) => {
      return accumulator + item.harga * item.jumlah;
    }, 0);
  };

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

  const rangeMakanan = filterAndSortMenu("makanan", jumlahMenuLunas);
  const rangeMinuman = filterAndSortMenu("minuman", jumlahMenuLunas);
  const rangeMakanas = filterAndSortMenu("makanan", jumlahMenubelumlunas);
  const rangeMinumans = filterAndSortMenu("minuman", jumlahMenubelumlunas);

  const totalHargaMakanan = calculateTotalHarga(rangeMakanan);
  const totalHargaMinuman = calculateTotalHarga(rangeMinuman);
  const totalHargaMakananbelumLunas = calculateTotalHarga(rangeMakanas);
  const totalHargaMinumanBelumLunas = calculateTotalHarga(rangeMinumans);

  console.log("Range Makanan Lunas:", rangeMakanan);
  console.log("Range Minuman Lunas:", rangeMinuman);
  console.log("Total Harga Makanan Lunas:", totalHargaMakanan);
  console.log("Total Harga Minuman Lunas:", totalHargaMinuman);
  console.log("Range Makanan Belum Lunas:", rangeMakanas);
  console.log("Range Minuman Belum Lunas:", rangeMinumans);
  console.log("Total Harga Makanan Belum Lunas:", totalHargaMakananbelumLunas);
  console.log("Total Harga Minuman Belum Lunas:", totalHargaMinumanBelumLunas);

  return (
    <>
      <div className="w-full overflow-y-scroll px-4 h-screen py-2">
        <div className="w-full h-full ">
          <p className="text-2xl font-semibold italic text-neutral-700">
            Data transaksi Kasir
          </p>
          <div className="grid grid-cols-3 gap-4 border-b-2 pb-4 pt-2">
            {Object.keys(groupedtransaksi).map((namaKasir, idx) => (
              <CardTotalKasirTransaksi
                idx={idx + 1}
                key={namaKasir}
                namaKasir={namaKasir}
                jumlahTransaksi={groupedtransaksi[namaKasir].transaksi.length}
              />
            ))}
          </div>
          <div className="flex">
            <div className="w-full h-fit pr-4">
              <div className="flex justify-between  w-full py-4 italic items-center">
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
                    onChange={(e) => {
                      setStartDate(e.target.value);
                    }}
                    className="border-2  text-neutral-600 text-sm p-1 rounded-md"
                  />

                  <label htmlFor="sampai">sampai</label>
                  <input
                    value={endDate}
                    type="date"
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                    id="sampai"
                    className="border-2  text-neutral-600 text-sm p-1 rounded-md"
                  />
                  <button
                    onClick={handleFilter}
                    className="bg-blue-400  px-8 py-1.5 rounded-md border border-neutral-200 font-normal text-white"
                  >
                    Filter
                  </button>
                </div>
              </div>
              <div className="p-6 border mb-0 flex flex-col justify-between h-full w-full gap-11 border-neutral-200 rounded-lg ">
                <p className="pb-2 font-semibold italic text-xl">
                  General Data
                </p>
                <div className="w-full flex justify-between bg-neutral-50  items-center p-2 rounded-md border border-neutral-200 gap-4 ">
                  <p className="bg-green-400 text-white font-semibold w-full rounded h-16 flex flex-col items-center justify-center">
                    {
                      menus.filter((makanan) => makanan.jenis === "makanan")
                        .length
                    }
                    <span className="text-xs">Makanan</span>
                  </p>
                  <p className="bg-green-400 text-white font-semibold w-full rounded h-16 flex flex-col items-center justify-center">
                    {
                      menus.filter((minuman) => minuman.jenis === "minuman")
                        .length
                    }
                    <span className="text-xs">Minuman</span>
                  </p>
                  <p className="bg-green-400 text-white font-semibold w-full rounded h-16 flex flex-col items-center justify-center">
                    {menus.length}
                    <span className="text-xs">all menu</span>
                  </p>
                  <p className="bg-green-400 text-white font-semibold w-full rounded h-16 flex flex-col items-center justify-center">
                    {lunas.length + belum_lunas.length}
                    <span className="text-xs">customer</span>
                  </p>
                  <p className="bg-green-400 text-white font-semibold w-full rounded h-16 flex flex-col items-center justify-center">
                    {mejas.length}
                    <span className="text-xs">meja</span>
                  </p>{" "}
                  <p className="bg-green-400 text-white font-semibold w-full rounded h-16 flex flex-col items-center justify-center">
                    {userKasir.filter((role) => role.role === "kasir").length}
                    <span className="text-xs">kasir</span>
                  </p>
                  <p className="bg-green-400 text-white font-semibold w-full rounded h-16 flex flex-col items-center justify-center">
                    -<span className="text-xs">not thing</span>
                  </p>
                </div>
                <div>
                  <p className="pb-2 font-semibold italic text-xl">
                    Status Transaksi
                  </p>
                  <div className="gap-4 grid grid-cols-3 font-semibold italic">
                    <div className="w-full flex justify-between bg-neutral-50  items-center p-2 rounded-md border border-neutral-200 ">
                      <p>Lunas</p>
                      <p className="bg-green-400 text-white w-12 rounded h-12 flex items-center justify-center">
                        {lunas.length}
                      </p>
                    </div>
                    <div className="w-full flex justify-between bg-neutral-50 items-center p-2 rounded-md border border-neutral-200 ">
                      <p> Belum lunas</p>
                      <p className="bg-red-400 text-white w-12 rounded h-12 flex items-center justify-center">
                        {belum_lunas.length}
                      </p>
                    </div>
                    <div className="w-full flex justify-between bg-neutral-50  items-center p-2 rounded-md border border-neutral-200 ">
                      <p>Total</p>
                      <p className="bg-blue-400 text-white w-12 rounded h-12 flex items-center justify-center">
                        {lunas.length + belum_lunas.length}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="pb-2  font-semibold italic text-xl">
                    penjualan bulan ini
                  </p>
                  <div className="gap-4 grid grid-cols-3 font-semibold italic">
                    <div className="w-full flex justify-between bg-neutral-50  items-center p-2 rounded-md border border-neutral-200 ">
                      <p>makanan</p>
                      <p className="bg-fuchsia-400 w-12 rounded h-12 flex items-center justify-center">
                        {hitungTotalJumlah(rangeMakanan)}
                      </p>
                    </div>
                    <div className="w-full flex justify-between bg-neutral-50 items-center p-2 rounded-md border border-neutral-200 ">
                      <p>minuman</p>
                      <p className="bg-fuchsia-400 w-12 rounded h-12 flex items-center justify-center">
                        {hitungTotalJumlah(rangeMinuman)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-ful  max-w-xs min w-[500px]  h-full">
              <p className="text-neutral-700 italic font-semibold py-4   text-3xl">
                Menu Terlaris
              </p>
              <div className="border border-neutral-200 p-2 rounded-lg pb-4">
                <div className="bg-neutral-100 p-4 rounded mb-2">
                  <p>5 Makanan</p>
                  <PieChart
                    dataRange={rangeMakanan}
                    className="h-72 w-72 bg-slate-200"
                  />
                </div>
                <div className="bg-neutral-100 p-4 rounded">
                  <p>5 Minuman</p>
                  <PieChart
                    dataRange={rangeMinuman}
                    className="h-72 w-72 bg-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-4 mt-4 rounded-lg mb-10">
            <p className="pt-4 pb-8 font-semibold italic text-xl">pendapatan</p>
            <div className="gap-4 grid font-semibold italic">
              <div className="w-full flex justify-between bg-neutral-50  items-center p-2 rounded-md border border-neutral-200 ">
                <p>makanan</p>
                <p className="border-blue-400 border-2 w-80 rounded text-sm h-12 px-4 flex items-center justify-center">
                  Rp .{new Intl.NumberFormat("id-ID").format(totalHargaMakanan)}
                </p>
              </div>

              <div className="w-full flex justify-between bg-neutral-50 items-center p-2 rounded-md border border-neutral-200 ">
                <p>minuman</p>
                <p className="border-blue-400 border-2 w-80 rounded text-sm h-12 px-4 flex items-center justify-center">
                  Rp .{new Intl.NumberFormat("id-ID").format(totalHargaMinuman)}
                </p>
              </div>
              <div className="w-full flex justify-between bg-neutral-50  items-center p-2 rounded-md border border-neutral-200 ">
                <p>makanan belum lunas</p>
                <p className="border-red-400 border-2 w-80 rounded text-sm h-12 px-4 flex items-center justify-center">
                  Rp .
                  {new Intl.NumberFormat("id-ID").format(
                    totalHargaMakananbelumLunas
                  )}
                </p>
              </div>
              <div className="w-full flex justify-between bg-neutral-50 items-center p-2 rounded-md border border-neutral-200 ">
                <p>minuman belum lunas</p>
                <p className="border-red-400 border-2 w-80 rounded text-sm h-12 px-4 flex items-center justify-center">
                  Rp .
                  {new Intl.NumberFormat("id-ID").format(
                    totalHargaMinumanBelumLunas
                  )}
                </p>
              </div>
              <div className="w-full flex justify-between bg-neutral-50 items-center p-2 rounded-md border border-neutral-200 ">
                <p>Total belum dibayarkan</p>
                <p className="border-red-400 border-2 w-80 rounded text-sm h-12 px-4 flex items-center justify-center">
                  Rp .
                  {new Intl.NumberFormat("id-ID").format(
                    totalHargaMakananbelumLunas + totalHargaMinumanBelumLunas
                  )}
                </p>
              </div>
              <div className="w-full flex justify-between bg-neutral-50 items-center p-2 rounded-md border border-neutral-200 ">
                <p>Total dibayarkan / laba kotor</p>
                <p className="border-blue-400 border-2 w-80 rounded text-sm h-12 px-4 flex items-center justify-center">
                  Rp .
                  {new Intl.NumberFormat("id-ID").format(
                    totalHargaMinuman +
                      totalHargaMakanan -
                      totalHargaMakananbelumLunas -
                      totalHargaMinumanBelumLunas
                  )}
                </p>
              </div>
              <div className="w-full flex justify-between bg-neutral-50 items-center p-2 rounded-md border border-neutral-200 ">
                <p>Tax 10%</p>
                <p className="border-neutral-400 border-2 w-80 rounded text-sm h-12 px-4 flex items-center justify-center">
                  Rp .
                  {new Intl.NumberFormat("id-ID").format(
                    (totalHargaMinuman +
                      totalHargaMakanan -
                      totalHargaMakananbelumLunas -
                      totalHargaMinumanBelumLunas) *
                      0.1
                  )}
                </p>
              </div>
              <div className="w-full flex justify-between bg-neutral-50 items-center p-2 rounded-md border border-neutral-200 ">
                <p>Total pendapatan (35%) / Laba bersih</p>
                <p className="border-blue-400 border-2 w-80 rounded text-sm h-12 px-4 flex items-center justify-center">
                  Rp .
                  {new Intl.NumberFormat("id-ID").format(
                    (totalHargaMinuman +
                      totalHargaMakanan -
                      totalHargaMakananbelumLunas -
                      totalHargaMinumanBelumLunas) *
                      0.25 -
                      (totalHargaMinuman +
                        totalHargaMakanan -
                        totalHargaMakananbelumLunas -
                        totalHargaMinumanBelumLunas) *
                        0.1
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardManajer;
