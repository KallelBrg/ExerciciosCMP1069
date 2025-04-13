export class Sala {
  constructor(id, nomeSala, capacidade, tipo) {
    this.id = id;
    this.nomeSala = nomeSala;
    this.capacidade = capacidade;
    this.tipo = tipo;
  }

  //GET E SET
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
  getNomeSala() {
    return this.nomeSala;
  }
  setNomeSala(nomeSala) {
    this.nomeSala = nomeSala;
  }
  getCapacidade() {
    return this.capacidade;
  }
  setCapacidade(capacidade) {
    this.capacidade = capacidade;
  }
  getTipo() {
    return this.tipo;
  }
  setTipo(tipo) {
    this.tipo = tipo;
  }

  // Método para retornar todos os dados em string
  toString() {
    return `Sala ID: ${this.id}, Nome: ${this.nomeSala}, Capacidade: ${this.capacidade}, Tipo: ${this.tipo}`;
  }
}
