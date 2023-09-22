import * as React from "react";
import axios from "axios";
import { useRef } from "react";
import { baseURL, config } from "../../../config";
import Modal from "react-modal";
import PrintButton from "./PrintButton";
import { BsFillPrinterFill } from "react-icons/bs";
import { AiFillCheckSquare } from "react-icons/ai";
import { format, parseISO } from "date-fns";
import StrukPrint from "./print";

// DAFTAR TRANSAKSI
const Transaksi = () => {
  const [transaksi, setTransaksi] = React.useState([]);
  const [showPrintModal, setShowPrintModal] = React.useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = React.useState(null);
  const componentRef = useRef();

  React.useEffect(async () => {
    try {
      const response = await axios.get(baseURL + "/transaksi", config);
      setTransaksi(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleToggleStatus = async (transaksiItem) => {
    const updatedTransaksi = {
      ...transaksiItem,
      status: transaksiItem.status === "belum_bayar" ? "lunas" : "belum_bayar",
    };
    try {
      await axios.put(
        baseURL + "/transaksi/" + transaksiItem.id_transaksi,
        updatedTransaksi,
        config
      );
      fetchTransaksi();
    } catch (error) {
      console.error(error);
    }
    console.log(transaksi);
  };
  const handlePrint = (transaksiItem) => {
    setSelectedTransaksi(transaksiItem);
    setShowPrintModal(true);
  };
  const formatISODate = (isoDateString) => {
    const dateObj = parseISO(isoDateString);
    const formattedDate = format(dateObj, "dd/MM/yyyy");
    const formattedTime = format(dateObj, "HH:mm:ss");
    return (
      <>
        <p>Date: {formattedDate}</p>
        <p>Time: {formattedTime}</p>
      </>
    );
  };

  const data = transaksi
    .filter(
      (data) =>
        data.user && data.user.nama_user === localStorage.getItem("namauser")
    )
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA;
    });
  console.log(data);
  return (
    <div className="max-w-full text-xs pb-14 px-2">
      <h1 className="text-3xl sticky top-0  py-3 bg-white w-full text-center font-semibold text-gray-900 flex justify-center">
        Daftar Transaksi
      </h1>

      <div className="shadow  border-b max-w-7xl fixed w-full overflow-y-scroll h-[670px] scrollbar-none border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200  ">
          <thead className="bg-[#3F2305] text-[10px] sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left  font-medium text-[#FFFF] uppercase max-w-[12px] tracking-wider"
              >
                No
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left  font-medium text-[#FFFF] uppercase max-w-fi tracking-wider"
              >
                Tanggal Transaksi
              </th>{" "}
              <th
                scope="col"
                className="py-3 text-center  font-medium text-[#FFFF]  uppercase max-w-[50px] tracking-wider"
              >
                No Meja
              </th>
              <th
                scope="col"
                className="py-3 text-left  font-medium text-[#FFFF] uppercase tracking-wider"
              >
                Nama Pelanggan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left  font-medium text-[#FFFF] uppercase tracking-wider"
              >
                Chasier
              </th>
              <th
                scope="col"
                className="py-3 text-left  font-medium text-[#FFFF] uppercase tracking-wider"
              >
                Menu
              </th>
              <th className="py-3 px-2 text-left font-medium text-[#FFFF] uppercase tracking-wider">
                Harga Satuan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-[#FFFF] uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                className="text-left  font-medium text-[#FFFF] uppercase tracking-wider"
              >
                Status <br /> Bayar
              </th>
              <th
                scope="col"
                className="w-2 py-3 font-medium text-[#FFFF] uppercase tracking-wider"
              >
                Struk
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {data.map((transaksiItem, index) => (
              <tr
                key={transaksiItem.id_transaksi}
                className={index % 2 === 0 ? "bg-[#C8B6A6] bg-opacity-30" : ""}
              >
                <td className="py-1 mx-auto text-center">{index + 1}</td>
                <td className="py-1">
                  <p>{formatISODate(transaksiItem.updatedAt)}</p>{" "}
                </td>
                <td className="px-6 py-1">{transaksiItem.meja.nomor_meja}</td>
                <td className="py-1 ">{transaksiItem.nama_pelanggan}</td>
                <td className="px-6 py-1">{transaksiItem.user.nama_user}</td>
                <td className="py-1">
                  <ul>
                    {transaksiItem.detail_transaksi.map((detailItem, idx) => (
                      <li
                        key={detailItem.id_detail_transaksi}
                        className={
                          idx % 2 === 0 && idx !== 0
                            ? "bg-neutral-100 font-light flex justify-between"
                            : "font-light flex justify-between"
                        }
                      >
                        <span className="font-normal">
                          {idx + 1}.{detailItem.menu.nama_menu}
                        </span>
                        {detailItem.jumlah}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  {transaksiItem.detail_transaksi.map((detailItem, idx) => (
                    <p
                      key={detailItem.id_detail_transaksi}
                      className={
                        idx % 2 === 0 && idx !== 0
                          ? "bg-neutral-100 font-light pl-2"
                          : "font-light pl-2"
                      }
                    >
                      Rp.
                      {new Intl.NumberFormat("id-ID").format(
                        detailItem.menu.harga
                      )}
                    </p>
                  ))}
                </td>
                <td className="px-6 py-1">
                  Rp{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    transaksiItem.detail_transaksi.reduce(
                      (total, detailItem) =>
                        total + detailItem.menu.harga * detailItem.jumlah,
                      0
                    )
                  )}
                </td>
                <td className="max-w-[50px] py-1">
                  {transaksiItem.status === "belum_bayar" ? (
                    <button
                      className="from-[#FF3B30] bg-gradient-to-r to  to-[#FFB673]  hover:bg-gradient-to-r text-white font-semibold leading-3 py-2 px-2 text-xs rounded-md"
                      onClick={() => handleToggleStatus(transaksiItem)}
                    >
                      Belum
                    </button>
                  ) : (
                    <button
                      className="max-w-[50px] text-green-400 font-bold text-2xl rounded-md"
                      onClick={() => handleToggleStatus(transaksiItem)}
                    >
                      <AiFillCheckSquare />
                    </button>
                  )}
                </td>
                <td className="pr-3 py-1">
                  {transaksiItem.status === "belum_bayar" ? (
                    ""
                  ) : (
                    <button
                      className="bg-slate-300 text-white font-bold py-2 px-4 rounded-md"
                      onClick={() => handlePrint(transaksiItem)}
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
            <div id="print-area" className="max-w-xl">
              <StrukPrint
                transaksiItem={selectedTransaksi}
                ref={componentRef}
              />
              <PrintButton />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Transaksi;
