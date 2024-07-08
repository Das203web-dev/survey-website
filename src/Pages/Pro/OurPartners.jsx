import { Link } from 'react-router-dom'
import partner1 from '../../assets/images/ourPartners/gizmo.png'
import partner2 from '../../assets/images/ourPartners/googleForm.png'
import partner3 from '../../assets/images/ourPartners/polish.png'
import partner4 from '../../assets/images/ourPartners/qualtrics.png'
import partner5 from '../../assets/images/ourPartners/questionpro.png'
import partner6 from '../../assets/images/ourPartners/SogoSurvey.png'
import partner7 from '../../assets/images/ourPartners/SurveyMonkey.png'
import partner8 from '../../assets/images/ourPartners/typeform.png'
import SectionTitle from '@/Shared/SectionTitle/SectionTitle'
const OurPartners = () => {
    const partnerImg = [partner1, partner2, partner3, partner4, partner5, partner6, partner7, partner8]
    return (
        <div className='text-center my-20'>
            <div className='space-y-5 text-center my-20'>
                <SectionTitle title={'Our Partners'}></SectionTitle>
                <p className="text-black text-lg">Discover the trusted partners who help us deliver exceptional survey solutions.</p>
            </div>

            <div className='grid md:grid-cols-4 grid-cols-2 gap-5 mt-10'>
                {
                    partnerImg.map((image, index) =>
                        <Link key={index} to={'#'}><img
                            className='w-full h-24 bg-white bg-opacity-5 shadow-md shadow-[#00ffff9d] hover:shadow-xl rounded-lg p-5'

                            src={image}
                            alt={`Partner ${index + 1}`}
                        /></Link>
                    )
                }
            </div>
        </div>

    );
};

export default OurPartners;