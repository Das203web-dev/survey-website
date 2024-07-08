import React from 'react';
import SectionTitle from '../../../../Shared/SectionTitle/SectionTitle';
import { FaUserPlus, FaSearch, FaCheckCircle, FaStar, FaPenFancy, FaChartBar } from 'react-icons/fa';


const Work = () => {
    const steps = [
        {
            icon: <FaUserPlus className="text-4xl text-blue-500" />,
            title: "Sign Up / Login",
            description: "Create an account or log in to access all features."
        },
        {
            icon: <FaSearch className="text-4xl text-green-500" />,
            title: "Browse Surveys",
            description: "Find surveys by category, most recent, or most voted."
        },
        {
            icon: <FaCheckCircle className="text-4xl text-yellow-500" />,
            title: "Participate and Vote",
            description: "Review questions and submit your votes."
        },
        {
            icon: <FaStar className="text-4xl text-purple-500" />,
            title: "Become a Pro User",
            description: "Upgrade to Pro for additional features like commenting and detailed analytics."
        },
        {
            icon: <FaPenFancy className="text-4xl text-red-500" />,
            title: "Create Your Own Survey",
            description: "Customize and create your own surveys."
        },
        {
            icon: <FaChartBar className="text-4xl text-orange-500" />,
            title: "Analyze Results",
            description: "View and understand detailed survey results."
        },
    ];
    return (
        <div className='mb-20'>
            <SectionTitle title={'How it works'}></SectionTitle>

            <section>
                <div className="mx-auto">
                    {/* <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center justify-center mb-4">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-2">{step.title}</h3>
                                <p className="text-gray-600 text-center">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Work;