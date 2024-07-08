import React from 'react';
import './Banner.css';
import img1 from '../../../../assets/images/logo.png';


const Banner = () => {
    return (
        <div className='flex w-full md:mx-auto h-full md:h-[500px] relative z-0  rounded-md md:mb-40 md:bg-[#2AB16E]'>
            <div style={{ backgroundImage: `url(${img1})` }} className='flex justify-center md:w-3/4 mx-auto rounded-lg bg-no-repeat bg-center bg-contain h-full'>
                <div className='w-full h-full bg-[#2AB16E] absolute bg-opacity-75'></div>
                <div className='p-2 my-auto mx-auto w-full flex justify-center bg-black text-left md:p-10 space-y-4 text-white text-shadow-lg flex-col bg-opacity-50 md:rounded-lg z-20 p-5'>
                    <h1 className='md:text-5xl bg-black bg-opacity-40 rounded-lg p-2 text-3xl font-bold '>Streamline Your Surveys with <span className='bg-gradient-to-r from-white to-[#2AB16E] text-transparent bg-clip-text '>SurveyZ</span></h1>
                    <h3 className='text-2xl bg-black bg-opacity-40 rounded-lg p-2 font-semibold'>Create, Collect, Analyze - All in One Place</h3>
                    <p className='bg-black bg-opacity-40 p-2 rounded-lg'>Effortlessly gather valuable insights with our intuitive survey platform. From crafting engaging surveys to analyzing powerful data, [Website Name] simplifies the entire process. Get started today and make informed decisions with ease.</p>
                    <button className='bg-[#2AB16E] w-fit px-4 py-2  rounded-md text-white font-bold'>Start Surveying Now</button>
                </div>
            </div>

        </div>
    );
};

export default Banner;