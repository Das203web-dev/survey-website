
// import React, { useContext, useState, useEffect } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { IoMenu } from "react-icons/io5";
// import { RxCross2 } from "react-icons/rx";
// import { AuthContext } from '@/AuthProvider/AuthProvider';
// import logo from '../assets/images/logo.png';
// import { motion } from "framer-motion"
// import UseSuperAdmin from '@/Hooks/UseSuperAdmin';
// import { boolean } from 'zod';
// import UseAdmin from '@/Hooks/UseAdmin';
// import UseSingleAdmin from '@/Hooks/UseSingleAdmin';


// const Navbar = () => {
//     const { user, logOut } = useContext(AuthContext);
//     const [open, setOpen] = useState(false);
//     const [isScrolled, setIsScrolled] = useState(false);
//     const navigate = useNavigate()

//     const handleLink = () => {
//         setOpen(!open);
//     }

//     // console.log(user);
//     const [isSuperAdmin, refetch] = UseSuperAdmin();
//     // console.log(isSuperAdmin, 'line 24');
//     const [admin] = UseSingleAdmin();
//     // console.log(admin, 'line 28');

//     const navLinks = [
//         { name: 'Home', id: 1, path: '/' },
//         { name: 'Surveys', id: 2, path: '/surveys' },
//         { name: 'Pro', id: 3, path: '/pro' },
//     ];
//     if (isSuperAdmin || admin) {
//         // refetch()
//         navLinks.push({ name: 'Dashboard', id: 4, path: '/dashboard' })
//     }

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 50) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const variants = {
//         open: { opacity: 1, x: 0 },
//         closed: { opacity: 0, x: "-100%" },
//     }
//     const handleLogOut = () => {
//         return logOut()
//             .then(() => {
//                 navigate('/')
//             })

//     }

//     return (
//         <nav className={`flex justify-between items-center px-5 py-2 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'fixed top-0 bg-white shadow-md' : 'relative bg-white shadow-sm'}`}>
//             <div className='flex justify-between flex-1 md:flex-none items-center'>
//                 <div className='md:hidden' onClick={() => setOpen(!open)}>
//                     {open ? <RxCross2 className='text-2xl'></RxCross2> : <IoMenu className='text-2xl'></IoMenu>}
//                 </div>
//                 <div className='w-full h-14 flex justify-end items-center'>
//                     <img className='w-40' src={logo} alt="logo" />
//                 </div>

//                 {/* Mobile Menu */}
//                 <motion.div animate={open ? "open" : "closed"}
//                     variants={variants} className={`flex z-50 md:hidden flex-col justify-center md:justify-end gap-4 absolute md:static h-screen md:h-auto items-center p-5 w-full top-[70px] ${open ? 'left-0 duration-500 bg-white' : "-left-full duration-500 bg-white"}`}>
//                     {navLinks.map(link => (
//                         <NavLink
//                             key={link?.id}
//                             onClick={handleLink}
//                             to={link?.path}
//                             className={({ isActive }) => isActive ? "px-6 py-2 text-black border-b-2 border-b-black" : "transparent text-black"}
//                         >
//                             {link?.name}
//                         </NavLink>
//                     ))}
//                     {!user ? <Link to='/login'><button className='text-white'>Login</button></Link> : <button onClick={handleLogOut} className='text-white'>Logout</button>}
//                 </motion.div >
//             </div>

//             {/* Desktop Menu */}
//             <div className={`hidden md:flex flex-row justify-end items-center p-5 w-full text-md text-[#212121]`}>
//                 {navLinks.map(link => (
//                     <NavLink
//                         key={link?.id}
//                         onClick={handleLink}
//                         to={link?.path}
//                         className={({ isActive }) => isActive ? "px-4 py-2 border-b-2 border-b-black" : "transparent px-4 py-2"}
//                         style={{ fontWeight: 700 }}
//                     >
//                         {link?.name}
//                     </NavLink>
//                 ))}
//                 {!user ? <Link to='/login'><button className='px-4 py-2 font-bold'>Login</button></Link> : <button className='px-4 py-2 font-bold' onClick={handleLogOut}>Logout</button>}
//             </div >
//         </nav>
//     );
// };

// export default Navbar;


import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from '@/AuthProvider/AuthProvider';
import logo from '../assets/images/logo.png';
import { motion } from "framer-motion";
import UseSuperAdmin from '@/Hooks/UseSuperAdmin';
import UseSingleAdmin from '@/Hooks/UseSingleAdmin';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const handleLink = () => {
        setOpen(!open);
    }

    const [isSuperAdmin, refetchSuperAdmin] = UseSuperAdmin();
    const [admin, refetchAdmin] = UseSingleAdmin();

    const [navLinks, setNavLinks] = useState([
        { name: 'Home', id: 1, path: '/' },
        { name: 'Surveys', id: 2, path: '/surveys' },
        { name: 'Pro', id: 3, path: '/pro' },
    ]);

    useEffect(() => {
        const updatedNavLinks = [
            { name: 'Home', id: 1, path: '/' },
            { name: 'Surveys', id: 2, path: '/surveys' },
            { name: 'Pro', id: 3, path: '/pro' },
        ];

        if (isSuperAdmin || admin) {
            updatedNavLinks.push({ name: 'Dashboard', id: 4, path: '/dashboard' });
        }

        setNavLinks(updatedNavLinks);
    }, [isSuperAdmin, admin]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    }

    const handleLogOut = async () => {
        try {
            await logOut();
            // Refetch or reset role data
            // refetchSuperAdmin();
            // refetchAdmin();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <nav className={`flex justify-between items-center px-5 py-2 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'fixed top-0 bg-white shadow-md' : 'relative bg-white shadow-sm'}`}>
            <div className='flex justify-between flex-1 md:flex-none items-center'>
                <div className='md:hidden' onClick={() => setOpen(!open)}>
                    {open ? <RxCross2 className='text-2xl'></RxCross2> : <IoMenu className='text-2xl'></IoMenu>}
                </div>
                <div className='w-full h-14 flex justify-end items-center'>
                    <img className='w-40' src={logo} alt="logo" />
                </div>

                {/* Mobile Menu */}
                <motion.div animate={open ? "open" : "closed"}
                    variants={variants} className={`flex z-50 md:hidden flex-col justify-center md:justify-end gap-4 absolute md:static h-screen md:h-auto items-center p-5 w-full top-[70px] ${open ? 'left-0 duration-500 bg-white' : "-left-full duration-500 bg-white"}`}>
                    {navLinks.map(link => (
                        <NavLink
                            key={link?.id}
                            onClick={handleLink}
                            to={link?.path}
                            className={({ isActive }) => isActive ? "px-6 py-2 text-black border-b-2 border-b-black" : "transparent text-black"}
                        >
                            {link?.name}
                        </NavLink>
                    ))}
                    {!user ? <Link to='/login'><button className='text-white'>Login</button></Link> : <button onClick={handleLogOut} className='text-white'>Logout</button>}
                </motion.div >
            </div>

            {/* Desktop Menu */}
            <div className={`hidden md:flex flex-row justify-end items-center p-5 w-full text-md text-[#212121]`}>
                {navLinks.map(link => (
                    <NavLink
                        key={link?.id}
                        onClick={handleLink}
                        to={link?.path}
                        className={({ isActive }) => isActive ? "px-4 py-2 border-b-2 border-b-black" : "transparent px-4 py-2"}
                        style={{ fontWeight: 700 }}
                    >
                        {link?.name}
                    </NavLink>
                ))}
                {!user ? <Link to='/login'><button className='px-4 py-2 font-bold'>Login</button></Link> : <button className='px-4 py-2 font-bold' onClick={handleLogOut}>Logout</button>}
            </div >
        </nav>
    );
};

export default Navbar;
