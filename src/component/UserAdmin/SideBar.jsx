import { PencilIcon, UserIcon, Cog8ToothIcon} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-50 flex flex-col justify-start p-4 text-black shadow-[0.5px_0px_5px_rgba(0,0,0,0.3)]">
      <h2 className="text-2xl font-bold mt-3 ml-3 text-start">Pengaturan</h2>
      <ul className="mt-5 text-[17px]">
        <li className="mb-4 flex items-center hover:cursor-pointer hover:text-white hover:bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] p-2 rounded">
          <Link to="/newsmanagement" className="flex items-center">
            <PencilIcon className="w-7 h-7 mr-2" />Manajemen Berita
          </Link>
        </li>
        <li className="mb-4 flex items-center hover:cursor-pointer hover:text-white hover:bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] p-2 rounded">
          <Link to="/accountmanagement" className="flex items-center">
            <UserIcon className="w-7 h-7 mr-2" />
            Manajemen Akun
          </Link>
        </li>
        <li className="mb-4 flex items-center hover:cursor-pointer hover:text-white hover:bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] p-2 rounded">
          <Link to="/generalsettings" className="flex items-center">
            <Cog8ToothIcon className="w-7 h-7 mr-2" />
            Konfigurasi Aplikasi
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
