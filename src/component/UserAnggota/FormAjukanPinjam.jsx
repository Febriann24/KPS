import React, { useState } from 'react';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import foto from '../Foto/Koperasi_Logo.png';
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function FormAjukanPinjam() {
 const navigate = useNavigate(); // Create navigate function for navigation
 const [formData, setFormData] = useState({
  namaLengkap: 'Hollywood Benjamin Gunawan',
  alamat: 'Apartemen Graha Gorila Blok 6L Lantai 19',
  nomorTelepon: '0819744637',
  unitKerja:'Sekolah',
  nomorAnggota: 'A1234',
  maksimalPinjaman: '1000000',
  minimalPinjaman: '500000',
  nominalPinjaman: '',
  angsuran: '3',
  tagihanBulanan: '100000',
  keperluanPinjaman: '',
  setuju: false,
 });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'nominalPinjaman') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      const formattedValue = formatRupiah(numericValue);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const formatRupiah = (angka) => {
    // Ensure angka is a string and remove leading zeros
    angka = angka.replace(/^0+/, '');
    let number_string = angka.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    return rupiah || '0';
  };

 const handleSubmit = (e) => {
  e.preventDefault(); // Prevent default form submission
  console.log('Form Submitted:', formData);
  navigate('/PengajuanPinjaman'); // Navigate to PengajuanUser after form submission
 };

 return (
  <>
  <div>
  <H />
  <div className="flex justify-center space-x-8 mt-10">
    <div className="w-2/3 pl-10">
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
        style={{height:"135px"}}
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
        name="bank"
        value={formData.bank}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300"
        required
        >
        <option value="">Pilih Tipe Pinjaman</option>
        <option value="Mandiri">KPKA</option>
        <option value="BCA">UKTP</option>
        <option value="BRI">UKSP</option>
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

      <div className="col-span-2">
        <label className="block mb-1 font-medium">Keperluan Pinjaman</label>
        <textarea
        name="keperluanPinjaman"
        value={formData.keperluanPinjaman}
        onChange={handleChange}
        placeholder="Keperluan Pinjaman"
        className="w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300 h-24 mt-4"
        required
        />
      </div>

      <button type="submit" className="hidden">Submit</button>
      </form>
    </div>
    </div>

    <div className="w-1/3 flex flex-col space-y-6">
      <div className="flex justify-start mt-10">
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
      </div>
    </div>
  </div>

  <F />
  </div>
</>
);
}

export default FormAjukanPinjam;
