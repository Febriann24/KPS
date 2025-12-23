import H from "./H&F/Header"
import F from "./H&F/Footer"
import No1 from "./Foto/Foto_ttgkami/No1.png"
import No2 from "./Foto/Foto_ttgkami/No2.png"
import No3 from "./Foto/Foto_ttgkami/No3.png"
import No4 from "./Foto/Foto_ttgkami/No4.jpeg"

function TentangKami() {
    return (
        <>
        <H/>
        <div className="my-[10px] relative">
            <img src={No1} className="w-full sm:w-11/12 md:w-4/5 lg:w-full mx-auto" alt="Koperasi Wiyata Mandala"/>
            <div className="relative text-justify text-[20px] bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] rounded-xl w-11/12 sm:w-4/5 lg:w-2/3 mx-auto p-6 -mt-10 md:-mt-16 lg:-mt-20">
                <h1 className="mb-6">
                    Koperasi Konsumen KPRI "Wiyata Mandala" atau disebut dengan KPRI Wiyata Mandala
                    didirikan pada tahun 1997. Koperasi Konsumen KPRI "Wiyata Mandala" merupakan
                    koperasi yang bergerak di bidang simpan pinjam, Tabungan Koperasi "Takop", UKM
                    Mart, dan lain-lain. Koperasi Pegawal Republik Indonesia "KPRI" yang beranggotakan pegawai Negeri
                    khususnya guru sekolah dasar SD, guru SMP , Guru SMU Guru MAN yang ada di kecamatan
                    Kronjo Mekar baru koperasi Konsumen KPRI "Wiyata Mandala " mempunyai kegiatan utama
                    yakni menyediakan penyimpanan dan pinjaman bagi para anggotanya. 
                </h1>
                <h1>
                    Koperasi Pegawai Republik Indonesia "KPRI"
                    didirikan dengan tujuan untuk mempermudah pegawai negeri terkhususnya guru dalam
                    melakukan peminjaman. Untuk meningkatkan pelayanan pada anggota koperasi di bidang
                    peminjaman maka Koperasi Konsumen KPRI" Wiyata Mandala" perlu peningkatan pelayanan
                    yang memadai. Dengan jumlah anggota Kurang lebih 315 orang yang terus bertambah,
                    anggota tersebut melakukan proses pengajuan pinjaman yang masih dilakukan dengan cara
                    anggota harus datang ke koperasi dan mengisi surat permohonan pengajuan pinjaman yang
                    telah diberikan olch Unit Simpan Pinjam.
                </h1>
            </div>
        </div>
       <div className="flex gap-6 px-6">
  {/* LEFT CARD */}
  <div className="flex-[3] bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] h-[560px] rounded-[24px]">
    <div className="px-[50px] text-[20px] mt-[20px] flex flex-col space-y-[20px]">
      <div className="text-[32px] font-bold text-center">
        Tujuan Koperasi Wiyata Mandala
      </div>

      <p className="text-justify">
        1. Meningkatnya kualitas tata kelola organisasi dengan mensinergikan fungsi
        perencanaan, pelaksanaan, dan pengawasan melalui pemanfaatan kelengkapan
        organisasi, SDM, sarana prasarana, dan anggaran.
      </p>

      <p className="text-justify">
        2. Meningkatkan kualitas usaha koperasi dengan memaksimalkan usaha simpan pinjam,
        penyedia barang dan jasa, serta usaha lainnya.
      </p>

      <p className="text-justify">
        3. Tumbuh kembangnya kepercayaan anggota melalui pengelola koperasi yang
        profesional dan akuntabel.
      </p>

      <p className="text-justify">
        4. Meningkatkan kualitas pelayanan anggota dengan memberikan layanan yang prima.
      </p>

      <p className="text-justify">
        5. Meningkatkan kualitas kesejahteraan anggota melalui pemenuhan kebutuhan anggota
        yang adil dan proporsional.
      </p>
    </div>
  </div>

  <div className="flex-[2] h-[560px]">
    <img
      src={No2}
      className="w-full h-full object-cover rounded-[24px]"
      alt="Koperasi"
    />
  </div>
</div>

        <div className="grid grid-cols-2 justify-items-stretch bg-cover w-full h-[750px] mt-[10px]"
        style={{ backgroundImage: `url(${No3})` }}>
  <div className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] opacity-[90%] w-[600px] rounded-[24px] justify-self-end mr-[100px] my-[50px] p-[20px]">
    <div className="text-[32px] font-bold mb-[10px] text-center">Visi</div>
    <p className="text-justify leading-relaxed text-[20px] mt-[200px]">
      Terwujudnya KOPERASI KONSUMEN KPRI "WIYATA MANDALA" yang mandiri dan tangguh dengan berlandaskan 
      asas kekeluargaan demi membangun ekonomi bersama untuk meningkatkan kesejahteraan anggota.
    </p>
  </div>
  <div className="bg-gradient-to-b text-[20px] from-[#4AA1B4] to-[#57C1A0] opacity-[90%] w-[600px] rounded-[24px] ml-[100px] my-[50px] p-[20px]">
    <div className="text-[32px] font-bold mb-[10px] text-center">Misi</div>
    <ol className="list-decimal pl-[20px] space-y-[10px] text-justify leading-relaxed">
      <li>
        Meningkatkan seluruh potensi yang ada dalam masyarakat khususnya anggota KOPERASI KONSUMEN 
        KPRI "WIYATA MANDALA" agar mereka dapat bersama-sama bersatu padu dan beritikad baik 
        dalam membangun ekonomi kerakyatan secara gotong royong dalam bentuk koperasi.
      </li>
      <li>
        Membantu anggota dalam rangka meningkatkan kelancaran usaha dan kesejahteraan mereka serta keluarga.
      </li>
      <li>
        Turut membantu pembangunan ekonomi dan menunjang pelaksanaan kegiatan usaha kecil 
        menengah yang diprakarsai oleh anggota.
      </li>
      <li>
        Mendorong anggota untuk ikut berpartisipasi dalam pemupukan modal melalui program 
        simpanan sukarela dan simpanan berjangka.
      </li>
      <li>
        Memberikan pelayanan prima dengan prosedur yang mudah, cepat, serta pinjaman yang 
        dikenakan jasa yang seimbang kepada para anggota.
      </li>
    </ol>
  </div>
</div>

        <div className="mt-4">
            <img src={No4} className="rounded-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto grid justify-self-center transition-transform duration-300 hover:scale-105" alt="Koperasi Wiyata Mandala"
            />
            <div className="text-justify text-base bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] rounded-xl w-4/5 mx-auto p-8 mt-[-100px] grid justify-center">
                        <p className="mb-4 mt-[100px] max-w-4xl w-full">
                                Pada tanggal 16 Desember 2024, kami berkesempatan mengunjungi Koperasi Wiyata Mandala
                                di Kecamatan Kronjo – Mekar Baru. Kunjungan ini bertujuan untuk melihat secara langsung
                                aktivitas operasional koperasi, bertemu dengan pengurus, dan mempelajari layanan simpan
                                pinjam serta program untuk anggota koperasi.
                            </p>
                            <p className="max-w-4xl w-full">
                                Selama kunjungan, kami mendapatkan sambutan hangat dari para pengurus koperasi. Kami
                                juga melihat bagaimana koperasi melayani anggota dengan profesional, mulai dari proses
                                pengajuan pinjaman, penyimpanan tabungan, hingga penyediaan kebutuhan barang bagi anggota.
                                Pengalaman ini memberikan wawasan yang berharga tentang pengelolaan koperasi yang efektif
                                dan pentingnya peran koperasi dalam meningkatkan kesejahteraan anggotanya.
                            </p>
            </div>
        </div>
        <F/>



        </>
    )
}

export default TentangKami