import React from 'react';
import SectionTitle from '../../../../Shared/SectionTitle/SectionTitle';
import UseSurveyData from '@/Hooks/UseSurveyData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaClock } from 'react-icons/fa6';
import { BsCalendarDateFill } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SeeMoreBtn from '../SeeMoreBtn/SeeMoreBtn';

const Latest = () => {
    const [surveyData] = UseSurveyData();
    // console.log(surveyData);
    const recentSurveys = surveyData.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    return (
        <div>
            <SectionTitle title={'Latest survey section'}></SectionTitle>
            <div className='grid gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                {
                    recentSurveys && recentSurveys.slice(0, 6).map(data => <Card key={data._id} className="card-custom hover:shadow-2xl">
                        <CardHeader className="card-header-custom">
                            <CardTitle className="text-2xl">{data.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="card-content-custom">
                            <div className="space-y-3">
                                <p className="text-lg font-medium text-gray-700">{data.description}</p>
                                <p className="text-md font-medium text-green-600">Vote: {data.total_votes}</p>
                                <p className="text-md font-medium text-gray-500">{data.category}</p>
                                <p className='text-gray-700 font-medium text-lg'>Start Date : {data.start_date}</p>

                            </div>
                        </CardContent>
                        <CardFooter className="card-footer-custom">
                            <Button className="button-custom w-full">
                                <Link to={`/survey/${data._id}`}>Survey details</Link>
                            </Button>
                        </CardFooter>
                    </Card>)
                }
            </div>
            <SeeMoreBtn></SeeMoreBtn>
        </div>
    );
};

export default Latest;