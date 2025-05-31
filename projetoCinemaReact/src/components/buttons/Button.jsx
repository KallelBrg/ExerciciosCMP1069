function Button({
    id,
    type,
    variant,
    texto,
    onClick
}){
    return(
        <button
        id={id}
        type={type} 
        className={variant} 
        onClick={onClick}>{texto}</button>
    );
}


export default Button;