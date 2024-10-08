import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import H from "./H&F/Header";
import F from "./H&F/Footer";

const SimpanPinjam = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="w-full">
        <H />
      </div>

      <div className="flex flex-1 max-w-7xl mx-auto p-6 gap-6">
  <div className="flex-1">

    <div className="bg-white rounded-lg shadow-md p-4 mb-6 text-center mx-auto" style={{ width: '600px' }}> 
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Tabungan Koperasi</h2>
      <h1 className="text-5xl font-bold text-green-600 mb-4">Rp 2.399.832.200,00</h1>
      <p className="text-base text-gray-600">Total Pinjaman Koperasi: Rp 20.200.000,00</p>
      <p className="text-base text-gray-600">Total Anggota Koperasi: 128 🧑</p>
    </div>

    <div className="p-6 rounded-lg bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white shadow-md w-full md:w-11/12 mx-auto overflow-hidden" style={{ width: '600px' }}>
  <div className="overflow-y-auto h-96">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="p-4 rounded-lg border border-white bg-white shadow-sm relative h-24 w-full md:w-65"> 
        <h3 className="text-xl font-semibold text-black">Simpanan Pokok</h3> 
        <p className="text-base font-medium text-gray-600 mt-2">Rp 10.000.000,00</p> 
        <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-500 absolute top-4 right-4" />
      </div>

      <div className="p-4 rounded-lg border border-white bg-white shadow-sm relative h-24 w-full md:w-60"> 
        <h3 className="text-xl font-semibold text-black">Simpanan Wajib</h3> 
        <p className="text-base font-medium text-gray-600 mt-2">Rp 3.300.000,00</p> 
        <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-500 absolute top-4 right-4" />
      </div>

      <div className="p-4 rounded-lg border border-white bg-white shadow-sm relative h-24 w-full md:w-65"> 
        <h3 className="text-xl font-semibold text-black">Simpanan Mandiri</h3> 
        <p className="text-base font-medium text-gray-600 mt-2">Rp 10.000.000,00</p> 
        <FontAwesomeIcon icon={faPlusCircle} className="text-2xl text-gray-400 absolute top-4 right-4" />
      </div>

      <div className="p-4 rounded-lg border border-white bg-white shadow-sm relative h-24 w-full md:w-60"> 
        <h3 className="text-xl font-semibold text-black">Simpanan Edukasi</h3> 
        <p className="text-base font-medium text-gray-600 mt-2">Rp 10.000.000,00</p> 
        <FontAwesomeIcon icon={faPlusCircle} className="text-2xl text-gray-400 absolute top-4 right-4" />
      </div>

      <div className="p-4 rounded-lg border border-white bg-white shadow-sm relative h-24 w-full md:w-65">
        <h3 className="text-xl font-semibold text-black">Simpanan Usaha</h3> 
        <p className="text-base font-medium text-gray-600 mt-2">Rp 10.000.000,00</p> 
        <FontAwesomeIcon icon={faPlusCircle} className="text-2xl text-gray-400 absolute top-4 right-4" />
      </div>


      <div className="p-4 rounded-lg border border-white bg-white shadow-sm relative h-24 w-full md:w-60"> 
        <h3 className="text-xl font-semibold text-black">Simpanan Tambahan 1</h3> 
        <p className="text-base font-medium text-gray-600 mt-2">Rp 5.000.000,00</p> 
        <FontAwesomeIcon icon={faPlusCircle} className="text-2xl text-gray-400 absolute top-4 right-4" />
      </div>

      <div className="p-4 rounded-lg border border-white bg-white shadow-sm relative h-24 w-full md:w-65"> 
        <h3 className="text-xl font-semibold text-black">Simpanan Tambahan 2</h3> 
        <p className="text-base font-medium text-gray-600 mt-2">Rp 15.000.000,00</p> 
        <FontAwesomeIcon icon={faPlusCircle} className="text-2xl text-gray-400 absolute top-4 right-4" />
      </div>

      <div className="p-4 rounded-lg border border-white bg-white shadow-sm relative h-24 w-full md:w-60"> 
        <h3 className="text-xl font-semibold text-black">Simpanan Tambahan 3</h3>
        <p className="text-base font-medium text-gray-600 mt-2">Rp 12.000.000,00</p> 
        <FontAwesomeIcon icon={faPlusCircle} className="text-2xl text-gray-400 absolute top-4 right-4" />
      </div>

    </div>
  </div>
</div>
</div>

  <div className="w-full max-w-lg h-[530px] mx-auto" style={{ width: '600px' }}>
        <div className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white rounded-lg shadow-md p-8 mb-6 text-center relative h-full">
            
            <div className="w-52 h-52 bg-gray-300 rounded-full mx-auto mb-4"></div>
            
            <h2 className="text-3xl font-semibold mb-2">Admin Gunawan</h2>
            
            <div className="h-1 bg-white mb-4 w-1/2 mx-auto rounded"></div>
            
            <div className="absolute inset-x-4 bottom-8 bg-black bg-opacity-50 px-4 py-6 rounded-lg w-[90%] mx-auto">

            <div className="text-left text-white">
              <div className="flex mb-2">
                <p className="text-lg w-48">Total Tabungan</p>
                <p className="text-lg ml-4">: Rp 12.435.600,00</p>
              </div>
              <div className="flex mb-2">
                <p className="text-lg w-48">Total Pinjaman</p>
                <p className="text-lg ml-4">: Rp 750.650,00</p>
              </div>
              <div className="flex">
                <p className="text-lg w-48">Simpanan Pokok</p>
                <p className="text-lg ml-4">
                  : <span className="text-green-400 font-semibold">Memenuhi</span>
                </p>
              </div>
            </div>
            </div>
            </div>

          <div className="flex justify-between gap-4">
            <a href="/FormPengajuan" className="w-full">
            <button className="w-full py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-colors font-bold">
                Ajukan Pinjaman
            </button>
            </a>
            <a href="/PengajuanUser" className="w-full">
            <button className="w-full py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-colors font-bold">
                Lihat Pengajuan pengurus
            </button>
            </a>
          </div>
          <a href="#" className="block mt-4 text-center text-blue-500 underline">
            Baca Ketentuan Pengajuan Pinjaman
          </a>
        </div>
      </div>

      <div className="w-full mt-auto">
        <F />
      </div>
    </div>
  );
};

export default SimpanPinjam;
