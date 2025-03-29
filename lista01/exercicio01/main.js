let alunos = [];

function cadastrarAluno() {
    let nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;
    let curso = document.getElementById('opCurso').value;
    let notaFinal = document.getElementById('notaFinal').value;

    if (nome === '' || idade === '' || notaFinal === '') {
        alert('Preencha todos os campos!');
        return;
    }
    
    if(notaFinal < 0 || notaFinal > 10)
    {
        alert('Insira um valor de 0 a 10 para a Nota Final');
        return;
    }
    
    let aluno = {
        nome: nome,
        idade: idade,
        curso: curso,
        notaFinal: notaFinal
    };

    alunos.push(aluno);
    atualizarTabela(); 
    limparForm();
}

function atualizarTabela() {
    let tbody = document.getElementById('corpoTabela');
    tbody.innerHTML = ''; 

    alunos.forEach((aluno, index) => {
        let linha = document.createElement('tr'); 
        linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
        `;

        tbody.appendChild(linha);
    });
}

function editarAluno(index) {
    let aluno = alunos[index];

    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('opCurso').value = aluno.curso;
    document.getElementById('notaFinal').value = aluno.notaFinal;

    alunos.splice(index, 1); 
    atualizarTabela(); 
}

function excluirAluno(index) {
    alunos.splice(index, 1); 
    atualizarTabela(); 
}

function limparForm() {
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('opCurso').value = 'javascript'; 
    document.getElementById('notaFinal').value = '';
}
