import Marquee from "react-fast-marquee";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";



const TopBar = () => {
    return (
        <div className="text-lg text-center">

            <Marquee className="p-2" speed={60} pauseOnHover={true}>
                <div className="flex flex-col md:flex-row justify-center items-center font-medium w-full md:gap-10 text-wrap">
                    <h1 className="flex items-center justify-between gap-2"><BsFillTelephoneOutboundFill className="rotate-12"></BsFillTelephoneOutboundFill> <span>Contact us : 01765768212</span></h1>
                    <h1 className="flex items-center  justify-between gap-2"><MdEmail></MdEmail><span>shuvajitdas838@gmail.com</span></h1>
                </div>
            </Marquee>

        </div>
    );
};

export default TopBar;