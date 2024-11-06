import React, { useEffect, useState } from 'react';
import H from '../H&F/Header';
import F from '../H&F/Footer';
import foto from '../Foto/Koperasi_Logo.png';
import { 
  Link, 
  useParams
} from "react-router-dom";
import axios from 'axios';
import { 
  formatRupiah,
  formatDate
} from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const DataInformation = () => {
  const { id } = useParams();
  const [data, setData] = useState([])
  const [showPinModal, setShowPinModal] = useState(false);
  const [showCetakModal, setShowCetakModal] = useState(false);
  const [pinInput, setPinInput] = useState('');

  useEffect(() => {
    const fetchDataPengajuan = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/TR_PENGAJUAN_PINJAMAN/getDetailPengajuanPinjaman/${id}`)
        const obj = response.data;
        const formattedData = {
          id: obj.UUID_PENGAJUAN_PINJAMAN,
          name: obj.user.NAMA_LENGKAP,
          nominal: 'Rp ' + formatRupiah(obj.NOMINAL_UANG),
          date: formatDate(obj.DTM_CRT),
          type: obj.type.TYPE_NAME,
          status_code: obj.status.STATUS_CODE,
          status_name: obj.status.STATUS_NAME,
          deskripsi: obj.DESKRIPSI
        };
        setData(formattedData)
      } catch (error) {
        console.log("Error fetching data: " + error)
      }
    };
    fetchDataPengajuan();
  }, [id])
};

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button 
    className='mx-auto shadow-lg p-3 rounded-lg bg-gray-600 text-white
    hover:shadow-xl hover:bg-gray-500 transition-all duration-300'
    onClick={() => navigate(`/ListPengajuanUser`)}>
      Kembali
    </button>
  )
}

const ProcessInformation = () => {
  return (
    <div className='w-7/8 h-[300px] shadow-lg mx-auto rounded-lg p-6 bg-white flex items-center justify-center'>
      <div className='w-full flex justify-between items-center'>
        {/* Point 1 */}
        <div className='w-6 h-6 bg-blue-500 rounded-full'></div>
        
        {/* Process Line */}
        <div className='flex-1 h-1 bg-gray-300 mx-4'></div>
        
        {/* Point 2 */}
        <div className='w-6 h-6 bg-blue-500 rounded-full'></div>
        
        {/* Process Line */}
        <div className='flex-1 h-1 bg-gray-300 mx-4'></div>
        
        {/* Point 3 */}
        <div className='w-6 h-6 bg-blue-500 rounded-full'></div>
      </div>
    </div>
  );
};


const PengajuanPinjam = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="w-full">
        <H />
      </div>

      <div className='container mx-auto my-4 p-4 flex-grow justify-center'>
        <BackButton />
        <ProcessInformation />
      </div>

      <div className="w-full">
        <F />
      </div>
    </div>
  );
};

export default PengajuanPinjam;
