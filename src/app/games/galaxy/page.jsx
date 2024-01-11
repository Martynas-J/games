// "use client";
// import React, { useEffect, useState } from "react";

const Game = () => {
  // const [playerPosition, setPlayerPosition] = useState({ x: 500, y: 500 });
  // const [enemies, setEnemies] = useState([
  //   { x: Math.random() * (window.innerWidth - 10), y: 0 },
  //   { x: Math.random() * (window.innerWidth - 10), y: 0 },
  // ]);
  // const [score, setScore] = useState(0);
  // const [enemySpeed, setEnemySpeed] = useState(10);
  // const [enemyInterval, setEnemyInterval] = useState(1000);
  // const [gameOver, setGameOver] = useState(false);

  // const gameLoop = () => {
  //   setScore(score + 1);
  //   requestAnimationFrame(gameLoop);
  // };

  // useEffect(() => {
  //   gameLoop();
  // }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(moveEnemies, enemyInterval);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [enemyInterval]);

  // useEffect(() => {
  //   if (
  //     enemies.some(
  //       (enemy) => enemy.y >= (80 * window.innerHeight) / 100 - 20
  //     ) ||
  //     enemies.some(
  //       (enemy) =>
  //         playerPosition.x < enemy.x + 20 &&
  //         playerPosition.x + 20 > enemy.x &&
  //         playerPosition.y < enemy.y + 20 &&
  //         playerPosition.y + 20 > enemy.y
  //     )
  //   ) {
  //     setGameOver(true);
  //   }
  // }, [enemies, playerPosition]);

  // useEffect(() => {
  //   const enemyGenerationInterval = setInterval(() => {
  //     if (!gameOver) {
  //       addEnemy();
  //     }
  //   }, 3000); // 1 sekundės intervalas
  //   return () => {
  //     clearInterval(enemyGenerationInterval);
  //   };
  // }, [gameOver]);

  // const addEnemy = () => {
  //   const newEnemy = {
  //     x: Math.random() * (window.innerWidth - 10),
  //     y: 0,
  //   };

  //   setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
  // };

  // const startGame = () => {
  //   setScore(0);
  //   setEnemies([]);
  //   setGameOver(false);
  // };

  // const moveEnemies = () => {
  //   if (gameOver) return;

  //   setEnemies((prevEnemies) =>
  //     prevEnemies.map((enemy) => ({
  //       x: enemy.x,
  //       y: enemy.y + enemySpeed,
  //     }))
  //   );
  // };

  // const handleMouseMove = (event) => {
  //   const maxX = window.innerWidth - 20;
  //   const maxY = (80 * window.innerHeight) / 100 - 20;

  //   const x = Math.min(maxX, Math.max(0, event.clientX));
  //   const y = Math.min(maxY, Math.max(0, event.clientY));

  //   setPlayerPosition({ x, y });
  // };

  return (
    <div></div>
//     <div className="">
//       {gameOver ? (
//         <div className="text-4xl text-red-500 font-bold text-center mt-20">
//           Žaidimas baigtas! Jūs surinkote {score} taškus.
//           <button
//             className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-full"
//             onClick={startGame}
//           >
//             Žaisti iš naujo
//           </button>
//         </div>
//       ) : (
//         <div
//           className="bg-gray-300 h-[80vh] w-full relative"
//           onMouseMove={handleMouseMove}
//         >
//           <div
//             className="w-5 h-5 bg-blue-500 z-50"
//             style={{
//               position: "absolute",
//               top: `${playerPosition.y}px`,
//               left: `${playerPosition.x}px`,
//             }}
//           ></div>

//           {enemies.map((enemy, index) => (
//             <div
//               key={index}
//               className="w-5 h-5 bg-red-600 z-50"
//               style={{
//                 position: "absolute",
//                 top: `${enemy.y}px`,
//                 left: `${enemy.x}px`,
//               }}
//             ></div>
//           ))}

//           <div className="text-white absolute top-4 right-4 text-xl">
//             Score: {score}
//           </div>
//           <div className="flex justify-center text-center">
//             <button onClick={moveEnemies}>Start</button>
//             <button onClick={addEnemy}>Add Enemy</button>
//           </div>
//         </div>
//       )}
//     </div>
   );
 };

export default Game;
