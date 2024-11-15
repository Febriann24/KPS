import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { formatRupiah } from '../../utils/utils';

const UserTable = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/userTable/${id}`);
        console.log("API Response:", response.data);
        if (response.data) {
          setUserData(response.data);
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    } else {
      setError('Invalid user ID');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No data found.</p>
      </div>
    );
  }

  const latestLoan = userData.TR_PENGAJUAN_PINJAMANs && userData.TR_PENGAJUAN_PINJAMANs.length > 0
    ? userData.TR_PENGAJUAN_PINJAMANs[0]
    : null;

  const totalLoanAmount = userData.TR_PENGAJUAN_PINJAMANs
    ? userData.TR_PENGAJUAN_PINJAMANs.reduce((acc, loan) => acc + loan.NOMINAL_UANG, 0)
    : 0;

  const totalInterestPaid = userData.TR_PENGAJUAN_PINJAMANs
    ? userData.TR_PENGAJUAN_PINJAMANs.reduce((acc, loan) => acc + loan.BUNGA, 0)
    : 0;

  const loanStatus = latestLoan && latestLoan.status
    ? latestLoan.status.STATUS_CODE
    : 'N/A';
  
  const formattedJoinDate = userData.createdAt
    ? new Date(userData.createdAt).toLocaleDateString()
    : 'N/A';

  return (
    <div>
      <H />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center">
              <span className="font-semibold">Nama:</span>
              <p className="ml-2">{userData.NAMA_LENGKAP || 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Tanggal Bergabung:</span>
              <p className="ml-2">{formattedJoinDate}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Jumlah Pinjaman Terakhir:</span>
              <p className="ml-2">
                {latestLoan
                  ? 'Rp ' + formatRupiah(latestLoan.NOMINAL_UANG) + ' (tanggal ' + new Date(latestLoan.updatedAt).toLocaleDateString() + ')'
                  : 'N/A'}
              </p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Total Pinjaman:</span>
              <p className="ml-2">{totalLoanAmount > 0 ? 'Rp ' + formatRupiah(totalLoanAmount) : 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Jumlah Pengajuan Pinjaman:</span>
              <p className="ml-2">{userData.TR_PENGAJUAN_PINJAMANs?.length || 'N/A'} kali</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Total Bunga Dibayar:</span>
              <p className="ml-2">{totalInterestPaid > 0 ? 'Rp ' + formatRupiah(totalInterestPaid) : 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Status Pinjaman:</span>
              <p className="ml-2">{loanStatus || 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Tabungan:</span>
              <p className="ml-2">{userData.savings || 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Simpanan Pokok:</span>
              <p className="ml-2">{userData.principalSavings || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
      <F />
    </div>
  );
};

export default UserTable;
