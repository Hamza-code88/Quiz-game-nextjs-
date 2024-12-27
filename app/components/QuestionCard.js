"use client";

import React from "react";

const QuestionCard = ({
  question,
  options,
  onSelect,
  onNext,
  correctAnswer,
  selectedOption,
  isCorrect,
  score,
  isTimeUp,
  timer,
}) => {
  const handleOptionSelect = (option) => {
    if (selectedOption || isTimeUp) return;
    onSelect(option);
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 via-white to-teal-100 p-6 rounded-xl shadow-xl max-w-lg mx-auto my-8 border border-teal-200">
      {/* Score Display */}
      <div className="text-right text-lg font-semibold text-gray-700 mb-4">
        Score: <span className="font-bold">{score}</span>
      </div>

      {/* Timer */}
      <div
        className={`text-lg font-semibold ${
          timer <= 5 ? "text-red-600 animate-pulse" : "text-teal-700"
        }`}
      >
        Time Left: {timer}s
      </div>

      {/* Question */}
      <div className="text-2xl font-bold text-teal-800 mb-6 drop-shadow-sm">
        {question}
      </div>

      {/* Options */}
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full rounded-lg py-3 px-4 text-lg font-medium shadow-md transition-all duration-300 ${
              selectedOption === option
                ? isCorrect
                  ? "bg-teal-500 text-white border border-teal-700 scale-105" // Selected correct option
                  : "bg-red-500 text-white border border-red-700 scale-105" // Selected wrong option
                : selectedOption && option === correctAnswer
                ? "bg-teal-400 text-white border border-teal-600" // Highlight correct answer
                : "bg-gray-100 text-gray-800 hover:bg-teal-200 hover:shadow-lg"
            }`}
            onClick={() => handleOptionSelect(option)}
            disabled={!!selectedOption || isTimeUp}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="mt-6 text-center">
        <button
          className={`bg-teal-600 text-white px-6 py-3 rounded-full shadow-md font-semibold hover:bg-teal-700 hover:shadow-xl transition-all duration-300 ${
            selectedOption || isTimeUp
              ? "hover:scale-105"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={!selectedOption && !isTimeUp}
        >
          {isTimeUp ? "Next Question" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
