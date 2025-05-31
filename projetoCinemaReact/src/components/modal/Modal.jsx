export function Modal({
    body,
    titulo,
    fecharModal,
    form
}) {


    return (
        <>

            <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-white bg-secondary">
                            <h5 className="modal-title">{titulo}</h5>
                            <button type="button" className="btn-close btn-close-white " data-bs-dismiss="modal" aria-label="Fechar" onClick={fecharModal} />

                        </div>
                        <div className="modal-body bg-dark">
                            {body}
                        </div>
                        <div className="modal-footer bg-secondary">
                            <button type="button" className="btn bg-white" onClick={fecharModal}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-success" form={form} >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
