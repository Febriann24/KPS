import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import Beranda from './component/Beranda'
import TtgKam from './component/TentangKami'
import Prdk from './component/Produk'
import HubKam from './component/HubungiKami'
import LogIn from './component/LoginNRegis/Login'
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
// import BerandaAnggota from './component/UserAnggota/main/BerandaAnggota';
// import BerandaPengurus from './component/UserPengurus/main/BerandaPengurus';
import FormPengajuanPinjaman from './component/SimpanPinjam/FormPengajuanPinjaman'
import FormPengajuanSimpanan from './component/SimpanPinjam/FormPengajuanSimpanan'
import HalamanAwalSimpanPinjam from './component/SimpanPinjam/HalamanAwalSimpanPinjam'
import ListPengajuan from './component/SimpanPinjam/ListPengajuan'
import ProsesPengajuan from './component/SimpanPinjam/ProsesPengajuan'
import GeneralSettings from './component/UserAdmin/GeneralSettings'
import ConfigCMS from './component/UserAdmin/ConfigCMS.jsx';
import ListBerita from './component/UserAdmin/ListBerita.jsx';
import ListUserAdmin from './component/UserAdmin/LIstUserAdmin.jsx';
import ModalUpdateSetting from './component/UserAdmin/ModalEditGenset.jsx';

import axios from 'axios';
import {
  getCurrentLoggedInID
} from './utils/utils.js'

function App() {
  const userID = getCurrentLoggedInID()
  const [serverStatus, setServerStatus] = useState("");
  useEffect(() => {
    const fetchServer = async () => {
      try {
        const serverStatus = await axios.get("http://localhost:5000/getServerStatus");
        setServerStatus(serverStatus ? "ONLINE" : "OFFLINE");
      } catch (error) {
        console.log(error)
        setServerStatus("OFFLINE");
      }
    }

    fetchServer();

  }, []);
  

  return (
    <>
      {serverStatus === "OFFLINE" && (
        <div>
          <p>Server is currently offline, please contact: 0819699378</p>
        </div>
      )}
      
        {serverStatus === "ONLINE" && (
        <Router>
          <Routes>
            <Route exact path="/" element = {<Beranda/>} />
            <Route exact path="/TentangKami" element = {<TtgKam/>} />
            <Route exact path="/Produk" element = {<Prdk/>} />
            <Route exact path="/HubungiKami" element = {<HubKam/>} /> 
            <Route exact path="/Login" element = {<LogIn/>} /> 
            <Route exact path='/Register' element={<Register/>} />
            <Route exact path='/generalsettings' element = {<GeneralSettings/>} />
            <Route exact path='/cmsconfig' element = {<ConfigCMS/>} />
            <Route exact path='/accountmanagement' element = {<ListUserAdmin/>} />
            <Route exact path='/newsmanagement' element = {<ListBerita/>} />
            <Route exact path='/modalupdate' element = {<ModalUpdateSetting/>} />
          </Routes>
            {userID  && (
            <Routes>
              <Route exact path='/HalamanAwalSimpanPinjam' element={<HalamanAwalSimpanPinjam/>} />
              <Route exact path="/FormPengajuanPinjaman" element={<FormPengajuanPinjaman/>} />
              <Route exact path='/ProsesPengajuan/:pengajuan/:id' element = {<ProsesPengajuan/>} />
              <Route exact path='/FormPengajuanSimpanan' element = {<FormPengajuanSimpanan/>} />
              <Route exact path='/ListUser' element = {<ListUser/>} />
              <Route exact path='/LaporanKeuangan' element = {<LaporanKeuangan/>} />
              <Route exact path='/BeritaMenu' element ={<BeritaMenu/>} />
              <Route exact path='/FormBuatBerita' element ={<FormBuatBerita/>} />
              <Route exact path='/PengurusApprove' element ={<PengurusApprove/>} />
              <Route exact path='/userTable/:id' element ={<UserTable/>} />
              <Route exact path='/Profile' element = {<Profile/>} />
              <Route exact path='/showBerita/:id' element ={<ShowBerita/>} />
              <Route exact path='/editBerita/:id' element ={<EditBerita/>} />
              <Route exact path='/ListPengajuan' element = {<ListPengajuan/>} />
            </Routes>
            )}
        </Router>
        )} 
    </>
  )
}

export default App
