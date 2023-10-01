import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, config } from "../../config";
import { BiReset } from "react-icons/bi";

const DataTahun = [
  { tahun: "2017" },
  { tahun: "2018" },
  { tahun: "2019" },
  { tahun: "2020" },
  { tahun: "2021" },
  { tahun: "2022" },
  { tahun: "2023" },
  { tahun: "2024" },
  { tahun: "2025" },
];

const DataBulan = [
  { id: "01", nama: "Januari" },
  { id: "02", nama: "Februari" },
  { id: "03", nama: "Maret" },
  { id: "04", nama: "April" },
  { id: "05", nama: "Mei" },
  { id: "06", nama: "Juni" },
  { id: "07", nama: "Juli" },
  { id: "08", nama: "Agustus" },
  { id: "09", nama: "September" },
  { id: "10", nama: "Oktober" },
  { id: "11", nama: "November" },
  { id: "12", nama: "Desember" },
];
function Laporan() {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [transaksiData, setTransaksiData] = useState([]);
  const [result, setResult] = useState(transaksiData);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const response = await axios.get(baseURL + "/transaksi", config);
        setTransaksiData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransaksi();
  }, []);

  const handleFilterTransaksi = (e) => {
    e.preventDefault();
    const filteredTransaksi = transaksiData.filter((transaksi) => {
      const tglTransaksi = new Date(transaksi.updatedAt);
      const tglBulanDanTahun = new Date(`${tahun}-${bulan}-01`);

      return (
        tglTransaksi.getFullYear() === tglBulanDanTahun.getFullYear() &&
        tglTransaksi.getMonth() === tglBulanDanTahun.getMonth()
      );
    });
    setResult(filteredTransaksi);
  };

  const bulans = DataBulan.find((item) => item.id === bulan);
  return (
    <div className="max-w-full p-4 h-screen overflow-y-scroll">
      <div className="flex justify-between w-full italic">
        <h1 className="text-2xl font-semibold">
          Transaksi &nbsp;
          <span>
            {bulans && "Bulan " + bulans.nama}&nbsp;
            {tahun}
          </span>
          &nbsp;
        </h1>
        <p className=" bg-neutral-200 p-2 rounded text-xl font-semibold ">
          Jumlah Transaksi &nbsp;
          {result.length}
        </p>
      </div>

      <form
        className="mb-4 flex items-center text-xl"
        onSubmit={handleFilterTransaksi}
      >
        <label className="mx-2">Bulan:</label>
        <select
          value={bulan}
          onChange={(e) => setBulan(e.target.value)}
          className="border-2  text-neutral-600 text-sm p-1 rounded-md"
        >
          <option value="">Pilih Bulan</option>
          {DataBulan.map((bulan) => (
            <option value={bulan.id}>{bulan.nama}</option>
          ))}
        </select>
        <label className="mx-2">Tahun:</label>
        <select
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="border-2  text-neutral-600 text-sm p-1 rounded-md"
        >
          <option value="">Pilih Tahun</option>
          {DataTahun.map((tahun) => (
            <option value={tahun.tahun}>{tahun.tahun}</option>
          ))}
        </select>
        <button className="bg-blue-400 text-white text-sm px-4 py-1 rounded">
          Tampilkan Transaksi
        </button>
        <button
          onClick={() => {
            setBulan("");
            setTahun("");
          }}
          className="bg-neutral-200 active:bg-blue-300   duration-100 text-2xl w-8 rounded text-white p-1 rotate-90 h-8"
        >
          <BiReset className="active:rotate-90 rotate-180 duration-200" />
        </button>
      </form>

      <div>
        {transaksiData.length === 0 ? (
          <p>Tidak ada transaksi yang ditemukan di bulan ini.</p>
        ) : (
          transaksiData.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal Transaksi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Pelanggan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No Meja
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Menu
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.map((transaksiItem, index) => (
                  <tr key={transaksiItem.id_transaksi}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Intl.DateTimeFormat("id-ID").format(
                        new Date(transaksiItem.tgl_transaksi)
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaksiItem.nama_pelanggan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaksiItem.meja.nomor_meja}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaksiItem.user.nama_user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ul>
                        {transaksiItem.detail_transaksi.map((detailItem) => (
                          <li key={detailItem.id_detail_transaksi}>
                            {detailItem.menu.nama_menu} ({detailItem.jumlah})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        transaksiItem.detail_transaksi.reduce(
                          (total, detailItem) =>
                            total + detailItem.menu.harga * detailItem.jumlah,
                          0
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaksiItem.status === "belum_bayar" ? (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                          Belum Bayar
                        </button>
                      ) : (
                        <button
                          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
                          disabled
                        >
                          Lunas
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
}

export default Laporan;
