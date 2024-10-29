import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import H from "../H&F/Header";
import F from "../H&F/Footer";

const EditBerita = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judulBerita: '',
        penulis: '',
        kontenBerita: '',
        fotoBerita: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/showBerita/${id}`);
                console.log('Fetched berita:', response.data); 
                setFormData({
                    judulBerita: response.data.JUDUL_BERITA,
                    penulis: response.data.USER_UPD,
                    kontenBerita: response.data.ISI_BERITA,
                    fotoBerita: null,
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBerita();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const beritaData = new FormData();
        beritaData.append('judulBerita', formData.judulBerita);
        beritaData.append('penulis', formData.penulis);
        beritaData.append('kontenBerita', formData.kontenBerita);
        beritaData.append('fotoBerita', formData.fotoBerita);
    
        console.log('Form Data Being Sent:', Array.from(beritaData.entries()));
    
        try {
            const response = await axios.patch(`http://localhost:5000/updateBerita/${id}`, beritaData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Berita Updated:', response.data);
            alert('Berita Updated Successfully');
            navigate('/BeritaMenu');
        } catch (error) {
            console.error('Error updating berita:', error.response?.data || error.message);
            alert('Failed to update Berita');
        }
    };    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <H />
            <div className="flex justify-center space-x-8 mt-10">
                <div className="w-2/3 pl-10">
                    <h2 className="text-2xl font-semibold text-center mb-6">Edit Berita</h2>
                    <div className="bg-gray-200 p-10 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block mb-1">Judul Berita</label>
                                <input
                                    type="text"
                                    name="judulBerita"
                                    value={formData.judulBerita}
                                    onChange={handleChange}
                                    placeholder="Judul Berita"
                                    className="w-full p-2 border rounded bg-white"
                                    required
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
                                    required
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
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Foto Berita</label>
                                <input
                                    type="file"
                                    name="fotoBerita"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex space-x-4 mt-6">
                                <button
                                    type="submit"
                                    className="bg-teal-500 text-white w-full px-6 py-2 rounded shadow hover:bg-teal-600"
                                >
                                    Update Berita
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <F />
        </div>
    );
};

export default EditBerita;
