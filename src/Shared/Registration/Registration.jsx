// Import necessary libraries and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useContext } from "react";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAxiosPublic from "@/Hooks/UseAxiosPublic";
import showToast from "@/components/Toast/toast";

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

    const { createUser, updateUserProfile, updateUserPhoneNumber } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
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
        console.log(data.username); // Do something with the form data
        const email = data.email;
        const password = data.password;
        const username = data.username
        const phone = parseInt(data.phone)
        console.log(email, password, username, phone)
        console.log(typeof phone);
        createUser(email, password)
            .then(res => {
                updateUserProfile(username)
                    .then(() => {
                        console.log("user updated", res)
                        if (res.user) {
                            console.log(res.user);
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
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    };
    return (
        <div className="lg:w-2/3 mx-auto p-5 py-10">
            <div className=" bg-white bg-opacity-5 lg:w-1/2 p-5 mx-auto shadow-gray-300 shadow rounded-lg">
                <h1 className="text-3xl my-5 text-white text-center font-bold">Registration Form</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="gap-5 grid grid-cols-2">
                        {/* FormField for username */}
                        <FormField
                            control={form.control}
                            name="username"
                            onChange={(e) => {
                                form.onChange(e)
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-bold text-2xl">Username</FormLabel>
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
                                    <FormLabel className="text-white font-bold text-2xl">Email</FormLabel>
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
                                    <FormLabel className="text-white font-bold text-2xl">Password</FormLabel>
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
                                    <FormLabel className="text-white font-bold text-2xl">Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Submit button */}
                        <button type="submit" className="bg-blue-500 mt-10 col-span-2 text-white px-4 py-2 rounded w-full">
                            Register
                        </button>
                    </form>

                </Form>
                <h3 className="text-white mt-4">Already have an account Please <Link className="gradient-text font-bold" to={'/login'}>Login</Link></h3>
            </div>
        </div>
    );
};

export default Registration;
