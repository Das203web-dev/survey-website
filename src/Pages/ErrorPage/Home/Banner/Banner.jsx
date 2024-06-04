import React from 'react';
import './Banner.css';
import img1 from '../../../../assets/images/feedback.png';


const Banner = () => {
    return (
        <div className='banner flex w-full md:mx-auto h-auto px-2 py-10 relative z-0  rounded-md mb-20'>
            {/* <img src={img1} alt="" /> */}
            {/* style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7) 50%, rgba(255,255,255,0.1) 50%)" }} */}
            <div className='flex justify-center bg-white bg-opacity-50 md:w-3/4 mx-auto rounded-lg'>
                <div className='p-4 my-auto mx-auto w-full flex justify-center bg-black text-left md:p-10 space-y-4 text-white flex-col bg-opacity-60 rounded-lg'>
                    <h1 className='md:text-5xl bg-black bg-opacity-40 rounded-lg p-2 text-3xl font-bold '>Streamline Your Surveys with <span className='bg-gradient-to-r from-white to-[#ae960c] text-transparent bg-clip-text '>SurveyMonkey</span></h1>
                    <h3 className='text-2xl bg-black bg-opacity-40 rounded-lg p-2 font-semibold'>Create, Collect, Analyze - All in One Place</h3>
                    <p className='bg-black bg-opacity-40 p-2 rounded-lg'>Effortlessly gather valuable insights with our intuitive survey platform. From crafting engaging surveys to analyzing powerful data, [Website Name] simplifies the entire process. Get started today and make informed decisions with ease.</p>
                    <button className='bg-gradient-to-r from-[#DA2EA4] to-[#500386] w-fit px-4 py-2  rounded-md text-white font-bold'>Start Surveying Now</button>
                </div>
                {/* <div className='w-full hidden  relative bg-white'>
                    <img className='absolute top-1/2 right-0 -translate-y-1/2' src={img1} alt="" />
                </div> */}
            </div>

        </div>
    );
};

export default Banner;