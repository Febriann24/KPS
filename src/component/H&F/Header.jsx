import { useState } from 'react';
import { PersonIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { FaBell } from 'react-icons/fa';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import foto from '../Foto/Koperasi_Logo.png';

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <>
      <header className="flex justify-between items-center bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] p-4 relative z-20">
        <img src={foto} className="w-22" alt="Koperasi Logo" />

        <nav className="flex flex-grow justify-center">
          <ul className="flex space-x-4">
            <li className="text-white">
              <Link to="/" className="py-2 px-4">Beranda</Link>
            </li>
            <li className="text-white">
              <Link to="/TentangKami" className="py-2 px-4">Tentang Kami</Link>
            </li>
            <li className="text-white">
              <Link to="/Produk" className="py-2 px-4">Produk</Link>
            </li>
            <li className="text-white">
              <Link to="/HubungiKami" className="py-2 px-4">Hubungi Kami</Link>
            </li>
            <li className="text-white">
              <Link to="/SimpanPinjam" className="py-2 px-4">Simpan Pinjam</Link>
            </li>
            <li className="relative text-white group">
              <button className="focus:outline-none px-4 inline-block text-white text-md hover:text-gray-200 transition duration-300">
                Pengurus
              </button>
              <ul className="absolute left-0 hidden w-56 bg-gray-800 text-white rounded shadow-lg group-hover:block z-50">
                <li className="px-4 py-2 hover:bg-gray-600 text-sm">
                  <Link to="/User">Daftar User Anggota</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600 text-sm">
                  <Link to="/Pengajuan">Lihat Pengajuan User</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600 text-sm">
                  <Link to="/FormBerita">Formulir Tambah Berita</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <nav className="flex items-center space-x-4 relative z-30">
          <button onClick={handleNotificationClick} className="relative border-2 border-white rounded-[8px] px-2 py-1 focus:outline-none z-30">
            <FaBell className="text-white text-lg" />
            <span className="absolute top-0 right-0 w-4 h-4 text-sm text-center text-white bg-red-500 rounded-full z-40">3</span>
          </button>

          {showNotifications && (
            <div className="absolute right-4 top-16 w-96 bg-gray-100 rounded-xl shadow-2xl p-0 z-[9999] border border-gray-300">
              <div className="relative w-full h-[70px] rounded-t-xl bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] flex items-center px-4 text-white font-semibold text-base">
                <button onClick={handleCloseNotifications} className="text-white focus:outline-none mr-2 text-2xl font-bold py-1 px-2">
                  &lt; 
                </button>
                <span className="relative z-10">Notifikasi</span>
              </div>

              <ul className="mt-0 bg-gray-100 p-4 space-y-2 rounded-b-xl">
                <li className="flex items-center justify-between bg-white w-full rounded-2xl px-6 py-3 shadow-md border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <FiAlertCircle className="text-red-500 text-xl" />
                    <span className="text-gray-800 font-semibold text-sm">Pinjaman telah disetujui</span>
                  </div>
                  <span className="text-xs text-gray-600">10:54 WIB</span>
                </li>
                <li className="flex items-center justify-between bg-white w-full rounded-2xl px-6 py-3 shadow-md border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <FiAlertCircle className="text-red-500 text-xl" />
                    <span className="text-gray-800 font-semibold text-sm">Berita ditambahkan</span>
                  </div>
                  <span className="text-xs text-gray-600">10:50 WIB</span>
                </li>
                <li className="flex items-center justify-between bg-white w-full rounded-2xl px-6 py-3 shadow-md border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <FiCheckCircle className="text-green-500 text-xl" />
                    <span className="text-gray-800 font-semibold text-sm">Berita terbaru</span>
                  </div>
                  <span className="text-xs text-gray-600">09:51 WIB</span>
                </li>
              </ul>
            </div>
          )}

        <Link to="/Profile">
          <button className="border-2 border-white inline-block rounded-full w-10 h-10 flex items-center justify-center z-30">
            <PersonIcon className="text-white w-6 h-6" />  {/* Adjust icon size here */}
          </button>
        </Link>
      </nav>
      </header>
    </>
  );
}

export default Header;