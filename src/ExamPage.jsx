import React, { useState, useEffect, useRef } from "react";
import Quiz from "./components/Quiz";

const ExamPage = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [violations, setViolations] = useState(0);
  const [examEnded, setExamEnded] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setViolations((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (violations === 1) {
      alert(
        "Violation Warning: Don’t exit full-screen! This is your first warning."
      );
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else if (violations >= 2) {
      endExam("Terminated: Too many attempts to exit full-screen.");
    }
  }, [violations]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement && isFullScreen) {
        setViolations((prev) => prev + 1);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [isFullScreen]);

  const startExam = () => {
    document.documentElement.requestFullscreen();
    setIsFullScreen(true);
    startTimer();
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(intervalRef.current);
          endExam("Completed: Time is up.");
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const endExam = (status) => {
    clearInterval(intervalRef.current);
    setExamEnded(true);
    setIsFullScreen(false);
    setQuizSubmitted(true);
    setScore(status);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const handleQuizSubmit = (correctAnswers) => {
    setQuizSubmitted(true);
    setScore(`You scored ${correctAnswers} out of 5.`);
    endExam(`Exam Submitted: You scored ${correctAnswers} out of 5.`);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (examEnded) {
    return <h1 className="text-center mt-8 text-2xl font-bold">{score}</h1>;
  }

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-blue-500 text-white h-14">
        <div className="font-bold text-lg text-white">ExamApp</div>
        <div>
          {!isFullScreen ? (
            <button
              onClick={startExam}
              className="bg-green-500 text-white font-bold py-1 px-2 rounded-md mr-2 text-base"
            >
              Start Exam
            </button>
          ) : (
            <button
              onClick={() => handleQuizSubmit(score)}
              className="bg-red-500 text-white font-bold py-1 px-2 rounded-md text-base"
            >
              Submit Exam
            </button>
          )}
        </div>
      </nav>

      {isFullScreen && (
        <div className="flex justify-center mt-8 text-4xl font-bold">
          Time Left: {formatTime(timeLeft)}
        </div>
      )}

      {!isFullScreen && !quizSubmitted && (
        <div className="flex justify-center items-center h-screen text-3xl font-bold text-gray-600">
          Click Start Exam to Begin
        </div>
      )}

      {isFullScreen && !quizSubmitted && <Quiz onSubmit={handleQuizSubmit} />}
    </div>
  );
};

export default ExamPage;
