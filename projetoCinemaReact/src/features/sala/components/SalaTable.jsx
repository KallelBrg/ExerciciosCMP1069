import Button from "../../../components/buttons/Button";

export function SalaTable({
    listaSalas,
    botaoExcluir,
    botaoEditar
}) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-dark" id="tabela-salas">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Capacidade</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaSalas.map((sala, i) => {
                        const { id, nomeSala, capacidadeSala, tipoSala } = sala;
                        return (
                            <tr key={i}>
                                <td>{id}</td>
                                <td>{nomeSala}</td>
                                <td>{capacidadeSala}</td>
                                <td>{tipoSala}</td>
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
