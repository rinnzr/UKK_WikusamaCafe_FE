import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, config } from "../../config"; // Sesuaikan dengan konfigurasi URL server Anda

function LaporanTgl() {
  const [tglTransaksi, setTglTransaksi] = useState("");
  const [bulanTahun, setBulanTahun] = useState("");
  const [transaksiData, setTransaksiData] = useState([]);
  const [dataKosong, setDataKosong] = useState(false);
  const [mode, setMode] = useState("tanggal"); // "tanggal" atau "bulan"
  const [total, setTotal] = useState("");

  const fetchData = async () => {
    try {
      let response;
      if (mode === "tanggal") {
        response = await axios.get(
          baseURL + `/transaksi/${tglTransaksi}`,
          config
        );
      } else if (mode === "bulan") {
        response = await axios.get(
          baseURL + `/transaksi/bulan/${bulanTahun}`,
          config
        );
      }

      setTransaksiData(response.data.data);
      setDataKosong(false); // Set dataKosong menjadi false jika data ditemukan
    } catch (error) {
      setTransaksiData([]); // Kosongkan data jika terjadi error
      setDataKosong(true);
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    fetchData();
  };
  console.log(transaksiData);

  const fetcTotal = async () => {
    try {
      const response = await axios.get(
         baseURL+`/transaksi/pendapatantgl/${tglTransaksi}`,
        config
      );
      setTotal(response.data.total_keseluruhan);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() =>{
    fetcTotal();
  },[]);// Jangan lupa tambahkan dependensi kosong agar efek ini hanya dijalankan sekali

  const handleTotal = () => {
    fetcTotal(); 
  }
  console.log(total)



  const calculateTotal = (transaksiData) => {
    let total = 0;

    for (const transaksi of transaksiData) {
      for (const detailTransaksi of transaksi.detail_transaksi) {
        const subtotal = detailTransaksi.jumlah * detailTransaksi.menu.harga;
        total += subtotal;
      }
    }

    return total;
  };

  const totalPendapatan = calculateTotal(transaksiData);
  console.log(totalPendapatan)

  return (
    <div className="max-w-full p-4 h-screen overflow-y-scroll">
      <h1 className="text-2xl font-semibold mb-4">Data Transaksi</h1>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="tanggal"
            checked={mode === "tanggal"}
            onChange={() => setMode("tanggal")}
            className="mr-2"
          />
          Tanggal
        </label>
        <label>
          <input
            type="radio"
            value="bulan"
            checked={mode === "bulan"}
            onChange={() => setMode("bulan")}
            className="mr-2"
          />
          Bulan
        </label>
      </div>
      {mode === "tanggal" ? (
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          onChange={(e) => setTglTransaksi(e.target.value)}
          value={tglTransaksi}
          className="w-48 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
      ) : (
        <input
          type="month"
          placeholder="YYYY-MM"
          onChange={(e) => setBulanTahun(e.target.value)}
          value={bulanTahun}
          className="w-48 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
      )}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-2"
        onClick={() => {
          handleButtonClick();
          handleTotal();
        }}
      >
        Cari Transaksi
      </button>
      {dataKosong && (
        <p>
          <button className="text-gray-50 bg-red-500 px-4 py-2 mt-3 font-semibold rounded-lg  ">
            Data tidak ditemukan
          </button>
        </p>
      )}

      {transaksiData.length > 0 ? (
        <>
          <div className="hadow overflow-y-scroll h-[80vh] border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-amber-200 divide-y divide-gray-200">
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
                {transaksiData.map((item, index) => (
                  <tr key={item.id_transaksi}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Intl.DateTimeFormat("id-ID").format(
                        new Date(item.tgl_transaksi)
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.nama_pelanggan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.meja.nomor_meja}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.user.nama_user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ul>
                        {item.detail_transaksi.map((detailItem) => (
                          <li key={detailItem.id_detail_transaksi}>
                            {detailItem.menu.nama_menu} ({detailItem.jumlah})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        item.detail_transaksi.reduce(
                          (total, detailItem) =>
                            total + detailItem.menu.harga * detailItem.jumlah,
                          0
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === "belum_bayar" ? (
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
            <p className="text-lg py-4 whitespace-nowrap ">
        Pendapatan&nbsp;
          <span>
            {tglTransaksi}
          </span>
          &nbsp; :
          <span className="bg-red-500 rounded-md px-3 ml-2 text-gray-50 font-semibold"> Rp {new Intl.NumberFormat("id-ID").format(totalPendapatan)}</span>
      </p>
          </div>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default LaporanTgl;
