import React from 'react';
import { FaSuitcase } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerLinks = [
        { name: 'About Us', id: 1, path: "aboutUs" },
        { name: 'Contact Us', id: 2, path: "contactUs" },
        { name: ' Privacy Policy and Terms of Service', id: 3, path: "privacy&policy" },
        { name: 'Help Center', id: 4, path: "helpCenter" },
    ]
    return (
        <div className='text-slate-500 text-center px-5 h-fit  md:py-5 py-16'>
            {/* <h1 className='gradient-text text-3xl font-bold flex gap-2'><FaSuitcase className='text-white'></FaSuitcase> SurveyMonkey</h1> */}
            <div className='flex flex-col-reverse justify-center gap-5 font-semibold'>
                Copyright &copy; SurveyMonkey  <div className='flex md:flex-row space-y-2 flex-col items-center md:space-y-0 justify-center'>
                    {
                        footerLinks.map(link => <Link to={link.path} className='border-r-zinc-200 hover:text-white md:border-t-0 md:border-b-0 md:border border-none md:border-l-0 gap-5 px-2' key={link.id}>{link.name}</Link>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Footer;