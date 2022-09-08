import { JSX } from "solid-js";
import logo from "../../../assets/logo.png";

export default function Logo(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={logo} alt="Logo" {...props} />;
}
