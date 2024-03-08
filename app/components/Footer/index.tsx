import React from "react";

export default function Footer() {
  return (
    <div className="bg-white p-4 text-center text-black shadow-2xl">
      <p>&copy; {new Date().getFullYear()} 我的网站. 保留所有权利.</p>
    </div>
  );
}
