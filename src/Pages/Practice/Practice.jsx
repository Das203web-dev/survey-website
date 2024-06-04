import React, { useRef, useState, useEffect } from 'react';
import bgVid from '../../assets/video/vid.mp4';
import imgVid from '../../assets/images/card/card.jpg';

const Practice = () => {
    const videoRef = useRef(null);
    const [blurStrength, setBlurStrength] = useState(0);

    useEffect(() => {
        const updateBlurEffect = () => {
            const video = videoRef.current;
            const maxBlurStrength = 10; // Maximum blur strength
            const startBlurPercentage = 0.3; // 40% blur at the start

            if (video) {
                const progress = video.currentTime / video.duration; // Calculate progress
                const adjustedProgress = Math.max((progress - startBlurPercentage) / (1 - startBlurPercentage), 0.3); // Adjust progress to start blur at 40%
                const newBlurStrength = Math.min(adjustedProgress * maxBlurStrength, maxBlurStrength); // Adjust blur strength based on progress
                setBlurStrength(newBlurStrength);
            }
        };

        const video = videoRef.current;
        if (video) {
            video.addEventListener('timeupdate', updateBlurEffect);
            return () => video.removeEventListener('timeupdate', updateBlurEffect);
        }
    }, []);

    return (
        <div className='text-white space-y-10'>
            <div className="relative w-full xl:h-[520px] z-0 lg:h-[600px] md:h-[650px]">
                <div className='relative'>
                    <video ref={videoRef} className="object-cover bg-center z-10 md:h-[250px] h-[900px] w-full" autoPlay muted loop src={bgVid}></video>
                    <div className="bg-black bg-opacity-40 z-10 h-full top-0 absolute w-full" style={{ backdropFilter: `blur(${blurStrength}px)` }}></div>
                    <div>
                        <h1 className='absolute xl:w-2/5 bg-slate-500 xl:text-right lg:w-[29%] md:w-[44%] w-full md:mx-auto z-50 md:-translate-x-1/2 md:bottom-5 bottom-[90%] md:left-1/2 left-5 text-left text-5xl md:p-0 p-5 font-bold text-white'>About Fakrul Alam</h1>
                    </div>
                </div>
                <div className='flex gap-10 items-end absolute md:top-0 top-[10%] left-1/2 -translate-x-1/2 z-50 bottom-0 md:flex-row flex-col justify-center lg:w-2/3 md:w-3/4 w-full mx-auto md:p-0 p-5'>
                    <div className='z-30 space-y-5 p-5 md:p-0'>
                        <h1 className='font-bold text-2xl text-white md:text-right text-left text-pretty'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                        <p className='z-30 text-white bottom-0 text-left md:text-right'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit repellat optio consequuntur a totam non consequatur sequi fugiat placeat earum officia qui pariatur minus, quae commodi fugit dignissimos ut id impedit. Hic qui tempora, aliquid saepe perferendis porro. Voluptas unde dolores nulla consequatur doloribus omnis, dolore corrupti laudantium natus? Quas delectus minus ipsa, distinctio eligendi saepe deleniti illo quis placeat veritatis repellendus, expedita obcaecati dicta dolore animi necessitatibus sapiente beatae?</p>
                    </div>
                    <img className='z-20 p-5 md:p-0 top-0 bottom-0 md:w-1/3 w-full right-0 h-full' src={imgVid} alt="" />
                </div>
            </div>
            <div className='flex justify-center gap-10 w-2/3 mx-auto'>
                <img className='w-1/2' src={imgVid} alt="" />
                <p className='w-1/2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aliquam non debitis blanditiis delectus, pariatur quam dolor repellat a, quibusdam modi aperiam veritatis quasi laboriosam cum, magni ullam cumque unde? Magnam, autem saepe? Quis veritatis illo quidem vero nemo doloribus quibusdam id commodi saepe. Voluptatibus placeat explicabo quia magnam ipsum?</p>
            </div>
            <div className='flex flex-row-reverse justify-center gap-10 w-2/3 mx-auto'>
                <img className='w-1/2' src={imgVid} alt="" />
                <p className='w-1/2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aliquam non debitis blanditiis delectus, pariatur quam dolor repellat a, quibusdam modi aperiam veritatis quasi laboriosam cum, magni ullam cumque unde? Magnam, autem saepe? Quis veritatis illo quidem vero nemo doloribus quibusdam id commodi saepe. Voluptatibus placeat explicabo quia magnam ipsum?</p>
            </div>
        </div>
    );
};

export default Practice;
