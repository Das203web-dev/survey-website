
import UseSurveyData from '@/Hooks/UseSurveyData';
import SectionTitle from '@/Shared/SectionTitle/SectionTitle';
import React from 'react';

// Icon mapping based on category names
const categoryIcons = {
    'Technology': '💻',
    'Health': '🩺',
    'Education': '📚',
    'Finance': '💰',
    'Travel': '✈️ ',
    // Add more categories and corresponding icons here
};

const TopCategory = ({ categories }) => {
    const [surveyData] = UseSurveyData();

    return (
        <div className="mb-20">
            <SectionTitle title={"Top Categories"}></SectionTitle>
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-5">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="category-card bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-gray-800">{category}</h3>
                            <div className="icon w-10 h-10 text-2xl flex items-center justify-center">
                                {categoryIcons[category] || '❓'} {/* Default icon if not found */}
                            </div>
                        </div>
                        <p className="mt-3 text-gray-600">{surveyData.filter(survey => survey.category === category).length} surveys</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCategory;

