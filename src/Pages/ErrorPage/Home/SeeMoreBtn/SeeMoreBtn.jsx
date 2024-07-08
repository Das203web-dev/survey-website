import { Button } from '@/components/ui/button';
import React from 'react';
import { GoArrowRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const SeeMoreBtn = () => {
    return (
        < div className='flex justify-end my-10' >
            <Button className="bg-transparent hover:bg-transparent text-black w-fit group ">
                <Link to={`/surveys`} className="flex items-center text-xl">
                    <span>See more</span>
                    <GoArrowRight className='text-2xl ml-1 transition-transform transform group-hover:translate-x-2 duration-300' />
                </Link>
            </Button>
        </div >
    );
};

export default SeeMoreBtn;