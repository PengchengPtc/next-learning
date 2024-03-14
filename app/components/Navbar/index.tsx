"use client";

import React from "react";
import { navs } from "./config";
import Link from "next/link";
import { PTCButton } from "@/components/Ui";
import { useState } from "react";
import { LoginModal } from "@/components/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, Dropdown, Menu, MenuProps } from "antd";
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import LoginOutlined from "@ant-design/icons/LoginOutlined";
import request from "@/service/fetch";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>(navs[0].name);

  const { user, setUser } = useAuth();

  const handleGotoPersonalPage = () => {
    console.log("点击进入主页");
  };
  const handleLogout = () => {
    // 发退出请求
    request.post("/api/user/logout").then((res: any) => {
      console.log(res);
      setUser(null);
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "个人主页",
      icon: <HomeOutlined />,
      onClick: handleGotoPersonalPage,
    },
    {
      key: "2",
      label: "退出",
      icon: <LoginOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex justify-center items-center gap-20 h-16 bg-white shadow-md p-4">
      <div className="text-2xl font-bold text-red-600"> LOGO </div>
      <div className="flex gap-60">
        <div className="flex gap-20 items-center">
          {navs.map((nav) => {
            return (
              <Link href={nav?.path} key={nav?.name}>
                <div
                  className={`text-blue-900 hover:text-yellow-600 cursor-pointer ${
                    activeNav === nav.name ? "text-yellow-600" : ""
                  }`}
                  // Set active nav onClick
                  onClick={() => setActiveNav(nav.name)}
                >
                  {nav.name}
                </div>
              </Link>
            );
          })}
        </div>
        <section>
          {user?.id ? (
            <>
              <Dropdown menu={{ items }} placement="bottomLeft">
                <div>
                  <Avatar src={user.avatar} size={50} />
                </div>
              </Dropdown>
            </>
          ) : (
            <PTCButton
              onClick={() => {
                setIsOpen(true);
              }}
            >
              登陆/注册
            </PTCButton>
          )}
        </section>
      </div>

      {isOpen && <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
