class Aluno{
    constructor(nome, idade, curso, notaFinal){
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = parseFloat(notaFinal);
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}`;
    }
}

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
    
    let aluno = new Aluno(nome, idade, curso, notaFinal);
    console.log(aluno.isAprovado());
    console.log(aluno.toString());

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
