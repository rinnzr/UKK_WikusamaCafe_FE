import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, config } from "../../config"; // Sesuaikan dengan konfigurasi URL server Anda

function LaporanKasir() {
  const [namaUser, setNamaUser] = useState([]);
  const [transaksi, setTransaksi] = useState([]);
  const [kasir, setKasir] = useState("");

  useEffect(() => {
    //sesuai dengan functionnya
    getUser();
    getTransaksi();
  }, []);
  const getUser = () => {
    axios
      .get(baseURL + "/user", config)
      .then((response) => {
        setNamaUser(response.data.data.filter((role) => role.role === "kasir"));
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

  const result = transaksi.filter((item) => item.user.nama_user === kasir);

  return (
    <div className="max-w-full p-4 h-screen l">
      <h1 className="text-2xl font-semibold mb-4">Data Transaksi by Kasir</h1>

      <select value={kasir} onChange={(e) => setKasir(e.target.value)} className="w-full px-4 rounded max-w-xs h-12 mb-8">
        <option value="">pilih kasir</option>
        {namaUser.map((kasir) => (
          <option value={kasir.nama_user}>{kasir.nama_user}</option>
        ))}
      </select>

      {result.length > 0 ? (
        <>
          <div className="h-[80vh] overflow-y-scroll">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-yellow-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                  >
                    Tanggal Transaksi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                  >
                    Nama Pelanggan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                  >
                    No Meja
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                  >
                    Menu
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.map((item, index) => (
                  <tr key={item.id}>
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
          </div>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default LaporanKasir;
