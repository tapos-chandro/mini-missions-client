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
    <section className="py-14 bg-gradient-to-tr from-white via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <SectionTitle title="What Our Users Say" />
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="max-w-3xl mx-auto mt-8"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white/40 backdrop-blur-lg border border-primary-color/20 shadow-xl p-8 rounded-3xl text-center transition-all duration-300 hover:shadow-2xl">
                <div className="w-24 h-24 mx-auto mb-4 border-4 border-primary-color/40 rounded-full overflow-hidden shadow-md">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-gray-600 mt-3 text-sm">{testimonial.quote}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
