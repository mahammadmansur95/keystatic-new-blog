import Image from "next/image";
import React from "react";

const WhoAreWe = ({ data }: any) => {
  return (
    <div className="relative md:h-[90vh] bg-white py-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          priority
          src="https://drive.google.com/uc?export=view&id=1gI7u8o52182Xi1-hkHtdoXd6xYEuwDmf"
          alt="hero image"
          fill
          className="object-cover"
        />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-4">
        <div className="md:text-5xl text-2xl font-bold text-[#14244C] max-w-[600px] text-center">
          {data?.heading}
        </div>
        <div className="md:text-xl text-base font-normal text-[#14244C] max-w-[900px] text-center">
          {data?.subHeading}
        </div>
        <div className="text-white px-4 py-3 bg-[#EE2C52] rounded-md text-[16px] font-normal w-fit cursor-pointer">
          {data?.cta?.text}
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
