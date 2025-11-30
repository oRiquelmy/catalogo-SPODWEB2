import { useEffect, useState } from "react";
import axios from "axios";
import CardJogo from "../components/CardJogo";
import "../visuals/App.css";

function Acao() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    // Carrega do localStorage primeiro, com fallback para JSON
    const stored = localStorage.getItem("jogos");
    if (stored) {
      try {
        const jogos = JSON.parse(stored);
        setLista(jogos.filter((j) => j.genero === "Ação"));
        return;
      } catch (e) {
        // Em caso de erro, busca do JSON
      }
    }

    // Fallback: busca do JSON original
    axios.get("/api/jogos.json").then((res) =>
      setLista(res.data.filter((j) => j.genero === "Ação"))
    );
  }, []);

  return (
    <main>
      <h1>Jogos de Ação</h1>

      <div className="carrossel">
        {lista.map((jogo) => (
          <CardJogo key={jogo.id} jogo={jogo} />
        ))}
      </div>
    </main>
  );
}

export default Acao;