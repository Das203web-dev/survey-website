import UseAxios from "./UseAxios";
import { useQuery } from '@tanstack/react-query';

const UsePaidUserData = (email) => {
    const axiosSecure = UseAxios()
    const { data: paidUserData = [], refetch } = useQuery({
        queryKey: ['paidUserData'],
        queryFn: async () => {
            if (email) {
                const response = axiosSecure.get(`paid_user_data/${email}`);
                return (await response).data
            }
        }
    })
    return [paidUserData, refetch]
};

export default UsePaidUserData;