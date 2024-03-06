"use client";

import React from "react";
import { navs } from "./config";
import Link from "next/link";
import { PTCButton } from "@/components/Ui";
import { useState } from "react";
import { LoginModal } from "@/components/LoginModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-center items-center gap-20 h-16 bg-white shadow-md p-4">
      <section className="text-2xl font-bold text-red-600"> LOGO </section>
      <section className="flex gap-60">
        <section className="flex gap-20 items-center">
          {navs.map((nav) => {
            return (
              <Link href={nav?.path} key={nav?.name}>
                <div className="text-blue-900 hover:text-yellow-600 cursor-pointer">
                  {nav.name}
                </div>
              </Link>
            );
          })}
        </section>
        <PTCButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          登陆
        </PTCButton>
      </section>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
