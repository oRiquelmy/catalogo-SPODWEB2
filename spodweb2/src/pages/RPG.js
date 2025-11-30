import React, { useEffect, useState } from "react";
import axios from "axios";
import CardJogo from "../components/CardJogo";
import "../visuals/App.css";

function RPG() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    // Carrega do localStorage primeiro, com fallback para JSON
    const stored = localStorage.getItem("jogos");
    if (stored) {
      try {
        const todosJogos = JSON.parse(stored);
        setJogos(todosJogos.filter((j) => j.genero === "RPG"));
        return;
      } catch (e) {
        // Em caso de erro, busca do JSON
      }
    }

    // Fallback: busca do JSON original
    axios.get("/api/jogos.json").then((res) => {
      setJogos(res.data.filter((j) => j.genero === "RPG"));
    });
  }, []);

  return (
    <main>
      <h1>Jogos de RPG</h1>
      <div className="carrossel">
        {jogos.map((j) => (
          <CardJogo key={j.id} jogo={j} />
        ))}
      </div>
    </main>
  );
}

export default RPG;
