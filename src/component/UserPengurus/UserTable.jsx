import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import {  
  formatRupiah,
  countAngsuran} from '../../utils/utils';
import {
  BackButton
} from '../../utils/components'

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
          const fetchedData = response.data;
          const totalLoanAmount = fetchedData.TR_PENGAJUAN_PINJAMANs.reduce((acc, loan) => acc + loan.NOMINAL, 0);
          fetchedData.totalLoanAmount = totalLoanAmount;

          setUserData(fetchedData);
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

  const latestLoan = userData.TR_PENGAJUAN_PINJAMANs?.[0] || null;
  const latestSaving = userData.TR_PENGAJUAN_SIMPANANs?.[0] || null;

  const totalLoanAmount = userData.TR_PENGAJUAN_PINJAMANs.reduce((acc, loan) => {
    const statusCode = loan.status?.STATUS_CODE;
    const nominalValue = parseFloat(loan.NOMINAL) || 0;
    if (statusCode === 'APPROVED') {
      return acc + nominalValue;
    }
    
    return acc;
  }, 0);
  userData.totalLoanAmount = totalLoanAmount;

  const totalSavingAmount = userData.TR_PENGAJUAN_SIMPANANs.reduce((acc, saving) => {
    const statusCode = saving.status?.STATUS_CODE;
    const nominalValue = parseFloat(saving.NOMINAL) || 0;
    if (statusCode === 'APPROVED') {
      return acc + nominalValue;
    }

    return acc;
  }, 0);
  userData.totalSavingAmount = totalSavingAmount;
  
  const loanStatusPinjaman = latestLoan?.status?.STATUS_CODE || 'N/A';
  const loanStatusSimpanan = latestSaving?.status?.STATUS_CODE || 'N/A';
  const principalSavings = userData.TR_PENGAJUAN_SIMPANANs?.[0] || null;

  const formattedJoinDate = userData.createdAt
    ? new Date(userData.createdAt).toLocaleDateString()
    : 'N/A';
  
const totalInterestPaidloan = userData.TR_PENGAJUAN_PINJAMANs?.reduce((acc, loan) => {
  const statusCode = loan.status?.STATUS_CODE;
  const nominalUang = parseFloat(loan.NOMINAL) || 0;
  const bungaPercentage = parseFloat(loan.type?.INTEREST_RATE) || 0;
  const interest = nominalUang * (bungaPercentage / 100);
  if (statusCode === 'APPROVED') {
    return acc + interest;
  }

  return acc;
}, 0) || 0;


const totalInterestPaidsaving = userData.TR_PENGAJUAN_SIMPANANs?.reduce((acc, saving) => {
  const statusCode = saving.status?.STATUS_CODE;
  const nominalUang = parseFloat(saving.NOMINAL) || 0;
  const bungaPercentage = parseFloat(saving.type?.INTEREST_RATE) || 0;
  const interest = nominalUang * (bungaPercentage / 100);
  if (statusCode === 'APPROVED') {
    return acc + interest;
  }

  return acc;
}, 0) || 0;

  const totalTabungan = totalLoanAmount + totalSavingAmount + totalInterestPaidsaving - totalInterestPaidloan;
  const formattedtotalTabungan = formatRupiah(totalTabungan.toString());
  const formattedTotalLoanAmount = formatRupiah(totalLoanAmount.toString());
  const formattedtotalSavingAmount = formatRupiah(totalSavingAmount.toString());
  const formattedtotalInterestPaidloan = formatRupiah(totalInterestPaidloan.toString());
  const formattedtotalInterestPaidsaving = formatRupiah(totalInterestPaidsaving.toString());

  return (
    <div>
      <H />
      <div className="container mx-auto p-6">
      <BackButton nav="/ListUser"/>
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Nama:</span>
                <p className="ml-2">{userData.NAMA_LENGKAP || 'N/A'}</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Jumlah Pinjaman Terakhir:</span>
                <p className="ml-2">
                  {latestLoan
                    ? 'Rp ' + formatRupiah(latestLoan.NOMINAL) + 
                      ' (tanggal ' + new Date(latestLoan.updatedAt).toLocaleDateString() + ')'
                    : 'N/A'}
                </p>
              </div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Status Pinjaman Terakhir:</span>
                <p className="ml-2">{loanStatusPinjaman || 'N/A'}</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Total Pinjaman:</span>
                <p className="ml-2">
                {formattedTotalLoanAmount !== '0' ? `Rp ${formattedTotalLoanAmount}` : 0}
                </p>
              </div>
              <div className="flex items-center mb-4">
                  <span className="font-semibold">Total Bunga Pinjaman:</span>
                  <p className="ml-2">
                {formattedtotalInterestPaidloan !== '0' ? `Rp ${formattedtotalInterestPaidloan}` : 0}
                  </p>
              </div>
              <div className="flex items-center mb-4">
                  <span className="font-semibold">Total Tabungan:</span>
                  <p className="ml-2">
                  {formattedtotalTabungan !== '0' ? `Rp ${formattedtotalTabungan}` : 0}
                  </p>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Tanggal Bergabung:</span>
                <p className="ml-2">{formattedJoinDate}</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Jumlah Simpanan Terakhir:</span>
                <p className="ml-2">
                  {principalSavings
                    ? 'Rp ' + formatRupiah(principalSavings.NOMINAL) + 
                      ' (tanggal ' + new Date(principalSavings.updatedAt).toLocaleDateString() + ')'
                    : 'N/A'}
                </p>
              </div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Status Simpanan Terakhir:</span>
                <p className="ml-2">{loanStatusSimpanan || 0}</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Total Simpanan:</span>
                <p className="ml-2">
                {formattedtotalSavingAmount !== '0' ? `Rp ${formattedtotalSavingAmount}` : 0}
                </p>
              </div>
              <div className="flex items-center mb-4">
                  <span className="font-semibold">Total Bunga Simpanan:</span>
                  <p className="ml-2">
                    {formattedtotalInterestPaidsaving !== '0' ? `Rp ${formattedtotalInterestPaidsaving}` : 0}
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <F />
    </div>
  );
};

export default UserTable;
