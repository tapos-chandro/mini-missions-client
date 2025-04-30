import { Swiper, SwiperSlide } from "swiper/react";
import { Typewriter } from 'react-simple-typewriter'
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {

    
    
    

  const banners = [
    {
      id: 1,
      image: "https://i.ibb.co.com/bjjdMjxL/banner-1.png",
      title: "Complete Tasks, Earn Rewards",
      description:
        " Simplify your workflow by outsourcing small yet essential tasks to a global community of skilled workers. Whether you need quick data entry, content creation, research, or digital marketing support",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/HfSn5NF1/banner-2.png",
      title: "Get Your Tasks Done Fast",
      description:
        "Gain full control over the platform with our intuitive and powerful administrative tools. Manage users, oversee task postings, verify submissions, and handle secure payouts with ease. Our system is designed to scale with your growth",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/hpGrvv5/banner-3.png",
      title: "Powerful Management at Your Fingertips",
      description:
        "Our platform empowers you to effortlessly manage every aspect of your micro-tasking business — from user registrations and task submissions to secure payouts and performance monitoring.",
    },
  ];
  


  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5500,
        disableOnInteraction: false,
      }}

      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner?.id} className="relative mb-5">
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full object-cover lg:h-[650px] md:h-[450px] h-[300px] "
          />
          <div className=" absolute top-0 h-full flex justify-center flex-col items-center w-full p-5 bg-[#000000a5] ">
            <div className="max-w-4xl text-center space-y-2 ">
              <h2 className="lg:text-6xl font-bold text-xl text-primary-text  ">
               
                <Typewriter words={[banner.title]} loop={true} cursor />
              </h2>
              <p className=" lg:text-xl text-sm text-secondary-text">
                {banner.description}
              </p>
              <button className="btn rounded-full px-6 bg-primary-color border-none text-primary-text">See More</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;