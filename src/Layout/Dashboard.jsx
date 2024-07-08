// // import { AuthContext } from '@/AuthProvider/AuthProvider';
// // import { useContext } from 'react';
// // import { NavLink, Outlet } from 'react-router-dom';
// // import { FaArrowRightArrowLeft, FaCircleUser } from "react-icons/fa6";
// // import { FaUsersGear } from "react-icons/fa6";
// // import { BiSolidAddToQueue } from "react-icons/bi";
// // import { MdManageAccounts } from "react-icons/md";

// // const Dashboard = () => {

// //     const { user } = useContext(AuthContext);
// //     console.log(user)

// //     const dashboardRoutes = [
// //         { name: "Add Survey", id: 1, path: "addSurvey", logo: <BiSolidAddToQueue className='text-2xl'></BiSolidAddToQueue> },
// //         { name: "Manage User", id: 2, path: "manageUser", logo: <FaUsersGear className='text-2xl'></FaUsersGear> },
// //         { name: "Manage Survey", id: 3, path: "manageSurvey", logo: <MdManageAccounts className='text-2xl'></MdManageAccounts> },
// //     ];
// //     const navLinks = [
// //         { name: 'Home', id: 1, path: '/' },
// //         { name: 'Surveys', id: 2, path: '/surveys' },
// //         { name: 'Contact', id: 3, path: '/contact' },
// //     ];

// //     return (
// //         <div>
// //             <div className='text-black pt-5'>
// //                 <div className='py-5 grid md:grid-cols-12 gap-5 lg:w-3/4 w-full mx-auto lg:p-0 p-5'>
// //                     <div className='bg-white bg-opacity-5 shadow-slate-300 shadow-md w-full md:col-span-3 col-span-1 p-2 lg:p-5 rounded-lg hidden md:block'>
// //                         <div className='md:flex flex-col md:flex-row mb-10 gap-3 w-fit'>
// //                             <div className='lg:p-5 p-2 bg-blue-600 bg-opacity-10 rounded-lg'>
// //                                 {
// //                                     user?.photoURL ? <img src={user.photoURL
// //                                     } alt="User Photo" /> : <FaCircleUser className='text-4xl'></FaCircleUser>
// //                                 }
// //                             </div>
// //                             <div className='text-wrap md:block'>
// //                                 {
// //                                     user?.displayName ? <h1 className='font-bold text-lg md:text-lg'>{user?.displayName}</h1> : <h1 className='font-bold capitalize md:text-left text-[10px] p-1 md:p-0 md:text-base'>Shuvo jit</h1>

// //                                 }
// //                                 <h1 className='hidden md:block'>{user?.email}</h1>
// //                             </div >
// //                         </div>
// //                         <div className='h-[1px] w-full bg-white bg-opacity-30 my-10'></div>
// //                         <div className='md:flex md:flex-col gap-2 hidden'>
// //                             {
// //                                 dashboardRoutes.map(route => <NavLink
// //                                     key={route.id}
// //                                     to={route.path}
// //                                     className={({ isActive, isPending }) =>
// //                                         isPending ? "pending" : isActive ? "active bg-white bg-opacity-15 font-semibold p-2 rounded-lg text-[#238d5c]" : "p-2 rounded-lg"
// //                                     }
// //                                 ><div className='flex gap-2 items-center flex-row-reverse md:justify-end justify-center'>
// //                                         <div className='hidden md:block'>
// //                                             {route.name}
// //                                             <FaArrowRightArrowLeft className={`${isActive ? "block" : "hidden"}`}></FaArrowRightArrowLeft>
// //                                         </div>
// //                                         {route.logo}
// //                                     </div>
// //                                 </NavLink>)
// //                             }
// //                         </div>

// //                     </div>

// //                     <div className='md:col-span-9 w-full col-span-3'>
// //                         <Outlet></Outlet>
// //                     </div>
// //                 </div>
// //             </div>
// //             <div className='flex justify-center items-center w-full gap-2 fixed bottom-0 bg-black md:hidden'>
// //                 <div className='lg:p-5 p-2 rounded-lg'>
// //                     {
// //                         user?.photoURL ? <img className='w-10 h-10 rounded-full' src={user.photoURL
// //                         } alt="User Photo" /> : <FaCircleUser className='text-xl text-white'></FaCircleUser>
// //                     }
// //                 </div>
// //                 {
// //                     dashboardRoutes.map(route => <NavLink
// //                         key={route.id}
// //                         to={route.path}
// //                         className={({ isActive, isPending }) =>
// //                             isPending ? "pending" : isActive ? "active font-semibold p-2 rounded-lg text-yellow-600" : "text-white p-2 rounded-lg"
// //                         }
// //                     ><div className='flex items-center p-2 gap-2 flex-col md:justify-end justify-center text-center'>
// //                             <div className='text-[6px]'>
// //                                 {route.logo}
// //                             </div>
// //                         </div>
// //                     </NavLink>)
// //                 }
// //             </div>
// //         </div>
// //     );
// // };

// // export default Dashboard;

// import { AuthContext } from '@/AuthProvider/AuthProvider';
// import { useContext } from 'react';
// import { NavLink, Outlet } from 'react-router-dom';
// import { FaArrowRightArrowLeft, FaCircleUser } from "react-icons/fa6";
// import { FaUsersGear } from "react-icons/fa6";
// import { BiSolidAddToQueue } from "react-icons/bi";
// import { MdManageAccounts } from "react-icons/md";
// import { FaCheckCircle } from "react-icons/fa"; // Import the active icon
// import { GoArrowRight } from "react-icons/go";


// const Dashboard = () => {
//     const { user } = useContext(AuthContext);
//     console.log(user);

//     const dashboardRoutes = [
//         { name: "Add Survey", id: 1, path: "addSurvey", logo: <BiSolidAddToQueue className='text-2xl' /> },
//         { name: "Manage User", id: 2, path: "manageUser", logo: <FaUsersGear className='text-2xl' /> },
//         { name: "Manage Survey", id: 3, path: "manageSurvey", logo: <MdManageAccounts className='text-2xl' /> },
//     ];

//     const navLinks = [
//         { name: 'Home', id: 1, path: '/' },
//         { name: 'Surveys', id: 2, path: '/surveys' },
//         { name: 'Contact', id: 3, path: '/contact' },
//     ];

//     return (
//         <div>
//             <div className='text-black pt-5'>
//                 <div className='py-5 grid md:grid-cols-12 gap-5 lg:w-3/4 w-full mx-auto lg:p-0 p-5'>
//                     <div className='bg-white bg-opacity-5 shadow-slate-300 shadow-md w-full md:col-span-4 col-span-1 p-2 lg:p-5 rounded-lg hidden md:block'>
//                         <div className='md:flex flex-col md:flex-row mb-10 gap-3 w-fit'>
//                             <div className='lg:p-5 p-2 bg-blue-600 bg-opacity-10 rounded-lg'>
//                                 {user?.photoURL ? <img src={user.photoURL} alt="User Photo" /> : <FaCircleUser className='text-4xl' />}
//                             </div>
//                             <div className='text-wrap md:block'>
//                                 {user?.displayName ? (
//                                     <h1 className='font-bold text-lg md:text-lg'>{user.displayName}</h1>
//                                 ) : (
//                                     <h1 className='font-bold capitalize md:text-left text-[10px] p-1 md:p-0 md:text-base'>Shuvo Jit</h1>
//                                 )}
//                                 <h1 className='hidden md:block'>{user?.email}</h1>
//                             </div>
//                         </div>
//                         <div className='h-[1px] w-full bg-white bg-opacity-30 my-10'></div>
//                         <div className='md:flex md:flex-col gap-2 hidden'>
//                             {dashboardRoutes.map(route => (
//                                 <NavLink
//                                     key={route.id}
//                                     to={route.path}
//                                     className={({ isActive, isPending }) =>
//                                         isPending ? "pending" : isActive ? "active bg-white bg-opacity-15 p-2 rounded-lg text-[#238d5c]" : "p-2 rounded-lg"
//                                     }
//                                 >
//                                     {({ isActive }) => (
//                                         <div className='flex gap-2 items-center flex-row-reverse md:justify-end justify-center'>
//                                             <div className='hidden md:block'>
//                                                 <div className='flex items-center gap-2'>
//                                                     {route.name}
//                                                     {isActive && <GoArrowRight className='text-xl' />}
//                                                 </div>
//                                             </div>
//                                             {/* {route.logo} */}
//                                         </div>
//                                     )}
//                                 </NavLink>
//                             ))}
//                         </div>
//                     </div>

//                     <div className='md:col-span-8 w-full col-span-3'>
//                         <Outlet />
//                     </div>
//                 </div>
//             </div>
//             <div className='flex justify-center items-center w-full gap-2 fixed bottom-0 bg-white md:hidden'>
//                 <div className='lg:p-5 p-2 rounded-lg'>
//                     {user?.photoURL ? <img className='w-10 h-10 rounded-full' src={user.photoURL} alt="User Photo" /> : <FaCircleUser className='text-xl text-black' />}
//                 </div>
//                 {dashboardRoutes.map(route => (
//                     <NavLink
//                         key={route.id}
//                         to={route.path}
//                         className={({ isActive, isPending }) =>
//                             isPending ? "pending" : isActive ? "active font-semibold p-2 rounded-lg text-yellow-600" : " p-2 rounded-lg"
//                         }
//                     >
//                         {({ isActive }) => (
//                             <div className='flex items-center p-2 gap-2 flex-col md:justify-end justify-center text-center'>
//                                 <div className='text-[6px]'>
//                                     {route.logo}
//                                     {isActive && <FaCheckCircle className='text-[#238d5c] ml-2' />} {/* Add the active icon for the mobile view */}
//                                 </div>
//                             </div>
//                         )}
//                     </NavLink>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


// import { useContext, useEffect, useState } from 'react';
// import { NavLink, Outlet } from 'react-router-dom';
// import { FaUserCircle, FaPlus, FaUsersCog, FaClipboardList } from 'react-icons/fa';
// import { AuthContext } from '@/AuthProvider/AuthProvider';
// // import './Dashboard.css'; // Import your custom styles here

// const Dashboard = () => {
//     const { user } = useContext(AuthContext);
//     const [photo, setPhoto] = useState(null)
//     useEffect(() => {
//         if (user) {
//             const photoLink = user?.photoURL;
//             setPhoto(photoLink)
//             console.log(user.photoURL);
//         }
//     }, [user])
//     const dashboardRoutes = [
//         { name: "Add Survey", id: 1, path: "addSurvey", icon: <FaPlus /> },
//         { name: "Manage Users", id: 2, path: "manageUsers", icon: <FaUsersCog /> },
//         { name: "Manage Surveys", id: 3, path: "manageSurveys", icon: <FaClipboardList /> },
//     ];

//     return (
//         <div className="min-h-screen w-4/5 mx-auto flex flex-col gap-5 md:flex-row bg-gray-100">
//             {/* Sidebar */}
//             <aside className="w-full md:w-64 bg-white rounded-md shadow-lg">
//                 <div className="p-6 flex items-center justify-center bg-green-600">
//                     {user.photoURL ? (<img className='' src={photo} alt="user Photo" />) : (<FaUserCircle className="text-6xl text-white" />)}
//                 </div>
//                 <div className="text-center mt-2">
//                     <h2 className="text-xl font-semibold text-gray-800">{user?.displayName || "Username"}</h2>
//                     <p className="text-sm text-gray-600">{user?.email}</p>
//                 </div>
//                 <nav className="mt-10">
//                     {dashboardRoutes.map(route => (
//                         <NavLink
//                             key={route.id}
//                             to={route.path}
//                             className={({ isActive }) => isActive ? "activeNavLink" : "inactiveNavLink"}
//                         >
//                             <div className="flex items-center p-4">
//                                 <span className="mr-3">{route.icon}</span>
//                                 <span>{route.name}</span>
//                             </div>
//                         </NavLink>
//                     ))}
//                 </nav>
//             </aside>
//             {/* Main Content */}
//             <main className="flex-1 shadow-lg">
//                 <Outlet />
//             </main>
//         </div>
//     );
// };

// export default Dashboard;



import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaUserCircle, FaPlus, FaUsersCog, FaClipboardList } from 'react-icons/fa';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import { RxDashboard } from "react-icons/rx";
import { FaHome } from "react-icons/fa";



const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [openDashBoard, setOpenDashBoard] = useState(false);
    console.log(user);

    const dashboardRoutes = [
        { name: "Admin Home", id: 1, path: "adminHome", icon: <FaHome /> },
        { name: "Add Survey", id: 2, path: "addSurvey", icon: <FaPlus /> },
        { name: "Manage Users", id: 3, path: "manageUsers", icon: <FaUsersCog /> },
        { name: "Manage Surveys", id: 4, path: "manageSurveys", icon: <FaClipboardList /> },
    ];

    return (
        <div className="min-h-screen p-5 md:p-0 md:w-4/5 mx-auto flex flex-col gap-5 md:flex-row bg-gray-100">
            {/* Sidebar */}
            <div className={`flex items-center gap-2 md:hidden`} onClick={() => setOpenDashBoard(!openDashBoard)}>
                <RxDashboard></RxDashboard> <p>Admin Panel</p>
            </div>
            <aside className={`w-full md:w-64 bg-white rounded-md h-screen shadow-lg ${openDashBoard ? "block" : "hidden md:block"}`}>
                <div className="p-6 flex items-center justify-center bg-green-600 rounded-md">
                    {user ? (
                        <img
                            className='w-24 h-24 rounded-full object-cover' // Ensure the image is visible and styled correctly
                            src={user.photoURL}
                            alt="User Photo"
                            onError={(e) => {
                                // Handle image load error, fallback to a default image
                                e.target.src = '/defaultUser.png';
                            }}
                        />
                    ) : (
                        <FaUserCircle className="text-6xl text-white" />
                    )}
                </div>
                <div className="text-center mt-2">
                    <h2 className="text-xl font-semibold text-gray-800">{user?.displayName || "Username"}</h2>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <nav className="mt-10">
                    {dashboardRoutes.map(route => (
                        <NavLink
                            key={route.id}
                            to={route.path}
                            className={({ isActive }) => isActive ? "activeNavLink" : "inactiveNavLink"}
                            onClick={() => setOpenDashBoard(false)}
                        >
                            <div className="flex items-center p-4">
                                <span className="mr-3">{route.icon}</span>
                                <span>{route.name}</span>
                            </div>
                        </NavLink>
                    ))}
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 shadow-lg bg-white">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;

