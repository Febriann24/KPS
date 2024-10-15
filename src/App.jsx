import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Beranda from './component/Beranda'
import TtgKam from './component/TentangKami'
import Prdk from './component/Produk'
import HubKam from './component/HubungiKami'
import LogIn from './component/LoginNRegis/Login'
import Register from './component/LoginNRegis/Register';
import SimpanPinjam from './component/UserAnggota/SimpanPinjam';
import FormAjukanPinjam from './component/UserAnggota/FormAjukanPinjam';
import PengajuanPinjaman from './component/UserAnggota/PengajuanPinjam';
import ListUser from './component/UserPengurus/ListUser';
import ListPengajuanUser from './component/UserPengurus/ListPengajuanUser';
import FormBuatBerita from './component/UserPengurus/FormBuatBerita';
import Profile from './component/Profile';

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route exact path="/" element = {<Beranda/>} />
        <Route exact path="/TentangKami" element = {<TtgKam/>} />
        <Route exact path="/Produk" element = {<Prdk/>} />
        <Route exact path="/HubungiKami" element = {<HubKam/>} /> 
        <Route exact path="/Login" element = {<LogIn/>} /> 
        <Route exact path='/Register' element={<Register/>} />

        <Route exact path='/SimpanPinjam' element={<SimpanPinjam/>} />
        <Route exact path="/FormAjukanPinjam" element={<FormAjukanPinjam/>} />
        <Route exact path='/PengajuanPinjaman' element = {<PengajuanPinjaman/>} />
        <Route exact path='/ListUser' element = {<ListUser/>} />
        <Route exact path='/ListPengajuanUser' element = {<ListPengajuanUser/>} />
        <Route exact path='/FormBuatBerita' element ={<FormBuatBerita/>} />
        <Route exact path='/Profile' element = {<Profile/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
