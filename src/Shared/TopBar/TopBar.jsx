import Marquee from "react-fast-marquee";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";



const TopBar = () => {
    return (
        <div className=" p-2 text-lg bg-black bg-opacity-95 shadow-2xl shadow-white pt-16 md:pt-[100px] text-white text-center">

            <Marquee className="p-2" speed={100} pauseOnHover={true}>
                <div className="flex flex-col md:flex-row justify-center items-center text-white font-semibold w-full md:gap-10 text-wrap">
                    <h1 className="flex items-center justify-between gap-2"><BsFillTelephoneOutboundFill className="rotate-12"></BsFillTelephoneOutboundFill> <span>Contact us : 01765768212</span></h1>
                    <h1 className="flex items-center  justify-between gap-2"><MdEmail></MdEmail><span>shuvajitdas838@gmail.com</span></h1>
                </div>
            </Marquee>

        </div>
    );
};

export default TopBar;