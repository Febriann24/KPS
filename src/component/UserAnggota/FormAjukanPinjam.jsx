import React, { 
  useEffect, 
  useState 
} from 'react';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import foto from '../Foto/Koperasi_Logo.png';
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { 
  formatRupiah,
  deformatRupiah
 } from "../../utils/utils"
import axios from "axios";

function FormAjukanPinjam() {
 const navigate = useNavigate(); // Create navigate function for navigation
 const [formData, setFormData] = useState({
  namaLengkap: 'Hollywood Benjamin Gunawan',
  alamat: 'Apartemen Graha Gorila Blok 6L Lantai 19',
  nomorTelepon: '0819744637',
  unitKerja:'Sekolah',
  nomorAnggota: 'A1234',
  maksimalPinjaman: '0',
  minimalPinjaman: '0',
  nominalPinjaman: '0',
  tipePinjaman: '',
  angsuran: '0',
  tagihanBulanan: '100000',
  deduksiBulanan: '0',
  keperluanPinjaman: '',
  setuju: false,
 });

 const [selectedType, setSelectedType] = useState(null);
 const [typePinjaman, setTypePinjaman] = useState([]);

 useEffect(() => {
  const fetchTypePinjaman = async () => {
      try {
          const response = await axios.get('http://localhost:5000/MS_TYPE_PINJAMAN/getTypePinjaman'); // Update with your actual endpoint
          setTypePinjaman(response.data);
      } catch (error) {
          console.error('Error fetching type pinjaman:', error);
      }
  };

  fetchTypePinjaman();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const handlers = {
      nominalPinjaman: () => {
        const numericValue = value.replace(/\D/g, ''); // Only accepts digit 0-9 inputs
        return formatRupiah(numericValue);
      },
      checkbox: () => checked,
      default: () => value,
    };

    const formattedValue = handlers[name] ? handlers[name]() : (type === 'checkbox' ? checked : value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = typePinjaman.find(item => item.TYPE_NAME === selectedValue);
    console.log(selectedValue)
    setFormData((prevData) => ({
      ...prevData,
      tipePinjaman: selectedValue, // Update formData with selected type
      angsuran: selectedOption ? selectedOption.ANGSURAN_MONTH : '0',
      minimalPinjaman: selectedOption ? formatRupiah(selectedOption.MINIMUM_PINJAMAN) : '0',
      maksimalPinjaman: selectedOption ? formatRupiah(selectedOption.MAXIMUM_PINJAMAN) : '0'
    }));
  };


 const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission
  const dataSubmit = 
  {
    "UUID_MS_USER": 1,
    "UUID_MS_STATUS_PINJAMAN": 1,
    "UUID_MS_TYPE_PINJAMAN": 1,
    "USR_CRT": "currentuser@gmail.com",
    "NOMINAL_UANG": deformatRupiah(formData.nominalPinjaman),
    "DESKRIPSI": formData.keperluanPinjaman
  }
  try {
    const response = await axios.post('http://localhost:5000/TR_PENGAJUAN_PINJAMAN/createPengajuanPinjaman', dataSubmit);
      console.log('Form Submitted:', dataSubmit);
      navigate('/PengajuanPinjaman');
    } catch (error) {
        console.log('Error submitting form:', error);
        alert(error.response ? error.response.data.message : 'An unexpected error occurred.');
    }
 };

 const isSubmitable = () => {
  return (
    formData.namaLengkap.trim() !== '' &&
    formData.nomorTelepon.trim() !== '' &&
    formData.alamat.trim() !== '' &&
    formData.unitKerja.trim() !== '' &&
    formData.nomorAnggota.trim() !== '' && 
    formData.tipePinjaman !== '' &&
    formData.nominalPinjaman.trim() !== '' &&
    formData.keperluanPinjaman.trim() !== '' &&
    formData.setuju == true
  );
};

 return (
  <>
  <div>
  <H />
  <div className="flex justify-center space-x-8 mt-10">
    <div className="w-2/3">
    <h2 className="text-2xl font-semibold text-center mb-6">Formulir Pengajuan Pinjaman</h2>

    <div className="bg-gray-200 p-10 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} id="form-pengajuan" className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Vertical group for Nama Lengkap, Nomor Telepon, and Nomor Anggota */}
      <div className="grid grid-cols-1 gap-6">
        <div>
        <label className="block mb-1 font-medium">Nama Lengkap</label>
        <input
          type="text"
          name="namaLengkap"
          value={formData.namaLengkap}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          className="w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300"
          maxLength={70}
          required
        />
        </div>
        <div>
        <label className="block mb-1 font-medium">Nomor Telepon</label>
        <input
          type="number"
          name="nomorTelepon"
          value={formData.nomorTelepon}
          onChange={handleChange}
          placeholder="Nomor Telepon"
          className="w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300"
          maxLength={15}
          required
        />
        </div>
      </div>

      {/* Address in a separate vertical column with combined height */}
      <div>
        <label className="block mb-1 font-medium">Alamat</label>
        <textarea
        name="alamat"
        value={formData.alamat}
        onChange={handleChange}
        placeholder="Masukkan alamat lengkap"
        className="w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300"
        style={{height:"140px"}}
        required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Unit Kerja</label>
        <input
          type="text"
          name="unitKerja"
          value={formData.unitKerja}
          onChange={handleChange}
          placeholder="Unit Kerja"
          className="w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        </div>

        <div>
        <label className="block mb-1 font-medium">Nomor Anggota</label>
        <input
          type="text"
          name="nomorAnggota"
          value={formData.nomorAnggota}
          onChange={handleChange}
          placeholder="Nomor Anggota"
          className="w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        </div>
        
      <div>
        <label className="block mb-1 font-medium">Tipe Pinjaman</label>
        <select
        name="tipePinjaman"
        value={formData.tipePinjaman}
        onChange={handleSelectChange}
        className="w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300"
        required
        >
        <option value="">Pilih Tipe Pinjaman</option>

          {typePinjaman.map((item) => (
            <option key={item.UUID_TYPE_PINJAMAN} value={item.TYPE_NAME}>
              {item.TYPE_NAME}
            </option>
          ))}

        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Angsuran (Bulan)</label>
        <input
        type="number"
        name="angsuran"
        value={formData.angsuran}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        readOnly
        required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Minimal Nominal Pinjaman</label>
        <div className='flex items-center'>
        <span className='mr-2'>Rp</span>
        <input
        type="text"
        value={formData.minimalPinjaman}
        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        readOnly
        />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Maksimal Nominal Pinjaman</label>
        <div className='flex items-center'>
        <span className="mr-2">Rp</span>
        <input
        type="text"
        value={formData.maksimalPinjaman}
        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        readOnly
        />
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">Nominal Uang Pinjaman</label>
        <div className='flex items-center'>
        <span className='mr-2'>Rp</span>
        <input
        type="text"
        name="nominalPinjaman"
        value={formData.nominalPinjaman}
        onChange={handleChange}
        placeholder="Nominal Uang Pinjaman"
        className="w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300"
        required
        />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Deduksi Bulanan</label>
        <div className='flex items-center'>
        <span className="mr-2">Rp</span>
        <input
        type="text"
        name="deduksiBulanan"
        value={formData.deduksiBulanan}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        readOnly
        required
        />
        </div>
      </div>

      <div className="col-span-2">
        <label className="block mb-1 font-medium">Keperluan Pinjaman</label>
        <textarea
        name="keperluanPinjaman"
        value={formData.keperluanPinjaman}
        onChange={handleChange}
        placeholder="Keperluan Pinjaman"
        className="w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300 h-24"
        required
        />
      </div>
      </form>
    </div>
    </div>

    <div className=" flex flex-col space-y-6">
      <div className="justify-start mt-10">
        <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="setuju"
          checked={formData.setuju}
          onChange={handleChange}
          className="form-checkbox"
          required
        />
        <span className="text-sm">Saya sudah baca dan setuju atas ketentuan dan syarat yang sudah ditentukan.</span>
        </label>
      </div>

      <div className="mt-6">
        <button
        type="button"
        onClick={handleSubmit} // Call handleSubmit to submit form
        className="bg-blue-500 text-white w-full px-6 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
        disabled={!isSubmitable()}
        >
        Ajukan
        </button>
        <button
        type="button"
        onClick={() => navigate('/SimpanPinjam')} // Navigate back to SimpanPinjam
        className="bg-gray-300 text-black w-full px-6 py-2 rounded shadow hover:bg-gray-400 transition duration-200 mt-2"
        >
        Kembali
        </button>
      </div>

      <div className="border p-4 rounded-lg text-center text-gray-700 bg-gray-100">
        <strong>PERHATIAN</strong>
        <p>Mohon mengisi formulir pengajuan dengan baik dan tepat.</p>
        <p>Jika ada kesulitan, mohon baca syarat & ketentuan</p>
        <p>Untuk melaporkan kesalahan mohon kontak : 0812299378</p>
      </div>
    </div>
  </div>

  <F />
  </div>
</>
);
}

export default FormAjukanPinjam;
