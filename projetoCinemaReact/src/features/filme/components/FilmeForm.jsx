import { useState, useEffect } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/buttons/Button";
import { TextArea } from "../../../components/textarea/TextArea";
import { Select } from "../../../components/select/Select";
import { criarFilme, atualizarFilme } from "../services/filmeService";  // Importando o serviço de filmes

function FilmeForm({ variant, onSubmit, onEditar }) {
  const generos = [
    "🎭 Drama", "😂 Comédia", "🎬 Ação", "😱 Terror", "🕵️ Suspense", "🌌 Ficção Científica", "🧙 Fantasia", "💖 Romance", 
    "🤠 Faroeste", "👶 Animação", "🎸 Musical", "🔍 Policial/Crime"
  ];

  const classificacoes = ["Livre", "10 anos", "12 anos", "14 anos", "16 anos", "18 anos"];
  
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [genero, setGenero] = useState("🎭 Drama");
  const [classificacao, setClassificacao] = useState("Livre");
  const [duracao, setDuracao] = useState("");
  const [dataEstreia, setDataEstreia] = useState("");
  const [id, setId] = useState(null); // Adicionando um campo para o ID do filme

  // Função handleSubmit para cadastrar ou atualizar o filme
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      titulo,
      descricao,
      genero,
      classificacao,
      duracao,
      // Convertendo a data para o formato ISO
      dataEstreia: new Date(dataEstreia).toISOString(),
    };

    onSubmit(dados);
  };

  // Função para carregar dados de edição de filme
  function carregarDadosEditar(filme) {
    const { id, titulo, genero, classificacao, duracao, dataEstreia } = filme;
    setId(id); // Armazena o ID do filme
    setTitulo(titulo);
    setGenero(genero);
    setClassificacao(classificacao);
    setDuracao(duracao);
    setDataEstreia(dataEstreia);
  }

  useEffect(() => {
    if (onEditar) carregarDadosEditar(onEditar); // Carrega os dados do filme para edição
  }, [onEditar]);

  return (
    <form className={variant} id="filme-form" onSubmit={handleSubmit}>
      <Input type="text" variant="form-control" id="titulo-filme" placeholder="Digite o nome do filme" label="Título" valor={titulo} onChange={e => setTitulo(e.target.value)} />
      <TextArea id="descricao-filme" label="Descrição" variant="form-control" numRow="3" placeholder="Escreva a descrição do filme" onChange={e => setDescricao(e.target.value)} />
      <Select id="genero-filme" label="Gênero" variant="form-control" options={generos} onChange={e => setGenero(e.target.value)} />
      <Select id="classificacao-filme" label="Classificação Indicativa" variant="form-control" options={classificacoes} onChange={e => setClassificacao(e.target.value)} />
      <Input type="number" variant="form-control" id="duracao-filme" placeholder="Digite a duração do filme" label="Duração" valor={duracao} onChange={e => setDuracao(e.target.value)} />
      <Input type="date" variant="form-control" id="data-filme" label="Data de Estreia" valor={dataEstreia} onChange={e => setDataEstreia(e.target.value)} />
    </form>
  );
}

export default FilmeForm;
