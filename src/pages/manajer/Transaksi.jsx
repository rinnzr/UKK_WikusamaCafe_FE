import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, config } from "../../config";
import { format, parseISO } from "date-fns";
import { AiFillCheckSquare, AiOutlineClose } from "react-icons/ai";

const Transaksi = () => {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const fetchTransaksi = async () => {
    try {
      const response = await axios.get(baseURL + "/transaksi", config);
      setTransaksi(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sortedData = transaksi
    .sort((a, b) => {
      ///untuk mengurutkan dari yang terbaru
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
    .filter(
      (
        item //memfilter data dengan jumlah harga <= nol tidak akan di tampilkan
      ) =>
        item.detail_transaksi.some(
          (detailItem) => detailItem.jumlah * detailItem.menu.harga > 0
        )
    );

  const formatISODate = (isoDateString) => {
    const dateObj = parseISO(isoDateString);
    const formattedDate = format(dateObj, "dd/MM/yyyy");
    const formattedTime = format(dateObj, "HH:mm:ss");
    return (
      <>
        <p>
          {formattedDate}&nbsp;
          {formattedTime}
        </p>
      </>
    );
  };
  return (
    <div className="max-w-full py-0.52">
      <h1 className="text-3xl  font-semibold text-gray-900 py-3  flex justify-center">
        Transaksi&nbsp; {localStorage.getItem("namauser")}
      </h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg max-h-[90vh]  overflow-y-scroll  ">
        <table className="min-w-full divide-y text-xs divide-gray-200">
          <thead className="bg-neutral-500 text-[10px] sticky top-0  text-center w-full">
            <tr>
              <th className="py-3 px-2 text-center  font-medium text-[#FFFF] uppercase max-w-fit tracking-wider">
                No
              </th>
              <th className="py-3 max-w-[4.4rem]  font-medium text-[#FFFF] uppercase tracking-wider">
                Nama Pelanggan
              </th>
              <th className=" py-3 text-center max-w-fit  font-medium text-[#FFFF] uppercase tracking-wider">
                Chasier
              </th>
              <th className="px-2 py-3 font-medium text-[#FFFF] uppercase max-w-fit tracking-wider">
                Waktu Transaksi
              </th>
              <th className="py-3 text-center  font-medium text-[#FFFF]  uppercase max-w-[50px] tracking-wider">
                No Meja
              </th>
              <th className="py-3  font-medium text-[#FFFF] uppercase tracking-wider">
                Menu & jumlah
              </th>
              <th className="py-3 px-2 font-medium text-[#FFFF] uppercase tracking-wider">
                Harga Satuan
              </th>
              <th className="px-6 py-3 font-medium text-[#FFFF] uppercase tracking-wider">
                Total
              </th>
              <th className=" font-medium text-[#FFFF] uppercase tracking-wider">
                Status Bayar
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr
                key={item.id_transaksi}
                className={
                  index % 2 === 0 ? "bg-neutral-200 bg-opacity-30" : ""
                }
              >
                <td className="py-0.5 text-center ">{index + 1}</td>
                <td className="py-0.5 max-w-[4rem] truncate text-center">
                  {item.nama_pelanggan}
                </td>
                <td className="py-0.5 text-center ">{item.user.nama_user}</td>
                <td className="py-0.5 text-center">
                  <p>{formatISODate(item.updatedAt)}</p>
                </td>
                <td className="px-6 py-0.5 text-center">
                  {item.meja.nomor_meja}
                </td>

                <td className="py-0.5">
                  <ul>
                    <>
                      {item.detail_transaksi.map(
                        (detailItem) =>
                          detailItem.jumlah !== 0 && (
                            <li
                              className="py-0.5"
                              key={detailItem.id_detail_transaksi}
                            >
                              <span className="font-normal">
                                -{detailItem.menu.nama_menu}
                              </span>
                              {detailItem.jumlah}
                            </li>
                          )
                      )}
                    </>
                  </ul>
                </td>
                <td>
                  {item.detail_transaksi.map(
                    (detailItem, idx) =>
                      detailItem.jumlah !== 0 && (
                        <p
                          key={detailItem.id_detail_transaksi}
                          className="py-0.5"
                        >
                          Rp.
                          {new Intl.NumberFormat("id-ID").format(
                            detailItem.menu.harga
                          )}
                        </p>
                      )
                  )}
                </td>
                <td className="px-6 py-0.5">
                  Rp
                  {new Intl.NumberFormat("id-ID").format(
                    item.detail_transaksi.reduce(
                      (total, detailItem) =>
                        total + detailItem.menu.harga * detailItem.jumlah,
                      0
                    )
                  )}
                </td>
                <td className="max-w-[50px] py-0.5">
                  {item.status === "belum_bayar" ? (
                    <p className="bg-red-400 flex items-center gap-4 mx-auto text-white p-1 rounded-sm">
                      <AiOutlineClose />
                      belum bayar
                    </p>
                  ) : (
                    <p className="max-w-[50px] text-green-400  flex items-center gap-4 mx-auto text-2xl rounded-md">
                      <AiFillCheckSquare />
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaksi;
