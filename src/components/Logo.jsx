import { Link } from "@tanstack/react-router";
import logo from "@/assets/zinieva-logo.png";

export default function Logo({ className = "h-9" }) {
  return (
    <Link to="/" aria-label="ZINIEVA" className="inline-flex items-center">
      <img src={logo} alt="ZINIEVA" className={`${className} w-auto object-contain`} />
    </Link>
  );
}
