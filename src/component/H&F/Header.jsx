import { PersonIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";
import foto from '../Foto/Koperasi_Logo.png';
import React, { useState, useEffect, useNavigate } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
function Header() {


    const role = localStorage.getItem('UUID_MS_JOB');


    const location = useLocation(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        console.log(token)
        if (token) {
            setIsLoggedIn(true);  // Menandakan pengguna sudah login
        } else {
            setIsLoggedIn(false); // Pengguna belum login
        }
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev); 
    };

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    const handleCloseNotifications = () => {
        setShowNotifications(false);
    };

    return (
        <>
            <header className="grid grid-cols-3 bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0]">
                <img src={foto} className="mt-[20px] mb-4 ml-[24px] w-22" />
                <nav className="text-center flex space-x-8">
                    <ul 
                    className="flex items-center space-x-8 ml-[24px]"
                    >
                        <li className="mx-[20px]">
                            <div className={`text-white ${location.pathname === '/' ? 'border-b-2 border-white' : ''} whitespace-nowrap`}>
                                <Link to='/'>Beranda</Link>
                            </div>
                        </li>
                        <li className="">
                            <div className={`text-white ${location.pathname === '/TentangKami' ? 'border-b-2 border-white' : ''} whitespace-nowrap`}>
                                <Link to='/TentangKami'>Tentang Kami</Link>
                            </div>
                        </li>
                        <li className="mx-[20px]">
                            <div className={`text-white ${location.pathname === '/Produk' ? 'border-b-2 border-white' : ''} whitespace-nowrap`}>
                                <Link to='/Produk'>Produk</Link>
                            </div>
                        </li>
                        <li>
                            <div className={`text-white ${location.pathname === '/HubungiKami' ? 'border-b-2 border-white ' : ''} whitespace-nowrap`}>
                                <Link to='/HubungiKami'>Hubungi Kami</Link>
                            </div>
                        </li>

                        {(role === '1' || role === "2") && isLoggedIn && (
                            <li className="ml-[30px] mx-[-40px]">
                                <div className={`text-white ${location.pathname === '/HalamanAwalSimpanPinjam' ? 'border-b-2 border-white' : ''} whitespace-nowrap`}>
                                    <Link to='/HalamanAwalSimpanPinjam'>Simpan Pinjam</Link>
                                </div>
                            </li>
                        )}

                        {role === '2' && isLoggedIn && (
                            <li className="relative ml-[30px] mx-[-60px]">
                            <div 
                                className={`text-white ${location.pathname === '/Pengurus' ? 'border-b-2 border-white' : ''} whitespace-nowrap`}
                                onClick={toggleDropdown} 
                            >
                                Pengurus
                            </div>
                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg z-50">
                                    <li className="whitespace-nowrap">
                                        <Link to="/ListUser" className="block px-4 py-2 hover:bg-gray-200">Daftar User Anggota</Link>
                                    </li>
                                    <li className="whitespace-nowrap">
                                        <Link to="/PengurusApprove" className="block px-4 py-2 hover:bg-gray-200">Daftar Approve User</Link>
                                    </li>
                                    <li className="whitespace-nowrap">
                                        <Link to="/LaporanKeuangan" className="block px-4 py-2 hover:bg-gray-200">Laporan Keuangan</Link>
                                    </li>
                                    <li className="whitespace-nowrap">
                                        <Link to="/BeritaMenu" className="block px-4 py-2 hover:bg-gray-200">Menu Berita</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        )
                    }
                    </ul>
                </nav>
                <div className="flex items-center mr-4 space-x-4">
    {isLoggedIn ? (
        <>
            {/* Envelope Icon untuk notifikasi */}
            <EnvelopeClosedIcon 
                className="text-white text-2xl cursor-pointer ml-[500px]" 
                onClick={handleNotificationClick} 
                style={{ width: '25px', height: '35px' }}
            />

            {/* Dropdown notifikasi jika aktif */}
            {showNotifications && (
                <div className="absolute right-0 top-16 w-96 bg-gray-100 rounded-xl shadow-2xl p-0 z-[9999] border border-gray-300">
                    <ul className="mt-0 bg-gray-100 p-4 space-y-2">
                        <li className="flex items-center justify-between bg-white w-full rounded-2xl px-6 py-3 shadow-md border border-gray-200">
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-800 font-semibold text-sm">Pinjaman telah disetujui</span>
                            </div>
                            <span className="text-xs text-gray-600">10:54 WIB</span>
                        </li>
                        <li className="flex items-center justify-between bg-white w-full rounded-2xl px-6 py-3 shadow-md border border-gray-200">
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-800 font-semibold text-sm">Berita ditambahkan</span>
                            </div>
                            <span className="text-xs text-gray-600">10:50 WIB</span>
                        </li>
                        <li className="flex items-center justify-between bg-white w-full rounded-2xl px-6 py-3 shadow-md border border-gray-200">
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-800 font-semibold text-sm">Berita terbaru</span>
                            </div>
                            <span className="text-xs text-gray-600">09:51 WIB</span>
                        </li>
                    </ul>
                </div>
            )}

            {/* Ikon Profil yang mengarah ke halaman Profile */}
            <Link to="/Profile" className="inline-block">
                <PersonIcon className="text-white text-2xl ml-[20px]" style={{ width: '30px', height: '40px' }} />
            </Link>
        </>
    ) : (
        // Jika belum login, tampilkan button "Masuk"
        <button className="border-2 border-white inline-block rounded-[8px] w-[110px] h-[40px] px-4 py-1 mt-[30px] mb-4 ml-[500px] ">
            <Link to="/Login" className="text-end">
                <PersonIcon className="inline-block align-middle mr-2 mb-[4px]" />
                Masuk
            </Link>
        </button>
    )}
</div>

                
                
                
            </header>

        </>
    );
}

export default Header; 
