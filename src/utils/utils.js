export const formatRupiah = (angka) => {
    // Ensure angka is a string and remove leading zeros
    angka = angka.replace(/^0+/, '');
    let number_string = angka.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    return rupiah || '0';
};

export const deformatRupiah = (angka) => {
    return parseInt(angka.replace(/\./g, ''), 10)
};

export const formatDate = (string) => {
    const date = new Date(string)
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const sumDate = (string, num) => {
    const date = new Date(string)
    date.setMonth(date.getMonth() + num);
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
    });
  }
  

export const countDeduksiBulan = (nominal, bunga, totalBulan) => {
    const formula = Math.round((nominal / totalBulan) + ((nominal * bunga/100)/12))
    if (formula == 0) {
        return '0';
    } else {
        return String(formula);
    }
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export const getCurrentLoggedInID = () => {
    const navigate = useNavigate();
    const [ID, setID] = useState(null); // Initially null to indicate loading

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.get("http://localhost:5000/token");
                localStorage.setItem('accessToken', response.data.accessToken);
                const decoded = jwtDecode(response.data.accessToken);
                setID(decoded.userId); // Update the state with userId
            } catch (error) {
                if (error.response) {
                    navigate("/"); // Redirect if there's an error with the token
                }
            }
        };

        refreshToken(); // Call the refreshToken function when the hook is called
    }, [navigate]);

    return ID; // Return the userId (which can be null if not yet fetched)
};

export const getCurrentLoggedInData = () => {
    const [data, setData] = useState('')
    const id = getCurrentLoggedInID();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const DATA = await axios.get(`http://localhost:5000/getOneUser/${id}`);
                setData(DATA);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id])

    return data.data;
}

export function isBetween(num, min, max) {
    return num >= min && num <= max;
  }