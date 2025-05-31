import Button from "../../components/buttons/Button";
import { IngressoTable } from "./components/IngressoTable";
import { IngressoForm } from "./components/IngressoForm";
import { Modal } from "../../components/modal/Modal";
import { useState, useEffect } from "react";
import { adicionarIngresso } from "./services/storage";

export function Ingressos() {
    const [isOpen, setIsOpen] = useState(false);
    const [ingressoTabela, setIngressosTabela] = useState([]);

    function abrirModal() {
        setIsOpen(true);
    }

    function fecharModal() {
        setIsOpen(false);
    }

    function handleSubmit(ingresso) {
        setIngressosTabela(adicionarIngresso(ingresso));
        fecharModal();
    }

    useEffect(() => {
        setIngressosTabela(JSON.parse(localStorage.getItem("ingressos")) || []);
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-white mb-3 text-minhafonte">Seus Ingressos</h2>
            <IngressoTable listaIngressos={ingressoTabela} />

            <Button
                texto="Comprar Ingressos"
                variant="btn btn-success mb-4"
                onClick={abrirModal}
            />

            {isOpen && (
                <Modal
                    titulo="Comprar Ingresso"
                    body={<IngressoForm onSubmit={handleSubmit} />}
                    fecharModal={fecharModal}
                    form="ingresso-form"
                />
            )}
        </div>
    );
}
