import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PrintButton = () => {
  const handlePrint = () => {
    const input = document.getElementById("print-area");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Foodie Cafe.pdf");
    });
  };

  return (
    <button
      className="from-[#F2E3DB]  bg-gradient-to-r to-[#c9a490] mt-20 rounded-lg text-white py-2 w-full"
      onClick={handlePrint}
    >
      Print struk
    </button>
  );
};

export default PrintButton;
