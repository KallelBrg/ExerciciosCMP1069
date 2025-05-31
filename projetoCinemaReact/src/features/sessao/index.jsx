import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";
import { useState, useEffect } from "react";
import { SessaoForm } from "./components/SessaoForm";
import { SessaoTable } from "./components/SessaoTable";
import {
    adicionarSessao,
    excluirSessoesServices,
    getSessaoEditar,
    alterarSessaoEditado
} from "./services/storage";

export function CadastarSessao() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [sessoesTabela, setSessoesTabela] = useState([]);
    const [sessaoEditando, setSessaoEditando] = useState(null);
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

    function handleSubmit(sessao) {
        setSessoesTabela(adicionarSessao(sessao));
        fecharModal();
    }

    function handleEditSubmit(sessao) {
        setSessoesTabela(alterarSessaoEditado(sessao, indexEditado));
        fecharEditModal();
    }

    function excluirSessao(index) {
        setSessoesTabela(excluirSessoesServices(index));
    }

    function editarSessao(index) {
        setSessaoEditando(getSessaoEditar(index));
        setIndexEditado(index);
        abrirEditModal();
    }

    useEffect(() => {
        setSessoesTabela(JSON.parse(localStorage.getItem("sessoes")) || []);
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-white mb-3 fonte-principal">Cadastrar Sessão</h2>

            <Button
                variant="btn btn-primary mb-4"
                texto="Cadastrar Sessão"
                onClick={abrirModal}
            />

            {isOpen && (
                <Modal
                    titulo="Cadastrar Nova Sessão"
                    body={<SessaoForm onSubmit={handleSubmit} />}
                    fecharModal={fecharModal}
                    form="sessao-form"
                />
            )}

            {isEditOpen && (
                <Modal
                    titulo="Editar Sessão"
                    body={<SessaoForm onSubmit={handleEditSubmit} onEditar={sessaoEditando} />}
                    fecharModal={fecharEditModal}
                    form="sessao-form"
                />
            )}

            <SessaoTable
                listaSessoes={sessoesTabela}
                botaoExcluir={excluirSessao}
                botaoEditar={editarSessao}
            />
        </div>
    );
}
