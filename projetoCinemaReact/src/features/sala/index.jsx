import { useEffect, useState } from "react";
import { SalaForm } from "./components/SalaForm";
import { SalaTable } from "./components/SalaTable";
import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";
import {
    adicionarSala,
    atualizarSala,
    excluirSala,
    getSalaEditar,
    listarSalas
} from "./services/storage";

export function CadastrarSala() {
    const [salasTabela, setSalasTabela] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [salaEditando, setSalaEditando] = useState(null);
    const [indexEditado, setIndexEditado] = useState(null);

    const listar = async () => {
        const salas = await listarSalas();
        setSalasTabela(salas);
    };

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

    async function handleSubmit(sala) {
        await (adicionarSala(sala));
        listar();
        fecharModal();
    }

    async function handleSubmitEditar(sala) {
        await (atualizarSala(indexEditado, sala));
        listar();
        fecharEditModal();
    } 

    const excluir = async (id) => {
        await excluirSala(id);
        listar(); // Atualiza a lista após a exclusão
    };

    async function editarSala(index) {
        await setSalaEditando(getSalaEditar(index));
        setIndexEditado(index);
        abrirEditModal();
    }

    useEffect(() => {
        listar();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-white mb-3 fonte-principal">Cadastrar Sala</h2>

            <Button
                variant="btn btn-primary mb-4"
                texto="Cadastrar Sala"
                onClick={abrirModal}
            />

            {isOpen && (
                <Modal
                    titulo="Cadastrar Nova Sala"
                    body={<SalaForm onSubmit={handleSubmit} />}
                    fecharModal={fecharModal}
                    form="sala-form"
                />
            )}

            {isEditOpen && (
                <Modal
                    titulo="Editar Sala"
                    body={<SalaForm onSubmit={handleSubmitEditar} onEditar={salaEditando} />}
                    fecharModal={fecharEditModal}
                    form="sala-form"
                />
            )}

            <SalaTable
                listaSalas={salasTabela}
                botaoExcluir={excluir}
                botaoEditar={editarSala}
            />
        </div>
    );
}
