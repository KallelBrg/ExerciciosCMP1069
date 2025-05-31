export function CardSessao({
    tituloFilme,
    nomeSala,
    dataHora,
    preco,
    onComprar
}) {
    return (
        <div className="card h-100 border-0 shadow-lg bg-dark text-white rounded-4">
            <div className="card-body d-flex flex-column p-4">
                <h4 className="card-title fw-bold text-info">🎬 {tituloFilme}</h4>
                <p className="card-text mb-1"><strong>Sala:</strong> {nomeSala}</p>
                <p className="card-text mb-1"><strong>Data/Hora:</strong> {dataHora}</p>
                <p className="card-text mb-4"><strong>Preço:</strong> R$ {preco}</p>
                <button className="btn btn-outline-info mt-auto fw-bold" onClick={onComprar}>
                    Comprar Ingresso
                </button>
            </div>
        </div>
    );
}
