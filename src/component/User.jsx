import React from 'react';
import H from "./H&F/Header";
import F from "./H&F/Footer";

const data = [
  {
    name: 'April Gunadi',
    joinDate: '21/09/2023',
    loan: 'Rp 300.500,00',
    savings: 'Rp 12.000.000,00',
    principalSavings: 'Memenuhi',
  },
  {
    name: 'Benyamin Simanjuntak',
    joinDate: '07/08/2024',
    loan: 'Rp 12.435.600,00',
    savings: 'Rp 12.435.600,00',
    principalSavings: 'Memenuhi',
  },
];

const SearchFilterBar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-sm">
      <div className="flex items-center space-x-4 w-full">
        <select className="border p-2 rounded-md bg-white">
          <option value="">Nama</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md w-1/2"
        />
        <button className="p-2 bg-teal-500 text-white rounded-md">Search</button>
      </div>
      <button className="p-2 bg-teal-500 text-white rounded-md">Filter</button>
    </div>
  );
};

const DataTable = () => {
  return (
    <table className="min-w-full bg-white border rounded-md mt-4">
      <thead>
        <tr>
          <th className="border p-2 text-center">Nama</th>
          <th className="border p-2 text-center">Waktu Bergabung</th>
          <th className="border p-2 text-center">Pinjaman</th>
          <th className="border p-2 text-center">Tabungan</th>
          <th className="border p-2 text-center">Simpanan Pokok</th>
          <th className="border p-2 text-center"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
            <td className="border p-2">{row.name}</td>
            <td className="border p-2 text-center">{row.joinDate}</td>
            <td className="border p-2 text-center">{row.loan}</td>
            <td className="border p-2 text-center">{row.savings}</td>
            <td className="border p-2 text-center">{row.principalSavings}</td>
            <td className="border p-2 text-center">
              {}
              <a href={`/Pengajuan`} className="text-blue-500 hover:underline">
                Buka
              </a>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
  );
};

const User = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full">
        <H />
      </div>

      <div className="container mx-auto p-4 flex-grow">
        <SearchFilterBar />
        <DataTable />
      </div>

      <div className="w-full">
        <F />
      </div>
    </div>
  );
};

export default User;
