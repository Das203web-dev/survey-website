import React from 'react';
import UseAxiosPublic from './UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UseComment = () => {
    const axiosPublic = UseAxiosPublic();
    const { data: comments = [], refetch: updateComment } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            const commentData = await axiosPublic.get(`/comment`);
            return commentData.data
        }
    })
    return [comments, updateComment]
};

export default UseComment;