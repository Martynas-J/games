const Results = ({ data }) => {
  if (!data) {
    return null; 
  }

  data.sort((a, b) => b.playerScore - a.playerScore);

  return (
    <div className="results-sidebar ml-auto p-4">
      <h2 className="text-lg font-semibold mb-2">Visi Rezultatai:</h2>
      <ul className="space-y-2">
        {data.length > 0 ? (
          data.map((result, index) => (
            <li
              key={index}
              className="bg-gray-200 p-2 rounded-md shadow-md"
            >
              <p className="text-gray-700">
                {new Date(result.createdAt).toLocaleString("lt-LT")} -{" "}
                <span className="font-semibold">{result.playerName}</span> -{" "}
                <span className="text-blue-600">Taškai: {result.playerScore}</span>
              </p>
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
