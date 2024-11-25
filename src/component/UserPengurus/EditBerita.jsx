import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import {
    BackButton
  } from '../../utils/components'
  
const EditBerita = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judulBerita: '',
        penulis: '',
        kontenBerita: '',
        fotoBerita: null,
        fotoBeritaBase64: '',
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
                    fotoBeritaBase64: response.data.FOTO_BERITA || '',
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBerita();
    }, [id]);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => reject(error);
        });
    };
    
    const handleChange = async (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setFormData({ ...formData, fotoBerita: file });
            const base64String = await convertToBase64(file);
            setFormData((prevData) => ({ ...prevData, fotoBeritaBase64: base64String }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const beritaData = {
            judulBerita: formData.judulBerita,
            penulis: formData.penulis,
            kontenBerita: formData.kontenBerita,
            fotoBerita: formData.fotoBeritaBase64,
        };
    
        console.log('Form Data Being Sent:', beritaData);
        
        try {
            const response = await axios.patch(`http://localhost:5000/updateBerita/${id}`, beritaData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Berita Updated:', response.data);
            alert('Berita Updated Successfully');
            navigate('/BeritaMenu');
        } catch (error) {
            console.error('Error updating berita:', error.response?.data || error.message);
            alert(`Failed to update Berita: ${error.response?.data.message || error.message}`);
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
                <BackButton nav="/BeritaMenu"/>
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
                                    accept="image/*"
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