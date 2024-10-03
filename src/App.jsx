import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Beranda from './component/Beranda'
import TtgKam from './component/TentangKami'
import Prdk from './component/Produk'
import HubKam from './component/HubungiKami'
import User from './component/User'
import Pengajuan from './component/Pengajuan'
import SimpanPinjam from './component/SimpanPinjam'
import { useNavigate } from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element = {<Beranda/>} />
          <Route exact path="/TentangKami" element = {<TtgKam/>} />
          <Route exact path="/Produk" element = {<Prdk/>} />
          <Route exact path="/HubungiKami" element = {<HubKam/>} /> 
          <Route exact path="/User" element = {<User/>} /> 
          <Route exact path="/Pengajuan" element = {<Pengajuan/>} /> 
          <Route exact path="/SimpanPinjam" element = {<SimpanPinjam/>} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App
