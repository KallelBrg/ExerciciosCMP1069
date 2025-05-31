import { Sala } from "../model/sala.js";

class SalasController {
    constructor() {
        this.listaSalas = [];
        this.init();
    }

    init() {
        const btnSalvarSala = document.getElementById('formSalas');
        const btnCancelar = document.getElementById('btnCancelarNovaSala');

        btnSalvarSala.addEventListener('submit', this.salvarSala.bind(this));

        btnCancelar.addEventListener("click", this.limparFormulario);
        this.carregarSalasDoLocalStorage();

    }

    salvarSala(e) {
        e.preventDefault();

        const nomeSala = document.getElementById('nome-sala').value;
        const capacidade = document.getElementById('capacidade-sala').value;
        const tipo = document.getElementById('tipo-sala').value;

        const id = this.gerarIdUnico();
        const sala = new Sala(id, nomeSala, capacidade, tipo);
        this.listaSalas.push(sala);


        this.salvarNoLocalStorage();
        this.atualizarTabela();
        this.limparFormulario();
        this.fecharModal();

    }

    salvarNoLocalStorage() {
        localStorage.setItem("salas", JSON.stringify(this.listaSalas));
    }

    carregarSalasDoLocalStorage() {
        const salaSalvas = localStorage.getItem("salas");
        if (salaSalvas) {
            this.listaSalas = JSON.parse(salaSalvas);
            this.atualizarTabela();
        }
    }

    atualizarTabela() {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        this.listaSalas.forEach(sala => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                    <td>${sala.id}</td>
                    <td><strong>${sala.nomeSala}</strong></td>
                    <td>${sala.capacidade}</td>
                    <td>${sala.tipo}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-editar fw-semibold" data-id="${sala.id}">
                        <i class="bi bi-pen-fill"></i></button>
    
                        <button class="btn btn-danger btn-sm btn-excluir fw-semibold" data-id="${sala.id}">
                        <i class="bi bi-trash-fill"></i></button>
                    </td>
                `;
            tbody.appendChild(tr);

            // Adiciona evento para o botão de editar
            tr.querySelector(".btn-editar").addEventListener("click", () => this.abrirModalEdicao(sala));
            tr.querySelector(".btn-excluir").addEventListener("click", () => this.abrirModalExcluir(sala.id));

        });
    }

    fecharModal() {
        const modalSalas = bootstrap.Modal.getInstance(document.getElementById('idModalSalas'));
        modalSalas.hide();
    }

    excluir(id) {
        const btnExcluirSala = document.getElementById('btnExcluirSala');
        btnExcluirSala.addEventListener("click", () => {
            this.listaSalas = this.listaSalas.filter(sala => sala.id !== id);
            this.salvarNoLocalStorage();
            this.atualizarTabela();
        });
    }

    abrirModalEdicao(sala) {
        const modal = new bootstrap.Modal(document.getElementById("idModalEdicaoSala"));
        modal.show();

        document.getElementById("nome-sala-edicao").value = sala.nomeSala;
        document.getElementById("capacidade-sala-edicao").value = sala.capacidade;
        document.getElementById("tipo-sala-edicao").value = sala.tipo;

        const btnSalvarEdicaoSala = document.getElementById('btnSalvarEdicaoSala');
        btnSalvarEdicaoSala.addEventListener('click', () => {
            this.listaSalas.forEach(salaSearch => {
                if (salaSearch.id === sala.id) {
                    sala.nomeSala = document.getElementById('nome-sala-edicao').value;
                    sala.capacidade = document.getElementById('capacidade-sala-edicao').value;
                    sala.tipo = document.getElementById('tipo-sala-edicao').value;
                }
            })
            this.salvarNoLocalStorage();
            this.atualizarTabela();
        })
    }

    abrirModalExcluir(id) {
        // Exibe o modal de exclusão
        const modal = new bootstrap.Modal(document.getElementById("modalExcluirSala"));
        modal.show();

        this.excluir(id);
    }

    limparFormulario() {
        document.getElementById("formSalas").reset();
    }

    gerarIdUnico() {
        let id;
        do {
            id = Math.floor(100000 + Math.random() * 900000); // Gera um número de 6 dígitos
        } while (this.listaSalas.some(s => s.id === id));
        return id;
    }










}

// Inicializa a SalasController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const salasController = new SalasController();
    window.salasController = salasController; // Exposição global, se necessário
});