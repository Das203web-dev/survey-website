import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useContext, useState } from "react";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAxiosPublic from "@/Hooks/UseAxiosPublic";
import showToast from "@/components/Toast/toast";
import { FaGoogle } from "react-icons/fa";
import UseGoogleLogIn from "@/Hooks/UseGoogleLogIn";

// Define the form schema using Zod
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Required"
    }),
    phone: z.string({
        message: "Required"
    }),
    email: z.string().email().min({
        message: "Required"
    }),
    password: z.string().min(1, {
        message: "Required"
    })

});



const Registration = () => {

    const { createUser, updateUserProfile, googleSignInPopup } = useContext(AuthContext);
    const handleGoogleLogin = UseGoogleLogIn();
    const [phoneNo, setPhoneNo] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const axiosPublic = UseAxiosPublic()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            phone: "",
            email: "",
            password: ""
        },
    });

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        const username = data.username;
        const phone = parseInt(data.phone);
        setPhoneNo(phone)
        createUser(email, password)
            .then(res => {
                updateUserProfile(username)
                    .then(() => {
                        // console.log("user updated", res)
                        if (res.user) {
                            // console.log(res.user);
                            showToast(`${res.user?.displayName}`, 'success')
                            const userInfo = {
                                userName: res.user.displayName,
                                email: res.user.email,
                                phone: phone
                            }
                            axiosPublic.post("userData", userInfo)
                                .then(res => {
                                    if (res.data) {
                                        navigate(location.state ? location?.state : "/")
                                    }
                                })
                        }
                    })
                    .catch((error) => {
                        showToast(`${error.message}`, 'error')
                    })
            })
            .catch(error => {
                showToast(`${error.message}`, 'error')
            })
    };

    return (
        <div className="md:h-[70vh] h-[950px] md:max-h-screen bg-gray-100 p-5 flex justify-center items-center">
            <div className="flex md:flex-row flex-col justify-between items-center gap-5 md:w-4/5 mx-auto">
                <div className="flex flex-col justify-center items-center md:items-start space-y-5 text-center md:text-left w-full md:w-1/2 p-5">
                    <h1 className="text-3xl md:text-5xl font-bold">POWERED BY CREATORS AROUND THE WORLD.</h1>
                    <p className="text-lg text-gray-600">LARGEST SURVEY SOURCE</p>
                    <p className="text-sm">Already have account ? Please <Link to={'/login'}
                        className='text-[#238d5c] font-medium'>Login</Link></p>
                </div>
                <div className="md:w-1/2 w-full md:py-10">
                    <div className=" bg-white w-full p-5 mx-auto shadow-gray-300 shadow rounded-lg">
                        <h1 className="text-3xl my-5 text-black font-bold">Registration Form</h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-5  grid grid-cols-1 md:grid-cols-2">
                                {/* FormField for username */}
                                <FormField
                                    control={form.control}
                                    name="username"
                                    onChange={(e) => {
                                        form.onChange(e)
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" font-thin text-lg">Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" font-thin text-lg">Email</FormLabel>
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
                                            <FormLabel className=" font-thin text-lg">Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" font-thin text-lg">Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your phone number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Submit button */}

                                <button type="submit" className="button-custom hover:bg-primary/90 w-full md:col-span-2">
                                    Register
                                </button>
                            </form>
                            <div className='flex my-5 items-center gap-5'>
                                <div className='w-full bg-black h-[0.2px]'></div>
                                <p>Or</p>
                                <div className='w-full h-[0.2px] bg-black'></div>
                            </div>
                            <button onClick={handleGoogleLogin} className='flex w-full p-[10px] hover:bg-primary bg-primary/90 text-white rounded-md border border-black gap-2 items-center justify-center'><span>Register with</span> <FaGoogle className='text-xl '></FaGoogle>
                            </button>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;




