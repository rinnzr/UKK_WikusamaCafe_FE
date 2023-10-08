import * as React from "react";
import axios from "axios";
import { baseURL, config } from "../../config";
import { format, parseISO } from "date-fns";
import Modal from "react-modal";
import { AiFillCheckSquare, AiOutlineClose } from "react-icons/ai";
import { BsFillPrinterFill } from "react-icons/bs";
import StrukPrint from "../../Components/print";
import PrintButton from "../../Components/PrintButton";

const HistoryTransaction = () => {
  const [transaksi, setTransaksi] = React.useState([]);
  const [showPrintModal, setShowPrintModal] = React.useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = React.useState(null);
  const componentRef = React.useRef();

  React.useEffect(() => {
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
  const getOverlayRef = () => {
    return document.getElementById("my-overlay-element"); // Ganti dengan ID elemen overlay yang sesuai
  };

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
      <h1 className="text-3xl  font-semibold text-gray-900 py-3  flex justify-between">
        Transaction HistoryTransaction
        <span className="text-lg bg-teal-500 text-white p-2">
          Transaction Count &nbsp;
          {sortedData.length}
        </span>
      </h1>
      <div className="shadow overflow-hidden border-b border-gray-200  max-h-[90vh]  overflow-y-scroll  ">
        <table className="min-w-full divide-y text-xs divide-gray-200">
          <thead className="bg-teal-500 text-[10px] tracking-wider uppercase font-medium sticky top-0 text-white  text-center w-full">
            <tr>
              <th className="py-3 px-2 text-center max-w-fit ">No</th>
              <th className=" max-w-[4.4rem]">Nama Pelanggan</th>
              <th className="  text-center max-w-fit">Chasier</th>
              <th className="px-2  max-w-fit ">Waktu Transaksi</th>
              <th className=" text-center max-w-[50px] ">No Meja</th>
              <th className="">Menu & jumlah</th>
              <th className=" px-2">Harga Satuan</th>
              <th className="px-6 ">Total</th>
              <th>Status Bayar</th>
              <th className="w-2  px-2    ">Struk</th>
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
                <td className=" text-center ">{index + 1}</td>
                <td className=" max-w-[4rem] truncate text-center">
                  {item.nama_pelanggan}
                </td>
                <td className=" text-center ">{item.user.nama_user}</td>
                <td className=" text-center">
                  <h1>{formatISODate(item.updatedAt)}</h1>
                </td>
                <td className="px-6  text-center">{item.meja.nomor_meja}</td>

                <td className="py-4">
                  <ul>
                    <>
                      {item.detail_transaksi.map(
                        (detailItem) =>
                          detailItem.jumlah !== 0 && (
                            <li key={detailItem.id_detail_transaksi}>
                              <span>-{detailItem.menu.nama_menu}</span>
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
                        <p key={detailItem.id_detail_transaksi}>
                          Rp.
                          {new Intl.NumberFormat("id-ID").format(
                            detailItem.menu.harga
                          )}
                        </p>
                      )
                  )}
                </td>
                <td className="px-6 ">
                  Rp
                  {new Intl.NumberFormat("id-ID").format(
                    item.detail_transaksi.reduce(
                      (total, detailItem) =>
                        total + detailItem.menu.harga * detailItem.jumlah,
                      0
                    )
                  )}
                </td>
                <td className="max-w-[50px] ">
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
        overlayRef={getOverlayRef}
        onRequestClose={() => setShowPrintModal(false)}
        className="w-fit items-center h-full flex flex-col justify-center  border-neutral-600 mx-auto"
      >
        <div className="overflow-y-scroll  h-[80vh]">
          {selectedTransaksi && (
            <>
              <div>
                <PrintButton nama={selectedTransaksi.nama_pelanggan} />
                <div id="print-area" className="min-h-fit pb-10 bg-white">
                  <StrukPrint item={selectedTransaksi} ref={componentRef} />
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default HistoryTransaction;
