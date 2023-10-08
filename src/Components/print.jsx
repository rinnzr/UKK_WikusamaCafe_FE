import { format, parseISO } from "date-fns";

const StrukPrint = ({ item }) => {
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

  return (
    <div className=" min-h-fit  w-80 mx-auto rounded-lg px-5 text-sm ">
      <h2 className="text-center font-semibold text-base mb-4 ">
        <span className="flex text-sm w-20 mx-auto">
          <img src={"/logo1.png"} alt="" className={`mx-auto"w-12" `} />
        </span>
        Struk Transaction
      </h2>

      {/* Tampilkan informasi transaksi */}
      <p>{formatISODate(item.updatedAt)}</p>
      <p>id transaksi: {item.id_transaksi}</p>
      <p>No Meja: {item.meja.nomor_meja}</p>
      <p>Chasier: {item.user.nama_user}</p>
      <p className="text-center mb-4">
        Name Customer: <br /> {item.nama_pelanggan}
      </p>

      <p>-------------------------------</p>
      <h3>Menu:</h3>
      <ul>
        {item.detail_transaksi.map((detailItem) => (
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
            item.detail_transaksi.reduce(
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
            item.detail_transaksi.reduce(
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
            item.detail_transaksi.reduce(
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
