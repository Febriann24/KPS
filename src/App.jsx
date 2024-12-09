import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Beranda from './component/Beranda';
import TtgKam from './component/TentangKami';
import Prdk from './component/Produk';
import HubKam from './component/HubungiKami';
import LogIn from './component/LoginNRegis/Login';
import Register from './component/LoginNRegis/Register';
import ListUser from './component/UserPengurus/ListUser';
import LaporanKeuangan from './component/UserPengurus/LaporanKeuangan';
import FormBuatBerita from './component/UserPengurus/FormBuatBerita';
import PengurusApprove from './component/UserPengurus/PengurusApprove';
import UserTable from './component/UserPengurus/UserTable';
import Profile from './component/Profile';
import BeritaMenu from './component/UserPengurus/BeritaMenu';
import ShowBerita from './component/UserPengurus/ShowBerita';
import EditBerita from './component/UserPengurus/EditBerita';
import FormPengajuanPinjaman from './component/SimpanPinjam/FormPengajuanPinjaman';
import FormPengajuanSimpanan from './component/SimpanPinjam/FormPengajuanSimpanan';
import HalamanAwalSimpanPinjam from './component/SimpanPinjam/HalamanAwalSimpanPinjam';
import ListPengajuan from './component/SimpanPinjam/ListPengajuan';
import ProsesPengajuan from './component/SimpanPinjam/ProsesPengajuan';

function App() {
  const [role, setRole] = useState(null); // Simpan role yang diambil dari localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login

  // Mengambil role dari localStorage jika ada
  useEffect(() => {
    const storedRole = localStorage.getItem('UUID_MS_JOB');
    if (storedRole) {
      setRole(parseInt(storedRole));  // Set role dari localStorage
      setIsLoggedIn(true);  // Menandakan sudah login
    }
  }, []);

  // Komponen ProtectedRoute untuk melindungi rute berdasarkan role
  const ProtectedRoute = ({ children, allowedRoles }) => {
    // Periksa apakah status login dan role sudah ada
    if (role === null || !isLoggedIn) {
      // Jika tidak login atau role belum ada, redirect ke login
      return <Navigate to="/Login" />;
    }

    // Jika role tidak diizinkan, redirect ke halaman utama atau halaman lain
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/" />;
    }

    // Akses diterima, tampilkan komponen
    return children;
  };

  // Fungsi untuk logout
  const logout = () => {
    localStorage.removeItem('UUID_MS_JOB');
    setRole(null);  // Reset role
    setIsLoggedIn(false);  // Reset login status
    // Redirect ke halaman login
    window.location.href = '/Login';
  };

  return (
    <Router>
      <Routes>
        {/* Rute yang dapat diakses semua pengguna */}
        <Route path="/" element={<Beranda />} />
        <Route path="/TentangKami" element={<TtgKam />} />
        <Route path="/Produk" element={<Prdk />} />
        <Route path="/HubungiKami" element={<HubKam />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/Register" element={<Register />} />

        {/* Rute untuk role 1 */}
        <Route
          path="/HalamanAwalSimpanPinjam"
          element={
            <ProtectedRoute allowedRoles={[1,3]}>
              <HalamanAwalSimpanPinjam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/FormPengajuanPinjaman"
          element={
            <ProtectedRoute allowedRoles={[1,3]}>
              <FormPengajuanPinjaman />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProsesPengajuan/:pengajuan/:id"
          element={
            <ProtectedRoute allowedRoles={[1,3]}>
              <ProsesPengajuan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/FormPengajuanSimpanan"
          element={
            <ProtectedRoute allowedRoles={[1,3]}>
              <FormPengajuanSimpanan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute allowedRoles={[1,2,3]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ListPengajuan"
          element={
            <ProtectedRoute allowedRoles={[1,3]}>
              <ListPengajuan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/LaporanKeuangan"
          element={
            <ProtectedRoute allowedRoles={[2,3]}>
              <LaporanKeuangan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ListUser"
          element={
            <ProtectedRoute allowedRoles={[2,3]}>
              <ListUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/BeritaMenu"
          element={
            <ProtectedRoute allowedRoles={[2]}>
              <BeritaMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/FormBuatBerita"
          element={
            <ProtectedRoute allowedRoles={[2,3]}>
              <FormBuatBerita />
            </ProtectedRoute>
          }
        />
        <Route
          path="/PengurusApprove"
          element={
            <ProtectedRoute allowedRoles={[2,3]}>
              <PengurusApprove />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userTable/:id"
          element={
            <ProtectedRoute allowedRoles={[2]}>
              <UserTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/showBerita/:id"
          element={
            <ProtectedRoute allowedRoles={[2,3]}>
              <ShowBerita />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editBerita/:id"
          element={
            <ProtectedRoute allowedRoles={[2,3]}>
              <EditBerita />
            </ProtectedRoute>
          }
        />
        <Route
          path="/FormBuatBerita"
          element={
            <ProtectedRoute allowedRoles={[2,3]}>
              <FormBuatBerita />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
