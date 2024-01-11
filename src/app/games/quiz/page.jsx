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
  const { data: result, isLoading } = useSWR(
    `${API_URL}/api/getResults/${session.data?.user.name}`,
    fetcher
  );
  useEffect(() => {
    if (result) {
      setLevel(result.level);
      setScore(result.playerScore);
      setPoint(result.playerScore);
      setHelp(result.help);
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
  const [helpUsed, setHelpUsed] = useState(false);
  const [help, setHelp] = useState(2);
  const [isInfoVisible, setInfoVisible] = useState(false);
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
    setHelpUsed(false);
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
      setHelp((prev) => prev + 1);
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
  const hideWrongAnswer = () => {
    if (!helpUsed) {
      setHelp((prev) => prev - 1);
      const wrongAnswers = questionsList[currentQuestionIndex].answers.filter(
        (answer) => answer !== questionsList[currentQuestionIndex].correctAnswer
      );
      const randomWrongAnswerIndex = Math.floor(
        Math.random() * wrongAnswers.length
      );
      const updatedAnswers = questionsList[currentQuestionIndex].answers.filter(
        (answer) => answer !== wrongAnswers[randomWrongAnswerIndex]
      );

      const updatedQuestion = {
        ...questionsList[currentQuestionIndex],
        answers: updatedAnswers,
      };

      const updatedQuestionsList = [...questionsList];
      updatedQuestionsList[currentQuestionIndex] = updatedQuestion;

      setHelpUsed(true);
      setQuestionsList(updatedQuestionsList);
    }
  };

  const saveResult = async () => {
    try {
      const response = await updateResultData({
        playerName: session.data.user.name,
        playerScore: score,
        level,
        help,
      },"saveResult");
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
  const toggleInfo = () => {
    setInfoVisible(!isInfoVisible);
  };
  return (
    <div className="container mx-auto p-0 sm:p-4 flex flex-col lg:flex-row">
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div className="flex-grow text-center  p-2 pb-6 shadow-lg shadow-blue-900 rounded-md">
            <span
              title="Turite atsakyti į 10 klausimų, kad rezultatas taptu saugus, tam jūs turite 3 givybes. Padidėjus lygiui jūsų klausimai sudetingėja ir padidėja atsakymų variantų, tačiau gaunate +1 pagalbą ir daugiau taškų už teisingą atsakymą"
              className=" cursor-help float-right  md:bg-blue-400 text-sm md:text-white px-2 rounded-full"
              onClick={toggleInfo}
            >
              &#x2139;
            </span>
            {isInfoVisible && (
              <div className="bg-white p-4 border border-gray-300 rounded shadow-md absolute z-10 top-0 right-0 mt-8">
                <p>
                  Turite atsakyti į 10 klausimų, kad rezultatas taptų saugus,
                  tam jūs turite 3 gyvybes. Padidėjus lygiui jūsų klausimai
                  sudėtingėja ir padidėja atsakymų variantų, tačiau gaunate +1
                  pagalbą ir daugiau taškų už teisingą atsakymą.
                </p>
                <button
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-full"
                  onClick={toggleInfo}
                >
                  Uždaryti
                </button>
              </div>
            )}
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
                {lives === 0 ? (
                  <p>Baigėsi givybės</p>
                ) : (
                  <p>Your Score: {score}</p>
                )}
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setQuestionsList(
                      shuffleQuestions(questions[`level${level}`] || []).slice(
                        0,
                        10
                      )
                    );
                    setShowScore(false);
                    setResultSaved(false);
                    setLives(3);
                    setCorrectAnswers(false);
                    if (session.status === "unauthenticated") {
                      setLevel(1);
                      setScore(0);
                      setPoint(0);
                    } else if (!resultSaved) {
                      setLevel(result?.level || 1);
                      setScore(result?.playerScore || 0);
                      setPoint(result?.playerScore || 0);
                      setHelp(result?.help || 2);
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4"
                >
                  {lives !== 0 ? "Tęsti" : "Žaisti iš naujo"}
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

                    <p
                      title="Gaunate +1 pagalba įveikę lygį. Vienam klausimui galima panaudot tik vieną pagalbą"
                      className="relative cursor-help"
                    >
                      Pagalba: {help}{" "}
                      {helpUsed && (
                        <span className=" text-red-500 absolute animate-fade-in">{`-1`}</span>
                      )}
                    </p>

                    <p>Klausimas: {currentQuestionIndex + 1}</p>
                  </div>
                  <p className="text-lg font-semibold pb-4">
                    <p className="text-transparent text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text font-serif animate-ping h-full w-full rounded-full opacity-35 ">
                      {questionsList.length === 0 && "Laimėjote"}
                    </p>
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
                    <button
                      onClick={hideWrongAnswer}
                      className={`${
                        help === 0 && "hidden"
                      } bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full mt-2`}
                      disabled={helpUsed}
                    >
                      Pagalba
                    </button>
                  </ul>
                </div>
              )
            )}
          </div>
          <Results data={results} />
        </>
      )}
    </div>
  );
};

export default Quiz;
