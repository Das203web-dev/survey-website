// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// // import 'swiper/css/pagination';
// // import 'swiper/css/navigation';

// import slide1 from '../../../assets/images/surveyImage/slide7.jpg'
// import slide2 from '../../../assets/images/surveyImage/slide2.jpg'
// import slide3 from '../../../assets/images/surveyImage/slide3.jpg'
// import slide4 from '../../../assets/images/surveyImage/slide4.jpg'
// import slide5 from '../../../assets/images/surveyImage/slide5.jpg'
// import slide6 from '../../../assets/images/surveyImage/slide6.jpg'
// import slide7 from '../../../assets/images/surveyImage/slide1.jpg'


// // import required modules
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// const SurveyPageBanner = () => {

//     const slideInfos = [
//         {
//             image: slide1,
//             title: "Participate in Our Health Survey",
//             description: "Share your views on healthcare practices and contribute to a better future.",
//             link: "/survey/health"
//         },
//         {
//             image: slide2,
//             title: "Technology Trends Survey",
//             description: "Help us understand the latest trends in technology by sharing your insights.",
//             link: "/survey/technology"
//         },
//         {
//             image: slide3,
//             title: "Food Preferences Survey",
//             description: "Tell us about your favorite cuisines and food habits.",
//             link: "/survey/food"
//         },
//         {
//             image: slide4,
//             title: "Travel and Tourism Survey",
//             description: "Share your travel experiences and help us improve tourism services.",
//             link: "/survey/travel"
//         },
//         {
//             image: slide5,
//             title: "Fitness and Wellness Survey",
//             description: "Participate in our survey on fitness and wellness practices.",
//             link: "/survey/fitness"
//         },
//         {
//             image: slide6,
//             title: "Consumer Product Survey",
//             description: "Give your feedback on various consumer products and help shape future offerings.",
//             link: "/survey/products"
//         },
//         {
//             image: slide7,
//             title: "Education System Survey",
//             description: "Express your opinions on the current education system and suggest improvements.",
//             link: "/survey/education"
//         }

//     ]
//     return (
//         <Swiper
//             spaceBetween={30}
//             centeredSlides={true}
//             autoplay={{
//                 delay: 2000,
//                 disableOnInteraction: true,
//             }}
//             modules={[Autoplay, Pagination, Navigation]}
//             className="mySwiper"
//         >
//             {
//                 slideInfos.map((info, index) => <SwiperSlide key={index}>
//                     <div className='bg-cover bg-center h-auto bg-no-repeat flex justify-center items-center text-white relative' style={{ backgroundImage: `url(${info?.image})` }}>
//                         <div className='bg-black h-full w-full absolute bg-opacity-60'></div>
//                         <div className='z-20 flex text-center flex-col justify-center items-center space-y-5'>
//                             <h1 className='text-5xl font-bold'>{info?.title}</h1>
//                             <p className='text-xl md:w-1/2 mx-auto'>{info?.description}</p>
//                             {/* <button className='button-custom'>Explore</button> */}
//                         </div>
//                     </div>
//                 </SwiperSlide>)
//             }
//         </Swiper>
//     );
// };

// export default SurveyPageBanner;


import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import slide1 from '../../../assets/images/surveyImage/slide7.jpg';
import slide2 from '../../../assets/images/surveyImage/slide2.jpg';
import slide3 from '../../../assets/images/surveyImage/slide3.jpg';
import slide4 from '../../../assets/images/surveyImage/slide4.jpg';
import slide5 from '../../../assets/images/surveyImage/slide5.jpg';
import slide6 from '../../../assets/images/surveyImage/slide6.jpg';
import slide7 from '../../../assets/images/surveyImage/slide1.jpg';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const SurveyPageBanner = () => {
    const slideInfos = [
        {
            image: slide1,
            title: "Participate in Our Health Survey",
            description: "Share your views on healthcare practices and contribute to a better future.",
            link: "/survey/health"
        },
        {
            image: slide2,
            title: "Technology Trends Survey",
            description: "Help us understand the latest trends in technology by sharing your insights.",
            link: "/survey/technology"
        },
        {
            image: slide3,
            title: "Food Preferences Survey",
            description: "Tell us about your favorite cuisines and food habits.",
            link: "/survey/food"
        },
        {
            image: slide4,
            title: "Travel and Tourism Survey",
            description: "Share your travel experiences and help us improve tourism services.",
            link: "/survey/travel"
        },
        {
            image: slide5,
            title: "Fitness and Wellness Survey",
            description: "Participate in our survey on fitness and wellness practices.",
            link: "/survey/fitness"
        },
        {
            image: slide6,
            title: "Consumer Product Survey",
            description: "Give your feedback on various consumer products and help shape future offerings.",
            link: "/survey/products"
        },
        {
            image: slide7,
            title: "Education System Survey",
            description: "Express your opinions on the current education system and suggest improvements.",
            link: "/survey/education"
        }
    ];

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper mb-40"
            style={{ height: '500px' }} // Ensuring the swiper takes full viewport height
        >
            {slideInfos.map((info, index) => (
                <SwiperSlide key={index} style={{ height: '100%' }}>
                    <div
                        className="bg-contain bg-center flex justify-center items-center text-white relative"
                        style={{
                            backgroundImage: `url(${info.image})`,
                            width: '100%',
                            height: '100%',
                            minHeight: '300px', // Minimum height to ensure visibility
                            backgroundSize: 'cover', // Ensure the background image covers the slide
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="bg-black h-full w-full absolute bg-opacity-60"></div>
                        <div className="z-20 flex text-center flex-col justify-center items-center space-y-5 px-4">
                            <h1 className="text-3xl md:text-5xl text-shadow-lg font-bold">{info.title}</h1>
                            <p className="text-lg md:text-xl max-w-2xl">{info.description}</p>
                            {/* <button className='button-custom'>Explore</button> */}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SurveyPageBanner;
