"use client";

import React from "react";
import { navs } from "./config";
import Link from "next/link";
import { PTCButton } from "@/components/Ui";
import { useState } from "react";
import { LoginModal } from "@/components/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, Dropdown, Menu } from "antd";
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import LoginOutlined from "@ant-design/icons/LoginOutlined";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Add state to track the active nav
  const [activeNav, setActiveNav] = useState<string>(navs[0].name);

  const { user } = useAuth();
  console.log(user);

  const handleGotoPersonalPage = () => {
    console.log("点击进入主页");
  };
  const handleLogout = () => {
    // request.post('/api/user/logout').then((res: any) => {
    //   if (res?.code === 0) {
    //     store.user.setUserInfo({});
    //   }
    // });
    console.log("点击了退出登录");
  };

  const renderDropDownMenu = () => {
    return (
      <Menu>
        <Menu.Item onClick={handleGotoPersonalPage}>
          <HomeOutlined />
          &nbsp; 个人主页
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>
          <LoginOutlined />
          &nbsp; 退出系统
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <div className="flex justify-center items-center gap-20 h-16 bg-white shadow-md p-4">
      <section className="text-2xl font-bold text-red-600"> LOGO </section>
      <section className="flex gap-60">
        <section className="flex gap-20 items-center">
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
        </section>
        {user?.userId ? (
          <>
            <Dropdown menu={renderDropDownMenu()} placement="bottomLeft">
              <Avatar src={user.avatar} size={32} />
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
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
