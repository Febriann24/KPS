import React, { useState, useEffect } from "react";
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { jsPDF } from "jspdf";
import axios from "axios";
import { formatRupiah } from '../../utils/utils';

const LaporanKeuangan = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    const fetchFinancialStatementData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getFinancialStatementData");
        console.log("Financial Data:", response.data);
        if (response.data && Array.isArray(response.data.financialData)) {
          setReportData(response.data.financialData);
        } else {
          console.error("Data is not an array or financialData is missing:", response.data);
        }
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };
  
    fetchFinancialStatementData();
  }, []);   

  const handleFilter = (e) => {
    e.preventDefault();

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    console.log("Start Date Obj:", startDateObj);
    console.log("End Date Obj:", endDateObj);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        console.error("Invalid dates");
        return;
    }

    startDateObj.setHours(0, 0, 0, 0);
    endDateObj.setHours(23, 59, 59, 999);

    const filtered = reportData.filter((item) => {
      const itemDate = new Date(item.createdAt);
      console.log("Item Date:", item.createdAt);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate >= startDateObj && itemDate <= endDateObj;
    });
    

    setFilteredData(filtered);
    setIsFilterApplied(true);
  };

  const getTotalPinjaman = () => {
    return filteredData.reduce((acc, curr, index) => {
      const pinjaman = parseFloat(curr.TOTAL_AMOUNT_PINJAMAN) || 0;
      console.log(`Index: ${index}, Pinjaman: ${pinjaman}, Acc: ${acc}`);
      return acc + pinjaman;
    }, 0);
  };

  const getTotalSimpanan = () => {
    return filteredData.reduce((acc, curr, index) => {
      const simpanan = parseFloat(curr.TOTAL_AMOUNT_SIMPANAN) || 0;
      console.log(`Index: ${index}, Simpanan: ${simpanan}, Acc: ${acc}`);
      return acc + simpanan;
    }, 0);
  };

  const getTotalPemasukkan = () => {
    return filteredData.reduce((acc, curr, index) => {
      const income = parseFloat(curr.TOTAL_INCOME) || 0;
      console.log(`Index: ${index}, Income: ${income}, Acc: ${acc}`);
      return acc + income;
    }, 0);
  };

  const getTotalPengeluaran = () => {
    return filteredData.reduce((acc, curr, index) => {
      const expenditure = parseFloat(curr.TOTAL_EXPENDITURE) || 0;
      console.log(`Index: ${index}, Expenditure: ${expenditure}, Acc: ${acc}`);
      return acc + expenditure;
    }, 0);
  };

  const exportToExcel = async () => {
    console.log("startDate:", startDate, "endDate:", endDate);
    const XLSX = await import("xlsx");

    const formatDate = (date) => {
      if (!date) return "-";  
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return "-";  
      const month = dateObj.toLocaleString("id-ID", { month: "long" });
      const year = dateObj.getFullYear();
      return `${month} ${year}`;
    };
  
    const pemasukkan = getTotalPemasukkan();
    const pengeluaran = getTotalPengeluaran();
    const shu = pemasukkan - pengeluaran;

    const reportPeriod = `Periode ${formatDate(startDate)} - ${formatDate(endDate)}`;
    const worksheetData = [
      ["Koperasi Simpan Pinjam Wiyata Mandala"],
      ["Laporan Keuangan"],
      [reportPeriod],
      [],
      ["Pinjaman", `Rp ${formatRupiah(getTotalPinjaman().toString())}`],
      ["Simpanan", `Rp ${formatRupiah(getTotalSimpanan().toString())}`],
      ["Pemasukkan", `Rp ${formatRupiah(pemasukkan.toString())}`],
      ["Pengeluaran", `Rp ${formatRupiah(pengeluaran.toString())}`],
      ["Sisa Hasil Usaha (SHU)", `Rp ${formatRupiah(shu.toString())}`],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

    const headerStyle = { font: { bold: true } };
    worksheet["A1"].s = headerStyle;
    worksheet["A2"].s = headerStyle;
    worksheet["A3"].s = headerStyle;

    XLSX.writeFile(workbook, "LaporanKeuangan.xlsx");
  };

  const exportToPDF = () => {
    console.log("startDate:", startDate, "endDate:", endDate);
    const doc = new jsPDF();

    const formatDate = (date) => {
      if (!date) return "-";  
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return "-";  
      const month = dateObj.toLocaleString("id-ID", { month: "long" });
      const year = dateObj.getFullYear();
      return `${month} ${year}`;
    };
  
    const pemasukkan = getTotalPemasukkan();
    const pengeluaran = getTotalPengeluaran();
    const shu = pemasukkan - pengeluaran;

    let reportPeriod = "";
    if (!startDate && !endDate) {
      reportPeriod = "Periode Semua Data";
    } else {
      reportPeriod = `Periode ${formatDate(startDate)} - ${formatDate(endDate)}`;  
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Koperasi Simpan Pinjam Wiyata Mandala", 105, 10, null, null, "center");
    doc.setFontSize(12);
    doc.text("Laporan Keuangan", 105, 16, null, null, "center");
    doc.text(reportPeriod, 105, 22, null, null, "center");

    doc.setFont("helvetica", "bold");
    doc.text("Pinjaman", 20, 35);
    doc.text(`Rp ${formatRupiah(getTotalPinjaman().toString())}`, 140, 35, null, null, "right");

    doc.text("Simpanan", 20, 50);
    doc.text(`Rp ${formatRupiah(getTotalSimpanan().toString())}`, 140, 50, null, null, "right");

    doc.text("Pemasukkan", 20, 65);
    doc.text(`Rp ${formatRupiah(pemasukkan.toString())}`, 140, 65, null, null, "right");

    doc.text("Pengeluaran", 20, 80);
    doc.text(`Rp ${formatRupiah(pengeluaran.toString())}`, 140, 80, null, null, "right");

    doc.text("Sisa Hasil Usaha (SHU)", 20, 95);
    doc.text(`Rp ${formatRupiah(shu.toString())}`, 140, 95, null, null, "right");

    doc.save("LaporanKeuangan.pdf");
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <H />
      <main className="flex-grow p-4">
        <header className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white p-4 rounded-lg flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">LAPORAN</h1>
          <span>Data Laporan</span>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Laporan</h2>
          <form onSubmit={handleFilter}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="startDate" className="block mb-2 font-semibold">
                  Tanggal Awal
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block mb-2 font-semibold">
                  Tanggal Akhir
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">
              Filter Data
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">No</th>
                <th className="px-4 py-2 text-left">Tipe</th>
                <th className="px-4 py-2 text-left">Uang</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {index === 0 && "Total Pinjaman"}
                    {index === 1 && "Total Simpanan"}
                    {index === 2 && "Total Pemasukan"}
                    {index === 3 && "Total Pengeluaran"}
                  </td>
                  <td className="px-4 py-2">
                    {index === 0 && "RP " + formatRupiah(filteredData.reduce((sum, item) => sum + parseFloat(item.TOTAL_AMOUNT_PINJAMAN || 0), 0).toString())}
                    {index === 1 && "RP " + formatRupiah(filteredData.reduce((sum, item) => sum + parseFloat(item.TOTAL_AMOUNT_SIMPANAN || 0), 0).toString())}
                    {index === 2 && "RP " + formatRupiah(filteredData.reduce((sum, item) => sum + parseFloat(item.TOTAL_INCOME || 0), 0).toString())}
                    {index === 3 && "RP " + formatRupiah(filteredData.reduce((sum, item) => sum + parseFloat(item.TOTAL_EXPENDITURE || 0), 0).toString())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-start mt-6">
  <button
    onClick={exportToExcel}
    className={`bg-green-500 text-white p-2 rounded-md mr-4 transition-opacity duration-300 ${
      isFilterApplied ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
    }`}
    disabled={!isFilterApplied} // Disable button when filter isn't applied
  >
    Export Excel
  </button>
  <button
    onClick={exportToPDF}
    className={`bg-blue-600 text-white p-2 rounded-md transition-opacity duration-300 ${
      isFilterApplied ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
    }`}
    disabled={!isFilterApplied} // Disable button when filter isn't applied
  >
    Export PDF
  </button>
</div>

      </main>
      <F />
    </div>
  );
};

export default LaporanKeuangan;