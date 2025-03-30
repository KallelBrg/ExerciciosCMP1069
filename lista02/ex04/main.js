class Funcionario{
    constructor(nome, idade, cargo, salario)
    {
        this._nome = nome;
        this._idade = idade;
        this._cargo = cargo;
        this._salario = parseFloat(salario);
    }

    get nome(){
        return this._nome;
    }

    get idade(){
        return this._idade;
    }

    get cargo(){
        return this._cargo;
    }

    get salario(){
        return this._salario;
    }

    set nome(nome){
        this._nome = nome;
    }

    set idade(idade){
        if(idade > 0){
            this._idade = idade;
        }
        else{
            console.error("Idade inválida");
        }
    }

    set cargo(cargo){
        this._cargo = cargo;
    }

    set salario(salario){
        if(salario >= 0){
            this._salario = salario;
        }
        else{
            console.error("Salário inválido");
        }
    }

    toString(){
        return `Nome: ${this._nome}, Idade: ${this._idade}, Cargo: ${this._cargo}, Salário: ${this._salario}`;
    }
};

let funcionarios = [];

const cadastrarFuncionario = function(){
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let cargo = document.getElementById("cargo").value;
    let salario = document.getElementById("salario").value;

    if(!nome || !idade || !cargo || !salario){
        alert("Preencha todos os campos!");
        return;
    }

    funcionarios.push(new Funcionario(nome, idade, cargo, salario));
    atualizarTabela();
    limparForm();
}

const atualizarTabela = () => {
    let tbody = document.getElementById('corpoTabela');
    tbody.innerHTML = ''; 

    funcionarios.forEach((funcionario, index) => {
        let linha = document.createElement('tr'); 
        linha.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.idade}</td>
            <td>${funcionario.cargo}</td>
            <td>${funcionario.salario}</td>
            <td>
                <button class="editarFuncionario" data-index="${index}">Editar</button>
                <button class="excluirFuncionario" data-index="${index}">Excluir</button>
            </td>
        `;
        tbody.appendChild(linha);
    });

    document.querySelectorAll('.editarFuncionario').forEach(button => {
        button.addEventListener('click', event => editarFuncionario(event.target.dataset.index));
    });

    document.querySelectorAll('.excluirFuncionario').forEach(button => {
        button.addEventListener('click', event => excluirFuncionario(event.target.dataset.index));
    });
}

const editarFuncionario = function (index){
    let funcionario = funcionarios[index];
    
    document.getElementById('nome').value = funcionario.nome;
    document.getElementById('idade').value = funcionario.idade;
    document.getElementById('cargo').value = funcionario.cargo;
    document.getElementById('salario').value = funcionario.salario;

    funcionarios.splice(index, 1);
    atualizarTabela();
}

const excluirFuncionario = function(index){
    funcionarios.splice(index, 1);
    atualizarTabela();
}

const limparForm = () => {
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('cargo').value = ''; 
    document.getElementById('salario').value = '';
}

const gerarRelatorios = function (){
    document.getElementById('salario5000').innerHTML = funcionarios.filter((funcionario) => funcionario.salario > 5000).map((funcionario) => funcionario.nome).join(', ');
    document.getElementById('mediaSalarial').innerHTML = (funcionarios.reduce((sum, funcionario) => sum + funcionario.salario, 0) / funcionarios.length).toFixed(2);
    document.getElementById('listarCargos').innerHTML = [...new Set(funcionarios.map((funcionario) => funcionario.cargo))].join(', ');
    document.getElementById('listaMaiusculo').innerHTML = funcionarios.map((funcionario) => funcionario.nome.toUpperCase()).join(', ');
}

document.getElementById('buttonCadastrar').addEventListener('click', cadastrarFuncionario);
document.getElementById('buttonRelatorios').addEventListener('click', gerarRelatorios);