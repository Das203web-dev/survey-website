import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOut from './CheckOut';
import { useEffect } from 'react';
import UseAxios from '@/Hooks/UseAxios';
import { useParams } from 'react-router-dom';
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const Payment = () => {
    // const { _id } = useParams()

    // var findDelayedArrivalTime = function (arrivalTime, delayedTime) {
    //     function convertTime(time) {
    //         return new Date("1970-03-01T", time, "Z").toLocaleTimeString("en-Us", { hour12: false })
    //     }
    //     return convertTime(arrivalTime) + convertTime(delayedTime)
    // };
    // console.log((findDelayedArrivalTime("03:30:45 PM", "03:50:45 PM")))

    const option = {
        mode: "payment",
        amount: 1099,
        currency: "usd"
    }


    return (
        <div className='p-5 rounded-lg'>
            <h1>This is payment page</h1>
            <Elements stripe={stripePromise} options={option}>
                <CheckOut></CheckOut>
            </Elements>
        </div>
    );
};

export default Payment;