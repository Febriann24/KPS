import React, { useEffect, useState } from 'react';
import axios from 'axios';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { Link } from 'react-router-dom';
import { formatRupiah } from '../../utils/utils';

const SearchFilterBar = ({ filterCriteria, setFilterCriteria, handleSearch, handleFilter }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-sm">
      <div className="flex items-center space-x-4 w-full">
        <select
          className="border p-2 rounded-md bg-white"
          value={filterCriteria.selectedOption}
          onChange={(e) => setFilterCriteria({ ...filterCriteria, selectedOption: e.target.value })}
        >
          <option value="semua">Semua Data</option>
          <option value="NAMA_LENGKAP">Nama</option>
          <option value="createdAt">Waktu Bergabung</option>
          <option value="TR_PENGAJUAN_PINJAMANs">Pinjaman</option>
          <option value="TR_PENGAJUAN_SIMPANANs">Tabungan</option>
          <option value="principalSavings">Simpanan</option>
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
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSort = (order) => {
    setSortOrder(order);
    handleFilter(order);
    setIsOpen(false);
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
          <th className="border p-2 text-center cursor-pointer" onClick={() => onSort('TR_PENGAJUAN_PINJAMANs')}>Pinjaman</th>
          <th className="border p-2 text-center cursor-pointer" onClick={() => onSort('TR_PENGAJUAN_SIMPANANs')}>Simpanan</th>
          <th className="border p-2 text-center cursor-pointer" onClick={() => onSort('principalSavings')}>Tabungan</th>
          <th className="border p-2 text-center"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          // Calculate total interest for loans
          const totalInterestPaidloan = row.TR_PENGAJUAN_PINJAMANs?.reduce((acc, loan) => {
            const nominalUang = parseFloat(loan.NOMINAL) || 0;
            const bungaPercentage = parseFloat(loan.type?.INTEREST_RATE) || 0;
            const interest = nominalUang * (bungaPercentage / 100);
            return acc + interest;
          }, 0) || 0;

          // Calculate total interest for savings
          const totalInterestPaidsaving = row.TR_PENGAJUAN_SIMPANANs?.reduce((acc, saving) => {
            const nominalUang = parseFloat(saving.NOMINAL) || 0;
            const bungaPercentage = parseFloat(saving.type?.INTEREST_RATE) || 0;
            const interest = nominalUang * (bungaPercentage / 100);
            return acc + interest;
          }, 0) || 0;

          // Calculate principal savings
          const firstLoanNominal = row.TR_PENGAJUAN_PINJAMANs?.[0]?.NOMINAL || 0;
          const firstSavingNominal = row.TR_PENGAJUAN_SIMPANANs?.[0]?.NOMINAL || 0;
          const principalSavings =
            parseFloat(firstLoanNominal) +
            parseFloat(firstSavingNominal) +
            totalInterestPaidsaving -
            totalInterestPaidloan;

          const formattedPrincipalSavings = formatRupiah(principalSavings.toString());

          return (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
              <td className="border p-2">{row.NAMA_LENGKAP}</td>
              <td className="border p-2 text-center">{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A'}</td>
              <td className="border p-2 text-center">
                {row.TR_PENGAJUAN_PINJAMANs.length > 0
                  ? 'Rp ' + formatRupiah(row.TR_PENGAJUAN_PINJAMANs[0].NOMINAL)
                  : 'N/A'}
              </td>
              <td className="border p-2 text-center">
                {row.TR_PENGAJUAN_SIMPANANs.length > 0
                  ? 'Rp ' + formatRupiah(row.TR_PENGAJUAN_SIMPANANs[0].NOMINAL)
                  : 'N/A'}
              </td>
              <td className="border p-2 text-center">{formattedPrincipalSavings || 'N/A'}</td>
              <td className="border p-2 text-center">
                {row.UUID_MS_USER ? (
                  <Link to={`/userTable/${row.UUID_MS_USER}`} className="text-blue-500 hover:underline">Buka</Link>
                ) : (
                  <span className="text-gray-500">No UUID Available</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


const ListUser = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({ selectedOption: '', searchTerm: '' });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user");
        console.log(response.data);
        setData(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (filterCriteria.selectedOption === "semua") {
      setData(originalData);
      return;
    }

    const filteredData = originalData.filter((row) => {
      const searchTerm = filterCriteria.searchTerm.toLowerCase();
      const selectedField = filterCriteria.selectedOption;

      if (selectedField === "NAMA_LENGKAP") {
        return row.NAMA_LENGKAP.toLowerCase().includes(searchTerm);
      } else if (selectedField === "createdAt") {
        return row.createdAt && new Date(row.createdAt).toLocaleDateString().includes(searchTerm);
      } else if (selectedField === "TR_PENGAJUAN_PINJAMANs") {
        return row.TR_PENGAJUAN_PINJAMANs.length > 0
          && row.TR_PENGAJUAN_PINJAMANs[0].NOMINAL.toString().includes(searchTerm);
        } else if (selectedField === "TR_PENGAJUAN_SIMPANANs") {
          return row.TR_PENGAJUAN_SIMPANANs.length > 0
            && row.TR_PENGAJUAN_SIMPANANs[0].NOMINAL.toString().includes(searchTerm);
      } else if (selectedField === "principalSavings") {
        return row.principalSavings && row.principalSavings.toString().includes(searchTerm);
      }
      return false;
    });

    setData(filteredData);
  };

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });

    const sortedData = [...data].sort((a, b) => {
      let aValue, bValue;

      if (column === 'TR_PENGAJUAN_PINJAMANs') {
        aValue = a.TR_PENGAJUAN_PINJAMANs.length > 0 ? a.TR_PENGAJUAN_PINJAMANs[0].NOMINAL : 0;
        bValue = b.TR_PENGAJUAN_PINJAMANs.length > 0 ? b.TR_PENGAJUAN_PINJAMANs[0].NOMINAL : 0;
      } else {
        aValue = a[column];
        bValue = b[column];
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  const handleFilter = (order) => {
    const columnToSort = 'createdAt';

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
    <div>
      <H />
      <SearchFilterBar filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} handleSearch={handleSearch} handleFilter={handleFilter} />
      <DataTable data={data} onSort={handleSort} />
      <F />
    </div>
  );
};

export default ListUser;
