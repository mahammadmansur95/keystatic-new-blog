"use client";

import {
  DownOutlined,
  UpOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Col, Drawer, Dropdown, Menu, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ContactUsModal from "./ContactUs";

const Header = ({ data }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDropdownToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#14244C] px-8 py-3 shadow-md">
      <Row align="middle" justify="space-between" wrap={false}>
        {/* Logo */}
        <Col>
          <Link href={"/"}>
            <div className="relative w-[150px] h-[40px]">
              <Image src="/images/logo-website.png" alt="logo" fill />
            </div>
          </Link>
        </Col>

        {/* Desktop Menu */}
        <Col flex="auto" className="hidden md:block">
          <Row justify="center" gutter={[40, 20]} wrap={false}>
            {data?.menuItems?.map((item: any, index: number) => {
              const hasSubMenu = item?.subMenu?.length > 0;

              if (hasSubMenu) {
                const menu = (
                  <Menu className="bg-[linear-gradient(236.22deg,_#1D3D8D_1.39%,_#14244C_90.45%)] !px-2 !py-3">
                    {item.subMenu.map((sub: any, subIndex: number) => (
                      <Menu.Item key={subIndex}>
                        <Link
                          href={sub.link}
                          className="!text-white text-[16px]"
                          prefetch
                        >
                          {sub.label}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu>
                );

                return (
                  <Col key={index}>
                    <Dropdown
                      overlay={menu}
                      trigger={["hover"]}
                      onOpenChange={(visible) =>
                        setOpenIndex(visible ? index : null)
                      }
                    >
                      <div className="text-white text-[18px] cursor-pointer hover:text-[#81C4E8] transition flex items-center gap-1">
                        {item.label}
                        {openIndex === index ? (
                          <UpOutlined />
                        ) : (
                          <DownOutlined />
                        )}
                      </div>
                    </Dropdown>
                  </Col>
                );
              }

              return (
                <Col key={index}>
                  <Link href={item.link}>
                    <div className="text-white text-[18px] cursor-pointer hover:text-[#81C4E8] transition">
                      {item.label}
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Col>

        {/* Desktop Contact */}
        <Col className="hidden md:block">
          <Button
            type="primary"
            className="!bg-[#81C4E8] !text-black !py-5"
            onClick={showModal}
          >
            Contact us
          </Button>
        </Col>

        {/* Mobile Burger / Close */}
        <Col className="md:hidden">
          {drawerVisible ? (
            <CloseOutlined
              className="text-white text-xl"
              onClick={() => setDrawerVisible(false)}
            />
          ) : (
            <MenuOutlined
              className="text-white text-xl"
              onClick={() => setDrawerVisible(true)}
            />
          )}
        </Col>
      </Row>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        closable={true}
        closeIcon={<CloseOutlined className="text-white text-xl" />}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="!bg-[#14244C]"
      >
        <div className="flex flex-col gap-4">
          {data?.menuItems?.map((item: any, index: number) => {
            const hasSubMenu = item?.subMenu?.length > 0;

            if (hasSubMenu) {
              return (
                <div key={index}>
                  <div
                    onClick={() => handleDropdownToggle(index)}
                    className="flex justify-between items-center text-white text-lg cursor-pointer"
                  >
                    <span>{item.label}</span>
                    {openIndex === index ? <UpOutlined /> : <DownOutlined />}
                  </div>
                  {openIndex === index && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {item.subMenu.map((sub: any, subIndex: number) => (
                        <Link
                          key={subIndex}
                          href={sub.link}
                          className="text-white text-base"
                          onClick={() => setDrawerVisible(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={item.link}
                className="text-white text-lg"
                onClick={() => setDrawerVisible(false)}
              >
                {item.label}
              </Link>
            );
          })}

          <Button
            type="primary"
            className="!bg-[#81C4E8] !text-black mt-4"
            onClick={() => {
              setDrawerVisible(false);
              showModal();
            }}
          >
            Contact us
          </Button>
        </div>
      </Drawer>
      <ContactUsModal visible={open} onClose={handleCancel} />
    </div>
  );
};

export default Header;
