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
    <div className="flex justify-center items-center gap-40 h-20">
      <section className=""> PTC-C </section>
      <section className="flex gap-40">
        {navs.map((nav) => {
          return (
            <Link
              className="flex justify-center items-center"
              href={nav?.path}
              key={nav?.name}
            >
              <div className="text-gray-900 hover:text-gray-600">
                {nav.name}
              </div>
            </Link>
          );
        })}
        <PTCButton
          onClick={() => {
            console.log("click, open modal");
            setIsOpen(true);
          }}
        >
          登陆
        </PTCButton>
        <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </section>
    </div>
  );
}
