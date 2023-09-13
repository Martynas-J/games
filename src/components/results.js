"use client";

const Results = ({ data }) => {

if (!data) {
  return
}
data.sort((a, b) => b.playerScore - a.playerScore);
  return (
    <div className="results-sidebar ml-auto w-1/4 p-4">
      <h2 className="text-lg font-semibold mb-2">Visi Rezultatai:</h2>
      <ul>
        {data.length > 0 ? (
          data.map((result, index) => (
            <li key={index} className="mb-1">
              {new Date(result.createdAt).toLocaleString("lt-LT")} -{" "}
              {result.playerName} - {"Taškai: " + result.playerScore}
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
