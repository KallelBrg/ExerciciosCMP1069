export class Filme {
    constructor(id, titulo, descricao, genero, classificacao, duracao, estreia) {
        this.id = id;;
        this.titulo = titulo;
        this.descricao = descricao;
        this.genero = genero;
        this.classificacao = classificacao;
        this.duracao = duracao;
        this.estreia = estreia;
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //GET E SET
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getTitulo() {
        return this.titulo;
    }
    setTitulo(titulo) {
        this.titulo = titulo;
    }
    getGenero() {
        return this.genero;
    }
    setGenero(genero) {
        this.genero = genero;
    }
    getClassificacao() {
        return this.classificacao;
    }
    setClassificacao(classificacao) {
        this.classificacao = classificacao;
    }
    getDuracao() {
        return this.duracao;
    }
    setDuracao(duracao) {
        this.duracao = duracao;
    }
    getDataEstreia() {
        return this.estreia;
    }
    setDataEstreia(estreia) {
        this.estreia = estreia;
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // toString
    toString() {
        return console.log(`{ ${this.id}, ${this.titulo}, ${this.genero}, ${this.classificacao}, ${this.duracao}, ${this.estreia},`)
    }
}