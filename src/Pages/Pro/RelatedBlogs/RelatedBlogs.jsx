import SectionTitle from '@/Shared/SectionTitle/SectionTitle';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RelatedBlogs = () => {
    const [readMore, setReadMore] = useState(false);
    const handleReadMore = () => {
        setReadMore(true)
    }
    return (

        <div className="related-articles my-20">
            <SectionTitle title={'Related Articles'}></SectionTitle>
            <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 gap-5">
                <Card className="transition-shadow duration-500 shadow-md hover:shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">How to Create Engaging Surveys</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Discover tips and tricks to create surveys that capture the attention of your audience.</p>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleReadMore} className="button-custom w-full transition-all">
                            Read More
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="transition-shadow duration-500 shadow-md hover:shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Understanding Survey Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Learn how to analyze survey results to gain meaningful insights.</p>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleReadMore} className="button-custom w-full transition-all">
                            Read More
                        </Button>
                    </CardFooter>
                </Card>
                {readMore && <AlertDialog className="bg-white" open={readMore} onOpenChange={setReadMore}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti dolorum, enim nostrum pariatur qui repudiandae consequatur aperiam recusandae quam excepturi facilis, blanditiis iure quas nihil est doloribus placeat. Non, placeat?Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt harum in accusantium excepturi quasi, hic molestiae nemo veniam eaque ipsum fugiat ex, eligendi eos atque nobis nulla perspiciatis? Iste deserunt, excepturi odio dolore repudiandae, magni iure blanditiis repellendus at et, magnam odit quia. Praesentium commodi voluptate temporibus rem saepe voluptas?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>}

            </div>
        </div>
    );
};

export default RelatedBlogs;