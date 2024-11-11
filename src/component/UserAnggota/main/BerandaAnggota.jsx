import React, { useEffect, useState } from 'react';
import { jwtDecode }  from 'jwt-decode';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./NavBarAnggota"
function BerandaAnggota() {

    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            localStorage.setItem('accessToken', response.data.accessToken);
            // setToken(response.data.accessToken);

            // Misalnya di dalam fungsi Anda
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if(error.response){
                navigate("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get("http://localhost:5000/token");
            config.headers.Authorization = `Bearer $(response.data.accessToken)`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error)=>{
        return Promise.reject(error)
    });

    const getUsers = async () => {
        const response = await axiosJWT.get("http://localhost:5000/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
    }

    return (
        <>
        <Nav/>
        <div> hai {name} </div>
        <button onClick={getUsers}>Get User</button>
        </>
    )
}
export default BerandaAnggota