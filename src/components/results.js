"use client";
import { API_URL } from "@/app/config/config";
import axios from "axios";
import { useState, useEffect } from "react";

const Results = ({ showScore }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
      axios.get(`${API_URL}/api/getResults`)
      .then(res => setResults(res.data))
      .catch(res => toast.error(res.message))
  }, [showScore]);

  return (
    <div className="results-sidebar ml-auto w-1/4 p-4">
      <h2 className="text-lg font-semibold mb-2">Visi Rezultatai:</h2>
      <ul>
        {results.length > 0 ? (
          results.map((result, index) => (
            <li key={index} className="mb-1">
            {new Date(result.createdAt).toLocaleString("lt-LT")} - {result.playerName} - {'Taškai: ' + result.playerScore}  
            </li>
          ))
        ) : (
          <p>Rezultatų nėra</p>
        )}
      </ul>
    </div>
  );
};

export default Results;
