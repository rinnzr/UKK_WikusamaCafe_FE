import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, config } from "../../config";
import { BiReset } from "react-icons/bi";

function LaporanKasir() {
  const [transaksiData, setTransaksiData] = useState([]);
  const [user, setUser] = useState([]);
  const [userTransaksi, setUserTransaksi] = useState([]);
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
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(baseURL + "/user", config);
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const datass = transaksiData.filter(
    (role) => role.user.nama_user === userTransaksi
  );

  return (
    <div className="max-w-full p-4 h-screen overflow-y-scroll">
      <div className="flex justify-between w-full italic">
        <h1 className="text-2xl font-semibold">Transaksi &nbsp;</h1>
        <p className=" bg-neutral-200 p-2 rounded text-xl font-semibold ">
          Jumlah Transaksi &nbsp;
          {datass.length}
        </p>
      </div>

      <form className="mb-4 flex items-center text-xl">
        <label className="mx-2">Tahun:</label>
        <select
          value={userTransaksi}
          onChange={(e) => setUserTransaksi(e.target.value)}
          className="border-2  text-neutral-600 text-sm p-1 rounded-md"
        >
          <option value="">Pilih Kasir</option>
          {user
            .filter((role) => role.role === "kasir")
            .map((user) => (
              <option value={user.nama_user}>{user.nama_user}</option>
            ))}
        </select>
        <button
          onClick={() => {}}
          className="bg-neutral-200 active:bg-blue-300   duration-100 text-2xl w-8 rounded text-white p-1 rotate-90 h-8"
        >
          <BiReset className="active:rotate-90 rotate-180 duration-200" />
        </button>
      </form>

      <div>
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
            {datass.map((transaksiItem, index) => (
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
      </div>
    </div>
  );
}

export default LaporanKasir;
