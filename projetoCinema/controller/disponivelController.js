document.addEventListener("DOMContentLoaded", () => {
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    const container = document.getElementById("listaSessoes");

    if (sessoes.length === 0) {
        container.innerHTML = "<p>❌ Nenhuma sessão disponível.</p>";
        return;
    }

    sessoes.forEach(sessao => {
        const filme = filmes.find(f => f.id == sessao.filmeId);
        const sala = salas.find(s => s.id == sessao.salaId);


        const sessaoDiv = document.createElement("div");

        sessaoDiv.innerHTML = `
            <h3 class='mb-4'>${sessao.nomeSessao}</h3>
            <p><strong>Filme:</strong> ${filme.titulo}</p>
            <p><strong>Sala:</strong> ${sala.nomeSala}</p>
            <p><strong>Data:</strong> ${formatarData(sessao.dataHora)}</p>
            <p><strong>Hora:</strong> ${formatarHoraDeDatetimeLocal(sessao.dataHora)}</p>
            <p><strong>Preço:</strong> R$ ${Number(sessao.preco).toFixed(2)}</p>
            <a href="venda-ingressos.html?nomeSessao=${sessao.nomeSessao}">
                <button class="btn btn-primary">🎟️ Comprar Ingresso</button>
            </a>
            <hr>
        `;

        container.appendChild(sessaoDiv);
    });

    function formatarData(data) {
        const d = new Date(data);
        return d.toLocaleDateString("pt-BR");
    };

    function formatarHoraDeDatetimeLocal(valor) {
        const data = new Date(valor);
        return data.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }    
    
});

