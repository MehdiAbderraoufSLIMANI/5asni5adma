import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import './ImageSlider.css'
import {Pagination , Navigation} from "swiper/modules"
import { delay } from 'framer-motion';






const ImageSlider = ({images}) => {
 
  return (
    <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}  
        spaceBetween={32}
        slidesPerView={3}
        autoplay={{delay: 5000}}
         grabCursor={true}
        >
        {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={'http://127.0.0.1:8000'+image} alt={`Slide ${index}`} />
            </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ImageSlider