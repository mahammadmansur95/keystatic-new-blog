"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import clsx from "clsx";

const Services = ({ data }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const handleBeforeChange = (current: number, next: number) => {
    setActiveIndex(next);
  };

  const getCardClass = (index: number) => {
    return clsx(
      "mx-2 transition-all duration-500 ease-in-out rounded-xl shadow-lg relative h-full",
      index === activeIndex ? " !h-[400px] z-10" : " !h-[350px] z-0"
    );
  };

  return (
    <div className="relative w-full px-4 py-20 bg-[#0B1A36] text-white bg-[radial-gradient(44.27%_55.36%_at_47.19%_61.45%,_#1D3D8D_0%,_#14244C_100%)] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          priority
          src={data?.bg_img}
          alt="hero image"
          fill
          className="md:object-contain object-cover"
        />
      </div>

      <h3 className="text-3xl md:text-5xl font-bold mb-2 text-center">
        Innovative Services, Tailored for You
      </h3>
      <p className="text-base md:text-xl mb-10 text-[#81C4E8] text-center">
        We offer a range of specialized semiconductor and VLSI services to meet
        your business needs:
      </p>

      <div className="services-carousel relative max-w-7xl mx-auto">
        <div className="py-16">
          <Carousel
            ref={carouselRef}
            beforeChange={handleBeforeChange}
            dots={false}
            infinite
            speed={500}
            autoplay
            slidesToShow={3}
            slidesToScroll={1}
            centerMode
            centerPadding="0"
            draggable
            swipeToSlide
            touchThreshold={15}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 1,
                  centerMode: false,
                },
              },
            ]}
            className="md:h-[450px] h-[350px]"
          >
            {data?.services.map((service : any, index : any) => (
              <div key={service.title} className="px-2 h-full cursor-pointer">
                <div className={getCardClass(index)}>
                  <div className="w-full h-full">
                    <Image
                      fill
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white p-4 rounded-b-xl">
                    <h3 className={`${index === activeIndex ? "font-bold md:text-2xl text-base" : "md:text-xl text-lg font-normal"}`}>{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>

          <style jsx global>{`
            .services-carousel .slick-track {
              display: flex !important;
              align-items: center;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Services;
