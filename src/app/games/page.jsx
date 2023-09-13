"use client";
import { useState, useEffect } from "react";
import questions from "../../components/questions.json";
import Results from "@/components/results";
import { API_URL } from "../config/config";
import useSWR from "swr";
import { saveResultData } from "@/components/saveResultData";
import { shuffleQuestions } from "@/components/shuffleQuestions";

const Quiz = () => {

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate } = useSWR(`${API_URL}/api/getResults`, fetcher);

  const [questionsList, setQuestionsList] = useState(
    shuffleQuestions(questions).slice(0, 10) 
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [gameFinished, setGameFinished] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [resultSaved, setResultSaved] = useState(false);

  const handleAnswerOptionClick = (selectedAnswer) => {
    if (selectedAnswer === questionsList[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questionsList.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuestionsList(shuffleQuestions(questions).slice(0, 10)); 
      setCurrentQuestionIndex(0);
      setShowScore(true);
      setGameFinished(true);
    }
  };

  const saveResult = async () => {
    try {
      const response = await saveResultData(playerName, score)
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

  useEffect(() => {
    if (showScore) {
      setQuestionsList(shuffleQuestions(questions).slice(0, 10)); 
      setPlayerScore(score);
    }
  }, [showScore, score]);

  return (
    <div className="container mx-auto p-4 flex">
      {showScore ? (
        <div className="text-2xl font-bold">
          <p>Your Score: {score}</p>
          <button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setShowScore(false);
              setGameFinished(false);
              setResultSaved(false);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4"
          >
            Žaisti iš naujo
          </button>
          {!resultSaved && (
            <div>
              <input
                type="text"
                placeholder="Įveskite savo vardą"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="mt-4 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={saveResult}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mt-2"
              >
                Išsaugoti rezultatą
              </button>
            </div>
          )}
        </div>
      ) : (
        currentQuestionIndex !== null && (
          <div>
            <p className="text-lg font-semibold">
              {questionsList[currentQuestionIndex].question}
            </p>
            <ul className="space-y-2">
              {questionsList[currentQuestionIndex].answers.map(
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
      <Results data={data} />
    </div>
  );
};

export default Quiz;
