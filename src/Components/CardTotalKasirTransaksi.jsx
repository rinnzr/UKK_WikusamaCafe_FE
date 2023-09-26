import React from "react";

const CardTotalKasirTransaksi = ({ namaKasir, jumlahTransaksi, idx }) => {
  let backgroundColorClass = "";
  if (idx % 3 === 0) {
    backgroundColorClass = "bg-green-50";
  } else if (idx % 3 === 1) {
    backgroundColorClass = "bg-red-50";
  } else {
    backgroundColorClass = "bg-yellow-50";
  }
  return (
    <div
      className={`flex justify-between w-full  border rounded-lg border-neutral-300 items-center p-2 ${backgroundColorClass}`}
    >
      <div>
        <p className="text-red text-2xl font-semibold text-neutral-600 capitalize">
          {namaKasir}
        </p>
        <p className="text-neutral-400 font-medium -mt-1">
          {" "}
          Kasir: &nbsp;{idx}
        </p>
      </div>
      <div className="bg-white text-3xl w-24 h-24 rounded-md font-semibold flex flex-col items-center justify-center">
        <p> {jumlahTransaksi}</p>
        <p className="text-[10px]">PENJUALAN</p>
      </div>
    </div>
  );
};

export default CardTotalKasirTransaksi;
