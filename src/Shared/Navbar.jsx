import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiSurveymonkey } from "react-icons/si";
import './Navbar.css';
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from '@/AuthProvider/AuthProvider';




const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const handleLink = () => {
        setOpen(!open)
    }
    const navLinks = [
        { name: 'Home', id: 1, path: '/' },
        { name: 'Surveys', id: 2, path: '/surveys' },
        { name: 'Pro', id: 3, path: '/pro' },
        { name: 'Dashboard', id: 4, path: '/dashboard' },
        { name: 'Practice', id: 5, path: '/practice' },
        // !user ? { name: 'Login', id: 6, path: '/login' } : {
        //     name: 'Logout', id: 7, path: '/logout'
        // }
    ]
    return (
        <nav className='flex justify-between items-center z-50 bg-black text-white px-5 py-2 w-full shadow-sm shadow-slate-900 fixed'>
            {/* bg-gradient-to-r from-[#DA2EA4] to-[#500386] */}
            <div className='flex justify-between flex-1 items-center'>
                <div className='md:hidden' onClick={() => setOpen(!open)}>
                    {open ? <RxCross2 className='text-2xl'></RxCross2> : <IoMenu className='text-2xl'></IoMenu>}
                </div>
                <div className='w-full flex justify-end items-center gap-1 text-2xl md:text-3xl font-bold'>
                    <SiSurveymonkey className='text-3xl md:text-5xl'></SiSurveymonkey><h2 className='gradient-text'>SurveyMonkey</h2>
                </div>

                {/* for mobile devices  */}

                <div className={`flex z-50 md:hidden md:flex-row flex-col justify-center md:justify-end gap-4 absolute md:static h-screen md:h-auto items-center p-5 w-full top-[47px] ${open ? 'left-0 z-10 duration-500 bg-black' : "-left-full duration-500 bg-black"}`}>
                    {
                        navLinks.map(link => <NavLink
                            key={link?.id}
                            onClick={handleLink}
                            to={link?.path}
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "px-6 py-2 rounded-lg bg-white bg-opacity-5 shadow-sm shadow-[#00ffff9d]" : "transparent"
                                // isPending ? "pending" : isActive ? "animate-spin" : ""
                            }
                            style={({ isActive, isPending }) =>
                            ({
                                color: isActive ? 'white' : '',
                                // backgroundColor: isActive ? "#4000ff #da1b60" : "",
                                padding: isActive ? "px-6" : "",
                                borderRadius: isActive ? "rounded-lg" : "",
                                fontWeight: 700
                            })
                            }
                        >
                            {link?.name}
                        </NavLink>

                        )
                    }
                    {!user ? <Link to='/login'><button>Login</button></Link> : <button onClick={logOut}>Logout</button>}
                </div >
            </div>

            {/* this isfor tablet,andupper devices  */}

            <div className={`flex-row justify-end hidden md:flex items-center p-5 w-full`}>
                {
                    navLinks.map(link => <NavLink
                        key={link?.id}
                        onClick={handleLink}
                        to={link?.path}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "rounded-lg px-4 py-2 bg-white bg-opacity-5 shadow-sm shadow-[#00ffff9d]" : "transparent px-4 py-2"
                            // isPending ? "pending" : isActive ? "animate-spin" : ""
                        }
                        style={({ isActive, isPending }) =>
                        ({
                            color: isActive ? 'white' : '',
                            // backgroundColor: isActive ? "#4000ff #da1b60" : "",
                            borderRadius: isActive ? "rounded-lg" : "",
                            fontWeight: 700
                        })
                        }
                    >
                        {link?.name}

                    </NavLink>)
                }
                {!user ? <Link to='/login'><button className='px-4 py-2 font-bold'>Login</button></Link> : <button className='px-4 py-2 font-bold' onClick={logOut}>Logout</button>}
            </div >
        </nav>
    );
};

export default Navbar;