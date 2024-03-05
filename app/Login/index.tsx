import React from "react";

import request from "@/service/fetch";

export default function index() {
  request.get("/api/user").then((res) => {
    console.log(res);
  });
  return <div>index</div>;
}
