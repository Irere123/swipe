import React from "react";
import logo from "../../../assets/logo.png";

export default function Logo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={logo} alt="Logo" {...props} />;
}
