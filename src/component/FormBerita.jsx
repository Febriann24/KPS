import React, { useState } from 'react';
import H from "./H&F/Header";
import F from "./H&F/Footer";

function FormTambahBerita() {
  const [formData, setFormData] = useState({
    judulBerita: '',
    penulis: '',
    kontenBerita: '',
    fotoBerita: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div>
      <H />
      <div className="flex justify-center space-x-8 mt-10">
        <div className="w-2/3 pl-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Formulir Tambah Berita</h2>

          <div className="bg-gray-200 p-10 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} id="form-tambah-berita" className="grid grid-cols-1 gap-6">
              <div>
                <label className="block mb-1">Judul Berita</label>
                <input
                  type="text"
                  name="judulBerita"
                  value={formData.judulBerita}
                  onChange={handleChange}
                  placeholder="Judul Berita"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block mb-1">Penulis</label>
                <input
                  type="text"
                  name="penulis"
                  value={formData.penulis}
                  onChange={handleChange}
                  placeholder="Penulis"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block mb-1">Konten Berita</label>
                <textarea
                  name="kontenBerita"
                  value={formData.kontenBerita}
                  onChange={handleChange}
                  placeholder="Konten Berita"
                  className="w-full p-2 border rounded bg-white h-48"
                />
              </div>
              <div>
                <label className="block mb-1">Foto Berita</label>
                <input
                  type="file"
                  name="fotoBerita"
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-white"
                />
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => document.getElementById('form-tambah-berita').submit()}
                  className="bg-teal-500 text-white w-full px-6 py-2 rounded shadow hover:bg-teal-600"
                >
                  Tambah Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <F />
    </div>
  );
}

export default FormTambahBerita;
