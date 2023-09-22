import { IoFastFoodSharp } from "react-icons/io5";
import { format, parseISO } from "date-fns";

const StrukPrint = ({ transaksiItem }) => {
  const formatISODate = (isoDateString) => {
    const dateObj = parseISO(isoDateString);
    const formattedDate = format(dateObj, "dd/MM/yyyy");
    const formattedTime = format(dateObj, "HH.mm.ss");
    return (
      <>
        <p>Date: {formattedDate}</p>
        <p>Time: {formattedTime}</p>
      </>
    );
  };
  return (
    <div className="struk-container pt-5 pb-20  w-80 mx-auto rounded-lg px-5 text-sm">
      <h2 className="text-center font-semibold text-base mb-4 ">
        <span className="flex text-sm w-fit mx-auto">
          {<IoFastFoodSharp />} <p>Foodie Cafe</p>{" "}
        </span>
        Struk Transaksi
      </h2>

      {/* Tampilkan informasi transaksi */}
      <p>{formatISODate(transaksiItem.updatedAt)}</p>
      <p>id transaksi: {transaksiItem.id_transaksi}</p>
      <p>No Meja: {transaksiItem.meja.nomor_meja}</p>
      <p>Chasier: {transaksiItem.user.nama_user}</p>
      <p className="text-center mb-4">
        Name Customer: <br /> {transaksiItem.nama_pelanggan}
      </p>

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
                total + detailItem.menu.harga * detailItem.jumlah * 0.1,
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
                total +
                detailItem.menu.harga * detailItem.jumlah * 0.1 +
                detailItem.menu.harga * detailItem.jumlah,
              0
            )
          )}
        </span>
      </p>
      <p className="text-center mt-10 text-lg font-semibold">
        Great Day Start With Coffe
      </p>
    </div>
  );
};

export default StrukPrint;
