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

function cadastrarFuncionario(){
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

function atualizarTabela(){
    let tbody = document.getElementById('corpoTabela');
    tbody.innerHTML = ''; 

    funcionarios.forEach((funcionario) => {
        let linha = document.createElement('tr'); 
        linha.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.idade}</td>
            <td>${funcionario.cargo}</td>
            <td>${funcionario.salario}</td>
        `;
        tbody.appendChild(linha);
    });
}

function limparForm(){
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('cargo').value = ''; 
    document.getElementById('salario').value = '';
}