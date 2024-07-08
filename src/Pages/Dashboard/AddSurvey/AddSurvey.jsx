// import './AddSurvey.css'
// import { useForm } from 'react-hook-form';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
// import UseAxios from '@/Hooks/UseAxios';
// import { useContext } from 'react';
// import { AuthContext } from '@/AuthProvider/AuthProvider';
// import showToast from '@/components/Toast/toast';
// import SectionTitle from '@/Shared/SectionTitle/SectionTitle';
// const AddSurvey = () => {

//     const { user } = useContext(AuthContext)

//     const axiosSecure = UseAxios();

//     const form = useForm({
//         defaultValues: {
//             // username: "",
//             title: "",
//             description: "",
//             option: "",
//             category: ''
//         },
//     });

//     const onSubmit = (data) => {
//         console.log(data)
//         const title = data.title;
//         const description = data.description;
//         const longDescription = data.long_description;
//         const option = data.option;
//         const category = data.category;
//         console.log(title, description, option, category); // Do something with the form data
//         const surveyData = {
//             title: title,
//             description: description,
//             long_description: longDescription,
//             total_votes: 0,
//             category: category,
//             created_by: user.email,
//             participents: "",
//             like: 0,
//             dislike: 0
//         };
//         axiosSecure.post("/survey", surveyData)
//             .then(res => {
//                 if (res.data.insertedId) {
//                     showToast("data posted successfully", 'success')
//                 }
//             })


//     };
//     return (
//         <div className='bg-white rounded-lg h-screen shadow-md shadow-slate-300 w-full'>
//             {/* <h1 className="text-3xl font-semibold p-5 rounded-lg capitalize"></h1> */}
//             <SectionTitle title={'Add your survey here'}></SectionTitle>
//             <div className=" p-5 mx-auto rounded-lg">
//                 <h1 className="text-2xl mb-5 text-center font-bold">Survey Creation</h1>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//                         <div className='w-full grid md:grid-cols-2 grid-cols-1 gap-5'>
//                             <FormField
//                                 control={form.control}
//                                 name="title"
//                                 render={({ field }) => (
//                                     <FormItem className="w-full">
//                                         <FormLabel className=" font-light text-slate-700 text-md">Survey Title</FormLabel>
//                                         <FormControl>
//                                             <Input className="w-full" placeholder="Survey Title" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="description"

//                                 render={({ field }) => (
//                                     <FormItem className="w-full">
//                                         <FormLabel className=" font-light text-slate-700 text-md">Description</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Enter description" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="option"

//                                 render={({ field }) => (
//                                     <FormItem className="w-full">
//                                         <FormLabel className=" font-light text-slate-700 text-md">Options</FormLabel>
//                                         <FormControl>
//                                             <Select className='bg-slate-300' onValueChange={field.onChange} defaultValue={field.value}>
//                                                 <SelectTrigger className="">
//                                                     <SelectValue placeholder="Select a option" {...field} />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     <SelectGroup>
//                                                         <SelectItem value="yes">Yes</SelectItem>
//                                                         <SelectItem value="no">No</SelectItem>
//                                                     </SelectGroup>
//                                                 </SelectContent>
//                                             </Select>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="category"

//                                 render={({ field }) => (
//                                     <FormItem className="w-full">
//                                         <FormLabel className=" font-light text-slate-700 text-md">Category</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Enter category" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         {/* Submit button */}
//                         <div className='md:w-1/2 md:mx-auto  mt-10'>
//                             <button type="submit" className="button-custom hover:bg-primary/90 w-full">
//                                 Complete
//                             </button>
//                         </div>
//                     </form>
//                 </Form>
//             </div>
//         </div>
//     );
// };

// export default AddSurvey;


import './AddSurvey.css';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UseAxios from '@/Hooks/UseAxios';
import { useContext } from 'react';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import showToast from '@/components/Toast/toast';
import SectionTitle from '@/Shared/SectionTitle/SectionTitle';
import { FaListAlt, FaPencilAlt, FaCheckSquare, FaTag } from 'react-icons/fa'; // Import icons


const AddSurvey = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = UseAxios();

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            option: "",
            category: '',
            long_description: ""
        },
    });

    const onSubmit = (data) => {
        // console.log(data);
        const { title, description, long_description, option, category } = data;

        const surveyData = {
            title,
            description,
            long_description,
            total_votes: 0,
            category,
            created_by: user.email,
            participents: "",
            like: 0,
            dislike: 0
        };

        axiosSecure.post("/survey", surveyData)
            .then(res => {
                if (res.data.insertedId) {
                    showToast("Data posted successfully", 'success');
                    form.reset();


                }
            });
    };

    return (
        <div className="bg-white md:p-10 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg md:px-8 p-2 w-full max-w-4xl">
                <SectionTitle title="Add Your Survey Here" />
                <div className="md:p-5 p-2 mx-auto rounded-lg">
                    <h1 className="text-2xl mb-8 text-center font-bold text-black">Survey Creation</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className="flex items-center text-md font-light text-slate-700">
                                                <FaPencilAlt className="mr-2 text-xl text-green-600" /> Survey Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Survey Title" {...field} />
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
                                            <FormLabel className="flex items-center text-md font-light text-slate-700">
                                                <FaListAlt className="mr-2 text-xl text-green-600" /> Description
                                            </FormLabel>
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
                                            <FormLabel className="flex items-center text-md font-light text-slate-700">
                                                <FaCheckSquare className="mr-2 text-xl text-green-600" /> Options
                                            </FormLabel>
                                            <FormControl>
                                                <Select className="focus:outline-none" onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue className='placeholder:text-slate-500' placeholder="Select an option" {...field} />
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
                                            <FormLabel className="flex items-center text-md font-light text-slate-700">
                                                <FaTag className="mr-2 text-xl text-green-600" /> Category
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter category" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full mt-10">
                                <FormField
                                    control={form.control}
                                    name="long_description"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className="flex items-center text-md font-light text-slate-700">
                                                <FaPencilAlt className="mr-2 text-xl text-green-600" /> Long Description
                                            </FormLabel>
                                            <FormControl>
                                                <textarea
                                                    className="w-full bg-slate-200 h-24 p-2 border rounded-md focus:outline-none placeholder:text-sm placeholder:text-slate-500"
                                                    placeholder="Enter a detailed description"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Submit button */}
                            <div className="mt-10">
                                <button type="submit" className="w-full py-3 text-white font-semibold rounded-lg bg-green-600 hover:bg-primary/90 transition duration-200">
                                    Complete
                                </button>
                            </div>


                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddSurvey;
