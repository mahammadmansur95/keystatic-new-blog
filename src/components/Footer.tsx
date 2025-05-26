import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#81C4E8] px-6 py-10 md:px-14">
      <Row gutter={[16, 32]}>
        <Col xs={24} md={6}>
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/footer_logo.png"
              alt="brand logo"
              width={160}
              height={180}
            />
          </div>
        </Col>

        <Col xs={12} md={6}>
          <div className="mb-6">
            <div className="text-lg font-bold text-black">Company</div>
            <Link href="">
              <span className="block text-base font-normal text-black transition hover:underline w-fit hover:text-white cursor-pointer">
                About us
              </span>
            </Link>
            <Link href="">
              <span className="block text-base font-normal text-black transition hover:underline w-fit hover:text-white cursor-pointer">
                Blogs
              </span>
            </Link>
          </div>
          <div>
            <div className="text-lg font-bold text-black">Careers</div>
            <Link href="">
              <span className="block text-base font-normal text-black transition hover:underline w-fit hover:text-white cursor-pointer">
                Life at semiwave
              </span>
            </Link>
            <Link href="">
              <span className="block text-base font-normal text-black transition hover:underline w-fit hover:text-white cursor-pointer">
                Explore jobs
              </span>
            </Link>
          </div>
        </Col>

        <Col xs={12} md={6}>
          <div>
            <div className="text-lg font-bold text-black">Services</div>
            <Link href="">
              <span className="block text-base mb-1 font-normal text-black transition hover:underline w-fit hover:text-white cursor-pointer">
                RTL Engineering
              </span>
            </Link>
            <Link href="">
              <span className="block text-base mb-1 font-normal text-black transition hover:underline w-fit hover:text-white cursor-pointer">
                ASIC verification engineering
              </span>
            </Link>
            <Link href="">
              <span className="block text-base mb-1 font-normal text-black transition hover:underline w-fit hover:text-white cursor-pointer">
                Physical design and P&R
              </span>
            </Link>
            <Link href="">
              <span className="block text-base mb-1 font-normal text-black transition hover:underline w-fit hover:text-white cursor-pointer">
                Analog and mixed engineering
              </span>
            </Link>
          </div>
        </Col>

        <Col xs={24} md={6}>
          <div className="mb-6">
            <div className="text-lg font-bold text-black">Our Address</div>
            <div className="text-base font-normal text-black">
              Flat No: 102, Whisper Woods Apartments, Jubilee Enclave
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-black">Follow us</div>
            <div className="flex gap-4 mt-2 flex-wrap">
              {[
                { src: "/images/insta_gram_dark.png", alt: "insta", href: "" },
                { src: "/images/linkedin_dark.png", alt: "linkedin", href: "" },
                { src: "/images/x_dark.png", alt: "x", href: "" },
                { src: "/images/fb_dark.png", alt: "fb", href: "" },
              ].map((icon) => (
                <Link key={icon.alt} href={icon.href} target="_blank" rel="noopener noreferrer">
                  <Image src={icon.src} alt={icon.alt} width={40} height={40} />
                </Link>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
