import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitle from "../../components/SectionTitle";



const testimonials = [
    {
        id: 1,
        name: "Sophia Miller",
        quote: "This platform helped me earn my first online income! Highly recommended for beginners.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5CPz89vwuDB4H5EsXhkpKz0_koS-0HK0Yg&s",
    },
    {
        id: 2,
        name: "Liam Johnson",
        quote: "Fast tasks, quick payouts. Very smooth experience as a worker and a buyer!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5CPz89vwuDB4H5EsXhkpKz0_koS-0HK0Yg&s",
    },
    {
        id: 3,
        name: "Olivia Brown",
        quote: "Great support and easy-to-use interface. Perfect for extra earnings!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5CPz89vwuDB4H5EsXhkpKz0_koS-0HK0Yg&s",
    },
];

const Testimonials = () => {
    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <SectionTitle title='What Our Users Say' />
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    className="max-w-2xl mx-auto"
                    
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className=" p-6 flex flex-col items-center border-2 py-16 rounded-2xl border-primary-color ">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-20 h-20 rounded-full object-cover mb-4"
                                />
                                <h3 className="text-xl font-semibold text-secondary-color">{testimonial.name}</h3>
                                <p className="text-secondary-text mt-3">{testimonial.quote}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
