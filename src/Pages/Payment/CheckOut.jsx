// // import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// // import cardImg from '../../assets/images/card/card.jpg'

// // const CheckOut = () => {
// //     const stripe = useStripe();
// //     const elements = useElements();

// //     const handlePayment = async (e) => {
// //         e.preventDefault();
// //         if (!stripe || !elements) {
// //             return;
// //         }
// //         const card = elements.getElement(CardElement);

// //         if (card === null) {
// //             return
// //         }
// //         const { error, paymentMethod } = await stripe.createPaymentMethod({
// //             type: "card",
// //             card
// //         })
// //         if (error) {
// //             console.log("payment error", error)
// //         }
// //         else {
// //             console.log("payment method", paymentMethod)
// //         }
// //     };

// //     const CARD_OPTIONS = {
// //         iconStyle: 'solid',
// //         style: {
// //             base: {
// //                 iconColor: '#c4f0ff',
// //                 color: '#fff',
// //                 fontWeight: 500,
// //                 fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
// //                 fontSize: '16px',
// //                 fontSmoothing: 'antialiased',
// //                 ':-webkit-autofill': {
// //                     color: '#fce883',
// //                 },
// //                 '::placeholder': {
// //                     color: '#87bbfd',
// //                 },
// //             },
// //             invalid: {
// //                 iconColor: '#ffc7ee',
// //                 color: '#ffc7ee',
// //             },
// //         },
// //     };



// //     return (
// //         <div className='flex md:flex-row flex-col lg:w-3/4 mx-auto items-center gap-5'>
// //             <div className=' w-full h-full'>
// //                 <img src={cardImg} alt="card Image" />
// //             </div>
// //             <form className='w-full p-5 rounded-lg bg-white bg-opacity-5 mx-auto' onSubmit={handlePayment}>
// //                 <div className="FormRow">
// //                     <CardElement
// //                         options={CARD_OPTIONS}
// //                     />
// //                 </div>
// //                 <div className='mx-auto w-1/2'>
// //                     <button className='px-4 py-2 my-5 w-full bg-white bg-opacity-5 shadow shadow-slate-500 text-[#FFD700] font-bold rounded-lg' type="submit" disabled={!stripe}>
// //                         Pay
// //                     </button>
// //                 </div>
// //             </form>

// //         </div>
// //     );
// // };

// // export default CheckOut;


// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import cardImg from '../../assets/images/card/card.jpg'
// import { AuthContext } from '@/AuthProvider/AuthProvider';
// import { useContext, useEffect, useState } from 'react';
// import UseAxios from '@/Hooks/UseAxios';
// import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import showToast from '@/components/Toast/toast';
// import UsePaidUserData from '@/Hooks/UsePaidUserData';


// const CheckOut = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const { user } = useContext(AuthContext);
//     const [clientSecret, setClientSecret] = useState()
//     const axiosSecure = UseAxios();
//     const axiosPublic = UseAxiosPublic();
//     const [totalMoney, setTotalMoney] = useState("");
//     const navigate = useNavigate();
//     const location = useLocation()
//     const { _id } = useParams();
//     const [paidUserData] = UsePaidUserData(user.email)
//     useEffect(() => {
//         axiosPublic.get(`/pricingCard/${_id}`)
//             .then(res => {
//                 if (res.data) {
//                     const productPrice = res.data?.price
//                     const splitPrice = productPrice.split('$');
//                     const parsingPrice = parseFloat(splitPrice[1]);
//                     if (parsingPrice) {
//                         setTotalMoney(parsingPrice)
//                         axiosSecure.post('/create_payment_intent', { price: parsingPrice })
//                             .then(res => {
//                                 if (res.data?.clientSecret) {
//                                     setClientSecret(res.data.clientSecret)
//                                 }
//                             })
//                     }
//                 }
//             })
//     }, [axiosPublic, _id, axiosSecure])

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
//             card,
//             billing_details: {
//                 email: user.email,
//                 name: user.name
//             }
//         })
//         if (error) {
//             showToast(`${error}`, 'error')
//         }
//         else {
//             console.log("payment method", paymentMethod)
//         }
//         const { paymentIntent, error: confirmationError } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: card,
//                 billing_details: {
//                     email: user.email,
//                     name: user.displayName || "anonymous"
//                 }
//             }
//         })
//         if (confirmationError) {
//             console.log(confirmationError)
//         }
//         else {
//             if (!paidUserData) {
//                 if (paymentIntent.status === "succeeded") {
//                     console.log('payment success', paymentMethod.id);
//                     const paymentInfo = {
//                         email: user.email,
//                         price: totalMoney,
//                         transactionId: paymentMethod.id,
//                         role: "pro_user"
//                     }
//                     console.log(paymentInfo);
//                     axiosSecure.post('/paid_user_data', paymentInfo)
//                         .then(res => {
//                             console.log(res.data, "api hit");
//                             if (res.data.status === 200) {
//                                 console.log('line no. 172');
//                                 showToast('Subscription successful', 'success')
//                                 navigate(location.state ? location.state : "/")
//                             }
//                         })
//                 }
//                 else {
//                     console.log(error);
//                     showToast('Something happend', 'error')
//                 }
//             }
//             else {
//                 return showToast('This email is already exist', 'error')
//             }
//         }
//     };

//     const CARD_OPTIONS = {
//         iconStyle: 'solid',
//         style: {
//             base: {
//                 iconColor: '#c4f0ff',
//                 color: '#000',
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
//             <form className='w-full p-5 space-y-3 rounded-lg bg-black bg-opacity-5 shadow-lg shadow-slate-400 mx-auto' onSubmit={handlePayment}>
//                 <input className='bg-transparent' value={user?.email} type="email" />
//                 <p className=''>Total Money : {totalMoney}</p>
//                 <div className="FormRow">
//                     <CardElement
//                         options={CARD_OPTIONS}
//                     />
//                 </div>
//                 <div className='mx-auto w-1/2'>
//                     <button className='button-custom w-full' type="submit" disabled={!stripe || !clientSecret}>
//                         Pay
//                     </button>
//                 </div>
//             </form>

//         </div>
//     );
// };

// export default CheckOut;


import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import cardImg from '../../assets/images/card/card.jpg';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import UseAxios from '@/Hooks/UseAxios';
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import showToast from '@/components/Toast/toast';
import UsePaidUserData from '@/Hooks/UsePaidUserData';
import SectionTitle from '@/Shared/SectionTitle/SectionTitle';

const CheckOut = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState();
    const axiosSecure = UseAxios();
    const axiosPublic = UseAxiosPublic();
    const [totalMoney, setTotalMoney] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { _id } = useParams();
    const [paidUserData] = UsePaidUserData(user.email);

    useEffect(() => {
        axiosPublic.get(`/pricingCard/${_id}`)
            .then(res => {
                if (res.data) {
                    const productPrice = res.data?.price;
                    const splitPrice = productPrice.split('$');
                    const parsingPrice = parseFloat(splitPrice[1]);
                    if (parsingPrice) {
                        setTotalMoney(parsingPrice);
                        axiosSecure.post('/create_payment_intent', { price: parsingPrice })
                            .then(res => {
                                if (res.data?.clientSecret) {
                                    setClientSecret(res.data.clientSecret);
                                }
                            });
                    }
                }
            });
    }, [axiosPublic, _id, axiosSecure]);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
            billing_details: {
                email: user.email,
                name: user.name
            }
        });
        if (error) {
            showToast(`${error}`, 'error');
        } else {
            console.log("payment method", paymentMethod);
        }
        const { paymentIntent, error: confirmationError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email,
                    name: user.displayName || "anonymous"
                }
            }
        });
        if (confirmationError) {
            console.log(confirmationError);
        } else {
            if (!paidUserData) {
                if (paymentIntent.status === "succeeded") {
                    console.log('payment success', paymentMethod.id);
                    const paymentInfo = {
                        email: user.email,
                        price: totalMoney,
                        transactionId: paymentMethod.id,
                        role: "pro_user"
                    };
                    console.log(paymentInfo);
                    axiosSecure.post('/paid_user_data', paymentInfo)
                        .then(res => {
                            console.log(res, "api hit");
                            if (res.status === 200) {
                                console.log('line no. 172');
                                showToast('Subscription successful', 'success');
                                navigate(location.state ? location.state : "/");
                            }
                        });
                } else {
                    console.log(error);
                    showToast('Something happened', 'error');
                }
            } else {
                return showToast('This email is already exist', 'error');
            }
        }
    };

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#c4f0ff',
                color: '#000',
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
        <div className=" flex flex-col items-center justify-center">
            {/* Banner Section */}
            <div className="w-full text-black text-center rounded-md mb-8">
                <SectionTitle title={'checkout'}></SectionTitle>
                <p className="mt-2 text-lg">Secure your subscription by completing the payment below</p>
            </div>

            {/* Checkout Form Section */}
            <div className="flex flex-col md:flex-row items-center lg:w-3/4 w-full gap-10 md:p-5 bg-white rounded-xl md:shadow-lg">
                {/* Image Section */}
                <div className="w-full h-full md:w-1/2">
                    <img src={cardImg} alt="Card Image" className="w-full h-fit rounded-md" />
                </div>

                {/* Payment Form Section */}
                <form className="w-full md:w-1/2 md:bg-gray-50 py-5 md:p-5 rounded-md md:shadow-md" onSubmit={handlePayment}>
                    <h2 className="text-2xl font-semibold text-center mb-4">Payment Details</h2>
                    <div className="mb-4">
                        <input
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={user?.email}
                            type="email"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-medium text-gray-700">Total Amount: ${totalMoney}</p>
                    </div>
                    <div className="mb-4">
                        <CardElement options={CARD_OPTIONS} className="p-3 border border-gray-300 rounded-md bg-white" />
                    </div>
                    <button
                        className="w-full py-3 bg-[#2ab16e] text-white font-bold rounded-md shadow-md hover:bg-primary/90 transition duration-300"
                        type="submit"
                        disabled={!stripe || !clientSecret}
                    >
                        Pay ${totalMoney}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckOut;
