import UsePricingCard from "@/Hooks/UsePricingCard";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import OurPartners from "./OurPartners";
import Frequent from "./Frequent";
import { Link, useNavigate } from "react-router-dom";


const Pro = () => {
    const [pricingCard] = UsePricingCard();
    const [yearly, setYearly] = useState('');
    const [finalData, setFinalData] = useState([]);
    const navigate = useNavigate()
    // console.log(pricingCard)
    useEffect(() => {
        fetch('data.json')
            .then(res => res.json())
            .then(data => setYearly(data))
    }, [])
    // const handleButtonClick = (id) => {
    //     console.log('Button clicked', id);
    //     navigate("/payment")
    // };
    const handleTab = (value) => {
        console.log(value)
        setYearly(value)
    }
    useEffect(() => {
        if (!yearly || yearly === "payYearly") {
            const data = pricingCard.filter(card => card?.subscriptionType === 'yearly');
            setFinalData(data)
        }
        else {
            const data = pricingCard.filter(card => card?.subscriptionType !== 'yearly' || card.subscriptionType === null);
            setFinalData(data)
        }
    }, [pricingCard, yearly])
    return (
        <div className="text-white lg:w-3/4 mx-auto p-5 mb-10">
            <div className="text-center mt-10 space-y-3">
                <h1 className="text-3xl font-bold">Plans & Pricing</h1>
                <h3 className="text-xl">Choose the best plan for your business. Change plans as you grow.
                </h3>
            </div>
            <div className="my-10">
                <form action="">
                    <Tabs defaultValue="payMonthly" className="" onValueChange={handleTab}>
                        <TabsList className="grid md:w-1/2 mx-auto grid-cols-2 mb-10">
                            <TabsTrigger value="payMonthly">Pay Monthly</TabsTrigger>
                            <TabsTrigger value="payYearly">Pay Yearly (save 25%)</TabsTrigger>
                        </TabsList>
                        <TabsContent value="payMonthly">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                                {finalData.map(priceCard => <Card key={priceCard._id} className="w-full h-full">
                                    <h1 className="bg-yellow-300 p-2 bg-opacity-10 rounded-t-lg rounded-b-none text-white font-bold mb-2 text-center">$1 For the first month</h1>
                                    <CardHeader>
                                        <div className='flex items-start flex-col justify-between w-full flex-1 space-y-3'>
                                            <div className="flex justify-between w-full items-start gap-3">
                                                <CardTitle className='bg-transparent p-0'>{priceCard.name}
                                                </CardTitle>

                                                {priceCard.badge && <h1 className="bg-white  px-2 rounded-lg bg-opacity-10 md:text-nowrap text-xs p-1 font-semibold">{priceCard.badge}</h1>}
                                            </div>
                                            <CardDescription className='font-light w-full'>{priceCard.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <div className="w-full px-5">
                                        <div className="bg-white bg-opacity-15 w-full h-0.5">
                                        </div>
                                    </div>
                                    <h1 className='lg:text-5xl gradient-text text-4xl px-5 bg-transparent my-5 gap-2 flex items-center'><p className="tracking-tight ">{priceCard.price}</p> <p className="flex flex-col lg:text-xl text-sm font-light"><span className="uppercase font-semibold">usd</span><span className="font-semibold">/month</span></p></h1>
                                    <CardContent className="space-y-2 flex-grow">
                                        <ul>
                                            {
                                                priceCard.features.map((feature, index) => <li key={index} className="font-semibold before:content-['\2713']">{feature}</li>)
                                            }
                                        </ul>
                                    </CardContent>
                                    <CardFooter className=''>
                                        <Link to={`/payment/${priceCard._id}`} className='w-full bg-white bg-opacity-5'><Button
                                            className='w-full bg-white bg-opacity-5'>{priceCard.cta.text}</Button></Link>
                                    </CardFooter>
                                </Card>)}

                            </div>
                        </TabsContent>
                        <TabsContent value="payYearly">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                                {finalData.map(pack => <Card key={pack._id} className="w-full h-full">
                                    <h1 className="bg-yellow-300 p-2 bg-opacity-10 rounded-t-lg rounded-b-none text-white font-bold mb-2 text-center">$1 For the first month</h1>
                                    <CardHeader>
                                        <div className='flex items-start flex-col justify-between w-full flex-1 space-y-3'>
                                            <div className="flex justify-between w-full items-start gap-3">
                                                <CardTitle className='bg-transparent p-0'>{pack.name}
                                                </CardTitle>

                                                {pack.badge && <h1 className="bg-white  px-2 rounded-lg bg-opacity-10 md:text-nowrap text-xs p-1 font-semibold">{pack.badge}</h1>}
                                            </div>
                                            <CardDescription className='font-light w-full'>{pack.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <div className="w-full px-5">
                                        <div className="bg-white bg-opacity-15 w-full h-0.5">
                                        </div>
                                    </div>
                                    <h1 className='lg:text-5xl gradient-text text-4xl px-5 bg-transparent my-5 gap-2 flex items-center'><p className="tracking-tight ">{pack.price}</p> <p className="flex flex-col lg:text-xl text-sm font-light"><span className="uppercase font-semibold">usd</span><span className="font-semibold">/month</span></p></h1>
                                    <CardContent className="space-y-2 flex-grow">
                                        <ul>
                                            {
                                                pack.features.map((feature, index) => <li key={index} className="font-semibold before:content-['\2713']">{feature}</li>)
                                            }
                                        </ul>
                                    </CardContent>
                                    <CardFooter className=''>
                                        <Link to={`/payment/${pack._id}`} className='w-full bg-white bg-opacity-5'><Button className='w-full bg-white bg-opacity-5'>{pack.cta.text}</Button></Link>
                                    </CardFooter>
                                </Card>)}

                            </div>
                        </TabsContent>
                    </Tabs>
                </form>
            </div>
            <OurPartners></OurPartners>
            <Frequent></Frequent>
        </div>
    );
};

export default Pro;