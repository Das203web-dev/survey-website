import SectionTitle from '../../../../Shared/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import client1Img from '../../../../assets/images/clientImage/client1.jpg'
import client1Img2 from '../../../../assets/images/clientImage/client2.jpg'
import client1Img3 from '../../../../assets/images/clientImage/client3.avif'
import client1Im4 from '../../../../assets/images/clientImage/client4.jpg'
import client1Img5 from '../../../../assets/images/clientImage/client5.avif'

const Testimonial = () => {
    const testimonials = [
        {
            name: "John Doe",
            title: "Marketing Manager, XYZ Corp",
            testimonial: "Using [Your Platform], we were able to gather valuable insights from our audience quickly and efficiently. The user-friendly interface and robust analytics features made survey creation a breeze. Highly recommended!",
            avatar: client1Img
        },
        {
            name: "Jane Smith",
            title: "Educator, ABC School",
            testimonial: "As a teacher, I rely on [Your Platform] to engage my students and gather feedback on class activities. The platform's versatility and ease of use have transformed the way I conduct assessments and measure student satisfaction.",
            avatar: client1Img2
        },
        {
            name: "David Lee",
            title: "Small Business Owner",
            testimonial: "Thanks to [Your Platform], I was able to launch surveys and polls to understand my customers' preferences better. The actionable insights provided by the platform have helped me make informed decisions and improve my products/services.",
            avatar: client1Img3
        },
        {
            name: "David Lee",
            title: "Small Business Owner",
            testimonial: "Thanks to [Your Platform], I was able to launch surveys and polls to understand my customers' preferences better. The actionable insights provided by the platform have helped me make informed decisions and improve my products/services.",
            avatar: client1Im4
        },
        {
            name: "David Lee",
            title: "Small Business Owner",
            testimonial: "Thanks to [Your Platform], I was able to launch surveys and polls to understand my customers' preferences better. The actionable insights provided by the platform have helped me make informed decisions and improve my products/services.",
            avatar: client1Img5
        },
    ];
    return (
        <div className='mb-20'>
            <SectionTitle title={'Testimonial section'}></SectionTitle>
            <section>
                <div className="mx-auto">
                    <h2 className="text-2xl font-medium text-center mb-8">What Our Users Say</h2>
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 60,
                            depth: 300,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 40,
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 50,
                            },
                            // when window width is >= 1024px

                        }}
                        modules={[EffectCoverflow, Autoplay]}
                        className="mySwiper"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto">
                                    <div className="flex items-center justify-center mb-4">
                                        {/* Avatar Image */}
                                        <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-center mb-2">{testimonial.name}</h3>
                                    <p className="text-gray-800 text-center mb-4">{testimonial.title}</p>
                                    <p className=" leading-relaxed text-sm tracking-wide font-thin text-center">{testimonial.testimonial}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section >
        </div >

    );
};

export default Testimonial;