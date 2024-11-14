import H from "../H&F/Header"
import F from "../H&F/Footer"
import { Link } from "react-router-dom";

{/* DATABASE REQUIRED:
    MS_USER Get Data User
    TR_MONTHLY_FINANCE_ANGGOTA Get Monthly Finance Anggota
    TR_MONTHLY_FINANCIAL_STATEMENT Get Total Tabungan Koperasi
  */}
function SimpanPinjam() {
    return (
      <>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <div className="w-full">
            <H /> {/* Header */}
          </div>

          <div className="flex-1 flex justify-center">
            <div className="grid grid-cols-2 grid-rows-3 gap-4 max-w-7xl w-full p-12 h-full" style={{width:"1300px"}}>
              <div className="col-span-1 row-span-1 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Tabungan Koperasi</h2>
                <h1 className="text-5xl font-bold text-green-600 mb-4">Rp 2.399.832.200,00</h1> {/* TABUNGAN KOPERASI */}
              </div>

              <div className="col-span-1 row-span-4">
                <div className="flex flex-col">
                  <div className="w-full mx-auto">
                    <div className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white rounded-lg shadow-md p-8 mb-6 text-center relative h-full">
                      <div className="w-52 h-52 bg-gray-300 rounded-full mx-auto mb-4">
                        Profile Picture
                      </div>
                      <h2 className="text-3xl font-semibold mb-2 truncate">
                        Hollywood Benjamin Gunawan 
                      </h2>


                      <div className="h-1 bg-white mb-4 w-full mx-auto rounded"></div> {/* H-LINE */}

                      <div className="bg-black bg-opacity-30 px-4 py-4 rounded-lg mx-auto">
                        <div className="text-left text-white">
                          <div className="flex mb-2">
                          <p className="text-lg w-48">Unit Kerja</p>
                          <p className="text-lg ml-4">: Sekolah</p>
                          </div>
                          <div className="flex mb-2">
                          <p className="text-lg w-48">Nomor Anggota</p>
                          <p className="text-lg ml-4">: A79123</p>
                          </div>
                          <div className="flex mb-2">
                          <p className="text-lg w-48">Total Tabungan</p>
                          <p className="text-lg ml-4">: Rp 750.650,00</p>
                          </div>
                          <div className="flex mb-2">
                          <p className="text-lg w-48">Tanggal Bergabung</p>
                          <p className="text-lg ml-4">: Oktober 12 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between gap-4">
                      <Link to='/FormAjukanPinjam' className="w-full">
                      <button className="w-full py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-colors font-bold">
                        Ajukan Pengajuan
                      </button>
                      </Link>
                      <Link to='/ListPengajuanUser' className="w-full">
                      <button className="w-full py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-colors font-bold">
                        Lihat Pengajuan
                      </button>
                      </Link>
                    </div>
                    <a href="#" className="block mt-4 text-center text-blue-500 underline">
                      Baca Syarat & Ketentuan Pengajuan
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-span-1 row-span-3 bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xl font-semibold text-gray-700 mb-2 text-center">Total Deduksi Anggota Akhir Bulan</div>
                  <h1 className="text-5xl font-bold text-red-800 mb-4 text-center">Rp 1.488.666,00</h1> {/* DEDUKSI PERBULAN ANGGOTA */}
                </div>
                {/* TOTAL SIMPANAN */}
                <div className="mt-8">
                  <div className="flex font-bold justify-between">
                    <p className="text-lg">Total Simpanan</p>
                    <p className="text-lg text-red-800">Rp 1.000.000,00</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg">Simpanan Wajib</p>
                    <p className="text-lg">Rp 100.000,00</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg">Simpanan Sukarela</p>
                    <p className="text-lg">Rp 900.000,00</p>
                  </div>

                  {/* TOTAL PINJAMAN */}
                  <div className="flex font-bold mt-4 justify-between">
                    <p className="text-lg">Total Pinjaman</p>
                    <p className="text-lg text-red-800">Rp 488.666,00</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg">Pinjaman KPKA</p>
                    <p className="text-lg">Rp 488.666,00</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg">Pinjaman UKSP</p>
                    <p className="text-lg">Rp 0</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg">Pinjaman UKTP</p>
                    <p className="text-lg">Rp 0</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
      
          <div className="w-full">
            <F /> {/* Footer */}
          </div>
        </div>
      </>
    
    );
}

export default SimpanPinjam