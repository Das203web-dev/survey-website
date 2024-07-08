


import { useEffect, useState } from 'react';
import SectionTitle from '../../../../Shared/SectionTitle/SectionTitle';
import UseSurveyData from '@/Hooks/UseSurveyData';
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SeeMoreBtn from '../SeeMoreBtn/SeeMoreBtn';

const Featured = () => {
    const [surveyData] = UseSurveyData();
    const mostVotedSurvey = surveyData?.sort((a, b) => b.total_votes - a.total_votes);

    return (
        <div className='my-20 relative h-full'>
            <SectionTitle title={"Featured Section"} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    mostVotedSurvey.slice(0, 6).map(data => (
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
                    ))
                }
            </div>

            <SeeMoreBtn></SeeMoreBtn>

        </div>
    );
};

export default Featured;
