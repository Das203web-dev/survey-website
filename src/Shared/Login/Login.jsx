import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import UserData from '@/Hooks/UserData';
import UseGoogleLogIn from '@/Hooks/UseGoogleLogIn';
import showToast from '@/components/Toast/toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UseSingleAdmin from '@/Hooks/UseSingleAdmin';
import UseSuperAdmin from '@/Hooks/UseSuperAdmin';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const handleGoogleLogin = UseGoogleLogIn();
    const [userInfos] = UserData();
    const location = useLocation();
    const navigate = useNavigate();
    const [admin] = UseSingleAdmin();
    const [isSuperAdmin] = UseSuperAdmin()

    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        signIn(email, password)
            .then(res => {
                const loggedInUserEmail = res.user?.email;
                const checkUser = userInfos.find(user => user.email === loggedInUserEmail);


                if (isSuperAdmin || admin) {
                    console.log(location, 'line 42');

                    showToast(`Welcome, ${res.user?.displayName}`, 'success');
                    navigate(location?.state ? location?.state : "/dashboard");
                } else {
                    console.log(checkUser, 'line 41');
                    showToast(`Welcome ${checkUser?.userName}`, 'success');
                    console.log(location);
                    navigate(location?.state ? location?.state : "/");


                }
            })
            .catch(error => {
                showToast(`${error.message}`, 'error');
            });
    };

    return (
        <div className="md:h-[80vh] flex justify-center items-center h-[800px] md:max-h-screen bg-gray-100 p-5">
            <div className='md:w-4/5 mx-auto flex-col md:flex-row flex justify-center items-center gap-5'>
                <div className="flex flex-col justify-center items-center md:items-start space-y-5 text-center md:text-left w-full md:w-1/2 p-5">
                    <h1 className="text-3xl md:text-5xl font-bold">POWERED BY CREATORS AROUND THE WORLD.</h1>
                    <p className="text-lg text-gray-600">LARGEST SURVEY SOURCE</p>
                    <p className="text-sm">Don't have an account? <Link to={'/registration'} className='text-[#238d5c] font-medium'>Create Account</Link></p>
                </div>
                <div className="md:w-1/2 w-full shadow-lg ">
                    <div className="bg-white bg-opacity-95 text-black p-5 mx-auto shadow-gray-300 shadow rounded-lg flex flex-col">
                        <h1 className="text-3xl my-5 text-black font-bold">Login to your account</h1>
                        <Form {...form} className='rounded-md'>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-md">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-black font-thin text-lg">Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-black font-thin text-lg">Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <button type="submit" className="button-custom w-full hover:bg-primary/90">
                                    Login
                                </button>
                            </form>

                            <div className='flex my-5 items-center gap-5'>
                                <div className='w-full bg-black h-[0.2px]'></div>
                                <p>Or</p>
                                <div className='w-full h-[0.2px] bg-black'></div>
                            </div>
                            <button onClick={handleGoogleLogin} className='flex w-full p-[10px] hover:bg-primary bg-primary/90 text-white rounded-md border border-black gap-2 items-center justify-center'>
                                <span>Log in with</span> <FaGoogle className='text-xl ' />
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;


// import React, { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FaGoogle } from 'react-icons/fa';
// import { AuthContext } from '@/AuthProvider/AuthProvider';
// import UserData from '@/Hooks/UserData';
// import UseGoogleLogIn from '@/Hooks/UseGoogleLogIn';
// import showToast from '@/components/Toast/toast';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import UseSingleAdmin from '@/Hooks/UseSingleAdmin';

// const Login = () => {
//     const { signIn, googleSignIn } = useContext(AuthContext);
//     const handleGoogleLogin = UseGoogleLogIn();
//     const [userInfos] = UserData();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [admin] = UseSingleAdmin(); // Assume this checks for 'Admin' role

//     const form = useForm({
//         defaultValues: {
//             email: "",
//             password: ""
//         },
//     });

//     console.log(admin ,'line 146');

//     const onSubmit = (data) => {
//         const email = data.email;
//         const password = data.password;
//         signIn(email, password)
//             .then(res => {
//                 const loggedInUserEmail = res.user?.email;

//                 // Check if the user is Super Admin
//                 const isSuperAdmin = userInfos.some(user => user.email === loggedInUserEmail && user.role === "Super Admin");
//                 console.log(isSuperAdmin);
//                 // Check if the user is Admin
//                 const isAdmin = userInfos.some(user => user.email === loggedInUserEmail && admin);

//                 if (isSuperAdmin) {
//                     showToast(`Welcome, Super Admin`, 'success');
//                     console.log(location, 'line 160');
//                     navigate("/dashboard"); // Direct to dashboard for Super Admin
//                 } else if (isAdmin) {
//                     showToast(`Welcome, Admin`, 'success');
//                     console.log(location, 'line 164')
//                     navigate("/dashboard"); // Direct to dashboard for Admin
//                 } else {
//                     showToast(`Welcome ${res.user.displayName}`, 'success');
//                     console.log(location, 'line 166');
//                     navigate(location?.state ? location.state : "/"); // Direct to the state or home for regular user
//                 }
//             })
//             .catch(error => {
//                 showToast(`${error.message}`, 'error');
//             });
//     };

//     return (
//         <div className="md:h-[80vh] flex justify-center items-center h-[800px] md:max-h-screen bg-gray-100 p-5">
//             <div className='md:w-4/5 mx-auto flex-col md:flex-row flex justify-center items-center gap-5'>
//                 <div className="flex flex-col justify-center items-center md:items-start space-y-5 text-center md:text-left w-full md:w-1/2 p-5">
//                     <h1 className="text-3xl md:text-5xl font-bold">POWERED BY CREATORS AROUND THE WORLD.</h1>
//                     <p className="text-lg text-gray-600">LARGEST SURVEY SOURCE</p>
//                     <p className="text-sm">Don't have an account? <Link to={'/registration'} className='text-[#238d5c] font-medium'>Create Account</Link></p>
//                 </div>
//                 <div className="md:w-1/2 w-full shadow-lg ">
//                     <div className="bg-white bg-opacity-95 text-black p-5 mx-auto shadow-gray-300 shadow rounded-lg flex flex-col">
//                         <h1 className="text-3xl my-5 text-black font-bold">Login to your account</h1>
//                         <Form {...form} className='rounded-md'>
//                             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-md">
//                                 <FormField
//                                     control={form.control}
//                                     name="email"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel className="text-black font-thin text-lg">Email</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter your email" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name="password"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel className="text-black font-thin text-lg">Password</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter your password" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <button type="submit" className="button-custom w-full hover:bg-primary/90">
//                                     Login
//                                 </button>
//                             </form>

//                             <div className='flex my-5 items-center gap-5'>
//                                 <div className='w-full bg-black h-[0.2px]'></div>
//                                 <p>Or</p>
//                                 <div className='w-full h-[0.2px] bg-black'></div>
//                             </div>
//                             <button onClick={handleGoogleLogin} className='flex w-full p-[10px] hover:bg-primary bg-primary/90 text-white rounded-md border border-black gap-2 items-center justify-center'>
//                                 <span>Log in with</span> <FaGoogle className='text-xl ' />
//                             </button>
//                         </Form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
