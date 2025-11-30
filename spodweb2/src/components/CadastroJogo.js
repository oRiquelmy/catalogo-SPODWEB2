import { useState } from "react";

/**
 * Componente para cadastro de novos jogos
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.cadastrar - Callback para cadastrar um novo jogo (obrigatório)
 */
function CadastroJogo({ cadastrar }) {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [preco, setPreco] = useState("");

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

    const novo = {
      // O ID será gerado na função cadastrar do Catalogo
      nome: nome.trim(),
      genero: genero.trim(),
      preco: parseFloat(preco),
      capa: "./imgs/abstract.webp",
      descricao: "Jogo cadastrado manualmente."
    };

    cadastrar(novo);

    // Limpa os campos após cadastro bem-sucedido
    setNome("");
    setGenero("");
    setPreco("");
  };

  return (
    <form className="formulario" onSubmit={salvar}>
      <h2>Cadastro de Novo Jogo</h2>

      <label htmlFor="cadastro-nome">Nome do Jogo:</label>
      <input 
        id="cadastro-nome"
        className="text-input" 
        type="text" 
        placeholder="Nome do jogo"
        value={nome} 
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <label htmlFor="cadastro-genero">Gênero:</label>
      <input 
        id="cadastro-genero"
        className="text-input" 
        type="text" 
        placeholder="Ex: Ação, RPG, Terror"
        value={genero} 
        onChange={(e) => setGenero(e.target.value)}
        required
      />

      <label htmlFor="cadastro-preco">Preço (R$):</label>
      <input 
        id="cadastro-preco"
        className="text-input" 
        type="number" 
        step="0.01"
        min="0"
        placeholder="0.00"
        value={preco} 
        onChange={(e) => setPreco(e.target.value)}
        required
      />

      <button className="cadastro-button" type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroJogo;