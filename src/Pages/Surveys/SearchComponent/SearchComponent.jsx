import UseSurveyData from '@/Hooks/UseSurveyData';
import SectionTitle from '@/Shared/SectionTitle/SectionTitle';
import React, { useState } from 'react';

const SearchComponent = ({ surveyData, setData }) => {
    const [searchText, setSearchText] = useState('');
    const handleOnChange = async (e) => {
        const text = e.target.value.toLowerCase();
        setSearchText(text)
        const result = await surveyData?.filter(data => data?.title.toLowerCase().includes(text));
        setData(result)
    }
    const handleSearch = async (e) => {
        e.preventDefault()
        const result = await surveyData?.filter(data => data?.title.toLowerCase().includes(searchText));
        setData(result)
        // setCurrentPageData(result)

    }
    return (
        <div className='my-10'>
            <SectionTitle title={'surveys'}></SectionTitle>
            <form onSubmit={handleSearch} className='mt-10 flex md:w-1/2 mx-auto relative'>
                <input onChange={handleOnChange} className='w-full rounded-s-full px-3 py-2 border-[1px] border-[#2ab16e] focus:outline-none' name='searchText' type="text" placeholder='Search your favorite surveyz here' />
                <input className=' border-2 border-[#2ab16e] px-5 py-2 h-full rounded-r-full text-white cursor-pointer font-bold bg-[#2ab16e]' type="submit" value='Search' />
            </form>
        </div>
    );
};

export default SearchComponent;