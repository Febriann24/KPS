import React, { useState } from 'react';
import H from "./H&F/Header";
import F from "./H&F/Footer";
import foto from './Foto/Koperasi.jpg';
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function FormPengajuan() {
  const navigate = useNavigate(); // Create navigate function for navigation
  const [formData, setFormData] = useState({
    namaLengkap: '',
    alamat: '',
    nomorTelepon: '',
    nomorAnggota: '',
    maksimalPinjaman: 'Rp 599.958.050,00',
    nominalPinjaman: 'Rp 530.000,00',
    nomorRekening: '',
    bank: '',
    angsuran: '12',
    tagihanBulanan: 'Rp 100.000',
    keperluanPinjaman: '',
    setuju: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form Submitted:', formData);
    navigate('/PengajuanUser'); // Navigate to PengajuanUser after form submission
  };

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
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block mb-1">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Alamat"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block mb-1">Nomor Telepon</label>
                <input
                  type="text"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handleChange}
                  placeholder="Nomor Telepon"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block mb-1">Nomor Anggota</label>
                <input
                  type="text"
                  name="nomorAnggota"
                  value={formData.nomorAnggota}
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
                    name="nominalPinjaman"
                    value={formData.nominalPinjaman}
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
                    name="nomorRekening"
                    value={formData.nomorRekening}
                    onChange={handleChange}
                    placeholder="Nomor Rekening"
                    className="w-full p-2 border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">Pilih Bank</label>
                  <select
                    name="bank"
                    value={formData.bank}
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
                    name="angsuran"
                    value={formData.angsuran}
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
                  name="keperluanPinjaman"
                  value={formData.keperluanPinjaman}
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
              type="button"
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
