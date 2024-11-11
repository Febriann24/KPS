import React, { useEffect, useState } from 'react';
import axios from 'axios';
import H from "../H&F/Header";
import F from "../H&F/Footer";

const PengurusApprove = () => {
    const [approvals, setApprovals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'NAMA_LENGKAP', direction: 'asc' });
    const [jobFilter, setJobFilter] = useState('');

    const fetchApprovals = async () => {
        try {
            const response = await axios.get("http://localhost:5000/approvals");
            setApprovals(response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching approvals:", error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:5000/approve/${id}`);
            alert("User approved successfully!");
            fetchApprovals();
        } catch (error) {
            console.error("Error approving user:", error);
            if (error.response && error.response.data) {
                alert(`Failed to approve user: ${error.response.data.error}`);
            } else {
                alert("Failed to approve user. Please try again.");
            }
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/reject/${id}`);
            alert("User rejected successfully!");
            fetchApprovals();
        } catch (error) {
            console.error("Error rejecting user:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);

        if (!searchTerm.trim()) {
            setSearchResults(approvals);
            return;
        }

        // Search only in the NAMA_LENGKAP field
        const filteredData = approvals.filter((user) => {
            const searchTermLower = searchTerm.toLowerCase();
            return user.NAMA_LENGKAP.toLowerCase().includes(searchTermLower);
        });

        setSearchResults(filteredData);
    };

    // Handle job filter
    const handleJobFilter = (e) => {
        setJobFilter(e.target.value);
    };

    const filteredByJob = (data) => {
        if (!jobFilter) return data;
        return data.filter((user) => {
            return (Number(user.UUID_MS_JOB) === 1 && jobFilter === 'Anggota') || 
                   (Number(user.UUID_MS_JOB) !== 1 && jobFilter === 'Pengurus');
        });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = () => {
        const data = isSearching ? searchResults : approvals;
        const filteredData = filteredByJob(data);
        return filteredData.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    useEffect(() => {
        fetchApprovals();
    }, []);

    const displayedData = sortedData();

    return (
        <div className="flex flex-col min-h-screen">
            <H />
            <main className="flex-grow container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Manajemen Persetujuan Pengguna</h2>
                <form onSubmit={handleSearch} className="mb-6 flex items-center justify-center space-x-4">
                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2"
                        value={jobFilter}
                        onChange={handleJobFilter}
                    >
                        <option value="">All Jobs</option>
                        <option value="Anggota">Anggota</option>
                        <option value="Pengurus">Pengurus</option>
                    </select>

                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="ml-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Search
                    </button>
                </form>

                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th
                                className="px-4 py-2 border-b font-semibold text-gray-700 cursor-pointer"
                                onClick={() => handleSort('NAMA_LENGKAP')}
                            >
                                Name
                            </th>
                            <th
                                className="px-4 py-2 border-b font-semibold text-gray-700 cursor-pointer"
                                onClick={() => handleSort('EMAIL')}
                            >
                                Email
                            </th>
                            <th
                                className="px-4 py-2 border-b font-semibold text-gray-700 cursor-pointer"
                                onClick={() => handleSort('NOMOR_TELP')}
                            >
                                Phone
                            </th>
                            <th
                                className="px-4 py-2 border-b font-semibold text-gray-700 cursor-pointer"
                                onClick={() => handleSort('UUID_MS_JOB')}
                            >
                                Job
                            </th>
                            <th className="px-4 py-2 border-b font-semibold text-gray-700 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.length > 0 ? (
                            displayedData.map((user) => (
                                <tr key={user.UUID_MS_USER} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b text-gray-800 text-center">{user.NAMA_LENGKAP}</td>
                                    <td className="px-4 py-2 border-b text-gray-800 text-center">{user.EMAIL}</td>
                                    <td className="px-4 py-2 border-b text-gray-800 text-center">{user.NOMOR_TELP}</td>
                                    <td className="px-4 py-2 border-b text-gray-800 text-center">
                                        {Number(user.UUID_MS_JOB) === 1 ? "Anggota" : "Pengurus"}
                                    </td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button
                                            onClick={() => handleApprove(user.UUID_MS_USER)}
                                            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(user.UUID_MS_USER)}
                                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                                    {isSearching ? "No results found." : "No data available."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>
            <F />
        </div>
    );
};

export default PengurusApprove;
