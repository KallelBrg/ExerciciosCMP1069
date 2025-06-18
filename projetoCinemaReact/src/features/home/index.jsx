import { useEffect, useState } from "react";
import { getFilmes } from "../filme/services/filmeService";  // Certifique-se de que o caminho está correto

export function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function fetchFilmes() {
            const filmesData = await getFilmes();  // Chamando o serviço
            setFilmes(filmesData);
        }
        fetchFilmes();
    }, []);

    return (
        <div className="container py-5">
            <h1 className="text-white text-center mb-5">🎥 Bem-vindo ao Cinebraga</h1>
            <p className="text-white text-center mb-5 fs-5">Confira os filmes disponíveis em nosso catálogo e programe sua próxima sessão!</p>

            {filmes.length === 0 ? (
                <h4 className="text-secondary text-center">Nenhum filme cadastrado ainda.</h4>
            ) : (
                <div className="row g-4">
                    {filmes.map((filme, i) => (
                        <div className="col-12 col-sm-6 col-md-4" key={i}>
                            <div className="card h-100 bg-dark text-white shadow-lg rounded-4">
                                <div className="card-body d-flex flex-column p-4">
                                    <h5 className="card-title fw-bold text-info">{filme.titulo}</h5>
                                    <p className="card-text"><strong>Gênero:</strong> {filme.genero}</p>
                                    <p className="card-text"><strong>Classificação:</strong> {filme.classificacao}</p>
                                    <p className="card-text"><strong>Duração:</strong> {filme.duracao} min</p>
                                    <p className="card-text"><strong>Estreia:</strong> {filme.dataEstreia}</p>
                                    {filme.descricao && <p className="card-text mt-3">{filme.descricao}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
