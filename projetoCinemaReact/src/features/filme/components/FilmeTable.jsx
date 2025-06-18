import Button from "../../../components/buttons/Button";
import { excluirFilme } from "../services/filmeService";  // Importando o serviço

export function FilmeTable({ listaFilmes, botaoExcluir, botaoEditar }) {
  const handleExcluir = async (id) => {
    await excluirFilme(id);
    botaoExcluir(id); // Chama a função do pai para remover da lista local
  };

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
            const { id, titulo, genero, classificacao, duracao, dataEstreia } = filme;
            return (
              <tr key={i}>
                <td>{id}</td>
                <td>{titulo}</td>
                <td>{genero}</td>
                <td>{classificacao}</td>
                <td>{duracao}</td>
                <td>{dataEstreia}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="btn btn-sm btn-secondary" texto="Editar" onClick={() => botaoEditar(id)} />
                    <Button variant="btn btn-sm btn-danger" texto="Excluir" onClick={() => handleExcluir(id)} />
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
