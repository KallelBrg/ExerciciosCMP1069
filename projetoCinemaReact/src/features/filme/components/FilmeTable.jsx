import Button from "../../../components/buttons/Button";

export function FilmeTable({
    listaFilmes,
    botaoExcluir,
    botaoEditar
}) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-dark" id="tabela-filmes">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Gênero</th>
                        <th>Classificação</th>
                        <th>Duração</th>
                        <th>Data Estreia</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaFilmes.map((filme, i) => {
                        const { titulo, descricao, genero, classificacao, duracao, dataEstreia } = filme;
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{titulo}</td>
                                <td>{genero}</td>
                                <td>{classificacao}</td>
                                <td>{duracao}</td>
                                <td>{dataEstreia}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button variant="btn btn-sm btn-secondary" texto="Editar" onClick={() => botaoEditar(i)} />
                                        <Button variant="btn btn-sm btn-danger" texto="Excluir" onClick={() => botaoExcluir(i)} />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
