import React, { useContext } from 'react';
import UseAxios from './UseAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/AuthProvider/AuthProvider';

const UseSingleAdmin = () => {
    const axiosSecure = UseAxios();
    const { user } = useContext(AuthContext)
    const { data: admin, isPending: idSingleAdminPending } = useQuery({
        queryKey: [user?.email, 'admin'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/admin/${user?.email}`);
            return response.data
        }
    })
    return [admin, idSingleAdminPending];
};

export default UseSingleAdmin;