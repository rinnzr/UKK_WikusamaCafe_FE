import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL, config } from "../../../config";
import { useReactToPrint } from "react-to-print";
import Modal from "react-modal";
import PrintButton from "./PrintButton";
import { IoFastFoodSharp } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi"
import { filter } from "@chakra-ui/react";

// STRUK
const StrukPrint = ({ transaksiItem }) => {
  return (
    <div className="struk-container pt-10 pb-20  w-80 mx-auto rounded-lg px-5 text-sm">
      <h2 className="text-center my-4 font-semibold text-base ">
        <span className=" flex text-base text-amber-800 w-fit mx-auto mb-2 font-bold">
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
      <p>Customer: {transaksiItem.nama_pelanggan}</p>
      <p>No Meja  : {transaksiItem.meja.nomor_meja}</p>
      <p className="">Chasier: {transaksiItem.user.nama_user}</p>
      <p>------------------------------------</p>
      <ul className="justify-between">
        {transaksiItem.detail_transaksi.map((detailItem) => (
          <li
            key={detailItem.id_detail_transaksi}
            className="flex justify-between text-sm"
          >
            <ul>
              {detailItem.menu.nama_menu} ({detailItem.jumlah})
            </ul>
           
            <ul>Rp{" "}
            {new Intl.NumberFormat("id-ID").format(
                 detailItem.menu.harga * detailItem.jumlah,
              0
            
          )}</ul>
                  
          </li>
        ))}
      </ul>
      <p className="mt-2">------------------------------------</p>
      <p className="flex justify-between mt-3 font-bold text-lg">
        Total:{" "}
        <span>
          Rp{new Intl.NumberFormat("id-ID").format(
            transaksiItem.detail_transaksi.reduce(
              (total, detailItem) =>
                total + detailItem.menu.harga * detailItem.jumlah,
              0
            )
          )}
        </span>
      </p>
      {/* <p className="flex justify-between">
        PPN 10%:{" "}
        <span>
          Rp{new Intl.NumberFormat("id-ID").format(
            transaksiItem.detail_transaksi.reduce(
              (total, detailItem) =>
                total + detailItem.menu.harga * detailItem.jumlah * 0.1,
              0
            )
          )}
        </span>
      </p> */}

      {/* <p className="flex justify-between mt-3 font-bold text-lg">
        Total:{" "}
        <span>
          Rp
          {new Intl.NumberFormat("id-ID").format(
            transaksiItem.detail_transaksi.reduce(
              (total, detailItem) =>
                total +
                detailItem.menu.harga * detailItem.jumlah * 0.1 +
                detailItem.menu.harga * detailItem.jumlah,
              0
            )
          )}
        </span>
      </p> */}
      <p className="text-center mt-14 text-lg font-semibold">
        Great Day Start With Coffe
      </p>
    </div>
  );
};

// DAFTAR TRANSAKSI
const Transaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const componentRef = useRef();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchTransaksi();
  }, []);
  useEffect(() => {
    // Cek apakah user sudah login atau belum
    if (!localStorage.getItem("logged")) {
      navigate("/");
    } else {
      let id_user = localStorage.getItem("id_user");
      setUser(`${id_user}`);
    }
  }, [navigate]);
  const fetchTransaksi = async () => {
    try {
      const response = await axios.get(baseURL + "/transaksi", config);
      setTransaksi(response.data.data);
    } catch (error) {
      console.error(error);
    }
    // const userDataString = localStorage.getItem('namauser');
    // const userNameData = JSON.parse(userDataString);
    // const filteredData = transaksi.filter((item) => item.user.nama_user ===userNameData );
    // setFilteredData(filteredData);
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

  useEffect(() => {
    const filterData = () => {
      const filteredData = transaksi.filter(
        (item) =>
          item.user.nama_user.replace(
            item.user.nama_user,
            `"${item.user.nama_user}"`
          ) === localStorage.getItem("namauser")
      );
      setFilteredData(filteredData);
    };
    filterData();
  }, [transaksi]);

  return (
    <div className="max-w-full lg:px-8 h-screen overflow-hidden">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 flex justify-center">
        Daftar Transaksi
      </h1>
      <div className="shadow sm:rounded-lg overflow-y-scroll h-[90vh]">
        <table className="min-w-full  ">
          <thead className="bg-[#3F2305]">
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
              >
                Struk
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((transaksiItem, index) => (
              <tr
                key={transaksiItem.id_transaksi}
                className={`${index % 2 === 0 ? "bg-[#C8B6A6]" : ""}`}
              >
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
                      <li
                        key={detailItem.id_detail_transaksi}
                        className="text-xl font-medium"
                      >
                        {" "}
                        -
                        <span className="text-base font-normal">
                          {detailItem.menu.nama_menu} ({detailItem.jumlah})
                        </span>
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
                  {transaksiItem.status === "lunas" ? (
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
                      onClick={() => handlePrint(transaksiItem)}
                    >
                      <FiPrinter />
                    </button>
                  ) : (
                    ""
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
