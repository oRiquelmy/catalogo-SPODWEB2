import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AlterarJogo from "../components/AlterarJogo";
import "../visuals/App.css";

function AlterarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jogos, setJogos] = useState([]);
  const [jogo, setJogo] = useState(null);

  // Carrega jogos do localStorage (mesma lógica do Catalogo.js)
  useEffect(() => {
    const stored = localStorage.getItem("jogos");
    if (stored) {
      try {
        const jogosLocal = JSON.parse(stored);
        setJogos(jogosLocal);
        setJogo(jogosLocal.find((j) => j.id === parseInt(id)));
        return;
      } catch (e) {
        // Em caso de erro, busca do JSON original
      }
    }

    // Fallback: busca do JSON e persiste
    axios.get("/api/jogos.json").then((res) => {
      setJogos(res.data);
      setJogo(res.data.find((j) => j.id === parseInt(id)));
      localStorage.setItem("jogos", JSON.stringify(res.data));
    });
  }, [id]);

  const salvarAlteracoes = (atualizado) => {
    // Validação dos dados
    if (!atualizado.nome || !atualizado.genero || isNaN(Number(atualizado.preco))) {
      alert("Preencha nome, gênero e preço válidos antes de salvar.");
      return;
    }

    // Atualiza a lista mantendo a imutabilidade
    const novaLista = jogos.map((j) =>
      j.id === atualizado.id ? atualizado : j
    );

    // Persiste no localStorage (mesma lógica do Catalogo.js)
    setJogos(novaLista);
    try {
      localStorage.setItem("jogos", JSON.stringify(novaLista));
      alert("Jogo alterado com sucesso!");
      navigate("/catalogo");
    } catch (e) {
      alert("Erro ao salvar alterações. Tente novamente.");
    }
  };

  return (
    <main>
      {jogo ? (
        <AlterarJogo jogo={jogo} salvarAlteracoes={salvarAlteracoes} />
      ) : (
        <p>Carregando jogo...</p>
      )}
    </main>
  );
}

export default AlterarPage;
