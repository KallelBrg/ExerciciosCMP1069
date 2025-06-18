import { useState, useEffect } from "react";
import Input from "../../../components/input/Input";
import { Select } from "../../../components/select/Select";
import { getNomeFilmes } from "../../filme/services/filmeService"; // Corrigido para o serviço correto
import { getHorariosSessao, getTiposSessao, getIdiomasSessao } from "../../sessao/services/storage";

export function IngressoForm({ onSubmit }) {
    const [listaFilmes, setListaFilmes] = useState([]);
    const [filme, setFilme] = useState("");

    const [listaHorarios, setListaHorarios] = useState([]);
    const [horario, setHorario] = useState("");

    const [listaTipos, setListaTipos] = useState([]);
    const [tipo, setTipo] = useState("");

    const [listaIdiomas, setListaIdiomas] = useState([]);
    const [idioma, setIdioma] = useState("");

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [assento, setAssento] = useState("");
    const [pagamento, setPagamento] = useState("PIX");

    const pagamentos = ["PIX", "Cartão", "Dinheiro"];

    // Fetches os filmes do backend
    useEffect(() => {
        const fetchFilmes = async () => {
            const filmes = await getNomeFilmes(); // Função que busca filmes no backend
            setListaFilmes(filmes);
            if (filmes.length > 0) setFilme(filmes[0]); // Se houver filmes, seleciona o primeiro
        };

        fetchFilmes();
    }, []);

    useEffect(() => {
        if (filme) {
            const horarios = getHorariosSessao(filme); // Pega os horários para o filme selecionado
            setListaHorarios(horarios);
            setHorario(horarios[0] || "");
            setListaTipos([]); // Limpa os tipos de sessão
            setTipo(""); // Limpa o tipo de sessão
        }
    }, [filme]);

    useEffect(() => {
        if (filme && horario) {
            const tipos = getTiposSessao(filme, horario); // Pega os tipos de sessão
            setListaTipos(tipos);
            setTipo(tipos[0] || "");
        }
    }, [filme, horario]);

    useEffect(() => {
        if (filme && horario && tipo) {
            const idiomas = getIdiomasSessao(filme, horario, tipo); // Pega os idiomas da sessão
            setListaIdiomas(idiomas);
            setIdioma(idiomas[0] || "");
        }
    }, [filme, horario, tipo]);

    function formatarCPF(valor) {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return valor;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const dadosIngresso = {
            nome,
            cpf,
            assento,
            pagamento,
            filme,
            horario,
            tipo,
            idioma
        };
        onSubmit(dadosIngresso);
    }

    return (
        <form className="d-flex flex-column mb-5" id="ingresso-form" onSubmit={handleSubmit}>
            <Select id="filme-ingresso" variant="form-control" label="Filme" options={listaFilmes} valor={filme} onChange={(e) => setFilme(e.target.value)} />
            <Select id="hora-ingresso" variant="form-control" label="Horário" options={listaHorarios} valor={horario} onChange={(e) => setHorario(e.target.value)} />
            <Select id="tipo-sessao-ingresso" variant="form-control" label="Tipo da Sessão" options={listaTipos} valor={tipo} onChange={(e) => setTipo(e.target.value)} />
            <Select id="idioma-sessao-ingresso" variant="form-control" label="Idioma da Sessão" options={listaIdiomas} valor={idioma} onChange={(e) => setIdioma(e.target.value)} />
            <Input id="nomecompleto-ingresso" type="text" valor={nome} placeholder="Digite o seu Nome" onChange={(e) => setNome(e.target.value)} label="Nome Completo" />
            <Input id="cpf-ingresso" type="text" valor={cpf} placeholder="000.000.000-00" maxLength={14} onChange={(e) => setCpf(formatarCPF(e.target.value))} label="CPF" />
            <Input id="assento-ingresso" type="text" valor={assento} placeholder="Ex: A10" onChange={(e) => setAssento(e.target.value)} label="Assento" />
            <Select variant="form-control" id="pagamento-ingresso" label="Forma de Pagamento" options={pagamentos} valor={pagamento} onChange={(e) => setPagamento(e.target.value)} />
        </form>
    );
}
