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
  formatDate,
} from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { 
  Back_icon,
  Done_icon,
  Time_icon,
  X_icon
} from '../../assets/icons';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button 
    className='mx-auto shadow-lg p-3 rounded-lg bg-gray-600 text-white
    hover:shadow-xl hover:bg-gray-500 transition-all duration-300 w-[150px]'
    style={{marginBottom:"20px"}}
    onClick={() => navigate(`/ListPengajuanUser`)}>
      <div className='flex justify-between'>
        <span>Kembali</span>
        <span>
          <Back_icon />
        </span>
      </div>
    </button>
  )
}

const ProfileInfomation = ({data}) => {
  return (
    <div className='py-4 px-4 flex flex-col w-full h-full text-left items-center'>
      <div className='bg-gray-300 w-[100px] h-[100px] rounded-full my-4' />
      <p className='text-center text-[20px] whitespace-nowrap w-[300px]'>{data.nama}</p>
      <div className='bg-black w-full h-[1px] my-2' />
      <div className='grid grid-cols-[1fr_1fr]'>
        <div className='self-start mx-4'>
          <p>Tanggal Bergabung </p>
          <p>Unit Kerja </p>
          <p>Nomor Anggota </p>
          <p>Nomor Telepon </p>
          <p>Total Tabungan </p>
        </div>
        <div>
          <p>: {data.tnglbergabung}</p>
          <p>: {data.unitkerja}</p>
          <p>: {data.noanggota}</p>
          <p>: {data.notelp}</p>
          <p>: {}</p>
        </div>
      </div>
      
    </div>
  )
}

const PengajuanInformation = ({data}) => {
  return (
    <div>
      <div className='py-4 px-4 flex flex-col w-full h-full items-center'>
        <p className='text-[20px]'>Data Pengajuan</p>
        <div className='bg-black w-[400px] h-[1px] my-2' />
      </div>
      <div className='grid grid-cols-[1fr_3fr] text-[20px]'>
        <div className='self-start mx-4 w-full'>
          <p>Nominal Pinjaman </p>
          <p>Tipe Pinjaman </p>
          <p>Angsuran (Bulan) </p>
          <p>Deduksi Bulanan </p>
          <p>Keperluan Pinjaman </p>
        </div>
        <div className='w-full'>
          <p>: {data.nominal}</p>
          <p>: {data.tipe}</p>
          <p>: {data.angsuran}</p>
          <p>: {}</p>
          <p>: {data.alasan}</p>
        </div>
      </div>
    </div>
  )
}

const PengajuanButton = ({ id, status }) => {
  const handleChangeStatus = async (newStatus) => {
    try {
      const response = await axios.patch("http://localhost:5000/TR_PENGAJUAN_PINJAMAN/updateStatusPengajuanPinjaman", {
        "id": id,
        "status": newStatus
      });
      window.location.reload();
      console.log("Updated Success", response);
    } catch (error) {
      console.log("error found: ", error);
    }
  }
  if (status === 'ACTIVE') {
    return (
      <div className='items-center grid grid-cols-[1fr_1fr_1fr] gap-4 mx-4'>
        <button 
        className="bg-green-500 text-white 
        px-6 py-2 rounded flex-grow mr-1 w-full shadow-xl
        hover:shadow-sm hover:bg-green-400 transition-all duration-300"
        onClick={() => handleChangeStatus('APPROVED')}
        >
          SETUJU
        </button>
  
        <button 
        className="bg-red-500 text-white 
        px-6 py-2 rounded flex-grow mr-1 w-full shadow-xl
        hover:shadow-sm hover:bg-red-400 transition-all duration-300"
        onClick={() => handleChangeStatus('DECLINED')}
        >
          TOLAK
        </button>
  
        <button 
        className="bg-teal-500 text-white 
        px-6 py-2 rounded flex-grow mr-1 w-full shadow-xl
        hover:shadow-sm hover:bg-teal-400 transition-all duration-300">
          Cetak Dokumen
        </button>
      </div>
    )
  } else {
    return (
      <div className='items-center grid grid-cols-[1fr_1fr_1fr] gap-4 mx-4'>
        <div className='w-full' />
  
        <div className='w-full' />
  
        <button 
        className="bg-teal-500 text-white 
        px-6 py-2 rounded flex-grow mr-1 w-full shadow-xl
        hover:shadow-sm hover:bg-teal-400 transition-all duration-300">
          Cetak Dokumen
        </button>
      </div>
    )
        
  }
}

const Information = () => {
  const { id } = useParams();
  const [data, setData] = useState({})
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

          nama: obj.user.NAMA_LENGKAP,
          alamat: obj.user.ALAMAT,
          tnglbergabung: formatDate(obj.user.DTM_CRT),
          notelp: obj.user.NOMOR_TELP,
          unitkerja: obj.user.UNIT_KERJA,
          noanggota: obj.user.NOMOR_ANGGOTA,

          nominal: 'Rp ' + formatRupiah(obj.NOMINAL_UANG),
          tanggal: formatDate(obj.DTM_CRT),
          tipe: obj.type.TYPE_NAME,
          angsuran: obj.type.ANGSURAN_MONTH,
          status_code: obj.status.STATUS_CODE,
          status_name: obj.status.STATUS_NAME,
          alasan: obj.DESKRIPSI
        };
        setData(formattedData)
      } catch (error) {
        console.log("Error fetching data: " + error)
      }
    };
    fetchDataPengajuan();
  }, [id])

  const Desc = ({progress}) => {
    let msg1 = '';
    let msg2 = '';
    switch(progress){
      case 'ACTIVE':
        msg1 = 'Pengajuan';
        msg2 = 'Diajukan';
        break;
      case 'WAITING':
        msg1 = 'Menunggu';
        msg2 = 'Persetujuan';
        break;
      case 'ABORTED':
        msg1 = 'Pengajuan';
        msg2 = 'Dibatalkan';
        break;
      case 'DECLINED':
        msg1 = 'Pengajuan';
        msg2 = 'Ditolak';
        break;
      case 'APPROVED':
        msg1 = 'Pengajuan';
        msg2 = 'Disetujui';
        break;
      case 'desc3':
        msg1 = 'Selesai';
        msg2 = '';
        break;
      default:
        msg1 = 'Mengambil';
        msg2 = 'Data';
        break;
    }
    return (
      <div className='absolute mt-2 top-full text-center'>
        <p>{msg1}</p>
        <p>{msg2}</p>
      </div>
    )
  }

  const Color = (progress) => {
    switch(progress){
      case 'GREEN_YELLOW_grad':
        return 'linear-gradient(to right, #38b2ac 10%, #FFB300 50%)';
      case 'GREEN_RED_grad':
        return 'linear-gradient(to right, #38b2ac 10%, #C62828 20%)';
      case 'RED':
        return '#C62828';
      case 'GREEN':
        return '#38b2ac';
      case 'YELLOW':
        return '#FFB300';
      case 'GRAY':
        return '#e2e8f0';
      default:
        return '#e2e8f0';
    }
    
  }

  const Line = ({progress}) => {
    let color = "";
    switch(progress){
      case 'WAIT':
        color = "GREEN_YELLOW_grad";
        break;
      case 'CANCEL':
        color = "GREEN_RED_grad";
        break;
      case 'DONE':
        color = 'GREEN'
        break;
      case  'BLANK':
        color = "GRAY";
        break;
      default:
        color = "GRAY";
        break;
    }
    return (
      <div 
        className='flex-1 h-2'
        style={{background: Color(color) }}
      />
    )
  }

  const Point = ({progress}) => {
    let color = "";
    let icon;
    switch(progress){
      case 'WAIT':
        color = "YELLOW";
        icon = <Time_icon />;
        break;
      case 'CANCEL':
        color = "RED";
        icon = <X_icon />;
        break;
      case 'DONE':
        color = "GREEN";
        icon = <Done_icon />;
        break;
      case 'BLANK':
        color = "GRAY";
        break;
      default:
        color = "GRAY";
        break;
    }
    return (
      <div 
      className='w-10 h-10 rounded-full flex items-center justify-center text-white'
      style={{background: Color(color)}}
      >
        {icon}
      </div>
    )
  }

  const MapLinePoint = ({status}) => {
    let point1 = 'BLANK';
    let point2 = 'BLANK';
    let point3 = 'BLANK';
    let line1 = 'BLANK';
    let line2 = 'BLANK';
    let desc1 = '';
    let desc2 = '';
    let desc3 = 'desc3';
    switch(status){
      case "ACTIVE":
        point1 = 'DONE';
        line1 = 'WAIT';
        point2 = 'WAIT';
        desc1 = 'ACTIVE';
        desc2 = 'WAITING';
        break;
        
      case 'APPROVED':
        point1 = 'DONE';
        line1 = 'DONE';
        point2 = 'DONE';
        line2 = 'DONE';
        point3 = 'DONE';
        desc1 = 'ACTIVE';
        desc2 = 'APPROVED';
        break;

      case 'DECLINED':
        point1 = 'DONE';
        line1 = 'CANCEL';
        point2 = 'CANCEL';
        desc1 = 'ACTIVE';
        desc2 = 'DECLINED';
        break;

      case 'ABORTED':
        point1 = 'CANCEL';
        desc1 = 'ABORTED';
        desc2 = 'WAITING';
        break;
    }
    return (
      <div className='w-full flex justify-between items-center'>
        <div className='relative flex flex-col items-center justify-center'>
          <Point progress={point1} />
          <Desc progress={desc1} />
        </div>

        <Line progress={line1} />

        <div className='relative flex flex-col items-center justify-center'>
          <Point progress={point2} />
          <Desc progress={desc2} />
        </div>

        <Line progress={line2} />

        <div className='relative flex flex-col items-center justify-center'>
          <Point progress={point3} />
          <Desc progress={desc3} />
        </div>
      </div>
    )
  }

  console.log(data.status_code)

  return (
    <div>
      <div 
      className='w-7/8 h-[200px] shadow-lg mx-auto rounded-lg bg-white flex items-center justify-center'
      style={{paddingLeft:"100px", paddingRight:"100px"}}>
        <MapLinePoint status={data.status_code} />
      </div>
      <div className='w-7/8 h-[400px] my-4 mx-auto gap-4 grid grid-cols-[1fr_3fr]'>
        <div className='bg-white shadow-lg rounded-lg w-full'>
          <ProfileInfomation data={data}/>
        </div>
        <div className='bg-white shadow-lg rounded-lg w-full'>
          <div className='flex flex-col h-full justify-between'>
            <div>
              <PengajuanInformation data={data} />
            </div>
            <div className='my-6'>
              <PengajuanButton status={data.status_code} id={data.id} />
            </div>
          </div>
        </div>
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
        <Information />
      </div>

      <div className="w-full">
        <F />
      </div>
    </div>
  );
};

export default PengajuanPinjam;
