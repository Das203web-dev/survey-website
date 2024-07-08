import React, { useContext } from 'react';
import UseAxios from './UseAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import UserData from './UserData';

const UseAdmin = () => {
    const axiosSecure = UseAxios();
    const { user } = useContext(AuthContext);
    // const [userInfos] = UserData()
    const { data: isAdmin = [], isPending: isAdminPending, refetch } = useQuery({
        queryKey: ['isAdmin'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user/admin`)
            return response.data
        }
    })
    return [isAdmin, isAdminPending, refetch];
};

export default UseAdmin;