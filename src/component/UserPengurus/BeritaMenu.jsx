import React, { useState, useEffect } from 'react';
import axios from 'axios';
import H from "../H&F/Header";
import F from "../H&F/Footer";

const BeritaMenu = () => {
    const [berita, setBerita] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const response = await axios.get('http://localhost:5000/berita');
                console.log("Fetched berita:", response.data);
                setBerita(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBerita();
    }, []);

    const getImageSrc = (fotoBerita) => {
        if (fotoBerita.startsWith("data:image/")) {
            return fotoBerita;
        }
        return "http://localhost:5000/uploads/" + fotoBerita;
    };

    const deleteBerita = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deleteBerita/${id}`);
            setBerita(berita.filter((item) => item.UUID_BERITA !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <H />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-center bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white py-2 mb-4">News</h1>
                <div className="mb-4">
                    <a href="/FormBuatBerita" className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white py-2 px-4 rounded-md">Make new news</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {berita.map((item) => {
                        console.log("Rendering item:", item);
                        return (
                            <div key={item.UUID_BERITA} className="bg-white rounded-md overflow-hidden shadow-md">
                                <div className="image-container">
                                    <img
                                        src={getImageSrc(item.FOTO_BERITA)} 
                                        alt={item.JUDUL_BERITA}
                                        className="w-full h-48 object-cover cursor-pointer"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.JUDUL_BERITA}</h2>
                                    <p className="text-sm text-gray-600 mb-2">Written on {new Date(item.DTM_CRT).toLocaleDateString()}</p>
                                    <p className="text-gray-700">{item.ISI_BERITA.substring(0, 150)}...</p>
                                    <div className="mt-4">
                                        <a href={`/showBerita/${item.UUID_BERITA}`} className="text-yellow-500 font-semibold">Read More</a>
                                        <a href={`/editBerita/${item.UUID_BERITA}`} className="text-blue-600 ml-2">EDIT</a>
                                        <button onClick={() => deleteBerita(item.UUID_BERITA)} className="text-red-600 ml-2">DELETE</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <F />
        </>
    );
};

export default BeritaMenu;