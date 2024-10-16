import React, { useState } from 'react';
import H from "./H&F/Header";
import F from "./H&F/Footer";
import foto from './Foto/Koperasi.jpg';
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";

function FormPengajuan() {
  const navigate = useNavigate(); // Create navigate function for navigation
  const [formData, setFormData] = useState({
    NAMA_LENGKAP: '',
    ALAMAT: '',
    NOMOR_TELEPON: '',
    NOMOR_ANGGOTA: '',
    maksimalPinjaman: 'Rp 599.958.050,00',
    NOMINAL_UANG: 'Rp 530.000,00',
    NOMOR_REKENING: '',
    BANK: '',
    ANGSURAN: '12',
    tagihanBulanan: 'Rp 100.000',
    DESKRIPSI: '',
    setuju: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  //Submit data to database
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    //Default sending structure
    const dataSubmit = {
      "statusData": {
        "IS_ACTIVE": 1,
        "IS_DELETED": 0,
        "USR_CRT": "admin",
        "STATUS_CODE": "ACTIVE",
        "STATUS_NAME": "Active Status",
        "STATUS_DESC": "The status is currently active."
      },
      "pengajuanData": {
          "USR_CRT": "get current user",
          "NAMA_LENGKAP": formData.NAMA_LENGKAP,
          "ALAMAT": formData.ALAMAT,
          "NOMOR_TELEPON": formData.NOMOR_TELEPON,
          "NOMOR_ANGGOTA": formData.NOMOR_ANGGOTA,
          "NOMINAL_UANG": formData.NOMINAL_UANG,
          "NOMOR_REKENING": formData.NOMOR_REKENING,
          "BANK": formData.BANK,
          "ANGSURAN": formData.ANGSURAN,
          "DESKRIPSI": formData.DESKRIPSI
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/TR_PENGAJUAN_PINJAMAN', dataSubmit);
      console.log('Form Submitted:', dataSubmit);
      navigate('/PengajuanUser'); // Navigate to PengajuanUser after form submission
    } catch (error) {
        console.log('Error submitting form:', error);
    }
  };

  //Submit data to database
  const savePengajuanPinjaman = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/users', {
            name,
            email,
            gender
        })
        navigate("/userList")
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div>
      <H />
      <div className="flex justify-center space-x-8 mt-10">
        <div className="w-2/3 pl-10"> 
          <h2 className="text-2xl font-semibold text-center mb-6">Formulir Pengajuan Pinjaman</h2>

          <div className="bg-gray-200 p-10 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} id="form-pengajuan" className="grid grid-cols-1 gap-6">
              <div>
                <label className="block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="NAMA_LENGKAP"
                  value={formData.NAMA_LENGKAP}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block mb-1">Alamat</label>
                <input
                  type="text"
                  name="ALAMAT"
                  value={formData.ALAMAT}
                  onChange={handleChange}
                  placeholder="Alamat"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block mb-1">Nomor Telepon</label>
                <input
                  type="text"
                  name="NOMOR_TELEPON"
                  value={formData.NOMOR_TELEPON}
                  onChange={handleChange}
                  placeholder="Nomor Telepon"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block mb-1">Nomor Anggota</label>
                <input
                  type="text"
                  name="NOMOR_ANGGOTA"
                  value={formData.NOMOR_ANGGOTA}
                  onChange={handleChange}
                  placeholder="Nomor Anggota"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1">Maksimal Nominal Pinjaman</label>
                  <input
                    type="text"
                    value={formData.maksimalPinjaman}
                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-1">Nominal Uang Pinjaman</label>
                  <input
                    type="text"
                    name="NOMINAL_UANG"
                    value={formData.NOMINAL_UANG}
                    onChange={handleChange}
                    placeholder="Nominal Uang Pinjaman"
                    className="w-full p-2 border rounded bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block mb-1">Nomor Rekening</label>
                  <input
                    type="text"
                    name="NOMOR_REKENING"
                    value={formData.NOMOR_REKENING}
                    onChange={handleChange}
                    placeholder="Nomor Rekening"
                    className="w-full p-2 border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">Pilih Bank</label>
                  <select
                    name="BANK"
                    value={formData.BANK}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white"
                  >
                    <option value="">Pilih Bank</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="BCA">BCA</option>
                    <option value="BRI">BRI</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block mb-1">Angsuran (Bulan)</label>
                  <input
                    type="number"
                    name="ANGSURAN"
                    value={formData.ANGSURAN}
                    onChange={handleChange}
                    placeholder="Angsuran (Bulan)"
                    className="w-full p-2 border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">Tagihan Bulanan</label>
                  <input
                    type="text"
                    name="tagihanBulanan"
                    value={formData.tagihanBulanan}
                    onChange={handleChange}
                    placeholder="Tagihan Bulanan"
                    className="w-full p-2 border rounded bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Keperluan Pinjaman</label>
                <textarea
                  name="DESKRIPSI"
                  value={formData.DESKRIPSI}
                  onChange={handleChange}
                  placeholder="Keperluan Pinjaman"
                  className="w-full p-2 border rounded bg-white h-24 mt-4"
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
              />
              <span>Saya setuju atas ketentuan dan syarat yang sudah ditentukan.</span>
            </label>
          </div>

          <div className="mt-6"> 
            <button
              type="submit"
              onClick={handleSubmit} // Call handleSubmit to submit form
              className="bg-blue-500 text-white w-full px-6 py-2 rounded shadow hover:bg-blue-600"
            >
              Ajukan
            </button>
            <button
              type="button"
              onClick={() => navigate('/SimpanPinjam')} // Navigate back to SimpanPinjam
              className="bg-gray-300 text-black w-full px-6 py-2 rounded shadow hover:bg-gray-400 mt-2"
            >
              Kembali
            </button>
          </div>

          <div className="border p-4 rounded-lg text-center text-gray-700">
            <strong>PERHATIAN</strong>
            <p>Mohon mengisi formulir pengajuan dengan baik dan tepat.</p>
          </div>

          <img src={foto} alt="Koperasi" className="mt-4 mb-4 ml-[24px] w-full h-auto" /> 
        </div>
      </div>

      <F />
    </div>
  );
}

export default FormPengajuan;
