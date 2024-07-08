import { AuthContext } from '@/AuthProvider/AuthProvider';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/'
})

const UseAxios = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(function (res) {
        return res
    }, async function (error) {
        console.log(error, 'line number 20');
        if (error.response?.status === 401 || error.response?.status === 403) {
            await logOut()
            navigate('/login');

            console.log(error, 'line nong 28');
        }
    })
    return axiosSecure;
};

export default UseAxios;