export function TextArea({
    id,
    placeholder,
    variant,
    numRow,
    label,
    onChange
}) {
    return (
        <>
            <div className="form-group mb-4">
                <label className="text-white h4 " htmlFor={id}>{label}</label>
                <textarea
                    className={variant} id={id}
                    placeholder={placeholder} row={numRow} 
                    onChange={onChange}/>
            </div>
        </>
    );
}