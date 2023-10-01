import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseURL, config } from "../../../config";
import { format, parseISO } from "date-fns";
import Modal from "react-modal";
import { AiFillCheckSquare, AiOutlineClose } from "react-icons/ai";
import { BsFillPrinterFill } from "react-icons/bs";
import PrintButton from "../../../Components/PrintButton";
import StrukPrint from "./print";

const history = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const componentRef = useRef();

  console.log(selectedTransaksi);
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

  const handleToggleStatus = async (item) => {
    const updatedTransaksi = {
      ...item,
      status: item.status === "belum_bayar" ? "lunas" : "belum_bayar",
    };

    try {
      await axios.put(
        baseURL + "/transaksi/" + item.id_transaksi,
        updatedTransaksi,
        config
      );
      fetchTransaksi();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = (item) => {
    setSelectedTransaksi(item);
    setShowPrintModal(true);
  };

  const sortedData = transaksi
    .filter(
      //untuk menampilkan bedaarkan nama kasir/ nama user
      (data) =>
        data.user && data.user.nama_user === localStorage.getItem("namauser")
    )
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
        History Transaksi &nbsp; {localStorage.getItem("namauser")}
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
              <th className="w-2 py-3 px-2 font-medium text-[#FFFF] uppercase tracking-wider">
                Struk
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
                    (detailItem) =>
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
                    <button
                      className="bg-red-400 flex items-center gap-4 mx-auto text-white p-1 rounded-sm"
                      onClick={() => handleToggleStatus(item)}
                    >
                      <AiOutlineClose />
                      belum bayar
                    </button>
                  ) : (
                    <button
                      className="max-w-[50px] text-green-400  flex items-center gap-4 mx-auto text-2xl rounded-md"
                      onClick={() => handleToggleStatus(item)}
                    >
                      <AiFillCheckSquare />
                    </button>
                  )}
                </td>
                <td className=" bg-white py-0.5  text-center border-b">
                  {item.status === "belum_bayar" ? (
                    ""
                  ) : (
                    <button
                      className="text-neutral-500"
                      onClick={() => handlePrint(item)}
                    >
                      <BsFillPrinterFill />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Print */}
      <Modal
        isOpen={showPrintModal}
        overlayRef={false}
        onRequestClose={() => setShowPrintModal(false)}
        className="w-fit items-center h-full flex flex-col justify-center  border-neutral-600 mx-auto"
      >
        <div className="mx-auto w-fit bg-white">
          {selectedTransaksi && (
            <div
              id="print-area"
              className="max-w-xl max-h-[100vh] py-10 overflow-y-scroll"
            >
              <StrukPrint item={selectedTransaksi} ref={componentRef} />
              <PrintButton nama={selectedTransaksi.nama_pelanggan} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default history;
