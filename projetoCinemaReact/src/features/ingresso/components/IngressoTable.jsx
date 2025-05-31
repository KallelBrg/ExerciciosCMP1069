export function IngressoTable({
    listaIngressos
}) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-dark" id="tabela-ingressos">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Filme</th>
                        <th>Horário</th>
                        <th>Tipo</th>
                        <th>Idioma</th>
                        <th>Nome do Cliente</th>
                        <th>CPF</th>
                        <th>Assento</th>
                        <th>Pagamento</th>
                    </tr>
                </thead>
                <tbody>
                    {listaIngressos.map((ingresso, i) => {
                        const { nome, cpf, assento, pagamento, filme, horario, tipo, idioma } = ingresso;
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{filme}</td>
                                <td>{horario}</td>
                                <td>{tipo}</td>
                                <td>{idioma}</td>
                                <td>{nome}</td>
                                <td>{cpf}</td>
                                <td>{assento}</td>
                                <td>{pagamento}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
