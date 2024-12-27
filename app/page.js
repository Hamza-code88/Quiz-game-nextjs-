"use client";
import { useEffect, useState } from "react";
import HomeContent from "./components/Home";
import QuestionCard from "./components/QuestionCard";
import ResultPage from "./components/ResultPage";
import Categories from "./components/Categories"; // Import Categories

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timer, setTimer] = useState(20);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [timeUPSound, setTimeUPSound] = useState(null); // State to hold audio object

  useEffect(() => {
    // Initialize the Audio object on the client side
    const sound = new Audio("/timeup.wav");
    setTimeUPSound(sound);
  }, []);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchQuestions(categoryId); // Fetch questions based on selected category
    setTimer(20); // Reset timer on category select
    setIsTimeUp(false); // Reset time up flag
  };

  const fetchQuestions = async (categoryId) => {
    const baseUrl = "https://opentdb.com/api.php?amount=10&category=";
    const difficulty = "&difficulty=easy&type=multiple"; // Common part for all categories

    const apiUrl = `${baseUrl}${categoryId}${difficulty}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const formattedQuestions = data.results.map((item) => ({
        question: item.question,
        options: [...item.incorrect_answers, item.correct_answer].sort(
          () => Math.random() - 0.5
        ),
        correct_answer: item.correct_answer,
      }));

      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching questions", error);
      setLoading(false);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    const correct = option === questions[currentQ].correct_answer;
    setIsCorrect(correct);
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prevCurrentQ) => prevCurrentQ + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setTimer(20); // Reset timer for the next question
      setIsTimeUp(false); // Reset isTimeUp state
    } else {
      setQuizComplete(true);
    }
  };

  useEffect(() => {
    if (timer > 0 && !isTimeUp && quizStarted && selectedCategory && !loading) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup interval on unmount or when timer hits 0
    } else if (timer === 0) {
      setIsTimeUp(true); // Set isTimeUp to true when timer hits 0

      if (timeUPSound) {
        timeUPSound.play(); // Play sound only if initialized
      }
    }
  }, [timer, isTimeUp, quizStarted, selectedCategory, loading, timeUPSound]);

  useEffect(() => {
    if (selectedCategory) {
      fetchQuestions(selectedCategory); // Fetch questions once category is selected
    }
  }, [selectedCategory]);

  return (
    <div className="bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 min-h-screen flex flex-col items-center justify-center py-8 px-4">
      {!quizStarted ? (
        <HomeContent onStartQuiz={handleStartQuiz} />
      ) : !selectedCategory ? (
        <Categories onSelectCategory={handleSelectCategory} /> // Show categories after quiz starts
      ) : loading ? (
        <p>Loading...</p>
      ) : quizComplete ? (
        <ResultPage
          score={score}
          totalQuestions={questions.length}
          onRestart={() => {
            setQuizStarted(false);
            setQuizComplete(false);
            setCurrentQ(0);
            setScore(0);
            setSelectedOption(null);
            setIsCorrect(null);
            setTimer(20); // Reset timer
            setIsTimeUp(false);
            setSelectedCategory(null); // Reset category selection
          }}
        />
      ) : (
        <QuestionCard
          question={questions[currentQ].question}
          options={questions[currentQ].options}
          onSelect={handleSelect} // Pass handleSelect to QuestionCard
          onNext={handleNext}
          correctAnswer={questions[currentQ].correct_answer}
          selectedOption={selectedOption}
          isCorrect={isCorrect}
          score={score}
          isTimeUp={isTimeUp}
          timer={timer}
        />
      )}
    </div>
  );
}
