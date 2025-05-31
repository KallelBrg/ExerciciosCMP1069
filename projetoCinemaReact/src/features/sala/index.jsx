import { useEffect, useState } from "react";
import { SalaForm } from "./components/SalaForm";
import { SalaTable } from "./components/SalaTable";
import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";
import {
    adicionarSala,
    alterarSalaEditado,
    excluirSalaServices,
    getSalaEditar
} from "./services/storage";

export function CadastrarSala() {
    const [salasTabela, setSalasTabela] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [salaEditando, setSalaEditando] = useState(null);
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

    function handleSubmit(sala) {
        setSalasTabela(adicionarSala(sala));
        fecharModal();
    }

    function handleSubmitEditar(sala) {
        setSalasTabela(alterarSalaEditado(sala, indexEditado));
        fecharEditModal();
    }

    function excluirSala(index) {
        setSalasTabela(excluirSalaServices(index));
    }

    function editarSala(index) {
        setSalaEditando(getSalaEditar(index));
        setIndexEditado(index);
        abrirEditModal();
    }

    useEffect(() => {
        setSalasTabela(JSON.parse(localStorage.getItem("salas")) || []);
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
                botaoExcluir={excluirSala}
                botaoEditar={editarSala}
            />
        </div>
    );
}
