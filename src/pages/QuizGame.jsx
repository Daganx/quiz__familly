import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import questions from "../data/questions.json"; // Importation du fichier JSON

const Quiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [players] = useState(state.players);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [score, setScore] = useState(new Array(players.length).fill(0));
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    nextQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const nextQuestion = () => {
    const category = questions[difficulty]; // Sélectionner les questions en fonction de la difficulté
    const randomQuestion =
      category[Math.floor(Math.random() * category.length)];
    setCurrentQuestion(randomQuestion);
    setAnswered(false);
  };

  const handleAnswer = (answer) => {
    if (answered) return;
    if (answer === currentQuestion.correct) {
      setScore((prev) => {
        const newScore = [...prev];
        newScore[currentPlayerIndex] +=
          difficulty === "easy" ? 1 : difficulty === "medium" ? 3 : 5;
        return newScore;
      });
    }
    setAnswered(true);
    setTimeout(() => {
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      if (score[nextPlayerIndex] >= 25) {
        alert(`${players[nextPlayerIndex]} gagne !`);
        navigate("/");
      } else {
        setCurrentPlayerIndex(nextPlayerIndex);
        nextQuestion();
      }
    }, 1000);
  };

  return (
    <div>
      <h1>{players[currentPlayerIndex]}&apos;s Tour</h1>
      <div>
        <h2>Choisissez la difficulté</h2>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Facile (1 point)</option>
          <option value="medium">Moyen (3 points)</option>
          <option value="hard">Difficile (5 points)</option>
        </select>
      </div>
      {currentQuestion && (
        <div>
          <p>{currentQuestion.question}</p>
          {currentQuestion.answers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswer(answer)}>
              {answer}
            </button>
          ))}
        </div>
      )}
      <div>
        <h2>Scores</h2>
        {players.map((player, index) => (
          <p key={index}>
            {player}: {score[index]} points
          </p>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
