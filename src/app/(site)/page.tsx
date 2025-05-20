import { Col, Divider, Row } from "antd";
import { reader } from "../reader";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  // const posts = await reader.collections.posts.all({
  //   resolveLinkedFiles: true,
  // });

  const homepage = await reader.singletons.homepage.read();
  console.log("homepage", homepage);

  return (
    <div className="relative h-[95vh] bg-[linear-gradient(236.22deg,_#1D3D8D_1.39%,_#14244C_90.45%)] overflow-hidden">
      {/* Background Image for Mobile */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="https://drive.google.com/uc?export=view&id=1PKcD2S1gM3oMLzZ0iwZI6E1hqYpgAlR9"
          alt="hero image"
          fill
          className="object-cover opacity-30"
        />
      </div>

      <Row className="relative z-10 h-full">
        <Col sm={24} md={24} lg={10} xl={10}>
          <div className="md:px-11 md:py-32 2xl:py-10 px-6 py-20 text-white h-full flex flex-col justify-center">
            <h1 className="mb-6 leading-snug md:leading-[120%] text-2xl md:text-[40px] md:max-w-[500px] font-bold">
              {homepage?.hero?.heading}
            </h1>
            <div className="w-[110px] h-[4px] bg-[#81C4E8] mb-6"></div>
            <h2 className="text-base md:text-[20px] font-normal leading-snug mb-8 max-w-[600px]">
              {homepage?.hero?.subheading}
            </h2>
            <div className="text-white px-4 py-3 bg-[#EE2C52] rounded-md text-[16px] font-normal w-fit">
              Explore more
            </div>
          </div>
        </Col>

        {/* Desktop Side Image */}
        <Col
          sm={24}
          md={24}
          lg={14}
          xl={14}
          className="hidden lg:block relative"
        >
          <Image
            src="https://drive.google.com/uc?export=view&id=1PKcD2S1gM3oMLzZ0iwZI6E1hqYpgAlR9"
            alt="hero image"
            fill
            className="object-cover"
          />
        </Col>
      </Row>
    </div>
  );
}
