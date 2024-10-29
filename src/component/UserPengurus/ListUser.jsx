import React, { useEffect, useState } from 'react';
import axios from 'axios';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { Link } from 'react-router-dom';

const SearchFilterBar = ({ filterCriteria, setFilterCriteria, handleSearch, handleFilter }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-sm">
      <div className="flex items-center space-x-4 w-full">
        <select
          className="border p-2 rounded-md bg-white"
          value={filterCriteria.selectedOption}
          onChange={(e) => setFilterCriteria({ ...filterCriteria, selectedOption: e.target.value })}
        >
          <option value="">Nama</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={filterCriteria.searchTerm}
          onChange={(e) => setFilterCriteria({ ...filterCriteria, searchTerm: e.target.value })}
          className="border p-2 rounded-md w-1/2"
        />
        <button onClick={handleSearch} className="p-2 bg-teal-500 text-white rounded-md">Search</button>
      </div>
      <FilterButton handleFilter={handleFilter} />
    </div>
  );
};

const FilterButton = ({ handleFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // State to track sort order

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSort = (order) => {
    setSortOrder(order);
    handleFilter(order); // Pass the order to the parent function
    setIsOpen(false); // Close the menu after selecting an option
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="p-2 bg-teal-500 text-white rounded-md">Filter</button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
          <button onClick={() => handleSort('asc')} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Ascending</button>
          <button onClick={() => handleSort('desc')} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Descending</button>
        </div>
      )}
    </div>
  );
};

const DataTable = ({ data, onSort }) => {
  return (
    <table className="min-w-full bg-white border rounded-md mt-4">
      <thead>
        <tr>
          <th className="border p-2 text-center cursor-pointer" onClick={() => onSort('NAMA_LENGKAP')}>Nama</th>
          <th className="border p-2 text-center cursor-pointer" onClick={() => onSort('createdAt')}>Waktu Bergabung</th>
          <th className="border p-2 text-center cursor-pointer" onClick={() => onSort('loan')}>Pinjaman</th>
          <th className="border p-2 text-center cursor-pointer" onClick={() => onSort('savings')}>Tabungan</th>
          <th className="border p-2 text-center cursor-pointer" onClick={() => onSort('principalSavings')}>Simpanan Pokok</th>
          <th className="border p-2 text-center"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
            <td className="border p-2">{row.NAMA_LENGKAP}</td>
            <td className="border p-2 text-center">{new Date(row.createdAt).toLocaleDateString()}</td>
            <td className="border p-2 text-center">{row.loan || 'N/A'}</td>
            <td className="border p-2 text-center">{row.savings || 'N/A'}</td>
            <td className="border p-2 text-center">{row.principalSavings || 'N/A'}</td>
            <td className="border p-2 text-center">
              <Link to="/ListPengajuanUser" className="text-blue-500 hover:underline">Buka</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ListUser = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // New state for original data
  const [filterCriteria, setFilterCriteria] = useState({ selectedOption: '', searchTerm: '' });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' }); // New state for sorting

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setData(response.data);
        setOriginalData(response.data); // Store the original data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle filtering data
  const handleSearch = () => {
    const filteredData = originalData.filter((row) => {
      const matchesSearchTerm = row.NAMA_LENGKAP.toLowerCase().includes(filterCriteria.searchTerm.toLowerCase());
      const matchesSelectedOption = filterCriteria.selectedOption ? row.someField === filterCriteria.selectedOption : true; // Replace 'someField' with the actual field to filter by
      return matchesSearchTerm && matchesSelectedOption;
    });
    setData(filteredData);
  };

  // Function to handle sorting data by column
  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc'; // Toggle direction
    }
    setSortConfig({ key: column, direction });
    
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  // Function to handle sorting for all data on Filter button click
  const handleFilter = (order) => {
    const columnToSort = 'createdAt'; // Replace with your desired column for filtering

    const sortedData = [...originalData].sort((a, b) => {
      if (a[columnToSort] < b[columnToSort]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[columnToSort] > b[columnToSort]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full">
        <H />
      </div>

      <div className="container mx-auto p-4 flex-grow">
        <SearchFilterBar 
          filterCriteria={filterCriteria} 
          setFilterCriteria={setFilterCriteria} 
          handleSearch={handleSearch} 
          handleFilter={handleFilter} 
        />
        {data.length > 0 ? <DataTable data={data} onSort={handleSort} /> : <p>No data available.</p>}
      </div>

      <div className="w-full">
        <F />
      </div>
    </div>
  );
};

export default ListUser;
