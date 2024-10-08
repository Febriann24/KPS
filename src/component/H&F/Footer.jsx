import foto from '../Foto/Koperasi_Logo.png'

function Footer(){
    return(
        <>
            <footer class="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] mt-[10px] ">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={foto} class="h-[80px]" alt="Flowbite Logo" />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Koperasi Simpan Pinjam</span>
                        </a>
                        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                            <li>
                                <a href="/TentangKami" class="hover:underline me-4 md:me-6">Tentang Kami</a>
                            </li>
                            <li>
                                <a href="/Produk" class="hover:underline me-4 md:me-6">Produk</a>
                            </li>
                            <li>
                                <a href="/HubungiKami" class="hover:underline me-4 md:me-6">Hubungi Kami</a>
                            </li>
                            <li>
                                <a href="/SimpanPinjam" class="hover:underline me-4 md:me-6">Simpan Pinjam</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Pengurus</a>
                            </li>
                        </ul>
                    </div>
                    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span class="block text-sm text-white sm:text-center">© 2023 <a href="https://flowbite.com/" class="hover:underline mr-[5px]">Ketoprak Developer</a>Universitas Multimedia Nusantara</span>
                </div>
            </footer>
        </>
    )
}

export default Footer