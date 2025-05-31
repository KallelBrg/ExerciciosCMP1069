export class Sessao {
    constructor(id, nomeSessao, filmeId, salaId, dataHora, preco, idioma, formato) {
        this.id = id;
        this.nomeSessao = nomeSessao;
        this.filmeId = filmeId;
        this.salaId = salaId;
        this.dataHora = dataHora;
        this.preco = preco;
        this.idioma = idioma;
        this.formato = formato;
    }

    //GET E SET
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getNomeSessao() {
        return this.nomeSessao;
    }
    setNomeSessao(nomeSessao) {
        this.nomeSessao = nomeSessao;
    }
    getFilmeId() {
        return this.filmeId;
    }
    setFilmeId(filmeId) {
        this.filmeId = filmeId;
    }
    getSalaId() {
        return this.salaId;
    }
    setSalaId(salaId) {
        this.salaId = salaId;
    }
    getDataHora() {
        return this.dataHora;
    }
    setDataHora(dataHora) {
        this.dataHora = dataHora;
    }
    getPreco() {
        return this.preco;
    }
    setPreco(preco) {
        this.preco = preco;
    }
    getIdioma() {
        return this.idioma;
    }
    setIdioma(idioma) {
        this.idioma = idioma;
    }
    getFormato() {
        return this.formato;
    }
    setFormato(formato) {
        this.formato = formato;
    }


    toString() {
        return `Sessão [ID: ${this.id}, Filme ID: ${this.filmeId}, Sala ID: ${this.salaId}, Data/Hora: ${this.dataHora}, Preço: R$ ${this.preco.toFixed(2)}, Idioma: ${this.idioma}, Formato: ${this.formato}]`;
    }

}