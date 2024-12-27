// components/HomeContent.js
"use client";

import React, { useState } from "react";
import QuestionCard from "./QuestionCard";

const HomeContent = ({ onStartQuiz }) => {
  const [startQ, setStartQ] = useState(false);

  const handelStart = () => {
    setStartQ(true);
    onStartQuiz();
  };

  return (
    <section className="bg-gradient-to-br from-teal-50 via-white to-teal-100 py-20 px-8 text-center">
    <div className="max-w-2xl mx-auto">
      {/* Heading with sleek shadow and animation */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-teal-800 mb-8 tracking-tight leading-tight drop-shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
        Welcome to <span className="text-teal-400">Quiz Game</span>
      </h1>
  
      {/* Description with smooth fade-in animation */}
      <p className="text-lg sm:text-xl text-teal-600 mb-12 opacity-80 transform transition-all duration-500 ease-in-out hover:opacity-100">
        Ready to test your knowledge? Dive into an interactive quiz game that challenges your mind and brings fun!
      </p>
  
      {/* Start Button with modern animation */}
      <button
        onClick={handelStart}
        className="relative group overflow-hidden px-10 py-5 rounded-2xl backdrop-blur-md bg-teal-800 border border-teal-800 text-white font-semibold text-lg tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-800 hover:to-teal-300"
      >
        <span className="absolute inset-0 w-0 bg-gradient-to-r from-teal-400 to-teal-200 transition-all duration-300 group-hover:w-full"></span>
        <span className="relative z-10">Start Quiz</span>
      </button>
  
      {/* Display QuestionCard after quiz starts */}
      {startQ && (
        <div className="mt-10 opacity-100 transition-all duration-500 ease-in-out">
          <QuestionCard />
        </div>
      )}
    </div>
  </section>
  
  );
};

export default HomeContent;
