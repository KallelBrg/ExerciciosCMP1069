import { useEffect, useState } from "react";
import { getSessoes } from "../sessao/services/storage";
import { CardSessao } from "./components/CardSessao";
import { useNavigate } from "react-router-dom";

export function ListaSessoes() {
    const [listaSessoes, setListaSessoes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setListaSessoes(getSessoes());
    }, []);

    function handleComprar() {
        navigate("/ingressos");
    }

    return (
        <div className="container py-5">
            <h1 className="text-white text-center mb-5">Sessões Disponíveis</h1>
            <div className="row g-4" id="cards-container">
                {listaSessoes.map((sessao, index) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={index}>
                        <CardSessao
                            tituloFilme={sessao.filme}
                            nomeSala={sessao.sala}
                            dataHora={sessao.dataHoraSessao}
                            preco={sessao.precoSessao}
                            onComprar={handleComprar}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
