import { PersonIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";
import foto from '../../Foto/Koperasi_Logo.png';
import React, { useState, useEffect, useNavigate } from 'react';

export default function NavBarAnggota() {

    const location = useLocation(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setIsLoggedIn(true); 
            setUser(JSON.parse(loggedInUser)); 
        }
    }, []);
  
    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false); 
        setUser(null); 
        setIsDropdownOpen(false); 
        setShowNotifications(false); 
    };

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
                <nav className="text-center">
                    <ul className={`grid grid-cols-5 text-center mt-[35px] mb-4`}>
                        <li className="mx-[20px]">
                            <div className={`text-white ${location.pathname === '/' ? 'border-b-2 border-white' : ''} whitespace-nowrap`}>
                                <Link to='/'>Beranda</Link>
                            </div>
                        </li>
                        <li className="mx-[10px]">
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
                        <li className="ml-[30px] mx-[-40px]">
                            <div className={`text-white ${location.pathname === '/SimpanPinjam' ? 'border-b-2 border-white' : ''} whitespace-nowrap`}>
                                <Link to='/SimpanPinjam'>Simpan Pinjam</Link>
                            </div>
                        </li>
                        
                    </ul>
                </nav>
                
                <div className="text-end">
                            {/* Ikon Notifikasi */}
                                <div className="relative inline-block mr-4">
                                    <EnvelopeClosedIcon 
                                        className="text-white text-2xl cursor-pointer" 
                                        onClick={handleNotificationClick} 
                                        style={{ width: '25px', height: '35px' }}
                                    />
                                    {/* Notifikasi Dropdown */}
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
                                </div>
                            <Link to="/Profile" className="inline-block">
                                <PersonIcon className="text-white text-2xl mt-[30px] mr-[30px] ml-[20px] " style={{ width: '30px', height: '40px' }}/>
                            </Link>
                </div>
            </header>
            </>
    )
}