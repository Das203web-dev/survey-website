import UseAxiosPublic from './UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UserData = () => {
    const axiosPublic = UseAxiosPublic();
    const { data: userInfos = [], refetch } = useQuery({
        queryKey: ["user_info"],
        queryFn: async () => {
            const response = await axiosPublic.get('/userData');
            return response.data
        }
    })

    return [userInfos, refetch]
};

export default UserData;