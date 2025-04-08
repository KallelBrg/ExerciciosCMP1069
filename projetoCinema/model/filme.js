export class Filme{
    constructor(id,titulo,genero,classificacao,duaracao,dataEstreia){
        this.id = id;;
        this.titulo = titulo;
        this.genero = genero;
        this.classificacao = classificacao;
        this.duaracao = duaracao;
        this.dataEstreia = dataEstreia;
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //GET E SET
    getId(){
        return this.id;
    }
    setId(id){
        this.id = id;
    }
    getTitulo(){
        return this.titulo;
    }
    setTitulo(titulo){
        this.titulo = titulo;
    }
    getGenero(){
        return this.genero;
    }
    setGenero(genero){
        this.genero = genero;
    }
    getClassificacao(){
        return this.classificacao;
    }
    setClassificacao(classificacao){
        this.classificacao = classificacao;
    }
    getDuracao(){
        return this.duaracao;
    }
    setDuracao(duracao){
        this.duaracao = duracao;
    }
    getDataEstreia(){
        return this.dataEstreia;
    }
    setDataEstreia(dataEstreia){
        this.dataEstreia = dataEstreia;
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // toString
    toString(){
        return console.log(`{ ${this.id}, ${this.titulo}, ${this.genero}, ${this.classificacao}, ${this.duaracao}, ${this.dataEstreia},`)
    }
}