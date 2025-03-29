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

const cadastrarAluno = () => {
    let nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;
    let curso = document.getElementById('opCurso').value;
    let notaFinal = document.getElementById('notaFinal').value;

    if (!nome || !idade || !notaFinal) {
        alert('Preencha todos os campos!');
        return;
    }

    alunos.push(new Aluno(nome, idade, curso, notaFinal));
    atualizarTabela();
    limparForm();
    alert('Aluno cadastrado com sucesso!');
};

let atualizarTabela = function () {
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
                <button class="editarAluno" data-index="${index}">Editar</button>
                <button class="excluirAluno" data-index="${index}">Excluir</button>
            </td>
        `;
        tbody.appendChild(linha);
    });

    document.querySelectorAll('.editarAluno').forEach(button => {
        button.addEventListener('click', event => editarAluno(event.target.dataset.index));
    });

    document.querySelectorAll('.excluirAluno').forEach(button => {
        button.addEventListener('click', event => excluirAluno(event.target.dataset.index));
    });
}

const editarAluno = index => {
    let aluno = alunos[index];

    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('opCurso').value = aluno.curso;
    document.getElementById('notaFinal').value = aluno.notaFinal;

    alunos.splice(index, 1); 
    atualizarTabela();
    alert('Altere os dados do aluno nos campos fornecidos!');
};

const excluirAluno = index => {
    alunos.splice(index, 1); 
    atualizarTabela(); 
    alert('Aluno deletado com sucesso!');
};

let limparForm = function() {
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('opCurso').value = 'javascript'; 
    document.getElementById('notaFinal').value = '';
}

document.getElementById('buttonCadastrar').addEventListener('click', cadastrarAluno);
