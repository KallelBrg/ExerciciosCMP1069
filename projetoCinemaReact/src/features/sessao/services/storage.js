const API_URL = "http://localhost:3000/sessoes";  // Endpoint da API para as sessões

// Função para obter todas as sessões
export async function listarSessoes() {
  try {
    const response = await fetch(API_URL);  // Faz uma requisição GET para obter todas as sessões
    if (!response.ok) throw new Error("Falha ao listar sessões");
    
    return await response.json();  // Retorna todas as sessões
  } catch (error) {
    console.error("Erro ao listar sessões:", error);
  }
}

// Função para adicionar uma nova sessão
export async function adicionarSessao(sessao) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessao),
    });

    if (!response.ok) throw new Error("Falha ao adicionar sessão");

    return await response.json();  // Retorna a sessão criada
  } catch (error) {
    console.error("Erro ao adicionar sessão:", error);
  }
}

// Função para excluir uma sessão
export async function excluirSessao(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Falha ao excluir sessão");

    return await response.json();  // Retorna a resposta de exclusão
  } catch (error) {
    console.error("Erro ao excluir sessão:", error);
  }
}

// Função para atualizar uma sessão
export async function atualizarSessao(id, sessao) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",  // Usando PATCH para atualizações parciais
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessao),
    });

    if (!response.ok) throw new Error("Falha ao atualizar sessão");

    return await response.json();  // Retorna a sessão atualizada
  } catch (error) {
    console.error("Erro ao atualizar sessão:", error);
  }
}

// Função para buscar uma sessão para edição
export async function getSessaoEditar(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Falha ao buscar sessão");
    return await response.json();  // Retorna a sessão encontrada
  } catch (error) {
    console.error("Erro ao buscar sessão:", error);
  }
}

// Função para obter os horários das sessões de um filme específico
export async function getHorariosSessao(nomeFilme) {
  try {
    const response = await fetch(API_URL);  // Faz uma requisição GET para obter todas as sessões
    if (!response.ok) throw new Error("Falha ao listar sessões");

    const sessoes = await response.json();  // Retorna todas as sessões
    // Filtra as sessões para o filme desejado e retorna apenas os horários
    return sessoes
      .filter(sessao => sessao.filme === nomeFilme)
      .map(sessao => sessao.dataHoraSessao);
  } catch (error) {
    console.error("Erro ao buscar horários das sessões:", error);
  }
}

// Função para obter os tipos de salas de um filme e horário específicos
export async function getTiposSessao(nomeFilme, horario) {
  try {
    const response = await fetch(API_URL);  // Faz uma requisição GET para obter todas as sessões
    if (!response.ok) throw new Error("Falha ao listar sessões");

    const sessoes = await response.json();  // Retorna todas as sessões
    const tipos = sessoes
      .filter(sessao => sessao.filme === nomeFilme && sessao.dataHoraSessao === horario)
      .map(sessao => sessao.tipoSala);

    return [...new Set(tipos)];  // Retorna os tipos únicos de salas
  } catch (error) {
    console.error("Erro ao buscar tipos das sessões:", error);
  }
}

// Função para obter os idiomas disponíveis para um filme, horário e tipo de sala específicos
export async function getIdiomasSessao(nomeFilme, horario, tipo) {
  try {
    const response = await fetch(API_URL);  // Faz uma requisição GET para obter todas as sessões
    if (!response.ok) throw new Error("Falha ao listar sessões");

    const sessoes = await response.json();  // Retorna todas as sessões
    const idiomas = sessoes
      .filter(sessao => 
        sessao.filme === nomeFilme && 
        sessao.dataHoraSessao === horario && 
        sessao.tipoSala === tipo)
      .map(sessao => sessao.idioma);

    return [...new Set(idiomas)];  // Retorna os idiomas únicos
  } catch (error) {
    console.error("Erro ao buscar idiomas das sessões:", error);
  }
}

export async function getSessoes() {
  try {
    const response = await fetch(API_URL);  // Faz uma requisição GET para obter todas as sessões
    if (!response.ok) throw new Error("Falha ao listar sessões");

    return await response.json();  // Retorna todas as sessões em formato JSON
  } catch (error) {
    console.error("Erro ao buscar sessões:", error);
  }
}