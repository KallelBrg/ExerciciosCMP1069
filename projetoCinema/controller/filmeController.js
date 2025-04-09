import { Filme } from "../model/filme.js";

class FilmeController {
    constructor() {
        this.listaFilmes = [];
        this.init();
    }

    init() {
        const btnSalvarFilme = document.getElementById("formFilme");
        btnSalvarFilme.addEventListener('submit', this.salvarFilme.bind(this));

        this.carregarFilmesDoLocalStorage();

    }

    salvarFilme(e) {
        e.preventDefault();

        const titulo = document.getElementById('titulo-filme').value;
        const genero = document.getElementById('genero-filme').value;
        const classificacao = document.getElementById('classificacao-filme').value;
        const duracao = document.getElementById('duracao-filme').value;
        const estreia = document.getElementById('estreia-filme').value;

        const filme = new Filme(this.listaFilmes.length + 1, titulo, genero, classificacao, duracao, estreia);
        this.listaFilmes.push(filme);

        this.salvarNoLocalStorage();
        this.atualizarTabela();
        this.fecharModal();

    }

    salvarNoLocalStorage() {
        localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
    }

    carregarFilmesDoLocalStorage() {
        const filmesSalvos = localStorage.getItem("filmes");
        if (filmesSalvos) {
            this.listaFilmes = JSON.parse(filmesSalvos);
            this.atualizarTabela();
        }
    }

    atualizarTabela() {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        this.listaFilmes.forEach(filme => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${filme.id}</td>
                <td><strong>${filme.titulo}</strong></td>
                <td>${filme.genero}</td>
                <td>${filme.classificacao}</td>
                <td>${filme.duracao}</td> <!-- Exibe a duração -->
                <td>${this.formatarData(filme.estreia)}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar fw-semibold" data-id="${filme.id}">Editar</button>

                    <button class="btn btn-danger btn-sm btn-excluir fw-semibold" data-id="${filme.id}">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);

            // Adiciona evento para o botão de editar
            tr.querySelector(".btn-editar").addEventListener("click", () => this.abrirModalEdicao(filme));
            tr.querySelector(".btn-excluir").addEventListener("click", () => this.excluir(filme.id));

        });
    }

    fecharModal() {
        const modalFilmes = bootstrap.Modal.getInstance(document.getElementById('idModalFilme'));
        modalFilmes.hide();
    }

    excluir(id) {
        this.listaFilmes = this.listaFilmes.filter(filme => filme.id !== id);
        this.salvarNoLocalStorage();
        this.atualizarTabela();
    }

    formatarData(data) {
        const d = new Date(data);
        return d.toLocaleDateString("pt-BR");
    }







}

// Inicializa o FilmeController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const filmeController = new FilmeController();
    window.filmeController = filmeController; // Exposição global, se necessário
});