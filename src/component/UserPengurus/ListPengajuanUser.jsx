import React, {
  useEffect,
  useState
} from 'react';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import axios from 'axios';
import { 
  formatDate,
  formatRupiah,
  getCurrentLoggedInData
} from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import {
  BackButton
} from '../../utils/components'

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

const LoanData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userData = getCurrentLoggedInData();

  useEffect(() => {
    if (!isNaN(userData?.UUID_MS_USER)) {
      const fetchLoanData = async () => {
        setLoading(true);
        try {
          let UUID_MS_USER = ``;
          if (userData?.MS_JOB.JOB_CODE !== 'PENGURUS') {
            UUID_MS_USER = `/anggotaId/${userData?.UUID_MS_USER}`;
          }
          const response = await axios.post(`http://localhost:5000/getPengajuan`, {
            PENGAJUAN: "PINJAMAN",
            UUID_MS_TYPE: "", 
            UUID_MS_USER: UUID_MS_USER, 
            UUID_MS_STATUS: "" 
          });
          const formattedData = response.data.map(item => ({
            id: item.UUID_PENGAJUAN_PINJAMAN,
            name: item.user.NAMA_LENGKAP,
            nominal: 'Rp ' + formatRupiah(item.NOMINAL_UANG),
            date: formatDate(item.DTM_CRT),
            type: item.type.TYPE_NAME,
            status_code: item.status.STATUS_CODE,
            status_name: item.status.STATUS_NAME,
            deskripsi: item.DESKRIPSI
          }));
          setData(formattedData);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchLoanData();
    }
  }, [userData]);

  if (loading) {
    return <td colSpan="8" className='p-2 text-center font-bold'>Loading...</td>;
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
          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : ''}`}>
          <td className="border p-2 text-center">{index + 1}</td>
          <td className="border p-2">{loan.name}</td>
          <td className="border p-2 text-center">{loan.date}</td>
          <td className="border p-2 text-center">{loan.type}</td>
          <td className="border p-2 text-right">{loan.nominal}</td>
          <td className="border p-2 text-left truncate max-w-xs">{loan.deskripsi}</td>
          <td className="border p-2 text-center">
            <span className={`inline-block px-2 py-1 rounded-md ${getProcessColor(loan.status_code)}`}>
              {loan.status_name}
            </span>
          </td>
          <td className="border p-2 text-center">
            <button 
              className="text-blue-500 hover:underline"
              onClick={() => navigate(`/PengajuanPinjaman/${loan.id}`)}
            >
              Buka
            </button>
          </td>
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


const SearchFilterBar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 shadow-sm">
      <div className="flex items-center space-x-4 w-full">
        <select className="border p-2 rounded-md bg-white shadow-sm">
          <option value="">Pengaju</option>
          <option value="option1">Keperluan</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md w-full m-auto"
        />
        <button className="p-2 bg-teal-500 text-white rounded-md">Search</button>
      </div>
      <button className="p-2 bg-gray-600 text-white rounded-md ml-4">Filter</button>
    </div>
  );
};



const DataTable = () => {

  return (
    <table className="min-w-full bg-white border rounded-md mt-4">
      <thead>
      <tr>
        <th className="border p-2 text-center" style={{ width: "2%" }}>No</th>
        <th className="border p-2 text-center" style={{ width: "15%" }}>Pengaju</th>
        <th className="border p-2 text-center" style={{ width: "15%" }}>Tanggal Pengajuan</th>
        <th className="border p-2 text-center" style={{ width: "8%" }}>Jenis Pengajuan</th>
        <th className="border p-2 text-center" style={{ width: "10%" }}>Nominal Uang</th>
        <th className="border p-2 text-center" style={{ width: "30%" }}>Keperluan Pengajuan</th>
        <th className="border p-2 text-center" style={{ width: "10%" }}>Proses</th>
        <th className="border p-2 text-center" style={{ width: "10%" }}>Aksi</th>
      </tr>
      </thead>
      <LoanData />
    </table>
  );
};

const ListPengajuanUser = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="w-full">
        <H />
      </div>

      <div className='container mx-auto my-4 p-4 flex-grow justify-center'>
        <BackButton nav="/SimpanPinjam"/>
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
