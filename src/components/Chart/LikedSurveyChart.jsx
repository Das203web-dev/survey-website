import UseVotedSurveyData from '@/Hooks/UseVotedSurveyData';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';


const LikedSurveyChart = ({ survey }) => {
    const [surveyData] = UseVotedSurveyData();
    console.log(survey, 'line 8');
    const [mostLiked, setMostLiked] = useState([]);
    // const [data]
    useEffect(() => {
        const response = survey.sort((a, b) => b.total_votes - a.total_votes).slice(0, 6);
        // if(mostLiked[i] !== )
        setMostLiked(response)
    }, [survey])

    console.log(mostLiked.category, 'line 17');
    const data = mostLiked?.map(likedData => ({
        name: likedData?.category,
        value: likedData?.total_votes
    }))

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='w-full h-auto flex justify-center items-center'>
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"

                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip></Tooltip>
            </PieChart>
            {/* </ResponsiveContainer> */}
        </div>
    );
};

export default LikedSurveyChart;