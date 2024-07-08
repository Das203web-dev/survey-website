import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import Latest from './Latest/Latest';
import Work from './Work/Work';
import Testimonial from './Testimonial/Testimonial';
import Faq from './Faq/Faq';
import { Helmet } from 'react-helmet-async';
import Test from '@/components/Test/Test';
// import ParticleAnimation from 'react-particle-animation'


const Home = () => {

    return (
        <div>
            <Helmet>
                <title>SurveyMonkey | Home</title>
            </Helmet>

            <Banner></Banner>
            <div className=' p-5 md:p-0 w-full md:w-3/4 mx-auto rounded-lg'>
                {/* <Test></Test> */}
                <Featured></Featured>
                <Latest></Latest>
                <Work></Work>
                <Testimonial></Testimonial>
                <Faq></Faq>
            </div>
        </div>
    );
};

export default Home;