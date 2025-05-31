import FilmeForm from "./components/FilmeForm";
import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";
import { FilmeTable } from "./components/FilmeTable";
import { useEffect, useState } from "react";
import { adicionarFilme, alterarFilmeEditado, excluirFilmeServices, getFilmeEditar } from "./services/storage";

export function CadastrarFilme() {
    const [filmesTabela, setFilmesTabela] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [filmeEditando, setFilmeEditando] = useState(null);
    const [indexEditado, setIndexEditado] = useState(null);

    function abrirModal() {
        setIsOpen(true);
    }

    function fecharModal() {
        setIsOpen(false);
    }

    function abrirEditModal() {
        setIsEditOpen(true);
    }

    function fecharEditModal() {
        setIsEditOpen(false);
    }

    function handleSubmit(filme) {
        setFilmesTabela(adicionarFilme(filme));
        fecharModal();
    }

    function handleSubmitEditar(filme) {
        setFilmesTabela(alterarFilmeEditado(filme, indexEditado));
        fecharEditModal();
    }

    function excluirFilme(index) {
        setFilmesTabela(excluirFilmeServices(index));
    }

    function editarFilme(index) {
        setFilmeEditando(getFilmeEditar(index));
        setIndexEditado(index);
        abrirEditModal();
    }

    useEffect(() => {
        setFilmesTabela(JSON.parse(localStorage.getItem("filmes")) || []);
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-white mb-3 fonte-principal">Cadastrar Filme</h2>

            <Button
                variant="btn btn-primary mb-4"
                texto="Cadastrar Filme"
                onClick={abrirModal}
            />

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
                botaoExcluir={excluirFilme}
                botaoEditar={editarFilme}
            />
        </div>
    );
}
