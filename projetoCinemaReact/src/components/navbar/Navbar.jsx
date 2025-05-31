import { NavLink } from 'react-router-dom';
import logo from '../../assets/cineBraga.png';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-secondary px-4 mb-5">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <a href="/home" className="navbar-brand">
                        <img src={logo} alt="Logo" width="91" height="65" />
                    </a>

                    <ul className="navbar-nav nav-underline d-flex flex-row gap-3">
                        <li className="nav-item">
                            <NavLink
                                to="/home"
                                className={({ isActive }) => isActive ? "nav-link text-dark fonte-principal active-link" : "nav-link text-dark fonte-principal"}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/cadastrarFilme"
                                className={({ isActive }) => isActive ? "nav-link text-dark fonte-principal active-link" : "nav-link text-dark fonte-principal"}>
                                Cadastrar Filmes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/cadastrarSala"
                                className={({ isActive }) => isActive ? "nav-link text-dark fonte-principal active-link" : "nav-link text-dark fonte-principal"}>
                                Cadastrar Salas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/cadastrarSessao"
                                className={({ isActive }) => isActive ? "nav-link text-dark fonte-principal active-link" : "nav-link text-dark fonte-principal"}>
                                Cadastrar Sessões
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/ingressos"
                                className={({ isActive }) => isActive ? "nav-link text-dark fonte-principal active-link" : "nav-link text-dark fonte-principal"}>
                                Venda de Ingressos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/sessoes"
                                className={({ isActive }) => isActive ? "nav-link text-dark fonte-principal active-link" : "nav-link text-dark fonte-principal"}>
                                Listagem de Sessões
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
