export class Ingresso {
    constructor(nomeSessao, nomeCliente, cpfCliente, assento, pagamento) {
        this.nomeSessao = nomeSessao;
        this.nomeCliente = nomeCliente;
        this.cpfCliente = cpfCliente;
        this.assento = assento;
        this.pagamento = pagamento;
    }

    // Getters e Setters

    getNomeSessao() {
        return this.nomeSessao;
    }

    setNomeSessao(nomeSessao) {
        this.nomeSessao = nomeSessao;
    }

    getNomeCliente() {
        return this.nomeCliente;
    }

    setNomeCliente(nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    getCpfCliente() {
        return this.cpfCliente;
    }

    setCpfCliente(cpfCliente) {
        this.cpfCliente = cpfCliente;
    }

    getAssento() {
        return this.assento;
    }

    setAssento(assento) {
        this.assento = assento;
    }

    getPagamento() {
        return this.pagamento;
    }

    setPagamento(pagamento) {
        this.pagamento = pagamento;
    }
}
