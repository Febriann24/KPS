import React, { useState } from 'react';
import H from './H&F/Header';
import F from './H&F/Footer';
import foto from './Foto/Handshake.jpg';
import { Link } from "react-router-dom";

const PengajuanUser = () => {
  const [showPinModal, setShowPinModal] = useState(false);
  const [showCetakModal, setShowCetakModal] = useState(false);
  const [pinInput, setPinInput] = useState('');

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <H />

      <div className="flex-grow p-10">
        <div className="bg-gray-100 shadow-lg rounded p-4">
        <button className="bg-gray-300 text-black px-4 py-2 rounded mb-4">
            <Link to="/SimpanPinjam" className="text-black">
                Kembali
            </Link>
        </button>

          <div className="relative flex justify-between items-center px-16 py-8">
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-2 bg-gray-200 rounded-full" style={{ left: '80px', right: '80px' }}></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full" style={{ left: '80px', width: 'calc(50% - 64px)' }}></div>

            <div className="relative flex flex-col items-center">
              <div className="mb-2" style={{ marginBottom: '65px' }}> 
                <img src={foto} className="mt-5 mb-2 w-16 h-auto" alt="Koperasi Logo" />
              </div>
              <div className="relative" style={{ top: '-50px' }}> 
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                  ✔️
                </div>
              </div>
              <span className="mt-2 text-green-500 font-semibold">Disetujui</span>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="mb-2" style={{ marginBottom: '65px' }}>
                <svg width="50" height="50" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.2 1H4.17741H4.1774C3.86936 0.999988 3.60368 0.999978 3.38609 1.02067C3.15576 1.04257 2.92825 1.09113 2.71625 1.22104C2.51442 1.34472 2.34473 1.51442 2.22104 1.71625C2.09113 1.92825 2.04257 2.15576 2.02067 2.38609C1.99998 2.60367 1.99999 2.86935 2 3.17738V3.1774V3.2V11.8V11.8226V11.8226C1.99999 12.1307 1.99998 12.3963 2.02067 12.6139C2.04257 12.8442 2.09113 13.0717 2.22104 13.2837C2.34473 13.4856 2.51442 13.6553 2.71625 13.779C2.92825 13.9089 3.15576 13.9574 3.38609 13.9793C3.60368 14 3.86937 14 4.17741 14H4.2H10.8H10.8226C11.1306 14 11.3963 14 11.6139 13.9793C11.8442 13.9574 12.0717 13.9089 12.2837 13.779C12.4856 13.6553 12.6553 13.4856 12.779 13.2837C12.9089 13.0717 12.9574 12.8442 12.9793 12.6139C13 12.3963 13 12.1306 13 11.8226V11.8V3.2V3.17741C13 2.86936 13 2.60368 12.9793 2.38609C12.9574 2.15576 12.9089 1.92825 12.779 1.71625C12.6553 1.51442 12.4856 1.34472 12.2837 1.22104C12.0717 1.09113 11.8442 1.04257 11.6139 1.02067C11.3963 0.999978 11.1306 0.999988 10.8226 1H10.8H4.2ZM3.23875 2.07368C3.26722 2.05623 3.32362 2.03112 3.48075 2.01618C3.64532 2.00053 3.86298 2 4.2 2H10.8C11.137 2 11.3547 2.00053 11.5193 2.01618C11.6764 2.03112 11.7328 2.05623 11.7613 2.07368C11.8285 2.11491 11.8851 2.17147 11.9263 2.23875C11.9438 2.26722 11.9689 2.32362 11.9838 2.48075C11.9995 2.64532 12 2.86298 12 3.2V11.8C12 12.137 11.9995 12.3547 11.9838 12.5193C11.9689 12.6764 11.9438 12.7328 11.9263 12.7613C11.8851 12.8285 11.8285 12.8851 11.7613 12.9263C11.7328 12.9438 11.6764 12.9689 11.5193 12.9838C11.3547 12.9995 11.137 13 10.8 13H4.2C3.86298 13 3.64532 12.9995 3.48075 12.9838C3.32362 12.9689 3.26722 12.9438 3.23875 12.9263C3.17147 12.8851 3.11491 12.8285 3.07368 12.7613C3.05624 12.7328 3.03112 12.6764 3.01618 12.5193C3.00053 12.3547 3 12.137 3 11.8V3.2C3 2.86298 3.00053 2.64532 3.01618 2.48075C3.03112 2.32362 3.05624 2.26722 3.07368 2.23875C3.11491 2.17147 3.17147 2.11491 3.23875 2.07368ZM5 10C4.72386 10 4.5 10.2239 4.5 10.5C4.5 10.7761 4.72386 11 5 11H8C8.27614 11 8.5 10.7761 8.5 10.5C8.5 10.2239 8.27614 10 8 10H5ZM4.5 7.5C4.5 7.22386 4.72386 7 5 7H10C10.2761 7 10.5 7.22386 10.5 7.5C10.5 7.77614 10.2761 8 10 8H5C4.72386 8 4.5 7.77614 4.5 7.5ZM5 4C4.72386 4 4.5 4.22386 4.5 4.5C4.5 4.77614 4.72386 5 5 5H10C10.2761 5 10.5 4.77614 10.5 4.5C10.5 4.22386 10.2761 4 10 4H5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              </div>
              <div className="relative" style={{ top: '-40px' }}>
                <div className="w-10 h-10 bg-white border-4 border-yellow-500 rounded-full flex items-center justify-center text-yellow-500 font-bold z-10 animate-spin-slow">
                  ⏳
                </div>
              </div>
              <span className="mt-2 text-yellow-500 font-semibold">
                Menunggu Proses Pengalihan Dana
              </span>
            </div>

            <div className="relative flex flex-col items-center">
            <div className="mb-2" style={{ marginBottom: '65px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="relative" style={{ top: '-40px' }}>
                <div className="absolute h-2 bg-green-500 rounded-full w-6" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                  <div className="h-2 bg-green-500 rounded-full w-1/2" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                  ✔️
                </div>
              </div>
              <span className="mt-2 text-gray-500 font-semibold">Selesai</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="p-6 shadow-lg rounded-md bg-white flex flex-col justify-between h-full">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Benyamin Simanjuntak</h3>
                  <p className="text-gray-500">IT Support</p>
                </div>
              </div>
              <div className="space-y-2 text-sm mt-4">
                <p>Total Tabungan: <span className="font-bold">Rp 12.435.600,00</span></p>
                <p>Total Pinjaman: <span className="font-bold">Rp 750.650,00</span></p>
                <p>Simpanan Pokok: <span className="font-bold text-green-500">Memenuhi ✔️</span></p>
                <p>Tanggal Bergabung: 12 September 2023</p>
                <p>Alamat: Graha Cempakamas, Blok A1, No. 2, Jakarta</p>
                <p>Nomor Telepon: 0817622342</p>
                <p>Nomor Anggota: 000058</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="p-6 shadow-lg rounded-md bg-white flex flex-col h-full">
              <h3 className="text-center text-lg font-semibold">Data Formulir Pengajuan</h3>
              <div className="flex-grow mt-4 space-y-2">
                <div className="flex">
                  <p className="text-sm w-1/4 pr-2">Nominal Uang Pinjaman</p>
                  <p className="text-sm">: <span className="font-bold">Rp 530.000,00</span></p>
                </div>
                <div className="flex">
                  <p className="text-sm w-1/4 pr-2"></p>
                  <p className="text-sm"> (LIMA RATUS TIGA PULUH RIBU RUPIAH)</p>
                </div>
                <div className="flex">
                  <p className="text-sm w-1/4 pr-2">Nomor Rekening Bank</p>
                  <p className="text-sm">: <span className="font-bold">01238123648 Mandiri</span></p>
                </div>
                <div className="flex">
                  <p className="text-sm w-1/4 pr-2">Keperluan Pinjaman</p>
                  <p className="text-sm">: <span className="font-bold">Untuk memenuhi keperluan bisnis cilok</span></p>
                </div>
                <div className="flex">
                  <p className="text-sm w-1/4 pr-2">Angsuran (Bulan)</p>
                  <p className="text-sm">: <span className="font-bold">12 bulan</span></p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button className="bg-green-500 text-white px-6 py-2 rounded flex-grow mr-1" onClick={() => setShowPinModal(true)}>
                  SETUJU
                </button>
                <button className="bg-red-500 text-white px-6 py-2 rounded flex-grow mx-1">
                  TOLAK
                </button>
                <button className="bg-gray-300 text-black px-6 py-2 rounded flex-grow ml-1" onClick={() => setShowCetakModal(true)}>
                  Cetak Dokumen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPinModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-center text-lg font-semibold mb-4">
              Masukkan PIN untuk Konfirmasi
            </h3>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Masukkan PIN Anda"
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none"
            />
            <div className="mt-4 flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  alert(`PIN Dikonfirmasi: ${pinInput}`);
                  setShowPinModal(false);
                }}
              >
                KONFIRMASI
              </button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={() => setShowPinModal(false)}>
                KEMBALI
              </button>
            </div>
          </div>
        </div>
      )}

      {showCetakModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-center text-lg font-semibold mb-4">
              Bukti keberhasilan pengalihan dana
            </h3>
            <img 
              src="https://via.placeholder.com/150" 
              alt="Bukti" 
              className="w-full h-auto mb-4"
            />
            <div className="mt-4 flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowCetakModal(false);
                }}
              >
                SELESAI
              </button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={() => setShowCetakModal(false)}>
                KEMBALI
              </button>
            </div>
          </div>
        </div>
      )}

      <F />
    </div>
  );
};

export default PengajuanUser;
