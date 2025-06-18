import Button from "../../../components/buttons/Button";

export function SessaoTable({
    listaSessoes,
    botaoExcluir,
    botaoEditar
}) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-dark" id="tabela-sessoes">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Filme</th>
                        <th>Sala</th>
                        <th>Tipo Sala</th>
                        <th>Data e Hora</th>
                        <th>Preço</th>
                        <th>Idioma</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaSessoes.map((sessao, i) => {
                        const { id, filme, sala, tipoSala, dataHora, preco, idioma } = sessao;
                        return (
                            <tr key={i}>
                                <td>{id}</td>
                                <td>{filme}</td>
                                <td>{sala}</td>
                                <td>{tipoSala}</td>
                                <td>{dataHora}</td>
                                <td>{preco}</td>
                                <td>{idioma}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button variant="btn btn-sm btn-secondary" texto="Editar" onClick={() => botaoEditar(id)} />
                                        <Button variant="btn btn-sm btn-danger" texto="Excluir" onClick={() => botaoExcluir(id)} />
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
