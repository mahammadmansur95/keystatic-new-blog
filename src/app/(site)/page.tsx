import { Col, Divider, Row } from "antd";
import { reader } from "../reader";
import Image from "next/image";
import WhoAreWe from "@/components/WhoAreWe";
import Services from "@/components/Services";

export default async function Home() {
  // const posts = await reader.collections.posts.all({
  //   resolveLinkedFiles: true,
  // });

  const homepage = await reader.singletons.homepage.read();
  // console.log("homepage", homepage);

  return (
    <>
      <div className="relative md:h-[95vh] h-[90vh] bg-[linear-gradient(236.22deg,_#1D3D8D_1.39%,_#14244C_90.45%)] overflow-hidden">
        {/* Background Image for Mobile */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="https://drive.google.com/uc?export=view&id=1PKcD2S1gM3oMLzZ0iwZI6E1hqYpgAlR9"
            alt="hero image"
            fill
            className="object-cover object-center"
          />
        </div>

        <Row className="relative z-10 h-full">
          <Col sm={24} md={24} lg={10} xl={10}>
            <div className="md:px-11 md:py-36 2xl:py-72 px-6 py-20 text-white h-full flex flex-col justify-center">
              <h1 className="mb-6 leading-snug md:leading-[120%] text-2xl md:text-[40px] md:max-w-[500px] font-bold max-[500px]:text-center">
                {homepage?.hero?.heading}
              </h1>
              <div className="w-[110px] h-[4px] bg-[#81C4E8] md:mb-6 mb-4 max-[500px]:mx-auto"></div>
              <h2 className="text-base md:text-[20px] font-normal leading-snug mb-8 max-w-[600px] max-[500px]:text-center">
                {homepage?.hero?.subheading}
              </h2>
              <div className="text-white px-4 py-3 bg-[#EE2C52] rounded-md text-[16px] font-normal w-fit cursor-pointer max-[500px]:mx-auto">
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
              className="object-contain"
            />
          </Col>
        </Row>
      </div>
      <WhoAreWe data={homepage?.who_we_are} />
      <Services data={homepage?.services}/>
    </>
  );
}
