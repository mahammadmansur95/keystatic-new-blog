import { reader } from "@/app/reader";
import React from "react";
import clsx from "clsx";
import Image from "next/image";

const ContentRenderer = ({
  data,
  className,
}: {
  data: any;
  className?: string;
}) => {
  if (!data) return null;

  return (
    <section className={clsx("space-y-4", className)}>
      <h2 className="md:text-4xl text-2xl !max-w-2xl mx-auto text-center font-bold text-white">{data.heading}</h2>

      {data.content?.map((block: any, index: number) => {
        if (block.discriminant === "p") {
          return (
            <p
              key={index}
              className={clsx(
                "",
                block.value?.className ? block.value.className : "text-[#F4F6F9] md:text-xl text-base font-light"
              )}
            >
              {block.value?.content}
            </p>
          );
        }

        return null;
      })}
    </section>
  );
};

const Aboutus = async () => {
  const data = await reader.singletons.aboutus.read();

  return (
    <div className="">
      {/* Top Hero Section with Gradient + Right-side Image */}
      <div className="relative text-center py-8 h-full w-full text-white font-semibold text-xl flex items-center justify-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(236.22deg,_#1D3D8D_1.39%,_#14244C_90.45%)]" />

        {/* Right-side background image */}
        <div className="absolute right-0 top-0 h-full w-1/2 z-10 opacity-40">
          <Image
            src="/images/about_us_bg.png"
            alt="about us bg image"
            fill
            className="object-cover object-right"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="relative z-20 md:text-4xl text-2xl font-bold">About Semiwave technologies</h1>
      </div>

      {/* Section with full background image */}
      <div className="relative w-full py-12 px-4 sm:px-6 md:px-0 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/aboutus_background.png"
            alt="about us content background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Optional overlay if text is hard to read */}
        <div className="absolute inset-0 bg-white/80 dark:bg-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-3xl text-center mx-auto">
          <ContentRenderer data={data} />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
