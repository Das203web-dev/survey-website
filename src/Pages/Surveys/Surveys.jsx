import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import img1 from '../../assets/images/banner.svg';
import UseSurveyData from "@/Hooks/UseSurveyData";
import { useEffect, useRef, useState } from "react";
import SurveyPageBanner from "./SurveyPageBanner/SurveyPageBanner";
import SearchComponent from "./SearchComponent/SearchComponent";
import nodataImg from '../../assets/images/surveyImage/nodata/noDataImg.png';
import { BiMenuAltLeft } from "react-icons/bi";
import TopCategory from "./TopCategory/TopCategory";
import SurveyInsight from "./SurveyInsight/SurveyInsight";

// Helper function for sorting
const sortSurveys = (data, sortOrder) => {
    if (sortOrder === 'mostVote') {
        return data.slice().sort((a, b) => b.total_votes - a.total_votes); // Descending order
    } else if (sortOrder === 'lessVote') {
        return data.slice().sort((a, b) => a.total_votes - b.total_votes); // Ascending order
    }
    return data;
};

const Surveys = () => {
    const [surveyData, isLoading] = UseSurveyData();
    const [filter, setFilter] = useState(''); // State for selected category
    const [filteredData, setFilteredData] = useState([]); // State for storing filtered data 
    const [selectedValue, setSelectedValue] = useState("mostVote"); // State for selected radio button value with default "mostVote"
    const [currentPage, setCurrentPage] = useState(0); // State for current page 
    const [openFilter, setOpenFilter] = useState(false); // State for filter visibility
    const [searchedData, setSearchData] = useState([]);


    // steps for creating pages for paginate 
    const itemsPerPage = 5;
    const totalData = surveyData.length;
    const totalPage = Math.ceil(totalData / itemsPerPage);
    const pages = []
    for (let i = 0; i < totalPage; i++) {
        pages.push(i)
    }
    console.log(filteredData, 'line 44');
    console.log(searchedData, 'line 45');

    // Initialize categories
    const categories = [...new Set(surveyData.map(survey => survey.category))];

    // Function to get the filtered and sorted data
    const getFilteredAndSortedData = () => {
        // Filter data
        let filtered = surveyData;
        if (filter && filter !== "all") {
            filtered = surveyData.filter(data => data.category === filter);
        }
        // Sort data
        const sortedData = sortSurveys(filtered, selectedValue);
        return sortedData;
    };

    // Pagination effect
    useEffect(() => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        if (searchedData.length > 0) {
            const paginate = searchedData.slice(startIndex, endIndex);
            setFilteredData(paginate)
        }
        else {
            const filteredAndSortedData = getFilteredAndSortedData();
            const paginatedData = filteredAndSortedData.slice(startIndex, endIndex);
            setFilteredData(paginatedData);
        }
    }, [currentPage, surveyData, filter, selectedValue, searchedData]);

    // Handle category change
    const handleFilter = async (e) => {
        const category = e.target.value;
        setFilter(category);
        setCurrentPage(0); // Reset to first page when filter changes
    };

    // Handle vote change
    const handleVote = (value) => {
        setSelectedValue(value);
        setCurrentPage(0); // Reset to first page when sorting changes
    };



    return (
        <div>
            <SurveyPageBanner />
            <div className="lg:w-3/4 md:mx-auto px-5">
                <div className="flex items-center flex-col gap-5 text-center md:text-start md:flex-row md:h-60 bg-black bg-opacity-5 my-20 rounded-md p-5">
                    <img className="md:w-1/2 h-full w-full" src={img1} alt="" />
                    <h1 className="text-4xl font-bold md:w-1/2 w-full gradient-text">Let Your Voice Be Heard: Participate in Our Survey!</h1>
                </div>
                <SearchComponent surveyData={surveyData} setData={setSearchData} />

                {/* this is for mobile device  */}
                <div className="md:hidden w-fit flex gap-2" onClick={() => setOpenFilter(!openFilter)}>
                    <p className="text-lg font-bold">Filter By</p>
                    <BiMenuAltLeft className="text-3xl" />
                </div>



                <div>
                    {filteredData.length > 0 ? (
                        <div className={`md:grid flex flex-col md:grid-cols-5 gap-5 `}>
                            {/* Filter Section */}
                            <div className={`flex flex-col gap-5 shadow-md shadow-[#00000033] my-10 h-auto md:h-fit rounded-lg text-black p-3 ${openFilter ? "static" : "hidden md:block"}`}>
                                {/* Category Filter */}
                                <div className="md:h-fit rounded-lg text-black p-3">
                                    <h1 className="mb-2 font-bold text-xl">Category</h1>
                                    <div className="flex flex-col items-center p-2 rounded-lg">
                                        <div className="flex flex-col items-center p-2 rounded-lg w-full">
                                            <select onChange={handleFilter} className="bg-white bg-opacity-5 p-1 border-none rounded-md text-sm w-full">
                                                <option className="text-black p-5 font-semibold" value={'all'}>All</option>
                                                {categories.map((cat, index) => (
                                                    <option className="text-black p-5 font-semibold" key={index} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Vote Filter */}
                                <div className="h-auto md:h-fit rounded-lg text-black p-3">
                                    <h1 className="mb-2 font-bold text-xl">Vote</h1>
                                    <div className="flex flex-col items-center p-3 justify-center rounded-lg">
                                        <form className="">
                                            <RadioGroup value={selectedValue} onValueChange={handleVote}>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem name="mostVoted" value="mostVote" id="r1" />
                                                    <Label htmlFor="r1">Most Voted</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem name="lessVoted" value="lessVote" id="r2" />
                                                    <Label htmlFor="r2">Less Voted</Label>
                                                </div>
                                            </RadioGroup>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Cards Section */}
                            <div className="md:col-span-4 flex flex-col">
                                <div className={`w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-10 ${filteredData.length < 4 ? "mb-20" : "mb-0"}`}>
                                    {filteredData.map((data) => (
                                        <Card key={data._id} className="transition-shadow duration-500 shadow-md hover:shadow-2xl">
                                            <CardHeader className="card-header-custom">
                                                <CardTitle className="text-2xl">{data.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="card-content-custom">
                                                <div className="space-y-3">
                                                    <p className="text-lg font-medium text-gray-700">{data.description}</p>
                                                    <p className="text-md font-medium text-green-600">Vote: {data.total_votes}</p>
                                                    <p className="text-md font-medium text-gray-500">{data.category}</p>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="card-footer-custom">
                                                <Button className="button-custom w-full transition-all">
                                                    <Link to={`/survey/${data._id}`}>Survey details</Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {filteredData.length > 4 && (
                                    <div className="flex justify-center items-center mt-10 mb-20 gap-2">
                                        {pages.map((page, index) => (
                                            <button className={`text-white w-8 h-8 rounded-md ${currentPage === page ? "bg-black" : "bg-[#2ab16e]"}`} onClick={() => setCurrentPage(page)} key={index}>{page}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) :
                        (
                            <div className={`flex justify-center items-center text-center gap-5 flex-col`}>
                                <h1 className="text-5xl font-bold">OOPS</h1>
                                <img className="w-1/2 h-auto" src={nodataImg} alt="No Data Found" />
                            </div>
                        )
                    }
                </div>






                <TopCategory categories={categories}></TopCategory>

                <SurveyInsight categories={categories}></SurveyInsight>


                <div className="cta-section my-20 bg-[#2ab16e] text-white py-10 px-5 rounded-lg text-center">
                    <h2 className="text-3xl font-bold mb-5">Create Your Own Survey!</h2>
                    <p className="text-lg mb-5">Have questions that need answers? Create your own survey and gather valuable insights!</p>
                    <Button className="bg-white text-[#2ab16e] py-2 px-5 rounded-full transition-all">
                        <Link to="/create-survey">Get Started</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Surveys;




