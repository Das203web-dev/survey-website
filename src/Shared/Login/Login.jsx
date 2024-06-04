import { AuthContext } from '@/AuthProvider/AuthProvider';
import UserData from '@/Hooks/UserData';
import showToast from '@/components/Toast/toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    const { signIn } = useContext(AuthContext);
    // const [userInfos] = UserData();
    const [userInfos] = UserData()
    const location = useLocation();
    const navigate = useNavigate();

    const form = useForm({
        // resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });
    // console.log(userInfos, "line 26");
    const onSubmit = (data) => {
        console.log(data); // Do something with the form data
        const email = data.email;
        const password = data.password;
        signIn(email, password)
            .then(res => {
                const loggedInUser = res.user.email;
                const checkUser = userInfos.find(user => user.email === loggedInUser);
                console.log(checkUser, 'line 35');
                if (checkUser) {
                    showToast(`Welcome ${checkUser.userName}`, 'success')
                    navigate(location?.state ? location.state : "/")
                }

            })
            .catch(error => {
                console.log(error.message)
                showToast(`${error.message}`, 'error')
            })
    };

    return (
        <div className="lg:w-1/2 mx-auto p-5 py-10">
            <div className=" bg-white bg-opacity-5 lg:w-1/2 p-5 mx-auto shadow-gray-300 shadow rounded-lg">
                <h1 className="text-3xl my-5 text-white text-center font-bold">Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* FormField for email */}

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
                        {/* Submit button */}
                        <button type="submit" className="bg-blue-500 mt-10 text-white px-4 py-2 rounded w-full">
                            Login
                        </button>
                    </form>
                    <h3 className='text-white mt-4'>New here please <Link className=' font-bold gradient-text' to={'/registration'}>Register</Link></h3>
                </Form>
            </div>
        </div>
    );
};

export default Login;