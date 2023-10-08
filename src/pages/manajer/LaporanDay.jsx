import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, config } from "../../config";
const LaporanDay = () => {
  const bulan = "09";
  const tahun = "2023";

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const response = await axios.get(baseURL + "/transaksi", config);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransaksi();
  }, []);

  console.log("filtered bulan", data);

  return (
    <div className="h-screen overflow-y-scroll">
      <h1>Data Transaksi</h1>
      {data.length}
      {/* <ul>
        {data.map((transaksi) => (
          <li key={transaksi.id}>{transaksi.tgl_transaksi}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default LaporanDay;
