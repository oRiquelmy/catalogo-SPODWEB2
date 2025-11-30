import { useState, useEffect } from "react";

/**
 * Componente para alteração de dados de um jogo existente
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.jogo - Objeto do jogo a ser editado (obrigatório)
 * @param {number} props.jogo.id - ID do jogo
 * @param {string} props.jogo.nome - Nome do jogo
 * @param {string} props.jogo.genero - Gênero do jogo
 * @param {number} props.jogo.preco - Preço do jogo
 * @param {Function} props.salvarAlteracoes - Callback para salvar as alterações (obrigatório)
 */
function AlterarJogo({ jogo, salvarAlteracoes }) {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [preco, setPreco] = useState("");

  // Preenche os campos quando o jogo é carregado ou alterado
  useEffect(() => {
    if (jogo) {
      setNome(jogo.nome || "");
      setGenero(jogo.genero || "");
      setPreco(jogo.preco || "");
    }
  }, [jogo]);

  const salvar = (e) => {
    e.preventDefault();

    // Validações no cliente
    if (!nome.trim()) {
      alert("O nome do jogo é obrigatório.");
      return;
    }
    if (!genero.trim()) {
      alert("O gênero do jogo é obrigatório.");
      return;
    }
    if (!preco || parseFloat(preco) <= 0) {
      alert("O preço deve ser um valor positivo.");
      return;
    }

    // Gera slug único baseado no nome
    const slug = nome
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    salvarAlteracoes({
      ...jogo,
      nome: nome.trim(),
      genero: genero.trim(),
      preco: parseFloat(preco),
      slug
    });
  };

  return (
    <form className="formulario" onSubmit={salvar}>
      <h2>Alterar Jogo</h2>

      <label htmlFor="nome-input">Nome do Jogo:</label>
      <input 
        id="nome-input"
        className="text-input" 
        type="text" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite o nome do jogo"
        required
      />

      <label htmlFor="genero-input">Gênero:</label>
      <input 
        id="genero-input"
        className="text-input" 
        type="text" 
        value={genero} 
        onChange={(e) => setGenero(e.target.value)}
        placeholder="Ex: Ação, RPG, Terror"
        required
      />

      <label htmlFor="preco-input">Preço (R$):</label>
      <input 
        id="preco-input"
        className="text-input" 
        type="number" 
        step="0.01"
        min="0"
        value={preco} 
        onChange={(e) => setPreco(e.target.value)}
        placeholder="0.00"
        required
      />

      <button className="cadastro-button" type="submit">Salvar alterações</button>
    </form>
  );
}

export default AlterarJogo;