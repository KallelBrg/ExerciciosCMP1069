// Armazenamento de ingressos com localStorage

export function getIngressos() {
    return JSON.parse(localStorage.getItem("ingressos")) || [];
}

export function adicionarIngresso(ingresso) {
    const ingressosSalvos = [...getIngressos(), ingresso];
    atualizarIngressos(ingressosSalvos);
    return ingressosSalvos;
}

export function atualizarIngressos(listaIngressos) {
    localStorage.setItem("ingressos", JSON.stringify(listaIngressos));
}
