import React, { useContext } from 'react';
import UserData from './UserData';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import UseAxiosPublic from './UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import UseAxios from './UseAxios';

const UseSuperAdmin = () => {
    // const [userInfos] = UserData();
    const { user } = useContext(AuthContext)
    const axiosPublic = UseAxios()
    // const axiosPublic = UseAxiosPublic()
    const { data: isSuperAdmin, isPending, refetch } = useQuery({
        queryKey: [user?.email, "super_admin"],
        queryFn: async () => {
            const response = await axiosPublic.get(`/super-admin/${user?.email}`);
            // console.log(response);
            return response?.data
        }
    })
    return [isSuperAdmin, isPending, refetch]
};

export default UseSuperAdmin;