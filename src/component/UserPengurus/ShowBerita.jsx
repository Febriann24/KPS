import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import H from "../H&F/Header";
import F from "../H&F/Footer";

const ShowBerita = () => {
    const { id } = useParams();
    const [berita, setBerita] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/showBerita/${id}`);
                setBerita(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBerita();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!berita) {
        return <div>No news found.</div>;
    }

    return (
        <>
            <H />
            <div className="container mx-auto py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-center text-[#00AD9C] mb-4">{berita.JUDUL_BERITA}</h2>
                        <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                            Written on {new Date(berita.DTM_CRT).toLocaleDateString()} by
                        </div>
                        <div className="flex justify-center mb-4">
                            {berita.FOTO_BERITA && (
                                <img 
                                    className="rounded-md max-w-full h-auto"
                                    src={berita.FOTO_BERITA}
                                    alt={berita.JUDUL_BERITA} 
                                />
                            )}
                        </div>
                        <p className="text-lg text-gray-800 leading-relaxed font-bold text-center">{berita.ISI_BERITA}</p>
                    </div>
                    <div className="flex items-center justify-center bg-[#00AD9C] py-4">
                        <a className="back-button text-white hover:text-gray-200 mx-2" href="/BeritaMenu">Kembali ke menu berita</a>
                    </div>
                </div>
            </div>
            <F />
        </>
    );
};

export default ShowBerita;