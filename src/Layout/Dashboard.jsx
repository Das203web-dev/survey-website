import { AuthContext } from '@/AuthProvider/AuthProvider';
import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
// import Footer from '@/Shared/Footer/Footer';
// import addSurveyIcon from '../assets/images/dashIcons/survey (1).png';
import { FaUsersGear } from "react-icons/fa6";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";





const Dashboard = () => {

    const { user } = useContext(AuthContext);
    console.log(user)

    const dashboardRoutes = [
        { name: "Add Survey", id: 1, path: "addSurvey", logo: <BiSolidAddToQueue className='text-2xl'></BiSolidAddToQueue> },
        { name: "Manage User", id: 2, path: "manageUser", logo: <FaUsersGear className='text-2xl'></FaUsersGear> },
        { name: "Manage Survey", id: 3, path: "manageSurvey", logo: <MdManageAccounts className='text-2xl'></MdManageAccounts> },
        // { name: "Pricing", id: 4, path: "pricing" },
    ];
    const navLinks = [
        { name: 'Home', id: 1, path: '/' },
        { name: 'Surveys', id: 2, path: '/surveys' },
        { name: 'Contact', id: 3, path: '/contact' },
        // { name: 'Login', id: 4, path: '/login' },
    ];

    // bg-[#1A1A1A] main bg
    // bg-[#282828] sun bg 
    return (
        <div>
            <div className='bg-black text-white pt-5'>
                <div className='py-5 grid md:grid-cols-12 gap-5 lg:w-3/4 w-full mx-auto lg:p-0 p-5'>
                    {/* <div className='py-5 grid grid-cols-4  md:grid-cols-12 gap-5 lg:w-3/4 w-full mx-auto lg:p-0 p-5'> */}
                    <div className='bg-white bg-opacity-5 shadow-slate-300 shadow-sm w-full md:col-span-3 col-span-1 p-2 lg:p-5 rounded-lg hidden md:block'>
                        <div className='md:flex flex-col md:flex-row mb-10 gap-3 w-fit'>
                            <div className='lg:p-5 p-2 bg-blue-600 bg-opacity-10 rounded-lg'>
                                {
                                    user?.photoURL ? <img src={user.photoURL
                                    } alt="User Photo" /> : <FaCircleUser className='text-4xl'></FaCircleUser>
                                }
                            </div>
                            <div className='text-wrap md:block'>
                                {
                                    user?.displayName ? <h1 className='font-bold text-lg md:text-lg'>{user?.displayName}</h1> : <h1 className='font-bold capitalize md:text-left text-[10px] p-1 md:p-0 md:text-base'>Shuvo jit</h1>

                                }
                                <h1 className='hidden md:block'>{user?.email}</h1>
                            </div >
                        </div>
                        <div className='h-[1px] w-full bg-white bg-opacity-30 my-10'></div>
                        <div className='md:flex md:flex-col gap-2 hidden'>
                            {
                                dashboardRoutes.map(route => <NavLink
                                    key={route.id}
                                    to={route.path}
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active bg-white bg-opacity-15 font-semibold p-2 rounded-lg text-yellow-300" : "p-2 rounded-lg"
                                    }
                                ><div className='flex gap-2 items-center flex-row-reverse md:justify-end justify-center'>
                                        <div className='hidden md:block'>
                                            {route.name}
                                        </div>
                                        {route.logo}
                                    </div>
                                </NavLink>)
                            }
                        </div>

                        {/* for mobile  */}

                        {/* <div className='h-[0.5px] w-full bg-white bg-opacity-30 my-5'></div> */}
                        {/* <div className='flex flex-col gap-2'>
                        {
                            navLinks.map(route => <NavLink
                                key={route.id}
                                to={route.path}
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active bg-white bg-opacity-15 font-semibold p-2 rounded-lg" : "p-2 rounded-lg"
                                }
                            >{route.name}
                            </NavLink>)
                        }
                    </div> */}
                    </div>

                    <div className='md:col-span-9 w-full col-span-3'>
                        <Outlet></Outlet>
                    </div>
                </div>
                {/* <Footer></Footer> */}
            </div>
            <div className='flex justify-center items-center w-full gap-2 fixed bottom-0 bg-black md:hidden'>
                <div className='lg:p-5 p-2 rounded-lg'>
                    {
                        user?.photoURL ? <img className='w-10 h-10 rounded-full' src={user.photoURL
                        } alt="User Photo" /> : <FaCircleUser className='text-xl text-white'></FaCircleUser>
                    }
                </div>
                {
                    dashboardRoutes.map(route => <NavLink
                        key={route.id}
                        to={route.path}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active font-semibold p-2 rounded-lg text-yellow-600" : "text-white p-2 rounded-lg"
                        }
                    ><div className='flex items-center p-2 gap-2 flex-col md:justify-end justify-center text-center'>
                            {/* <div className='text-[8px]'>
                                {route.name}
                            </div> */}
                            <div className='text-[6px]'>
                                {route.logo}
                            </div>
                        </div>
                    </NavLink>)
                }
            </div>
        </div>
    );
};

export default Dashboard;