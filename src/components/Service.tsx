// app/services/[slug]/page.tsx

import { reader } from "@/app/reader";
import Markdoc from "@markdoc/markdoc";
import Image from "next/image";
import React from "react";
import { markdocConfig } from "../../keystatic.config";
import { notFound } from "next/navigation";

const Service = async ({ slug }: any) => {
  let serviceDetails;
  try {
    serviceDetails = await reader.collections.services.read(slug, {
      resolveLinkedFiles: true,
    });

    if (!serviceDetails) {
      notFound(); // Redirects to 404 page
    }
  } catch (error) {
    console.error("Error fetching service details:", error);
    notFound(); // Optional: also redirect on fetch error
  }

  const { node } = serviceDetails.content;
  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <>
      <section className="relative text-center py-8 h-full w-full text-white font-semibold text-xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(236.22deg,_#1D3D8D_1.39%,_#14244C_90.45%)]" />
        <div className="absolute right-0 top-0 h-full w-1/2 z-10 opacity-40">
          <Image
            src="/images/about_us_bg.png"
            alt="about us bg image"
            fill
            className="object-cover object-right"
            priority
          />
        </div>
        <h1 className="relative z-20 md:text-4xl text-2xl font-bold">
          Solutions We Provide
        </h1>
      </section>

      <div className="relative w-full h-[300px] md:h-[500px]">
        <Image
          src={serviceDetails?.image || ""}
          alt={serviceDetails?.title || ""}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <section className="bg-sky-50 py-10 px-4 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#14244C] mb-6">
            {serviceDetails?.title}
          </h2>

          <div className="prose text-xl text-[#14244C] font-normal prose-lg leading-relaxed space-y-6 max-w-none">
            {Markdoc.renderers.react(renderable, React)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
