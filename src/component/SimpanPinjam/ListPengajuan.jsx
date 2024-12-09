import React, {
  useEffect,
  useState,
} from 'react';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import axios from 'axios';
import { 
  deformatRupiah,
  formatDate,
  formatRupiah,
  getCurrentLoggedInData
} from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import {
  Search_icon
} from "../../assets/icons"
import {
  BackButton
} from '../../utils/components'
import { Checkbox } from "@material-tailwind/react";
import { Input } from 'postcss';

const getProcessColor = (process) => {
  switch (process) {
    case 'ACTIVE':
      return 'bg-gray-500 text-white'; 
    case 'ABORTED':
      return 'bg-orange-500 text-white'; 
    case 'APPROVED':
      return 'bg-green-500 text-white'; 
    case 'DECLINED':
      return 'bg-red-500 text-white'; 
    default:
      return '';
  }
};

const LoanData = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userData = getCurrentLoggedInData();

  useEffect(() => {
    if (!isNaN(userData?.UUID_MS_USER)) {
      const fetchLoanData = async (filters = {}) => {
        setLoading(true);
        try {
          let UUID_MS_USER = ``;
          if (userData?.MS_JOB.JOB_CODE !== 'PENGURUS') {
            UUID_MS_USER = userData?.UUID_MS_USER;
          }
          const response = await axios.post(`http://localhost:5000/getFilteredPengajuan`, {
            UUID_MS_USER: UUID_MS_USER,
            orderBy: "DESC",
            sortBy: "DATE",
            ...filters, // Spread filters to the request body
          });
          const formattedData = response.data.map(item => ({
            id: item.UUID_PENGAJUAN,
            pengajuan: item.PENGAJUAN,
            name: item.NAMA_LENGKAP,
            nominal: 'Rp ' + formatRupiah(item.NOMINAL),
            date: formatDate(item.DTM_CRT),
            type: item.TYPE_NAME,
            status_code: item.STATUS_CODE,
            status_name: item.STATUS_NAME,
            deskripsi: item.REASON,
          }));
          setData(formattedData);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchLoanData(filters); // Pass the filterData here
      console.log(filters)
    }
  }, [userData, filters]);

  if (loading) {
    return <td colSpan="8" className='p-2 text-center font-bold'>Mencari data pengajuan...</td>;
  }

  if (error) {
    return <td colSpan="8" className='p-2 text-center font-bold text-red-500'>
      Error: {error}, tolong hubungi: 
      
      </td>;
  }

  return (
    <tbody>
      {data.length > 0 ? (
        data.map((loan, index) => (
          <tr 
          key={index} 
          className='bg-white hover:bg-gray-100 transition-all duration-200 cursor-pointer'
          onClick={() => navigate(`/ProsesPengajuan/${loan.pengajuan}/${loan.id}`)}
          >
          <td className="px-2 py-4 text-left">{index + 1}</td>
          <td className="px-2 py-4 text-left text-black">{loan.name}</td>
          <td className="px-2 py-4 text-left">{loan.date}</td>
          <td className="px-2 py-4 text-left">{loan.type}</td>
          <td className="px-2 py-4 text-left">{loan.nominal}</td>
          <td className="px-2 py-4 text-left truncate max-w-xs">{loan.deskripsi}</td>
          <td className="px-2 py-4 text-left">
            <span className={`inline-block px-4 py-0.5 rounded-full ${getProcessColor(loan.status_code)}`}>
              {loan.status_name}
            </span>
          </td>
          {/* <td className="border p-2 text-center">
            <button 
              className="text-blue-500 hover:underline"
              onClick={() => navigate(`/ProsesPengajuan/${loan.pengajuan}/${loan.id}`)}
            >
              Buka
            </button>
          </td> */}
        </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="border p-2 text-center font-bold text-red-500">
            Belum ada pengajuan
          </td>
        </tr>
      )}
    </tbody>
  );
};


const SearchFilterBar = ({ setFilters }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [pengajuan, setPengajuan] = useState({
    PINJAMAN_TYPE: true,
    SIMPANAN_TYPE: true,
    PINJAMAN_STATUS: true,
    SIMPANAN_STATUS: true
  })
  const [filterData, setFilterData] = useState({
    NAMA: "",
    DARI_TANGGAL: "",
    SAMPAI_TANGGAL: "",
    TIPE_PINJAMAN: [],
    TIPE_SIMPANAN: [],
    MINIMAL_NOMINAL: "0",
    MAKSIMAL_NOMINAL: "0",
    STATUS_PINJAMAN: [],
    STATUS_SIMPANAN: [],
    SORT_BY: "DATE",
    ORDER_BY: "DESC"
  });

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  }

  const [tipePinjaman, setTipePinjaman] = useState([]);
  const [tipeSimpanan, setTipeSimpanan] = useState([]);
  const [statusPinj, setStatusPinj] = useState([]);
  const [statusSimp, setStatusSimp] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "MINIMAL_NOMINAL" || name === "MAKSIMAL_NOMINAL") {
      formattedValue = formatRupiah(value.replace(/\D/g, ''));
    }

    setFilterData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFilterData((prevData) => {
      const updatedArray = checked
        ? [...prevData[type], value]
        : prevData[type].filter(item => item !== value);
      return { ...prevData, [type]: updatedArray };
    });
  };

  const handleButtonSearch = () => {
    setOpenFilter(!openFilter);
  }

  const handleFilterFind = () => {
    const dataFilterFind = {
      "isFiltered": true,
      "sortBy": filterData.SORT_BY,
      "orderBy": filterData.ORDER_BY,
      "filterAllTypePinj": pengajuan.PINJAMAN_TYPE,
      "filterAllTypeSimp": pengajuan.SIMPANAN_TYPE,
      "filterAllStatusPinj": pengajuan.PINJAMAN_STATUS,
      "filterAllStatusSimp": pengajuan.SIMPANAN_STATUS,
      "filterTypePinj": filterData.TIPE_PINJAMAN,
      "filterTypeSimp": filterData.TIPE_SIMPANAN,
      "filterStatusPinj": filterData.STATUS_PINJAMAN,
      "filterStatusSimp": filterData.STATUS_SIMPANAN,
      "filterName": filterData.NAMA,
      "filterFromDate": filterData.DARI_TANGGAL,
      "filterToDate": filterData.SAMPAI_TANGGAL,
      "filterMinimalNominal": filterData.MINIMAL_NOMINAL ? deformatRupiah(filterData.MINIMAL_NOMINAL) : 0,
      "filterMaksimalNominal": filterData.MAKSIMAL_NOMINAL ? deformatRupiah(filterData.MAKSIMAL_NOMINAL) : 0,
    }
    console.log(dataFilterFind);
    setFilters(dataFilterFind)
  }

  useEffect(() => {
    handleFilterFind();
  }, [filterData]);

  useEffect(() => {
    const getDataForOptions = async () => {
      try {
        const pinj = await axios.post('http://localhost:5000/getType/PINJAMAN');
        const simp = await axios.post('http://localhost:5000/getType/SIMPANAN');
        const statpinj = await axios.post('http://localhost:5000/getStatus', {
          "PENGAJUAN": "PINJAMAN"
        });
        const statsimp = await axios.post('http://localhost:5000/getStatus', {
          "PENGAJUAN": "SIMPANAN"
        });
        setTipePinjaman(pinj.data);
        setTipeSimpanan(simp.data);
        setStatusPinj(statpinj.data);
        setStatusSimp(statsimp.data);
      } catch (error) {
        console.log(error);
      }
    }

    getDataForOptions();
  }, [openFilter]);

  return (
    <div className="flex items-center">
      <Search_icon />
      <input
        type="text"
        placeholder="Cari Nama Pengaju..."
        className="border border-gray-200 py-2 rounded-full w-[20%] px-8 ml-3"
      />
      <button
        className="py-2 bg-teal-500 text-white rounded-full px-6 ml-2 hover:bg-teal-400 transition-all duration-300 w-[100px]"
        onClick={handleButtonSearch}
      >
        Cari
      </button>
      <button
        className="py-2 bg-gray-600 text-white rounded-full px-6 ml-2 hover:bg-gray-500 transition-all duration-300 w-[100px]"
        onClick={toggleFilter}
      >
        Filter
      </button>
      {openFilter && 
      
      (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
          <h4 className="font-bold text-xl text-center">Opsi Filter</h4>
          <form className="my-4" onSubmit={handleButtonSearch}>

            <label className='mx-2'>Nama Pengaju</label>
            <input
              placeholder='Masukkan Nama Pengaju'
              className='border border-gray-200 py-2 rounded-md w-full px-3'
              name="NAMA"
              value={filterData.NAMA}
              onChange={handleChange}
              autoComplete='off'
            />

            <div className='w-full bg-gray-100 h-[3px] my-5' />

            <div className='flex flex-1 w-full space-x-6'>
              <div className='w-full'>
                <label className='mx-2'>Dari Tanggal</label>
                <input
                  type="date"
                  className='border border-gray-200 py-2 rounded-md w-full px-3'
                  name="DARI_TANGGAL"
                  value={filterData.DARI_TANGGAL}
                  onChange={handleChange}
                />
              </div>

              <div className='w-full'>
                <label className='mx-2'>Sampai Tanggal</label>
                <input
                  type="date"
                  className='border border-gray-200 py-2 rounded-md w-full px-3'
                  name="SAMPAI_TANGGAL"
                  value={filterData.SAMPAI_TANGGAL}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='w-full bg-gray-100 h-[3px] my-5' />

            <div className='flex flex-1 w-full space-x-6'>
              <div className='w-full flex flex-col'>
                <label className='mx-2'>Minimal Nominal</label>
                <input
                  type='text'
                  placeholder='Masukkan Minimal'
                  className='border border-gray-200 py-2 rounded-md w-full px-3'
                  name="MINIMAL_NOMINAL"
                  value={filterData.MINIMAL_NOMINAL}
                  onChange={handleChange}
                />
              </div>

              <div className='w-full flex flex-col'>
                <label className='mx-2'>Maksimal Nominal</label>
                <input
                  type='text'
                  placeholder='Masukkan Maksimal'
                  className='border border-gray-200 py-2 rounded-md w-full px-3'
                  name="MAKSIMAL_NOMINAL"
                  value={filterData.MAKSIMAL_NOMINAL}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='w-full bg-gray-100 h-[3px] my-5' />

            <div className='flex flex-1 w-full space-x-6'>
              <div className='w-full flex flex-col'>
                <label className='mx-2 mb-2'>Tipe Pinjaman</label>
                <label className='flex items-center'>
                  <input 
                    type= 'checkbox'
                    className='mx-2'
                    checked={pengajuan.PINJAMAN_TYPE}
                    onChange={() => setPengajuan({ ...pengajuan, PINJAMAN_TYPE: !pengajuan.PINJAMAN_TYPE })}
                  />
                  Lihat Semua Tipe
                </label>
                {tipePinjaman.map((item) => (
                  <label className='flex items-center' key={item.UUID_TYPE_PINJAMAN}>
                    <input
                      type='checkbox'
                      className='mx-2'
                      value={item.UUID_TYPE_PINJAMAN}
                      checked={filterData.TIPE_PINJAMAN.includes(item.UUID_TYPE_PINJAMAN)}
                      onChange={(e) => handleCheckboxChange(e, 'TIPE_PINJAMAN')}
                      disabled={pengajuan.PINJAMAN_TYPE}
                    />
                    {item.TYPE_NAME}
                  </label>
                ))}
              </div>

              <div className='w-full flex flex-col'>
                <label className='mx-2 mb-2'>Tipe Simpanan</label>
                <label className='flex items-center'>
                <input 
                  type= 'checkbox'
                  className='mx-2'
                  checked={pengajuan.SIMPANAN_TYPE}
                  onChange={() => setPengajuan({ ...pengajuan, SIMPANAN_TYPE: !pengajuan.SIMPANAN_TYPE })}
                />
                Lihat Semua Tipe
              </label>
                {tipeSimpanan.map((item) => (
                  <label className='flex items-center' key={item.UUID_TYPE_SIMPANAN}>
                    <input
                      type='checkbox'
                      className='mx-2'
                      value={item.UUID_TYPE_SIMPANAN}
                      checked={filterData.TIPE_SIMPANAN.includes(item.UUID_TYPE_SIMPANAN)}
                      onChange={(e) => handleCheckboxChange(e, 'TIPE_SIMPANAN')}
                      disabled={pengajuan.SIMPANAN_TYPE}
                    />
                    {item.TYPE_NAME}
                  </label>
                ))}
              </div>
            </div>

            <div className='w-full bg-gray-100 h-[3px] my-5' />

            <div className='flex flex-1 w-full space-x-6'>
              <div className='w-full flex flex-col'>
                <label className='mx-2 mb-2'>Status Pinjaman</label>
                <label className='flex items-center'>
                  <input 
                    type= 'checkbox'
                    className='mx-2'
                    checked={pengajuan.PINJAMAN_STATUS}
                    onChange={() => setPengajuan({ ...pengajuan, PINJAMAN_STATUS: !pengajuan.PINJAMAN_STATUS })}
                  />
                  Lihat Semua Status
                </label>
                {statusPinj.map((item) => (
                  <label className='flex items-center' key={item.UUID_STATUS_PINJAMAN}>
                    <input
                      type='checkbox'
                      className='mx-2'
                      value={item.UUID_STATUS_PINJAMAN}
                      checked={filterData.STATUS_PINJAMAN.includes(item.UUID_STATUS_PINJAMAN)}
                      onChange={(e) => handleCheckboxChange(e, 'STATUS_PINJAMAN')}
                      disabled={pengajuan.PINJAMAN_STATUS}
                    />
                    {item.STATUS_NAME}
                  </label>
                ))}
              </div>

              <div className='w-full flex flex-col'>
                <label className='mx-2 mb-2'>Status Simpanan</label>
                <label className='flex items-center'>
                  <input 
                    type= 'checkbox'
                    className='mx-2'
                    checked={pengajuan.SIMPANAN_STATUS}
                    onChange={() => setPengajuan({ ...pengajuan, SIMPANAN_STATUS: !pengajuan.SIMPANAN_STATUS })}
                  />
                  Lihat Semua Status
                </label>
                {statusSimp.map((item) => (
                  <label className='flex items-center' key={item.UUID_STATUS_SIMPANAN}>
                    <input
                      type='checkbox'
                      className='mx-2'
                      value={item.UUID_STATUS_SIMPANAN}
                      checked={filterData.STATUS_SIMPANAN.includes(item.UUID_STATUS_SIMPANAN)}
                      onChange={(e) => handleCheckboxChange(e, 'STATUS_SIMPANAN')}
                      disabled={pengajuan.SIMPANAN_STATUS}
                    />
                    {item.STATUS_NAME}
                  </label>
                ))}
              </div>
            </div>
            

          </form>
          <div className='flex flex-1 justify-end mt-8'>
            <button
              className="bg-teal-500 text-white rounded-full px-6 py-2 mx-1 w-[100px] hover:bg-teal-400 transition-all duration-300"
              onClick={handleButtonSearch}
            >
              Cari
            </button>
            <button
              className="bg-red-700 text-white rounded-full px-6 py-2 mx-1 w-[100px] hover:bg-red-600 transition-all duration-300"
              onClick={toggleFilter}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    )
    }

    <label className='mx-2'>
      Urutkan Berdasarkan: 
    </label>
    <select 
    className='border border-gray-200'
    onChange={(e) => setFilterData({ ...filterData, SORT_BY: e.target.value })}
    >
      <option value={"DATE"}>Tanggal</option>
      <option value={"NOMINAL"}>Nominal Uang</option>
      <option value={"STATUS"}>Status</option>
    </select>

    <label className='mx-2'>
      Urutkan Menurut: 
    </label>
    <select 
    className='border border-gray-200'
    onChange={(e) => setFilterData({ ...filterData, ORDER_BY: e.target.value })}
    >
      <option value={"DESC"}>Dari yang tertinggi</option>
      <option value={"ASC"}>Dari yang terendah</option>
    </select>

    </div>
  );
};


const DataTable = ({ filters }) => {

  return (
    <table className="min-w-full bg-gray-50 rounded-xl mt-4 shadow-sm border-gray-200 text-gray-600">
      <thead>
      <tr>
        <th className="p-2 text-left font-normal" style={{ width: "2%" }}>No</th>
        <th className="p-2 text-left font-normal" style={{ width: "15%" }}>Nama Pengaju</th>
        <th className="p-2 text-left font-normal" style={{ width: "10%" }}>Tanggal Pengajuan</th>
        <th className="p-2 text-left font-normal" style={{ width: "12%" }}>Jenis Pengajuan</th>
        <th className="p-2 text-left font-normal" style={{ width: "10%" }}>Nominal Uang</th>
        <th className="p-2 text-left font-normal" style={{ width: "35%" }}>Keperluan Pengajuan</th>
        <th className="p-2 text-left font-normal" style={{ width: "6%" }}>Status</th>
      </tr>
      </thead>
      <LoanData filters={filters} />
    </table>
  );
};

const ListPengajuan = () => {
  const [filters, setFilters] = useState({})

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="w-full">
        <H />
      </div>

      <div className='container mx-auto my-4 p-4 flex-grow justify-center'>
        <SearchFilterBar setFilters={setFilters} />
        <DataTable filters={filters} />
      </div>

      <div className="w-full">
        <F />
      </div>
    </div>
  );
};

export default ListPengajuan;
