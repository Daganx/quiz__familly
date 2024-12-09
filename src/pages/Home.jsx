import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [players, setPlayers] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleNameChange = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);
  };

  const handleStartGame = () => {
    const validPlayers = players.filter((player) => player !== "");
    if (validPlayers.length >= 1 && validPlayers.length <= 4) {
      navigate("/quiz", { state: { players: validPlayers } });
    } else {
      alert("Veuillez entrer entre 1 et 4 joueurs.");
    }
  };

  return (
    <div>
      <h1>Bienvenue au Quiz!</h1>
      <div>
        <h2>Entrez les noms des joueurs</h2>
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Joueur ${index + 1}`}
            value={players[index]}
            onChange={(e) => handleNameChange(index, e.target.value)}
          />
        ))}
      </div>
      <button onClick={handleStartGame}>Démarrer le jeu</button>
    </div>
  );
}
