// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import cardImg from '../../assets/images/card/card.jpg'

// const CheckOut = () => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handlePayment = async (e) => {
//         e.preventDefault();
//         if (!stripe || !elements) {
//             return;
//         }
//         const card = elements.getElement(CardElement);

//         if (card === null) {
//             return
//         }
//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: "card",
//             card
//         })
//         if (error) {
//             console.log("payment error", error)
//         }
//         else {
//             console.log("payment method", paymentMethod)
//         }
//     };

//     const CARD_OPTIONS = {
//         iconStyle: 'solid',
//         style: {
//             base: {
//                 iconColor: '#c4f0ff',
//                 color: '#fff',
//                 fontWeight: 500,
//                 fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
//                 fontSize: '16px',
//                 fontSmoothing: 'antialiased',
//                 ':-webkit-autofill': {
//                     color: '#fce883',
//                 },
//                 '::placeholder': {
//                     color: '#87bbfd',
//                 },
//             },
//             invalid: {
//                 iconColor: '#ffc7ee',
//                 color: '#ffc7ee',
//             },
//         },
//     };



//     return (
//         <div className='flex md:flex-row flex-col lg:w-3/4 mx-auto items-center gap-5'>
//             <div className=' w-full h-full'>
//                 <img src={cardImg} alt="card Image" />
//             </div>
//             <form className='w-full p-5 rounded-lg bg-white bg-opacity-5 mx-auto' onSubmit={handlePayment}>
//                 <div className="FormRow">
//                     <CardElement
//                         options={CARD_OPTIONS}
//                     />
//                 </div>
//                 <div className='mx-auto w-1/2'>
//                     <button className='px-4 py-2 my-5 w-full bg-white bg-opacity-5 shadow shadow-slate-500 text-[#FFD700] font-bold rounded-lg' type="submit" disabled={!stripe}>
//                         Pay
//                     </button>
//                 </div>
//             </form>

//         </div>
//     );
// };

// export default CheckOut;


import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import cardImg from '../../assets/images/card/card.jpg'
import { AuthContext } from '@/AuthProvider/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import UseAxios from '@/Hooks/UseAxios';
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const CheckOut = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState()
    const axiosSecure = UseAxios();
    const axiosPublic = UseAxiosPublic();
    const [totalMoney, setTotalMoney] = useState("");
    const navigate = useNavigate();
    const location = useLocation()
    const { _id } = useParams();
    useEffect(() => {
        axiosPublic.get(`/pricingCard/${_id}`)
            .then(res => {
                if (res.data) {
                    const productPrice = res.data?.price
                    const splitPrice = productPrice.split('$');
                    const parsingPrice = parseFloat(splitPrice[1]);
                    if (parsingPrice) {
                        setTotalMoney(parsingPrice)
                        axiosSecure.post('/create_payment_intent', { price: parsingPrice })
                            .then(res => {
                                if (res.data?.clientSecret) {
                                    setClientSecret(res.data.clientSecret)
                                }
                            })
                    }
                }
            })
    }, [axiosPublic, _id, axiosSecure])

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
            billing_details: {
                email: user.email,
                name: user.name
            }
        })
        if (error) {
            console.log("payment error", error)
        }
        else {
            console.log("payment method", paymentMethod)
        }
        const { paymentIntent, error: confirmationError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email,
                    name: user.displayName || "anonymous"
                }
            }
        })
        if (confirmationError) {
            console.log(confirmationError)
        }
        else {
            if (paymentIntent.status === "succeeded") {
                console.log('payment success', paymentMethod.id);
                const paymentInfo = {
                    email: user.email,
                    price: totalMoney,
                    transactionId: paymentMethod.id,
                    role: "pro_user"
                }
                console.log(paymentInfo);
                axiosSecure.post('paid_user_data', paymentInfo)
                    .then(res => {
                        console.log(res.data, "api hit");
                        if (res.data.status === "payment_succeed") {
                            alert("Subscription successfull");
                            navigate(location.state ? location.state : "/")
                        }
                    })
            }
            else {

            }
        }
    };

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#c4f0ff',
                color: '#fff',
                fontWeight: 500,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': {
                    color: '#fce883',
                },
                '::placeholder': {
                    color: '#87bbfd',
                },
            },
            invalid: {
                iconColor: '#ffc7ee',
                color: '#ffc7ee',
            },
        },
    };



    return (
        <div className='flex md:flex-row flex-col lg:w-3/4 mx-auto items-center gap-5'>
            <div className=' w-full h-full'>
                <img src={cardImg} alt="card Image" />
            </div>
            <form className='w-full p-5 space-y-3 rounded-lg bg-white bg-opacity-5 mx-auto' onSubmit={handlePayment}>
                <input className='bg-transparent text-white' value={user?.email} type="email" />
                <p className='text-white'>Total Money : {totalMoney}</p>
                <div className="FormRow">
                    <CardElement
                        options={CARD_OPTIONS}
                    />
                </div>
                <div className='mx-auto w-1/2'>
                    <button className='px-4 py-2 my-5 w-full bg-white bg-opacity-5 shadow shadow-slate-500 text-[#FFD700] font-bold rounded-lg' type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                </div>
            </form>

        </div>
    );
};

export default CheckOut;
