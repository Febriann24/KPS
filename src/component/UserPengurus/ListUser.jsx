import React, { useEffect, useState } from 'react';
import axios from 'axios';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { Link } from 'react-router-dom';

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

const DataTable = ({ data }) => {
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
            <td className="border p-2">{row.NAMA_LENGKAP}</td>
            <td className="border p-2 text-center">{new Date(row.TANGGAL_LAHIR).toLocaleDateString()}</td>
            <td className="border p-2 text-center">{row.loan || 'N/A'}</td>
            <td className="border p-2 text-center">{row.savings || 'N/A'}</td>
            <td className="border p-2 text-center">{row.principalSavings || 'N/A'}</td>
            <td className="border p-2 text-center">
              <Link to="/ListPengajuanUser" className="text-blue-500 hover:underline">
                Buka
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ListUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full">
        <H />
      </div>

      <div className="container mx-auto p-4 flex-grow">
        <SearchFilterBar />
        <DataTable data={data} />
      </div>

      <div className="w-full">
        <F />
      </div>
    </div>
  );
};

export default ListUser;
