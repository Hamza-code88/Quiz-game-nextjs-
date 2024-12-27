"use client";

const ResultPage = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="bg-gray-100 py-16 px-4 text-center">
      <div className="max-w-full sm:max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
          Quiz Completed! 🎉
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Your Score: <span className="text-teal-500">{score}</span> / {totalQuestions}
        </p>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          {score > totalQuestions / 2
            ? "Great Job! 👏"
            : "Better luck next time! 💪"}
        </p>
        <button
          onClick={onRestart}
          className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 text-sm sm:text-base"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
