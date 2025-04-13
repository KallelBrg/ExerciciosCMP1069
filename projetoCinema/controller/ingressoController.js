import { Ingresso } from "../model/ingresso.js";

class IngressoController {
    constructor() {
        this.listaIngressos = [];
        this.selectSessao = document.getElementById('sessao');
        this.init();
    }


    init() {
        this.carregarSessoes();
        const btnComprarIngresso = document.getElementById('btnComprarIngresso');

        btnComprarIngresso.addEventListener('click', this.comprarIngresso.bind(this));

        this.carregarIngressosDoLocalStorage();

    }

    comprarIngresso() {
        this.carregarIngressosDoLocalStorage();

        const nomeSessao = this.selectSessao.value;
        const nomeCompleto = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const assento = document.getElementById('assento').value;
        const pagamento = document.getElementById('pagamento').value;

        const ingresso = new Ingresso(nomeSessao, nomeCompleto, cpf, assento, pagamento);
        this.listaIngressos.push(ingresso);

        this.salvarNoLocalStorage();
        this.limparFormulario();
        
        alert("✅ Sucesso!!!");
    }

    salvarNoLocalStorage() {
        localStorage.setItem("ingressos", JSON.stringify(this.listaIngressos));
    }

    carregarSessoes() {
        const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

        //console.log(sessoes);

        sessoes.forEach(sessao => {
            const option = document.createElement("option");
            option.value = sessao.id;
            option.textContent = sessao.nomeSessao;
            this.selectSessao.appendChild(option);
        });
    }

    carregarIngressosDoLocalStorage() {
        const ingressosSalvos = localStorage.getItem("ingressos");
    
        this.listaIngressos = ingressosSalvos ? JSON.parse(ingressosSalvos) : [];
    }
    

    limparFormulario() {
        document.getElementById("formIngresso").reset();
    }








}

// Inicializa o IngressoController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const ingressoController = new IngressoController();
    window.ingressoController = ingressoController; // Exposição global, se necessário
});