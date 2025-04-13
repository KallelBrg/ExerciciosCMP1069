import { Filme } from "../model/filme.js";

class FilmeController {
    constructor() {
        this.listaFilmes = [];
        this.init();
    }

    init() {
        const btnSalvarFilme = document.getElementById('formFilme');
        const btnCancelar = document.getElementById('btnCancelarNovoFilme');

        btnSalvarFilme.addEventListener('submit', this.salvarFilme.bind(this));

        btnCancelar.addEventListener("click", this.limparFormulario);
        this.carregarFilmesDoLocalStorage();

    }

    salvarFilme(e) {
        e.preventDefault();

        const titulo = document.getElementById('titulo-filme').value;
        const genero = document.getElementById('genero-filme').value;
        const descricao = document.getElementById('descricao-filme').value;
        const classificacao = document.getElementById('classificacao-filme').value;
        const duracao = document.getElementById('duracao-filme').value;
        const estreia = document.getElementById('estreia-filme').value;

        const id = this.gerarIdUnico();
        const filme = new Filme(id, titulo, descricao, genero, classificacao, duracao, estreia);
        this.listaFilmes.push(filme);


        this.salvarNoLocalStorage();
        this.atualizarTabela();
        this.limparFormulario();
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
                    <button class="btn btn-warning btn-sm btn-editar fw-semibold" data-id="${filme.id}">
                    <i class="bi bi-pen-fill"></i></button>

                    <button class="btn btn-danger btn-sm btn-excluir fw-semibold" data-id="${filme.id}">
                    <i class="bi bi-trash-fill"></i></button>
                </td>
            `;
            tbody.appendChild(tr);

            // Adiciona evento para o botão de editar
            tr.querySelector(".btn-editar").addEventListener("click", () => this.abrirModalEdicao(filme));
            tr.querySelector(".btn-excluir").addEventListener("click", () => this.abrirModalExcluir(filme.id));

        });
    }

    fecharModal() {
        const modalFilmes = bootstrap.Modal.getInstance(document.getElementById('idModalFilme'));
        modalFilmes.hide();
    }

    excluir(id) {
        const btnExcluirFilme = document.getElementById('btnExcluirFilme');
        btnExcluirFilme.addEventListener("click", () => {
            this.listaFilmes = this.listaFilmes.filter(filme => filme.id !== id);
            this.salvarNoLocalStorage();
            this.atualizarTabela();
        });
    }

    formatarData(data) {
        const d = new Date(data);
        return d.toLocaleDateString("pt-BR");
    }

    abrirModalEdicao(filme) {
        const modal = new bootstrap.Modal(document.getElementById("idModalEdicaoFilme"));
        modal.show();

        document.getElementById("titulo-filme-edicao").value = filme.titulo;
        document.getElementById("descricao-filme-edicao").value = filme.descricao;
        document.getElementById("genero-filme-edicao").value = filme.genero;
        document.getElementById("classificacao-filme-edicao").value = filme.classificacao;
        document.getElementById("duracao-filme-edicao").value = filme.duracao;
        document.getElementById("estreia-filme-edicao").value = filme.estreia;

        const btnSalvarEdicaoFilme = document.getElementById('btnSalvarEdicaoFilme');
        btnSalvarEdicaoFilme.addEventListener('click', () => {
            this.listaFilmes.forEach(filmeSearch => {
                if (filmeSearch.id === filme.id) {
                    filme.titulo = document.getElementById('titulo-filme-edicao').value;
                    filme.descricao = document.getElementById('descricao-filme-edicao').value;
                    filme.genero = document.getElementById('genero-filme-edicao').value;
                    filme.classificacao = document.getElementById('classificacao-filme-edicao').value;
                    filme.duracao = document.getElementById('duracao-filme-edicao').value;
                    filme.estreia = document.getElementById('estreia-filme-edicao').value;
                }
            })
            this.salvarNoLocalStorage();
            this.atualizarTabela();
        })
    }

    abrirModalExcluir(id) {
        // Exibe o modal de exclusão
        const modal = new bootstrap.Modal(document.getElementById("modalExcluirFilme"));
        modal.show();

        this.excluir(id);
    }

    limparFormulario() {
        document.getElementById("formFilme").reset();
    }

    gerarIdUnico() {
        let id;
        do {
            id = Math.floor(100000 + Math.random() * 900000); // Gera um número de 6 dígitos
        } while (this.listaFilmes.some(f => f.id === id));
        return id;
    }
}

// Inicializa o FilmeController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const filmeController = new FilmeController();
    window.filmeController = filmeController; // Exposição global, se necessário
});