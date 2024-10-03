import { PersonIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom"; // Pastikan useLocation diimpor
import foto from '../Foto/Koperasi_Logo.png';

function Header() {
    const location = useLocation(); // Mendapatkan URL saat ini

    return (
        <>
            <header className="grid grid-cols-3 bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0]">
                <img src={foto} className="mt-[20px] mb-4 ml-[24px] w-22" />
                <nav className="text-center">
                    <ul className="grid grid-cols-4 text-center mt-[35px] mb-4">
                        <li className={`text-white ${location.pathname === '/' ? 'border-b-2 mx-[38px] broder-white' : ''}`}>
                            <Link to='/'>Beranda</Link>
                        </li>
                        <li className={`text-white ${location.pathname === '/TentangKami' ? 'border-b-2 mx-[22px] broder-white' : ''}`}>
                            <Link to='/TentangKami'>Tentang Kami</Link>
                        </li>
                        <li className={`text-white ${location.pathname === '/Produk' ? 'border-b-2 mx-[40px] broder-white' : ''}`}>
                            <Link to='/Produk'>Produk</Link> {/* Perbaiki arah link */}
                        </li>
                        <li className={`text-white ${location.pathname === '/HubungiKami' ? 'border-b-2 mx-[22px] broder-white '  : ''}`}>
                            <Link to='/HubungiKami'>Hubungi Kami</Link> {/* Perbaiki arah link */}
                        </li>
                    </ul>
                </nav>
                <nav className="text-end">
                    <button className="border-2 border-white inline-block rounded-[8px] px-2 py-1 mt-[30px] mb-4 mr-[24px] d-flex align-items-center">
                        <PersonIcon className="inline-block align-middle mr-2 mb-[4px]" />
                        Masuk
                    </button>
                </nav>
            </header>
        </>
    );
}

export default Header;
