import { useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import { Select } from "../../../components/select/Select";

export function SalaForm({
    variant,
    onSubmit,
    onEditar
}) {
    const [nomeSala, setNomeSala] = useState("");
    const [capacidadeSala, setCapacidadeSala] = useState("");
    const [tipoSala, setTipoSala] = useState("2D");

    const formatos = ["2D", "3D", "IMAX"];

    function handleSubmit(e) {
        e.preventDefault();
        const dados = { nomeSala, capacidadeSala, tipoSala };
        onSubmit(dados);
    }

    function carregarDadosEditar(sala) {
        const { nomeSala, capacidadeSala, tipoSala } = sala;
        setNomeSala(nomeSala);
        setCapacidadeSala(capacidadeSala);
        setTipoSala(tipoSala);
    }

    useEffect(() => {
        if (onEditar) carregarDadosEditar(onEditar);
    }, [onEditar]);

    return (
        <form className={variant} id="sala-form" onSubmit={handleSubmit}>
            <Input
                type="text"
                variant="form-control"
                id="nome-sala"
                placeholder="Digite o nome da sala"
                label="Nome da Sala"
                valor={nomeSala}
                onChange={e => setNomeSala(e.target.value)}
            />

            <Input
                type="number"
                variant="form-control"
                id="capacidade-sala"
                placeholder="Capacidade total"
                label="Capacidade"
                valor={capacidadeSala}
                onChange={e => setCapacidadeSala(e.target.value)}
            />

            <Select
                id="tipo-sala"
                variant="form-control"
                options={formatos}
                label="Tipo de Sala"
                onChange={e => setTipoSala(e.target.value)}
            />
        </form>
    );
}
