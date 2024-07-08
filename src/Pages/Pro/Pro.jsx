import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsePricingCard from "@/Hooks/UsePricingCard";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import OurPartners from "./OurPartners";
import Frequent from "./Frequent";
import RelatedBlogs from "./RelatedBlogs/RelatedBlogs";
import bannerImg from '../../assets/images/price1.webp';
import SectionTitle from "@/Shared/SectionTitle/SectionTitle";
import NewsLetter from "./NewsLetter";

const Pro = () => {
    const [pricingCard] = UsePricingCard();
    const [yearly, setYearly] = useState('');
    const [finalData, setFinalData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('data.json')
            .then(res => res.json())
            .then(data => setYearly(data));
    }, []);

    const handleTab = (value) => {
        console.log(value);
        setYearly(value);
    };

    useEffect(() => {
        if (!yearly || yearly === "payYearly") {
            const data = pricingCard.filter(card => card?.subscriptionType === 'yearly');
            setFinalData(data);
        } else {
            const data = pricingCard.filter(card => card?.subscriptionType !== 'yearly' || card.subscriptionType === null);
            setFinalData(data);
        }
    }, [pricingCard, yearly]);

    return (
        <div>
            <div className="relative flex flex-col">
                <div style={{ backgroundImage: `url(${bannerImg})` }} className="h-[500px] bg-cover bg-no-repeat bg- relative mb-40">
                    <div className="h-full w-full absolute bg-black bg-opacity-70"></div>
                    <div className="w-3/4 mx-auto space-y-5 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-center text-shadow-lg">
                        <h1 className="text-5xl">This is the pricing page</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae esse mollitia molestiae in placeat earum, soluta quia maiores recusandae autem at fuga praesentium maxime. Explicabo sint delectus optio quis repellat!</p>
                    </div>
                </div>

            </div>
            <div className="text-black md:w-3/4 mx-auto p-5 md:p-0 mb-10">
                <div className="text-center space-y-3">
                    <SectionTitle title={'Plans & Pricing'} />
                    <h3 className="text-xl">Choose the best plan for your business. Change plans as you grow.</h3>
                </div>
                <div className="my-10 mx-auto ">
                    <form action="">
                        <Tabs defaultValue="payMonthly" onValueChange={handleTab}>
                            <TabsList className="grid md:w-1/2 mx-auto grid-cols-2 mb-10">
                                <TabsTrigger value="payMonthly">Pay Monthly</TabsTrigger>
                                <TabsTrigger value="payYearly">Pay Yearly (save 25%)</TabsTrigger>
                            </TabsList>
                            <TabsContent value="payMonthly">
                                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 relative">
                                    {finalData.map((priceCard, index) => (
                                        <Card
                                            key={priceCard._id}
                                            className={`w-full h-full ${index % 2 === 1 ? "bg-black text-white -top-5" : "bg-white bg-opacity-5 shadow shadow-slate-300"}`}>
                                            <h1 className={`bg-[#2ab16e] p-2 bg-opacity-15 rounded-t-lg rounded-b-none text-black font-bold mb-2 text-center ${index % 2 === 1 ? "text-white" : ""}`}>$1 For the first month</h1>
                                            <CardHeader>
                                                <div className='flex items-start flex-col justify-between w-full flex-1 space-y-3'>
                                                    <div className="flex justify-between w-full items-start gap-3">
                                                        <CardTitle className={`bg-transparent p-0 ${index % 2 === 1 ? "text-white" : ""}`}>{priceCard.name}</CardTitle>
                                                        {priceCard.badge && <h1 className={` px-2 rounded-lg md:text-nowrap text-xs p-1 font-semibold ${index % 2 === 1 ? "bg-white text-black" : "bg-[#2ab16e] text-white"}`}>{priceCard.badge}</h1>}
                                                    </div>
                                                    <CardDescription className={`font-light w-full ${index % 2 === 1 ? "text-slate-400" : ""}`}>{priceCard.description}</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <div className="w-full px-5">
                                                <div className={`w-full h-0.5  ${index % 2 === 1 ? "bg-white bg-opacity-20" : "bg-black bg-opacity-20"}`}></div>
                                            </div>
                                            <h1 className='lg:text-5xl gradient-text text-4xl px-5 bg-transparent my-5 gap-2 flex items-center'>
                                                <p className="tracking-tight">{priceCard.price}</p>
                                                <p className="flex flex-col lg:text-xl text-sm font-light">
                                                    <span className="uppercase font-semibold">usd</span><span className="font-semibold">/month</span>
                                                </p>
                                            </h1>
                                            <CardContent className="space-y-2 flex-grow">
                                                <ul className="space-y-2">
                                                    {priceCard.features.map((feature, index) => (
                                                        <li key={index} className="font-extralight flex gap-2 before:content-['\2713']">{feature}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            <CardFooter className=''>
                                                <Link to={`/payment/${priceCard._id}`} className='w-full rounded-md'>
                                                    <Button className={` w-full ${index % 2 === 1 ? "text-black bg-white hover:text-white" : "button-custom"}`}>{priceCard.cta.text}</Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="payYearly">
                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 relative">
                                    {finalData.map((priceCard, index) => (
                                        <Card
                                            key={priceCard._id}
                                            className={`w-full h-full ${index % 2 === 1 ? "bg-black text-white top-5" : "bg-white bg-opacity-5 shadow shadow-slate-300"}`}>
                                            <h1 className={`bg-[#2ab16e] p-2 bg-opacity-15 rounded-t-lg rounded-b-none text-black font-bold mb-2 text-center ${index % 2 === 1 ? "text-white" : ""}`}>$1 For the first month</h1>
                                            <CardHeader>
                                                <div className='flex items-start flex-col justify-between w-full flex-1 space-y-3'>
                                                    <div className="flex justify-between w-full items-start gap-3">
                                                        <CardTitle className={`bg-transparent p-0 ${index % 2 === 1 ? "text-white" : ""}`}>{priceCard.name}</CardTitle>
                                                        {priceCard.badge && <h1 className={` px-2 rounded-lg md:text-nowrap text-xs p-1 font-semibold ${index % 2 === 1 ? "bg-white text-black" : "bg-[#2ab16e] text-white"}`}>{priceCard.badge}</h1>}
                                                    </div>
                                                    <CardDescription className={`font-light w-full ${index % 2 === 1 ? "text-slate-400" : ""}`}>{priceCard.description}</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <div className="w-full px-5">
                                                <div className="bg-white bg-opacity-15 w-full h-0.5"></div>
                                            </div>
                                            <h1 className='lg:text-5xl gradient-text text-4xl px-5 bg-transparent my-5 gap-2 flex items-center'>
                                                <p className="tracking-tight">{priceCard.price}</p>
                                                <p className="flex flex-col lg:text-xl text-sm font-light">
                                                    <span className="uppercase font-semibold">usd</span><span className="font-semibold">/month</span>
                                                </p>
                                            </h1>
                                            <CardContent className="space-y-2 flex-grow">
                                                <ul className="space-y-2">
                                                    {priceCard.features.map((feature, index) => (
                                                        <li key={index} className="font-extralight flex gap-2 before:content-['\2713']">{feature}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            <CardFooter className=''>
                                                <Link to={`/payment/${priceCard._id}`} className='w-full bg-white bg-opacity-5'>
                                                    <Button className={` w-full ${index % 2 === 1 ? "bg-white text-black hover:text-white" : "button-custom"}`}>{priceCard.cta.text}</Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </form>
                </div>
                <OurPartners />
                <Frequent />
                <RelatedBlogs />
                <NewsLetter></NewsLetter>
            </div>
        </div>
    );
};

export default Pro;

