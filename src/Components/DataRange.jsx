import React from "react";

const DataRange = ({ rangeData, tittle }) => {
  return (
    <>
      <p className="italic py-2 font-semibold text-lg  text-neutral-600">
        {tittle}
      </p>
      <table className="text-sm w-full ring-neutral-200 rounded-lg ring-1">
        <thead className="h-10 rounded-t-md">
          <td className="text-center">No</td>
          <td>Nama Makanan</td>
          <td>Jumlah</td>
        </thead>
        <tbody>
          {rangeData.slice(0, 5).map((item, idx) => (
            <tr key={idx} className={`h-8 ${idx === 0 ? "bg-yellow-200" : ""}`}>
              <td className="text-center font-semibold">{idx + 1}</td>
              <td>{item.nama_menu}</td>
              <td>{item.jumlah}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DataRange;
