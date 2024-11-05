import React, { useState } from "react";
import H from "../H&F/Header";
import F from "../H&F/Footer";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

const LaporanKeuangan = () => {
  const reportData = [
    { no: 1, tanggal: "21-08-2024", kategori: "Keluarga", keterangan: "Kiki", pemasukan: "Rp. 1,000,000,-", pengeluaran: "-" },
    { no: 2, tanggal: "21-07-2024", kategori: "Keperluan Kantor", keterangan: "Beli Alat Kantor", pemasukan: "-", pengeluaran: "Rp. 50,000,-" },
    { no: 3, tanggal: "20-06-2024", kategori: "Penjualan Aplikasi", keterangan: "Pembayaran Project", pemasukan: "Rp. 1,500,000,-", pengeluaran: "-" },
  ];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [filteredData, setFilteredData] = useState(reportData);

  const exportToExcel = async () => {
    const XLSX = await import("xlsx");
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");
    XLSX.writeFile(workbook, "LaporanKeuangan.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Laporan Pemasukan & Pengeluaran", 20, 20);

    let yOffset = 40;
    filteredData.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.tanggal} - ${item.kategori} - ${item.keterangan} - ${item.pemasukan} - ${item.pengeluaran}`,
        20,
        yOffset
      );
      yOffset += 10;
    });

    doc.save("LaporanKeuangan.pdf");
  };

  const handleFilter = (e) => {
    e.preventDefault();

    // Filter based on date range and category
    const filtered = reportData.filter((item) => {
      const itemDate = new Date(item.tanggal.split("-").reverse().join("-")); // Convert "DD-MM-YYYY" to "YYYY-MM-DD" for Date parsing
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // Check if the item's date falls within the range, and if the category matches
      const isWithinDateRange = (!start || itemDate >= start) && (!end || itemDate <= end);
      const isCategoryMatch = !category || category === item.kategori || category === "- Semua Kategori -";
      return isWithinDateRange && isCategoryMatch;
    });

    setFilteredData(filtered);
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
          <h2 className="text-lg font-semibold mb-4">Filter Laporan</h2>
          <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Mulai Tanggal</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Sampai Tanggal</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>- Semua Kategori -</option>
                <option>Keluarga</option>
                <option>Keperluan Kantor</option>
                <option>Penjualan Aplikasi</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div className="col-span-full">
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto">
                Tampilkan
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Laporan Pemasukan & Pengeluaran</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
            <div><strong>Dari Tanggal:</strong> {startDate || "N/A"}</div>
            <div><strong>Sampai Tanggal:</strong> {endDate || "N/A"}</div>
            <div><strong>Kategori:</strong> {category || "Semua Kategori"}</div>
          </div>

          <div className="flex space-x-2 mb-4">
            <button onClick={exportToPDF} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Cetak PDF
            </button>
            <button onClick={exportToExcel} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Export to Excel
            </button>
          </div>

          <table className="w-full border border-gray-200 text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">No</th>
                <th className="p-2 border">Tanggal</th>
                <th className="p-2 border">Kategori</th>
                <th className="p-2 border">Keterangan</th>
                <th className="p-2 border">Pemasukan</th>
                <th className="p-2 border">Pengeluaran</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.no} className="hover:bg-gray-100">
                  <td className="p-2 border">{item.no}</td>
                  <td className="p-2 border">{item.tanggal}</td>
                  <td className="p-2 border">{item.kategori}</td>
                  <td className="p-2 border">{item.keterangan}</td>
                  <td className="p-2 border">{item.pemasukan}</td>
                  <td className="p-2 border">{item.pengeluaran}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <F />
    </div>
  );
};

export default LaporanKeuangan;
