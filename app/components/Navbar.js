// components/Navbar.js
"use client";

import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-teal-800 text-gray-100 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide text-teal-400">
          Quiz<span className="text-gray-100">Game</span>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div
          className="sm:hidden text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>

        {/* Navigation Links */}
        <ul
          className={`sm:flex space-x-6 absolute sm:static  w-full sm:w-auto left-0 top-full sm:top-auto transform ${
            isOpen ? "block" : "hidden"
          } sm:flex-row flex-col sm:space-y-0 space-y-4 sm:items-center text-center sm:text-left`}
        >
          <li className="hover:text-teal-400 cursor-pointer transition-colors duration-300">
            Home
          </li>
          <li className="hover:text-teal-400 cursor-pointer transition-colors duration-300">
            About
          </li>
          <li className="hover:text-teal-400 cursor-pointer transition-colors duration-300">
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
