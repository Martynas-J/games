"use client";
import { useState, useEffect } from "react";
import questions from "@/components/questions.json";
import Results from "@/components/results";
import useSWR from "swr";
import { shuffleQuestions } from "@/components/shuffleQuestions";
import { useSession } from "next-auth/react";
import { updateResultData } from "@/components/updateResultData";
import { API_URL } from "@/app/config/config";
import { FaHeart } from "react-icons/fa";

const Quiz = () => {
  const session = useSession();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: results, mutate } = useSWR(
    `${API_URL}/api/getResults`,
    fetcher
  );
  const { data: result } = useSWR(
    `${API_URL}/api/getResults/${session.data?.user.name}`,
    fetcher
  );
  useEffect(() => {
    if (result) {
      setLevel(result.level);
      setScore(result.playerScore);
      setPoint(result.playerScore);
    }
  }, [result]);

  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [point, setPoint] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [resultSaved, setResultSaved] = useState(false);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [correctAnswers, setCorrectAnswers] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState(false);
  const lvlUp = 7;
  const maxScore = lvlUp * level ** 3 + 1;

  useEffect(() => {
    const levelQuestions = questions[`level${level}`];
    if (levelQuestions) {
      const shuffledQuestions = shuffleQuestions(levelQuestions);
      setQuestionsList(shuffledQuestions.slice(0, 10));
    }
  }, [level]);

  const handleAnswerOptionClick = (selectedAnswer) => {
    if (selectedAnswer === questionsList[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + level);
      setPoint((prev) => prev + level);
      setCorrectAnswers(true);
      setTimeout(() => {
        setCorrectAnswers(false);
      }, 2000);
    } else {
      setLives((prev) => prev - 1);
      setWrongAnswers(true);
      setTimeout(() => {
        setWrongAnswers(false);
      }, 2000);
    }
    if (score === lvlUp * level ** 3) {
      setLevel((prev) => prev + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questionsList.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuestionsList(
        shuffleQuestions(questions[`level${level}`] || []).slice(0, 10)
      );
      setCurrentQuestionIndex(0);
      setShowScore(true);
    }
  };

  const saveResult = async () => {
    try {
      const response = await updateResultData(
        session.data.user.name,
        score,
        level
      );
      if (response.ok) {
        setResultSaved(true);
        mutate();
      } else {
        console.error("Failed to save the result.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-0 sm:p-4 flex flex-col sm:flex-row">
      <div className="flex-grow text-center  p-2 pb-6 shadow-lg shadow-blue-900 rounded-md">
        <p className="text-xl font-semibold mt-4 text-center text-blue-800">
          Level: {level}
        </p>
        <div className="mt-4 relative w-full">
          <div className="bg-gray-300 h-4 rounded-full">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${(score / maxScore) * 100}%` }}
            ></div>
          </div>
          <p className=" relative text-center mt-2 text-sm font-semibold text-gray-600">
            Kitas lygis: {Math.round((score / maxScore) * 100)}%
            {correctAnswers && (
              <span className=" text-green-500 absolute animate-fade-in">{`+${Math.round(
                (level / maxScore) * 100
              )}%`}</span>
            )}
          </p>
        </div>
        {showScore || lives === 0 ? (
          <div className="text-2xl font-bold mb-auto">
            {lives === 0 ? <p>Baigėsi givybės</p> : <p>Your Score: {score}</p>}
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setShowScore(false);
                setResultSaved(false);
                setLives(3);
                setCorrectAnswers(false);
                if (session.status === "unauthenticated") {
                  setLevel(0);
                  setScore(0);
                  setPoint(0);
                } else if (!resultSaved) {
                  setLevel(result.level);
                  setScore(result.playerScore);
                  setPoint(result.playerScore);
                }
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4"
            >
              Žaisti iš naujo
            </button>
            {!resultSaved &&
            session.status === "authenticated" &&
            lives !== 0 ? (
              <div>
                <button
                  onClick={saveResult}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mt-2"
                >
                  Išsaugoti rezultatą
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          currentQuestionIndex !== null && (
            <div className=" mt-5 border-t-2">
              <div className="pb-2 text-l font-semibold mt-2 text-gray-800 flex justify-between border-b-2">
                <p className=" relative ">
                  Taškai: {point}
                  {correctAnswers && (
                    <span className=" text-green-500 absolute animate-fade-in">{`+${level}`}</span>
                  )}
                </p>
                <p className="flex gap-1 items-center">
                  {" "}
                  <FaHeart className="text-red-500" />
                  <span className="relative">
                    {lives}
                    {wrongAnswers && (
                      <span className=" text-red-500 absolute animate-fade-in">{`-1`}</span>
                    )}
                  </span>
                </p>

                <p>Klausimas: {currentQuestionIndex + 1}</p>
              </div>
              <p className="text-lg font-semibold pb-4">
                {questionsList[currentQuestionIndex]?.question}
              </p>
              <ul className="space-y-2">
                {questionsList[currentQuestionIndex]?.answers.map(
                  (answer, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleAnswerOptionClick(answer)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                      >
                        {answer}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          )
        )}
      </div>
      <Results data={results} />
    </div>
  );
};

export default Quiz;
