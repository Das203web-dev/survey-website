import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


import { cn } from "@/lib/utils"
import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom";
import img1 from '../../assets/images/banner.png'
import UseSurveyData from "@/Hooks/UseSurveyData";
import { useContext, useEffect, useRef, useState } from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";

// import { AuthContext } from "@/AuthProvider/AuthProvider";
// import UseAxiosPublic from "@/Hooks/UseAxiosPublic";
// import { Skeleton } from "@/components/ui/skeleton";
// import Pagination from "@/components/Pagunation/Pagination";


const Surveys = () => {
    const [surveyData] = UseSurveyData();
    // const [category, setCategory] = useState([])
    const [filter, setFilter] = useState(''); //state for getting the selected category
    const [filteredData, setFilteredData] = useState(surveyData); //state for storing filtered data 
    const [selectedValue, setSelectedValue] = useState(""); // state for selected radio button value...
    const [currentPage, setCurrentPAge] = useState(0); //state for setting the current page 
    const radioGroup = useRef(null);
    // const { user } = useContext(AuthContext);
    // const axiosPublic = UseAxiosPublic();

    // pagination here 
    const category = [];
    for (let i = 0; i < surveyData.length; i++) {
        if (!category.includes(surveyData[i].category)) {
            category.push(surveyData[i].category)
        }
    }
    // console.log(category)
    const itemsPerPage = 5;
    const totalData = surveyData.length;
    const totalPage = Math.ceil(totalData / itemsPerPage);
    const pages = []
    for (let i = 0; i < totalPage; i++) {
        pages.push(i)
    }
    useEffect(() => {
        if (surveyData.length > 5) {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const result = surveyData.slice(startIndex, endIndex);
            setFilteredData(result)
        }
    }, [currentPage, surveyData, itemsPerPage])


    // here i am getting the selected category 
    const handleFilter = async (e) => {
        const category = await e.target.value;
        setFilter(category)
    }

    // here i am getting the selected radio button value 
    const handleVote = async (value) => {
        setSelectedValue(value);
    };

    // this filtering is for displaying data according to vote 

    useEffect(() => {
        // const surveyDataCopy = [...surveyData];
        if (!selectedValue || selectedValue === 'lessVote') {
            const result = filteredData.sort((a, b) => b.total_votes - a.total_votes);
            setFilteredData(result);
        }
        else if (selectedValue === 'mostVote') {
            const result = filteredData.sort((a, b) => a.total_votes - b.total_votes);
            setFilteredData(result);
        }
    }, [selectedValue, surveyData, filteredData]);

    // this filtering is for displaying data according to category 

    useEffect(() => {
        if (!filter || filter === "all") {
            const res = surveyData.slice(0, 5)
            setFilteredData(res)
        }
        else {
            const res = surveyData.filter(data => data.category === filter);
            setFilteredData(res)
        }
    }, [filter, surveyData])

    return (
        <div>
            <div className=" lg:w-3/4 md:mx-auto  px-5">
                <div className="flex items-center flex-col md:flex-row">
                    <img className="md:w-1/2 w-full" src={img1} alt="" />
                    <h1 className="text-5xl font-bold md:w-1/2 w-full gradient-text">Let Your Voice Be Heard: Participate in Our Survey!</h1>
                </div>
                <div className="md:grid flex flex-col md:grid-cols-5 gap-5">

                    {/* this is filter section  */}

                    <div className=" bg-white flex flex-col gap-5 bg-opacity-5 shadow-sm shadow-[#00ffff9d] my-20 h-auto md:h-fit rounded-lg text-white p-5">

                        {/* this is category filtering div  */}

                        <div className="bg-white bg-opacity-5 shadow-sm shadow-[#00ffff9d]  md:h-fit rounded-lg text-white p-5">
                            <h1 className="mb-2 font-bold text-xl">Category</h1>
                            <div className="flex flex-col items-center bg-white bg-opacity-5 p-2 rounded-lg">
                                <div className="flex flex-col items-center p-2 rounded-lg w-full">
                                    <select onChange={handleFilter} className="bg-black bg-opacity-85 p-1 rounded-md text-sm w-full" >
                                        <option className="bg-black bg-opacity-10 text-white font-semibold" value={'all'}>All</option>
                                        {category &&
                                            category.map((data, index) => <option className="bg-black bg-opacity-10 text-white font-semibold  overflow-y-auto max-h-2" key={index} value={data}>{data}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>


                        {/* this is vote filering div  */}

                        <div className=" bg-white bg-opacity-5 shadow-sm shadow-[#00ffff9d] h-auto md:h-fit rounded-lg text-white p-5">
                            <h1 className="mb-2 font-bold text-xl">Vote</h1>
                            <div className="flex flex-col items-center bg-white bg-opacity-5 p-3 justify-center rounded-lg">
                                <form className="bg-opacity-5 text-white">
                                    <RadioGroup value={selectedValue} onValueChange={handleVote}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem name="mostVoted" value="mostVote" id="r1" ref={radioGroup} />
                                            <Label htmlFor="r1">Most Voted</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem name="lessVoted" value='lessVote' id="r2" ref={radioGroup} />
                                            <Label htmlFor="r2">Less voted</Label>
                                        </div>
                                    </RadioGroup>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="md:col-span-4 flex flex-col">

                        {/* this is card section  */}

                        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:py-20">
                            {
                                filteredData.map((data) => <Card key={data._id} className={cn("hover:shadow-sm hover:shadow-slate-100")} >
                                    < CardHeader className='' >
                                        <CardTitle>{data.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4 flex-grow">
                                        <div className="space-y-3">
                                            <p className="text-xl font-medium">{data.description}</p>
                                            <p className="text-lg font-medium">Vote : {data.total_votes}</p>
                                            <p className="font-medium text-lg">{data.category}</p>
                                            {data.surveyStartDate?.start_date && data.surveyStartDate?.start_time ? <p className="font-medium text-lg flex justify-between flex-col gap-5"><span className="flex gap-1 items-center">Start_date : <BsCalendarDateFill
                                            ></BsCalendarDateFill>{data.surveyStartDate.start_date}</span>  <span className="flex gap-2 items-center">Start_Time : <FaClock></FaClock>{data.surveyStartDate.start_time}</span></p> : ""}
                                        </div>
                                    </CardContent>
                                    <CardFooter className=''>
                                        <Button className="w-full bg-white bg-opacity-10">
                                            <Link to={`/survey/${data._id}`}>Survey details</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                                )
                            }
                        </div>
                        {/* <Pagination totalData={surveyData}></Pagination> */}

                        {/* this is pagination div  */}

                        {filteredData.length > 4 && <div className="flex justify-center items-center mt-5 md:mt-0 mb-20 gap-2">
                            {
                                pages.map((page, index) => <Button onClick={() => setCurrentPAge(page)} key={index}>{page}</Button>)
                            }
                        </div>}
                    </div >

                </div>
            </div >
        </div >
    );
};

export default Surveys;