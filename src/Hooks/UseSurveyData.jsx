import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from './UseAxiosPublic';

const UseSurveyData = () => {
    const axiosPublic = UseAxiosPublic()
    const { data: surveyData = [], refetch } = useQuery({
        queryKey: ['surveyData'],
        queryFn: async () => {
            const result = await axiosPublic.get('survey');
            return result.data
        }
    })
    return [surveyData, refetch];
};

export default UseSurveyData;