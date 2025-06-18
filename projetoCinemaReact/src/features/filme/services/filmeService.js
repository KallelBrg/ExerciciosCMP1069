const API_URL = "http://localhost:3000/filmes";

// Função para criar um filme
export async function criarFilme(filme) {
  //console.log(filme);
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filme),
  });

  if (!response.ok) {
    throw new Error('Falha ao cadastrar filme');
  }

  return await response.json(); // Retorna o filme cadastrado
}

export async function listarFilmes() {
  const response = await fetch(API_URL);
  return await response.json();
}

// Função para obter todos os filmes
export async function getFilmes() {
  const response = await fetch(API_URL);
  return await response.json();
}

// Função para atualizar um filme (usando PATCH)
export async function atualizarFilme(id, filme) {
  console.log(id);
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",  // Mudança para PATCH
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filme),
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar filme');
  }

  return await response.json();  // Retorna o filme atualizado
}


// Função para excluir um filme
export async function excluirFilme(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

// Função para adicionar um filme
export async function addFilme(filme) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filme),
    });
    if (!response.ok) throw new Error('Falha ao adicionar filme');
    return await response.json();
  } catch (error) {
    console.error('Erro ao adicionar filme:', error);
  }
}

export async function getNomeFilmes() {
  try {
    const filmes = await getFilmes();  // Chama a função getFilmes
    return filmes.map(filme => filme.titulo);  // Retorna apenas os títulos dos filmes
  } catch (error) {
    console.error('Erro ao buscar nomes dos filmes:', error);
  }
}

export async function getFilmeEditar(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
}

