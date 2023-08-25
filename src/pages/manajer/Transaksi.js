import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseURL, config } from "../../config";
import { useReactToPrint } from "react-to-print";
import Modal from "react-modal";
import { IoFastFoodSharp } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi"
import PrintButton from "../kasir/Transaksi/PrintButton";


const StrukPrint = ({ transaksiItem }) => {
  return (
    <div className="struk-container pt-10 pb-20  w-80 mx-auto rounded-lg px-5 text-sm">
      <h2 className="text-center my-4 font-semibold text-base ">
        <span className=" flex text-sm w-fit mx-auto">
          {<IoFastFoodSharp />} <p>Foodie Cafe</p>{" "}
        </span>
        Struk Transaksi
      </h2>

      {/* Tampilkan informasi transaksi */}
      <p>
        Date:{" "}
        {new Intl.DateTimeFormat("id-ID").format(
          new Date(transaksiItem.tgl_transaksi)
        )}
      </p>
      <p>Name Customer: {transaksiItem.nama_pelanggan}</p>
      <p>No: {transaksiItem.meja.nomor_meja}</p>
      <p className="mb-4">Chasier: {transaksiItem.user.nama_user}</p>
      <p>-------------------------------</p>
      <h3>Menu:</h3>
      <ul>
        {transaksiItem.detail_transaksi.map((detailItem) => (
          <li
            key={detailItem.id_detail_transaksi}
            className="flex justify-between text-sm"
          >
            <ul>
              {detailItem.menu.nama_menu} ({detailItem.jumlah})
            </ul>
            <ul> {detailItem.menu.harga}</ul>
          </li>
        ))}
      </ul>
      <p>-------------------------------</p>
      <p className="flex justify-between">
        SubTotal:{" "}
        <span>
          {new Intl.NumberFormat("id-ID").format(
            transaksiItem.detail_transaksi.reduce(
              (total, detailItem) =>
                total + detailItem.menu.harga * detailItem.jumlah,
              0
            )
          )}
        </span>
      </p>
      <p className="flex justify-between">
        PPN 10%:{" "}
        <span>
          {new Intl.NumberFormat("id-ID").format(
            transaksiItem.detail_transaksi.reduce(
              (total, detailItem) =>
                (total + detailItem.menu.harga * detailItem.jumlah *0.1),
              0
            )
          )}
        </span>

      </p>
      
      <p className="flex justify-between">
        Total:{" "}
        <span>
          Rp
          {new Intl.NumberFormat("id-ID").format(
            transaksiItem.detail_transaksi.reduce(
              (total, detailItem) =>
                (total + detailItem.menu.harga * detailItem.jumlah*0.1) + (detailItem.menu.harga * detailItem.jumlah),
              0
            )
          )}
        </span>

      </p>
      <p className="text-center mt-10 text-lg font-semibold">Great Day Start With Coffe</p>
    
    </div>
  );
};

// DAFTAR TRANSAKSI
const TransaksiManajer = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const componentRef = useRef();

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
  };

  const handlePrint = (transaksiItem) => {
    setSelectedTransaksi(transaksiItem);
    setShowPrintModal(true);
  };  

  const handleAfterPrint = () => {
    setShowPrintModal(false);
  };

  const handlePrintButtonClick = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: handleAfterPrint,
  });

  return (
    <div className="flex pr-4 w-full ">
      <div className="w-full h-full">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6 flex justify-center">
        Daftar Transaksi
      </h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Print Struk
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transaksi.map((transaksiItem, index) => (
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
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                      onClick={() => handleToggleStatus(transaksiItem)}
                    >
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
                    onClick={() => handlePrint(transaksiItem)}
                  >
                   <FiPrinter/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Print */}
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
    </div>
  );
};

export default TransaksiManajer;
