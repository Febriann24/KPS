import React from 'react';
import H from "./H&F/Header";  
import F from "./H&F/Footer";  
import foto from './Foto/Koperasi_Logo.png';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user'); 
        navigate('/'); 
    };
  return (
    <div className="min-h-screen flex flex-col">
      <H />

      <div className="flex-grow flex bg-gray-50">
        <div className="hidden md:flex md:w-1/2 h-full items-center justify-center">
          <img 
            src={foto} 
            className="w-[600px] h-[660px] object-cover rounded-lg shadow-lg mt-16" 
            alt="Koperasi Logo" 
            style={{ position: 'static' }}
          />
        </div>

        <div className="flex-grow md:w-1/2 p-8 md:p-16 flex items-center justify-center bg-white">
          <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-gray-100">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                <span className="text-gray-500 text-4xl">👤</span>
              </div>
              <h2 className="text-xl font-semibold">Bohemian Yanto Widjaya</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-lg">👤</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Nama Lengkap</p>
                  <p>Bohemian Yanto Widjaya</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg">📞</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Nomor Telepon</p>
                  <p>0819 699 378</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg">✉️</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Email</p>
                  <p>nicolasowen209@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg">📍</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Alamat</p>
                  <p>Tangerang, Dalton Selatan IV</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg">📅</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Tanggal Lahir</p>
                  <p>20/01/1642</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
                <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
                EDIT
                </button>

                <button
                onClick={handleLogout}
                className="bg-white text-black rounded px-4 py-2 mt-4"
                >
                Logout
                </button>
            </div>
          </div>
        </div>
      </div>
      <F />
    </div>
  );
}
