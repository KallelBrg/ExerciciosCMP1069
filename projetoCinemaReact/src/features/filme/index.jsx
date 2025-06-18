import { useEffect, useState } from "react";
import FilmeForm from "./components/FilmeForm";
import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";
import { listarFilmes, excluirFilme, atualizarFilme, getFilmeEditar, addFilme } from "./services/filmeService";
import { FilmeTable } from "./components/FilmeTable";

export function CadastrarFilme() {
  const [filmesTabela, setFilmesTabela] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [filmeEditando, setFilmeEditando] = useState(null);
  const [indexEditado, setIndexEditado] = useState(null);

  // Função para listar filmes
  const listar = async () => {
    const filmes = await listarFilmes();
    setFilmesTabela(filmes);
  };

  async function handleSubmit(filme) {
    await (addFilme(filme));
    listar();
    fecharModal();
  }

  async function handleSubmitEditar(filme) {
    await (atualizarFilme(indexEditado, filme));
    listar();
    fecharEditModal();
  }

  // Função para excluir filme
  const excluir = async (id) => {
    await excluirFilme(id);
    listar(); // Atualiza a lista após a exclusão
  };

  useEffect(() => {
    listar(); // Carrega a lista de filmes ao inicializar
  }, []);

  // Função para abrir o modal de cadastro
  function abrirModal() {
    setIsOpen(true);
  }

  // Função para fechar o modal de cadastro
  function fecharModal() {
    setIsOpen(false);
  }

  // Função para abrir o modal de edição
  function abrirEditModal() {
    setIsEditOpen(true);
  }

  // Função para fechar o modal de edição
  function fecharEditModal() {
    setIsEditOpen(false);
  }

  async function editarFilme(index) {
    await setFilmeEditando(getFilmeEditar(index));
    setIndexEditado(index);
    abrirEditModal();
  }

  return (
    <div className="container py-5">
      <h2 className="text-white mb-3 fonte-principal">Cadastrar Filme</h2>

      <Button variant="btn btn-primary mb-4" texto="Cadastrar Filme" onClick={abrirModal} />

      {isOpen && (
        <Modal
          titulo="Cadastrar Novo Filme"
          body={<FilmeForm onSubmit={handleSubmit} />}
          fecharModal={fecharModal}
          form="filme-form"
        />
      )}

      {isEditOpen && (
        <Modal
          titulo="Editar Filme"
          body={<FilmeForm onSubmit={handleSubmitEditar} onEditar={filmeEditando} />}
          fecharModal={fecharEditModal}
          form="filme-form"
        />
      )}

      <FilmeTable
        listaFilmes={filmesTabela}
        botaoExcluir={excluir}
        botaoEditar={editarFilme}
      />
    </div>
  );
}
