import './AddSurvey.css'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import UseAxios from '@/Hooks/UseAxios';
import { useContext } from 'react';
import { AuthContext } from '@/AuthProvider/AuthProvider';
const AddSurvey = () => {

    const { user } = useContext(AuthContext)

    const axiosSecure = UseAxios();

    const form = useForm({
        // resolver: zodResolver(formSchema),
        defaultValues: {
            // username: "",
            title: "",
            description: "",
            option: "",
            category: ''
        },
    });
    // const timestamp = new Date();
    // const zone = { timeZone: "Asia/dhaka", hour12: false }
    // const date = timestamp.toLocaleDateString('en-BD', zone)
    // const time = timestamp.toLocaleTimeString('en-BD', zone)
    // console.log(timestamp)



    // _id65f85030269316720a51aeb8
    // title:"Music Preferences Survey"
    // description:"Share your favorite music genres."
    // long_description:"This survey aims to gather information about your music preferences. T…"
    // total_votes:85
    // category:"Music"
    // image:"music.jpg"
    // start_date:"2024-03-01"
    // end_date:"2024-03-31"
    // created_by:"Jane Smith"
    // participants:Array (2)
    // 0 Object:name:"Isabella Johnson"
    // email:"isabella@example.com"
    // 1 Object


    const onSubmit = (data) => {
        console.log(data)
        const title = data.title;
        const description = data.description;
        const longDescription = data.long_description;
        const option = data.option;
        const category = data.category;
        console.log(title, description, option, category); // Do something with the form data
        const surveyData = {
            title: title,
            description: description,
            long_description: longDescription,
            total_votes: 0,
            category: category,
            // start_date: "",
            // end_date: "",
            created_by: user.email,
            participents: "",
            like: 0,
            dislike: 0
        };
        axiosSecure.post("/survey", surveyData)
            .then(res => {
                if (res.data.insertedId) {
                    console.log("data posted successfull", res.data)
                }
            })


    };
    return (
        <div className='bg-[#282828] rounded-lg bg-opacity-10 w-full'>
            <h1 className="text-3xl font-semibold bg-white bg-opacity-5 p-5 rounded-lg capitalize">Add your survey here</h1>
            <div className=" bg-white bg-opacity-5 p-5 my-5 mx-auto shadow-gray-300 shadow rounded-lg">
                <h1 className="text-3xl my-5 text-white text-center font-bold">Survey Creation</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* FormField for email */}

                        <div className='w-full grid md:grid-cols-2 grid-cols-1 gap-5'>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-white font-bold text-2xl">Survey Title</FormLabel>
                                        <FormControl>
                                            <Input className="w-full" placeholder="Survey Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"

                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-white font-bold text-2xl">Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="option"

                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-white font-bold text-2xl">Options</FormLabel>
                                        <FormControl>
                                            <Select className='bg-white' onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select a option" {...field} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="yes">Yes</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"

                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-white font-bold text-2xl">Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter category" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="long_description"

                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-white font-bold text-2xl">Long Description</FormLabel>
                                        <FormControl>
                                            <Input Value={timestamp} placeholder="Enter category" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                            {/* <input className='text-black' defaultValue={timestamp} /> */}
                            {/* <p className=''>{date}  {time}</p> */}

                        </div>
                        {/* Submit button */}
                        <div className='md:w-1/2 md:mx-auto  mt-10'>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                                Complete
                            </button>
                        </div>
                    </form>
                    {/* <h3 className='text-white mt-4'>New here please <Link className=' font-bold gradient-text' to={'/registration'}>Register</Link></h3> */}
                </Form>
            </div>
        </div>
    );
};

export default AddSurvey;