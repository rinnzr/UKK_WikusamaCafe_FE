import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PrintButton = ({ nama }) => {
  const handlePrint = () => {
    const input = document.getElementById("print-area");

    const inputWidth = input.offsetWidth;
    const inputHeight = input.offsetHeight;

    html2canvas(input, { width: inputWidth, height: inputHeight }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          unit: "px",
          format: [inputWidth + 40, inputHeight + 80],
        });

        pdf.addImage(imgData, "PNG", 20, 40, inputWidth, inputHeight);

        pdf.save(`struk_foodie_coffee_${nama}.pdf`);
        pdf.autoPrint();
        pdf.output("dataurlnewwindow");
      }
    );
  };

  return (
    <button
      className="bg-teal-500 my-4 rounded-lg text-white py-2 w-full"
      onClick={handlePrint}
    >
      Print struk
    </button>
  );
};

export default PrintButton;