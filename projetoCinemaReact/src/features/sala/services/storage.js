const API_URL = "http://localhost:3000/salas";  // Endpoint da API para as salas

// Função para obter todas as salas
export async function listarSalas() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Falha ao listar salas");
    return await response.json();  // Retorna as salas
  } catch (error) {
    console.error("Erro ao listar salas:", error);
  }
}

// Função para adicionar uma sala
export async function adicionarSala(sala) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sala),
    });

    if (!response.ok) throw new Error("Falha ao adicionar sala");

    return await response.json();  // Retorna a sala criada
  } catch (error) {
    console.error("Erro ao adicionar sala:", error);
  }
}

// Função para excluir uma sala
export async function excluirSala(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Falha ao excluir sala");

    return await response.json();  // Retorna a resposta de exclusão
  } catch (error) {
    console.error("Erro ao excluir sala:", error);
  }
}

// Função para atualizar uma sala
export async function atualizarSala(id, sala) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",  // Usando PATCH para atualizações parciais
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sala),
    });

    if (!response.ok) throw new Error("Falha ao atualizar sala");

    return await response.json();  // Retorna a sala atualizada
  } catch (error) {
    console.error("Erro ao atualizar sala:", error);
  }
}

// Função para buscar uma sala para edição
export async function getSalaEditar(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Falha ao buscar sala");
    return await response.json();  // Retorna a sala encontrada
  } catch (error) {
    console.error("Erro ao buscar sala:", error);
  }
}


export async function getNomeSalas() {
  try {
    const response = await fetch(API_URL);  // Faz uma requisição GET para obter todas as salas
    if (!response.ok) throw new Error("Falha ao listar salas");
    
    const salas = await response.json();  // Retorna todas as salas
    return salas.map(sala => sala.nomeSala);  // Retorna apenas os nomes das salas
  } catch (error) {
    console.error("Erro ao buscar nomes das salas:", error);
  }
}

// Função para obter o tipo de uma sala a partir do nome da sala
export async function getTipoSalaServices(nomeSala) {
  try {
    const response = await fetch(API_URL);  // Faz uma requisição GET para obter todas as salas
    if (!response.ok) throw new Error("Falha ao listar salas");

    const salas = await response.json();  // Retorna todas as salas
    const salaEncontrada = salas.find(sala => sala.nomeSala === nomeSala);  // Encontra a sala pelo nome

    return salaEncontrada ? salaEncontrada.tipoSala : null;  // Retorna o tipo da sala ou null se não encontrada
  } catch (error) {
    console.error("Erro ao buscar tipo da sala:", error);
  }
}

