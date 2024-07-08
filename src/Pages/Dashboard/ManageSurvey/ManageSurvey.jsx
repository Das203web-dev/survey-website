import UseSurveyData from '@/Hooks/UseSurveyData';
import SectionTitle from '@/Shared/SectionTitle/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Link } from 'react-router-dom';

const ManageSurvey = () => {
    const [surveyData, refetch] = UseSurveyData()
    return (
        <div>
            <SectionTitle title={'manage surveys'}></SectionTitle>
            <div className={`w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5`}>
                {surveyData.map((data) => (
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
                        {/* <CardFooter className="card-footer-custom">
                        <Button className="button-custom w-full transition-all">
                            <Link to={`/survey/${data._id}`}>Survey details</Link>
                        </Button>
                    </CardFooter> */}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ManageSurvey;