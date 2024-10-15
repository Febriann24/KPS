import React from 'react';
import H from "../H&F/Header";
import F from "../H&F/Footer";


const data = [
  {
    name: 'April Gunadi',
    loan: 'Rp 300.500,00',
    joinDate: '03/08/2024',
    type: 'Pinjaman',
    process: 'Baru',
  },
  {
    name: 'Benyamin Simanjuntak',
    loan: 'Rp 12.435.600,00',
    joinDate: '02/08/2024',
    type: 'Pinjaman',
    process: 'Diproses',
  },
  {
    name: 'April Gunadi',
    loan: 'Rp 450.000,00',
    joinDate: '01/04/2024',
    type: 'Pinjaman',
    process: 'Selesai',
  },
  {
    name: 'Benyamin Simanjuntak',
    loan: 'Rp 12.435.600,00',
    joinDate: '24/03/2024',
    type: 'Pinjaman',
    process: 'Ditolak',
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

  const getProcessColor = (process) => {
    switch (process) {
      case 'Baru':
        return 'bg-gray-300 text-gray-800'; 
      case 'Diproses':
        return 'bg-orange-300 text-orange-800'; 
      case 'Selesai':
        return 'bg-green-300 text-green-800'; 
      case 'Ditolak':
        return 'bg-red-300 text-red-800'; 
      default:
        return '';
    }
  };

  return (
    <table className="min-w-full bg-white border rounded-md mt-4">
      <thead>
        <tr>
          <th className="border p-2 text-center">Pengaju</th>
          <th className="border p-2 text-center">Nominal Uang</th>
          <th className="border p-2 text-center">Tanggal Pengajuan</th>
          <th className="border p-2 text-center">Jenis Pengajuan</th>
          <th className="border p-2 text-center">Proses</th>
          <th className="border p-2 text-center"></th> {}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
            <td className="border p-2">{row.name}</td>
            <td className="border p-2 text-center">{row.loan}</td>
            <td className="border p-2 text-center">{row.joinDate}</td>
            <td className="border p-2 text-center">{row.type}</td>
            <td className="border p-2 text-center">
              <span className={`inline-block px-2 py-1 rounded-md ${getProcessColor(row.process)}`}>
                {row.process}
              </span>
            </td>
            <td className="border p-2 text-center">
              <a href={`/User`} className="text-blue-500 hover:underline">
                Buka
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ListPengajuanUser = () => {
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

export default ListPengajuanUser;
