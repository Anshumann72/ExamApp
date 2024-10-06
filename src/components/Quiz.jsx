import React, { useState } from "react";

const Quiz = ({ onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const questions = [
    {
      id: 1,
      question: "What is the closest planet to the sun?",
      options: ["Earth", "Venus", "Mercury", "Mars"],
      correct: "Mercury",
    },
    {
      id: 2,
      question: "How many planets are in our Solar System?",
      options: ["7", "8", "9", "10"],
      correct: "8",
    },
    {
      id: 3,
      question: "What galaxy is Earth located in?",
      options: ["Andromeda", "Milky Way", "Sombrero", "Whirlpool"],
      correct: "Milky Way",
    },
    {
      id: 4,
      question: "Which planet has the most moons?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: "Saturn",
    },
    {
      id: 5,
      question: "What is the hottest planet in the Solar System?",
      options: ["Mercury", "Earth", "Mars", "Venus"],
      correct: "Venus",
    },
  ];

  const handleOptionChange = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: option }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const correctAnswers = questions.filter(
        (q, index) => answers[index] === q.correct
      ).length;
      onSubmit(correctAnswers);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 text-white">
      <div className="bg-blue-600 p-4 rounded-md w-4/5 max-w-lg">
        <h3 className="text-xl font-bold mb-2">
          {questions[currentQuestion].question}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionChange(option)}
              className={`py-2 px-4 rounded-md border ${
                answers[currentQuestion] === option
                  ? "bg-green-500"
                  : "bg-blue-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className="bg-red-500 text-white font-bold py-2 px-4 rounded-md mt-4"
      >
        {currentQuestion < questions.length - 1
          ? "Next Question"
          : "Submit Quiz"}
      </button>
    </div>
  );
};

export default Quiz;
