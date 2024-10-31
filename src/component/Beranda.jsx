import H from "./H&F/Header"
import F from "./H&F/Footer"
import gmbr1 from "./Foto/Foto_Beranda/Building.png"
import gmbr2 from "./Foto/Foto_Beranda/People1.png"
import gmbr3 from "./Foto/Foto_Beranda/People2.png"
import gmbr4 from './Foto/Foto_Beranda/image4.png';
import gmbr5 from './Foto/Foto_Beranda/ttg_foto.jpg';
import gmbr6 from './Foto/Foto_Beranda/img_prdkL.png';
import gmbrSP from './Foto/Foto_Beranda/gmbr_SP.png';
import gmbrSS from './Foto/Foto_Beranda/gmbr_SS.png';
import gmbrSHR from './Foto/Foto_Beranda/gmbr_SHR.png';
import gmbrSW from './Foto/Foto_Beranda/gmbr_SW.png';
import gmbrSSP from './Foto/Foto_Beranda/gmbrSimpan.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ArrowRightIcon } from "@radix-ui/react-icons";


function Beranda() {

    return (
        <>

        <H/>
        <div>
            {/* Slider Start */}
            <Swiper
            slidesPerView={2}
            loop={true}
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets:1,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper mt-[10px]"
            >
                <SwiperSlide>
                    <img src={gmbr1} className="rounded-[30px]"  alt="Gambar 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gmbr2} className="rounded-[30px]"  alt="Gambar 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gmbr3} className="rounded-[30px]" alt="Gambar 3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gmbr1} className="rounded-[30px]"  alt="Gambar 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gmbr2} className="rounded-[30px]"  alt="Gambar 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gmbr3} className="rounded-[30px]" alt="Gambar 3" />
                </SwiperSlide>

            </Swiper>
            {/* Slider End */}

            {/* --------------- */}

            {/* Tentang Kami */}
            <div style={{ backgroundImage: `url(${gmbr4})` }} className="mt-[10px]  bg-center bg-no-repeat bg-cover h-[480px] ">
                <span className="grid grid-cols-2">
                    <div className="grid justify-start grid-rows-2">
                        <h1 className="ml-[200px] mt-[100px] text-4xl">Tentang Kami</h1>
                        <h2 className="ml-[200px] mt-[-30px] text-lg text-justify w-[600px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad animi ex dicta, ipsum quaerat reiciendis modi, 
                        nobis perspiciatis doloremque iure earum aspernatur! Minima cum ullam suscipit asperiores nisi, veniam, magnam 
                        laborum iusto recusandae harum eligendi necessitatibus. Accusamus quam commodi molestiae autem magni quasi nam 
                        dignissimos nisi, reiciendis consectetur sint! Aspernatur consequuntur ipsam nisi nobis impedit, accusamus, 
                    </h2>
                    </div>
                    <img src={gmbr5} className="grid justify-end w-[600px] h-[300px] mt-[90px] ml-[165px] shadow-lg rounded-2xl"/>
                </span>
            </div>
            {/* Tentang Kami End */}

            {/* --------------- */}

            {/* Produk Start */}
            <div className="grid grid-cols-2 mt-[10px]">
                <div style={{ backgroundImage: `url(${gmbr6})` }} className="w-[520px] bg-no-repeat bg-cover h-[1439px] ml-[10px]">
                    <h1 className="ml-[150px] mt-[525px] text-4xl">Produk Kami</h1>
                </div>
                <div className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] w-[1357px] ml-[-409px] ">
<<<<<<< Updated upstream
                    {/* Simpanan Pokok */}
                        <div class="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div class="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
=======

                        <div className="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
>>>>>>> Stashed changes
                           <img
                               src={gmbrSP}
                               alt="card-image"
                               className=" w-full rounded-md md:rounded-lg object-cover"
                           />
                       </div>
                       <div className="p-6">
                        <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 className="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan Pokok
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                 Sejumlah uang yang wajib dibayarkan oleh anggota koperasi saat pertama kali menjadi anggota. 
                                 Simpanan pokok tidak dapat diambil kembali selama anggota masih tergabung dalam koperasi
                            </p>
                            <div>
                                <a href="/Produk" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                                    Pelajari Lebih Lanjut <ArrowRightIcon className="ml-2"/>
                                </a>
                            </div>
                        </div>
                    </div> 
                {/* Simpanan Pokok End */}

<<<<<<< Updated upstream
                {/* Simpanan Wajib */}
                <div class="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[400px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
=======
                <div className="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[400px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
>>>>>>> Stashed changes
                       
                       <div className="p-6">
                        <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 className="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan Wajib
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                 Sejumlah uang yang wajib dibayarkan oleh anggota koperasi saat pertama kali menjadi anggota. 
                                 Simpanan pokok tidak dapat diambil kembali selama anggota masih tergabung dalam koperasi
                            </p>
                            <div>
                                <a href="/Produk" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                                    Pelajari Lebih Lanjut <ArrowRightIcon className="ml-2"/>
                                </a>
                            </div>
                        </div>
                        <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                           <img
                               src={gmbrSW}
                               alt="card-image"
                               className=" w-full rounded-md md:rounded-lg object-cover"
                           />
                       </div>
                    </div> 
                {/* Simpanan Wajib End */}

<<<<<<< Updated upstream
                {/* Simpanan Suka Rela Start */}
                <div class="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div class="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
=======
                <div className="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
>>>>>>> Stashed changes
                           <img
                               src={gmbrSS}
                               alt="card-image"
                               className=" w-full rounded-md md:rounded-lg object-cover"
                           />
                       </div>
                       <div className="p-6">
                        <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 className="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan Suka Rela
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                 Sejumlah uang yang wajib dibayarkan oleh anggota koperasi saat pertama kali menjadi anggota. 
                                 Simpanan pokok tidak dapat diambil kembali selama anggota masih tergabung dalam koperasi
                            </p>
                            <div>
                                <a href="/Produk" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                                    Pelajari Lebih Lanjut <ArrowRightIcon className="ml-2"/>
                                </a>
                            </div>
                        </div>
                    </div> 
                {/* Simpanan Suka Rela End */}

<<<<<<< Updated upstream
                {/* Simpanan Hari Raya Start */}
                <div class="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[400px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
=======
                <div className="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[400px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
>>>>>>> Stashed changes
                       
                       <div className="p-6">
                        <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 className="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan Hari raya
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                 Sejumlah uang yang wajib dibayarkan oleh anggota koperasi saat pertama kali menjadi anggota. 
                                 Simpanan pokok tidak dapat diambil kembali selama anggota masih tergabung dalam koperasi
                            </p>
                            <div>
                                <a href="/Produk" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                                    Pelajari Lebih Lanjut <ArrowRightIcon className="ml-2"/>
                                </a>
                            </div>
                        </div>
                        <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                           <img
                               src={gmbrSHR}
                               alt="card-image"
                               className=" w-full rounded-[24px] object-cover"
                           />
                       </div>
                    </div> 
                {/* Simpanan Hari Raya End */}

<<<<<<< Updated upstream
                {/* Simpan Pinjam ( KSP) Start */}
                <div class="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div class="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
=======
                <div className="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
>>>>>>> Stashed changes
                           <img
                               src={gmbrSSP}
                               alt="card-image"
                               className=" w-full rounded-md md:rounded-lg object-cover"
                           />
                       </div>
                       <div className="p-6">
                        <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 className="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan dan Pinjam
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                 Sejumlah uang yang wajib dibayarkan oleh anggota koperasi saat pertama kali menjadi anggota. 
                                 Simpanan pokok tidak dapat diambil kembali selama anggota masih tergabung dalam koperasi
                            </p>
                            <div>
                                <a href="/Produk" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                                    Pelajari Lebih Lanjut <ArrowRightIcon className="ml-2"/>
                                </a>
                            </div>
                        </div>
                    </div> 
                {/* Simpan Pinjam (KSP End */}
                    
                </div> 
            </div>
            {/* Produk End */}
        </div>
        <F/>
        </>
    )
}

export default Beranda