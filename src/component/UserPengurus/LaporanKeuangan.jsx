import React, { useState } from "react";
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { jsPDF } from "jspdf";

const LaporanKeuangan = () => {
  const reportData = [
    { no: 1, tipe: "KPKA", masuk: "Rp. 1,000", keluar: "Rp. 2,000", tanggal: "2024-10-19" },
    { no: 2, tipe: "USP", masuk: "Rp. 1,000", keluar: "Rp. 2,000", tanggal: "2024-09-19" },
    { no: 3, tipe: "UKTP", masuk: "Rp. 1,000", keluar: "Rp. 2,000", tanggal: "2024-08-19" },
    { no: 4, tipe: "Simpanan Pokok", masuk: "Rp. 1,000", keluar: "Rp. 2,000", tanggal: "2024-07-19" },
    { no: 5, tipe: "Simpanan Wajib", masuk: "Rp. 1,000", keluar: "Rp. 2,000", tanggal: "2024-08-19" },
    { no: 6, tipe: "Simpanan Hari Raya", masuk: "Rp. 1,000", keluar: "Rp. 2,000", tanggal: "2024-11-19" },
    { no: 7, tipe: "Simpanan Sukarela", masuk: "Rp. 1,000", keluar: "Rp. 2,000", tanggal: "2024-10-19" }
];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [filteredData, setFilteredData] = useState(reportData);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const exportToExcel = async (startDate, endDate) => {
    const XLSX = await import("xlsx");

const formatDate = (date) => {
  if (!date || isNaN(new Date(date).getTime())) return "-";
  const options = { year: "numeric", month: "long" };
  return new Date(date).toLocaleDateString("id-ID", options);
};

    const reportPeriod = `Periode ${formatDate(startDate)} - ${formatDate(endDate)}`;
    const worksheetData = [
        ["Koperasi Simpan Pinjam Wiyata Mandala"],
        ["Laporan Keuangan"],
        [reportPeriod],
        [],
        ["Pendapatan"],
        ["", "Penjualan Bersih", "Rp 460.000.000,00"],
        ["", "Pendapatan Bunga", "Rp 2.800.000,00"],
        ["", "Keuntungan atas pelepasan aset tetap", "Rp 800.000,00"],
        ["", "Total Pendapatan", "Rp 463.600.000,00"],
        [],
        ["Pengeluaran"],
        ["", "Harga Pokok Penjualan", "Rp 316.000.000,00"],
        ["", "Biaya Beban Operasional", "Rp 114.000.000,00"],
        ["", "Beban Bunga", "Rp 1.700.000,00"],
        ["", "Kerugian akibat kerusakan", "Rp 300.000,00"],
        ["", "Total Pengeluaran", "Rp 432.000.000,00"],
        [],
        ["Pendapatan Bersih", "", "Rp 31.000.000,00"]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

    const headerStyle = { font: { bold: true } };
    worksheet["A1"].s = headerStyle;
    worksheet["A2"].s = headerStyle;
    worksheet["A3"].s = headerStyle;

    worksheetData.forEach((row, rowIndex) => {
        if (row[0] === "Pendapatan" || row[0] === "Pengeluaran" || row[0] === "Pendapatan Bersih") {
            const cell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
            if (worksheet[cell]) worksheet[cell].s = headerStyle;
        }
    });
    XLSX.writeFile(workbook, "LaporanKeuangan.xlsx");
};
const exportToPDF = (startDate, endDate) => {
  const doc = new jsPDF();

  const formatDate = (date) => {
      if (!date || isNaN(new Date(date).getTime())) return "-";
      const options = { year: "numeric", month: "long" };
      return new Date(date).toLocaleDateString("id-ID", options);
  };

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
  doc.text("Pendapatan", 20, 35);

  doc.setFont("helvetica", "normal");
  doc.text("Penjualan Bersih", 30, 43);
  doc.text("Rp 460.000.000,00", 140, 43, null, null, "right");

  doc.text("Pendapatan Bunga", 30, 50);
  doc.text("Rp 2.800.000,00", 140, 50, null, null, "right");

  doc.text("Keuntungan atas pelepasan aset tetap", 30, 57);
  doc.text("Rp 800.000,00", 140, 57, null, null, "right");

  doc.setFont("helvetica", "bold");
  doc.text("Total Pendapatan", 30, 65);
  doc.text("Rp 463.600.000,00", 140, 65, null, null, "right");

  doc.setFont("helvetica", "bold");
  doc.text("Pengeluaran", 20, 80);

  doc.setFont("helvetica", "normal");
  doc.text("Harga Pokok Penjualan", 30, 88);
  doc.text("Rp 316.000.000,00", 140, 88, null, null, "right");

  doc.text("Biaya Beban Operasional", 30, 95);
  doc.text("Rp 114.000.000,00", 140, 95, null, null, "right");

  doc.text("Beban Bunga", 30, 102);
  doc.text("Rp 1.700.000,00", 140, 102, null, null, "right");

  doc.text("Kerugian akibat kerusakan", 30, 109);
  doc.text("Rp 300.000,00", 140, 109, null, null, "right");

  doc.setFont("helvetica", "bold");
  doc.text("Total Pengeluaran", 30, 117);
  doc.text("Rp 432.000.000,00", 140, 117, null, null, "right");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 0, 0);
  doc.text("Pendapatan Bersih", 30, 130);
  doc.text("Rp 31.000.000,00", 140, 130, null, null, "right");

  doc.save("LaporanKeuangan.pdf");
};

const handleFilter = (e) => {
  e.preventDefault();

  if (!startDate || !endDate) {
    console.error("Start Date and End Date must be provided");
    return;
  }

  if (
    (isNaN(new Date(startDate).getTime())) ||
    (isNaN(new Date(endDate).getTime()))
  ) {
    console.error("Invalid dates");
    return;
  }

  const filtered = reportData.filter((item) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const itemDate = new Date(item.tanggal);

    const isAfterStart = itemDate >= startDateObj;
    const isBeforeEnd = itemDate <= endDateObj;

    return isAfterStart && isBeforeEnd;
  });

  setFilteredData(filtered);
  setIsFilterApplied(true); 
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
          <div><strong>Dari Tanggal:</strong> {startDate || "Semua Data"}</div>
          <div><strong>Sampai Tanggal:</strong> {endDate || "Semua Data"}</div>
          <div><strong>Kategori:</strong> {category || "Semua Kategori"}</div>
          </div>

          <div className="flex space-x-2 mb-4">
          <button
              onClick={() => exportToPDF(startDate, endDate)}
              disabled={!isFilterApplied}
              className={`py-2 px-4 rounded ${
                !isFilterApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Cetak PDF
            </button>
            <button
              onClick={() => exportToExcel(startDate, endDate)}
              disabled={!isFilterApplied}
              className={`py-2 px-4 rounded ${
                !isFilterApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Cetak Excel
            </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">No</th>
                <th className="px-4 py-2 text-left">Tipe</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Masuk</th>
                <th className="px-4 py-2 text-left">Keluar</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{item.no}</td>
                  <td className="px-4 py-2">{item.tipe}</td>
                  <td className="px-4 py-2">{item.tanggal}</td>
                  <td className="px-4 py-2">{item.masuk}</td>
                  <td className="px-4 py-2">{item.keluar}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </main>
      <F />
    </div>
  );
};

export default LaporanKeuangan;
