import React from 'react';
import UseAxios from './UseAxios';
import { useQuery } from '@tanstack/react-query';

const UseVotedSurveyData = () => {
    const axiosSecure = UseAxios();
    const { data: votedSurveyData = [], refetch: refetchVotedData } = useQuery({
        queryKey: ['voted_survey_data'],
        queryFn: async () => {
            const data = await axiosSecure.get('votedSurveyData');
            return data.data
        }
    })
    return [votedSurveyData, refetchVotedData]
};

export default UseVotedSurveyData;