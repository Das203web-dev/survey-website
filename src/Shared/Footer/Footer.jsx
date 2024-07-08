import React from 'react';
import { FaFacebook, FaInstagram, FaSuitcase, FaTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerLinks = [
        { name: 'About Us', id: 1, path: "aboutUs" },
        { name: 'Contact Us', id: 2, path: "contactUs" },
        { name: ' Privacy Policy and Terms of Service', id: 3, path: "privacy&policy" },
        { name: 'Help Center', id: 4, path: "helpCenter" },
    ]
    return (
        <div className='text-slate-400 bg-slate-950 text-center px-5 h-fit mt-10 py-10 relative'>
            {/* <h1 className='gradient-text text-3xl font-bold flex gap-2'><FaSuitcase className='text-white'></FaSuitcase> SurveyMonkey</h1> */}
            <div className='flex flex-col justify-center gap-5 font-semibold space-y-5'>
                <div className='flex md:flex-row space-y-2 flex-col items-center md:space-y-0 justify-center'>
                    {
                        footerLinks.map(link => <Link to={link.path} className='border-r-zinc-200 hover:text-white md:border-t-0 md:border-b-0 md:border border-none md:border-l-0 gap-5 px-2' key={link.id}>{link.name}</Link>)
                    }
                </div>
                <div className='flex text-slate-400 justify-center text-2xl hover:text-white items-center gap-5'>
                    <FaFacebook></FaFacebook>
                    <FaInstagram></FaInstagram>
                    <FaTwitter></FaTwitter>
                </div>
                <p>Copyright &copy; SurveyMonkey</p>

            </div>

        </div>
    );
};

export default Footer;