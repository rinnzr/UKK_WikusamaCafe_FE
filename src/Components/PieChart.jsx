import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
const PieChart = ({ dataRange }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    datasets: [
      {
        data: dataRange.slice(0, 5).map((item) => item.jumlah),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(0, 0, 0, 0.2)",
        ],
      },
    ],
    labels: dataRange.slice(0, 5).map((item) => item.nama_menu),
  };

  return <Pie data={data} />;
};

export default PieChart;
