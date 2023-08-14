import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import './ImageSlider.css'
import {Pagination , Navigation} from "swiper/modules"






const ImageSlider = ({images}) => {
  return (
    <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop = {true}
        spaceBetween={32}
        slidesPerView={3}
        >
        {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Slide ${index}`} />
            </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ImageSlider