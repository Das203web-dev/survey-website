import React from 'react';
import SectionTitle from '../../../../Shared/SectionTitle/SectionTitle';
import vid1 from "../../../../assets/video/vid.mp4";

const Featured = () => {
    return (
        <div className='my-20 relative h-[400px]'>
            <SectionTitle title={"Featured Section"} />
            <div className='relative h-full'>
                {/* Video as background */}
                <video className='absolute bottom-0 w-full h-[300px] blur-sm object-cover' src={vid1} autoPlay loop muted></video>
                {/* Content */}
                <div className='z-10 h-full relative bg-white bg-opacity-20 w-5/6'>
                    <div className='bg-black gap-5 h-full bg-opacity-70 p-8 flex items-center'>
                        <div className='w-full bg-blue-500 bg-opacity-20 h-[400px]'>

                        </div>
                        <p className='text-white w-full'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, pariatur? Officiis laboriosam quis adipisci dolorem ipsa illum cum quae sunt! Mollitia architecto voluptatum maxime corporis laboriosam, labore excepturi alias minima soluta fugiat quod. Quae sit corrupti provident deleniti quasi et laboriosam blanditiis, nostrum, ratione quibusdam officia tempore totam culpa veniam!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
