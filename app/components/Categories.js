// components/Categories.js
"use client";

import React from "react";

const Categories = ({ onSelectCategory }) => {
  const categories = [
    { name: "General Knowledge", id: 9 },
    { name: "Animals", id: 27 },
    { name: "Science & Nature", id: 17 },
    { name: "Mythology", id: 20 },
    { name: "History", id: 23 },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 bg-gradient-to-b from-teal-800 to-black rounded-3xl shadow-xl">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className="relative group overflow-hidden px-10 py-5 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold text-lg tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-800 hover:to-blue-300"
        >
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-teal-300 to-teal-800 transition-all duration-300 group-hover:w-full"></span>
          <span className="relative z-10">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Categories;
