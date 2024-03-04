import React from "react";
import { navs } from "./config";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center gap-40 h-20">
      <section className=""> BLOG-C </section>
      <section className="flex gap-40">
        {navs.map((nav) => {
          return (
            <Link className="flex justify-center items-center" href={nav?.path} key={nav?.name}>
              <div className="text-gray-900 hover:text-gray-600">
                {nav.name}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
