import React from "react";
import { FaGolang } from "react-icons/fa6";

const Footer = () => (
  <footer className="bg-white py-6 mt-auto text-center text-gray-500 flex flex-col items-center gap-2">
    <div className="flex items-center gap-2 flex-wrap justify-center text-lg sm:text-xl md:text-2xl">
      <span>© {new Date().getFullYear()} Falcon. Made with ❤️ in </span>
      <FaGolang className="text-blue-500 w-8 h-8 md:w-10 md:h-10" />
      <span>.</span>
    </div>
  </footer>
);

export default Footer;
