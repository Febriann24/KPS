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

  const getNominalValue = (obj) => {
    const nominal = obj?.NOMINAL || '0';
    return parseFloat(nominal) || 0;
  };

  const latestLoan = userData.TR_PENGAJUAN_PINJAMANs?.[0] || null;
  const latestSaving = userData.TR_PENGAJUAN_SIMPANANs?.[0] || null;
  
  const totalLoanAmount = userData.totalLoanAmount || 0;
  const loanStatusPinjaman = latestLoan?.status?.STATUS_CODE || 'N/A';
  const loanStatusSimpanan = latestSaving?.status?.STATUS_CODE || 'N/A';
  
  const principalSavings = userData.TR_PENGAJUAN_SIMPANANs?.[0] || null;
  
  const loanNominal = getNominalValue(latestLoan);
  const savingsNominal = getNominalValue(principalSavings);
  
  const formattedJoinDate = userData.createdAt
    ? new Date(userData.createdAt).toLocaleDateString()
    : 'N/A';
  
  const totalInterestPaidloan = userData.TR_PENGAJUAN_PINJAMANs?.reduce((acc, loan) => {
    const nominalUang = parseFloat(loan.NOMINAL) || 0;
    const bungaPercentage = parseFloat(loan.type?.INTEREST_RATE) || 0;
    const interest = nominalUang * (bungaPercentage / 100);
    return acc + interest;
  }, 0) || 0;
  
  const totalInterestPaidsaving = userData.TR_PENGAJUAN_SIMPANANs?.reduce((acc, saving) => {
    const nominalUang = parseFloat(saving.NOMINAL) || 0;
    const bungaPercentage = parseFloat(saving.type?.INTEREST_RATE) || 0;
    const interest = nominalUang * (bungaPercentage / 100);
    return acc + interest;
  }, 0) || 0;
  
  const formattedTotalInterestPaidloan = formatRupiah(totalInterestPaidloan.toString());
  const formattedTotalInterestPaidsaving = formatRupiah(totalInterestPaidsaving.toString());
  const totalTabungan = loanNominal + savingsNominal + totalInterestPaidsaving - totalInterestPaidloan;
  const formattedtotalTabungan = formatRupiah(totalTabungan.toString());

  return (
    <div>
      <H />
      <div className="container mx-auto p-6">
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
                <span className="font-semibold">Status Pinjaman:</span>
                <p className="ml-2">{loanStatusPinjaman || 'N/A'}</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Total Pinjaman:</span>
                <p className="ml-2">
                  {totalLoanAmount > 0 ? 'Rp ' + formatRupiah(totalLoanAmount) : 'N/A'}
                </p>
              </div>
              <div className="flex items-center mb-4">
                  <span className="font-semibold">Total Bunga Pinjaman:</span>
                  <p className="ml-2">
                    {formattedTotalInterestPaidloan !== '0' ? `Rp ${formattedTotalInterestPaidloan}` : 'N/A'}
                  </p>
              </div>
              <div className="flex items-center mb-4">
                  <span className="font-semibold">Total Tabungan:</span>
                  <p className="ml-2">
                  {formattedtotalTabungan !== '0' ? `Rp ${formattedtotalTabungan}` : 'N/A'}
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
                <span className="font-semibold">Status Simpanan:</span>
                <p className="ml-2">{loanStatusSimpanan || 'N/A'}</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Total Simpanan:</span>
                <p className="ml-2">
                  {principalSavings
                    ? 'Rp ' + formatRupiah(principalSavings.NOMINAL) : 'N/A'}
                </p>
              </div>
              <div className="flex items-center mb-4">
                  <span className="font-semibold">Total Bunga Simpanan:</span>
                  <p className="ml-2">
                    {formattedTotalInterestPaidsaving !== '0' ? `Rp ${formattedTotalInterestPaidsaving}` : 'N/A'}
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
