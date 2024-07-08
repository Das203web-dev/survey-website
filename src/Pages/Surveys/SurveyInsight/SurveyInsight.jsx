import UseSurveyData from '@/Hooks/UseSurveyData';
import SectionTitle from '@/Shared/SectionTitle/SectionTitle';
import React from 'react';

const SurveyInsight = ({ categories }) => {
    const [surveyData] = UseSurveyData();
    const totalData = surveyData.length
    return (
        <div className="survey-insights my-20">
            <SectionTitle title={'Survey Insights'}></SectionTitle>
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 hover:shadow-lg">
                    <h3 className="text-2xl font-bold">{totalData}</h3>
                    <p className="text-lg">Total Surveys</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 hover:shadow-lg">
                    <h3 className="text-2xl font-bold">
                        {Math.round(surveyData.reduce((acc, survey) => acc + survey.total_votes, 0) / totalData)}
                    </h3>
                    <p className="text-lg">Average Votes per Survey</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 hover:shadow-lg">
                    <h3 className="text-2xl font-bold">{categories.length}</h3>
                    <p className="text-lg">Survey Categories</p>
                </div>
            </div>
        </div>
    );
};

export default SurveyInsight;