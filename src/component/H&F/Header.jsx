import { PersonIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"
import foto from '../Foto/Koperasi_Logo.png'
function Header(){
    return(
        <>
        <header className="grid grid-cols-3 bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0]">
            <img src={foto} className="mt-[20px] mb-4 ml-[24px] w-22"/>
            <nav className ="text-center ">
                <ul className="grid grid-cols-6 text-center mt-[35px] mb-5">
                    <li className="text-white">
                        <Link to='/' >Beranda</Link>
                    </li>
                    <li className="text-white">
                        <Link to='/TentangKami' >Tentang Kami</Link>
                    </li>
                    <li className="text-white">
                        <Link to='/Produk' >Produk</Link>
                    </li>
                    <li className="text-white">
                        <Link to='/HubungiKami' >Hubungi Kami</Link>
                    </li>
                    <li className="text-white">
                        <Link to='/SimpanPinjam' >Simpan Pinjam</Link>
                    </li>
                    <li className="relative text-white group">
                    {/* Pengurus Menu with Dropdown */}
                    <button className="focus:outline-none py-1 px-2 text-sm">
                        Pengurus
                    </button>
                    {/* Dropdown Menu */}
                    <ul className="absolute left-0 hidden w-56 bg-gray-800 text-white rounded shadow-lg mt-1 group-hover:block z-50">
                        <li className="px-4 py-2 hover:bg-gray-600 text-sm">
                        <Link to="/User">Daftar User Anggota</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-600 text-sm">
                        <Link to="/Pengajuan">Lihat Pengajuan User</Link>
                        </li>
                    </ul>
                    </li>

                </ul>
                </nav>

            <nav className="text-end ">
                <button className="border-2 border-white inline-block rounded-[8px] px-2 py-1 mt-[30px] mb-4 mr-[24px] d-flex align-items-center">
                    <PersonIcon className="inline-block align-middle mr-2 mb-[4px]" /> 
                    Masuk
                </button>
            </nav>
        </header>
        </>
    )
}

export default Header