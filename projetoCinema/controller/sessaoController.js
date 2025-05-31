import { Sessao } from '../model/sessao.js';

class SessaoController {
    constructor() {
        this.listaSessoes = [];
        this.selectFilme = document.getElementById("filme");
        this.selectSala = document.getElementById("sala");
        this.init();
    }

    init() {
        const btnSalvarSessao = document.getElementById('formSessao');
        const btnCancelar = document.getElementById('btnCancelarSessao');

        this.carregarFilmes();
        this.carregarSalas();

        btnSalvarSessao.addEventListener('submit', this.salvarSessao.bind(this));

        btnCancelar.addEventListener("click", this.limparFormulario);

        this.carregarSessaoDoLocalStorage();

    }

    salvarSessao(e) {
        e.preventDefault();

        const nomeSessao = document.getElementById('nomeSessao').value;
        const filmeId = this.selectFilme.value;
        const salaId = this.selectSala.value;
        const dataHora = document.getElementById("dataHora").value;
        const preco = parseFloat(document.getElementById("preco").value);
        const idioma = document.getElementById("idioma").value;
        const formato = document.getElementById("formato").value;

        const id = this.gerarIdUnico();
        const sessao = new Sessao(id, nomeSessao, filmeId, salaId, dataHora, preco, idioma, formato);
        this.listaSessoes.push(sessao);

        this.salvarNoLocalStorage();
        this.atualizarTabela();
        this.limparFormulario();
        this.fecharModal();
    }

    atualizarTabela() {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
        const salas = JSON.parse(localStorage.getItem("salas")) || [];

        this.listaSessoes.forEach(sessao => {
            const filme = filmes.find(f => f.id == sessao.filmeId);
            const sala = salas.find(s => s.id == sessao.salaId);

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${sessao.id}</td>
                <td>${sessao.nomeSessao}</td>
                <td><strong>${filme ? filme.titulo : 'Filme não encontrado'}</strong></td>
                <td>${sala ? sala.nomeSala : 'Sala não encontrada'}</td>
                <td>${this.formatarDataHora(sessao.dataHora)}</td>
                <td>${sessao.preco}</td>
                <td>${sessao.idioma}</td>
                <td>${sessao.formato}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar fw-semibold" data-id="${sessao.id}">
                        <i class="bi bi-pen-fill"></i>
                    </button>
                    <button class="btn btn-danger btn-sm btn-excluir fw-semibold" data-id="${sessao.id}">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);

            // Adiciona eventos
            tr.querySelector(".btn-editar").addEventListener("click", () => this.abrirModalEdicao(sessao));
            tr.querySelector(".btn-excluir").addEventListener("click", () => this.abrirModalExcluir(sessao.id));
        });
    }


    salvarNoLocalStorage() {
        localStorage.setItem("sessoes", JSON.stringify(this.listaSessoes));
    }

    carregarFilmes() {
        const filmes = JSON.parse(localStorage.getItem("filmes")) || [];

        filmes.forEach(filme => {
            const option = document.createElement("option");
            option.value = filme.id;
            option.textContent = filme.titulo;
            this.selectFilme.appendChild(option);
        });
    }

    carregarSalas() {
        const salas = JSON.parse(localStorage.getItem("salas")) || [];

        salas.forEach(sala => {
            const option = document.createElement("option");
            option.value = sala.id;
            option.textContent = `${sala.nomeSala} - ${sala.tipo}`;
            this.selectSala.appendChild(option);
        });
    }

    carregarSessaoDoLocalStorage() {
        const sessoesSalvas = localStorage.getItem("sessoes");
        if (sessoesSalvas) {
            this.listaSessoes = JSON.parse(sessoesSalvas);
            this.atualizarTabela();
        }
    }

    gerarIdUnico() {
        let id;
        do {
            id = Math.floor(100000 + Math.random() * 900000); // Gera um número de 6 dígitos
        } while (this.listaSessoes.some(s => s.id === id));
        return id;
    }

    limparFormulario() {
        document.getElementById("formSessao").reset();
    }

    fecharModal() {
        const modal = bootstrap.Modal.getInstance(document.getElementById('idModalSessao'));
        modal.hide();
    }

    abrirModalExcluir(id) {
        // Exibe o modal de exclusão
        const modal = new bootstrap.Modal(document.getElementById("modalExcluirSessao"));
        modal.show();

        this.excluir(id);
    }

    abrirModalEdicao(sessao) {
        const modal = new bootstrap.Modal(document.getElementById("idModalEdicaoSessao"));
        modal.show();

        const selectFilmeEdicao = document.getElementById("filme-edicao");
        selectFilmeEdicao.innerHTML = ""; // Limpa o select
        const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
        filmes.forEach(filme => {
            const option = document.createElement("option");
            option.value = filme.id;
            option.textContent = filme.titulo;
            selectFilmeEdicao.appendChild(option);
        });

        const selectSalaEdicao = document.getElementById("sala-edicao");
        selectSalaEdicao.innerHTML = "";
        const salas = JSON.parse(localStorage.getItem("salas")) || [];
        salas.forEach(sala => {
            const option = document.createElement("option");
            option.value = sala.id;
            option.textContent = `${sala.nomeSala} - ${sala.tipo}`;
            selectSalaEdicao.appendChild(option);
        });

        document.getElementById('nomeSessao-edicao').value = sessao.nomeSessao;
        selectFilmeEdicao.value = sessao.filmeId;
        selectSalaEdicao.value = sessao.salaId;
        document.getElementById("dataHora-edicao").value = sessao.dataHora;
        document.getElementById("preco-edicao").value = sessao.preco;
        document.getElementById("idioma-edicao").value = sessao.idioma;
        document.getElementById("formato-edicao").value = sessao.formato;

        const btnSalvar = document.getElementById('btnSalvarEdicaoSessao');

        btnSalvar.addEventListener('click', () => {
            this.listaSessoes.forEach(sessaoSearch => {
                if (sessaoSearch.id === sessao.id) {
                    sessaoSearch.nomeSessao = document.getElementById('nomeSessao-edicao').value;
                    sessaoSearch.filmeId = selectFilmeEdicao.value;
                    sessaoSearch.salaId = selectSalaEdicao.value;
                    sessaoSearch.dataHora = document.getElementById("dataHora-edicao").value;
                    sessaoSearch.preco = parseFloat(document.getElementById("preco-edicao").value);
                    sessaoSearch.idioma = document.getElementById("idioma-edicao").value;
                    sessaoSearch.formato = document.getElementById("formato-edicao").value;
                }
            });

            this.salvarNoLocalStorage();
            this.atualizarTabela();
            modal.hide();
        });
    }


    excluir(id) {
        const btnExcluirSala = document.getElementById('btnExcluirSessao');
        btnExcluirSala.addEventListener("click", () => {
            this.listaSessoes = this.listaSessoes.filter(sessao => sessao.id !== id);
            this.salvarNoLocalStorage();
            this.atualizarTabela();
        });
    }

    formatarDataHora(dataHoraString) {
        const dataHora = new Date(dataHoraString);

        const dia = String(dataHora.getDate()).padStart(2, '0');
        const mes = String(dataHora.getMonth() + 1).padStart(2, '0');
        const ano = dataHora.getFullYear();

        const horas = String(dataHora.getHours()).padStart(2, '0');
        const minutos = String(dataHora.getMinutes()).padStart(2, '0');

        return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
    }





}

// Inicializa a SessaoController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const sessaoController = new SessaoController();
    window.sessaoController = sessaoController; // Exposição global, se necessário
});